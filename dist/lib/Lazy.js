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
//# sourceMappingURL=Lazy.js.map