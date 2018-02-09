
import {
  lambda1,
  lambda2,
  StreamSink,
  StreamLoop,
  CellSink,
  Transaction,
  Tuple2,
  Operational,
  Cell,
  CellLoop,
  getTotalRegistrations
} from '../../lib/Lib';

import { S } from "../test-utils/Sanctuary";

type TestSequencer = <A>(aCells:Array<Cell<A>>) => Cell<Array<A>>;

export const testSequence = (seq:TestSequencer) => (done) => {
  const aStreams = [
    new StreamSink<string>(),
    new StreamSink<string>(),
    new StreamSink<string>()
  ]

  const aCells: Array<Cell<string>> = aStreams.map(stream => stream.hold(""));

  const cArrays: Cell<Array<string>> = seq(aCells);

  let idx = 0;


  const kill = cArrays.listen((sArr: Array<string>) => {
    const res = sArr
      .filter(val => val.length)
      .join(" ");

    let target: string;

    switch (idx++) {
      case 0: target = ""; break;
      case 1: target = "Hello"; break;
      case 2: target = "Hello World"; break;
      case 3: target = "Do World"; break;
      case 4: target = "Do"; break;
      case 5: target = "Do Good"; break;
      case 6: target = "Do Good !"; break;
    }

    expect(res).toBe(target);
    if (idx === 7) {
      done();
    }


  });


  aStreams[0].send("Hello");
  aStreams[1].send("World");
  aStreams[0].send("Do");
  aStreams[1].send("");
  aStreams[1].send("Good");
  aStreams[2].send("!");

  kill();
}