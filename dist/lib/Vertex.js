"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
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
    return Vertex;
}());
Vertex.NULL = new Vertex("user", 1e12, []);
exports.Vertex = Vertex;
//# sourceMappingURL=Vertex.js.map