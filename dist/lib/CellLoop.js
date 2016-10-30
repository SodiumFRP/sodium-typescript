"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var LazyCell_1 = require("./LazyCell");
var Transaction_1 = require("./Transaction");
var Stream_1 = require("./Stream");
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
//# sourceMappingURL=CellLoop.js.map