"use strict";
var Stream_1 = require("./Stream");
var Vertex_1 = require("./Vertex");
var Transaction_1 = require("./Transaction");
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
                            Transaction_1.transactionally(function () {
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