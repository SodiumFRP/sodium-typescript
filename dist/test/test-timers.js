"use strict";
var sodium_frp_1 = require("../lib/sodium-frp");
var sodium_frp_time_1 = require("../lib/sodium-frp-time");
function periodic(sys, period) {
    var time = sys.time, oAlarm = new sodium_frp_1.CellLoop(), sAlarm = sys.at(oAlarm);
    oAlarm.loop(sAlarm.map(function (t) { return t + period; })
        .hold(time.sample() + period));
    return sAlarm;
}
var sTick = null;
var sys = new sodium_frp_time_1.SecondsTimerSystem(), time = sys.time, sMain = new sodium_frp_1.StreamSink(), kill = sodium_frp_1.transactionally(function () {
    var t0 = time.sample(), kill1 = periodic(sys, 1).listen(function (t) {
        console.log((t - t0).toFixed(3) + " timer");
    }), kill2 = sMain.snapshot1(time).listen(function (t) {
        console.log((t - t0).toFixed(3) + " main");
    });
    return function () { kill1(); kill2(); };
});
var t0 = time.sample();
var tick = null;
tick = function () {
    sMain.send(sodium_frp_1.Unit.UNIT);
    if ((sys.time.sample() - t0) < 10.5)
        setTimeout(tick, 990);
    else {
        kill();
    }
};
setTimeout(tick, 990);
//# sourceMappingURL=test-timers.js.map