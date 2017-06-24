"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Lambda_1 = require("./Lambda");
var Transaction_1 = require("./Transaction");
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
//# sourceMappingURL=CoalesceHandler.js.map