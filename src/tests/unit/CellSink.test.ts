import { expect } from 'chai';

import {
  Cell,
  StreamSink,
  CellSink,
  Transaction,
  Tuple2,
  getTotalRegistrations
} from '../../lib/Sodium';

export class CellSinkTest {

  afterEach() {
    if (getTotalRegistrations() != 0) {
      throw new Error('listeners were not deregistered');
    }
  }

  'should test snapshot'(done) {
    const c = new CellSink<number>(0),
      s = new StreamSink<number>(),
      out: string[] = [],
      kill = s.snapshot(c, (x, y) => x + " " + y)
        .listen(a => {
          out.push(a);
          if (out.length === 3) {
            done();
          }
        });

    s.send(100);
    c.send(2);
    s.send(200);
    c.send(9);
    c.send(1);
    s.send(300);
    kill();

    expect(["100 0", "200 2", "300 1"]).to.deep.equal(out);
  };

  'should test values'(done) {
    const c = new CellSink<number>(9),
      out: number[] = [],
      kill = c.listen(a => {
        out.push(a);
        if (out.length === 3) {
          done();
        }
      });

    c.send(2);
    c.send(7);
    kill();

    expect([9, 2, 7]).to.deep.equal(out);
  };

  "should test mapC"(done) {
    const c = new CellSink<number>(6),
      out: string[] = [],
      kill = c.map(a => "" + a)
        .listen(a => {
          out.push(a);
          if (out.length === 2) {
            done();
          }
        });
    c.send(8);
    kill();

    expect(["6", "8"]).to.deep.equal(out);
  };

  "should throw an error on mapCLateListen"() {
    const c = new CellSink<number>(6),
      out: string[] = [],
      cm = c.map(a => "" + a);

    try {
      c.send(2);
      const kill = cm.listen(a => out.push(a));
      c.send(8);
      kill();
    } catch (e) {

      expect(e.message).to.equal('send() was invoked before listeners were registered');
    }

    //assertEquals(["2", "8"], out);
  };

  "should test apply"(done) {
    const cf = new CellSink<(a: number) => string>(a => "1 " + a),
      ca = new CellSink<number>(5),
      out: string[] = [],
      kill = Cell.apply(cf, ca).listen(a => {
        out.push(a);
        if (out.length === 3) {
          done();
        }
      });

    cf.send(a => "12 " + a);
    ca.send(6);
    kill();

    expect(["1 5", "12 5", "12 6"]).to.deep.equal(out);
  };

  "should test lift"(done) {
    const a = new CellSink<number>(1),
      b = new CellSink<number>(5),
      out: string[] = [],
      kill = a.lift(b, (aa, bb) => aa + " " + bb)
        .listen(a => {
          out.push(a);
          if (out.length === 3) {
            done();
          }
        });
    a.send(12);
    b.send(6);
    kill();

    expect(["1 5", "12 5", "12 6"]).to.deep.equal(out);
  };

  "should test liftGlitch"(done) {
    const a = new CellSink(1),
      a3 = a.map(x => x * 3),
      a5 = a.map(x => x * 5),
      b = a3.lift(a5, (x, y) => x + " " + y),
      out: string[] = [],
      kill = b.listen(x => {
        out.push(x);
        if (out.length === 2) {
          done();
        }

      });
    a.send(2);
    kill();

    expect(["3 5", "6 10"]).to.deep.equal(out);
  };

  "should test liftFromSimultaneous"(done) {
    const t = Transaction.run(() => {
      const b1 = new CellSink(3),
        b2 = new CellSink(5);
      b2.send(7);
      return new Tuple2(b1, b2);
    });

    const b1 = t.a,
      b2 = t.b,
      out: number[] = [],
      kill = b1.lift(b2, (x, y) => x + y)
        .listen(a => {
          out.push(a);
          done();
        });
    kill();

    expect([10]).to.deep.equal(out);
  };

}
