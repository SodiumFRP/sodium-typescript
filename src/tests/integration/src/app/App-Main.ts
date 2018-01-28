import {Transaction, Stream, CellLoop, MillisecondsTimerSystem} from "lib/Lib";
import {makeDomWriter} from "./output/DomWriter";

const domWriter = makeDomWriter(document.getElementById("app"));
  
const periodic = (sys,period) => Transaction.run(() => {
    const oAlarm = new CellLoop();
    const sAlarm = sys.at(oAlarm);
  
    oAlarm.loop(
        sAlarm
          .map(t => t + period)
          .hold(sys.time.sample() + period));
    return oAlarm;

});

periodic(new MillisecondsTimerSystem(), 1).listen(domWriter.update);
//periodic(new MillisecondsTimerSystem(), 1).listen(console.log);