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
var MillisecondsTimerSystem = (function (_super) {
    __extends(MillisecondsTimerSystem, _super);
    function MillisecondsTimerSystem() {
        return _super.call(this, new MillisecondsTimerSystemImpl()) || this;
    }
    return MillisecondsTimerSystem;
}(TimerSystem_1.TimerSystem));
exports.MillisecondsTimerSystem = MillisecondsTimerSystem;
var MillisecondsTimerSystemImpl = (function (_super) {
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