import { expect } from 'chai';

import {
  CellLoop,
  Cell,
  Operational,
  Transaction,
  StreamSink,
  Unit,
  CellSink,
  getTotalRegistrations
} from '../../lib/Sodium';

export class CellLoopTest {

  afterEach() {
    if (getTotalRegistrations() != 0) {
      throw new Error('listeners were not deregistered');
    }
  };

  'should test loopValueSnapshot'(done) {
    const out: string[] = [];
    const kill = Transaction.run(() => {
      const a = new Cell("lettuce");
      const b = new CellLoop<string>();
      const eSnap = Operational.value(a).snapshot(b, (aa, bb) => aa + " " + bb);
      b.loop(new Cell("cheese"));
      return eSnap.listen(x => {
        out.push(x);
        done();
      });
    });

    kill();

    expect(["lettuce cheese"]).to.deep.equal(out);
  };

  'should test loopValueHold'(done) {
    const out: string[] = [];
    const value = Transaction.run(() => {
      const a = new CellLoop<string>();
      const value_ = Operational.value(a).hold("onion");
      a.loop(new Cell("cheese"));
      return value_;
    }),
      sTick = new StreamSink<Unit>(),
      kill = sTick.snapshot1(value).listen(x => {
        out.push(x);
        done();
      });

    sTick.send(Unit.UNIT);
    kill();

    expect(["cheese"]).to.deep.equal(out);
  };

  'should test liftLoop'(done) {
    const out: string[] = [];
    const b = new CellSink("kettle");
    const c = Transaction.run(() => {
      const a = new CellLoop<string>();
      const c_ = a.lift(b, (aa, bb) => aa + " " + bb);
      a.loop(new Cell("tea"));
      return c_;
    }),
      kill = c.listen(x => {
        out.push(x);
        if (out.length === 2) {
          done();
        }
      });

    b.send("caddy");
    kill();

    expect(["tea kettle", "tea caddy"]).to.deep.equal(out);
  };
}
