(function(FuseBox){FuseBox.$fuse$=FuseBox;
FuseBox.pkg("sodiumjs", {}, function(___scope___){
___scope___.file("lib/Sodium.js", function(exports, require, module, __filename, __dirname){

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Lambda_1 = require("./Lambda");
exports.lambda1 = Lambda_1.lambda1;
exports.lambda2 = Lambda_1.lambda2;
exports.lambda3 = Lambda_1.lambda3;
exports.lambda4 = Lambda_1.lambda4;
exports.lambda5 = Lambda_1.lambda5;
exports.lambda6 = Lambda_1.lambda6;
var Stream_1 = require("./Stream");
exports.Stream = Stream_1.Stream;
exports.StreamLoop = Stream_1.StreamLoop;
var StreamSink_1 = require("./StreamSink");
exports.StreamSink = StreamSink_1.StreamSink;
var Cell_1 = require("./Cell");
exports.Cell = Cell_1.Cell;
var CellLoop_1 = require("./CellLoop");
exports.CellLoop = CellLoop_1.CellLoop;
var CellSink_1 = require("./CellSink");
exports.CellSink = CellSink_1.CellSink;
var Transaction_1 = require("./Transaction");
exports.Transaction = Transaction_1.Transaction;
var Tuple2_1 = require("./Tuple2");
exports.Tuple2 = Tuple2_1.Tuple2;
var Unit_1 = require("./Unit");
exports.Unit = Unit_1.Unit;
var Operational_1 = require("./Operational");
exports.Operational = Operational_1.Operational;
var Vertex_1 = require("./Vertex");
exports.getTotalRegistrations = Vertex_1.getTotalRegistrations;
exports.Vertex = Vertex_1.Vertex;
var TimerSystem_1 = require("./TimerSystem");
exports.TimerSystemImpl = TimerSystem_1.TimerSystemImpl;
exports.TimerSystem = TimerSystem_1.TimerSystem;
var SecondsTimerSystem_1 = require("./SecondsTimerSystem");
exports.SecondsTimerSystem = SecondsTimerSystem_1.SecondsTimerSystem;
var MillisecondsTimerSystem_1 = require("./MillisecondsTimerSystem");
exports.MillisecondsTimerSystem = MillisecondsTimerSystem_1.MillisecondsTimerSystem;
var IOAction_1 = require("./IOAction");
exports.IOAction = IOAction_1.IOAction;
//# sourceMappingURL=Sodium.js.map
});
___scope___.file("lib/Lambda.js", function(exports, require, module, __filename, __dirname){

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Vertex_1 = require("./Vertex");
var Lambda1 = /** @class */ (function () {
    function Lambda1(f, deps) {
        this.f = f;
        this.deps = deps;
    }
    return Lambda1;
}());
exports.Lambda1 = Lambda1;
function lambda1(f, deps) {
    return new Lambda1(f, deps);
}
exports.lambda1 = lambda1;
function Lambda1_deps(f) {
    if (f instanceof Lambda1)
        return f.deps;
    else
        return [];
}
exports.Lambda1_deps = Lambda1_deps;
function Lambda1_toFunction(f) {
    if (f instanceof Lambda1)
        return f.f;
    else
        return f;
}
exports.Lambda1_toFunction = Lambda1_toFunction;
var Lambda2 = /** @class */ (function () {
    function Lambda2(f, deps) {
        this.f = f;
        this.deps = deps;
    }
    return Lambda2;
}());
exports.Lambda2 = Lambda2;
function lambda2(f, deps) {
    return new Lambda2(f, deps);
}
exports.lambda2 = lambda2;
function Lambda2_deps(f) {
    if (f instanceof Lambda2)
        return f.deps;
    else
        return [];
}
exports.Lambda2_deps = Lambda2_deps;
function Lambda2_toFunction(f) {
    if (f instanceof Lambda2)
        return f.f;
    else
        return f;
}
exports.Lambda2_toFunction = Lambda2_toFunction;
var Lambda3 = /** @class */ (function () {
    function Lambda3(f, deps) {
        this.f = f;
        this.deps = deps;
    }
    return Lambda3;
}());
exports.Lambda3 = Lambda3;
function lambda3(f, deps) {
    return new Lambda3(f, deps);
}
exports.lambda3 = lambda3;
function Lambda3_deps(f) {
    if (f instanceof Lambda3)
        return f.deps;
    else
        return [];
}
exports.Lambda3_deps = Lambda3_deps;
function Lambda3_toFunction(f) {
    if (f instanceof Lambda3)
        return f.f;
    else
        return f;
}
exports.Lambda3_toFunction = Lambda3_toFunction;
var Lambda4 = /** @class */ (function () {
    function Lambda4(f, deps) {
        this.f = f;
        this.deps = deps;
    }
    return Lambda4;
}());
exports.Lambda4 = Lambda4;
function lambda4(f, deps) {
    return new Lambda4(f, deps);
}
exports.lambda4 = lambda4;
function Lambda4_deps(f) {
    if (f instanceof Lambda4)
        return f.deps;
    else
        return [];
}
exports.Lambda4_deps = Lambda4_deps;
function Lambda4_toFunction(f) {
    if (f instanceof Lambda4)
        return f.f;
    else
        return f;
}
exports.Lambda4_toFunction = Lambda4_toFunction;
var Lambda5 = /** @class */ (function () {
    function Lambda5(f, deps) {
        this.f = f;
        this.deps = deps;
    }
    return Lambda5;
}());
exports.Lambda5 = Lambda5;
function lambda5(f, deps) {
    return new Lambda5(f, deps);
}
exports.lambda5 = lambda5;
function Lambda5_deps(f) {
    if (f instanceof Lambda5)
        return f.deps;
    else
        return [];
}
exports.Lambda5_deps = Lambda5_deps;
function Lambda5_toFunction(f) {
    if (f instanceof Lambda5)
        return f.f;
    else
        return f;
}
exports.Lambda5_toFunction = Lambda5_toFunction;
var Lambda6 = /** @class */ (function () {
    function Lambda6(f, deps) {
        this.f = f;
        this.deps = deps;
    }
    return Lambda6;
}());
exports.Lambda6 = Lambda6;
function lambda6(f, deps) {
    return new Lambda6(f, deps);
}
exports.lambda6 = lambda6;
function Lambda6_deps(f) {
    if (f instanceof Lambda6)
        return f.deps;
    else
        return [];
}
exports.Lambda6_deps = Lambda6_deps;
function Lambda6_toFunction(f) {
    if (f instanceof Lambda6)
        return f.f;
    else
        return f;
}
exports.Lambda6_toFunction = Lambda6_toFunction;
function toSources(deps) {
    var ss = [];
    for (var i = 0; i < deps.length; i++) {
        var dep = deps[i];
        ss.push(new Vertex_1.Source(dep.getVertex__(), null));
    }
    return ss;
}
exports.toSources = toSources;
//# sourceMappingURL=Lambda.js.map
});
___scope___.file("lib/Vertex.js", function(exports, require, module, __filename, __dirname){

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var totalRegistrations = 0;
function getTotalRegistrations() {
    return totalRegistrations;
}
exports.getTotalRegistrations = getTotalRegistrations;
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
exports.Source = Source;
var Color;
(function (Color) {
    Color[Color["black"] = 0] = "black";
    Color[Color["gray"] = 1] = "gray";
    Color[Color["white"] = 2] = "white";
    Color[Color["purple"] = 3] = "purple";
})(Color = exports.Color || (exports.Color = {}));
;
var roots = [];
var nextID = 0;
var verbose = false;
function setVerbose(v) { verbose = v; }
exports.setVerbose = setVerbose;
function describeAll(v, visited) {
    if (visited.contains(v.id))
        return;
    console.log(v.descr());
    visited.add(v.id);
    var chs = v.children();
    for (var i = 0; i < chs.length; i++)
        describeAll(chs[i], visited);
}
exports.describeAll = describeAll;
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
    ;
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
exports.Vertex = Vertex;
//# sourceMappingURL=Vertex.js.map
});
___scope___.file("lib/Stream.js", function(exports, require, module, __filename, __dirname){

"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var Lambda_1 = require("./Lambda");
var Vertex_1 = require("./Vertex");
var Transaction_1 = require("./Transaction");
var CoalesceHandler_1 = require("./CoalesceHandler");
var Cell_1 = require("./Cell");
//import { StreamLoop } from "./StreamLoop";
var Listener_1 = require("./Listener");
var Lazy_1 = require("./Lazy");
var LazyCell_1 = require("./LazyCell");
var FantasyLand_1 = require("./FantasyLand");
var Stream = /** @class */ (function () {
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
        return Transaction_1.Transaction.run(function () {
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
    Stream.prototype.snapshot = function (b, f_) {
        var _this = this;
        var out = new StreamWithSend(null);
        var ff = Lambda_1.Lambda2_toFunction(f_);
        out.vertex = new Vertex_1.Vertex("snapshot", 0, [
            new Vertex_1.Source(this.vertex, function () {
                return _this.listen_(out.vertex, function (a) {
                    out.send_(ff(a, b.sampleNoTrans__()));
                }, false);
            }),
            new Vertex_1.Source(b.getVertex__(), null)
        ].concat(Lambda_1.toSources(Lambda_1.Lambda2_deps(f_))));
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
        var ff = Lambda_1.Lambda3_toFunction(f_);
        out.vertex = new Vertex_1.Vertex("snapshot", 0, [
            new Vertex_1.Source(this.vertex, function () {
                return _this.listen_(out.vertex, function (a) {
                    out.send_(ff(a, b.sampleNoTrans__(), c.sampleNoTrans__()));
                }, false);
            }),
            new Vertex_1.Source(b.getVertex__(), null),
            new Vertex_1.Source(c.getVertex__(), null)
        ].concat(Lambda_1.toSources(Lambda_1.Lambda3_deps(f_))));
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
        var ff = Lambda_1.Lambda4_toFunction(f_);
        out.vertex = new Vertex_1.Vertex("snapshot", 0, [
            new Vertex_1.Source(this.vertex, function () {
                return _this.listen_(out.vertex, function (a) {
                    out.send_(ff(a, b.sampleNoTrans__(), c.sampleNoTrans__(), d.sampleNoTrans__()));
                }, false);
            }),
            new Vertex_1.Source(b.getVertex__(), null),
            new Vertex_1.Source(c.getVertex__(), null),
            new Vertex_1.Source(d.getVertex__(), null)
        ].concat(Lambda_1.toSources(Lambda_1.Lambda4_deps(f_))));
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
        var ff = Lambda_1.Lambda5_toFunction(f_);
        out.vertex = new Vertex_1.Vertex("snapshot", 0, [
            new Vertex_1.Source(this.vertex, function () {
                return _this.listen_(out.vertex, function (a) {
                    out.send_(ff(a, b.sampleNoTrans__(), c.sampleNoTrans__(), d.sampleNoTrans__(), e.sampleNoTrans__()));
                }, false);
            }),
            new Vertex_1.Source(b.getVertex__(), null),
            new Vertex_1.Source(c.getVertex__(), null),
            new Vertex_1.Source(d.getVertex__(), null),
            new Vertex_1.Source(e.getVertex__(), null)
        ].concat(Lambda_1.toSources(Lambda_1.Lambda5_deps(f_))));
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
        var ff = Lambda_1.Lambda6_toFunction(f_);
        out.vertex = new Vertex_1.Vertex("snapshot", 0, [
            new Vertex_1.Source(this.vertex, function () {
                return _this.listen_(out.vertex, function (a) {
                    out.send_(ff(a, b.sampleNoTrans__(), c.sampleNoTrans__(), d.sampleNoTrans__(), e.sampleNoTrans__(), f.sampleNoTrans__()));
                }, false);
            }),
            new Vertex_1.Source(b.getVertex__(), null),
            new Vertex_1.Source(c.getVertex__(), null),
            new Vertex_1.Source(d.getVertex__(), null),
            new Vertex_1.Source(e.getVertex__(), null),
            new Vertex_1.Source(f.getVertex__(), null)
        ].concat(Lambda_1.toSources(Lambda_1.Lambda6_deps(f_))));
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
        return Transaction_1.Transaction.run(function () {
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
        return Transaction_1.Transaction.run(function () {
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
        return Transaction_1.Transaction.run(function () { return me.gate(me.mapTo(false).hold(true)); });
    };
    Stream.prototype.listen = function (h) {
        var _this = this;
        return Transaction_1.Transaction.run(function () {
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
            return (FantasyLand_1.Z.Semigroup.test(left)) ? FantasyLand_1.Z.concat(left, right) : left;
        });
    };
    //empty :: Monoid m => () -> m
    Stream.prototype['fantasy-land/empty'] = function () {
        return new Stream();
    };
    return Stream;
}());
exports.Stream = Stream;
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
            Transaction_1.Transaction.currentTransaction.last(function () {
                _this.firings = [];
            });
        this.firings.push(a);
        var listeners = this.listeners.slice();
        var _loop_1 = function (i) {
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
var StreamLoop = /** @class */ (function (_super) {
    __extends(StreamLoop, _super);
    function StreamLoop() {
        var _this = _super.call(this) || this;
        _this.assigned__ = false; // to do: Figure out how to hide this
        _this.vertex.name = "StreamLoop";
        if (Transaction_1.Transaction.currentTransaction === null)
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
});
___scope___.file("lib/Transaction.js", function(exports, require, module, __filename, __dirname){

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var typescript_collections_1 = require("typescript-collections");
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
exports.Entry = Entry;
var Transaction = /** @class */ (function () {
    function Transaction() {
        this.inCallback = 0;
        this.toRegen = false;
        this.prioritizedQ = new typescript_collections_1.PriorityQueue(function (a, b) {
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
        this.entries = new typescript_collections_1.Set(function (a) { return a.toString(); });
        this.lastQ = [];
        this.postQ = null;
    }
    Transaction.prototype.requestRegen = function () {
        this.toRegen = true;
    };
    Transaction.prototype.prioritized = function (target, f) {
        var e = new Entry(target, f);
        this.prioritizedQ.enqueue(e);
        this.entries.add(e);
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
            this.checkRegen();
            if (this.prioritizedQ.isEmpty())
                break;
            var e = this.prioritizedQ.dequeue();
            this.entries.remove(e);
            e.action();
        }
        for (var i = 0; i < this.lastQ.length; i++)
            this.lastQ[i]();
        this.lastQ = [];
        if (this.postQ != null) {
            for (var i = 0; i < this.postQ.length; i++) {
                if (this.postQ[i] != null) {
                    var parent = Transaction.currentTransaction;
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
                        Transaction.currentTransaction = parent;
                    }
                    catch (err) {
                        Transaction.currentTransaction = parent;
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
exports.Transaction = Transaction;
//# sourceMappingURL=Transaction.js.map
});
___scope___.file("lib/CoalesceHandler.js", function(exports, require, module, __filename, __dirname){

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Lambda_1 = require("./Lambda");
var Transaction_1 = require("./Transaction");
var CoalesceHandler = /** @class */ (function () {
    function CoalesceHandler(f, out) {
        this.f = Lambda_1.Lambda2_toFunction(f);
        this.out = out;
        this.out.getVertex__().sources = this.out.getVertex__().sources.concat(Lambda_1.toSources(Lambda_1.Lambda2_deps(f)));
        this.accumValid = false;
    }
    CoalesceHandler.prototype.send_ = function (a) {
        var _this = this;
        if (this.accumValid)
            this.accum = this.f(this.accum, a);
        else {
            Transaction_1.Transaction.currentTransaction.prioritized(this.out.getVertex__(), function () {
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
exports.CoalesceHandler = CoalesceHandler;
//# sourceMappingURL=CoalesceHandler.js.map
});
___scope___.file("lib/Cell.js", function(exports, require, module, __filename, __dirname){

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Lambda_1 = require("./Lambda");
var Vertex_1 = require("./Vertex");
var Transaction_1 = require("./Transaction");
var Lazy_1 = require("./Lazy");
var Stream_1 = require("./Stream");
var Operational_1 = require("./Operational");
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
            this.str = new Stream_1.Stream();
            this.vertex = new Vertex_1.Vertex("ConstCell", 0, []);
        }
        else
            Transaction_1.Transaction.run(function () { return _this.setStream(str); });
    }
    Cell.prototype.setStream = function (str) {
        var _this = this;
        this.str = str;
        var me = this, src = new Vertex_1.Source(str.getVertex__(), function () {
            return str.listen_(me.vertex, function (a) {
                if (me.valueUpdate == null) {
                    Transaction_1.Transaction.currentTransaction.last(function () {
                        me.value = me.valueUpdate;
                        me.lazyInitValue = null;
                        me.valueUpdate = null;
                    });
                }
                me.valueUpdate = a;
            }, false);
        });
        this.vertex = new Vertex_1.Vertex("Cell", 0, [src]);
        // We do a trick here of registering the source for the duration of the current
        // transaction so that we are guaranteed to catch any stream events that
        // occur in the same transaction.
        this.vertex.register(Vertex_1.Vertex.NULL);
        Transaction_1.Transaction.currentTransaction.last(function () {
            _this.vertex.deregister(Vertex_1.Vertex.NULL);
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
        return Transaction_1.Transaction.run(function () { return _this.sampleNoTrans__(); });
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
        return Transaction_1.Transaction.run(function () { return me.sampleLazyNoTrans__(); });
    };
    Cell.prototype.sampleLazyNoTrans__ = function () {
        var me = this, s = new LazySample(me);
        Transaction_1.Transaction.currentTransaction.last(function () {
            s.value = me.valueUpdate != null ? me.valueUpdate : me.sampleNoTrans__();
            s.hasValue = true;
            s.cell = null;
        });
        return new Lazy_1.Lazy(function () {
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
        return Transaction_1.Transaction.run(function () {
            return Operational_1.Operational.updates(c).map(f).holdLazy(c.sampleLazy().map(Lambda_1.Lambda1_toFunction(f)));
        });
    };
    /**
     * Lift a binary function into cells, so the returned Cell always reflects the specified
     * function applied to the input cells' values.
     * @param fn Function to apply. It must be <em>referentially transparent</em>.
     */
    Cell.prototype.lift = function (b, fn0) {
        var fn = Lambda_1.Lambda2_toFunction(fn0), cf = this.map(function (aa) { return function (bb) { return fn(aa, bb); }; });
        return Cell.apply(cf, b, Lambda_1.toSources(Lambda_1.Lambda2_deps(fn0)));
    };
    /**
     * Lift a ternary function into cells, so the returned Cell always reflects the specified
     * function applied to the input cells' values.
     * @param fn Function to apply. It must be <em>referentially transparent</em>.
     */
    Cell.prototype.lift3 = function (b, c, fn0) {
        var fn = Lambda_1.Lambda3_toFunction(fn0), mf = function (aa) { return function (bb) { return function (cc) { return fn(aa, bb, cc); }; }; }, cf = this.map(mf);
        return Cell.apply(Cell.apply(cf, b), c, Lambda_1.toSources(Lambda_1.Lambda3_deps(fn0)));
    };
    /**
     * Lift a quaternary function into cells, so the returned Cell always reflects the specified
     * function applied to the input cells' values.
     * @param fn Function to apply. It must be <em>referentially transparent</em>.
     */
    Cell.prototype.lift4 = function (b, c, d, fn0) {
        var fn = Lambda_1.Lambda4_toFunction(fn0), mf = function (aa) { return function (bb) { return function (cc) { return function (dd) { return fn(aa, bb, cc, dd); }; }; }; }, cf = this.map(mf);
        return Cell.apply(Cell.apply(Cell.apply(cf, b), c), d, Lambda_1.toSources(Lambda_1.Lambda4_deps(fn0)));
    };
    /**
     * Lift a 5-argument function into cells, so the returned Cell always reflects the specified
     * function applied to the input cells' values.
     * @param fn Function to apply. It must be <em>referentially transparent</em>.
     */
    Cell.prototype.lift5 = function (b, c, d, e, fn0) {
        var fn = Lambda_1.Lambda5_toFunction(fn0), mf = function (aa) { return function (bb) { return function (cc) { return function (dd) { return function (ee) { return fn(aa, bb, cc, dd, ee); }; }; }; }; }, cf = this.map(mf);
        return Cell.apply(Cell.apply(Cell.apply(Cell.apply(cf, b), c), d), e, Lambda_1.toSources(Lambda_1.Lambda5_deps(fn0)));
    };
    /**
     * Lift a 6-argument function into cells, so the returned Cell always reflects the specified
     * function applied to the input cells' values.
     * @param fn Function to apply. It must be <em>referentially transparent</em>.
     */
    Cell.prototype.lift6 = function (b, c, d, e, f, fn0) {
        var fn = Lambda_1.Lambda6_toFunction(fn0), mf = function (aa) { return function (bb) { return function (cc) { return function (dd) { return function (ee) { return function (ff) { return fn(aa, bb, cc, dd, ee, ff); }; }; }; }; }; }, cf = this.map(mf);
        return Cell.apply(Cell.apply(Cell.apply(Cell.apply(Cell.apply(cf, b), c), d), e), f, Lambda_1.toSources(Lambda_1.Lambda6_deps(fn0)));
    };
    /**
     * Apply a value inside a cell to a function inside a cell. This is the
     * primitive for all function lifting.
     */
    Cell.apply = function (cf, ca, sources) {
        return Transaction_1.Transaction.run(function () {
            var state = new ApplyState(), out = new Stream_1.StreamWithSend(), cf_value = Operational_1.Operational.value(cf), ca_value = Operational_1.Operational.value(ca), src1 = new Vertex_1.Source(cf_value.getVertex__(), function () {
                return cf_value.listen_(out.getVertex__(), function (f) {
                    state.f = f;
                    state.f_present = true;
                    if (state.a_present)
                        out.send_(state.f(state.a));
                }, false);
            }), src2 = new Vertex_1.Source(ca_value.getVertex__(), function () {
                return ca_value.listen_(out.getVertex__(), function (a) {
                    state.a = a;
                    state.a_present = true;
                    if (state.f_present)
                        out.send_(state.f(state.a));
                }, false);
            });
            out.setVertex__(new Vertex_1.Vertex("apply", 0, [src1, src2].concat(sources ? sources : [])));
            return out.coalesce__(function (l, r) { return r; }).holdLazy(new Lazy_1.Lazy(function () {
                return cf.sampleNoTrans__()(ca.sampleNoTrans__());
            }));
        });
    };
    /**
     * Unwrap a cell inside another cell to give a time-varying cell implementation.
     */
    Cell.switchC = function (cca) {
        return Transaction_1.Transaction.run(function () {
            var za = cca.sampleLazy().map(function (ba) { return ba.sample(); }), out = new Stream_1.StreamWithSend();
            var last_ca = null;
            var cca_value = Operational_1.Operational.value(cca), src = new Vertex_1.Source(cca_value.getVertex__(), function () {
                var kill2 = last_ca === null ? null :
                    Operational_1.Operational.value(last_ca).listen_(out.getVertex__(), function (a) { return out.send_(a); }, false);
                var kill1 = cca_value.listen_(out.getVertex__(), function (ca) {
                    // Note: If any switch takes place during a transaction, then the
                    // coalesce__() below will always cause a sample to be fetched
                    // from the one we just switched to. So anything from the old input cell
                    // that might have happened during this transaction will be suppressed.
                    last_ca = ca;
                    if (kill2 !== null)
                        kill2();
                    kill2 = Operational_1.Operational.value(ca).listen_(out.getVertex__(), function (a) { return out.send_(a); }, false);
                }, false);
                return function () { kill1(); kill2(); };
            });
            out.setVertex__(new Vertex_1.Vertex("switchC", 0, [src]));
            return out.coalesce__(function (l, r) { return r; }).holdLazy(za);
        });
    };
    /**
     * Unwrap a stream inside a cell to give a time-varying stream implementation.
     */
    Cell.switchS = function (csa) {
        return Transaction_1.Transaction.run(function () {
            var out = new Stream_1.StreamWithSend(), h2 = function (a) {
                out.send_(a);
            }, src = new Vertex_1.Source(csa.getVertex__(), function () {
                var kill2 = csa.sampleNoTrans__().listen_(out.getVertex__(), h2, false);
                var kill1 = csa.getStream__().listen_(out.getVertex__(), function (sa) {
                    kill2();
                    kill2 = sa.listen_(out.getVertex__(), h2, true);
                }, false);
                return function () { kill1(); kill2(); };
            });
            out.setVertex__(new Vertex_1.Vertex("switchS", 0, [src]));
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
        return Transaction_1.Transaction.run(function () {
            return Operational_1.Operational.value(_this).listen(h);
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
exports.Cell = Cell;
//# sourceMappingURL=Cell.js.map
});
___scope___.file("lib/Lazy.js", function(exports, require, module, __filename, __dirname){

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
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
exports.Lazy = Lazy;
//# sourceMappingURL=Lazy.js.map
});
___scope___.file("lib/Operational.js", function(exports, require, module, __filename, __dirname){

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Stream_1 = require("./Stream");
var Transaction_1 = require("./Transaction");
var Unit_1 = require("./Unit");
var Vertex_1 = require("./Vertex");
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
        return Transaction_1.Transaction.run(function () {
            var sSpark = new Stream_1.StreamWithSend();
            Transaction_1.Transaction.currentTransaction.prioritized(sSpark.getVertex__(), function () {
                sSpark.send_(Unit_1.Unit.UNIT);
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
        var out = new Stream_1.StreamWithSend(null);
        out.setVertex__(new Vertex_1.Vertex("split", 0, [
            new Vertex_1.Source(s.getVertex__(), function () {
                return s.listen_(out.getVertex__(), function (as) {
                    var _loop_1 = function (i) {
                        Transaction_1.Transaction.currentTransaction.post(i, function () {
                            Transaction_1.Transaction.run(function () {
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
exports.Operational = Operational;
//# sourceMappingURL=Operational.js.map
});
___scope___.file("lib/Unit.js", function(exports, require, module, __filename, __dirname){

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Unit = /** @class */ (function () {
    function Unit() {
    }
    Unit.UNIT = new Unit();
    return Unit;
}());
exports.Unit = Unit;
//# sourceMappingURL=Unit.js.map
});
___scope___.file("lib/Listener.js", function(exports, require, module, __filename, __dirname){

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Listener = /** @class */ (function () {
    function Listener(h, target) {
        this.h = h;
        this.target = target;
    }
    return Listener;
}());
exports.Listener = Listener;
//# sourceMappingURL=Listener.js.map
});
___scope___.file("lib/LazyCell.js", function(exports, require, module, __filename, __dirname){

"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var Cell_1 = require("./Cell");
var Transaction_1 = require("./Transaction");
var LazyCell = /** @class */ (function (_super) {
    __extends(LazyCell, _super);
    function LazyCell(lazyInitValue, str) {
        var _this = _super.call(this, null, null) || this;
        Transaction_1.Transaction.run(function () {
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
}(Cell_1.Cell));
exports.LazyCell = LazyCell;
//# sourceMappingURL=LazyCell.js.map
});
___scope___.file("lib/FantasyLand.js", function(exports, require, module, __filename, __dirname){

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Z = require("sanctuary-type-classes");
//# sourceMappingURL=FantasyLand.js.map
});
___scope___.file("lib/StreamSink.js", function(exports, require, module, __filename, __dirname){

"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var Stream_1 = require("./Stream");
var CoalesceHandler_1 = require("./CoalesceHandler");
var Transaction_1 = require("./Transaction");
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
        _this.coalescer = new CoalesceHandler_1.CoalesceHandler(f, _this);
        return _this;
    }
    StreamSink.prototype.send = function (a) {
        var _this = this;
        Transaction_1.Transaction.run(function () {
            if (Transaction_1.Transaction.currentTransaction.inCallback > 0)
                throw new Error("You are not allowed to use send() inside a Sodium callback");
            _this.coalescer.send_(a);
        });
    };
    return StreamSink;
}(Stream_1.StreamWithSend));
exports.StreamSink = StreamSink;
//# sourceMappingURL=StreamSink.js.map
});
___scope___.file("lib/CellLoop.js", function(exports, require, module, __filename, __dirname){

"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var LazyCell_1 = require("./LazyCell");
var Transaction_1 = require("./Transaction");
var Stream_1 = require("./Stream");
/**
 * A forward reference for a {@link Cell} equivalent to the Cell that is referenced.
 */
var CellLoop = /** @class */ (function (_super) {
    __extends(CellLoop, _super);
    function CellLoop() {
        return _super.call(this, null, new Stream_1.StreamLoop()) || this;
    }
    /**
     * Resolve the loop to specify what the CellLoop was a forward reference to. It
     * must be invoked inside the same transaction as the place where the CellLoop is used.
     * This requires you to create an explicit transaction with {@link Transaction#run(Lambda0)}
     * or {@link Transaction#runVoid(Runnable)}.
     */
    CellLoop.prototype.loop = function (a_out) {
        var me = this;
        Transaction_1.Transaction.run(function () {
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
}(LazyCell_1.LazyCell));
exports.CellLoop = CellLoop;
//# sourceMappingURL=CellLoop.js.map
});
___scope___.file("lib/CellSink.js", function(exports, require, module, __filename, __dirname){

"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var Cell_1 = require("./Cell");
var StreamSink_1 = require("./StreamSink");
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
        return _super.call(this, initValue, new StreamSink_1.StreamSink(f)) || this;
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
}(Cell_1.Cell));
exports.CellSink = CellSink;
//# sourceMappingURL=CellSink.js.map
});
___scope___.file("lib/Tuple2.js", function(exports, require, module, __filename, __dirname){

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Tuple2 = /** @class */ (function () {
    function Tuple2(a, b) {
        this.a = a;
        this.b = b;
    }
    return Tuple2;
}());
exports.Tuple2 = Tuple2;
//# sourceMappingURL=Tuple2.js.map
});
___scope___.file("lib/TimerSystem.js", function(exports, require, module, __filename, __dirname){

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Vertex_1 = require("./Vertex");
var typescript_collections_1 = require("typescript-collections");
var Stream_1 = require("./Stream");
var CellSink_1 = require("./CellSink");
var Transaction_1 = require("./Transaction");
/**
 * An interface for implementations of FRP timer systems.
 */
var TimerSystemImpl = /** @class */ (function () {
    function TimerSystemImpl() {
    }
    return TimerSystemImpl;
}());
exports.TimerSystemImpl = TimerSystemImpl;
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
        Transaction_1.Transaction.run(function () {
            _this.impl = impl;
            _this.tMinimum = 0;
            var timeSnk = new CellSink_1.CellSink(impl.now());
            _this.time = timeSnk;
            // A dummy listener to time to keep it alive even when there are no other listeners.
            _this.time.listen(function (t) { });
            Transaction_1.Transaction.onStart(function () {
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
                        Transaction_1.Transaction.run(function () { return ev.sAlarm.send_(ev.t); });
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
                        // Correction to ensure the clock time appears to be >= the
                        // alarm time. It can be a few milliseconds early, and
                        // this breaks things otherwise, because it doesn't think
                        // it's time to fire the alarm yet.
                        _this.tMinimum = Math.max(_this.tMinimum, tAl);
                        // Open and close a transaction to trigger queued
                        // events to run.
                        Transaction_1.Transaction.run(function () { });
                    });
                }
            }
        };
        sAlarm.setVertex__(new Vertex_1.Vertex("at", 0, [
            new Vertex_1.Source(tAlarm.getVertex__(), function () {
                active = true;
                sampled = false;
                Transaction_1.Transaction.currentTransaction.prioritized(sAlarm.getVertex__(), updateTimer);
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
});
___scope___.file("lib/SecondsTimerSystem.js", function(exports, require, module, __filename, __dirname){

"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var TimerSystem_1 = require("./TimerSystem");
/**
 * A timer system implementation using seconds as the time unit.
 */
var SecondsTimerSystem = /** @class */ (function (_super) {
    __extends(SecondsTimerSystem, _super);
    function SecondsTimerSystem() {
        return _super.call(this, new SecondsTimerSystemImpl()) || this;
    }
    return SecondsTimerSystem;
}(TimerSystem_1.TimerSystem));
exports.SecondsTimerSystem = SecondsTimerSystem;
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
}(TimerSystem_1.TimerSystemImpl));
//# sourceMappingURL=SecondsTimerSystem.js.map
});
___scope___.file("lib/MillisecondsTimerSystem.js", function(exports, require, module, __filename, __dirname){

"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var TimerSystem_1 = require("./TimerSystem");
/**
 * A timer system implementation using milliseconds as the time unit.
 */
var MillisecondsTimerSystem = /** @class */ (function (_super) {
    __extends(MillisecondsTimerSystem, _super);
    function MillisecondsTimerSystem() {
        return _super.call(this, new MillisecondsTimerSystemImpl()) || this;
    }
    return MillisecondsTimerSystem;
}(TimerSystem_1.TimerSystem));
exports.MillisecondsTimerSystem = MillisecondsTimerSystem;
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
}(TimerSystem_1.TimerSystemImpl));
//# sourceMappingURL=MillisecondsTimerSystem.js.map
});
___scope___.file("lib/IOAction.js", function(exports, require, module, __filename, __dirname){

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Stream_1 = require("./Stream");
var Vertex_1 = require("./Vertex");
var Transaction_1 = require("./Transaction");
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
            var out = new Stream_1.StreamWithSend(null);
            out.setVertex__(new Vertex_1.Vertex("map", 0, [
                new Vertex_1.Source(sa.getVertex__(), function () {
                    return sa.listen_(out.getVertex__(), function (a) {
                        performIO(a, function (b) {
                            Transaction_1.Transaction.run(function () {
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
exports.IOAction = IOAction;
//# sourceMappingURL=IOAction.js.map
});
return ___scope___.entry = "lib/Sodium.ts";
});
FuseBox.pkg("typescript-collections", {}, function(___scope___){
___scope___.file("dist/lib/index.js", function(exports, require, module, __filename, __dirname){

"use strict";
// Copyright 2013 Basarat Ali Syed. All Rights Reserved.
//
// Licensed under MIT open source license http://opensource.org/licenses/MIT
//
// Orginal javascript code was by Mauricio Santos
//
var _arrays = require('./arrays');
exports.arrays = _arrays;
var Bag_1 = require('./Bag');
exports.Bag = Bag_1.default;
var BSTree_1 = require('./BSTree');
exports.BSTree = BSTree_1.default;
var Dictionary_1 = require('./Dictionary');
exports.Dictionary = Dictionary_1.default;
var Heap_1 = require('./Heap');
exports.Heap = Heap_1.default;
var LinkedDictionary_1 = require('./LinkedDictionary');
exports.LinkedDictionary = LinkedDictionary_1.default;
var LinkedList_1 = require('./LinkedList');
exports.LinkedList = LinkedList_1.default;
var MultiDictionary_1 = require('./MultiDictionary');
exports.MultiDictionary = MultiDictionary_1.default;
var Queue_1 = require('./Queue');
exports.Queue = Queue_1.default;
var PriorityQueue_1 = require('./PriorityQueue');
exports.PriorityQueue = PriorityQueue_1.default;
var Set_1 = require('./Set');
exports.Set = Set_1.default;
var Stack_1 = require('./Stack');
exports.Stack = Stack_1.default;
var _util = require('./util');
exports.util = _util;
//# sourceMappingURL=index.js.map
});
___scope___.file("dist/lib/arrays.js", function(exports, require, module, __filename, __dirname){

"use strict";
var util = require('./util');
/**
 * Returns the position of the first occurrence of the specified item
 * within the specified array.4
 * @param {*} array the array in which to search the element.
 * @param {Object} item the element to search.
 * @param {function(Object,Object):boolean=} equalsFunction optional function used to
 * check equality between 2 elements.
 * @return {number} the position of the first occurrence of the specified element
 * within the specified array, or -1 if not found.
 */
function indexOf(array, item, equalsFunction) {
    var equals = equalsFunction || util.defaultEquals;
    var length = array.length;
    for (var i = 0; i < length; i++) {
        if (equals(array[i], item)) {
            return i;
        }
    }
    return -1;
}
exports.indexOf = indexOf;
/**
 * Returns the position of the last occurrence of the specified element
 * within the specified array.
 * @param {*} array the array in which to search the element.
 * @param {Object} item the element to search.
 * @param {function(Object,Object):boolean=} equalsFunction optional function used to
 * check equality between 2 elements.
 * @return {number} the position of the last occurrence of the specified element
 * within the specified array or -1 if not found.
 */
function lastIndexOf(array, item, equalsFunction) {
    var equals = equalsFunction || util.defaultEquals;
    var length = array.length;
    for (var i = length - 1; i >= 0; i--) {
        if (equals(array[i], item)) {
            return i;
        }
    }
    return -1;
}
exports.lastIndexOf = lastIndexOf;
/**
 * Returns true if the specified array contains the specified element.
 * @param {*} array the array in which to search the element.
 * @param {Object} item the element to search.
 * @param {function(Object,Object):boolean=} equalsFunction optional function to
 * check equality between 2 elements.
 * @return {boolean} true if the specified array contains the specified element.
 */
function contains(array, item, equalsFunction) {
    return indexOf(array, item, equalsFunction) >= 0;
}
exports.contains = contains;
/**
 * Removes the first ocurrence of the specified element from the specified array.
 * @param {*} array the array in which to search element.
 * @param {Object} item the element to search.
 * @param {function(Object,Object):boolean=} equalsFunction optional function to
 * check equality between 2 elements.
 * @return {boolean} true if the array changed after this call.
 */
function remove(array, item, equalsFunction) {
    var index = indexOf(array, item, equalsFunction);
    if (index < 0) {
        return false;
    }
    array.splice(index, 1);
    return true;
}
exports.remove = remove;
/**
 * Returns the number of elements in the specified array equal
 * to the specified object.
 * @param {Array} array the array in which to determine the frequency of the element.
 * @param {Object} item the element whose frequency is to be determined.
 * @param {function(Object,Object):boolean=} equalsFunction optional function used to
 * check equality between 2 elements.
 * @return {number} the number of elements in the specified array
 * equal to the specified object.
 */
function frequency(array, item, equalsFunction) {
    var equals = equalsFunction || util.defaultEquals;
    var length = array.length;
    var freq = 0;
    for (var i = 0; i < length; i++) {
        if (equals(array[i], item)) {
            freq++;
        }
    }
    return freq;
}
exports.frequency = frequency;
/**
 * Returns true if the two specified arrays are equal to one another.
 * Two arrays are considered equal if both arrays contain the same number
 * of elements, and all corresponding pairs of elements in the two
 * arrays are equal and are in the same order.
 * @param {Array} array1 one array to be tested for equality.
 * @param {Array} array2 the other array to be tested for equality.
 * @param {function(Object,Object):boolean=} equalsFunction optional function used to
 * check equality between elemements in the arrays.
 * @return {boolean} true if the two arrays are equal
 */
function equals(array1, array2, equalsFunction) {
    var equals = equalsFunction || util.defaultEquals;
    if (array1.length !== array2.length) {
        return false;
    }
    var length = array1.length;
    for (var i = 0; i < length; i++) {
        if (!equals(array1[i], array2[i])) {
            return false;
        }
    }
    return true;
}
exports.equals = equals;
/**
 * Returns shallow a copy of the specified array.
 * @param {*} array the array to copy.
 * @return {Array} a copy of the specified array
 */
function copy(array) {
    return array.concat();
}
exports.copy = copy;
/**
 * Swaps the elements at the specified positions in the specified array.
 * @param {Array} array The array in which to swap elements.
 * @param {number} i the index of one element to be swapped.
 * @param {number} j the index of the other element to be swapped.
 * @return {boolean} true if the array is defined and the indexes are valid.
 */
function swap(array, i, j) {
    if (i < 0 || i >= array.length || j < 0 || j >= array.length) {
        return false;
    }
    var temp = array[i];
    array[i] = array[j];
    array[j] = temp;
    return true;
}
exports.swap = swap;
function toString(array) {
    return '[' + array.toString() + ']';
}
exports.toString = toString;
/**
 * Executes the provided function once for each element present in this array
 * starting from index 0 to length - 1.
 * @param {Array} array The array in which to iterate.
 * @param {function(Object):*} callback function to execute, it is
 * invoked with one argument: the element value, to break the iteration you can
 * optionally return false.
 */
function forEach(array, callback) {
    for (var _i = 0, array_1 = array; _i < array_1.length; _i++) {
        var ele = array_1[_i];
        if (callback(ele) === false) {
            return;
        }
    }
}
exports.forEach = forEach;
//# sourceMappingURL=arrays.js.map
});
___scope___.file("dist/lib/util.js", function(exports, require, module, __filename, __dirname){

"use strict";
var _hasOwnProperty = Object.prototype.hasOwnProperty;
exports.has = function (obj, prop) {
    return _hasOwnProperty.call(obj, prop);
};
/**
 * Default function to compare element order.
 * @function
 */
function defaultCompare(a, b) {
    if (a < b) {
        return -1;
    }
    else if (a === b) {
        return 0;
    }
    else {
        return 1;
    }
}
exports.defaultCompare = defaultCompare;
/**
 * Default function to test equality.
 * @function
 */
function defaultEquals(a, b) {
    return a === b;
}
exports.defaultEquals = defaultEquals;
/**
 * Default function to convert an object to a string.
 * @function
 */
function defaultToString(item) {
    if (item === null) {
        return 'COLLECTION_NULL';
    }
    else if (isUndefined(item)) {
        return 'COLLECTION_UNDEFINED';
    }
    else if (isString(item)) {
        return '$s' + item;
    }
    else {
        return '$o' + item.toString();
    }
}
exports.defaultToString = defaultToString;
/**
* Joins all the properies of the object using the provided join string
*/
function makeString(item, join) {
    if (join === void 0) { join = ','; }
    if (item === null) {
        return 'COLLECTION_NULL';
    }
    else if (isUndefined(item)) {
        return 'COLLECTION_UNDEFINED';
    }
    else if (isString(item)) {
        return item.toString();
    }
    else {
        var toret = '{';
        var first = true;
        for (var prop in item) {
            if (exports.has(item, prop)) {
                if (first) {
                    first = false;
                }
                else {
                    toret = toret + join;
                }
                toret = toret + prop + ':' + item[prop];
            }
        }
        return toret + '}';
    }
}
exports.makeString = makeString;
/**
 * Checks if the given argument is a function.
 * @function
 */
function isFunction(func) {
    return (typeof func) === 'function';
}
exports.isFunction = isFunction;
/**
 * Checks if the given argument is undefined.
 * @function
 */
function isUndefined(obj) {
    return (typeof obj) === 'undefined';
}
exports.isUndefined = isUndefined;
/**
 * Checks if the given argument is a string.
 * @function
 */
function isString(obj) {
    return Object.prototype.toString.call(obj) === '[object String]';
}
exports.isString = isString;
/**
 * Reverses a compare function.
 * @function
 */
function reverseCompareFunction(compareFunction) {
    if (!isFunction(compareFunction)) {
        return function (a, b) {
            if (a < b) {
                return 1;
            }
            else if (a === b) {
                return 0;
            }
            else {
                return -1;
            }
        };
    }
    else {
        return function (d, v) {
            return compareFunction(d, v) * -1;
        };
    }
}
exports.reverseCompareFunction = reverseCompareFunction;
/**
 * Returns an equal function given a compare function.
 * @function
 */
function compareToEquals(compareFunction) {
    return function (a, b) {
        return compareFunction(a, b) === 0;
    };
}
exports.compareToEquals = compareToEquals;
//# sourceMappingURL=util.js.map
});
___scope___.file("dist/lib/Bag.js", function(exports, require, module, __filename, __dirname){

"use strict";
var util = require('./util');
var Dictionary_1 = require('./Dictionary');
var Set_1 = require('./Set');
var Bag = (function () {
    /**
     * Creates an empty bag.
     * @class <p>A bag is a special kind of set in which members are
     * allowed to appear more than once.</p>
     * <p>If the inserted elements are custom objects a function
     * which converts elements to unique strings must be provided. Example:</p>
     *
     * <pre>
     * function petToString(pet) {
     *  return pet.name;
     * }
     * </pre>
     *
     * @constructor
     * @param {function(Object):string=} toStrFunction optional function used
     * to convert elements to strings. If the elements aren't strings or if toString()
     * is not appropriate, a custom function which receives an object and returns a
     * unique string must be provided.
     */
    function Bag(toStrFunction) {
        this.toStrF = toStrFunction || util.defaultToString;
        this.dictionary = new Dictionary_1.default(this.toStrF);
        this.nElements = 0;
    }
    /**
    * Adds nCopies of the specified object to this bag.
    * @param {Object} element element to add.
    * @param {number=} nCopies the number of copies to add, if this argument is
    * undefined 1 copy is added.
    * @return {boolean} true unless element is undefined.
    */
    Bag.prototype.add = function (element, nCopies) {
        if (nCopies === void 0) { nCopies = 1; }
        if (util.isUndefined(element) || nCopies <= 0) {
            return false;
        }
        if (!this.contains(element)) {
            var node = {
                value: element,
                copies: nCopies
            };
            this.dictionary.setValue(element, node);
        }
        else {
            this.dictionary.getValue(element).copies += nCopies;
        }
        this.nElements += nCopies;
        return true;
    };
    /**
    * Counts the number of copies of the specified object in this bag.
    * @param {Object} element the object to search for..
    * @return {number} the number of copies of the object, 0 if not found
    */
    Bag.prototype.count = function (element) {
        if (!this.contains(element)) {
            return 0;
        }
        else {
            return this.dictionary.getValue(element).copies;
        }
    };
    /**
     * Returns true if this bag contains the specified element.
     * @param {Object} element element to search for.
     * @return {boolean} true if this bag contains the specified element,
     * false otherwise.
     */
    Bag.prototype.contains = function (element) {
        return this.dictionary.containsKey(element);
    };
    /**
    * Removes nCopies of the specified object to this bag.
    * If the number of copies to remove is greater than the actual number
    * of copies in the Bag, all copies are removed.
    * @param {Object} element element to remove.
    * @param {number=} nCopies the number of copies to remove, if this argument is
    * undefined 1 copy is removed.
    * @return {boolean} true if at least 1 element was removed.
    */
    Bag.prototype.remove = function (element, nCopies) {
        if (nCopies === void 0) { nCopies = 1; }
        if (util.isUndefined(element) || nCopies <= 0) {
            return false;
        }
        if (!this.contains(element)) {
            return false;
        }
        else {
            var node = this.dictionary.getValue(element);
            if (nCopies > node.copies) {
                this.nElements -= node.copies;
            }
            else {
                this.nElements -= nCopies;
            }
            node.copies -= nCopies;
            if (node.copies <= 0) {
                this.dictionary.remove(element);
            }
            return true;
        }
    };
    /**
     * Returns an array containing all of the elements in this big in arbitrary order,
     * including multiple copies.
     * @return {Array} an array containing all of the elements in this bag.
     */
    Bag.prototype.toArray = function () {
        var a = [];
        var values = this.dictionary.values();
        for (var _i = 0, values_1 = values; _i < values_1.length; _i++) {
            var node = values_1[_i];
            var element = node.value;
            var copies = node.copies;
            for (var j = 0; j < copies; j++) {
                a.push(element);
            }
        }
        return a;
    };
    /**
     * Returns a set of unique elements in this bag.
     * @return {collections.Set<T>} a set of unique elements in this bag.
     */
    Bag.prototype.toSet = function () {
        var toret = new Set_1.default(this.toStrF);
        var elements = this.dictionary.values();
        for (var _i = 0, elements_1 = elements; _i < elements_1.length; _i++) {
            var ele = elements_1[_i];
            var value = ele.value;
            toret.add(value);
        }
        return toret;
    };
    /**
     * Executes the provided function once for each element
     * present in this bag, including multiple copies.
     * @param {function(Object):*} callback function to execute, it is
     * invoked with one argument: the element. To break the iteration you can
     * optionally return false.
     */
    Bag.prototype.forEach = function (callback) {
        this.dictionary.forEach(function (k, v) {
            var value = v.value;
            var copies = v.copies;
            for (var i = 0; i < copies; i++) {
                if (callback(value) === false) {
                    return false;
                }
            }
            return true;
        });
    };
    /**
     * Returns the number of elements in this bag.
     * @return {number} the number of elements in this bag.
     */
    Bag.prototype.size = function () {
        return this.nElements;
    };
    /**
     * Returns true if this bag contains no elements.
     * @return {boolean} true if this bag contains no elements.
     */
    Bag.prototype.isEmpty = function () {
        return this.nElements === 0;
    };
    /**
     * Removes all of the elements from this bag.
     */
    Bag.prototype.clear = function () {
        this.nElements = 0;
        this.dictionary.clear();
    };
    return Bag;
}());
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Bag; // End of bag
//# sourceMappingURL=Bag.js.map
});
___scope___.file("dist/lib/Dictionary.js", function(exports, require, module, __filename, __dirname){

"use strict";
var util = require('./util');
var Dictionary = (function () {
    /**
     * Creates an empty dictionary.
     * @class <p>Dictionaries map keys to values; each key can map to at most one value.
     * This implementation accepts any kind of objects as keys.</p>
     *
     * <p>If the keys are custom objects a function which converts keys to unique
     * strings must be provided. Example:</p>
     * <pre>
     * function petToString(pet) {
     *  return pet.name;
     * }
     * </pre>
     * @constructor
     * @param {function(Object):string=} toStrFunction optional function used
     * to convert keys to strings. If the keys aren't strings or if toString()
     * is not appropriate, a custom function which receives a key and returns a
     * unique string must be provided.
     */
    function Dictionary(toStrFunction) {
        this.table = {};
        this.nElements = 0;
        this.toStr = toStrFunction || util.defaultToString;
    }
    /**
     * Returns the value to which this dictionary maps the specified key.
     * Returns undefined if this dictionary contains no mapping for this key.
     * @param {Object} key key whose associated value is to be returned.
     * @return {*} the value to which this dictionary maps the specified key or
     * undefined if the map contains no mapping for this key.
     */
    Dictionary.prototype.getValue = function (key) {
        var pair = this.table['$' + this.toStr(key)];
        if (util.isUndefined(pair)) {
            return undefined;
        }
        return pair.value;
    };
    /**
     * Associates the specified value with the specified key in this dictionary.
     * If the dictionary previously contained a mapping for this key, the old
     * value is replaced by the specified value.
     * @param {Object} key key with which the specified value is to be
     * associated.
     * @param {Object} value value to be associated with the specified key.
     * @return {*} previous value associated with the specified key, or undefined if
     * there was no mapping for the key or if the key/value are undefined.
     */
    Dictionary.prototype.setValue = function (key, value) {
        if (util.isUndefined(key) || util.isUndefined(value)) {
            return undefined;
        }
        var ret;
        var k = '$' + this.toStr(key);
        var previousElement = this.table[k];
        if (util.isUndefined(previousElement)) {
            this.nElements++;
            ret = undefined;
        }
        else {
            ret = previousElement.value;
        }
        this.table[k] = {
            key: key,
            value: value
        };
        return ret;
    };
    /**
     * Removes the mapping for this key from this dictionary if it is present.
     * @param {Object} key key whose mapping is to be removed from the
     * dictionary.
     * @return {*} previous value associated with specified key, or undefined if
     * there was no mapping for key.
     */
    Dictionary.prototype.remove = function (key) {
        var k = '$' + this.toStr(key);
        var previousElement = this.table[k];
        if (!util.isUndefined(previousElement)) {
            delete this.table[k];
            this.nElements--;
            return previousElement.value;
        }
        return undefined;
    };
    /**
     * Returns an array containing all of the keys in this dictionary.
     * @return {Array} an array containing all of the keys in this dictionary.
     */
    Dictionary.prototype.keys = function () {
        var array = [];
        for (var name_1 in this.table) {
            if (util.has(this.table, name_1)) {
                var pair = this.table[name_1];
                array.push(pair.key);
            }
        }
        return array;
    };
    /**
     * Returns an array containing all of the values in this dictionary.
     * @return {Array} an array containing all of the values in this dictionary.
     */
    Dictionary.prototype.values = function () {
        var array = [];
        for (var name_2 in this.table) {
            if (util.has(this.table, name_2)) {
                var pair = this.table[name_2];
                array.push(pair.value);
            }
        }
        return array;
    };
    /**
    * Executes the provided function once for each key-value pair
    * present in this dictionary.
    * @param {function(Object,Object):*} callback function to execute, it is
    * invoked with two arguments: key and value. To break the iteration you can
    * optionally return false.
    */
    Dictionary.prototype.forEach = function (callback) {
        for (var name_3 in this.table) {
            if (util.has(this.table, name_3)) {
                var pair = this.table[name_3];
                var ret = callback(pair.key, pair.value);
                if (ret === false) {
                    return;
                }
            }
        }
    };
    /**
     * Returns true if this dictionary contains a mapping for the specified key.
     * @param {Object} key key whose presence in this dictionary is to be
     * tested.
     * @return {boolean} true if this dictionary contains a mapping for the
     * specified key.
     */
    Dictionary.prototype.containsKey = function (key) {
        return !util.isUndefined(this.getValue(key));
    };
    /**
    * Removes all mappings from this dictionary.
    * @this {collections.Dictionary}
    */
    Dictionary.prototype.clear = function () {
        this.table = {};
        this.nElements = 0;
    };
    /**
     * Returns the number of keys in this dictionary.
     * @return {number} the number of key-value mappings in this dictionary.
     */
    Dictionary.prototype.size = function () {
        return this.nElements;
    };
    /**
     * Returns true if this dictionary contains no mappings.
     * @return {boolean} true if this dictionary contains no mappings.
     */
    Dictionary.prototype.isEmpty = function () {
        return this.nElements <= 0;
    };
    Dictionary.prototype.toString = function () {
        var toret = '{';
        this.forEach(function (k, v) {
            toret += "\n\t" + k + " : " + v;
        });
        return toret + '\n}';
    };
    return Dictionary;
}());
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Dictionary; // End of dictionary
//# sourceMappingURL=Dictionary.js.map
});
___scope___.file("dist/lib/Set.js", function(exports, require, module, __filename, __dirname){

"use strict";
var util = require('./util');
var arrays = require('./arrays');
var Dictionary_1 = require('./Dictionary');
var Set = (function () {
    /**
     * Creates an empty set.
     * @class <p>A set is a data structure that contains no duplicate items.</p>
     * <p>If the inserted elements are custom objects a function
     * which converts elements to strings must be provided. Example:</p>
     *
     * <pre>
     * function petToString(pet) {
     *  return pet.name;
     * }
     * </pre>
     *
     * @constructor
     * @param {function(Object):string=} toStringFunction optional function used
     * to convert elements to strings. If the elements aren't strings or if toString()
     * is not appropriate, a custom function which receives a onject and returns a
     * unique string must be provided.
     */
    function Set(toStringFunction) {
        this.dictionary = new Dictionary_1.default(toStringFunction);
    }
    /**
     * Returns true if this set contains the specified element.
     * @param {Object} element element to search for.
     * @return {boolean} true if this set contains the specified element,
     * false otherwise.
     */
    Set.prototype.contains = function (element) {
        return this.dictionary.containsKey(element);
    };
    /**
     * Adds the specified element to this set if it is not already present.
     * @param {Object} element the element to insert.
     * @return {boolean} true if this set did not already contain the specified element.
     */
    Set.prototype.add = function (element) {
        if (this.contains(element) || util.isUndefined(element)) {
            return false;
        }
        else {
            this.dictionary.setValue(element, element);
            return true;
        }
    };
    /**
     * Performs an intersecion between this an another set.
     * Removes all values that are not present this set and the given set.
     * @param {collections.Set} otherSet other set.
     */
    Set.prototype.intersection = function (otherSet) {
        var set = this;
        this.forEach(function (element) {
            if (!otherSet.contains(element)) {
                set.remove(element);
            }
            return true;
        });
    };
    /**
     * Performs a union between this an another set.
     * Adds all values from the given set to this set.
     * @param {collections.Set} otherSet other set.
     */
    Set.prototype.union = function (otherSet) {
        var set = this;
        otherSet.forEach(function (element) {
            set.add(element);
            return true;
        });
    };
    /**
     * Performs a difference between this an another set.
     * Removes from this set all the values that are present in the given set.
     * @param {collections.Set} otherSet other set.
     */
    Set.prototype.difference = function (otherSet) {
        var set = this;
        otherSet.forEach(function (element) {
            set.remove(element);
            return true;
        });
    };
    /**
     * Checks whether the given set contains all the elements in this set.
     * @param {collections.Set} otherSet other set.
     * @return {boolean} true if this set is a subset of the given set.
     */
    Set.prototype.isSubsetOf = function (otherSet) {
        if (this.size() > otherSet.size()) {
            return false;
        }
        var isSub = true;
        this.forEach(function (element) {
            if (!otherSet.contains(element)) {
                isSub = false;
                return false;
            }
            return true;
        });
        return isSub;
    };
    /**
     * Removes the specified element from this set if it is present.
     * @return {boolean} true if this set contained the specified element.
     */
    Set.prototype.remove = function (element) {
        if (!this.contains(element)) {
            return false;
        }
        else {
            this.dictionary.remove(element);
            return true;
        }
    };
    /**
     * Executes the provided function once for each element
     * present in this set.
     * @param {function(Object):*} callback function to execute, it is
     * invoked with one arguments: the element. To break the iteration you can
     * optionally return false.
     */
    Set.prototype.forEach = function (callback) {
        this.dictionary.forEach(function (k, v) {
            return callback(v);
        });
    };
    /**
     * Returns an array containing all of the elements in this set in arbitrary order.
     * @return {Array} an array containing all of the elements in this set.
     */
    Set.prototype.toArray = function () {
        return this.dictionary.values();
    };
    /**
     * Returns true if this set contains no elements.
     * @return {boolean} true if this set contains no elements.
     */
    Set.prototype.isEmpty = function () {
        return this.dictionary.isEmpty();
    };
    /**
     * Returns the number of elements in this set.
     * @return {number} the number of elements in this set.
     */
    Set.prototype.size = function () {
        return this.dictionary.size();
    };
    /**
     * Removes all of the elements from this set.
     */
    Set.prototype.clear = function () {
        this.dictionary.clear();
    };
    /*
    * Provides a string representation for display
    */
    Set.prototype.toString = function () {
        return arrays.toString(this.toArray());
    };
    return Set;
}());
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Set; // end of Set
//# sourceMappingURL=Set.js.map
});
___scope___.file("dist/lib/BSTree.js", function(exports, require, module, __filename, __dirname){

"use strict";
var util = require('./util');
var Queue_1 = require('./Queue');
var BSTree = (function () {
    /**
     * Creates an empty binary search tree.
     * @class <p>A binary search tree is a binary tree in which each
     * internal node stores an element such that the elements stored in the
     * left subtree are less than it and the elements
     * stored in the right subtree are greater.</p>
     * <p>Formally, a binary search tree is a node-based binary tree data structure which
     * has the following properties:</p>
     * <ul>
     * <li>The left subtree of a node contains only nodes with elements less
     * than the node's element</li>
     * <li>The right subtree of a node contains only nodes with elements greater
     * than the node's element</li>
     * <li>Both the left and right subtrees must also be binary search trees.</li>
     * </ul>
     * <p>If the inserted elements are custom objects a compare function must
     * be provided at construction time, otherwise the <=, === and >= operators are
     * used to compare elements. Example:</p>
     * <pre>
     * function compare(a, b) {
     *  if (a is less than b by some ordering criterion) {
     *     return -1;
     *  } if (a is greater than b by the ordering criterion) {
     *     return 1;
     *  }
     *  // a must be equal to b
     *  return 0;
     * }
     * </pre>
     * @constructor
     * @param {function(Object,Object):number=} compareFunction optional
     * function used to compare two elements. Must return a negative integer,
     * zero, or a positive integer as the first argument is less than, equal to,
     * or greater than the second.
     */
    function BSTree(compareFunction) {
        this.root = null;
        this.compare = compareFunction || util.defaultCompare;
        this.nElements = 0;
    }
    /**
     * Adds the specified element to this tree if it is not already present.
     * @param {Object} element the element to insert.
     * @return {boolean} true if this tree did not already contain the specified element.
     */
    BSTree.prototype.add = function (element) {
        if (util.isUndefined(element)) {
            return false;
        }
        if (this.insertNode(this.createNode(element)) !== null) {
            this.nElements++;
            return true;
        }
        return false;
    };
    /**
     * Removes all of the elements from this tree.
     */
    BSTree.prototype.clear = function () {
        this.root = null;
        this.nElements = 0;
    };
    /**
     * Returns true if this tree contains no elements.
     * @return {boolean} true if this tree contains no elements.
     */
    BSTree.prototype.isEmpty = function () {
        return this.nElements === 0;
    };
    /**
     * Returns the number of elements in this tree.
     * @return {number} the number of elements in this tree.
     */
    BSTree.prototype.size = function () {
        return this.nElements;
    };
    /**
     * Returns true if this tree contains the specified element.
     * @param {Object} element element to search for.
     * @return {boolean} true if this tree contains the specified element,
     * false otherwise.
     */
    BSTree.prototype.contains = function (element) {
        if (util.isUndefined(element)) {
            return false;
        }
        return this.searchNode(this.root, element) !== null;
    };
    /**
     * Removes the specified element from this tree if it is present.
     * @return {boolean} true if this tree contained the specified element.
     */
    BSTree.prototype.remove = function (element) {
        var node = this.searchNode(this.root, element);
        if (node === null) {
            return false;
        }
        this.removeNode(node);
        this.nElements--;
        return true;
    };
    /**
     * Executes the provided function once for each element present in this tree in
     * in-order.
     * @param {function(Object):*} callback function to execute, it is invoked with one
     * argument: the element value, to break the iteration you can optionally return false.
     */
    BSTree.prototype.inorderTraversal = function (callback) {
        this.inorderTraversalAux(this.root, callback, {
            stop: false
        });
    };
    /**
     * Executes the provided function once for each element present in this tree in pre-order.
     * @param {function(Object):*} callback function to execute, it is invoked with one
     * argument: the element value, to break the iteration you can optionally return false.
     */
    BSTree.prototype.preorderTraversal = function (callback) {
        this.preorderTraversalAux(this.root, callback, {
            stop: false
        });
    };
    /**
     * Executes the provided function once for each element present in this tree in post-order.
     * @param {function(Object):*} callback function to execute, it is invoked with one
     * argument: the element value, to break the iteration you can optionally return false.
     */
    BSTree.prototype.postorderTraversal = function (callback) {
        this.postorderTraversalAux(this.root, callback, {
            stop: false
        });
    };
    /**
     * Executes the provided function once for each element present in this tree in
     * level-order.
     * @param {function(Object):*} callback function to execute, it is invoked with one
     * argument: the element value, to break the iteration you can optionally return false.
     */
    BSTree.prototype.levelTraversal = function (callback) {
        this.levelTraversalAux(this.root, callback);
    };
    /**
     * Returns the minimum element of this tree.
     * @return {*} the minimum element of this tree or undefined if this tree is
     * is empty.
     */
    BSTree.prototype.minimum = function () {
        if (this.isEmpty()) {
            return undefined;
        }
        return this.minimumAux(this.root).element;
    };
    /**
     * Returns the maximum element of this tree.
     * @return {*} the maximum element of this tree or undefined if this tree is
     * is empty.
     */
    BSTree.prototype.maximum = function () {
        if (this.isEmpty()) {
            return undefined;
        }
        return this.maximumAux(this.root).element;
    };
    /**
     * Executes the provided function once for each element present in this tree in inorder.
     * Equivalent to inorderTraversal.
     * @param {function(Object):*} callback function to execute, it is
     * invoked with one argument: the element value, to break the iteration you can
     * optionally return false.
     */
    BSTree.prototype.forEach = function (callback) {
        this.inorderTraversal(callback);
    };
    /**
     * Returns an array containing all of the elements in this tree in in-order.
     * @return {Array} an array containing all of the elements in this tree in in-order.
     */
    BSTree.prototype.toArray = function () {
        var array = [];
        this.inorderTraversal(function (element) {
            array.push(element);
            return true;
        });
        return array;
    };
    /**
     * Returns the height of this tree.
     * @return {number} the height of this tree or -1 if is empty.
     */
    BSTree.prototype.height = function () {
        return this.heightAux(this.root);
    };
    /**
    * @private
    */
    BSTree.prototype.searchNode = function (node, element) {
        var cmp = null;
        while (node !== null && cmp !== 0) {
            cmp = this.compare(element, node.element);
            if (cmp < 0) {
                node = node.leftCh;
            }
            else if (cmp > 0) {
                node = node.rightCh;
            }
        }
        return node;
    };
    /**
    * @private
    */
    BSTree.prototype.transplant = function (n1, n2) {
        if (n1.parent === null) {
            this.root = n2;
        }
        else if (n1 === n1.parent.leftCh) {
            n1.parent.leftCh = n2;
        }
        else {
            n1.parent.rightCh = n2;
        }
        if (n2 !== null) {
            n2.parent = n1.parent;
        }
    };
    /**
    * @private
    */
    BSTree.prototype.removeNode = function (node) {
        if (node.leftCh === null) {
            this.transplant(node, node.rightCh);
        }
        else if (node.rightCh === null) {
            this.transplant(node, node.leftCh);
        }
        else {
            var y = this.minimumAux(node.rightCh);
            if (y.parent !== node) {
                this.transplant(y, y.rightCh);
                y.rightCh = node.rightCh;
                y.rightCh.parent = y;
            }
            this.transplant(node, y);
            y.leftCh = node.leftCh;
            y.leftCh.parent = y;
        }
    };
    /**
    * @private
    */
    BSTree.prototype.inorderTraversalAux = function (node, callback, signal) {
        if (node === null || signal.stop) {
            return;
        }
        this.inorderTraversalAux(node.leftCh, callback, signal);
        if (signal.stop) {
            return;
        }
        signal.stop = callback(node.element) === false;
        if (signal.stop) {
            return;
        }
        this.inorderTraversalAux(node.rightCh, callback, signal);
    };
    /**
    * @private
    */
    BSTree.prototype.levelTraversalAux = function (node, callback) {
        var queue = new Queue_1.default();
        if (node !== null) {
            queue.enqueue(node);
        }
        while (!queue.isEmpty()) {
            node = queue.dequeue();
            if (callback(node.element) === false) {
                return;
            }
            if (node.leftCh !== null) {
                queue.enqueue(node.leftCh);
            }
            if (node.rightCh !== null) {
                queue.enqueue(node.rightCh);
            }
        }
    };
    /**
    * @private
    */
    BSTree.prototype.preorderTraversalAux = function (node, callback, signal) {
        if (node === null || signal.stop) {
            return;
        }
        signal.stop = callback(node.element) === false;
        if (signal.stop) {
            return;
        }
        this.preorderTraversalAux(node.leftCh, callback, signal);
        if (signal.stop) {
            return;
        }
        this.preorderTraversalAux(node.rightCh, callback, signal);
    };
    /**
    * @private
    */
    BSTree.prototype.postorderTraversalAux = function (node, callback, signal) {
        if (node === null || signal.stop) {
            return;
        }
        this.postorderTraversalAux(node.leftCh, callback, signal);
        if (signal.stop) {
            return;
        }
        this.postorderTraversalAux(node.rightCh, callback, signal);
        if (signal.stop) {
            return;
        }
        signal.stop = callback(node.element) === false;
    };
    /**
    * @private
    */
    BSTree.prototype.minimumAux = function (node) {
        while (node.leftCh !== null) {
            node = node.leftCh;
        }
        return node;
    };
    /**
    * @private
    */
    BSTree.prototype.maximumAux = function (node) {
        while (node.rightCh !== null) {
            node = node.rightCh;
        }
        return node;
    };
    /**
      * @private
      */
    BSTree.prototype.heightAux = function (node) {
        if (node === null) {
            return -1;
        }
        return Math.max(this.heightAux(node.leftCh), this.heightAux(node.rightCh)) + 1;
    };
    /*
    * @private
    */
    BSTree.prototype.insertNode = function (node) {
        var parent = null;
        var position = this.root;
        var cmp = null;
        while (position !== null) {
            cmp = this.compare(node.element, position.element);
            if (cmp === 0) {
                return null;
            }
            else if (cmp < 0) {
                parent = position;
                position = position.leftCh;
            }
            else {
                parent = position;
                position = position.rightCh;
            }
        }
        node.parent = parent;
        if (parent === null) {
            // tree is empty
            this.root = node;
        }
        else if (this.compare(node.element, parent.element) < 0) {
            parent.leftCh = node;
        }
        else {
            parent.rightCh = node;
        }
        return node;
    };
    /**
    * @private
    */
    BSTree.prototype.createNode = function (element) {
        return {
            element: element,
            leftCh: null,
            rightCh: null,
            parent: null
        };
    };
    return BSTree;
}());
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = BSTree;
//# sourceMappingURL=BSTree.js.map
});
___scope___.file("dist/lib/Queue.js", function(exports, require, module, __filename, __dirname){

"use strict";
var LinkedList_1 = require('./LinkedList');
var Queue = (function () {
    /**
     * Creates an empty queue.
     * @class A queue is a First-In-First-Out (FIFO) data structure, the first
     * element added to the queue will be the first one to be removed. This
     * implementation uses a linked list as a container.
     * @constructor
     */
    function Queue() {
        this.list = new LinkedList_1.default();
    }
    /**
     * Inserts the specified element into the end of this queue.
     * @param {Object} elem the element to insert.
     * @return {boolean} true if the element was inserted, or false if it is undefined.
     */
    Queue.prototype.enqueue = function (elem) {
        return this.list.add(elem);
    };
    /**
     * Inserts the specified element into the end of this queue.
     * @param {Object} elem the element to insert.
     * @return {boolean} true if the element was inserted, or false if it is undefined.
     */
    Queue.prototype.add = function (elem) {
        return this.list.add(elem);
    };
    /**
     * Retrieves and removes the head of this queue.
     * @return {*} the head of this queue, or undefined if this queue is empty.
     */
    Queue.prototype.dequeue = function () {
        if (this.list.size() !== 0) {
            var el = this.list.first();
            this.list.removeElementAtIndex(0);
            return el;
        }
        return undefined;
    };
    /**
     * Retrieves, but does not remove, the head of this queue.
     * @return {*} the head of this queue, or undefined if this queue is empty.
     */
    Queue.prototype.peek = function () {
        if (this.list.size() !== 0) {
            return this.list.first();
        }
        return undefined;
    };
    /**
     * Returns the number of elements in this queue.
     * @return {number} the number of elements in this queue.
     */
    Queue.prototype.size = function () {
        return this.list.size();
    };
    /**
     * Returns true if this queue contains the specified element.
     * <p>If the elements inside this stack are
     * not comparable with the === operator, a custom equals function should be
     * provided to perform searches, the function must receive two arguments and
     * return true if they are equal, false otherwise. Example:</p>
     *
     * <pre>
     * const petsAreEqualByName (pet1, pet2) {
     *  return pet1.name === pet2.name;
     * }
     * </pre>
     * @param {Object} elem element to search for.
     * @param {function(Object,Object):boolean=} equalsFunction optional
     * function to check if two elements are equal.
     * @return {boolean} true if this queue contains the specified element,
     * false otherwise.
     */
    Queue.prototype.contains = function (elem, equalsFunction) {
        return this.list.contains(elem, equalsFunction);
    };
    /**
     * Checks if this queue is empty.
     * @return {boolean} true if and only if this queue contains no items; false
     * otherwise.
     */
    Queue.prototype.isEmpty = function () {
        return this.list.size() <= 0;
    };
    /**
     * Removes all of the elements from this queue.
     */
    Queue.prototype.clear = function () {
        this.list.clear();
    };
    /**
     * Executes the provided function once for each element present in this queue in
     * FIFO order.
     * @param {function(Object):*} callback function to execute, it is
     * invoked with one argument: the element value, to break the iteration you can
     * optionally return false.
     */
    Queue.prototype.forEach = function (callback) {
        this.list.forEach(callback);
    };
    return Queue;
}());
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Queue; // End of queue
//# sourceMappingURL=Queue.js.map
});
___scope___.file("dist/lib/LinkedList.js", function(exports, require, module, __filename, __dirname){

"use strict";
var util = require('./util');
var arrays = require('./arrays');
var LinkedList = (function () {
    /**
    * Creates an empty Linked List.
    * @class A linked list is a data structure consisting of a group of nodes
    * which together represent a sequence.
    * @constructor
    */
    function LinkedList() {
        /**
        * First node in the list
        * @type {Object}
        * @private
        */
        this.firstNode = null;
        /**
        * Last node in the list
        * @type {Object}
        * @private
        */
        this.lastNode = null;
        /**
        * Number of elements in the list
        * @type {number}
        * @private
        */
        this.nElements = 0;
    }
    /**
    * Adds an element to this list.
    * @param {Object} item element to be added.
    * @param {number=} index optional index to add the element. If no index is specified
    * the element is added to the end of this list.
    * @return {boolean} true if the element was added or false if the index is invalid
    * or if the element is undefined.
    */
    LinkedList.prototype.add = function (item, index) {
        if (util.isUndefined(index)) {
            index = this.nElements;
        }
        if (index < 0 || index > this.nElements || util.isUndefined(item)) {
            return false;
        }
        var newNode = this.createNode(item);
        if (this.nElements === 0) {
            // First node in the list.
            this.firstNode = newNode;
            this.lastNode = newNode;
        }
        else if (index === this.nElements) {
            // Insert at the end.
            this.lastNode.next = newNode;
            this.lastNode = newNode;
        }
        else if (index === 0) {
            // Change first node.
            newNode.next = this.firstNode;
            this.firstNode = newNode;
        }
        else {
            var prev = this.nodeAtIndex(index - 1);
            newNode.next = prev.next;
            prev.next = newNode;
        }
        this.nElements++;
        return true;
    };
    /**
    * Returns the first element in this list.
    * @return {*} the first element of the list or undefined if the list is
    * empty.
    */
    LinkedList.prototype.first = function () {
        if (this.firstNode !== null) {
            return this.firstNode.element;
        }
        return undefined;
    };
    /**
    * Returns the last element in this list.
    * @return {*} the last element in the list or undefined if the list is
    * empty.
    */
    LinkedList.prototype.last = function () {
        if (this.lastNode !== null) {
            return this.lastNode.element;
        }
        return undefined;
    };
    /**
     * Returns the element at the specified position in this list.
     * @param {number} index desired index.
     * @return {*} the element at the given index or undefined if the index is
     * out of bounds.
     */
    LinkedList.prototype.elementAtIndex = function (index) {
        var node = this.nodeAtIndex(index);
        if (node === null) {
            return undefined;
        }
        return node.element;
    };
    /**
     * Returns the index in this list of the first occurrence of the
     * specified element, or -1 if the List does not contain this element.
     * <p>If the elements inside this list are
     * not comparable with the === operator a custom equals function should be
     * provided to perform searches, the function must receive two arguments and
     * return true if they are equal, false otherwise. Example:</p>
     *
     * <pre>
     * const petsAreEqualByName = function(pet1, pet2) {
     *  return pet1.name === pet2.name;
     * }
     * </pre>
     * @param {Object} item element to search for.
     * @param {function(Object,Object):boolean=} equalsFunction Optional
     * function used to check if two elements are equal.
     * @return {number} the index in this list of the first occurrence
     * of the specified element, or -1 if this list does not contain the
     * element.
     */
    LinkedList.prototype.indexOf = function (item, equalsFunction) {
        var equalsF = equalsFunction || util.defaultEquals;
        if (util.isUndefined(item)) {
            return -1;
        }
        var currentNode = this.firstNode;
        var index = 0;
        while (currentNode !== null) {
            if (equalsF(currentNode.element, item)) {
                return index;
            }
            index++;
            currentNode = currentNode.next;
        }
        return -1;
    };
    /**
       * Returns true if this list contains the specified element.
       * <p>If the elements inside the list are
       * not comparable with the === operator a custom equals function should be
       * provided to perform searches, the function must receive two arguments and
       * return true if they are equal, false otherwise. Example:</p>
       *
       * <pre>
       * const petsAreEqualByName = function(pet1, pet2) {
       *  return pet1.name === pet2.name;
       * }
       * </pre>
       * @param {Object} item element to search for.
       * @param {function(Object,Object):boolean=} equalsFunction Optional
       * function used to check if two elements are equal.
       * @return {boolean} true if this list contains the specified element, false
       * otherwise.
       */
    LinkedList.prototype.contains = function (item, equalsFunction) {
        return (this.indexOf(item, equalsFunction) >= 0);
    };
    /**
     * Removes the first occurrence of the specified element in this list.
     * <p>If the elements inside the list are
     * not comparable with the === operator a custom equals function should be
     * provided to perform searches, the function must receive two arguments and
     * return true if they are equal, false otherwise. Example:</p>
     *
     * <pre>
     * const petsAreEqualByName = function(pet1, pet2) {
     *  return pet1.name === pet2.name;
     * }
     * </pre>
     * @param {Object} item element to be removed from this list, if present.
     * @return {boolean} true if the list contained the specified element.
     */
    LinkedList.prototype.remove = function (item, equalsFunction) {
        var equalsF = equalsFunction || util.defaultEquals;
        if (this.nElements < 1 || util.isUndefined(item)) {
            return false;
        }
        var previous = null;
        var currentNode = this.firstNode;
        while (currentNode !== null) {
            if (equalsF(currentNode.element, item)) {
                if (currentNode === this.firstNode) {
                    this.firstNode = this.firstNode.next;
                    if (currentNode === this.lastNode) {
                        this.lastNode = null;
                    }
                }
                else if (currentNode === this.lastNode) {
                    this.lastNode = previous;
                    previous.next = currentNode.next;
                    currentNode.next = null;
                }
                else {
                    previous.next = currentNode.next;
                    currentNode.next = null;
                }
                this.nElements--;
                return true;
            }
            previous = currentNode;
            currentNode = currentNode.next;
        }
        return false;
    };
    /**
     * Removes all of the elements from this list.
     */
    LinkedList.prototype.clear = function () {
        this.firstNode = null;
        this.lastNode = null;
        this.nElements = 0;
    };
    /**
     * Returns true if this list is equal to the given list.
     * Two lists are equal if they have the same elements in the same order.
     * @param {LinkedList} other the other list.
     * @param {function(Object,Object):boolean=} equalsFunction optional
     * function used to check if two elements are equal. If the elements in the lists
     * are custom objects you should provide a function, otherwise
     * the === operator is used to check equality between elements.
     * @return {boolean} true if this list is equal to the given list.
     */
    LinkedList.prototype.equals = function (other, equalsFunction) {
        var eqF = equalsFunction || util.defaultEquals;
        if (!(other instanceof LinkedList)) {
            return false;
        }
        if (this.size() !== other.size()) {
            return false;
        }
        return this.equalsAux(this.firstNode, other.firstNode, eqF);
    };
    /**
    * @private
    */
    LinkedList.prototype.equalsAux = function (n1, n2, eqF) {
        while (n1 !== null) {
            if (!eqF(n1.element, n2.element)) {
                return false;
            }
            n1 = n1.next;
            n2 = n2.next;
        }
        return true;
    };
    /**
     * Removes the element at the specified position in this list.
     * @param {number} index given index.
     * @return {*} removed element or undefined if the index is out of bounds.
     */
    LinkedList.prototype.removeElementAtIndex = function (index) {
        if (index < 0 || index >= this.nElements) {
            return undefined;
        }
        var element;
        if (this.nElements === 1) {
            //First node in the list.
            element = this.firstNode.element;
            this.firstNode = null;
            this.lastNode = null;
        }
        else {
            var previous = this.nodeAtIndex(index - 1);
            if (previous === null) {
                element = this.firstNode.element;
                this.firstNode = this.firstNode.next;
            }
            else if (previous.next === this.lastNode) {
                element = this.lastNode.element;
                this.lastNode = previous;
            }
            if (previous !== null) {
                element = previous.next.element;
                previous.next = previous.next.next;
            }
        }
        this.nElements--;
        return element;
    };
    /**
     * Executes the provided function once for each element present in this list in order.
     * @param {function(Object):*} callback function to execute, it is
     * invoked with one argument: the element value, to break the iteration you can
     * optionally return false.
     */
    LinkedList.prototype.forEach = function (callback) {
        var currentNode = this.firstNode;
        while (currentNode !== null) {
            if (callback(currentNode.element) === false) {
                break;
            }
            currentNode = currentNode.next;
        }
    };
    /**
     * Reverses the order of the elements in this linked list (makes the last
     * element first, and the first element last).
     */
    LinkedList.prototype.reverse = function () {
        var previous = null;
        var current = this.firstNode;
        var temp = null;
        while (current !== null) {
            temp = current.next;
            current.next = previous;
            previous = current;
            current = temp;
        }
        temp = this.firstNode;
        this.firstNode = this.lastNode;
        this.lastNode = temp;
    };
    /**
     * Returns an array containing all of the elements in this list in proper
     * sequence.
     * @return {Array.<*>} an array containing all of the elements in this list,
     * in proper sequence.
     */
    LinkedList.prototype.toArray = function () {
        var array = [];
        var currentNode = this.firstNode;
        while (currentNode !== null) {
            array.push(currentNode.element);
            currentNode = currentNode.next;
        }
        return array;
    };
    /**
     * Returns the number of elements in this list.
     * @return {number} the number of elements in this list.
     */
    LinkedList.prototype.size = function () {
        return this.nElements;
    };
    /**
     * Returns true if this list contains no elements.
     * @return {boolean} true if this list contains no elements.
     */
    LinkedList.prototype.isEmpty = function () {
        return this.nElements <= 0;
    };
    LinkedList.prototype.toString = function () {
        return arrays.toString(this.toArray());
    };
    /**
     * @private
     */
    LinkedList.prototype.nodeAtIndex = function (index) {
        if (index < 0 || index >= this.nElements) {
            return null;
        }
        if (index === (this.nElements - 1)) {
            return this.lastNode;
        }
        var node = this.firstNode;
        for (var i = 0; i < index; i++) {
            node = node.next;
        }
        return node;
    };
    /**
     * @private
     */
    LinkedList.prototype.createNode = function (item) {
        return {
            element: item,
            next: null
        };
    };
    return LinkedList;
}());
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = LinkedList; // End of linked list
//# sourceMappingURL=LinkedList.js.map
});
___scope___.file("dist/lib/Heap.js", function(exports, require, module, __filename, __dirname){

"use strict";
var collections = require('./util');
var arrays = require('./arrays');
var Heap = (function () {
    /**
     * Creates an empty Heap.
     * @class
     * <p>A heap is a binary tree, where the nodes maintain the heap property:
     * each node is smaller than each of its children and therefore a MinHeap
     * This implementation uses an array to store elements.</p>
     * <p>If the inserted elements are custom objects a compare function must be provided,
     *  at construction time, otherwise the <=, === and >= operators are
     * used to compare elements. Example:</p>
     *
     * <pre>
     * function compare(a, b) {
     *  if (a is less than b by some ordering criterion) {
     *     return -1;
     *  } if (a is greater than b by the ordering criterion) {
     *     return 1;
     *  }
     *  // a must be equal to b
     *  return 0;
     * }
     * </pre>
     *
     * <p>If a Max-Heap is wanted (greater elements on top) you can a provide a
     * reverse compare function to accomplish that behavior. Example:</p>
     *
     * <pre>
     * function reverseCompare(a, b) {
     *  if (a is less than b by some ordering criterion) {
     *     return 1;
     *  } if (a is greater than b by the ordering criterion) {
     *     return -1;
     *  }
     *  // a must be equal to b
     *  return 0;
     * }
     * </pre>
     *
     * @constructor
     * @param {function(Object,Object):number=} compareFunction optional
     * function used to compare two elements. Must return a negative integer,
     * zero, or a positive integer as the first argument is less than, equal to,
     * or greater than the second.
     */
    function Heap(compareFunction) {
        /**
         * Array used to store the elements od the heap.
         * @type {Array.<Object>}
         * @private
         */
        this.data = [];
        this.compare = compareFunction || collections.defaultCompare;
    }
    /**
     * Returns the index of the left child of the node at the given index.
     * @param {number} nodeIndex The index of the node to get the left child
     * for.
     * @return {number} The index of the left child.
     * @private
     */
    Heap.prototype.leftChildIndex = function (nodeIndex) {
        return (2 * nodeIndex) + 1;
    };
    /**
     * Returns the index of the right child of the node at the given index.
     * @param {number} nodeIndex The index of the node to get the right child
     * for.
     * @return {number} The index of the right child.
     * @private
     */
    Heap.prototype.rightChildIndex = function (nodeIndex) {
        return (2 * nodeIndex) + 2;
    };
    /**
     * Returns the index of the parent of the node at the given index.
     * @param {number} nodeIndex The index of the node to get the parent for.
     * @return {number} The index of the parent.
     * @private
     */
    Heap.prototype.parentIndex = function (nodeIndex) {
        return Math.floor((nodeIndex - 1) / 2);
    };
    /**
     * Returns the index of the smaller child node (if it exists).
     * @param {number} leftChild left child index.
     * @param {number} rightChild right child index.
     * @return {number} the index with the minimum value or -1 if it doesn't
     * exists.
     * @private
     */
    Heap.prototype.minIndex = function (leftChild, rightChild) {
        if (rightChild >= this.data.length) {
            if (leftChild >= this.data.length) {
                return -1;
            }
            else {
                return leftChild;
            }
        }
        else {
            if (this.compare(this.data[leftChild], this.data[rightChild]) <= 0) {
                return leftChild;
            }
            else {
                return rightChild;
            }
        }
    };
    /**
     * Moves the node at the given index up to its proper place in the heap.
     * @param {number} index The index of the node to move up.
     * @private
     */
    Heap.prototype.siftUp = function (index) {
        var parent = this.parentIndex(index);
        while (index > 0 && this.compare(this.data[parent], this.data[index]) > 0) {
            arrays.swap(this.data, parent, index);
            index = parent;
            parent = this.parentIndex(index);
        }
    };
    /**
     * Moves the node at the given index down to its proper place in the heap.
     * @param {number} nodeIndex The index of the node to move down.
     * @private
     */
    Heap.prototype.siftDown = function (nodeIndex) {
        //smaller child index
        var min = this.minIndex(this.leftChildIndex(nodeIndex), this.rightChildIndex(nodeIndex));
        while (min >= 0 && this.compare(this.data[nodeIndex], this.data[min]) > 0) {
            arrays.swap(this.data, min, nodeIndex);
            nodeIndex = min;
            min = this.minIndex(this.leftChildIndex(nodeIndex), this.rightChildIndex(nodeIndex));
        }
    };
    /**
     * Retrieves but does not remove the root element of this heap.
     * @return {*} The value at the root of the heap. Returns undefined if the
     * heap is empty.
     */
    Heap.prototype.peek = function () {
        if (this.data.length > 0) {
            return this.data[0];
        }
        else {
            return undefined;
        }
    };
    /**
     * Adds the given element into the heap.
     * @param {*} element the element.
     * @return true if the element was added or fals if it is undefined.
     */
    Heap.prototype.add = function (element) {
        if (collections.isUndefined(element)) {
            return undefined;
        }
        this.data.push(element);
        this.siftUp(this.data.length - 1);
        return true;
    };
    /**
     * Retrieves and removes the root element of this heap.
     * @return {*} The value removed from the root of the heap. Returns
     * undefined if the heap is empty.
     */
    Heap.prototype.removeRoot = function () {
        if (this.data.length > 0) {
            var obj = this.data[0];
            this.data[0] = this.data[this.data.length - 1];
            this.data.splice(this.data.length - 1, 1);
            if (this.data.length > 0) {
                this.siftDown(0);
            }
            return obj;
        }
        return undefined;
    };
    /**
     * Returns true if this heap contains the specified element.
     * @param {Object} element element to search for.
     * @return {boolean} true if this Heap contains the specified element, false
     * otherwise.
     */
    Heap.prototype.contains = function (element) {
        var equF = collections.compareToEquals(this.compare);
        return arrays.contains(this.data, element, equF);
    };
    /**
     * Returns the number of elements in this heap.
     * @return {number} the number of elements in this heap.
     */
    Heap.prototype.size = function () {
        return this.data.length;
    };
    /**
     * Checks if this heap is empty.
     * @return {boolean} true if and only if this heap contains no items; false
     * otherwise.
     */
    Heap.prototype.isEmpty = function () {
        return this.data.length <= 0;
    };
    /**
     * Removes all of the elements from this heap.
     */
    Heap.prototype.clear = function () {
        this.data.length = 0;
    };
    /**
     * Executes the provided function once for each element present in this heap in
     * no particular order.
     * @param {function(Object):*} callback function to execute, it is
     * invoked with one argument: the element value, to break the iteration you can
     * optionally return false.
     */
    Heap.prototype.forEach = function (callback) {
        arrays.forEach(this.data, callback);
    };
    return Heap;
}());
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Heap;
//# sourceMappingURL=Heap.js.map
});
___scope___.file("dist/lib/LinkedDictionary.js", function(exports, require, module, __filename, __dirname){

"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Dictionary_1 = require('./Dictionary');
var util = require('./util');
/**
 * This class is used by the LinkedDictionary Internally
 * Has to be a class, not an interface, because it needs to have
 * the 'unlink' function defined.
 */
var LinkedDictionaryPair = (function () {
    function LinkedDictionaryPair(key, value) {
        this.key = key;
        this.value = value;
    }
    LinkedDictionaryPair.prototype.unlink = function () {
        this.prev.next = this.next;
        this.next.prev = this.prev;
    };
    return LinkedDictionaryPair;
}());
var LinkedDictionary = (function (_super) {
    __extends(LinkedDictionary, _super);
    function LinkedDictionary(toStrFunction) {
        _super.call(this, toStrFunction);
        this.head = new LinkedDictionaryPair(null, null);
        this.tail = new LinkedDictionaryPair(null, null);
        this.head.next = this.tail;
        this.tail.prev = this.head;
    }
    /**
     * Inserts the new node to the 'tail' of the list, updating the
     * neighbors, and moving 'this.tail' (the End of List indicator) that
     * to the end.
     */
    LinkedDictionary.prototype.appendToTail = function (entry) {
        var lastNode = this.tail.prev;
        lastNode.next = entry;
        entry.prev = lastNode;
        entry.next = this.tail;
        this.tail.prev = entry;
    };
    /**
     * Retrieves a linked dictionary from the table internally
     */
    LinkedDictionary.prototype.getLinkedDictionaryPair = function (key) {
        if (util.isUndefined(key)) {
            return undefined;
        }
        var k = '$' + this.toStr(key);
        var pair = (this.table[k]);
        return pair;
    };
    /**
     * Returns the value to which this dictionary maps the specified key.
     * Returns undefined if this dictionary contains no mapping for this key.
     * @param {Object} key key whose associated value is to be returned.
     * @return {*} the value to which this dictionary maps the specified key or
     * undefined if the map contains no mapping for this key.
     */
    LinkedDictionary.prototype.getValue = function (key) {
        var pair = this.getLinkedDictionaryPair(key);
        if (!util.isUndefined(pair)) {
            return pair.value;
        }
        return undefined;
    };
    /**
     * Removes the mapping for this key from this dictionary if it is present.
     * Also, if a value is present for this key, the entry is removed from the
     * insertion ordering.
     * @param {Object} key key whose mapping is to be removed from the
     * dictionary.
     * @return {*} previous value associated with specified key, or undefined if
     * there was no mapping for key.
     */
    LinkedDictionary.prototype.remove = function (key) {
        var pair = this.getLinkedDictionaryPair(key);
        if (!util.isUndefined(pair)) {
            _super.prototype.remove.call(this, key); // This will remove it from the table
            pair.unlink(); // This will unlink it from the chain
            return pair.value;
        }
        return undefined;
    };
    /**
    * Removes all mappings from this LinkedDictionary.
    * @this {collections.LinkedDictionary}
    */
    LinkedDictionary.prototype.clear = function () {
        _super.prototype.clear.call(this);
        this.head.next = this.tail;
        this.tail.prev = this.head;
    };
    /**
     * Internal function used when updating an existing KeyValue pair.
     * It places the new value indexed by key into the table, but maintains
     * its place in the linked ordering.
     */
    LinkedDictionary.prototype.replace = function (oldPair, newPair) {
        var k = '$' + this.toStr(newPair.key);
        // set the new Pair's links to existingPair's links
        newPair.next = oldPair.next;
        newPair.prev = oldPair.prev;
        // Delete Existing Pair from the table, unlink it from chain.
        // As a result, the nElements gets decremented by this operation
        this.remove(oldPair.key);
        // Link new Pair in place of where oldPair was,
        // by pointing the old pair's neighbors to it.
        newPair.prev.next = newPair;
        newPair.next.prev = newPair;
        this.table[k] = newPair;
        // To make up for the fact that the number of elements was decremented,
        // We need to increase it by one.
        ++this.nElements;
    };
    /**
     * Associates the specified value with the specified key in this dictionary.
     * If the dictionary previously contained a mapping for this key, the old
     * value is replaced by the specified value.
     * Updating of a key that already exists maintains its place in the
     * insertion order into the map.
     * @param {Object} key key with which the specified value is to be
     * associated.
     * @param {Object} value value to be associated with the specified key.
     * @return {*} previous value associated with the specified key, or undefined if
     * there was no mapping for the key or if the key/value are undefined.
     */
    LinkedDictionary.prototype.setValue = function (key, value) {
        if (util.isUndefined(key) || util.isUndefined(value)) {
            return undefined;
        }
        var existingPair = this.getLinkedDictionaryPair(key);
        var newPair = new LinkedDictionaryPair(key, value);
        var k = '$' + this.toStr(key);
        // If there is already an element for that key, we
        // keep it's place in the LinkedList
        if (!util.isUndefined(existingPair)) {
            this.replace(existingPair, newPair);
            return existingPair.value;
        }
        else {
            this.appendToTail(newPair);
            this.table[k] = newPair;
            ++this.nElements;
            return undefined;
        }
    };
    /**
     * Returns an array containing all of the keys in this LinkedDictionary, ordered
     * by insertion order.
     * @return {Array} an array containing all of the keys in this LinkedDictionary,
     * ordered by insertion order.
     */
    LinkedDictionary.prototype.keys = function () {
        var array = [];
        this.forEach(function (key, value) {
            array.push(key);
        });
        return array;
    };
    /**
     * Returns an array containing all of the values in this LinkedDictionary, ordered by
     * insertion order.
     * @return {Array} an array containing all of the values in this LinkedDictionary,
     * ordered by insertion order.
     */
    LinkedDictionary.prototype.values = function () {
        var array = [];
        this.forEach(function (key, value) {
            array.push(value);
        });
        return array;
    };
    /**
    * Executes the provided function once for each key-value pair
    * present in this LinkedDictionary. It is done in the order of insertion
    * into the LinkedDictionary
    * @param {function(Object,Object):*} callback function to execute, it is
    * invoked with two arguments: key and value. To break the iteration you can
    * optionally return false.
    */
    LinkedDictionary.prototype.forEach = function (callback) {
        var crawlNode = this.head.next;
        while (crawlNode.next != null) {
            var ret = callback(crawlNode.key, crawlNode.value);
            if (ret === false) {
                return;
            }
            crawlNode = crawlNode.next;
        }
    };
    return LinkedDictionary;
}(Dictionary_1.default));
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = LinkedDictionary; // End of LinkedDictionary
// /**
//  * Returns true if this dictionary is equal to the given dictionary.
//  * Two dictionaries are equal if they contain the same mappings.
//  * @param {collections.Dictionary} other the other dictionary.
//  * @param {function(Object,Object):boolean=} valuesEqualFunction optional
//  * function used to check if two values are equal.
//  * @return {boolean} true if this dictionary is equal to the given dictionary.
//  */
// collections.Dictionary.prototype.equals = function(other,valuesEqualFunction) {
// 	const eqF = valuesEqualFunction || collections.defaultEquals;
// 	if(!(other instanceof collections.Dictionary)){
// 		return false;
// 	}
// 	if(this.size() !== other.size()){
// 		return false;
// 	}
// 	return this.equalsAux(this.firstNode,other.firstNode,eqF);
// }
//# sourceMappingURL=LinkedDictionary.js.map
});
___scope___.file("dist/lib/MultiDictionary.js", function(exports, require, module, __filename, __dirname){

"use strict";
var util = require('./util');
var Dictionary_1 = require('./Dictionary');
var arrays = require('./arrays');
var MultiDictionary = (function () {
    /**
     * Creates an empty multi dictionary.
     * @class <p>A multi dictionary is a special kind of dictionary that holds
     * multiple values against each key. Setting a value into the dictionary will
     * add the value to an array at that key. Getting a key will return an array,
     * holding all the values set to that key.
     * You can configure to allow duplicates in the values.
     * This implementation accepts any kind of objects as keys.</p>
     *
     * <p>If the keys are custom objects a function which converts keys to strings must be
     * provided. Example:</p>
     *
     * <pre>
     * function petToString(pet) {
       *  return pet.name;
       * }
     * </pre>
     * <p>If the values are custom objects a function to check equality between values
     * must be provided. Example:</p>
     *
     * <pre>
     * function petsAreEqualByAge(pet1,pet2) {
       *  return pet1.age===pet2.age;
       * }
     * </pre>
     * @constructor
     * @param {function(Object):string=} toStrFunction optional function
     * to convert keys to strings. If the keys aren't strings or if toString()
     * is not appropriate, a custom function which receives a key and returns a
     * unique string must be provided.
     * @param {function(Object,Object):boolean=} valuesEqualsFunction optional
     * function to check if two values are equal.
     *
     * @param allowDuplicateValues
     */
    function MultiDictionary(toStrFunction, valuesEqualsFunction, allowDuplicateValues) {
        if (allowDuplicateValues === void 0) { allowDuplicateValues = false; }
        this.dict = new Dictionary_1.default(toStrFunction);
        this.equalsF = valuesEqualsFunction || util.defaultEquals;
        this.allowDuplicate = allowDuplicateValues;
    }
    /**
    * Returns an array holding the values to which this dictionary maps
    * the specified key.
    * Returns an empty array if this dictionary contains no mappings for this key.
    * @param {Object} key key whose associated values are to be returned.
    * @return {Array} an array holding the values to which this dictionary maps
    * the specified key.
    */
    MultiDictionary.prototype.getValue = function (key) {
        var values = this.dict.getValue(key);
        if (util.isUndefined(values)) {
            return [];
        }
        return arrays.copy(values);
    };
    /**
     * Adds the value to the array associated with the specified key, if
     * it is not already present.
     * @param {Object} key key with which the specified value is to be
     * associated.
     * @param {Object} value the value to add to the array at the key
     * @return {boolean} true if the value was not already associated with that key.
     */
    MultiDictionary.prototype.setValue = function (key, value) {
        if (util.isUndefined(key) || util.isUndefined(value)) {
            return false;
        }
        if (!this.containsKey(key)) {
            this.dict.setValue(key, [value]);
            return true;
        }
        var array = this.dict.getValue(key);
        if (!this.allowDuplicate) {
            if (arrays.contains(array, value, this.equalsF)) {
                return false;
            }
        }
        array.push(value);
        return true;
    };
    /**
     * Removes the specified values from the array of values associated with the
     * specified key. If a value isn't given, all values associated with the specified
     * key are removed.
     * @param {Object} key key whose mapping is to be removed from the
     * dictionary.
     * @param {Object=} value optional argument to specify the value to remove
     * from the array associated with the specified key.
     * @return {*} true if the dictionary changed, false if the key doesn't exist or
     * if the specified value isn't associated with the specified key.
     */
    MultiDictionary.prototype.remove = function (key, value) {
        if (util.isUndefined(value)) {
            var v = this.dict.remove(key);
            return !util.isUndefined(v);
        }
        var array = this.dict.getValue(key);
        if (arrays.remove(array, value, this.equalsF)) {
            if (array.length === 0) {
                this.dict.remove(key);
            }
            return true;
        }
        return false;
    };
    /**
     * Returns an array containing all of the keys in this dictionary.
     * @return {Array} an array containing all of the keys in this dictionary.
     */
    MultiDictionary.prototype.keys = function () {
        return this.dict.keys();
    };
    /**
     * Returns an array containing all of the values in this dictionary.
     * @return {Array} an array containing all of the values in this dictionary.
     */
    MultiDictionary.prototype.values = function () {
        var values = this.dict.values();
        var array = [];
        for (var _i = 0, values_1 = values; _i < values_1.length; _i++) {
            var v = values_1[_i];
            for (var _a = 0, v_1 = v; _a < v_1.length; _a++) {
                var w = v_1[_a];
                array.push(w);
            }
        }
        return array;
    };
    /**
     * Returns true if this dictionary at least one value associatted the specified key.
     * @param {Object} key key whose presence in this dictionary is to be
     * tested.
     * @return {boolean} true if this dictionary at least one value associatted
     * the specified key.
     */
    MultiDictionary.prototype.containsKey = function (key) {
        return this.dict.containsKey(key);
    };
    /**
     * Removes all mappings from this dictionary.
     */
    MultiDictionary.prototype.clear = function () {
        this.dict.clear();
    };
    /**
     * Returns the number of keys in this dictionary.
     * @return {number} the number of key-value mappings in this dictionary.
     */
    MultiDictionary.prototype.size = function () {
        return this.dict.size();
    };
    /**
     * Returns true if this dictionary contains no mappings.
     * @return {boolean} true if this dictionary contains no mappings.
     */
    MultiDictionary.prototype.isEmpty = function () {
        return this.dict.isEmpty();
    };
    return MultiDictionary;
}());
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = MultiDictionary; // end of multi dictionary
//# sourceMappingURL=MultiDictionary.js.map
});
___scope___.file("dist/lib/PriorityQueue.js", function(exports, require, module, __filename, __dirname){

"use strict";
var util = require('./util');
var Heap_1 = require('./Heap');
var PriorityQueue = (function () {
    /**
     * Creates an empty priority queue.
     * @class <p>In a priority queue each element is associated with a "priority",
     * elements are dequeued in highest-priority-first order (the elements with the
     * highest priority are dequeued first). Priority Queues are implemented as heaps.
     * If the inserted elements are custom objects a compare function must be provided,
     * otherwise the <=, === and >= operators are used to compare object priority.</p>
     * <pre>
     * function compare(a, b) {
     *  if (a is less than b by some ordering criterion) {
     *     return -1;
     *  } if (a is greater than b by the ordering criterion) {
     *     return 1;
     *  }
     *  // a must be equal to b
     *  return 0;
     * }
     * </pre>
     * @constructor
     * @param {function(Object,Object):number=} compareFunction optional
     * function used to compare two element priorities. Must return a negative integer,
     * zero, or a positive integer as the first argument is less than, equal to,
     * or greater than the second.
     */
    function PriorityQueue(compareFunction) {
        this.heap = new Heap_1.default(util.reverseCompareFunction(compareFunction));
    }
    /**
     * Inserts the specified element into this priority queue.
     * @param {Object} element the element to insert.
     * @return {boolean} true if the element was inserted, or false if it is undefined.
     */
    PriorityQueue.prototype.enqueue = function (element) {
        return this.heap.add(element);
    };
    /**
     * Inserts the specified element into this priority queue.
     * @param {Object} element the element to insert.
     * @return {boolean} true if the element was inserted, or false if it is undefined.
     */
    PriorityQueue.prototype.add = function (element) {
        return this.heap.add(element);
    };
    /**
     * Retrieves and removes the highest priority element of this queue.
     * @return {*} the the highest priority element of this queue,
     *  or undefined if this queue is empty.
     */
    PriorityQueue.prototype.dequeue = function () {
        if (this.heap.size() !== 0) {
            var el = this.heap.peek();
            this.heap.removeRoot();
            return el;
        }
        return undefined;
    };
    /**
     * Retrieves, but does not remove, the highest priority element of this queue.
     * @return {*} the highest priority element of this queue, or undefined if this queue is empty.
     */
    PriorityQueue.prototype.peek = function () {
        return this.heap.peek();
    };
    /**
     * Returns true if this priority queue contains the specified element.
     * @param {Object} element element to search for.
     * @return {boolean} true if this priority queue contains the specified element,
     * false otherwise.
     */
    PriorityQueue.prototype.contains = function (element) {
        return this.heap.contains(element);
    };
    /**
     * Checks if this priority queue is empty.
     * @return {boolean} true if and only if this priority queue contains no items; false
     * otherwise.
     */
    PriorityQueue.prototype.isEmpty = function () {
        return this.heap.isEmpty();
    };
    /**
     * Returns the number of elements in this priority queue.
     * @return {number} the number of elements in this priority queue.
     */
    PriorityQueue.prototype.size = function () {
        return this.heap.size();
    };
    /**
     * Removes all of the elements from this priority queue.
     */
    PriorityQueue.prototype.clear = function () {
        this.heap.clear();
    };
    /**
     * Executes the provided function once for each element present in this queue in
     * no particular order.
     * @param {function(Object):*} callback function to execute, it is
     * invoked with one argument: the element value, to break the iteration you can
     * optionally return false.
     */
    PriorityQueue.prototype.forEach = function (callback) {
        this.heap.forEach(callback);
    };
    return PriorityQueue;
}());
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = PriorityQueue; // end of priority queue
//# sourceMappingURL=PriorityQueue.js.map
});
___scope___.file("dist/lib/Stack.js", function(exports, require, module, __filename, __dirname){

"use strict";
var LinkedList_1 = require('./LinkedList');
var Stack = (function () {
    /**
     * Creates an empty Stack.
     * @class A Stack is a Last-In-First-Out (LIFO) data structure, the last
     * element added to the stack will be the first one to be removed. This
     * implementation uses a linked list as a container.
     * @constructor
     */
    function Stack() {
        this.list = new LinkedList_1.default();
    }
    /**
     * Pushes an item onto the top of this stack.
     * @param {Object} elem the element to be pushed onto this stack.
     * @return {boolean} true if the element was pushed or false if it is undefined.
     */
    Stack.prototype.push = function (elem) {
        return this.list.add(elem, 0);
    };
    /**
     * Pushes an item onto the top of this stack.
     * @param {Object} elem the element to be pushed onto this stack.
     * @return {boolean} true if the element was pushed or false if it is undefined.
     */
    Stack.prototype.add = function (elem) {
        return this.list.add(elem, 0);
    };
    /**
     * Removes the object at the top of this stack and returns that object.
     * @return {*} the object at the top of this stack or undefined if the
     * stack is empty.
     */
    Stack.prototype.pop = function () {
        return this.list.removeElementAtIndex(0);
    };
    /**
     * Looks at the object at the top of this stack without removing it from the
     * stack.
     * @return {*} the object at the top of this stack or undefined if the
     * stack is empty.
     */
    Stack.prototype.peek = function () {
        return this.list.first();
    };
    /**
     * Returns the number of elements in this stack.
     * @return {number} the number of elements in this stack.
     */
    Stack.prototype.size = function () {
        return this.list.size();
    };
    /**
     * Returns true if this stack contains the specified element.
     * <p>If the elements inside this stack are
     * not comparable with the === operator, a custom equals function should be
     * provided to perform searches, the function must receive two arguments and
     * return true if they are equal, false otherwise. Example:</p>
     *
     * <pre>
     * const petsAreEqualByName (pet1, pet2) {
     *  return pet1.name === pet2.name;
     * }
     * </pre>
     * @param {Object} elem element to search for.
     * @param {function(Object,Object):boolean=} equalsFunction optional
     * function to check if two elements are equal.
     * @return {boolean} true if this stack contains the specified element,
     * false otherwise.
     */
    Stack.prototype.contains = function (elem, equalsFunction) {
        return this.list.contains(elem, equalsFunction);
    };
    /**
     * Checks if this stack is empty.
     * @return {boolean} true if and only if this stack contains no items; false
     * otherwise.
     */
    Stack.prototype.isEmpty = function () {
        return this.list.isEmpty();
    };
    /**
     * Removes all of the elements from this stack.
     */
    Stack.prototype.clear = function () {
        this.list.clear();
    };
    /**
     * Executes the provided function once for each element present in this stack in
     * LIFO order.
     * @param {function(Object):*} callback function to execute, it is
     * invoked with one argument: the element value, to break the iteration you can
     * optionally return false.
     */
    Stack.prototype.forEach = function (callback) {
        this.list.forEach(callback);
    };
    return Stack;
}());
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Stack; // End of stack
//# sourceMappingURL=Stack.js.map
});
return ___scope___.entry = "dist/lib/index.js";
});
FuseBox.pkg("sanctuary-type-classes", {}, function(___scope___){
___scope___.file("index.js", function(exports, require, module, __filename, __dirname){

/*
             ############                  #
            ############                  ###
                  #####                  #####
                #####      ####################
              #####       ######################
            #####                     ###########
          #####         ######################
        #####          ####################
      #####                        #####
     ############                 ###
    ############                 */

//. # sanctuary-type-classes
//.
//. The [Fantasy Land Specification][FL] "specifies interoperability of common
//. algebraic structures" by defining a number of type classes. For each type
//. class, it states laws which every member of a type must obey in order for
//. the type to be a member of the type class. In order for the Maybe type to
//. be considered a [Functor][], for example, every `Maybe a` value must have
//. a `fantasy-land/map` method which obeys the identity and composition laws.
//.
//. This project provides:
//.
//.   - [`TypeClass`](#TypeClass), a function for defining type classes;
//.   - one `TypeClass` value for each Fantasy Land type class;
//.   - lawful Fantasy Land methods for JavaScript's built-in types;
//.   - one function for each Fantasy Land method; and
//.   - several functions derived from these functions.
//.
//. ## Type-class hierarchy
//.
//. <pre>
//:  Setoid   Semigroupoid  Semigroup   Foldable        Functor      Contravariant
//: (equals)    (compose)    (concat)   (reduce)         (map)        (contramap)
//:     |           |           |           \         / | | | | \
//:     |           |           |            \       /  | | | |  \
//:     |           |           |             \     /   | | | |   \
//:     |           |           |              \   /    | | | |    \
//:     |           |           |               \ /     | | | |     \
//:    Ord      Category     Monoid         Traversable | | | |      \
//:   (lte)       (id)       (empty)        (traverse)  / | | \       \
//:                                                    /  | |  \       \
//:                                                   /   / \   \       \
//:                                           Profunctor /   \ Bifunctor \
//:                                            (promap) /     \ (bimap)   \
//:                                                    /       \           \
//:                                                   /         \           \
//:                                                 Alt        Apply      Extend
//:                                                (alt)        (ap)     (extend)
//:                                                 /           / \           \
//:                                                /           /   \           \
//:                                               /           /     \           \
//:                                              /           /       \           \
//:                                             /           /         \           \
//:                                           Plus    Applicative    Chain      Comonad
//:                                          (zero)       (of)      (chain)    (extract)
//:                                             \         / \         / \
//:                                              \       /   \       /   \
//:                                               \     /     \     /     \
//:                                                \   /       \   /       \
//:                                                 \ /         \ /         \
//:                                             Alternative    Monad     ChainRec
//:                                                                     (chainRec)
//. </pre>
//.
//. ## API

(function(f) {

  'use strict';

  /* istanbul ignore else */
  if (typeof module === 'object' && typeof module.exports === 'object') {
    module.exports = f(require('sanctuary-type-identifiers'));
  } else if (typeof define === 'function' && define.amd != null) {
    define(['sanctuary-type-identifiers'], f);
  } else {
    self.sanctuaryTypeClasses = f(self.sanctuaryTypeIdentifiers);
  }

}(function(type) {

  'use strict';

  //  concat_ :: Array a -> Array a -> Array a
  function concat_(xs) {
    return function(ys) {
      return xs.concat(ys);
    };
  }

  //  constant :: a -> b -> a
  function constant(x) {
    return function(y) {
      return x;
    };
  }

  //  forEachKey :: (StrMap a, StrMap a ~> String -> Undefined) -> Undefined
  function forEachKey(strMap, f) {
    Object.keys(strMap).forEach(f, strMap);
  }

  //  has :: (String, Object) -> Boolean
  function has(k, o) {
    return Object.prototype.hasOwnProperty.call(o, k);
  }

  //  identity :: a -> a
  function identity(x) { return x; }

  //  pair :: a -> b -> Pair a b
  function pair(x) {
    return function(y) {
      return [x, y];
    };
  }

  //  sameType :: (a, b) -> Boolean
  function sameType(x, y) {
    return typeof x === typeof y && type(x) === type(y);
  }

  //  type Iteration a = { value :: a, done :: Boolean }

  //  iterationNext :: a -> Iteration a
  function iterationNext(x) { return {value: x, done: false}; }

  //  iterationDone :: a -> Iteration a
  function iterationDone(x) { return {value: x, done: true}; }

  //# TypeClass :: (String, String, Array TypeClass, a -> Boolean) -> TypeClass
  //.
  //. The arguments are:
  //.
  //.   - the name of the type class, prefixed by its npm package name;
  //.   - the documentation URL of the type class;
  //.   - an array of dependencies; and
  //.   - a predicate which accepts any JavaScript value and returns `true`
  //.     if the value satisfies the requirements of the type class; `false`
  //.     otherwise.
  //.
  //. Example:
  //.
  //. ```javascript
  //. //    hasMethod :: String -> a -> Boolean
  //. const hasMethod = name => x => x != null && typeof x[name] == 'function';
  //.
  //. //    Foo :: TypeClass
  //. const Foo = Z.TypeClass(
  //.   'my-package/Foo',
  //.   'http://example.com/my-package#Foo',
  //.   [],
  //.   hasMethod('foo')
  //. );
  //.
  //. //    Bar :: TypeClass
  //. const Bar = Z.TypeClass(
  //.   'my-package/Bar',
  //.   'http://example.com/my-package#Bar',
  //.   [Foo],
  //.   hasMethod('bar')
  //. );
  //. ```
  //.
  //. Types whose values have a `foo` method are members of the Foo type class.
  //. Members of the Foo type class whose values have a `bar` method are also
  //. members of the Bar type class.
  //.
  //. Each `TypeClass` value has a `test` field: a function which accepts
  //. any JavaScript value and returns `true` if the value satisfies the
  //. type class's predicate and the predicates of all the type class's
  //. dependencies; `false` otherwise.
  //.
  //. `TypeClass` values may be used with [sanctuary-def][type-classes]
  //. to define parametrically polymorphic functions which verify their
  //. type-class constraints at run time.
  function TypeClass(name, url, dependencies, test) {
    if (!(this instanceof TypeClass)) {
      return new TypeClass(name, url, dependencies, test);
    }
    this.name = name;
    this.url = url;
    this.test = function(x) {
      return dependencies.every(function(d) { return d.test(x); }) && test(x);
    };
  }

  TypeClass['@@type'] = 'sanctuary-type-classes/TypeClass';

  //  data Location = Constructor | Value

  //  Constructor :: Location
  var Constructor = 'Constructor';

  //  Value :: Location
  var Value = 'Value';

  //  _funcPath :: (Boolean, Array String, a) -> Nullable Function
  function _funcPath(allowInheritedProps, path, _x) {
    var x = _x;
    for (var idx = 0; idx < path.length; idx += 1) {
      var k = path[idx];
      if (x == null || !(allowInheritedProps || has(k, x))) return null;
      x = x[k];
    }
    return typeof x === 'function' ? x : null;
  }

  //  funcPath :: (Array String, a) -> Nullable Function
  function funcPath(path, x) {
    return _funcPath(true, path, x);
  }

  //  implPath :: Array String -> Nullable Function
  function implPath(path) {
    return _funcPath(false, path, implementations);
  }

  //  functionName :: Function -> String
  var functionName = has('name', function f() {}) ?
    function functionName(f) { return f.name; } :
    /* istanbul ignore next */
    function functionName(f) {
      var match = /function (\w*)/.exec(f);
      return match == null ? '' : match[1];
    };

  //  $ :: (String, Array TypeClass, StrMap (Array Location)) -> TypeClass
  function $(_name, dependencies, requirements) {
    function getBoundMethod(_name) {
      var name = 'fantasy-land/' + _name;
      return requirements[_name] === Constructor ?
        function(typeRep) {
          var f = funcPath([name], typeRep);
          return f == null && typeof typeRep === 'function' ?
            implPath([functionName(typeRep), name]) :
            f;
        } :
        function(x) {
          var isPrototype = x != null &&
                            x.constructor != null &&
                            x.constructor.prototype === x;
          var m = null;
          if (!isPrototype) m = funcPath([name], x);
          if (m == null)    m = implPath([type(x), 'prototype', name]);
          return m && m.bind(x);
        };
    }

    var version = '7.0.0';  // updated programmatically
    var keys = Object.keys(requirements);

    var typeClass = TypeClass(
      'sanctuary-type-classes/' + _name,
      'https://github.com/sanctuary-js/sanctuary-type-classes/tree/v' + version
        + '#' + _name,
      dependencies,
      function(x) {
        return keys.every(function(_name) {
          var arg = requirements[_name] === Constructor ? x.constructor : x;
          return getBoundMethod(_name)(arg) != null;
        });
      }
    );

    typeClass.methods = keys.reduce(function(methods, _name) {
      methods[_name] = getBoundMethod(_name);
      return methods;
    }, {});

    return typeClass;
  }

  //# Setoid :: TypeClass
  //.
  //. `TypeClass` value for [Setoid][].
  //.
  //. ```javascript
  //. > Setoid.test(null)
  //. true
  //. ```
  var Setoid = $('Setoid', [], {equals: Value});

  //# Ord :: TypeClass
  //.
  //. `TypeClass` value for [Ord][].
  //.
  //. ```javascript
  //. > Ord.test(0)
  //. true
  //.
  //. > Ord.test(Math.sqrt)
  //. false
  //. ```
  var Ord = $('Ord', [Setoid], {lte: Value});

  //# Semigroupoid :: TypeClass
  //.
  //. `TypeClass` value for [Semigroupoid][].
  //.
  //. ```javascript
  //. > Semigroupoid.test(Math.sqrt)
  //. true
  //.
  //. > Semigroupoid.test(0)
  //. false
  //. ```
  var Semigroupoid = $('Semigroupoid', [], {compose: Value});

  //# Category :: TypeClass
  //.
  //. `TypeClass` value for [Category][].
  //.
  //. ```javascript
  //. > Category.test(Math.sqrt)
  //. true
  //.
  //. > Category.test(0)
  //. false
  //. ```
  var Category = $('Category', [Semigroupoid], {id: Constructor});

  //# Semigroup :: TypeClass
  //.
  //. `TypeClass` value for [Semigroup][].
  //.
  //. ```javascript
  //. > Semigroup.test('')
  //. true
  //.
  //. > Semigroup.test(0)
  //. false
  //. ```
  var Semigroup = $('Semigroup', [], {concat: Value});

  //# Monoid :: TypeClass
  //.
  //. `TypeClass` value for [Monoid][].
  //.
  //. ```javascript
  //. > Monoid.test('')
  //. true
  //.
  //. > Monoid.test(0)
  //. false
  //. ```
  var Monoid = $('Monoid', [Semigroup], {empty: Constructor});

  //# Functor :: TypeClass
  //.
  //. `TypeClass` value for [Functor][].
  //.
  //. ```javascript
  //. > Functor.test([])
  //. true
  //.
  //. > Functor.test('')
  //. false
  //. ```
  var Functor = $('Functor', [], {map: Value});

  //# Bifunctor :: TypeClass
  //.
  //. `TypeClass` value for [Bifunctor][].
  //.
  //. ```javascript
  //. > Bifunctor.test(Tuple('foo', 64))
  //. true
  //.
  //. > Bifunctor.test([])
  //. false
  //. ```
  var Bifunctor = $('Bifunctor', [Functor], {bimap: Value});

  //# Profunctor :: TypeClass
  //.
  //. `TypeClass` value for [Profunctor][].
  //.
  //. ```javascript
  //. > Profunctor.test(Math.sqrt)
  //. true
  //.
  //. > Profunctor.test([])
  //. false
  //. ```
  var Profunctor = $('Profunctor', [Functor], {promap: Value});

  //# Apply :: TypeClass
  //.
  //. `TypeClass` value for [Apply][].
  //.
  //. ```javascript
  //. > Apply.test([])
  //. true
  //.
  //. > Apply.test('')
  //. false
  //. ```
  var Apply = $('Apply', [Functor], {ap: Value});

  //# Applicative :: TypeClass
  //.
  //. `TypeClass` value for [Applicative][].
  //.
  //. ```javascript
  //. > Applicative.test([])
  //. true
  //.
  //. > Applicative.test({})
  //. false
  //. ```
  var Applicative = $('Applicative', [Apply], {of: Constructor});

  //# Chain :: TypeClass
  //.
  //. `TypeClass` value for [Chain][].
  //.
  //. ```javascript
  //. > Chain.test([])
  //. true
  //.
  //. > Chain.test({})
  //. false
  //. ```
  var Chain = $('Chain', [Apply], {chain: Value});

  //# ChainRec :: TypeClass
  //.
  //. `TypeClass` value for [ChainRec][].
  //.
  //. ```javascript
  //. > ChainRec.test([])
  //. true
  //.
  //. > ChainRec.test({})
  //. false
  //. ```
  var ChainRec = $('ChainRec', [Chain], {chainRec: Constructor});

  //# Monad :: TypeClass
  //.
  //. `TypeClass` value for [Monad][].
  //.
  //. ```javascript
  //. > Monad.test([])
  //. true
  //.
  //. > Monad.test({})
  //. false
  //. ```
  var Monad = $('Monad', [Applicative, Chain], {});

  //# Alt :: TypeClass
  //.
  //. `TypeClass` value for [Alt][].
  //.
  //. ```javascript
  //. > Alt.test({})
  //. true
  //.
  //. > Alt.test('')
  //. false
  //. ```
  var Alt = $('Alt', [Functor], {alt: Value});

  //# Plus :: TypeClass
  //.
  //. `TypeClass` value for [Plus][].
  //.
  //. ```javascript
  //. > Plus.test({})
  //. true
  //.
  //. > Plus.test('')
  //. false
  //. ```
  var Plus = $('Plus', [Alt], {zero: Constructor});

  //# Alternative :: TypeClass
  //.
  //. `TypeClass` value for [Alternative][].
  //.
  //. ```javascript
  //. > Alternative.test([])
  //. true
  //.
  //. > Alternative.test({})
  //. false
  //. ```
  var Alternative = $('Alternative', [Applicative, Plus], {});

  //# Foldable :: TypeClass
  //.
  //. `TypeClass` value for [Foldable][].
  //.
  //. ```javascript
  //. > Foldable.test({})
  //. true
  //.
  //. > Foldable.test('')
  //. false
  //. ```
  var Foldable = $('Foldable', [], {reduce: Value});

  //# Traversable :: TypeClass
  //.
  //. `TypeClass` value for [Traversable][].
  //.
  //. ```javascript
  //. > Traversable.test([])
  //. true
  //.
  //. > Traversable.test('')
  //. false
  //. ```
  var Traversable = $('Traversable', [Functor, Foldable], {traverse: Value});

  //# Extend :: TypeClass
  //.
  //. `TypeClass` value for [Extend][].
  //.
  //. ```javascript
  //. > Extend.test([])
  //. true
  //.
  //. > Extend.test({})
  //. false
  //. ```
  var Extend = $('Extend', [Functor], {extend: Value});

  //# Comonad :: TypeClass
  //.
  //. `TypeClass` value for [Comonad][].
  //.
  //. ```javascript
  //. > Comonad.test(Identity(0))
  //. true
  //.
  //. > Comonad.test([])
  //. false
  //. ```
  var Comonad = $('Comonad', [Extend], {extract: Value});

  //# Contravariant :: TypeClass
  //.
  //. `TypeClass` value for [Contravariant][].
  //.
  //. ```javascript
  //. > Contravariant.test(Math.sqrt)
  //. true
  //.
  //. > Contravariant.test([])
  //. false
  //. ```
  var Contravariant = $('Contravariant', [], {contramap: Value});

  //  Null$prototype$toString :: Null ~> () -> String
  function Null$prototype$toString() {
    return 'null';
  }

  //  Null$prototype$equals :: Null ~> Null -> Boolean
  function Null$prototype$equals(other) {
    return true;
  }

  //  Null$prototype$lte :: Null ~> Null -> Boolean
  function Null$prototype$lte(other) {
    return true;
  }

  //  Undefined$prototype$toString :: Undefined ~> () -> String
  function Undefined$prototype$toString() {
    return 'undefined';
  }

  //  Undefined$prototype$equals :: Undefined ~> Undefined -> Boolean
  function Undefined$prototype$equals(other) {
    return true;
  }

  //  Undefined$prototype$lte :: Undefined ~> Undefined -> Boolean
  function Undefined$prototype$lte(other) {
    return true;
  }

  //  Boolean$prototype$toString :: Boolean ~> () -> String
  function Boolean$prototype$toString() {
    return typeof this === 'object' ?
      'new Boolean(' + toString(this.valueOf()) + ')' :
      this.toString();
  }

  //  Boolean$prototype$equals :: Boolean ~> Boolean -> Boolean
  function Boolean$prototype$equals(other) {
    return typeof this === 'object' ?
      equals(this.valueOf(), other.valueOf()) :
      this === other;
  }

  //  Boolean$prototype$lte :: Boolean ~> Boolean -> Boolean
  function Boolean$prototype$lte(other) {
    return typeof this === 'object' ?
      lte(this.valueOf(), other.valueOf()) :
      this === false || other === true;
  }

  //  Number$prototype$toString :: Number ~> () -> String
  function Number$prototype$toString() {
    return typeof this === 'object' ?
      'new Number(' + toString(this.valueOf()) + ')' :
      1 / this === -Infinity ? '-0' : this.toString(10);
  }

  //  Number$prototype$equals :: Number ~> Number -> Boolean
  function Number$prototype$equals(other) {
    return typeof this === 'object' ?
      equals(this.valueOf(), other.valueOf()) :
      isNaN(this) && isNaN(other) || this === other;
  }

  //  Number$prototype$lte :: Number ~> Number -> Boolean
  function Number$prototype$lte(other) {
    return typeof this === 'object' ?
      lte(this.valueOf(), other.valueOf()) :
      isNaN(this) && isNaN(other) || this <= other;
  }

  //  Date$prototype$toString :: Date ~> () -> String
  function Date$prototype$toString() {
    var x = isNaN(this.valueOf()) ? NaN : this.toISOString();
    return 'new Date(' + toString(x) + ')';
  }

  //  Date$prototype$equals :: Date ~> Date -> Boolean
  function Date$prototype$equals(other) {
    return equals(this.valueOf(), other.valueOf());
  }

  //  Date$prototype$lte :: Date ~> Date -> Boolean
  function Date$prototype$lte(other) {
    return lte(this.valueOf(), other.valueOf());
  }

  //  RegExp$prototype$equals :: RegExp ~> RegExp -> Boolean
  function RegExp$prototype$equals(other) {
    return other.source === this.source &&
           other.global === this.global &&
           other.ignoreCase === this.ignoreCase &&
           other.multiline === this.multiline &&
           other.sticky === this.sticky &&
           other.unicode === this.unicode;
  }

  //  String$empty :: () -> String
  function String$empty() {
    return '';
  }

  //  String$prototype$toString :: String ~> () -> String
  function String$prototype$toString() {
    return typeof this === 'object' ?
      'new String(' + toString(this.valueOf()) + ')' :
      JSON.stringify(this);
  }

  //  String$prototype$equals :: String ~> String -> Boolean
  function String$prototype$equals(other) {
    return typeof this === 'object' ?
      equals(this.valueOf(), other.valueOf()) :
      this === other;
  }

  //  String$prototype$lte :: String ~> String -> Boolean
  function String$prototype$lte(other) {
    return typeof this === 'object' ?
      lte(this.valueOf(), other.valueOf()) :
      this <= other;
  }

  //  String$prototype$concat :: String ~> String -> String
  function String$prototype$concat(other) {
    return this + other;
  }

  //  Array$empty :: () -> Array a
  function Array$empty() {
    return [];
  }

  //  Array$of :: a -> Array a
  function Array$of(x) {
    return [x];
  }

  //  Array$chainRec :: ((a -> c, b -> c, a) -> Array c, a) -> Array b
  function Array$chainRec(f, x) {
    var $todo = [x];
    var $done = [];
    while ($todo.length > 0) {
      var xs = f(iterationNext, iterationDone, $todo.shift());
      var $more = [];
      for (var idx = 0; idx < xs.length; idx += 1) {
        (xs[idx].done ? $done : $more).push(xs[idx].value);
      }
      Array.prototype.unshift.apply($todo, $more);
    }
    return $done;
  }

  //  Array$zero :: () -> Array a
  function Array$zero() {
    return [];
  }

  //  Array$prototype$toString :: Array a ~> () -> String
  function Array$prototype$toString() {
    var reprs = this.map(toString);
    var keys = Object.keys(this).sort();
    for (var idx = 0; idx < keys.length; idx += 1) {
      var k = keys[idx];
      if (!/^\d+$/.test(k)) {
        reprs.push(toString(k) + ': ' + toString(this[k]));
      }
    }
    return '[' + reprs.join(', ') + ']';
  }

  //  Array$prototype$equals :: Array a ~> Array a -> Boolean
  function Array$prototype$equals(other) {
    if (other.length !== this.length) return false;
    for (var idx = 0; idx < this.length; idx += 1) {
      if (!equals(this[idx], other[idx])) return false;
    }
    return true;
  }

  //  Array$prototype$lte :: Array a ~> Array a -> Boolean
  function Array$prototype$lte(other) {
    for (var idx = 0; true; idx += 1) {
      if (idx === this.length) return true;
      if (idx === other.length) return false;
      if (!equals(this[idx], other[idx])) return lte(this[idx], other[idx]);
    }
  }

  //  Array$prototype$concat :: Array a ~> Array a -> Array a
  function Array$prototype$concat(other) {
    return this.concat(other);
  }

  //  Array$prototype$map :: Array a ~> (a -> b) -> Array b
  function Array$prototype$map(f) {
    return this.map(function(x) { return f(x); });
  }

  //  Array$prototype$ap :: Array a ~> Array (a -> b) -> Array b
  function Array$prototype$ap(fs) {
    var result = [];
    for (var idx = 0; idx < fs.length; idx += 1) {
      for (var idx2 = 0; idx2 < this.length; idx2 += 1) {
        result.push(fs[idx](this[idx2]));
      }
    }
    return result;
  }

  //  Array$prototype$chain :: Array a ~> (a -> Array b) -> Array b
  function Array$prototype$chain(f) {
    var result = [];
    this.forEach(function(x) { Array.prototype.push.apply(result, f(x)); });
    return result;
  }

  //  Array$prototype$alt :: Array a ~> Array a -> Array a
  var Array$prototype$alt = Array$prototype$concat;

  //  Array$prototype$reduce :: Array a ~> ((b, a) -> b, b) -> b
  function Array$prototype$reduce(f, initial) {
    return this.reduce(function(acc, x) { return f(acc, x); }, initial);
  }

  //  Array$prototype$traverse :: Applicative f => Array a ~> (TypeRep f, a -> f b) -> f (Array b)
  function Array$prototype$traverse(typeRep, f) {
    var xs = this;
    function go(idx, n) {
      switch (n) {
        case 0: return of(typeRep, []);
        case 2: return lift2(pair, f(xs[idx]), f(xs[idx + 1]));
        default:
          var m = Math.floor(n / 4) * 2;
          return lift2(concat_, go(idx, m), go(idx + m, n - m));
      }
    }
    return this.length % 2 === 1 ?
      lift2(concat_, map(Array$of, f(this[0])), go(1, this.length - 1)) :
      go(0, this.length);
  }

  //  Array$prototype$extend :: Array a ~> (Array a -> b) -> Array b
  function Array$prototype$extend(f) {
    return this.map(function(_, idx, xs) { return f(xs.slice(idx)); });
  }

  //  Arguments$prototype$toString :: Arguments ~> String
  function Arguments$prototype$toString() {
    var args = Array.prototype.map.call(this, toString).join(', ');
    return '(function () { return arguments; }(' + args + '))';
  }

  //  Arguments$prototype$equals :: Arguments ~> Arguments -> Boolean
  function Arguments$prototype$equals(other) {
    return Array$prototype$equals.call(this, other);
  }

  //  Arguments$prototype$lte :: Arguments ~> Arguments -> Boolean
  function Arguments$prototype$lte(other) {
    return Array$prototype$lte.call(this, other);
  }

  //  Error$prototype$toString :: Error ~> () -> String
  function Error$prototype$toString() {
    return 'new ' + this.name + '(' + toString(this.message) + ')';
  }

  //  Error$prototype$equals :: Error ~> Error -> Boolean
  function Error$prototype$equals(other) {
    return equals(this.name, other.name) &&
           equals(this.message, other.message);
  }

  //  Object$empty :: () -> StrMap a
  function Object$empty() {
    return {};
  }

  //  Object$zero :: () -> StrMap a
  function Object$zero() {
    return {};
  }

  //  Object$prototype$toString :: StrMap a ~> () -> String
  function Object$prototype$toString() {
    var reprs = [];
    var keys = Object.keys(this).sort();
    for (var idx = 0; idx < keys.length; idx += 1) {
      var k = keys[idx];
      reprs.push(toString(k) + ': ' + toString(this[k]));
    }
    return '{' + reprs.join(', ') + '}';
  }

  //  Object$prototype$equals :: StrMap a ~> StrMap a -> Boolean
  function Object$prototype$equals(other) {
    var self = this;
    var keys = Object.keys(this).sort();
    return equals(keys, Object.keys(other).sort()) &&
           keys.every(function(k) { return equals(self[k], other[k]); });
  }

  //  Object$prototype$lte :: StrMap a ~> StrMap a -> Boolean
  function Object$prototype$lte(other) {
    var theseKeys = Object.keys(this).sort();
    var otherKeys = Object.keys(other).sort();
    while (true) {
      if (theseKeys.length === 0) return true;
      if (otherKeys.length === 0) return false;
      var k = theseKeys.shift();
      var z = otherKeys.shift();
      if (k < z) return true;
      if (k > z) return false;
      if (!equals(this[k], other[k])) return lte(this[k], other[k]);
    }
  }

  //  Object$prototype$concat :: StrMap a ~> StrMap a -> StrMap a
  function Object$prototype$concat(other) {
    var result = {};
    function assign(k) { result[k] = this[k]; }
    forEachKey(this, assign);
    forEachKey(other, assign);
    return result;
  }

  //  Object$prototype$map :: StrMap a ~> (a -> b) -> StrMap b
  function Object$prototype$map(f) {
    var result = {};
    forEachKey(this, function(k) { result[k] = f(this[k]); });
    return result;
  }

  //  Object$prototype$ap :: StrMap a ~> StrMap (a -> b) -> StrMap b
  function Object$prototype$ap(other) {
    var result = {};
    forEachKey(this, function(k) {
      if (has(k, other)) result[k] = other[k](this[k]);
    });
    return result;
  }

  //  Object$prototype$alt :: StrMap a ~> StrMap a -> StrMap a
  var Object$prototype$alt = Object$prototype$concat;

  //  Object$prototype$reduce :: StrMap a ~> ((b, a) -> b, b) -> b
  function Object$prototype$reduce(f, initial) {
    var self = this;
    function reducer(acc, k) { return f(acc, self[k]); }
    return Object.keys(this).sort().reduce(reducer, initial);
  }

  //  Object$prototype$traverse :: Applicative f => StrMap a ~> (TypeRep f, a -> f b) -> f (StrMap b)
  function Object$prototype$traverse(typeRep, f) {
    var self = this;
    return Object.keys(this).reduce(function(applicative, k) {
      function set(o) { return function(v) { o[k] = v; return o; }; }
      return lift2(set, applicative, f(self[k]));
    }, of(typeRep, {}));
  }

  //  Function$id :: () -> a -> a
  function Function$id() {
    return identity;
  }

  //  Function$of :: b -> (a -> b)
  function Function$of(x) {
    return function(_) { return x; };
  }

  //  Function$chainRec :: ((a -> c, b -> c, a) -> (z -> c), a) -> (z -> b)
  function Function$chainRec(f, x) {
    return function(a) {
      var step = iterationNext(x);
      while (!step.done) {
        step = f(iterationNext, iterationDone, step.value)(a);
      }
      return step.value;
    };
  }

  //  Function$prototype$equals :: Function ~> Function -> Boolean
  function Function$prototype$equals(other) {
    return other === this;
  }

  //  Function$prototype$compose :: (a -> b) ~> (b -> c) -> (a -> c)
  function Function$prototype$compose(other) {
    var semigroupoid = this;
    return function(x) { return other(semigroupoid(x)); };
  }

  //  Function$prototype$map :: (a -> b) ~> (b -> c) -> (a -> c)
  function Function$prototype$map(f) {
    var functor = this;
    return function(x) { return f(functor(x)); };
  }

  //  Function$prototype$promap :: (b -> c) ~> (a -> b, c -> d) -> (a -> d)
  function Function$prototype$promap(f, g) {
    var profunctor = this;
    return function(x) { return g(profunctor(f(x))); };
  }

  //  Function$prototype$ap :: (a -> b) ~> (a -> b -> c) -> (a -> c)
  function Function$prototype$ap(f) {
    var apply = this;
    return function(x) { return f(x)(apply(x)); };
  }

  //  Function$prototype$chain :: (a -> b) ~> (b -> a -> c) -> (a -> c)
  function Function$prototype$chain(f) {
    var chain = this;
    return function(x) { return f(chain(x))(x); };
  }

  //  Function$prototype$contramap :: (b -> c) ~> (a -> b) -> (a -> c)
  function Function$prototype$contramap(f) {
    var contravariant = this;
    return function(x) { return contravariant(f(x)); };
  }

  /* eslint-disable key-spacing */
  var implementations = {
    Null: {
      prototype: {
        toString:                   Null$prototype$toString,
        'fantasy-land/equals':      Null$prototype$equals,
        'fantasy-land/lte':         Null$prototype$lte
      }
    },
    Undefined: {
      prototype: {
        toString:                   Undefined$prototype$toString,
        'fantasy-land/equals':      Undefined$prototype$equals,
        'fantasy-land/lte':         Undefined$prototype$lte
      }
    },
    Boolean: {
      prototype: {
        toString:                   Boolean$prototype$toString,
        'fantasy-land/equals':      Boolean$prototype$equals,
        'fantasy-land/lte':         Boolean$prototype$lte
      }
    },
    Number: {
      prototype: {
        toString:                   Number$prototype$toString,
        'fantasy-land/equals':      Number$prototype$equals,
        'fantasy-land/lte':         Number$prototype$lte
      }
    },
    Date: {
      prototype: {
        toString:                   Date$prototype$toString,
        'fantasy-land/equals':      Date$prototype$equals,
        'fantasy-land/lte':         Date$prototype$lte
      }
    },
    RegExp: {
      prototype: {
        'fantasy-land/equals':      RegExp$prototype$equals
      }
    },
    String: {
      'fantasy-land/empty':         String$empty,
      prototype: {
        toString:                   String$prototype$toString,
        'fantasy-land/equals':      String$prototype$equals,
        'fantasy-land/lte':         String$prototype$lte,
        'fantasy-land/concat':      String$prototype$concat
      }
    },
    Array: {
      'fantasy-land/empty':         Array$empty,
      'fantasy-land/of':            Array$of,
      'fantasy-land/chainRec':      Array$chainRec,
      'fantasy-land/zero':          Array$zero,
      prototype: {
        toString:                   Array$prototype$toString,
        'fantasy-land/equals':      Array$prototype$equals,
        'fantasy-land/lte':         Array$prototype$lte,
        'fantasy-land/concat':      Array$prototype$concat,
        'fantasy-land/map':         Array$prototype$map,
        'fantasy-land/ap':          Array$prototype$ap,
        'fantasy-land/chain':       Array$prototype$chain,
        'fantasy-land/alt':         Array$prototype$alt,
        'fantasy-land/reduce':      Array$prototype$reduce,
        'fantasy-land/traverse':    Array$prototype$traverse,
        'fantasy-land/extend':      Array$prototype$extend
      }
    },
    Arguments: {
      prototype: {
        toString:                   Arguments$prototype$toString,
        'fantasy-land/equals':      Arguments$prototype$equals,
        'fantasy-land/lte':         Arguments$prototype$lte
      }
    },
    Error: {
      prototype: {
        toString:                   Error$prototype$toString,
        'fantasy-land/equals':      Error$prototype$equals
      }
    },
    Object: {
      'fantasy-land/empty':         Object$empty,
      'fantasy-land/zero':          Object$zero,
      prototype: {
        toString:                   Object$prototype$toString,
        'fantasy-land/equals':      Object$prototype$equals,
        'fantasy-land/lte':         Object$prototype$lte,
        'fantasy-land/concat':      Object$prototype$concat,
        'fantasy-land/map':         Object$prototype$map,
        'fantasy-land/ap':          Object$prototype$ap,
        'fantasy-land/alt':         Object$prototype$alt,
        'fantasy-land/reduce':      Object$prototype$reduce,
        'fantasy-land/traverse':    Object$prototype$traverse
      }
    },
    Function: {
      'fantasy-land/id':            Function$id,
      'fantasy-land/of':            Function$of,
      'fantasy-land/chainRec':      Function$chainRec,
      prototype: {
        'fantasy-land/equals':      Function$prototype$equals,
        'fantasy-land/compose':     Function$prototype$compose,
        'fantasy-land/map':         Function$prototype$map,
        'fantasy-land/promap':      Function$prototype$promap,
        'fantasy-land/ap':          Function$prototype$ap,
        'fantasy-land/chain':       Function$prototype$chain,
        'fantasy-land/contramap':   Function$prototype$contramap
      }
    }
  };
  /* eslint-enable key-spacing */

  //# toString :: a -> String
  //.
  //. Returns a useful string representation of its argument.
  //.
  //. Dispatches to the argument's `toString` method if appropriate.
  //.
  //. Where practical, `equals(eval(toString(x)), x) = true`.
  //.
  //. `toString` implementations are provided for the following built-in types:
  //. Null, Undefined, Boolean, Number, Date, String, Array, Arguments, Error,
  //. and Object.
  //.
  //. ```javascript
  //. > toString(-0)
  //. '-0'
  //.
  //. > toString(['foo', 'bar', 'baz'])
  //. '["foo", "bar", "baz"]'
  //.
  //. > toString({x: 1, y: 2, z: 3})
  //. '{"x": 1, "y": 2, "z": 3}'
  //.
  //. > toString(Cons(1, Cons(2, Cons(3, Nil))))
  //. 'Cons(1, Cons(2, Cons(3, Nil)))'
  //. ```
  var toString = (function() {
    //  $seen :: Array Any
    var $seen = [];

    function call(method, x) {
      $seen.push(x);
      try { return method.call(x); } finally { $seen.pop(); }
    }

    return function toString(x) {
      if ($seen.indexOf(x) >= 0) return '<Circular>';

      var xType = type(x);
      if (xType === 'Object') {
        var result;
        try { result = call(x.toString, x); } catch (err) {}
        if (result != null && result !== '[object Object]') return result;
      }

      return call(implPath([xType, 'prototype', 'toString']) || x.toString, x);
    };
  }());

  //# equals :: (a, b) -> Boolean
  //.
  //. Returns `true` if its arguments are of the same type and equal according
  //. to the type's [`fantasy-land/equals`][] method; `false` otherwise.
  //.
  //. `fantasy-land/equals` implementations are provided for the following
  //. built-in types: Null, Undefined, Boolean, Number, Date, RegExp, String,
  //. Array, Arguments, Error, Object, and Function.
  //.
  //. The algorithm supports circular data structures. Two arrays are equal
  //. if they have the same index paths and for each path have equal values.
  //. Two arrays which represent `[1, [1, [1, [1, [1, ...]]]]]`, for example,
  //. are equal even if their internal structures differ. Two objects are equal
  //. if they have the same property paths and for each path have equal values.
  //.
  //. ```javascript
  //. > equals(0, -0)
  //. true
  //.
  //. > equals(NaN, NaN)
  //. true
  //.
  //. > equals(Cons('foo', Cons('bar', Nil)), Cons('foo', Cons('bar', Nil)))
  //. true
  //.
  //. > equals(Cons('foo', Cons('bar', Nil)), Cons('bar', Cons('foo', Nil)))
  //. false
  //. ```
  var equals = (function() {
    //  $pairs :: Array (Pair Any Any)
    var $pairs = [];

    return function equals(x, y) {
      if (!sameType(x, y)) return false;

      //  This algorithm for comparing circular data structures was
      //  suggested in <http://stackoverflow.com/a/40622794/312785>.
      if ($pairs.some(function(p) { return p[0] === x && p[1] === y; })) {
        return true;
      }

      $pairs.push([x, y]);
      try {
        return Setoid.test(x) && Setoid.test(y) && Setoid.methods.equals(x)(y);
      } finally {
        $pairs.pop();
      }
    };
  }());

  //# lt :: (a, b) -> Boolean
  //.
  //. Returns `true` if its arguments are of the same type and the first is
  //. less than the second according to the type's [`fantasy-land/lte`][]
  //. method; `false` otherwise.
  //.
  //. This function is derived from [`lte`](#lte).
  //.
  //. See also [`gt`](#gt) and [`gte`](#gte).
  //.
  //. ```javascript
  //. > lt(0, 0)
  //. false
  //.
  //. > lt(0, 1)
  //. true
  //.
  //. > lt(1, 0)
  //. false
  //. ```
  function lt(x, y) {
    return sameType(x, y) && !lte(y, x);
  }

  //# lte :: (a, b) -> Boolean
  //.
  //. Returns `true` if its arguments are of the same type and the first
  //. is less than or equal to the second according to the type's
  //. [`fantasy-land/lte`][] method; `false` otherwise.
  //.
  //. `fantasy-land/lte` implementations are provided for the following
  //. built-in types: Null, Undefined, Boolean, Number, Date, String, Array,
  //. Arguments, and Object.
  //.
  //. The algorithm supports circular data structures in the same manner as
  //. [`equals`](#equals).
  //.
  //. See also [`lt`](#lt), [`gt`](#gt), and [`gte`](#gte).
  //.
  //. ```javascript
  //. > lte(0, 0)
  //. true
  //.
  //. > lte(0, 1)
  //. true
  //.
  //. > lte(1, 0)
  //. false
  //. ```
  var lte = (function() {
    //  $pairs :: Array (Pair Any Any)
    var $pairs = [];

    return function lte(x, y) {
      if (!sameType(x, y)) return false;

      //  This algorithm for comparing circular data structures was
      //  suggested in <http://stackoverflow.com/a/40622794/312785>.
      if ($pairs.some(function(p) { return p[0] === x && p[1] === y; })) {
        return equals(x, y);
      }

      $pairs.push([x, y]);
      try {
        return Ord.test(x) && Ord.test(y) && Ord.methods.lte(x)(y);
      } finally {
        $pairs.pop();
      }
    };
  }());

  //# gt :: (a, b) -> Boolean
  //.
  //. Returns `true` if its arguments are of the same type and the first is
  //. greater than the second according to the type's [`fantasy-land/lte`][]
  //. method; `false` otherwise.
  //.
  //. This function is derived from [`lte`](#lte).
  //.
  //. See also [`lt`](#lt) and [`gte`](#gte).
  //.
  //. ```javascript
  //. > gt(0, 0)
  //. false
  //.
  //. > gt(0, 1)
  //. false
  //.
  //. > gt(1, 0)
  //. true
  //. ```
  function gt(x, y) {
    return lt(y, x);
  }

  //# gte :: (a, b) -> Boolean
  //.
  //. Returns `true` if its arguments are of the same type and the first
  //. is greater than or equal to the second according to the type's
  //. [`fantasy-land/lte`][] method; `false` otherwise.
  //.
  //. This function is derived from [`lte`](#lte).
  //.
  //. See also [`lt`](#lt) and [`gt`](#gt).
  //.
  //. ```javascript
  //. > gte(0, 0)
  //. true
  //.
  //. > gte(0, 1)
  //. false
  //.
  //. > gte(1, 0)
  //. true
  //. ```
  function gte(x, y) {
    return lte(y, x);
  }

  //# min :: Ord a => (a, a) -> a
  //.
  //. Returns the smaller of its two arguments.
  //.
  //. This function is derived from [`lte`](#lte).
  //.
  //. See also [`max`](#max).
  //.
  //. ```javascript
  //. > min(10, 2)
  //. 2
  //.
  //. > min(new Date('1999-12-31'), new Date('2000-01-01'))
  //. new Date('1999-12-31')
  //.
  //. > min('10', '2')
  //. '10'
  //. ```
  function min(x, y) {
    return lte(x, y) ? x : y;
  }

  //# max :: Ord a => (a, a) -> a
  //.
  //. Returns the larger of its two arguments.
  //.
  //. This function is derived from [`lte`](#lte).
  //.
  //. See also [`min`](#min).
  //.
  //. ```javascript
  //. > max(10, 2)
  //. 10
  //.
  //. > max(new Date('1999-12-31'), new Date('2000-01-01'))
  //. new Date('2000-01-01')
  //.
  //. > max('10', '2')
  //. '2'
  //. ```
  function max(x, y) {
    return lte(x, y) ? y : x;
  }

  //# compose :: Semigroupoid c => (c j k, c i j) -> c i k
  //.
  //. Function wrapper for [`fantasy-land/compose`][].
  //.
  //. `fantasy-land/compose` implementations are provided for the following
  //. built-in types: Function.
  //.
  //. ```javascript
  //. > compose(Math.sqrt, x => x + 1)(99)
  //. 10
  //. ```
  function compose(x, y) {
    return Semigroupoid.methods.compose(y)(x);
  }

  //# id :: Category c => TypeRep c -> c
  //.
  //. Function wrapper for [`fantasy-land/id`][].
  //.
  //. `fantasy-land/id` implementations are provided for the following
  //. built-in types: Function.
  //.
  //. ```javascript
  //. > id(Function)('foo')
  //. 'foo'
  //. ```
  function id(typeRep) {
    return Category.methods.id(typeRep)();
  }

  //# concat :: Semigroup a => (a, a) -> a
  //.
  //. Function wrapper for [`fantasy-land/concat`][].
  //.
  //. `fantasy-land/concat` implementations are provided for the following
  //. built-in types: String, Array, and Object.
  //.
  //. ```javascript
  //. > concat('abc', 'def')
  //. 'abcdef'
  //.
  //. > concat([1, 2, 3], [4, 5, 6])
  //. [1, 2, 3, 4, 5, 6]
  //.
  //. > concat({x: 1, y: 2}, {y: 3, z: 4})
  //. {x: 1, y: 3, z: 4}
  //.
  //. > concat(Cons('foo', Cons('bar', Cons('baz', Nil))), Cons('quux', Nil))
  //. Cons('foo', Cons('bar', Cons('baz', Cons('quux', Nil))))
  //. ```
  function concat(x, y) {
    return Semigroup.methods.concat(x)(y);
  }

  //# empty :: Monoid m => TypeRep m -> m
  //.
  //. Function wrapper for [`fantasy-land/empty`][].
  //.
  //. `fantasy-land/empty` implementations are provided for the following
  //. built-in types: String, Array, and Object.
  //.
  //. ```javascript
  //. > empty(String)
  //. ''
  //.
  //. > empty(Array)
  //. []
  //.
  //. > empty(Object)
  //. {}
  //.
  //. > empty(List)
  //. Nil
  //. ```
  function empty(typeRep) {
    return Monoid.methods.empty(typeRep)();
  }

  //# map :: Functor f => (a -> b, f a) -> f b
  //.
  //. Function wrapper for [`fantasy-land/map`][].
  //.
  //. `fantasy-land/map` implementations are provided for the following
  //. built-in types: Array, Object, and Function.
  //.
  //. ```javascript
  //. > map(Math.sqrt, [1, 4, 9])
  //. [1, 2, 3]
  //.
  //. > map(Math.sqrt, {x: 1, y: 4, z: 9})
  //. {x: 1, y: 2, z: 3}
  //.
  //. > map(Math.sqrt, s => s.length)('Sanctuary')
  //. 3
  //.
  //. > map(Math.sqrt, Tuple('foo', 64))
  //. Tuple('foo', 8)
  //.
  //. > map(Math.sqrt, Nil)
  //. Nil
  //.
  //. > map(Math.sqrt, Cons(1, Cons(4, Cons(9, Nil))))
  //. Cons(1, Cons(2, Cons(3, Nil)))
  //. ```
  function map(f, functor) {
    return Functor.methods.map(functor)(f);
  }

  //# bimap :: Bifunctor f => (a -> b, c -> d, f a c) -> f b d
  //.
  //. Function wrapper for [`fantasy-land/bimap`][].
  //.
  //. ```javascript
  //. > bimap(s => s.toUpperCase(), Math.sqrt, Tuple('foo', 64))
  //. Tuple('FOO', 8)
  //. ```
  function bimap(f, g, bifunctor) {
    return Bifunctor.methods.bimap(bifunctor)(f, g);
  }

  //# promap :: Profunctor p => (a -> b, c -> d, p b c) -> p a d
  //.
  //. Function wrapper for [`fantasy-land/promap`][].
  //.
  //. `fantasy-land/promap` implementations are provided for the following
  //. built-in types: Function.
  //.
  //. ```javascript
  //. > promap(Math.abs, x => x + 1, Math.sqrt)(-100)
  //. 11
  //. ```
  function promap(f, g, profunctor) {
    return Profunctor.methods.promap(profunctor)(f, g);
  }

  //# ap :: Apply f => (f (a -> b), f a) -> f b
  //.
  //. Function wrapper for [`fantasy-land/ap`][].
  //.
  //. `fantasy-land/ap` implementations are provided for the following
  //. built-in types: Array, Object, and Function.
  //.
  //. ```javascript
  //. > ap([Math.sqrt, x => x * x], [1, 4, 9, 16, 25])
  //. [1, 2, 3, 4, 5, 1, 16, 81, 256, 625]
  //.
  //. > ap({a: Math.sqrt, b: x => x * x}, {a: 16, b: 10, c: 1})
  //. {a: 4, b: 100}
  //.
  //. > ap(s => n => s.slice(0, n), s => Math.ceil(s.length / 2))('Haskell')
  //. 'Hask'
  //.
  //. > ap(Identity(Math.sqrt), Identity(64))
  //. Identity(8)
  //.
  //. > ap(Cons(Math.sqrt, Cons(x => x * x, Nil)), Cons(16, Cons(100, Nil)))
  //. Cons(4, Cons(10, Cons(256, Cons(10000, Nil))))
  //. ```
  function ap(applyF, applyX) {
    return Apply.methods.ap(applyX)(applyF);
  }

  //# lift2 :: Apply f => (a -> b -> c, f a, f b) -> f c
  //.
  //. Lifts `a -> b -> c` to `Apply f => f a -> f b -> f c` and returns the
  //. result of applying this to the given arguments.
  //.
  //. This function is derived from [`map`](#map) and [`ap`](#ap).
  //.
  //. See also [`lift3`](#lift3).
  //.
  //. ```javascript
  //. > lift2(x => y => Math.pow(x, y), [10], [1, 2, 3])
  //. [10, 100, 1000]
  //.
  //. > lift2(x => y => Math.pow(x, y), Identity(10), Identity(3))
  //. Identity(1000)
  //. ```
  function lift2(f, x, y) {
    return ap(map(f, x), y);
  }

  //# lift3 :: Apply f => (a -> b -> c -> d, f a, f b, f c) -> f d
  //.
  //. Lifts `a -> b -> c -> d` to `Apply f => f a -> f b -> f c -> f d` and
  //. returns the result of applying this to the given arguments.
  //.
  //. This function is derived from [`map`](#map) and [`ap`](#ap).
  //.
  //. See also [`lift2`](#lift2).
  //.
  //. ```javascript
  //. > lift3(x => y => z => x + z + y, ['<'], ['>'], ['foo', 'bar', 'baz'])
  //. ['<foo>', '<bar>', '<baz>']
  //.
  //. > lift3(x => y => z => x + z + y, Identity('<'), Identity('>'), Identity('baz'))
  //. Identity('<baz>')
  //. ```
  function lift3(f, x, y, z) {
    return ap(ap(map(f, x), y), z);
  }

  //# apFirst :: Apply f => (f a, f b) -> f a
  //.
  //. Combines two effectful actions, keeping only the result of the first.
  //. Equivalent to Haskell's `(<*)` function.
  //.
  //. This function is derived from [`lift2`](#lift2).
  //.
  //. See also [`apSecond`](#apSecond).
  //.
  //. ```javascript
  //. > apFirst([1, 2], [3, 4])
  //. [1, 1, 2, 2]
  //.
  //. > apFirst(Identity(1), Identity(2))
  //. Identity(1)
  //. ```
  function apFirst(x, y) {
    return lift2(constant, x, y);
  }

  //# apSecond :: Apply f => (f a, f b) -> f b
  //.
  //. Combines two effectful actions, keeping only the result of the second.
  //. Equivalent to Haskell's `(*>)` function.
  //.
  //. This function is derived from [`lift2`](#lift2).
  //.
  //. See also [`apFirst`](#apFirst).
  //.
  //. ```javascript
  //. > apSecond([1, 2], [3, 4])
  //. [3, 4, 3, 4]
  //.
  //. > apSecond(Identity(1), Identity(2))
  //. Identity(2)
  //. ```
  function apSecond(x, y) {
    return lift2(constant(identity), x, y);
  }

  //# of :: Applicative f => (TypeRep f, a) -> f a
  //.
  //. Function wrapper for [`fantasy-land/of`][].
  //.
  //. `fantasy-land/of` implementations are provided for the following
  //. built-in types: Array and Function.
  //.
  //. ```javascript
  //. > of(Array, 42)
  //. [42]
  //.
  //. > of(Function, 42)(null)
  //. 42
  //.
  //. > of(List, 42)
  //. Cons(42, Nil)
  //. ```
  function of(typeRep, x) {
    return Applicative.methods.of(typeRep)(x);
  }

  //# append :: (Applicative f, Semigroup (f a)) => (a, f a) -> f a
  //.
  //. Returns the result of appending the first argument to the second.
  //.
  //. This function is derived from [`concat`](#concat) and [`of`](#of).
  //.
  //. See also [`prepend`](#prepend).
  //.
  //. ```javascript
  //. > append(3, [1, 2])
  //. [1, 2, 3]
  //.
  //. > append(3, Cons(1, Cons(2, Nil)))
  //. Cons(1, Cons(2, Cons(3, Nil)))
  //. ```
  function append(x, xs) {
    return concat(xs, of(xs.constructor, x));
  }

  //# prepend :: (Applicative f, Semigroup (f a)) => (a, f a) -> f a
  //.
  //. Returns the result of prepending the first argument to the second.
  //.
  //. This function is derived from [`concat`](#concat) and [`of`](#of).
  //.
  //. See also [`append`](#append).
  //.
  //. ```javascript
  //. > prepend(1, [2, 3])
  //. [1, 2, 3]
  //.
  //. > prepend(1, Cons(2, Cons(3, Nil)))
  //. Cons(1, Cons(2, Cons(3, Nil)))
  //. ```
  function prepend(x, xs) {
    return concat(of(xs.constructor, x), xs);
  }

  //# chain :: Chain m => (a -> m b, m a) -> m b
  //.
  //. Function wrapper for [`fantasy-land/chain`][].
  //.
  //. `fantasy-land/chain` implementations are provided for the following
  //. built-in types: Array and Function.
  //.
  //. ```javascript
  //. > chain(x => [x, x], [1, 2, 3])
  //. [1, 1, 2, 2, 3, 3]
  //.
  //. > chain(x => x % 2 == 1 ? of(List, x) : Nil, Cons(1, Cons(2, Cons(3, Nil))))
  //. Cons(1, Cons(3, Nil))
  //.
  //. > chain(n => s => s.slice(0, n), s => Math.ceil(s.length / 2))('Haskell')
  //. 'Hask'
  //. ```
  function chain(f, chain_) {
    return Chain.methods.chain(chain_)(f);
  }

  //# join :: Chain m => m (m a) -> m a
  //.
  //. Removes one level of nesting from a nested monadic structure.
  //.
  //. This function is derived from [`chain`](#chain).
  //.
  //. ```javascript
  //. > join([[1], [2], [3]])
  //. [1, 2, 3]
  //.
  //. > join([[[1, 2, 3]]])
  //. [[1, 2, 3]]
  //.
  //. > join(Identity(Identity(1)))
  //. Identity(1)
  //. ```
  function join(chain_) {
    return chain(identity, chain_);
  }

  //# chainRec :: ChainRec m => (TypeRep m, (a -> c, b -> c, a) -> m c, a) -> m b
  //.
  //. Function wrapper for [`fantasy-land/chainRec`][].
  //.
  //. `fantasy-land/chainRec` implementations are provided for the following
  //. built-in types: Array.
  //.
  //. ```javascript
  //. > chainRec(
  //. .   Array,
  //. .   (next, done, s) => s.length == 2 ? [s + '!', s + '?'].map(done)
  //. .                                    : [s + 'o', s + 'n'].map(next),
  //. .   ''
  //. . )
  //. ['oo!', 'oo?', 'on!', 'on?', 'no!', 'no?', 'nn!', 'nn?']
  //. ```
  function chainRec(typeRep, f, x) {
    return ChainRec.methods.chainRec(typeRep)(f, x);
  }

  //# filter :: (Applicative f, Foldable f, Monoid (f a)) => (a -> Boolean, f a) -> f a
  //.
  //. Filters its second argument in accordance with the given predicate.
  //.
  //. This function is derived from [`concat`](#concat), [`empty`](#empty),
  //. [`of`](#of), and [`reduce`](#reduce).
  //.
  //. See also [`filterM`](#filterM).
  //.
  //. ```javascript
  //. > filter(x => x % 2 == 1, [1, 2, 3])
  //. [1, 3]
  //.
  //. > filter(x => x % 2 == 1, Cons(1, Cons(2, Cons(3, Nil))))
  //. Cons(1, Cons(3, Nil))
  //. ```
  function filter(pred, m) {
    //  Fast path for arrays.
    if (Array.isArray(m)) return m.filter(function(x) { return pred(x); });
    var M = m.constructor;
    return reduce(function(m, x) { return pred(x) ? concat(m, of(M, x)) : m; },
                  empty(M),
                  m);
  }

  //# filterM :: (Alternative m, Monad m) => (a -> Boolean, m a) -> m a
  //.
  //. Filters its second argument in accordance with the given predicate.
  //.
  //. This function is derived from [`of`](#of), [`chain`](#chain), and
  //. [`zero`](#zero).
  //.
  //. See also [`filter`](#filter).
  //.
  //. ```javascript
  //. > filterM(x => x % 2 == 1, [1, 2, 3])
  //. [1, 3]
  //.
  //. > filterM(x => x % 2 == 1, Cons(1, Cons(2, Cons(3, Nil))))
  //. Cons(1, Cons(3, Nil))
  //.
  //. > filterM(x => x % 2 == 1, Nothing)
  //. Nothing
  //.
  //. > filterM(x => x % 2 == 1, Just(0))
  //. Nothing
  //.
  //. > filterM(x => x % 2 == 1, Just(1))
  //. Just(1)
  //. ```
  function filterM(pred, m) {
    var M = m.constructor;
    var z = zero(M);
    return chain(function(x) { return pred(x) ? of(M, x) : z; }, m);
  }

  //# alt :: Alt f => (f a, f a) -> f a
  //.
  //. Function wrapper for [`fantasy-land/alt`][].
  //.
  //. `fantasy-land/alt` implementations are provided for the following
  //. built-in types: Array and Object.
  //.
  //. ```javascript
  //. > alt([1, 2, 3], [4, 5, 6])
  //. [1, 2, 3, 4, 5, 6]
  //.
  //. > alt(Nothing, Nothing)
  //. Nothing
  //.
  //. > alt(Nothing, Just(1))
  //. Just(1)
  //.
  //. > alt(Just(2), Just(3))
  //. Just(2)
  //. ```
  function alt(x, y) {
    return Alt.methods.alt(x)(y);
  }

  //# zero :: Plus f => TypeRep f -> f a
  //.
  //. Function wrapper for [`fantasy-land/zero`][].
  //.
  //. `fantasy-land/zero` implementations are provided for the following
  //. built-in types: Array and Object.
  //.
  //. ```javascript
  //. > zero(Array)
  //. []
  //.
  //. > zero(Object)
  //. {}
  //.
  //. > zero(Maybe)
  //. Nothing
  //. ```
  function zero(typeRep) {
    return Plus.methods.zero(typeRep)();
  }

  //# reduce :: Foldable f => ((b, a) -> b, b, f a) -> b
  //.
  //. Function wrapper for [`fantasy-land/reduce`][].
  //.
  //. `fantasy-land/reduce` implementations are provided for the following
  //. built-in types: Array and Object.
  //.
  //. ```javascript
  //. > reduce((xs, x) => [x].concat(xs), [], [1, 2, 3])
  //. [3, 2, 1]
  //.
  //. > reduce(concat, '', Cons('foo', Cons('bar', Cons('baz', Nil))))
  //. 'foobarbaz'
  //. ```
  function reduce(f, x, foldable) {
    return Foldable.methods.reduce(foldable)(f, x);
  }

  //# size :: Foldable f => f a -> Integer
  //.
  //. Returns the number of elements of the given structure.
  //.
  //. This function is derived from [`reduce`](#reduce).
  //.
  //. ```javascript
  //. > size([])
  //. 0
  //.
  //. > size(['foo', 'bar', 'baz'])
  //. 3
  //.
  //. > size(Nil)
  //. 0
  //.
  //. > size(Cons('foo', Cons('bar', Cons('baz', Nil))))
  //. 3
  //. ```
  function size(foldable) {
    //  Fast path for arrays.
    if (Array.isArray(foldable)) return foldable.length;
    return reduce(function(n, _) { return n + 1; }, 0, foldable);
  }

  //# elem :: (Setoid a, Foldable f) => (a, f a) -> Boolean
  //.
  //. Takes a value and a structure and returns `true` if the
  //. value is an element of the structure; `false` otherwise.
  //.
  //. This function is derived from [`equals`](#equals) and
  //. [`reduce`](#reduce).
  //.
  //. ```javascript
  //. > elem('c', ['a', 'b', 'c'])
  //. true
  //.
  //. > elem('x', ['a', 'b', 'c'])
  //. false
  //.
  //. > elem(3, {x: 1, y: 2, z: 3})
  //. true
  //.
  //. > elem(8, {x: 1, y: 2, z: 3})
  //. false
  //.
  //. > elem(0, Just(0))
  //. true
  //.
  //. > elem(0, Just(1))
  //. false
  //.
  //. > elem(0, Nothing)
  //. false
  //. ```
  function elem(x, foldable) {
    return reduce(function(b, y) { return b || equals(x, y); },
                  false,
                  foldable);
  }

  //# reverse :: (Applicative f, Foldable f, Monoid (f a)) => f a -> f a
  //.
  //. Reverses the elements of the given structure.
  //.
  //. This function is derived from [`concat`](#concat), [`empty`](#empty),
  //. [`of`](#of), and [`reduce`](#reduce).
  //.
  //. ```javascript
  //. > reverse([1, 2, 3])
  //. [3, 2, 1]
  //.
  //. > reverse(Cons(1, Cons(2, Cons(3, Nil))))
  //. Cons(3, Cons(2, Cons(1, Nil)))
  //. ```
  function reverse(foldable) {
    //  Fast path for arrays.
    if (Array.isArray(foldable)) return foldable.slice().reverse();
    var F = foldable.constructor;
    return reduce(function(xs, x) { return concat(of(F, x), xs); },
                  empty(F),
                  foldable);
  }

  //# sort :: (Ord a, Applicative f, Foldable f, Monoid (f a)) => f a -> f a
  //.
  //. Performs a [stable sort][] of the elements of the given structure,
  //. using [`lte`](#lte) for comparisons.
  //.
  //. This function is derived from [`lte`](#lte), [`concat`](#concat),
  //. [`empty`](#empty), [`of`](#of), and [`reduce`](#reduce).
  //.
  //. See also [`sortBy`](#sortBy).
  //.
  //. ```javascript
  //. > sort(['foo', 'bar', 'baz'])
  //. ['bar', 'baz', 'foo']
  //.
  //. > sort([Just(2), Nothing, Just(1)])
  //. [Nothing, Just(1), Just(2)]
  //.
  //. > sort(Cons('foo', Cons('bar', Cons('baz', Nil))))
  //. Cons('bar', Cons('baz', Cons('foo', Nil)))
  //. ```
  function sort(foldable) {
    return sortBy(identity, foldable);
  }

  //# sortBy :: (Ord b, Applicative f, Foldable f, Monoid (f a)) => (a -> b, f a) -> f a
  //.
  //. Performs a [stable sort][] of the elements of the given structure,
  //. using [`lte`](#lte) to compare the values produced by applying the
  //. given function to each element of the structure.
  //.
  //. This function is derived from [`lte`](#lte), [`concat`](#concat),
  //. [`empty`](#empty), [`of`](#of), and [`reduce`](#reduce).
  //.
  //. See also [`sort`](#sort).
  //.
  //. ```javascript
  //. > sortBy(s => s.length, ['red', 'green', 'blue'])
  //. ['red', 'blue', 'green']
  //.
  //. > sortBy(s => s.length, ['black', 'white'])
  //. ['black', 'white']
  //.
  //. > sortBy(s => s.length, ['white', 'black'])
  //. ['white', 'black']
  //.
  //. > sortBy(s => s.length, Cons('red', Cons('green', Cons('blue', Nil))))
  //. Cons('red', Cons('blue', Cons('green', Nil)))
  //. ```
  function sortBy(f, foldable) {
    var rs = reduce(function(xs, x) {
      var fx = f(x);
      var lower = 0;
      var upper = xs.length;
      while (lower < upper) {
        var idx = Math.floor((lower + upper) / 2);
        if (lte(xs[idx].fx, fx)) lower = idx + 1; else upper = idx;
      }
      xs.splice(lower, 0, {x: x, fx: fx});
      return xs;
    }, [], foldable);

    var F = foldable.constructor;
    var result = empty(F);
    for (var idx = 0; idx < rs.length; idx += 1) {
      result = concat(result, of(F, rs[idx].x));
    }
    return result;
  }

  //# takeWhile :: (Applicative f, Foldable f, Monoid (f a)) => (a -> Boolean, f a) -> f a
  //.
  //. Discards the first inner value which does not satisfy the predicate, and
  //. all subsequent inner values.
  //.
  //. This function is derived from [`concat`](#concat), [`empty`](#empty),
  //. [`of`](#of), and [`reduce`](#reduce).
  //.
  //. See also [`dropWhile`](#dropWhile).
  //.
  //. ```javascript
  //. > takeWhile(s => /x/.test(s), ['xy', 'xz', 'yx', 'yz', 'zx', 'zy'])
  //. ['xy', 'xz', 'yx']
  //.
  //. > takeWhile(s => /y/.test(s), ['xy', 'xz', 'yx', 'yz', 'zx', 'zy'])
  //. ['xy']
  //.
  //. > takeWhile(s => /z/.test(s), ['xy', 'xz', 'yx', 'yz', 'zx', 'zy'])
  //. []
  //. ```
  function takeWhile(pred, foldable) {
    var take = true;
    return filter(function(x) { return take = take && pred(x); }, foldable);
  }

  //# dropWhile :: (Applicative f, Foldable f, Monoid (f a)) => (a -> Boolean, f a) -> f a
  //.
  //. Retains the first inner value which does not satisfy the predicate, and
  //. all subsequent inner values.
  //.
  //. This function is derived from [`concat`](#concat), [`empty`](#empty),
  //. [`of`](#of), and [`reduce`](#reduce).
  //.
  //. See also [`takeWhile`](#takeWhile).
  //.
  //. ```javascript
  //. > dropWhile(s => /x/.test(s), ['xy', 'xz', 'yx', 'yz', 'zx', 'zy'])
  //. ['yz', 'zx', 'zy']
  //.
  //. > dropWhile(s => /y/.test(s), ['xy', 'xz', 'yx', 'yz', 'zx', 'zy'])
  //. ['xz', 'yx', 'yz', 'zx', 'zy']
  //.
  //. > dropWhile(s => /z/.test(s), ['xy', 'xz', 'yx', 'yz', 'zx', 'zy'])
  //. ['xy', 'xz', 'yx', 'yz', 'zx', 'zy']
  //. ```
  function dropWhile(pred, foldable) {
    var take = false;
    return filter(function(x) { return take = take || !pred(x); }, foldable);
  }

  //# traverse :: (Applicative f, Traversable t) => (TypeRep f, a -> f b, t a) -> f (t b)
  //.
  //. Function wrapper for [`fantasy-land/traverse`][].
  //.
  //. `fantasy-land/traverse` implementations are provided for the following
  //. built-in types: Array and Object.
  //.
  //. See also [`sequence`](#sequence).
  //.
  //. ```javascript
  //. > traverse(Array, x => x, [[1, 2, 3], [4, 5]])
  //. [[1, 4], [1, 5], [2, 4], [2, 5], [3, 4], [3, 5]]
  //.
  //. > traverse(Identity, x => Identity(x + 1), [1, 2, 3])
  //. Identity([2, 3, 4])
  //. ```
  function traverse(typeRep, f, traversable) {
    return Traversable.methods.traverse(traversable)(typeRep, f);
  }

  //# sequence :: (Applicative f, Traversable t) => (TypeRep f, t (f a)) -> f (t a)
  //.
  //. Inverts the given `t (f a)` to produce an `f (t a)`.
  //.
  //. This function is derived from [`traverse`](#traverse).
  //.
  //. ```javascript
  //. > sequence(Array, Identity([1, 2, 3]))
  //. [Identity(1), Identity(2), Identity(3)]
  //.
  //. > sequence(Identity, [Identity(1), Identity(2), Identity(3)])
  //. Identity([1, 2, 3])
  //. ```
  function sequence(typeRep, traversable) {
    return traverse(typeRep, identity, traversable);
  }

  //# extend :: Extend w => (w a -> b, w a) -> w b
  //.
  //. Function wrapper for [`fantasy-land/extend`][].
  //.
  //. `fantasy-land/extend` implementations are provided for the following
  //. built-in types: Array.
  //.
  //. ```javascript
  //. > extend(ss => ss.join(''), ['x', 'y', 'z'])
  //. ['xyz', 'yz', 'z']
  //. ```
  function extend(f, extend_) {
    return Extend.methods.extend(extend_)(f);
  }

  //# extract :: Comonad w => w a -> a
  //.
  //. Function wrapper for [`fantasy-land/extract`][].
  //.
  //. ```javascript
  //. > extract(Identity(42))
  //. 42
  //. ```
  function extract(comonad) {
    return Comonad.methods.extract(comonad)();
  }

  //# contramap :: Contravariant f => (b -> a, f a) -> f b
  //.
  //. Function wrapper for [`fantasy-land/contramap`][].
  //.
  //. `fantasy-land/contramap` implementations are provided for the following
  //. built-in types: Function.
  //.
  //. ```javascript
  //. > contramap(s => s.length, Math.sqrt)('Sanctuary')
  //. 3
  //. ```
  function contramap(f, contravariant) {
    return Contravariant.methods.contramap(contravariant)(f);
  }

  return {
    TypeClass: TypeClass,
    Setoid: Setoid,
    Ord: Ord,
    Semigroupoid: Semigroupoid,
    Category: Category,
    Semigroup: Semigroup,
    Monoid: Monoid,
    Functor: Functor,
    Bifunctor: Bifunctor,
    Profunctor: Profunctor,
    Apply: Apply,
    Applicative: Applicative,
    Chain: Chain,
    ChainRec: ChainRec,
    Monad: Monad,
    Alt: Alt,
    Plus: Plus,
    Alternative: Alternative,
    Foldable: Foldable,
    Traversable: Traversable,
    Extend: Extend,
    Comonad: Comonad,
    Contravariant: Contravariant,
    toString: toString,
    equals: equals,
    lt: lt,
    lte: lte,
    gt: gt,
    gte: gte,
    min: min,
    max: max,
    compose: compose,
    id: id,
    concat: concat,
    empty: empty,
    map: map,
    bimap: bimap,
    promap: promap,
    ap: ap,
    lift2: lift2,
    lift3: lift3,
    apFirst: apFirst,
    apSecond: apSecond,
    of: of,
    append: append,
    prepend: prepend,
    chain: chain,
    join: join,
    chainRec: chainRec,
    filter: filter,
    filterM: filterM,
    alt: alt,
    zero: zero,
    reduce: reduce,
    size: size,
    elem: elem,
    reverse: reverse,
    sort: sort,
    sortBy: sortBy,
    takeWhile: takeWhile,
    dropWhile: dropWhile,
    traverse: traverse,
    sequence: sequence,
    extend: extend,
    extract: extract,
    contramap: contramap
  };

}));

//. [Alt]:                      https://github.com/fantasyland/fantasy-land#alt
//. [Alternative]:              https://github.com/fantasyland/fantasy-land#alternative
//. [Applicative]:              https://github.com/fantasyland/fantasy-land#applicative
//. [Apply]:                    https://github.com/fantasyland/fantasy-land#apply
//. [Bifunctor]:                https://github.com/fantasyland/fantasy-land#bifunctor
//. [Category]:                 https://github.com/fantasyland/fantasy-land#category
//. [Chain]:                    https://github.com/fantasyland/fantasy-land#chain
//. [ChainRec]:                 https://github.com/fantasyland/fantasy-land#chainrec
//. [Comonad]:                  https://github.com/fantasyland/fantasy-land#comonad
//. [Contravariant]:            https://github.com/fantasyland/fantasy-land#contravariant
//. [Extend]:                   https://github.com/fantasyland/fantasy-land#extend
//. [FL]:                       https://github.com/fantasyland/fantasy-land
//. [Foldable]:                 https://github.com/fantasyland/fantasy-land#foldable
//. [Functor]:                  https://github.com/fantasyland/fantasy-land#functor
//. [Monad]:                    https://github.com/fantasyland/fantasy-land#monad
//. [Monoid]:                   https://github.com/fantasyland/fantasy-land#monoid
//. [Ord]:                      https://github.com/fantasyland/fantasy-land#ord
//. [Plus]:                     https://github.com/fantasyland/fantasy-land#plus
//. [Profunctor]:               https://github.com/fantasyland/fantasy-land#profunctor
//. [Semigroup]:                https://github.com/fantasyland/fantasy-land#semigroup
//. [Semigroupoid]:             https://github.com/fantasyland/fantasy-land#semigroupoid
//. [Setoid]:                   https://github.com/fantasyland/fantasy-land#setoid
//. [Traversable]:              https://github.com/fantasyland/fantasy-land#traversable
//. [`fantasy-land/alt`]:       https://github.com/fantasyland/fantasy-land#alt-method
//. [`fantasy-land/ap`]:        https://github.com/fantasyland/fantasy-land#ap-method
//. [`fantasy-land/bimap`]:     https://github.com/fantasyland/fantasy-land#bimap-method
//. [`fantasy-land/chain`]:     https://github.com/fantasyland/fantasy-land#chain-method
//. [`fantasy-land/chainRec`]:  https://github.com/fantasyland/fantasy-land#chainrec-method
//. [`fantasy-land/compose`]:   https://github.com/fantasyland/fantasy-land#compose-method
//. [`fantasy-land/concat`]:    https://github.com/fantasyland/fantasy-land#concat-method
//. [`fantasy-land/contramap`]: https://github.com/fantasyland/fantasy-land#contramap-method
//. [`fantasy-land/empty`]:     https://github.com/fantasyland/fantasy-land#empty-method
//. [`fantasy-land/equals`]:    https://github.com/fantasyland/fantasy-land#equals-method
//. [`fantasy-land/extend`]:    https://github.com/fantasyland/fantasy-land#extend-method
//. [`fantasy-land/extract`]:   https://github.com/fantasyland/fantasy-land#extract-method
//. [`fantasy-land/id`]:        https://github.com/fantasyland/fantasy-land#id-method
//. [`fantasy-land/lte`]:       https://github.com/fantasyland/fantasy-land#lte-method
//. [`fantasy-land/map`]:       https://github.com/fantasyland/fantasy-land#map-method
//. [`fantasy-land/of`]:        https://github.com/fantasyland/fantasy-land#of-method
//. [`fantasy-land/promap`]:    https://github.com/fantasyland/fantasy-land#promap-method
//. [`fantasy-land/reduce`]:    https://github.com/fantasyland/fantasy-land#reduce-method
//. [`fantasy-land/traverse`]:  https://github.com/fantasyland/fantasy-land#traverse-method
//. [`fantasy-land/zero`]:      https://github.com/fantasyland/fantasy-land#zero-method
//. [stable sort]:              https://en.wikipedia.org/wiki/Sorting_algorithm#Stability
//. [type-classes]:             https://github.com/sanctuary-js/sanctuary-def#type-classes

});
return ___scope___.entry = "index.js";
});
FuseBox.target = "browser"
FuseBox.expose([{"alias":"Sodium","pkg":"sodiumjs/lib/Sodium.js"}]);
FuseBox.main("sodiumjs/lib/Sodium.js");
FuseBox.defaultPackageName = "sodiumjs";
})
(function(e){function r(e){var r=e.charCodeAt(0),n=e.charCodeAt(1);if((d||58!==n)&&(r>=97&&r<=122||64===r)){if(64===r){var t=e.split("/"),i=t.splice(2,t.length).join("/");return[t[0]+"/"+t[1],i||void 0]}var o=e.indexOf("/");if(o===-1)return[e];var a=e.substring(0,o),u=e.substring(o+1);return[a,u]}}function n(e){return e.substring(0,e.lastIndexOf("/"))||"./"}function t(){for(var e=[],r=0;r<arguments.length;r++)e[r]=arguments[r];for(var n=[],t=0,i=arguments.length;t<i;t++)n=n.concat(arguments[t].split("/"));for(var o=[],t=0,i=n.length;t<i;t++){var a=n[t];a&&"."!==a&&(".."===a?o.pop():o.push(a))}return""===n[0]&&o.unshift(""),o.join("/")||(o.length?"/":".")}function i(e){var r=e.match(/\.(\w{1,})$/);return r&&r[1]?e:e+".js"}function o(e){if(d){var r,n=document,t=n.getElementsByTagName("head")[0];/\.css$/.test(e)?(r=n.createElement("link"),r.rel="stylesheet",r.type="text/css",r.href=e):(r=n.createElement("script"),r.type="text/javascript",r.src=e,r.async=!0),t.insertBefore(r,t.firstChild)}}function a(e,r){for(var n in e)e.hasOwnProperty(n)&&r(n,e[n])}function u(e){return{server:require(e)}}function f(e,n){var o=n.path||"./",a=n.pkg||"default",f=r(e);if(f&&(o="./",a=f[0],n.v&&n.v[a]&&(a=a+"@"+n.v[a]),e=f[1]),e)if(126===e.charCodeAt(0))e=e.slice(2,e.length),o="./";else if(!d&&(47===e.charCodeAt(0)||58===e.charCodeAt(1)))return u(e);var s=m[a];if(!s){if(d&&"electron"!==h.target)throw"Package not found "+a;return u(a+(e?"/"+e:""))}e=e?e:"./"+s.s.entry;var l,c=t(o,e),v=i(c),p=s.f[v];return!p&&v.indexOf("*")>-1&&(l=v),p||l||(v=t(c,"/","index.js"),p=s.f[v],p||"."!==c||(v=s.s&&s.s.entry||"index.js",p=s.f[v]),p||(v=c+".js",p=s.f[v]),p||(p=s.f[c+".jsx"]),p||(v=c+"/index.jsx",p=s.f[v])),{file:p,wildcard:l,pkgName:a,versions:s.v,filePath:c,validPath:v}}function s(e,r,n){if(void 0===n&&(n={}),!d)return r(/\.(js|json)$/.test(e)?v.require(e):"");if(n&&n.ajaxed===e)return console.error(e,"does not provide a module");var i=new XMLHttpRequest;i.onreadystatechange=function(){if(4==i.readyState)if(200==i.status){var n=i.getResponseHeader("Content-Type"),o=i.responseText;/json/.test(n)?o="module.exports = "+o:/javascript/.test(n)||(o="module.exports = "+JSON.stringify(o));var a=t("./",e);h.dynamic(a,o),r(h.import(e,{ajaxed:e}))}else console.error(e,"not found on request"),r(void 0)},i.open("GET",e,!0),i.send()}function l(e,r){var n=g[e];if(n)for(var t in n){var i=n[t].apply(null,r);if(i===!1)return!1}}function c(e,r){if(void 0===r&&(r={}),58===e.charCodeAt(4)||58===e.charCodeAt(5))return o(e);var t=f(e,r);if(t.server)return t.server;var i=t.file;if(t.wildcard){var a=new RegExp(t.wildcard.replace(/\*/g,"@").replace(/[.?*+^$[\]\\(){}|-]/g,"\\$&").replace(/@@/g,".*").replace(/@/g,"[a-z0-9$_-]+"),"i"),u=m[t.pkgName];if(u){var p={};for(var g in u.f)a.test(g)&&(p[g]=c(t.pkgName+"/"+g));return p}}if(!i){var h="function"==typeof r,x=l("async",[e,r]);if(x===!1)return;return s(e,function(e){return h?r(e):null},r)}var _=t.pkgName;if(i.locals&&i.locals.module)return i.locals.module.exports;var w=i.locals={},y=n(t.validPath);w.exports={},w.module={exports:w.exports},w.require=function(e,r){return c(e,{pkg:_,path:y,v:t.versions})},d||!v.require.main?w.require.main={filename:"./",paths:[]}:w.require.main=v.require.main;var j=[w.module.exports,w.require,w.module,t.validPath,y,_];return l("before-import",j),i.fn.apply(0,j),l("after-import",j),w.module.exports}if(e.FuseBox)return e.FuseBox;var d="undefined"!=typeof window&&window.navigator,v=d?window:global;d&&(v.global=window),e=d&&"undefined"==typeof __fbx__dnm__?e:module.exports;var p=d?window.__fsbx__=window.__fsbx__||{}:v.$fsbx=v.$fsbx||{};d||(v.require=require);var m=p.p=p.p||{},g=p.e=p.e||{},h=function(){function r(){}return r.global=function(e,r){return void 0===r?v[e]:void(v[e]=r)},r.import=function(e,r){return c(e,r)},r.on=function(e,r){g[e]=g[e]||[],g[e].push(r)},r.exists=function(e){try{var r=f(e,{});return void 0!==r.file}catch(e){return!1}},r.remove=function(e){var r=f(e,{}),n=m[r.pkgName];n&&n.f[r.validPath]&&delete n.f[r.validPath]},r.main=function(e){return this.mainFile=e,r.import(e,{})},r.expose=function(r){var n=function(n){var t=r[n].alias,i=c(r[n].pkg);"*"===t?a(i,function(r,n){return e[r]=n}):"object"==typeof t?a(t,function(r,n){return e[n]=i[r]}):e[t]=i};for(var t in r)n(t)},r.dynamic=function(r,n,t){this.pkg(t&&t.pkg||"default",{},function(t){t.file(r,function(r,t,i,o,a){var u=new Function("__fbx__dnm__","exports","require","module","__filename","__dirname","__root__",n);u(!0,r,t,i,o,a,e)})})},r.flush=function(e){var r=m.default;for(var n in r.f)e&&!e(n)||delete r.f[n].locals},r.pkg=function(e,r,n){if(m[e])return n(m[e].s);var t=m[e]={};return t.f={},t.v=r,t.s={file:function(e,r){return t.f[e]={fn:r}}},n(t.s)},r.addPlugin=function(e){this.plugins.push(e)},r.packages=m,r.isBrowser=d,r.isServer=!d,r.plugins=[],r}();return d||(v.FuseBox=h),e.FuseBox=h}(this))
//# sourceMappingURL=sodium.js.map