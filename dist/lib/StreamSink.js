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
var StreamSink = (function (_super) {
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