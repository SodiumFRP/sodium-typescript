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
 * A timer system implementation using seconds as the time unit.
 */
var SecondsTimerSystem = (function (_super) {
    __extends(SecondsTimerSystem, _super);
    function SecondsTimerSystem() {
        return _super.call(this, new SecondsTimerSystemImpl()) || this;
    }
    return SecondsTimerSystem;
}(TimerSystem_1.TimerSystem));
exports.SecondsTimerSystem = SecondsTimerSystem;
var SecondsTimerSystemImpl = (function (_super) {
    __extends(SecondsTimerSystemImpl, _super);
    function SecondsTimerSystemImpl() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * Set a timer that will execute the specified callback at the specified time.
     * @return A function that can be used to cancel the timer.
     */
    SecondsTimerSystemImpl.prototype.setTimer = function (t, callback) {
        var timeout = setTimeout(callback, Math.max((t - this.now()) * 1000, 0));
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