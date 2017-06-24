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
var LazyCell = (function (_super) {
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