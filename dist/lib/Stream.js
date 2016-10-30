"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Lambda_1 = require("./Lambda");
var Vertex_1 = require("./Vertex");
var Transaction_1 = require("./Transaction");
var CoalesceHandler_1 = require("./CoalesceHandler");
var Cell_1 = require("./Cell");
//import { StreamLoop } from "./StreamLoop";
var Listener_1 = require("./Listener");
var Lazy_1 = require("./Lazy");
var LazyCell_1 = require("./LazyCell");
var Stream = (function () {
    function Stream(vertex) {
        this.listeners = [];
        this.firings = [];
        this.vertex = vertex ? vertex : new Vertex_1.Vertex("Stream", 0, []);
    }
    Stream.prototype.getVertex__ = function () {
        return this.vertex;
    };
    /**
     * Transform the stream's event values according to the supplied function, so the returned
     * Stream's event values reflect the value of the function applied to the input
     * Stream's event values.
     * @param f Function to apply to convert the values. It may construct FRP logic or use
     *    {@link Cell#sample()} in which case it is equivalent to {@link Stream#snapshot(Cell)}ing the
     *    cell. Apart from this the function must be <em>referentially transparent</em>.
     */
    Stream.prototype.map = function (f) {
        var _this = this;
        var out = new StreamWithSend(null);
        var ff = Lambda_1.Lambda1_toFunction(f);
        out.vertex = new Vertex_1.Vertex("map", 0, [
            new Vertex_1.Source(this.vertex, function () {
                return _this.listen_(out.vertex, function (a) {
                    out.send_(ff(a));
                }, false);
            })
        ].concat(Lambda_1.toSources(Lambda_1.Lambda1_deps(f))));
        return out;
    };
    /**
     * Transform the stream's event values into the specified constant value.
     * @param b Constant value.
     */
    Stream.prototype.mapTo = function (b) {
        var _this = this;
        var out = new StreamWithSend(null);
        out.vertex = new Vertex_1.Vertex("mapTo", 0, [
            new Vertex_1.Source(this.vertex, function () {
                return _this.listen_(out.vertex, function (a) {
                    out.send_(b);
                }, false);
            })
        ]);
        return out;
    };
    /**
     * Variant of {@link Stream#merge(Stream, Lambda2)} that merges two streams and will drop an event
     * in the simultaneous case.
     * <p>
     * In the case where two events are simultaneous (i.e. both
     * within the same transaction), the event from <em>this</em> will take precedence, and
     * the event from <em>s</em> will be dropped.
     * If you want to specify your own combining function, use {@link Stream#merge(Stream, Lambda2)}.
     * s1.orElse(s2) is equivalent to s1.merge(s2, (l, r) -&gt; l).
     * <p>
     * The name orElse() is used instead of merge() to make it really clear that care should
     * be taken, because events can be dropped.
     */
    Stream.prototype.orElse = function (s) {
        return this.merge(s, function (left, right) {
            return left;
        });
    };
    Stream.prototype.merge_ = function (s) {
        var _this = this;
        var out = new StreamWithSend();
        var left = new Vertex_1.Vertex("merge", 0, []);
        left.sources.push(new Vertex_1.Source(this.vertex, function () {
            return _this.listen_(left, function (a) {
                out.send_(a);
            }, false);
        }));
        out.vertex.sources = out.vertex.sources.concat([
            new Vertex_1.Source(left, function () {
                left.register(out.vertex);
                return function () { left.deregister(out.vertex); };
            }),
            new Vertex_1.Source(s.vertex, function () {
                return s.listen_(out.vertex, function (a) {
                    out.send_(a);
                }, false);
            })
        ]);
        return out;
    };
    Stream.prototype.coalesce__ = function (f) {
        var _this = this;
        var out = new StreamWithSend();
        var coalescer = new CoalesceHandler_1.CoalesceHandler(f, out);
        out.vertex.sources = out.vertex.sources.concat([
            new Vertex_1.Source(this.vertex, function () {
                return _this.listen_(out.vertex, function (a) {
                    coalescer.send_(a);
                }, false);
            })
        ]).concat(Lambda_1.toSources(Lambda_1.Lambda2_deps(f)));
        return out;
    };
    /**
     * Merge two streams of the same type into one, so that events on either input appear
     * on the returned stream.
     * <p>
     * If the events are simultaneous (that is, one event from this and one from <em>s</em>
     * occurring in the same transaction), combine them into one using the specified combining function
     * so that the returned stream is guaranteed only ever to have one event per transaction.
     * The event from <em>this</em> will appear at the left input of the combining function, and
     * the event from <em>s</em> will appear at the right.
     * @param f Function to combine the values. It may construct FRP logic or use
     *    {@link Cell#sample()}. Apart from this the function must be <em>referentially transparent</em>.
     */
    Stream.prototype.merge = function (s, f) {
        var _this = this;
        return Transaction_1.Transaction.transactionally(function () {
            return _this.merge_(s).coalesce__(f);
        });
    };
    /**
     * Return a stream that only outputs events for which the predicate returns true.
     */
    Stream.prototype.filter = function (f) {
        var _this = this;
        var out = new StreamWithSend(null);
        var ff = Lambda_1.Lambda1_toFunction(f);
        out.vertex = new Vertex_1.Vertex("filter", 0, [
            new Vertex_1.Source(this.vertex, function () {
                return _this.listen_(out.vertex, function (a) {
                    if (ff(a))
                        out.send_(a);
                }, false);
            })
        ].concat(Lambda_1.toSources(Lambda_1.Lambda1_deps(f))));
        return out;
    };
    /**
     * Return a stream that only outputs events that have present
     * values, discarding null values.
     */
    Stream.prototype.filterNotNull = function () {
        var _this = this;
        var out = new StreamWithSend(null);
        out.vertex = new Vertex_1.Vertex("filterNotNull", 0, [
            new Vertex_1.Source(this.vertex, function () {
                return _this.listen_(out.vertex, function (a) {
                    if (a !== null)
                        out.send_(a);
                }, false);
            })
        ]);
        return out;
    };
    /**
     * Return a stream that only outputs events from the input stream
     * when the specified cell's value is true.
     */
    Stream.prototype.gate = function (c) {
        return this.snapshot(c, function (a, pred) {
            return pred ? a : null;
        }).filterNotNull();
    };
    /**
     * Variant of {@link snapshot(Cell, Lambda2)} that captures the cell's value
     * at the time of the event firing, ignoring the stream's value.
     */
    Stream.prototype.snapshot1 = function (c) {
        var _this = this;
        var out = new StreamWithSend(null);
        out.vertex = new Vertex_1.Vertex("snapshot1", 0, [
            new Vertex_1.Source(this.vertex, function () {
                return _this.listen_(out.vertex, function (a) {
                    out.send_(c.sampleNoTrans__());
                }, false);
            }),
            new Vertex_1.Source(c.getVertex__(), null)
        ]);
        return out;
    };
    /**
     * Return a stream whose events are the result of the combination using the specified
     * function of the input stream's event value and the value of the cell at that time.
     * <P>
     * There is an implicit delay: State updates caused by event firings being held with
     * {@link Stream#hold(Object)} don't become visible as the cell's current value until
     * the following transaction. To put this another way, {@link Stream#snapshot(Cell, Lambda2)}
     * always sees the value of a cell as it was before any state changes from the current
     * transaction.
     */
    Stream.prototype.snapshot = function (c, f) {
        var _this = this;
        var out = new StreamWithSend(null);
        var ff = Lambda_1.Lambda2_toFunction(f);
        out.vertex = new Vertex_1.Vertex("snapshot", 0, [
            new Vertex_1.Source(this.vertex, function () {
                return _this.listen_(out.vertex, function (a) {
                    out.send_(ff(a, c.sampleNoTrans__()));
                }, false);
            }),
            new Vertex_1.Source(c.getVertex__(), null)
        ].concat(Lambda_1.toSources(Lambda_1.Lambda2_deps(f))));
        return out;
    };
    /**
     * Create a {@link Cell} with the specified initial value, that is updated
     * by this stream's event values.
     * <p>
     * There is an implicit delay: State updates caused by event firings don't become
     * visible as the cell's current value as viewed by {@link Stream#snapshot(Cell, Lambda2)}
     * until the following transaction. To put this another way,
     * {@link Stream#snapshot(Cell, Lambda2)} always sees the value of a cell as it was before
     * any state changes from the current transaction.
     */
    Stream.prototype.hold = function (initValue) {
        return new Cell_1.Cell(initValue, this);
    };
    /**
     * A variant of {@link hold(Object)} with an initial value captured by {@link Cell#sampleLazy()}.
     */
    Stream.prototype.holdLazy = function (initValue) {
        return new LazyCell_1.LazyCell(initValue, this);
    };
    /**
     * Transform an event with a generalized state loop (a Mealy machine). The function
     * is passed the input and the old state and returns the new state and output value.
     * @param f Function to apply to update the state. It may construct FRP logic or use
     *    {@link Cell#sample()} in which case it is equivalent to {@link Stream#snapshot(Cell)}ing the
     *    cell. Apart from this the function must be <em>referentially transparent</em>.
     */
    Stream.prototype.collect = function (initState, f) {
        return this.collectLazy(new Lazy_1.Lazy(function () { return initState; }), f);
    };
    /**
     * A variant of {@link collect(Object, Lambda2)} that takes an initial state returned by
     * {@link Cell#sampleLazy()}.
     */
    Stream.prototype.collectLazy = function (initState, f) {
        var ea = this;
        return Transaction_1.Transaction.transactionally(function () {
            var es = new StreamLoop(), s = es.holdLazy(initState), ebs = ea.snapshot(s, f), eb = ebs.map(function (bs) { return bs.a; }), es_out = ebs.map(function (bs) { return bs.b; });
            es.loop(es_out);
            return eb;
        });
    };
    /**
     * Accumulate on input event, outputting the new state each time.
     * @param f Function to apply to update the state. It may construct FRP logic or use
     *    {@link Cell#sample()} in which case it is equivalent to {@link Stream#snapshot(Cell)}ing the
     *    cell. Apart from this the function must be <em>referentially transparent</em>.
     */
    Stream.prototype.accum = function (initState, f) {
        return this.accumLazy(new Lazy_1.Lazy(function () { return initState; }), f);
    };
    /**
     * A variant of {@link accum(Object, Lambda2)} that takes an initial state returned by
     * {@link Cell#sampleLazy()}.
     */
    Stream.prototype.accumLazy = function (initState, f) {
        var ea = this;
        return Transaction_1.Transaction.transactionally(function () {
            var es = new StreamLoop(), s = es.holdLazy(initState), es_out = ea.snapshot(s, f);
            es.loop(es_out);
            return es_out.holdLazy(initState);
        });
    };
    /**
     * Return a stream that outputs only one value: the next event of the
     * input stream, starting from the transaction in which once() was invoked.
     */
    Stream.prototype.once = function () {
        /*
            return Transaction.transactionally(() => {
                const ev = this,
                    out = new StreamWithSend<A>();
                let la : () => void = null;
                la = ev.listen_(out.vertex, (a : A) => {
                    if (la !== null) {
                        out.send_(a);
                        la();
                        la = null;
                    }
                }, false);
                return out;
            });
            */
        // We can't use the implementation above, beacuse deregistering
        // listeners triggers the exception
        // "send() was invoked before listeners were registered"
        // We can revisit this another time. For now we will use the less
        // efficient implementation below.
        var me = this;
        return Transaction_1.Transaction.transactionally(function () { return me.gate(me.mapTo(false).hold(true)); });
    };
    Stream.prototype.listen = function (h) {
        var _this = this;
        return Transaction_1.Transaction.transactionally(function () {
            return _this.listen_(Vertex_1.Vertex.NULL, h, false);
        });
    };
    Stream.prototype.listen_ = function (target, h, suppressEarlierFirings) {
        var _this = this;
        if (this.vertex.register(target))
            Transaction_1.Transaction.currentTransaction.requestRegen();
        var listener = new Listener_1.Listener(h, target);
        this.listeners.push(listener);
        if (!suppressEarlierFirings && this.firings.length != 0) {
            var firings_1 = this.firings.slice();
            Transaction_1.Transaction.currentTransaction.prioritized(target, function () {
                // Anything sent already in this transaction must be sent now so that
                // there's no order dependency between send and listen.
                for (var i = 0; i < firings_1.length; i++)
                    h(firings_1[i]);
            });
        }
        return function () {
            var removed = false;
            for (var i = 0; i < _this.listeners.length; i++) {
                if (_this.listeners[i] == listener) {
                    _this.listeners.splice(i, 1);
                    removed = true;
                    break;
                }
            }
            if (removed)
                _this.vertex.deregister(target);
        };
    };
    return Stream;
}());
exports.Stream = Stream;
var StreamWithSend = (function (_super) {
    __extends(StreamWithSend, _super);
    function StreamWithSend(vertex) {
        _super.call(this, vertex);
    }
    StreamWithSend.prototype.setVertex__ = function (vertex) {
        this.vertex = vertex;
    };
    StreamWithSend.prototype.send_ = function (a) {
        var _this = this;
        // We throw this error if we send into FRP logic that has been constructed
        // but nothing is listening to it yet. We need to do it this way because
        // it's the only way to manage memory in a language with no finalizers.
        if (this.vertex.refCount() == 0)
            throw new Error("send() was invoked before listeners were registered");
        if (this.firings.length == 0)
            Transaction_1.Transaction.currentTransaction.last(function () {
                _this.firings = [];
            });
        this.firings.push(a);
        var listeners = this.listeners.slice();
        var _loop_1 = function(i) {
            var h = listeners[i].h;
            Transaction_1.Transaction.currentTransaction.prioritized(listeners[i].target, function () {
                Transaction_1.Transaction.currentTransaction.inCallback++;
                try {
                    h(a);
                    Transaction_1.Transaction.currentTransaction.inCallback--;
                }
                catch (err) {
                    Transaction_1.Transaction.currentTransaction.inCallback--;
                    throw err;
                }
            });
        };
        for (var i = 0; i < listeners.length; i++) {
            _loop_1(i);
        }
    };
    return StreamWithSend;
}(Stream));
exports.StreamWithSend = StreamWithSend;
/**
 * A forward reference for a {@link Stream} equivalent to the Stream that is referenced.
 */
var StreamLoop = (function (_super) {
    __extends(StreamLoop, _super);
    function StreamLoop() {
        _super.call(this);
        this.assigned__ = false; // to do: Figure out how to hide this
        this.vertex.name = "StreamLoop";
        if (Transaction_1.Transaction.currentTransaction === null)
            throw new Error("StreamLoop/CellLoop must be used within an explicit transaction");
    }
    /**
     * Resolve the loop to specify what the StreamLoop was a forward reference to. It
     * must be invoked inside the same transaction as the place where the StreamLoop is used.
     * This requires you to create an explicit transaction with {@link Transaction#run(Lambda0)}
     * or {@link Transaction#runVoid(Runnable)}.
     */
    StreamLoop.prototype.loop = function (sa_out) {
        var _this = this;
        if (this.assigned__)
            throw new Error("StreamLoop looped more than once");
        this.assigned__ = true;
        this.vertex.addSource(new Vertex_1.Source(sa_out.getVertex__(), function () {
            return sa_out.listen_(_this.vertex, function (a) {
                _this.send_(a);
            }, false);
        }));
    };
    return StreamLoop;
}(StreamWithSend));
exports.StreamLoop = StreamLoop;
//# sourceMappingURL=Stream.js.map