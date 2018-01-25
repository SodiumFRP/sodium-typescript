
import {
  IOAction,
  StreamSink,
  getTotalRegistrations
} from '../../lib/Lib';

afterEach(() => {
  if (getTotalRegistrations() != 0) {
    throw new Error('listeners were not deregistered');
  }
});

  test('IOAction', (done) => {
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

          expect([]).toEqual(out0);
          expect([6]).toEqual(out1);
          expect([6, 10]).toEqual(out2);
          done();
        }, 100);
      }, 100)


  });
