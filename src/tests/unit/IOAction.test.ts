import { expect } from 'chai';

import {
  IOAction,
  StreamSink,
  getTotalRegistrations
} from '../../lib/Sodium';

export class IOActionTest {
  afterEach() {
    if (getTotalRegistrations() != 0) {
      throw new Error('listeners were not deregistered');
    }
  };



  'IOAction'(done) {
    const name = "fromAsync",
      action = IOAction.fromAsync((a: number, result: (b: number) => void) => {
        setTimeout(() => {
          result(a + 1);
        }, 1);
      }),
      out: number[] = [],
      sa = new StreamSink<number>(),
      kill = action(sa).listen(b => out.push(b));

    let out0: number[] = [],
      out1: number[] = [],
      out2: number[] = [];

      sa.send(5);
      out0 = out.map((num) => num);

      setTimeout(() => {
        sa.send(9);
        out1 = out.map((num) => num);

        setTimeout(() => {
          out2 = out.map((num) => num);
          kill();

          expect([]).to.deep.equal(out0);
          expect([6]).to.deep.equal(out1);
          expect([6, 10]).to.deep.equal(out2);
          done();
        }, 100);
      }, 100)


  }

}
