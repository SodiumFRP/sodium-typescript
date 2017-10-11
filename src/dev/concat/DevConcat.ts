import { Stream, StreamSink, CellLoop, Transaction, TimerSystem, MillisecondsTimerSystem } from "../../lib/Sodium";
import {S} from "../../test-utils/Sanctuary";
const log = (str:string) => {
  const output = document.getElementById("output") as HTMLDivElement;
  output.innerHTML = output.innerHTML.concat(str);
}

export function startConcat() {
  const a = new StreamSink<Array<number>>();
  const b = new StreamSink<Array<number>>();

  const c = S.concat(a,b);

  c.listen(val => log(`${val}<br/>`));

  a.send([1]);
  b.send([2]);

  Transaction.run(() => {
    a.send([1]);
    b.send([2]);
  });

  a.send([1]);

}
