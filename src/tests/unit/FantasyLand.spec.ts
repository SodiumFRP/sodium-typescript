

/**
  * Fantasy-land Algebraic Data Type Compatability.
  * Cell satisfies the Functor, Apply, and Applicative categories
  * @see {@link https://github.com/fantasyland/fantasy-land} for more info
  * @see {@link https://github.com/sanctuary-js/sanctuary/blob/master/test/Maybe/Maybe.js} for valid test examples (Sanctuary's Maybe)
  */

import * as jsc from 'jsverify';
import { S} from "../test-utils/Sanctuary";
import { Cell, StreamSink, Stream, Transaction} from '../../lib/Lib';
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

test('Concat', (done) => {
  const s1 = new StreamSink<Array<number>>();
  const s2 = new StreamSink<Array<number>>();
  const s3 = S.concat(s1) (s2);

  const kill = s3.listen((n: Array<number>) => {
      expect(n).toEqual([5, 3, 42]);
      done();
  });
  
  Transaction.run(() => {
    s1.send([5]);
    s2.send([3, 42]);
  })
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
