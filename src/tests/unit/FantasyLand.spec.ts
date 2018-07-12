

/**
  * Fantasy-land Algebraic Data Type Compatability.
  * Cell satisfies the Monad and Comonad Categories (and hence Functor, Apply, Applicative, and Extend as well)
  * @see {@link https://github.com/fantasyland/fantasy-land} for more info
  * @see {@link https://github.com/sanctuary-js/sanctuary/blob/master/test/Maybe/Maybe.js} for valid test examples (Sanctuary's Maybe)
  */

import * as jsc from 'jsverify';
import { S} from "../test-utils/Sanctuary";
import { Cell, StreamSink, Stream } from '../../lib/Lib';
import * as laws from 'fantasy-laws';
import { testSequence } from '../test-utils/Sequence';

/*
 * Cell
 */
//would be nice if we could push all samples off to listeners... like in Fantasy-land Practical Tests below, but for unit testing it's okay

function CellArb<A>(arb: jsc.Arbitrary<A>) {
  return arb.smap(x => new Cell<A>(x), x => x.sample());
}

function CellEq<T>(a: Cell<T>, b: Cell<T>) {
  return a.sample() === b.sample();
}

function CellHead(x: string): Cell<string> {
  const head = S.head(x);

  return new Cell<string>(head.isNothing ? "" : head.value);
}

function CellParseInt(radix: number): ((x: number) => Cell<number>) {
  return function (x: number) {
    const m = S.parseInt(radix)(x);
    return new Cell<number>(m.isNothing ? 0 : m.value);
  };
}

test('Cell - Functor Laws', () => {
  const testLaws = laws.Functor(CellEq);

  testLaws.identity(
    CellArb<number>(jsc.number)
  );

  testLaws.composition(
    CellArb<number>(jsc.number),
    jsc.constant(Math.sqrt),
    jsc.constant(Math.abs)
  );
});

test('Apply Laws', () => {
  const testLaws = laws.Apply(CellEq);

  testLaws.composition(
    CellArb(jsc.constant(Math.sqrt)),
    CellArb(jsc.constant(Math.abs)),
    CellArb(jsc.number)
  );
});

test('Appplicative Laws', () => {
  const testLaws = laws.Applicative(CellEq, Cell);

  testLaws.identity(
    CellArb(jsc.number)
  );

  testLaws.homomorphism(
    jsc.constant(Math.abs),
    jsc.number
  );

  testLaws.interchange(
    CellArb(jsc.constant(Math.abs)),
    jsc.number
  );

});

test('Chain Laws', () => {
  const testLaws = laws.Chain(CellEq);
  testLaws.associativity(
    CellArb(jsc.array(jsc.asciistring)),
    jsc.constant(CellHead),
    jsc.constant(CellParseInt(36))
  );
});

test('Monad Laws', () => {
  const testLaws = laws.Monad(CellEq, Cell);

  testLaws.leftIdentity(
    jsc.constant(CellHead),
    jsc.string
  );

  testLaws.rightIdentity(
    CellArb(jsc.number)
  );
});

test('Extend Laws', () => {
  const testLaws = laws.Extend(CellEq);
  testLaws.associativity(
    CellArb(jsc.integer),
    jsc.constant(function (c: Cell<number>) { return c.sample() + 1; }),
    jsc.constant(function (c: Cell<number>) { return c.sample() * c.sample(); })
  );
});

test('Comonad Laws', () => {
  const testLaws = laws.Comonad(CellEq);

  testLaws.leftIdentity(
    CellArb(jsc.number)
  );

  testLaws.rightIdentity(
    CellArb(jsc.string),
    jsc.constant(CellHead)
  );
});

test('Lift', (done) => {
  const addFunctors = S.lift2(S.add);

  const cResult = addFunctors(new Cell<number>(2)) (new Cell<number>(3));
  const kill = cResult.listen((n: number) => {
    expect(n).toBe(5);
    done();
  });

  kill();
});

test('Sequence', (done) => {
  testSequence (S.sequence(Cell)) (done)
});


test('Join', (done) => {
  const a = new Cell<number>(3);
  const d = S.join(new Cell<Cell<number>>(a));
  const kill = d.listen((n: number) => {
    expect(n).toBe(3);
    done();
  });
  kill();
});

test('Chain', (done) => {
  const a = new Cell<number>(3);

  const e = S.chain((n: number) => new Cell<number>(n + 2)) (a);
  const kill = e.listen((n: number) => {
    expect(n).toBe(5);
    done();
  });
  kill();
});

test('Concat', (done) => {
  const s1 = new StreamSink<number>();
  const s2 = new StreamSink<number>();
  const s3 = S.concat(s1) (s2);

  let fired: boolean = false;


  const kill = s3.listen((n: number) => {
    if (!fired) {
      expect(n).toBe(5);
      fired = true;
    } else {
      expect(n).toBe(42);
      done();
    }
  });

  s1.send(5);
  s2.send(42);
  kill();
});




/*
Stream
  describe('Fantasy-land Stream', () => {
    /*

    TODO: figure out right way to define arb and equality here
    If a solution is found that uses listen(), consider porting Cell to that approach as well.

    function StreamArb<A>(arb: jsc.Arbitrary<A>) {
      return arb.smap(x => {
        const sink = new StreamSink<A>();
        sink.listen(() => {});
        sink.send(x);
        return sink;
      }, x => x.hold(undefined).sample());
    }

    function StreamEq<T>(a: Stream<T>, b: Stream<T>) {
      console.log(a.hold(undefined).sample());
      return a.hold(undefined).sample() === b.hold(undefined).sample();
    }

    describe('Functor Laws', () => {
      const testLaws = laws.Functor(StreamEq);

      it('Identity', testLaws.identity(
        StreamArb<number>(jsc.number)
      ));

      it('Composition', testLaws.composition(
        StreamArb<number>(jsc.number),
        jsc.constant(Math.sqrt),
        jsc.constant(Math.abs)
      ));
    });
    */
