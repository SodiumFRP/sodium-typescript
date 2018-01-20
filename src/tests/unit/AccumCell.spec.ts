
import {
  lambda1,
  StreamSink,
  StreamLoop,
  CellSink,
  Transaction,
  Tuple2,
  Operational,
  Cell,
  CellLoop,
  getTotalRegistrations
} from '../../lib/Sodium';

afterEach(() => {
  if (getTotalRegistrations() != 0) {
    throw new Error('listeners were not deregistered');
  }
});

test('accum() over a Cell via switchC', (done) => {
  const out = new Array<string>();
  const sHello = new StreamSink<string>();
  const sUpper = new StreamSink<boolean>();
  const cHello = sHello.accum("", (val, acc) => acc + val);
  const cFinal = Cell.switchC(sUpper.accum(cHello, (flag, acc) =>
    acc.map((str:string) => flag ? str.toUpperCase() : str.toLowerCase())
  ));

  const kill = cFinal.listen(a => {
      out.push(a);
      if (out.length === 6) {
        done();
      }
    });

  sHello.send("h");
  sUpper.send(true);
  sHello.send("e");
  sHello.send("l");
  sUpper.send(false);
  sHello.send("l");
  sHello.send("o");
  kill();

  expect(out).toEqual(["", "h", "H", "HE", "HEL", "hel", "hell", "hello"]);
});

enum FlushTarget {
  HELLO,
  WORLD,
  EMPTY
}
test('accum over multiple cells via snapshot/hold', (done) => {
  const sHello = new StreamSink<string>();
  const sWorld = new StreamSink<string>();
  const sFlush = new StreamSink<FlushTarget>();

  const out = new Array<string>();

  const cFinal = Transaction.run(() => {
    const cLoop = new CellLoop<string>();

    cLoop.loop(
        sFlush.snapshot4(cLoop, sHello.hold(""), sWorld.hold(""), (evt, total, hello, world) =>
          evt === FlushTarget.HELLO
            ? total += hello
            : evt === FlushTarget.WORLD
              ? total += world
              : total += " "
        )
        .hold("")
    )

    return cLoop;
  })
  const kill = cFinal.listen(a => {
    out.push(a);
    if (out.length === 12) {
      done();
    }
  });

    sHello.send("h");
    sFlush.send(FlushTarget.HELLO);
    sHello.send("e");
    sFlush.send(FlushTarget.HELLO);
    sHello.send("l");
    sFlush.send(FlushTarget.HELLO);
    sHello.send("l");
    sFlush.send(FlushTarget.HELLO);
    sHello.send("o");
    sFlush.send(FlushTarget.HELLO);

    sFlush.send(FlushTarget.EMPTY);

    sWorld.send("w");
    sFlush.send(FlushTarget.WORLD);
    sWorld.send("o");
    sFlush.send(FlushTarget.WORLD);
    sWorld.send("r");
    sFlush.send(FlushTarget.WORLD);
    sWorld.send("l");
    sFlush.send(FlushTarget.WORLD);
    sWorld.send("d");
    sFlush.send(FlushTarget.WORLD);
    kill();

    expect(out).toEqual(["", "h", "he", "hel", "hell", "hello", "hello ", "hello w", "hello wo", "hello wor", "hello worl", "hello world"]);

});
