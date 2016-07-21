"use strict";
// Original
// var Sodium_1 = require("../lib/Sodium");

var Sodium_1 = Sodium; // Global Sodium namespace `Sodium.XXX`

function periodic(sys, period) {
    var time = sys.time, oAlarm = new Sodium_1.CellLoop(), sAlarm = sys.at(oAlarm);
    oAlarm.loop(sAlarm.map(function (t) { return t + period; })
        .hold(time.sample() + period));
    return sAlarm;
}
var sTick = null;
var sys = new Sodium_1.SecondsTimerSystem(), time = sys.time, sMain = new Sodium_1.StreamSink(), kill = Sodium_1.transactionally(function () {
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
    sMain.send(Sodium_1.Unit.UNIT);
    if ((sys.time.sample() - t0) < 10.5)
        setTimeout(tick, 990);
    else {
        kill();
    }
};
setTimeout(tick, 990);
//# sourceMappingURL=test-timers.js.map