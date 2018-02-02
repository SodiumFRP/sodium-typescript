'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var Collections = require('typescript-collections');
var Z = require('sanctuary-type-classes');

var totalRegistrations = 0;
function getTotalRegistrations() {
    return totalRegistrations;
}
var Source = /** @class */ (function () {
    function Source(origin, register_) {
        this.registered = false;
        this.deregister_ = null;
        if (origin === null)
            throw new Error("null origin!");
        this.origin = origin;
        this.register_ = register_;
    }
    Source.prototype.register = function (target) {
        var _this = this;
        if (!this.registered) {
            this.registered = true;
            if (this.register_ !== null)
                this.deregister_ = this.register_();
            else {
                this.origin.increment(target);
                this.deregister_ = function () { return _this.origin.decrement(target); };
            }
        }
    };
    Source.prototype.deregister = function (target) {
        if (this.registered) {
            this.registered = false;
            if (this.deregister_ !== null)
                this.deregister_();
        }
    };
    return Source;
}());
var Color;
(function (Color) {
    Color[Color["black"] = 0] = "black";
    Color[Color["gray"] = 1] = "gray";
    Color[Color["white"] = 2] = "white";
    Color[Color["purple"] = 3] = "purple";
})(Color || (Color = {}));

var roots = [];
var nextID = 0;
var verbose = false;


var Vertex = /** @class */ (function () {
    function Vertex(name, rank, sources) {
        this.targets = [];
        this.childrn = [];
        this.visited = false;
        // --------------------------------------------------------
        // Synchronous Cycle Collection algorithm presented in "Concurrent
        // Cycle Collection in Reference Counted Systems" by David F. Bacon
        // and V.T. Rajan.
        this.color = Color.black;
        this.buffered = false;
        this.refCountAdj = 0;
        this.name = name;
        this.rank = rank;
        this.sources = sources;
        this.id = nextID++;
    }
    Vertex.prototype.refCount = function () { return this.targets.length; };
    
    Vertex.prototype.register = function (target) {
        return this.increment(target);
    };
    Vertex.prototype.deregister = function (target) {
        if (verbose)
            console.log("deregister " + this.descr() + " => " + target.descr());
        this.decrement(target);
        Vertex.collectCycles();
    };
    Vertex.prototype.incRefCount = function (target) {
        var anyChanged = false;
        if (this.refCount() == 0) {
            for (var i = 0; i < this.sources.length; i++)
                this.sources[i].register(this);
        }
        this.targets.push(target);
        target.childrn.push(this);
        if (target.ensureBiggerThan(this.rank))
            anyChanged = true;
        totalRegistrations++;
        return anyChanged;
    };
    Vertex.prototype.decRefCount = function (target) {
        if (verbose)
            console.log("DEC " + this.descr());
        var matched = false;
        for (var i = 0; i < target.childrn.length; i++)
            if (target.childrn[i] === this) {
                target.childrn.splice(i, 1);
            }
        for (var i = 0; i < this.targets.length; i++)
            if (this.targets[i] === target) {
                this.targets.splice(i, 1);
                matched = true;
                break;
            }
        if (matched) {
            if (this.refCount() == 0) {
                for (var i = 0; i < this.sources.length; i++)
                    this.sources[i].deregister(this);
            }
            totalRegistrations--;
        }
    };
    Vertex.prototype.addSource = function (src) {
        this.sources.push(src);
        if (this.refCount() > 0)
            src.register(this);
    };
    Vertex.prototype.ensureBiggerThan = function (limit) {
        if (this.rank > limit || this.visited)
            return false;
        this.visited = true;
        this.rank = limit + 1;
        for (var i = 0; i < this.targets.length; i++)
            this.targets[i].ensureBiggerThan(this.rank);
        this.visited = false;
        return true;
    };
    Vertex.prototype.descr = function () {
        var colStr = null;
        switch (this.color) {
            case Color.black:
                colStr = "black";
                break;
            case Color.gray:
                colStr = "gray";
                break;
            case Color.white:
                colStr = "white";
                break;
            case Color.purple:
                colStr = "purple";
                break;
        }
        var str = this.id + " " + this.name + " [" + this.refCount() + "/" + this.refCountAdj + "] " + colStr + " ->";
        var chs = this.children();
        for (var i = 0; i < chs.length; i++) {
            str = str + " " + chs[i].id;
        }
        return str;
    };
    Vertex.prototype.children = function () { return this.childrn; };
    Vertex.prototype.increment = function (referrer) {
        return this.incRefCount(referrer);
    };
    Vertex.prototype.decrement = function (referrer) {
        this.decRefCount(referrer);
        if (this.refCount() == 0)
            this.release();
        else
            this.possibleRoots();
    };
    Vertex.prototype.release = function () {
        this.color = Color.black;
        if (!this.buffered)
            this.free();
    };
    Vertex.prototype.free = function () {
        while (this.targets.length > 0)
            this.decRefCount(this.targets[0]);
    };
    Vertex.prototype.possibleRoots = function () {
        if (this.color != Color.purple) {
            this.color = Color.purple;
            if (!this.buffered) {
                this.buffered = true;
                roots.push(this);
            }
        }
    };
    Vertex.collectCycles = function () {
        Vertex.markRoots();
        Vertex.scanRoots();
        Vertex.collectRoots();
    };
    Vertex.markRoots = function () {
        var newRoots = [];
        for (var i = 0; i < roots.length; i++) {
            if (verbose)
                console.log("markRoots " + roots[i].descr()); // ###
            if (roots[i].color == Color.purple) {
                roots[i].markGray();
                newRoots.push(roots[i]);
            }
            else {
                roots[i].buffered = false;
                if (roots[i].color == Color.black && roots[i].refCount() == 0)
                    roots[i].free();
            }
        }
        roots = newRoots;
    };
    Vertex.scanRoots = function () {
        for (var i = 0; i < roots.length; i++)
            roots[i].scan();
    };
    Vertex.collectRoots = function () {
        for (var i = 0; i < roots.length; i++) {
            roots[i].buffered = false;
            roots[i].collectWhite();
        }
        roots = [];
    };
    Vertex.prototype.markGray = function () {
        if (this.color != Color.gray) {
            this.color = Color.gray;
            var chs = this.children();
            for (var i = 0; i < chs.length; i++) {
                chs[i].refCountAdj--;
                if (verbose)
                    console.log("markGray " + this.descr());
                chs[i].markGray();
            }
        }
    };
    Vertex.prototype.scan = function () {
        if (verbose)
            console.log("scan " + this.descr());
        if (this.color == Color.gray) {
            if (this.refCount() + this.refCountAdj > 0)
                this.scanBlack();
            else {
                this.color = Color.white;
                if (verbose)
                    console.log("scan WHITE " + this.descr());
                var chs = this.children();
                for (var i = 0; i < chs.length; i++)
                    chs[i].scan();
            }
        }
    };
    Vertex.prototype.scanBlack = function () {
        this.color = Color.black;
        var chs = this.children();
        for (var i = 0; i < chs.length; i++) {
            chs[i].refCountAdj++;
            if (verbose)
                console.log("scanBlack " + this.descr());
            if (chs[i].color != Color.black)
                chs[i].scanBlack();
        }
    };
    Vertex.prototype.collectWhite = function () {
        if (this.color == Color.white && !this.buffered) {
            if (verbose)
                console.log("collectWhite " + this.descr());
            this.color = Color.black;
            this.refCountAdj = 0;
            var chs = this.children();
            for (var i = 0; i < chs.length; i++)
                chs[i].collectWhite();
            this.free();
        }
    };
    Vertex.NULL = new Vertex("user", 1e12, []);
    return Vertex;
}());

var Lambda1 = /** @class */ (function () {
    function Lambda1(f, deps) {
        this.f = f;
        this.deps = deps;
    }
    return Lambda1;
}());
function lambda1(f, deps) {
    return new Lambda1(f, deps);
}
function Lambda1_deps(f) {
    if (f instanceof Lambda1)
        return f.deps;
    else
        return [];
}
function Lambda1_toFunction(f) {
    if (f instanceof Lambda1)
        return f.f;
    else
        return f;
}
var Lambda2 = /** @class */ (function () {
    function Lambda2(f, deps) {
        this.f = f;
        this.deps = deps;
    }
    return Lambda2;
}());
function lambda2(f, deps) {
    return new Lambda2(f, deps);
}
function Lambda2_deps(f) {
    if (f instanceof Lambda2)
        return f.deps;
    else
        return [];
}
function Lambda2_toFunction(f) {
    if (f instanceof Lambda2)
        return f.f;
    else
        return f;
}
var Lambda3 = /** @class */ (function () {
    function Lambda3(f, deps) {
        this.f = f;
        this.deps = deps;
    }
    return Lambda3;
}());
function lambda3(f, deps) {
    return new Lambda3(f, deps);
}
function Lambda3_deps(f) {
    if (f instanceof Lambda3)
        return f.deps;
    else
        return [];
}
function Lambda3_toFunction(f) {
    if (f instanceof Lambda3)
        return f.f;
    else
        return f;
}
var Lambda4 = /** @class */ (function () {
    function Lambda4(f, deps) {
        this.f = f;
        this.deps = deps;
    }
    return Lambda4;
}());
function lambda4(f, deps) {
    return new Lambda4(f, deps);
}
function Lambda4_deps(f) {
    if (f instanceof Lambda4)
        return f.deps;
    else
        return [];
}
function Lambda4_toFunction(f) {
    if (f instanceof Lambda4)
        return f.f;
    else
        return f;
}
var Lambda5 = /** @class */ (function () {
    function Lambda5(f, deps) {
        this.f = f;
        this.deps = deps;
    }
    return Lambda5;
}());
function lambda5(f, deps) {
    return new Lambda5(f, deps);
}
function Lambda5_deps(f) {
    if (f instanceof Lambda5)
        return f.deps;
    else
        return [];
}
function Lambda5_toFunction(f) {
    if (f instanceof Lambda5)
        return f.f;
    else
        return f;
}
var Lambda6 = /** @class */ (function () {
    function Lambda6(f, deps) {
        this.f = f;
        this.deps = deps;
    }
    return Lambda6;
}());
function lambda6(f, deps) {
    return new Lambda6(f, deps);
}
function Lambda6_deps(f) {
    if (f instanceof Lambda6)
        return f.deps;
    else
        return [];
}
function Lambda6_toFunction(f) {
    if (f instanceof Lambda6)
        return f.f;
    else
        return f;
}
function toSources(deps) {
    var ss = [];
    for (var i = 0; i < deps.length; i++) {
        var dep = deps[i];
        ss.push(new Source(dep.getVertex__(), null));
    }
    return ss;
}

/*! *****************************************************************************
Copyright (c) Microsoft Corporation. All rights reserved.
Licensed under the Apache License, Version 2.0 (the "License"); you may not use
this file except in compliance with the License. You may obtain a copy of the
License at http://www.apache.org/licenses/LICENSE-2.0

THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
MERCHANTABLITY OR NON-INFRINGEMENT.

See the Apache Version 2.0 License for specific language governing permissions
and limitations under the License.
***************************************************************************** */
/* global Reflect, Promise */

var extendStatics = Object.setPrototypeOf ||
    ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
    function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };

function __extends(d, b) {
    extendStatics(d, b);
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
}

var Entry = /** @class */ (function () {
    function Entry(rank, action) {
        this.rank = rank;
        this.action = action;
        this.seq = Entry.nextSeq++;
    }
    Entry.prototype.toString = function () {
        return this.seq.toString();
    };
    Entry.nextSeq = 0;
    return Entry;
}());
var Transaction = /** @class */ (function () {
    function Transaction() {
        this.inCallback = 0;
        this.toRegen = false;
        this.prioritizedQ = new Collections.PriorityQueue(function (a, b) {
            // Note: Low priority numbers are treated as "greater" according to this
            // comparison, so that the lowest numbers are highest priority and go first.
            if (a.rank.rank < b.rank.rank)
                return 1;
            if (a.rank.rank > b.rank.rank)
                return -1;
            if (a.seq < b.seq)
                return 1;
            if (a.seq > b.seq)
                return -1;
            return 0;
        });
        this.entries = new Collections.Set(function (a) { return a.toString(); });
        this.sampleQ = [];
        this.lastQ = [];
        this.postQ = null;
    }
    Transaction.prototype.requestRegen = function () {
        this.toRegen = true;
    };
    Transaction.prototype.prioritized = function (target, action) {
        var e = new Entry(target, action);
        this.prioritizedQ.enqueue(e);
        this.entries.add(e);
    };
    Transaction.prototype.sample = function (h) {
        this.sampleQ.push(h);
    };
    Transaction.prototype.last = function (h) {
        this.lastQ.push(h);
    };
    /**
     * Add an action to run after all last() actions.
     */
    Transaction.prototype.post = function (childIx, action) {
        if (this.postQ == null)
            this.postQ = [];
        // If an entry exists already, combine the old one with the new one.
        while (this.postQ.length <= childIx)
            this.postQ.push(null);
        var existing = this.postQ[childIx], neu = existing === null ? action
            : function () {
                existing();
                action();
            };
        this.postQ[childIx] = neu;
    };
    // If the priority queue has entries in it when we modify any of the nodes'
    // ranks, then we need to re-generate it to make sure it's up-to-date.
    Transaction.prototype.checkRegen = function () {
        if (this.toRegen) {
            this.toRegen = false;
            this.prioritizedQ.clear();
            var es = this.entries.toArray();
            for (var i = 0; i < es.length; i++)
                this.prioritizedQ.enqueue(es[i]);
        }
    };
    Transaction.prototype.isActive = function () {
        return Transaction.currentTransaction ? true : false;
    };
    Transaction.prototype.close = function () {
        while (true) {
            while (true) {
                this.checkRegen();
                if (this.prioritizedQ.isEmpty())
                    break;
                var e = this.prioritizedQ.dequeue();
                this.entries.remove(e);
                e.action();
            }
            var sq = this.sampleQ;
            this.sampleQ = [];
            for (var i = 0; i < sq.length; i++)
                sq[i]();
            if (this.prioritizedQ.isEmpty() && this.sampleQ.length < 1)
                break;
        }
        for (var i = 0; i < this.lastQ.length; i++)
            this.lastQ[i]();
        this.lastQ = [];
        if (this.postQ != null) {
            for (var i = 0; i < this.postQ.length; i++) {
                if (this.postQ[i] != null) {
                    var parent_1 = Transaction.currentTransaction;
                    try {
                        if (i > 0) {
                            Transaction.currentTransaction = new Transaction();
                            try {
                                this.postQ[i]();
                                Transaction.currentTransaction.close();
                            }
                            catch (err) {
                                Transaction.currentTransaction.close();
                                throw err;
                            }
                        }
                        else {
                            Transaction.currentTransaction = null;
                            this.postQ[i]();
                        }
                        Transaction.currentTransaction = parent_1;
                    }
                    catch (err) {
                        Transaction.currentTransaction = parent_1;
                        throw err;
                    }
                }
            }
            this.postQ = null;
        }
    };
    /**
     * Add a runnable that will be executed whenever a transaction is started.
     * That runnable may start transactions itself, which will not cause the
     * hooks to be run recursively.
     *
     * The main use case of this is the implementation of a time/alarm system.
     */
    Transaction.onStart = function (r) {
        Transaction.onStartHooks.push(r);
    };
    Transaction.run = function (f) {
        var transWas = Transaction.currentTransaction;
        if (transWas === null) {
            if (!Transaction.runningOnStartHooks) {
                Transaction.runningOnStartHooks = true;
                try {
                    for (var i = 0; i < Transaction.onStartHooks.length; i++)
                        Transaction.onStartHooks[i]();
                }
                finally {
                    Transaction.runningOnStartHooks = false;
                }
            }
            Transaction.currentTransaction = new Transaction();
        }
        try {
            var a = f();
            if (transWas === null) {
                Transaction.currentTransaction.close();
                Transaction.currentTransaction = null;
            }
            return a;
        }
        catch (err) {
            if (transWas === null) {
                Transaction.currentTransaction.close();
                Transaction.currentTransaction = null;
            }
            throw err;
        }
    };
    Transaction.currentTransaction = null;
    Transaction.onStartHooks = [];
    Transaction.runningOnStartHooks = false;
    return Transaction;
}());

var CoalesceHandler = /** @class */ (function () {
    function CoalesceHandler(f, out) {
        this.f = Lambda2_toFunction(f);
        this.out = out;
        this.out.getVertex__().sources = this.out.getVertex__().sources.concat(toSources(Lambda2_deps(f)));
        this.accumValid = false;
    }
    CoalesceHandler.prototype.send_ = function (a) {
        var _this = this;
        if (this.accumValid)
            this.accum = this.f(this.accum, a);
        else {
            Transaction.currentTransaction.prioritized(this.out.getVertex__(), function () {
                _this.out.send_(_this.accum);
                _this.accumValid = false;
                _this.accum = null;
            });
            this.accum = a;
            this.accumValid = true;
        }
    };
    return CoalesceHandler;
}());

/**
 * A representation for a value that may not be available until the current
 * transaction is closed.
 */
var Lazy = /** @class */ (function () {
    function Lazy(f) {
        this.f = f;
    }
    /**
     * Get the value if available, throwing an exception if not.
     * In the general case this should only be used in subsequent transactions to
     * when the Lazy was obtained.
     */
    Lazy.prototype.get = function () {
        return this.f();
    };
    /**
     * Map the lazy value according to the specified function, so the returned Lazy reflects
     * the value of the function applied to the input Lazy's value.
     * @param f Function to apply to the contained value. It must be <em>referentially transparent</em>.
     */
    Lazy.prototype.map = function (f) {
        var _this = this;
        return new Lazy(function () { return f(_this.f()); });
    };
    /**
     * Lift a binary function into lazy values, so the returned Lazy reflects
     * the value of the function applied to the input Lazys' values.
     */
    Lazy.prototype.lift = function (b, f) {
        var _this = this;
        return new Lazy(function () { return f(_this.f(), b.f()); });
    };
    /**
     * Lift a ternary function into lazy values, so the returned Lazy reflects
     * the value of the function applied to the input Lazys' values.
     */
    Lazy.prototype.lift3 = function (b, c, f) {
        var _this = this;
        return new Lazy(function () { return f(_this.f(), b.f(), c.f()); });
    };
    /**
     * Lift a quaternary function into lazy values, so the returned Lazy reflects
     * the value of the function applied to the input Lazys' values.
     */
    Lazy.prototype.lift4 = function (b, c, d, f) {
        var _this = this;
        return new Lazy(function () { return f(_this.f(), b.f(), c.f(), d.f()); });
    };
    return Lazy;
}());

var Unit = /** @class */ (function () {
    function Unit() {
    }
    Unit.UNIT = new Unit();
    return Unit;
}());

var Operational = /** @class */ (function () {
    function Operational() {
    }
    /**
     * A stream that gives the updates/steps for a {@link Cell}.
     * <P>
     * This is an OPERATIONAL primitive, which is not part of the main Sodium
     * API. It breaks the property of non-detectability of cell steps/updates.
     * The rule with this primitive is that you should only use it in functions
     * that do not allow the caller to detect the cell updates.
     */
    Operational.updates = function (c) {
        /*  Don't think this is needed
        const out = new StreamWithSend<A>(null);
        out.setVertex__(new Vertex("updates", 0, [
                new Source(
                    c.getStream__().getVertex__(),
                    () => {
                        return c.getStream__().listen_(out.getVertex__(), (a : A) => {
                            out.send_(a);
                        }, false);
                    }
                ),
                new Source(
                    c.getVertex__(),
                    () => {
                        return () => { };
                    }
                )
            ]
        ));
        return out;
        */
        return c.getStream__();
    };
    /**
     * A stream that is guaranteed to fire once in the transaction where value() is invoked, giving
     * the current value of the cell, and thereafter behaves like {@link updates(Cell)},
     * firing for each update/step of the cell's value.
     * <P>
     * This is an OPERATIONAL primitive, which is not part of the main Sodium
     * API. It breaks the property of non-detectability of cell steps/updates.
     * The rule with this primitive is that you should only use it in functions
     * that do not allow the caller to detect the cell updates.
     */
    Operational.value = function (c) {
        return Transaction.run(function () {
            var sSpark = new StreamWithSend();
            Transaction.currentTransaction.prioritized(sSpark.getVertex__(), function () {
                sSpark.send_(Unit.UNIT);
            });
            var sInitial = sSpark.snapshot1(c);
            return Operational.updates(c).orElse(sInitial);
        });
    };
    /**
     * Push each event onto a new transaction guaranteed to come before the next externally
     * initiated transaction. Same as {@link split(Stream)} but it works on a single value.
     */
    Operational.defer = function (s) {
        return Operational.split(s.map(function (a) {
            return [a];
        }));
    };
    /**
     * Push each event in the list onto a newly created transaction guaranteed
     * to come before the next externally initiated transaction. Note that the semantics
     * are such that two different invocations of split() can put events into the same
     * new transaction, so the resulting stream's events could be simultaneous with
     * events output by split() or {@link defer(Stream)} invoked elsewhere in the code.
     */
    Operational.split = function (s) {
        var out = new StreamWithSend(null);
        out.setVertex__(new Vertex("split", 0, [
            new Source(s.getVertex__(), function () {
                return s.listen_(out.getVertex__(), function (as) {
                    var _loop_1 = function (i) {
                        Transaction.currentTransaction.post(i, function () {
                            Transaction.run(function () {
                                out.send_(as[i]);
                            });
                        });
                    };
                    for (var i = 0; i < as.length; i++) {
                        _loop_1(i);
                    }
                }, false);
            })
        ]));
        return out;
    };
    return Operational;
}());

var LazySample = /** @class */ (function () {
    function LazySample(cell) {
        this.hasValue = false;
        this.value = null;
        this.cell = cell;
    }
    return LazySample;
}());
var ApplyState = /** @class */ (function () {
    function ApplyState() {
        this.f = null;
        this.f_present = false;
        this.a = null;
        this.a_present = false;
    }
    return ApplyState;
}());
var Cell = /** @class */ (function () {
    function Cell(initValue, str) {
        var _this = this;
        this.value = initValue;
        if (!str) {
            this.str = new Stream();
            this.vertex = new Vertex("ConstCell", 0, []);
        }
        else
            Transaction.run(function () { return _this.setStream(str); });
    }
    Cell.prototype.setStream = function (str) {
        var _this = this;
        this.str = str;
        var me = this, src = new Source(str.getVertex__(), function () {
            return str.listen_(me.vertex, function (a) {
                if (me.valueUpdate == null) {
                    Transaction.currentTransaction.last(function () {
                        me.value = me.valueUpdate;
                        me.lazyInitValue = null;
                        me.valueUpdate = null;
                    });
                }
                me.valueUpdate = a;
            }, false);
        });
        this.vertex = new Vertex("Cell", 0, [src]);
        // We do a trick here of registering the source for the duration of the current
        // transaction so that we are guaranteed to catch any stream events that
        // occur in the same transaction.
        this.vertex.register(Vertex.NULL);
        Transaction.currentTransaction.last(function () {
            _this.vertex.deregister(Vertex.NULL);
        });
    };
    Cell.prototype.getVertex__ = function () {
        return this.vertex;
    };
    Cell.prototype.getStream__ = function () {
        return this.str;
    };
    /**
     * Sample the cell's current value.
     * <p>
     * It should generally be avoided in favour of {@link listen(Handler)} so you don't
     * miss any updates, but in many circumstances it makes sense.
     * <p>
     * NOTE: In the Java and other versions of Sodium, using sample() inside map(), filter() and
     * merge() is encouraged. In the Javascript/Typescript version, not so much, for the
     * following reason: The memory management is different in the Javascript version, and this
     * requires us to track all dependencies. In order for the use of sample() inside
     * a closure to be correct, the cell that was sample()d inside the closure would have to be
     * declared explicitly using the helpers lambda1(), lambda2(), etc. Because this is
     * something that can be got wrong, we don't encourage this kind of use of sample() in
     * Javascript. Better and simpler to use snapshot().
     * <p>
     * NOTE: If you need to sample() a cell, you have to make sure it's "alive" in terms of
     * memory management or it will ignore updates. To make a cell work correctly
     * with sample(), you have to ensure that it's being used. One way to guarantee this is
     * to register a dummy listener on the cell. It will also work to have it referenced
     * by something that is ultimately being listened to.
     */
    Cell.prototype.sample = function () {
        var _this = this;
        return Transaction.run(function () { return _this.sampleNoTrans__(); });
    };
    Cell.prototype.sampleNoTrans__ = function () {
        return this.value;
    };
    /**
     * A variant of {@link sample()} that works with {@link CellLoop}s when they haven't been looped yet.
     * It should be used in any code that's general enough that it could be passed a {@link CellLoop}.
     * @see Stream#holdLazy(Lazy) Stream.holdLazy()
     */
    Cell.prototype.sampleLazy = function () {
        var me = this;
        return Transaction.run(function () { return me.sampleLazyNoTrans__(); });
    };
    Cell.prototype.sampleLazyNoTrans__ = function () {
        var me = this, s = new LazySample(me);
        Transaction.currentTransaction.sample(function () {
            s.value = me.valueUpdate != null ? me.valueUpdate : me.sampleNoTrans__();
            s.hasValue = true;
            s.cell = null;
        });
        return new Lazy(function () {
            if (s.hasValue)
                return s.value;
            else
                return s.cell.sample();
        });
    };
    /**
     * Transform the cell's value according to the supplied function, so the returned Cell
     * always reflects the value of the function applied to the input Cell's value.
     * @param f Function to apply to convert the values. It must be <em>referentially transparent</em>.
     */
    Cell.prototype.map = function (f) {
        var c = this;
        return Transaction.run(function () {
            return Operational.updates(c).map(f).holdLazy(c.sampleLazy().map(Lambda1_toFunction(f)));
        });
    };
    /**
     * Lift a binary function into cells, so the returned Cell always reflects the specified
     * function applied to the input cells' values.
     * @param fn Function to apply. It must be <em>referentially transparent</em>.
     */
    Cell.prototype.lift = function (b, fn0) {
        var fn = Lambda2_toFunction(fn0), cf = this.map(function (aa) { return function (bb) { return fn(aa, bb); }; });
        return Cell.apply(cf, b, toSources(Lambda2_deps(fn0)));
    };
    /**
     * Lift a ternary function into cells, so the returned Cell always reflects the specified
     * function applied to the input cells' values.
     * @param fn Function to apply. It must be <em>referentially transparent</em>.
     */
    Cell.prototype.lift3 = function (b, c, fn0) {
        var fn = Lambda3_toFunction(fn0), mf = function (aa) { return function (bb) { return function (cc) { return fn(aa, bb, cc); }; }; }, cf = this.map(mf);
        return Cell.apply(Cell.apply(cf, b), c, toSources(Lambda3_deps(fn0)));
    };
    /**
     * Lift a quaternary function into cells, so the returned Cell always reflects the specified
     * function applied to the input cells' values.
     * @param fn Function to apply. It must be <em>referentially transparent</em>.
     */
    Cell.prototype.lift4 = function (b, c, d, fn0) {
        var fn = Lambda4_toFunction(fn0), mf = function (aa) { return function (bb) { return function (cc) { return function (dd) { return fn(aa, bb, cc, dd); }; }; }; }, cf = this.map(mf);
        return Cell.apply(Cell.apply(Cell.apply(cf, b), c), d, toSources(Lambda4_deps(fn0)));
    };
    /**
     * Lift a 5-argument function into cells, so the returned Cell always reflects the specified
     * function applied to the input cells' values.
     * @param fn Function to apply. It must be <em>referentially transparent</em>.
     */
    Cell.prototype.lift5 = function (b, c, d, e, fn0) {
        var fn = Lambda5_toFunction(fn0), mf = function (aa) { return function (bb) { return function (cc) { return function (dd) { return function (ee) { return fn(aa, bb, cc, dd, ee); }; }; }; }; }, cf = this.map(mf);
        return Cell.apply(Cell.apply(Cell.apply(Cell.apply(cf, b), c), d), e, toSources(Lambda5_deps(fn0)));
    };
    /**
     * Lift a 6-argument function into cells, so the returned Cell always reflects the specified
     * function applied to the input cells' values.
     * @param fn Function to apply. It must be <em>referentially transparent</em>.
     */
    Cell.prototype.lift6 = function (b, c, d, e, f, fn0) {
        var fn = Lambda6_toFunction(fn0), mf = function (aa) { return function (bb) { return function (cc) { return function (dd) { return function (ee) { return function (ff) { return fn(aa, bb, cc, dd, ee, ff); }; }; }; }; }; }, cf = this.map(mf);
        return Cell.apply(Cell.apply(Cell.apply(Cell.apply(Cell.apply(cf, b), c), d), e), f, toSources(Lambda6_deps(fn0)));
    };
    /**
     * Apply a value inside a cell to a function inside a cell. This is the
     * primitive for all function lifting.
     */
    Cell.apply = function (cf, ca, sources) {
        return Transaction.run(function () {
            var state = new ApplyState(), out = new StreamWithSend(), cf_value = Operational.value(cf), ca_value = Operational.value(ca), src1 = new Source(cf_value.getVertex__(), function () {
                return cf_value.listen_(out.getVertex__(), function (f) {
                    state.f = f;
                    state.f_present = true;
                    if (state.a_present)
                        out.send_(state.f(state.a));
                }, false);
            }), src2 = new Source(ca_value.getVertex__(), function () {
                return ca_value.listen_(out.getVertex__(), function (a) {
                    state.a = a;
                    state.a_present = true;
                    if (state.f_present)
                        out.send_(state.f(state.a));
                }, false);
            });
            out.setVertex__(new Vertex("apply", 0, [src1, src2].concat(sources ? sources : [])));
            return out.coalesce__(function (l, r) { return r; }).holdLazy(new Lazy(function () {
                return cf.sampleNoTrans__()(ca.sampleNoTrans__());
            }));
        });
    };
    /**
     * Unwrap a cell inside another cell to give a time-varying cell implementation.
     */
    Cell.switchC = function (cca) {
        return Transaction.run(function () {
            var za = cca.sampleLazy().map(function (ba) { return ba.sample(); }), out = new StreamWithSend();
            var last_ca = null;
            var cca_value = Operational.value(cca), src = new Source(cca_value.getVertex__(), function () {
                var kill2 = last_ca === null ? null :
                    Operational.value(last_ca).listen_(out.getVertex__(), function (a) { return out.send_(a); }, false);
                var kill1 = cca_value.listen_(out.getVertex__(), function (ca) {
                    // Note: If any switch takes place during a transaction, then the
                    // coalesce__() below will always cause a sample to be fetched
                    // from the one we just switched to. So anything from the old input cell
                    // that might have happened during this transaction will be suppressed.
                    last_ca = ca;
                    if (kill2 !== null)
                        kill2();
                    kill2 = Operational.value(ca).listen_(out.getVertex__(), function (a) { return out.send_(a); }, false);
                }, false);
                return function () { kill1(); kill2(); };
            });
            out.setVertex__(new Vertex("switchC", 0, [src]));
            return out.coalesce__(function (l, r) { return r; }).holdLazy(za);
        });
    };
    /**
     * Unwrap a stream inside a cell to give a time-varying stream implementation.
     */
    Cell.switchS = function (csa) {
        return Transaction.run(function () {
            var out = new StreamWithSend(), h2 = function (a) {
                out.send_(a);
            }, src = new Source(csa.getVertex__(), function () {
                var kill2 = csa.sampleNoTrans__().listen_(out.getVertex__(), h2, false);
                var kill1 = csa.getStream__().listen_(out.getVertex__(), function (sa) {
                    kill2();
                    kill2 = sa.listen_(out.getVertex__(), h2, true);
                }, false);
                return function () { kill1(); kill2(); };
            });
            out.setVertex__(new Vertex("switchS", 0, [src]));
            return out;
        });
    };
    /**
     * Listen for updates to the value of this cell. This is the observer pattern. The
     * returned {@link Listener} has a {@link Listener#unlisten()} method to cause the
     * listener to be removed. This is an OPERATIONAL mechanism is for interfacing between
     * the world of I/O and for FRP.
     * @param h The handler to execute when there's a new value.
     *   You should make no assumptions about what thread you are called on, and the
     *   handler should not block. You are not allowed to use {@link CellSink#send(Object)}
     *   or {@link StreamSink#send(Object)} in the handler.
     *   An exception will be thrown, because you are not meant to use this to create
     *   your own primitives.
     */
    Cell.prototype.listen = function (h) {
        var _this = this;
        return Transaction.run(function () {
            return Operational.value(_this).listen(h);
        });
    };
    /**
     * Fantasy-land Algebraic Data Type Compatability.
     * Cell satisfies the Monad and Comonad Categories (and hence Functor, Apply, Applicative, and Extend as well)
     * @see {@link https://github.com/fantasyland/fantasy-land} for more info
     */
    //of :: Applicative f => a -> f a
    Cell['fantasy-land/of'] = function (a) {
        return new Cell(a);
    };
    //map :: Functor f => f a ~> (a -> b) -> f b
    Cell.prototype['fantasy-land/map'] = function (f) {
        return this.map(f);
    };
    //ap :: Apply f => f a ~> f (a -> b) -> f b
    Cell.prototype['fantasy-land/ap'] = function (cf) {
        return Cell.apply(cf, this);
    };
    //chain :: Chain m => m a ~> (a -> m b) -> m b
    Cell.prototype['fantasy-land/chain'] = function (f) {
        return Cell.switchC(this.map(f));
    };
    //extend :: Extend w => w a ~> (w a -> b) -> w b
    Cell.prototype['fantasy-land/extend'] = function (f) {
        return new Cell(f(this));
    };
    //extract :: Comonad w => w a ~> () -> a
    Cell.prototype['fantasy-land/extract'] = function () {
        return this.sample();
    };
    return Cell;
}());

var Listener = /** @class */ (function () {
    function Listener(h, target) {
        this.h = h;
        this.target = target;
    }
    return Listener;
}());

var LazyCell = /** @class */ (function (_super) {
    __extends(LazyCell, _super);
    function LazyCell(lazyInitValue, str) {
        var _this = _super.call(this, null, null) || this;
        Transaction.run(function () {
            if (str)
                _this.setStream(str);
            _this.lazyInitValue = lazyInitValue;
        });
        return _this;
    }
    LazyCell.prototype.sampleNoTrans__ = function () {
        if (this.value == null && this.lazyInitValue != null) {
            this.value = this.lazyInitValue.get();
            this.lazyInitValue = null;
        }
        return this.value;
    };
    return LazyCell;
}(Cell));

//import { StreamLoop } from "./StreamLoop";
var Stream = /** @class */ (function () {
    function Stream(vertex) {
        this.listeners = [];
        this.firings = [];
        this.vertex = vertex ? vertex : new Vertex("Stream", 0, []);
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
        var ff = Lambda1_toFunction(f);
        out.vertex = new Vertex("map", 0, [
            new Source(this.vertex, function () {
                return _this.listen_(out.vertex, function (a) {
                    out.send_(ff(a));
                }, false);
            })
        ].concat(toSources(Lambda1_deps(f))));
        return out;
    };
    /**
     * Transform the stream's event values into the specified constant value.
     * @param b Constant value.
     */
    Stream.prototype.mapTo = function (b) {
        var _this = this;
        var out = new StreamWithSend(null);
        out.vertex = new Vertex("mapTo", 0, [
            new Source(this.vertex, function () {
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
        var left = new Vertex("merge", 0, []);
        left.sources.push(new Source(this.vertex, function () {
            return _this.listen_(left, function (a) {
                out.send_(a);
            }, false);
        }));
        out.vertex.sources = out.vertex.sources.concat([
            new Source(left, function () {
                left.register(out.vertex);
                return function () { left.deregister(out.vertex); };
            }),
            new Source(s.vertex, function () {
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
        var coalescer = new CoalesceHandler(f, out);
        out.vertex.sources = out.vertex.sources.concat([
            new Source(this.vertex, function () {
                return _this.listen_(out.vertex, function (a) {
                    coalescer.send_(a);
                }, false);
            })
        ]).concat(toSources(Lambda2_deps(f)));
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
        return Transaction.run(function () {
            return _this.merge_(s).coalesce__(f);
        });
    };
    /**
     * Return a stream that only outputs events for which the predicate returns true.
     */
    Stream.prototype.filter = function (f) {
        var _this = this;
        var out = new StreamWithSend(null);
        var ff = Lambda1_toFunction(f);
        out.vertex = new Vertex("filter", 0, [
            new Source(this.vertex, function () {
                return _this.listen_(out.vertex, function (a) {
                    if (ff(a))
                        out.send_(a);
                }, false);
            })
        ].concat(toSources(Lambda1_deps(f))));
        return out;
    };
    /**
     * Return a stream that only outputs events that have present
     * values, discarding null values.
     */
    Stream.prototype.filterNotNull = function () {
        var _this = this;
        var out = new StreamWithSend(null);
        out.vertex = new Vertex("filterNotNull", 0, [
            new Source(this.vertex, function () {
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
        out.vertex = new Vertex("snapshot1", 0, [
            new Source(this.vertex, function () {
                return _this.listen_(out.vertex, function (a) {
                    out.send_(c.sampleNoTrans__());
                }, false);
            }),
            new Source(c.getVertex__(), null)
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
    Stream.prototype.snapshot = function (b, f_) {
        var _this = this;
        var out = new StreamWithSend(null);
        var ff = Lambda2_toFunction(f_);
        out.vertex = new Vertex("snapshot", 0, [
            new Source(this.vertex, function () {
                return _this.listen_(out.vertex, function (a) {
                    out.send_(ff(a, b.sampleNoTrans__()));
                }, false);
            }),
            new Source(b.getVertex__(), null)
        ].concat(toSources(Lambda2_deps(f_))));
        return out;
    };
    /**
     * Return a stream whose events are the result of the combination using the specified
     * function of the input stream's event value and the value of the cells at that time.
     * <P>
     * There is an implicit delay: State updates caused by event firings being held with
     * {@link Stream#hold(Object)} don't become visible as the cell's current value until
     * the following transaction. To put this another way, snapshot()
     * always sees the value of a cell as it was before any state changes from the current
     * transaction.
     */
    Stream.prototype.snapshot3 = function (b, c, f_) {
        var _this = this;
        var out = new StreamWithSend(null);
        var ff = Lambda3_toFunction(f_);
        out.vertex = new Vertex("snapshot", 0, [
            new Source(this.vertex, function () {
                return _this.listen_(out.vertex, function (a) {
                    out.send_(ff(a, b.sampleNoTrans__(), c.sampleNoTrans__()));
                }, false);
            }),
            new Source(b.getVertex__(), null),
            new Source(c.getVertex__(), null)
        ].concat(toSources(Lambda3_deps(f_))));
        return out;
    };
    /**
     * Return a stream whose events are the result of the combination using the specified
     * function of the input stream's event value and the value of the cells at that time.
     * <P>
     * There is an implicit delay: State updates caused by event firings being held with
     * {@link Stream#hold(Object)} don't become visible as the cell's current value until
     * the following transaction. To put this another way, snapshot()
     * always sees the value of a cell as it was before any state changes from the current
     * transaction.
     */
    Stream.prototype.snapshot4 = function (b, c, d, f_) {
        var _this = this;
        var out = new StreamWithSend(null);
        var ff = Lambda4_toFunction(f_);
        out.vertex = new Vertex("snapshot", 0, [
            new Source(this.vertex, function () {
                return _this.listen_(out.vertex, function (a) {
                    out.send_(ff(a, b.sampleNoTrans__(), c.sampleNoTrans__(), d.sampleNoTrans__()));
                }, false);
            }),
            new Source(b.getVertex__(), null),
            new Source(c.getVertex__(), null),
            new Source(d.getVertex__(), null)
        ].concat(toSources(Lambda4_deps(f_))));
        return out;
    };
    /**
     * Return a stream whose events are the result of the combination using the specified
     * function of the input stream's event value and the value of the cells at that time.
     * <P>
     * There is an implicit delay: State updates caused by event firings being held with
     * {@link Stream#hold(Object)} don't become visible as the cell's current value until
     * the following transaction. To put this another way, snapshot()
     * always sees the value of a cell as it was before any state changes from the current
     * transaction.
     */
    Stream.prototype.snapshot5 = function (b, c, d, e, f_) {
        var _this = this;
        var out = new StreamWithSend(null);
        var ff = Lambda5_toFunction(f_);
        out.vertex = new Vertex("snapshot", 0, [
            new Source(this.vertex, function () {
                return _this.listen_(out.vertex, function (a) {
                    out.send_(ff(a, b.sampleNoTrans__(), c.sampleNoTrans__(), d.sampleNoTrans__(), e.sampleNoTrans__()));
                }, false);
            }),
            new Source(b.getVertex__(), null),
            new Source(c.getVertex__(), null),
            new Source(d.getVertex__(), null),
            new Source(e.getVertex__(), null)
        ].concat(toSources(Lambda5_deps(f_))));
        return out;
    };
    /**
     * Return a stream whose events are the result of the combination using the specified
     * function of the input stream's event value and the value of the cells at that time.
     * <P>
     * There is an implicit delay: State updates caused by event firings being held with
     * {@link Stream#hold(Object)} don't become visible as the cell's current value until
     * the following transaction. To put this another way, snapshot()
     * always sees the value of a cell as it was before any state changes from the current
     * transaction.
     */
    Stream.prototype.snapshot6 = function (b, c, d, e, f, f_) {
        var _this = this;
        var out = new StreamWithSend(null);
        var ff = Lambda6_toFunction(f_);
        out.vertex = new Vertex("snapshot", 0, [
            new Source(this.vertex, function () {
                return _this.listen_(out.vertex, function (a) {
                    out.send_(ff(a, b.sampleNoTrans__(), c.sampleNoTrans__(), d.sampleNoTrans__(), e.sampleNoTrans__(), f.sampleNoTrans__()));
                }, false);
            }),
            new Source(b.getVertex__(), null),
            new Source(c.getVertex__(), null),
            new Source(d.getVertex__(), null),
            new Source(e.getVertex__(), null),
            new Source(f.getVertex__(), null)
        ].concat(toSources(Lambda6_deps(f_))));
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
        return new Cell(initValue, this);
    };
    /**
     * A variant of {@link hold(Object)} with an initial value captured by {@link Cell#sampleLazy()}.
     */
    Stream.prototype.holdLazy = function (initValue) {
        return new LazyCell(initValue, this);
    };
    /**
     * Transform an event with a generalized state loop (a Mealy machine). The function
     * is passed the input and the old state and returns the new state and output value.
     * @param f Function to apply to update the state. It may construct FRP logic or use
     *    {@link Cell#sample()} in which case it is equivalent to {@link Stream#snapshot(Cell)}ing the
     *    cell. Apart from this the function must be <em>referentially transparent</em>.
     */
    Stream.prototype.collect = function (initState, f) {
        return this.collectLazy(new Lazy(function () { return initState; }), f);
    };
    /**
     * A variant of {@link collect(Object, Lambda2)} that takes an initial state returned by
     * {@link Cell#sampleLazy()}.
     */
    Stream.prototype.collectLazy = function (initState, f) {
        var ea = this;
        return Transaction.run(function () {
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
        return this.accumLazy(new Lazy(function () { return initState; }), f);
    };
    /**
     * A variant of {@link accum(Object, Lambda2)} that takes an initial state returned by
     * {@link Cell#sampleLazy()}.
     */
    Stream.prototype.accumLazy = function (initState, f) {
        var ea = this;
        return Transaction.run(function () {
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
            return Transaction.run(() => {
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
        return Transaction.run(function () { return me.gate(me.mapTo(false).hold(true)); });
    };
    Stream.prototype.listen = function (h) {
        var _this = this;
        return Transaction.run(function () {
            return _this.listen_(Vertex.NULL, h, false);
        });
    };
    Stream.prototype.listen_ = function (target, h, suppressEarlierFirings) {
        var _this = this;
        if (this.vertex.register(target))
            Transaction.currentTransaction.requestRegen();
        var listener = new Listener(h, target);
        this.listeners.push(listener);
        if (!suppressEarlierFirings && this.firings.length != 0) {
            var firings_1 = this.firings.slice();
            Transaction.currentTransaction.prioritized(target, function () {
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
    /**
     * Fantasy-land Algebraic Data Type Compatability.
     * Stream satisfies the Functor and Monoid Categories (and hence Semigroup)
     * @see {@link https://github.com/fantasyland/fantasy-land} for more info
     */
    //map :: Functor f => f a ~> (a -> b) -> f b
    Stream.prototype['fantasy-land/map'] = function (f) {
        return this.map(f);
    };
    //concat :: Semigroup a => a ~> a -> a
    Stream.prototype['fantasy-land/concat'] = function (a) {
        return this.merge(a, function (left, right) {
            return (Z.Semigroup.test(left)) ? Z.concat(left, right) : left;
        });
    };
    //empty :: Monoid m => () -> m
    Stream.prototype['fantasy-land/empty'] = function () {
        return new Stream();
    };
    return Stream;
}());
var StreamWithSend = /** @class */ (function (_super) {
    __extends(StreamWithSend, _super);
    function StreamWithSend(vertex) {
        return _super.call(this, vertex) || this;
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
            Transaction.currentTransaction.last(function () {
                _this.firings = [];
            });
        this.firings.push(a);
        var listeners = this.listeners.slice();
        var _loop_1 = function (i) {
            var h = listeners[i].h;
            Transaction.currentTransaction.prioritized(listeners[i].target, function () {
                Transaction.currentTransaction.inCallback++;
                try {
                    h(a);
                    Transaction.currentTransaction.inCallback--;
                }
                catch (err) {
                    Transaction.currentTransaction.inCallback--;
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
/**
 * A forward reference for a {@link Stream} equivalent to the Stream that is referenced.
 */
var StreamLoop = /** @class */ (function (_super) {
    __extends(StreamLoop, _super);
    function StreamLoop() {
        var _this = _super.call(this) || this;
        _this.assigned__ = false; // to do: Figure out how to hide this
        _this.vertex.name = "StreamLoop";
        if (Transaction.currentTransaction === null)
            throw new Error("StreamLoop/CellLoop must be used within an explicit transaction");
        return _this;
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
        this.vertex.addSource(new Source(sa_out.getVertex__(), function () {
            return sa_out.listen_(_this.vertex, function (a) {
                _this.send_(a);
            }, false);
        }));
    };
    return StreamLoop;
}(StreamWithSend));

/**
 * A stream that allows values to be pushed into it, acting as an interface between the
 * world of I/O and the world of FRP. Code that exports StreamSinks for read-only use
 * should downcast to {@link Stream}.
 */
var StreamSink = /** @class */ (function (_super) {
    __extends(StreamSink, _super);
    function StreamSink(f) {
        var _this = _super.call(this) || this;
        if (!f)
            f = (function (l, r) {
                throw new Error("send() called more than once per transaction, which isn't allowed. Did you want to combine the events? Then pass a combining function to your StreamSink constructor.");
            });
        _this.coalescer = new CoalesceHandler(f, _this);
        return _this;
    }
    StreamSink.prototype.send = function (a) {
        var _this = this;
        Transaction.run(function () {
            if (Transaction.currentTransaction.inCallback > 0)
                throw new Error("You are not allowed to use send() inside a Sodium callback");
            _this.coalescer.send_(a);
        });
    };
    return StreamSink;
}(StreamWithSend));

/**
 * A forward reference for a {@link Cell} equivalent to the Cell that is referenced.
 */
var CellLoop = /** @class */ (function (_super) {
    __extends(CellLoop, _super);
    function CellLoop() {
        return _super.call(this, null, new StreamLoop()) || this;
    }
    /**
     * Resolve the loop to specify what the CellLoop was a forward reference to. It
     * must be invoked inside the same transaction as the place where the CellLoop is used.
     * This requires you to create an explicit transaction with {@link Transaction#run(Lambda0)}
     * or {@link Transaction#runVoid(Runnable)}.
     */
    CellLoop.prototype.loop = function (a_out) {
        var me = this;
        Transaction.run(function () {
            me.getStream__().loop(a_out.getStream__());
            me.lazyInitValue = a_out.sampleLazy();
        });
    };
    CellLoop.prototype.sampleNoTrans__ = function () {
        if (!this.getStream__().assigned__)
            throw new Error("CellLoop sampled before it was looped");
        return _super.prototype.sampleNoTrans__.call(this);
    };
    return CellLoop;
}(LazyCell));

/**
 * A cell that allows values to be pushed into it, acting as an interface between the
 * world of I/O and the world of FRP. Code that exports CellSinks for read-only use
 * should downcast to {@link Cell}.
 */
var CellSink = /** @class */ (function (_super) {
    __extends(CellSink, _super);
    /**
     * Construct a writable cell with the specified initial value. If multiple values are
     * sent in the same transaction, the specified function is used to combine them.
     *
     * If the function is not supplied, then an exception will be thrown in this case.
     */
    function CellSink(initValue, f) {
        return _super.call(this, initValue, new StreamSink(f)) || this;
    }
    /**
     * Send a value, modifying the value of the cell. send(A) may not be used inside
     * handlers registered with {@link Stream#listen(Handler)} or {@link Cell#listen(Handler)}.
     * An exception will be thrown, because CellSink is for interfacing I/O to FRP only.
     * You are not meant to use this to define your own primitives.
     * @param a Value to push into the cell.
     */
    CellSink.prototype.send = function (a) {
        this.getStream__().send(a);
    };
    return CellSink;
}(Cell));

var Tuple2 = /** @class */ (function () {
    function Tuple2(a, b) {
        this.a = a;
        this.b = b;
    }
    return Tuple2;
}());

/**
 * An interface for implementations of FRP timer systems.
 */
var TimerSystemImpl = /** @class */ (function () {
    function TimerSystemImpl() {
    }
    return TimerSystemImpl;
}());
var nextSeq = 0;
var Event = /** @class */ (function () {
    function Event(t, sAlarm) {
        this.t = t;
        this.sAlarm = sAlarm;
        this.seq = ++nextSeq;
    }
    return Event;
}());
var TimerSystem = /** @class */ (function () {
    function TimerSystem(impl) {
        var _this = this;
        this.eventQueue = new Collections.BSTree(function (a, b) {
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
        Transaction.run(function () {
            _this.impl = impl;
            _this.tMinimum = 0;
            var timeSnk = new CellSink(impl.now());
            _this.time = timeSnk;
            // A dummy listener to time to keep it alive even when there are no other listeners.
            _this.time.listen(function (t) { });
            Transaction.onStart(function () {
                // Ensure the time is always increasing from the FRP's point of view.
                var t = _this.tMinimum = Math.max(_this.tMinimum, impl.now());
                var _loop_1 = function () {
                    var ev = null;
                    if (!_this.eventQueue.isEmpty()) {
                        var mev = _this.eventQueue.minimum();
                        if (mev.t <= t) {
                            ev = mev;
                            // TO DO: Detect infinite loops!
                        }
                    }
                    if (ev != null) {
                        timeSnk.send(ev.t);
                        Transaction.run(function () { return ev.sAlarm.send_(ev.t); });
                    }
                    else
                        return "break";
                };
                // Pop and execute all events earlier than or equal to t (the current time).
                while (true) {
                    var state_1 = _loop_1();
                    if (state_1 === "break")
                        break;
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
        var sAlarm = new StreamWithSend(null), updateTimer = function () {
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
                        // Correction to ensure the clock time appears to be >= the
                        // alarm time. It can be a few milliseconds early, and
                        // this breaks things otherwise, because it doesn't think
                        // it's time to fire the alarm yet.
                        _this.tMinimum = Math.max(_this.tMinimum, tAl);
                        // Open and close a transaction to trigger queued
                        // events to run.
                        Transaction.run(function () { });
                    });
                }
            }
        };
        sAlarm.setVertex__(new Vertex("at", 0, [
            new Source(tAlarm.getVertex__(), function () {
                active = true;
                sampled = false;
                Transaction.currentTransaction.prioritized(sAlarm.getVertex__(), updateTimer);
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

/**
 * A timer system implementation using seconds as the time unit.
 */
var SecondsTimerSystem = /** @class */ (function (_super) {
    __extends(SecondsTimerSystem, _super);
    function SecondsTimerSystem() {
        return _super.call(this, new SecondsTimerSystemImpl()) || this;
    }
    return SecondsTimerSystem;
}(TimerSystem));
var SecondsTimerSystemImpl = /** @class */ (function (_super) {
    __extends(SecondsTimerSystemImpl, _super);
    function SecondsTimerSystemImpl() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * Set a timer that will execute the specified callback at the specified time.
     * @return A function that can be used to cancel the timer.
     */
    SecondsTimerSystemImpl.prototype.setTimer = function (t, callback) {
        var timeout = setTimeout(callback, Math.max((t - this.now()) * 1000, 0));
        return function () { clearTimeout(timeout); };
    };
    /**
     * Return the current clock time.
     */
    SecondsTimerSystemImpl.prototype.now = function () {
        return Date.now() * 0.001;
    };
    return SecondsTimerSystemImpl;
}(TimerSystemImpl));

/**
 * A timer system implementation using milliseconds as the time unit.
 */
var MillisecondsTimerSystem = /** @class */ (function (_super) {
    __extends(MillisecondsTimerSystem, _super);
    function MillisecondsTimerSystem() {
        return _super.call(this, new MillisecondsTimerSystemImpl()) || this;
    }
    return MillisecondsTimerSystem;
}(TimerSystem));
var MillisecondsTimerSystemImpl = /** @class */ (function (_super) {
    __extends(MillisecondsTimerSystemImpl, _super);
    function MillisecondsTimerSystemImpl() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * Set a timer that will execute the specified callback at the specified time.
     * @return A function that can be used to cancel the timer.
     */
    MillisecondsTimerSystemImpl.prototype.setTimer = function (t, callback) {
        var timeout = setTimeout(callback, Math.max(t - this.now(), 0));
        return function () { clearTimeout(timeout); };
    };
    /**
     * Return the current clock time.
     */
    MillisecondsTimerSystemImpl.prototype.now = function () {
        return Date.now();
    };
    return MillisecondsTimerSystemImpl;
}(TimerSystemImpl));

var IOAction = /** @class */ (function () {
    function IOAction() {
    }
    /*!
     * Convert a function that performs asynchronous I/O taking input A
     * and returning a value of type B into an I/O action of type
     * (sa : Stream<A>) => Stream<B>
     */
    IOAction.fromAsync = function (performIO) {
        return function (sa) {
            var out = new StreamWithSend(null);
            out.setVertex__(new Vertex("map", 0, [
                new Source(sa.getVertex__(), function () {
                    return sa.listen_(out.getVertex__(), function (a) {
                        performIO(a, function (b) {
                            Transaction.run(function () {
                                out.send_(b);
                            });
                        });
                    }, false);
                })
            ]));
            return out;
        };
    };
    return IOAction;
}());

exports.lambda1 = lambda1;
exports.lambda2 = lambda2;
exports.lambda3 = lambda3;
exports.lambda4 = lambda4;
exports.lambda5 = lambda5;
exports.lambda6 = lambda6;
exports.Stream = Stream;
exports.StreamLoop = StreamLoop;
exports.StreamSink = StreamSink;
exports.Cell = Cell;
exports.CellLoop = CellLoop;
exports.CellSink = CellSink;
exports.Transaction = Transaction;
exports.Tuple2 = Tuple2;
exports.Unit = Unit;
exports.Operational = Operational;
exports.getTotalRegistrations = getTotalRegistrations;
exports.Vertex = Vertex;
exports.TimerSystemImpl = TimerSystemImpl;
exports.TimerSystem = TimerSystem;
exports.SecondsTimerSystem = SecondsTimerSystem;
exports.MillisecondsTimerSystem = MillisecondsTimerSystem;
exports.IOAction = IOAction;
//# sourceMappingURL=sodium.cjs.js.map
