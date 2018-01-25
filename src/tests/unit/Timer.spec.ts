
import {
  Stream,
  StreamSink,
  CellLoop,
  TimerSystem,
  SecondsTimerSystem,
  Transaction,
  Unit,
  getTotalRegistrations
} from "../../lib/Lib";

const timeout: number = 30000;

test('should test Timer', (done) => {
  function periodic(sys: TimerSystem, period: number) {
    const time = sys.time,
      oAlarm = new CellLoop<number>(),
      sAlarm = sys.at(oAlarm);
    oAlarm.loop(
      sAlarm.map(t => t + period)
        .hold(time.sample() + period));
    return sAlarm;
  }

  function ticker(done: () => void) {
    let sTick: Stream<number> = null;
    const sys = new SecondsTimerSystem(),
      time = sys.time,
      sMain = new StreamSink<Unit>(),
      kill = Transaction.run(() => {
        const t0 = time.sample(),
          kill1 = periodic(sys, 1).listen(t => {
            //console.log((t - t0).toFixed(3) + " timer");
          }),
          kill2 = sMain.snapshot1(time).listen(t => {
            //console.log((t - t0).toFixed(3) + " main");
          });
        return () => { kill1(); kill2(); };
      });

    const t0 = time.sample();
    let tick: () => void = null;

    tick = () => {
      sMain.send(Unit.UNIT);
      if ((sys.time.sample() - t0) < 10.5)
        setTimeout(tick, 990);
      else {
        kill();
        done();
      }
    };

    setTimeout(tick, 990);

  }

  setTimeout(() => {
    ticker(done);
  }, 1);

  expect(typeof ticker).toBe('function');
}, timeout);
