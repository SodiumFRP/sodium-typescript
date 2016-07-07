import { TimerSystem, SecondsTimerSystem, Cell, CellLoop, Stream, StreamSink,
    Unit, transactionally, StreamLoop } from "./sodium";

function periodic(sys : TimerSystem, period : number) {
    const time = sys.time,
          oAlarm = new CellLoop<number>(),
          sAlarm = sys.at(oAlarm);
    oAlarm.loop(
        sAlarm.map(t => { console.log("tick"); return t + period; })
              .hold(time.sample() + period));
    return sAlarm;
}

const sys = new SecondsTimerSystem(),
    time = sys.time,
    sMain = new StreamSink<Unit>(),
    t0 = time.sample(),
    kill = transactionally(() => {
        const kill1 = periodic(sys, 1).listen(t => {
                console.log((t - t0).toFixed(3)+" timer");
            }),
            kill2 = sMain.snapshot1(time).listen(t => {
                console.log((t - t0).toFixed(3)+" main");
            });
        return () => { kill1(); kill2(); };
    });

let tick = null;
tick = () => {
    sMain.send(Unit.UNIT);
    if ((sys.time.sample() - t0) < 5.5)
        setTimeout(tick, 990);
    else {
        // TO DO: This does not deregister all the listeners for periodic()
        // You'll see that "tick" keeps going.
        // It must be able to do this!
        kill();
    }
};
setTimeout(tick, 990);
