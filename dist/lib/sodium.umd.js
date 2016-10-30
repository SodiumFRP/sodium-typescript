(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define("Sodium", [], factory);
	else if(typeof exports === 'object')
		exports["Sodium"] = factory();
	else
		root["Sodium"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var Lambda_1 = __webpack_require__(1);
	exports.lambda1 = Lambda_1.lambda1;
	exports.lambda2 = Lambda_1.lambda2;
	exports.lambda3 = Lambda_1.lambda3;
	exports.lambda4 = Lambda_1.lambda4;
	exports.lambda5 = Lambda_1.lambda5;
	exports.lambda6 = Lambda_1.lambda6;
	var Stream_1 = __webpack_require__(3);
	exports.Stream = Stream_1.Stream;
	exports.StreamLoop = Stream_1.StreamLoop;
	var StreamSink_1 = __webpack_require__(26);
	exports.StreamSink = StreamSink_1.StreamSink;
	var Cell_1 = __webpack_require__(20);
	exports.Cell = Cell_1.Cell;
	var CellLoop_1 = __webpack_require__(27);
	exports.CellLoop = CellLoop_1.CellLoop;
	var CellSink_1 = __webpack_require__(28);
	exports.CellSink = CellSink_1.CellSink;
	var Transaction_1 = __webpack_require__(4);
	exports.Transaction = Transaction_1.Transaction;
	var Tuple2_1 = __webpack_require__(29);
	exports.Tuple2 = Tuple2_1.Tuple2;
	var Unit_1 = __webpack_require__(23);
	exports.Unit = Unit_1.Unit;
	var Operational_1 = __webpack_require__(22);
	exports.Operational = Operational_1.Operational;
	var Vertex_1 = __webpack_require__(2);
	exports.getTotalRegistrations = Vertex_1.getTotalRegistrations;
	exports.Vertex = Vertex_1.Vertex;
	var TimerSystem_1 = __webpack_require__(30);
	exports.TimerSystemImpl = TimerSystem_1.TimerSystemImpl;
	exports.TimerSystem = TimerSystem_1.TimerSystem;
	var SecondsTimerSystem_1 = __webpack_require__(31);
	exports.SecondsTimerSystem = SecondsTimerSystem_1.SecondsTimerSystem;
	var MillisecondsTimerSystem_1 = __webpack_require__(32);
	exports.MillisecondsTimerSystem = MillisecondsTimerSystem_1.MillisecondsTimerSystem;
	var IOAction_1 = __webpack_require__(33);
	exports.IOAction = IOAction_1.IOAction;


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var Vertex_1 = __webpack_require__(2);
	var Lambda1 = (function () {
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
	var Lambda2 = (function () {
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
	var Lambda3 = (function () {
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
	var Lambda4 = (function () {
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
	var Lambda5 = (function () {
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
	var Lambda6 = (function () {
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


/***/ },
/* 2 */
/***/ function(module, exports) {

	"use strict";
	var totalRegistrations = 0;
	function getTotalRegistrations() {
	    return totalRegistrations;
	}
	exports.getTotalRegistrations = getTotalRegistrations;
	var Source = (function () {
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
	(function (Color) {
	    Color[Color["black"] = 0] = "black";
	    Color[Color["gray"] = 1] = "gray";
	    Color[Color["white"] = 2] = "white";
	    Color[Color["purple"] = 3] = "purple";
	})(exports.Color || (exports.Color = {}));
	var Color = exports.Color;
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
	var Vertex = (function () {
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


/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var Lambda_1 = __webpack_require__(1);
	var Vertex_1 = __webpack_require__(2);
	var Transaction_1 = __webpack_require__(4);
	var CoalesceHandler_1 = __webpack_require__(19);
	var Cell_1 = __webpack_require__(20);
	//import { StreamLoop } from "./StreamLoop";
	var Listener_1 = __webpack_require__(24);
	var Lazy_1 = __webpack_require__(21);
	var LazyCell_1 = __webpack_require__(25);
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


/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var typescript_collections_1 = __webpack_require__(5);
	var Entry = (function () {
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
	var Transaction = (function () {
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
	    Transaction.transactionally = function (f) {
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


/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	// Copyright 2013 Basarat Ali Syed. All Rights Reserved.
	//
	// Licensed under MIT open source license http://opensource.org/licenses/MIT
	//
	// Orginal javascript code was by Mauricio Santos
	//
	var _arrays = __webpack_require__(6);
	exports.arrays = _arrays;
	var Bag_1 = __webpack_require__(8);
	exports.Bag = Bag_1.default;
	var BSTree_1 = __webpack_require__(11);
	exports.BSTree = BSTree_1.default;
	var Dictionary_1 = __webpack_require__(9);
	exports.Dictionary = Dictionary_1.default;
	var Heap_1 = __webpack_require__(14);
	exports.Heap = Heap_1.default;
	var LinkedDictionary_1 = __webpack_require__(15);
	exports.LinkedDictionary = LinkedDictionary_1.default;
	var LinkedList_1 = __webpack_require__(13);
	exports.LinkedList = LinkedList_1.default;
	var MultiDictionary_1 = __webpack_require__(16);
	exports.MultiDictionary = MultiDictionary_1.default;
	var Queue_1 = __webpack_require__(12);
	exports.Queue = Queue_1.default;
	var PriorityQueue_1 = __webpack_require__(17);
	exports.PriorityQueue = PriorityQueue_1.default;
	var Set_1 = __webpack_require__(10);
	exports.Set = Set_1.default;
	var Stack_1 = __webpack_require__(18);
	exports.Stack = Stack_1.default;
	var _util = __webpack_require__(7);
	exports.util = _util;
	//# sourceMappingURL=index.js.map

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var util = __webpack_require__(7);
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

/***/ },
/* 7 */
/***/ function(module, exports) {

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

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var util = __webpack_require__(7);
	var Dictionary_1 = __webpack_require__(9);
	var Set_1 = __webpack_require__(10);
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

/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var util = __webpack_require__(7);
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

/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var util = __webpack_require__(7);
	var arrays = __webpack_require__(6);
	var Dictionary_1 = __webpack_require__(9);
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

/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var util = __webpack_require__(7);
	var Queue_1 = __webpack_require__(12);
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

/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var LinkedList_1 = __webpack_require__(13);
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

/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var util = __webpack_require__(7);
	var arrays = __webpack_require__(6);
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

/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var collections = __webpack_require__(7);
	var arrays = __webpack_require__(6);
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

/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var Dictionary_1 = __webpack_require__(9);
	var util = __webpack_require__(7);
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

/***/ },
/* 16 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var util = __webpack_require__(7);
	var Dictionary_1 = __webpack_require__(9);
	var arrays = __webpack_require__(6);
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

/***/ },
/* 17 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var util = __webpack_require__(7);
	var Heap_1 = __webpack_require__(14);
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

/***/ },
/* 18 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var LinkedList_1 = __webpack_require__(13);
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

/***/ },
/* 19 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var Lambda_1 = __webpack_require__(1);
	var Transaction_1 = __webpack_require__(4);
	var CoalesceHandler = (function () {
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


/***/ },
/* 20 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var Lambda_1 = __webpack_require__(1);
	var Vertex_1 = __webpack_require__(2);
	var Transaction_1 = __webpack_require__(4);
	var Lazy_1 = __webpack_require__(21);
	var Stream_1 = __webpack_require__(3);
	var Operational_1 = __webpack_require__(22);
	var LazySample = (function () {
	    function LazySample(cell) {
	        this.hasValue = false;
	        this.value = null;
	        this.cell = cell;
	    }
	    return LazySample;
	}());
	var ApplyState = (function () {
	    function ApplyState() {
	        this.f = null;
	        this.f_present = false;
	        this.a = null;
	        this.a_present = false;
	    }
	    return ApplyState;
	}());
	var Cell = (function () {
	    function Cell(initValue, str) {
	        var _this = this;
	        this.value = initValue;
	        if (!str) {
	            this.str = new Stream_1.Stream();
	            this.vertex = new Vertex_1.Vertex("ConstCell", 0, []);
	        }
	        else
	            Transaction_1.Transaction.transactionally(function () { return _this.setStream(str); });
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
	     * It may be used inside the functions passed to primitives that apply them to {@link Stream}s,
	     * including {@link Stream#map(Lambda1)} in which case it is equivalent to snapshotting the cell,
	     * {@link Stream#snapshot(Cell, Lambda2)}, {@link Stream#filter(Lambda1)} and
	     * {@link Stream#merge(Stream, Lambda2)}.
	     * It should generally be avoided in favour of {@link listen(Handler)} so you don't
	     * miss any updates, but in many circumstances it makes sense.
	     */
	    Cell.prototype.sample = function () {
	        var _this = this;
	        return Transaction_1.Transaction.transactionally(function () { return _this.sampleNoTrans__(); });
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
	        return Transaction_1.Transaction.transactionally(function () { return me.sampleLazyNoTrans__(); });
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
	        return Transaction_1.Transaction.transactionally(function () {
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
	        return Transaction_1.Transaction.transactionally(function () {
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
	        return Transaction_1.Transaction.transactionally(function () {
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
	        return Transaction_1.Transaction.transactionally(function () {
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
	        return Transaction_1.Transaction.transactionally(function () {
	            return Operational_1.Operational.value(_this).listen(h);
	        });
	    };
	    return Cell;
	}());
	exports.Cell = Cell;


/***/ },
/* 21 */
/***/ function(module, exports) {

	"use strict";
	/**
	 * A representation for a value that may not be available until the current
	 * transaction is closed.
	 */
	var Lazy = (function () {
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


/***/ },
/* 22 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var Stream_1 = __webpack_require__(3);
	var Transaction_1 = __webpack_require__(4);
	var Unit_1 = __webpack_require__(23);
	var Vertex_1 = __webpack_require__(2);
	var Operational = (function () {
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
	        return Transaction_1.Transaction.transactionally(function () {
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
	                    var _loop_1 = function(i) {
	                        Transaction_1.Transaction.currentTransaction.post(i, function () {
	                            Transaction_1.Transaction.transactionally(function () {
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


/***/ },
/* 23 */
/***/ function(module, exports) {

	"use strict";
	var Unit = (function () {
	    function Unit() {
	    }
	    Unit.UNIT = new Unit();
	    return Unit;
	}());
	exports.Unit = Unit;


/***/ },
/* 24 */
/***/ function(module, exports) {

	"use strict";
	var Listener = (function () {
	    function Listener(h, target) {
	        this.h = h;
	        this.target = target;
	    }
	    return Listener;
	}());
	exports.Listener = Listener;


/***/ },
/* 25 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var Cell_1 = __webpack_require__(20);
	var Transaction_1 = __webpack_require__(4);
	var LazyCell = (function (_super) {
	    __extends(LazyCell, _super);
	    function LazyCell(lazyInitValue, str) {
	        var _this = this;
	        _super.call(this, null, null);
	        Transaction_1.Transaction.transactionally(function () {
	            if (str)
	                _this.setStream(str);
	            _this.lazyInitValue = lazyInitValue;
	        });
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


/***/ },
/* 26 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var Stream_1 = __webpack_require__(3);
	var CoalesceHandler_1 = __webpack_require__(19);
	var Transaction_1 = __webpack_require__(4);
	/**
	 * A stream that allows values to be pushed into it, acting as an interface between the
	 * world of I/O and the world of FRP. Code that exports StreamSinks for read-only use
	 * should downcast to {@link Stream}.
	 */
	var StreamSink = (function (_super) {
	    __extends(StreamSink, _super);
	    function StreamSink(f) {
	        _super.call(this);
	        if (!f)
	            f = (function (l, r) {
	                throw new Error("send() called more than once per transaction, which isn't allowed. Did you want to combine the events? Then pass a combining function to your StreamSink constructor.");
	            });
	        this.coalescer = new CoalesceHandler_1.CoalesceHandler(f, this);
	    }
	    StreamSink.prototype.send = function (a) {
	        var _this = this;
	        Transaction_1.Transaction.transactionally(function () {
	            if (Transaction_1.Transaction.currentTransaction.inCallback > 0)
	                throw new Error("You are not allowed to use send() inside a Sodium callback");
	            _this.coalescer.send_(a);
	        });
	    };
	    return StreamSink;
	}(Stream_1.StreamWithSend));
	exports.StreamSink = StreamSink;


/***/ },
/* 27 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var LazyCell_1 = __webpack_require__(25);
	var Transaction_1 = __webpack_require__(4);
	var Stream_1 = __webpack_require__(3);
	/**
	 * A forward reference for a {@link Cell} equivalent to the Cell that is referenced.
	 */
	var CellLoop = (function (_super) {
	    __extends(CellLoop, _super);
	    function CellLoop() {
	        _super.call(this, null, new Stream_1.StreamLoop());
	    }
	    /**
	     * Resolve the loop to specify what the CellLoop was a forward reference to. It
	     * must be invoked inside the same transaction as the place where the CellLoop is used.
	     * This requires you to create an explicit transaction with {@link Transaction#run(Lambda0)}
	     * or {@link Transaction#runVoid(Runnable)}.
	     */
	    CellLoop.prototype.loop = function (a_out) {
	        var me = this;
	        Transaction_1.Transaction.transactionally(function () {
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


/***/ },
/* 28 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var Cell_1 = __webpack_require__(20);
	var StreamSink_1 = __webpack_require__(26);
	/**
	 * A cell that allows values to be pushed into it, acting as an interface between the
	 * world of I/O and the world of FRP. Code that exports CellSinks for read-only use
	 * should downcast to {@link Cell}.
	 */
	var CellSink = (function (_super) {
	    __extends(CellSink, _super);
	    /**
	     * Construct a writable cell with the specified initial value. If multiple values are
	     * sent in the same transaction, the specified function is used to combine them.
	     *
	     * If the function is not supplied, then an exception will be thrown in this case.
	     */
	    function CellSink(initValue, f) {
	        _super.call(this, initValue, new StreamSink_1.StreamSink(f));
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


/***/ },
/* 29 */
/***/ function(module, exports) {

	"use strict";
	var Tuple2 = (function () {
	    function Tuple2(a, b) {
	        this.a = a;
	        this.b = b;
	    }
	    return Tuple2;
	}());
	exports.Tuple2 = Tuple2;


/***/ },
/* 30 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var Vertex_1 = __webpack_require__(2);
	var typescript_collections_1 = __webpack_require__(5);
	var Stream_1 = __webpack_require__(3);
	var CellSink_1 = __webpack_require__(28);
	var Transaction_1 = __webpack_require__(4);
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
	        Transaction_1.Transaction.transactionally(function () {
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
	                        Transaction_1.Transaction.transactionally(function () { return ev.sAlarm.send_(ev.t); });
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
	                        Transaction_1.Transaction.transactionally(function () { });
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


/***/ },
/* 31 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var TimerSystem_1 = __webpack_require__(30);
	/**
	 * A timer system implementation using seconds as the time unit.
	 */
	var SecondsTimerSystem = (function (_super) {
	    __extends(SecondsTimerSystem, _super);
	    function SecondsTimerSystem() {
	        _super.call(this, new SecondsTimerSystemImpl());
	    }
	    return SecondsTimerSystem;
	}(TimerSystem_1.TimerSystem));
	exports.SecondsTimerSystem = SecondsTimerSystem;
	var SecondsTimerSystemImpl = (function (_super) {
	    __extends(SecondsTimerSystemImpl, _super);
	    function SecondsTimerSystemImpl() {
	        _super.apply(this, arguments);
	    }
	    /**
	     * Set a timer that will execute the specified callback at the specified time.
	     * @return A function that can be used to cancel the timer.
	     */
	    SecondsTimerSystemImpl.prototype.setTimer = function (t, callback) {
	        var timeout = setTimeout(callback, (t - this.now()) * 1000);
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


/***/ },
/* 32 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var TimerSystem_1 = __webpack_require__(30);
	/**
	 * A timer system implementation using milliseconds as the time unit.
	 */
	var MillisecondsTimerSystem = (function (_super) {
	    __extends(MillisecondsTimerSystem, _super);
	    function MillisecondsTimerSystem() {
	        _super.call(this, new MillisecondsTimerSystemImpl());
	    }
	    return MillisecondsTimerSystem;
	}(TimerSystem_1.TimerSystem));
	exports.MillisecondsTimerSystem = MillisecondsTimerSystem;
	var MillisecondsTimerSystemImpl = (function (_super) {
	    __extends(MillisecondsTimerSystemImpl, _super);
	    function MillisecondsTimerSystemImpl() {
	        _super.apply(this, arguments);
	    }
	    /**
	     * Set a timer that will execute the specified callback at the specified time.
	     * @return A function that can be used to cancel the timer.
	     */
	    MillisecondsTimerSystemImpl.prototype.setTimer = function (t, callback) {
	        var timeout = setTimeout(callback, t - this.now());
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


/***/ },
/* 33 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var Stream_1 = __webpack_require__(3);
	var Vertex_1 = __webpack_require__(2);
	var Transaction_1 = __webpack_require__(4);
	var IOAction = (function () {
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
	                            Transaction_1.Transaction.transactionally(function () {
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


/***/ }
/******/ ])
});
;
//# sourceMappingURL=sodium.umd.js.map