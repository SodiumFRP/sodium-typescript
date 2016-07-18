"use strict";
var Vertex_1 = require("./Vertex");
var typescript_collections_1 = require('typescript-collections');
var Stream_1 = require("./Stream");
var CellSink_1 = require("./CellSink");
var Transaction_1 = require("./Transaction");
/**
 * An interface for implementations of FRP timer systems.
 */
var TimerSystemImpl = (function () {
    function TimerSystemImpl() {
    }
    return TimerSystemImpl;
}());
exports.TimerSystemImpl = TimerSystemImpl;
var nextSeq = 0;
var Event = (function () {
    function Event(t, sAlarm) {
        this.t = t;
        this.sAlarm = sAlarm;
        this.seq = ++nextSeq;
    }
    return Event;
}());
var TimerSystem = (function () {
    function TimerSystem(impl) {
        var _this = this;
        this.eventQueue = new typescript_collections_1.BSTree(function (a, b) {
            if (a.t < b.t)
                return -1;
            if (a.t > b.t)
                return 1;
            if (a.seq < b.seq)
                return -1;
            if (a.seq > b.seq)
                return 1;
            return 0;
        });
        Transaction_1.transactionally(function () {
            _this.impl = impl;
            var timeSnk = new CellSink_1.CellSink(impl.now());
            _this.time = timeSnk;
            // A dummy listener to time to keep it alive even when there are no other listeners.
            _this.time.listen(function (t) { });
            Transaction_1.Transaction.onStart(function () {
                var t = impl.now();
                // Pop and execute all events earlier than or equal to t (the current time).
                var _loop_1 = function() {
                    var ev = null;
                    if (!_this.eventQueue.isEmpty()) {
                        var mev = _this.eventQueue.minimum();
                        if (mev.t <= t) {
                            ev = mev;
                        }
                    }
                    if (ev != null) {
                        timeSnk.send(ev.t);
                        Transaction_1.transactionally(function () { return ev.sAlarm.send_(ev.t); });
                    }
                    else
                        return "break";
                };
                while (true) {
                    var state_1 = _loop_1();
                    if (state_1 === "break") break;
                }
                timeSnk.send(t);
            });
        });
    }
    /**
     * A timer that fires at the specified time, which can be null, meaning
     * that the alarm is not set.
     */
    TimerSystem.prototype.at = function (tAlarm) {
        var _this = this;
        var current = null, cancelCurrent = null, active = false, tAl = null, sampled = false;
        var sAlarm = new Stream_1.StreamWithSend(null), updateTimer = function () {
            if (cancelCurrent !== null) {
                cancelCurrent();
                _this.eventQueue.remove(current);
            }
            cancelCurrent = null;
            current = null;
            if (active) {
                if (!sampled) {
                    sampled = true;
                    tAl = tAlarm.sampleNoTrans__();
                }
                if (tAl !== null) {
                    current = new Event(tAl, sAlarm);
                    _this.eventQueue.add(current);
                    cancelCurrent = _this.impl.setTimer(tAl, function () {
                        // Open and close a transaction to trigger queued
                        // events to run.
                        Transaction_1.transactionally(function () { });
                    });
                }
            }
        };
        sAlarm.setVertex__(new Vertex_1.Vertex("at", 0, [
            new Vertex_1.Source(tAlarm.getVertex__(), function () {
                active = true;
                sampled = false;
                Transaction_1.currentTransaction.prioritized(sAlarm.getVertex__(), updateTimer);
                var kill = tAlarm.getStream__().listen_(sAlarm.getVertex__(), function (oAlarm) {
                    tAl = oAlarm;
                    sampled = true;
                    updateTimer();
                }, false);
                return function () {
                    active = false;
                    updateTimer();
                    kill();
                };
            })
        ]));
        return sAlarm;
    };
    return TimerSystem;
}());
exports.TimerSystem = TimerSystem;
//# sourceMappingURL=TimerSystem.js.map