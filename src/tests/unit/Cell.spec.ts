import {
  lambda1,
  Cell,
  CellSink,
  Stream,
  StreamSink,
  Tuple2,
  getTotalRegistrations,
  Transaction
} from '../../lib/Lib';

afterEach(() => {
  if (getTotalRegistrations() != 0) {
    throw new Error('listeners were not deregistered');
  }
});

test('should test constantCell', (done) => {

  const c = new Cell<number>(12);
  const out: number[] = [];

  const kill = c.listen(a => {
      out.push(a);
      done();
  });


  expect([12]).toEqual(out);
  kill();
});

test('cellLiftArray', () => {
  const out: number[][] = [];
  const ss1 = new StreamSink<number>();
  const cs = new CellSink<number>(1);
  const c1 = ss1.accum(0, (a,b) => a + b);
  const c2 = ss1.accum(1, (a,b) => a * b);
  const c3 = ss1.accum(0, (a,b) => a - b);
  const c =
    Cell.switchC(
      cs
        .map(lambda1(a => {
          switch (a) {
            default:
            case 1:
              return [c1,c2];
            case 2:
              return [c2,c3];
            case 3:
              return [c3,c1];
          }
        }, [c1,c2,c3]))
        .map(cas => Cell.liftArray(cas))
    );
  let kill = c.listen(x => out.push(x));
  ss1.send(1);
  ss1.send(2);
  ss1.send(3);
  ss1.send(4);
  cs.send(2);
  kill();
  expect([[0,1],[1,1],[3,2],[6,6],[10,24],[24,2]]).toEqual(out);
});

test('cellTracking', () => {
  const out: number[] = [];
  class A {
    c1: Cell<number>;
    c2: Cell<number>;
    constructor(c1: Cell<number>, c2: Cell<number>) {
      this.c1 = c1;
      this.c2 = c2;
    }
  }
  const ss = new StreamSink<Stream<number>>();
  const ss1 = new StreamSink<number>();
  const ss2 = new StreamSink<number>();
  let s1 = ss1.collect(0, (a,b) => new Tuple2(a + b, a + b));
  let s2 = ss2.collect(1, (a,b) => new Tuple2(a * b, a * b));
  let ca =
    ss
      .map(s => new A(s.accum(0, (a,b) => a + b), s.accum(1, (a,b) => a * b)))
      .hold(new A(new Cell(9), new Cell(9)))
      .tracking(a => [a.c1, a.c2]);
  let c1 = Cell.switchC(ca.map(a => a.c1));
  let c2 = Cell.switchC(ca.map(a => a.c2));
  let c3 = c1.lift(c2, (a, b) => a - b);
  let kill = c3.listen(a => out.push(a));
  ss.send(s1);
  ss1.send(1);
  ss2.send(2);
  ss1.send(3);
  ss2.send(4);
  ss.send(s2);
  ss1.send(1);
  ss2.send(2);
  ss1.send(3);
  ss2.send(4);
  kill();
  expect([0, -1, 0, 1, -1, 0, -6]).toEqual(out);
});

test('cell lift work load', done => {
  let lines = [
    "Work it harder",
    "Make it better",
    "Do it faster",
    "Makes us stronger"
  ];
  let idx = 0;
  let c1 = new CellSink(0);
  let c2 = new CellSink(0);
  let c3 = new CellSink(0);
  let c4 = new CellSink(0);
  let out: string[] = [];
  let c = c1.lift4(c2, c3, c4, (x1, x2, x3, x4) => {
    out.push(lines[idx]);
    idx = (idx + 1) % lines.length;
    return x1 + x2 + x3 + x4;
  });
  let kill = c.listen(() => {});
  Transaction.run(() => {
    c1.send(1);
    c2.send(2);
    c3.send(3);
    c4.send(4);
  });
  kill();
  expect(out).toEqual(["Work it harder", "Make it better"]);
  done();
});
