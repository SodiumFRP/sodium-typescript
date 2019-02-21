import {
  lambda1,
  Cell,
  CellSink,
  StreamSink,
  getTotalRegistrations
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
