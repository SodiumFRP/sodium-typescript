"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Vertex_1 = require("./Vertex");
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
//# sourceMappingURL=Lambda.js.map