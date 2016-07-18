"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var TimerSystem_1 = require("./TimerSystem");
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
//# sourceMappingURL=MillisecondsTimerSystem.js.map