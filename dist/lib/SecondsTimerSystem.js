"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var TimerSystem_1 = require("./TimerSystem");
/**
 * A timer system implementation using seconds as the time unit.
 */
var SecondsTimerSystem = (function (_super) {
    __extends(SecondsTimerSystem, _super);
    function SecondsTimerSystem() {
        _super.call(this, new SecondsTimerSystemImpl());
    }
    return SecondsTimerSystem;
}(TimerSystem_1.TimerSystem));
exports.SecondsTimerSystem = SecondsTimerSystem;
var SecondsTimerSystemImpl = (function (_super) {
    __extends(SecondsTimerSystemImpl, _super);
    function SecondsTimerSystemImpl() {
        _super.apply(this, arguments);
    }
    /**
     * Set a timer that will execute the specified callback at the specified time.
     * @return A function that can be used to cancel the timer.
     */
    SecondsTimerSystemImpl.prototype.setTimer = function (t, callback) {
        var timeout = setTimeout(callback, (t - this.now()) * 1000);
        return function () { clearTimeout(timeout); };
    };
    /**
     * Return the current clock time.
     */
    SecondsTimerSystemImpl.prototype.now = function () {
        return Date.now() * 0.001;
    };
    return SecondsTimerSystemImpl;
}(TimerSystem_1.TimerSystemImpl));
//# sourceMappingURL=SecondsTimerSystem.js.map