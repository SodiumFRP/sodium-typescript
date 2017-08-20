///<reference path="./typings.d.ts"/>


/**
  * Fantasy-land Algebraic Data Type Compatability.
  * Cell satisfies the Functor, Apply, Applicative, and Monad Categories.
  * @see {@link https://github.com/fantasyland/fantasy-land} for more info
  * @see {@link https://github.com/sanctuary-js/sanctuary/blob/master/test/Maybe/Maybe.js} for valid test examples (Sanctuary's Maybe)
  */

const laws = require('fantasy-laws');
const { create, env } = require('sanctuary');
import * as jsc from 'jsverify';

import { Cell, StreamSink } from '../src/lib/Sodium';

const S = create({
  checkTypes: false,
  env,
});

describe('Fantasy-land Cell', () => {
  function CellArb<A>(arb: jsc.Arbitrary<A>) {
    return arb.smap(x => new Cell<A>(x), x => x.sample());
  }

  /*
  function CellEq<T>(a: Cell<T>, b: Cell<T>) {
    return a.sample() === b.sample();
  }
*/

  function CellEq<T>(a: Cell<T>, b: Cell<T>) {
    return a.sample() === b.sample();
  }

  describe('Functor Laws', () => {
    const testLaws = laws.Functor(CellEq);

    it('Identity', testLaws.identity(
      CellArb<number>(jsc.number)
    ));

    it('Composition', testLaws.composition(
      CellArb<number>(jsc.number),
      jsc.constant(Math.sqrt),
      jsc.constant(Math.abs)
    ));
  });

  describe('Apply Laws', () => {
    const testLaws = laws.Apply(CellEq);

    it('Composition', testLaws.composition(
      CellArb(jsc.constant(Math.sqrt)),
      CellArb(jsc.constant(Math.abs)),
      CellArb(jsc.number)
    ));
  });

  describe('Appplicative Laws', () => {
    const testLaws = laws.Applicative(CellEq, Cell);

    it('Identity', testLaws.identity(
      CellArb(jsc.number)
    ));

    it('Homorphism', testLaws.homomorphism(
      jsc.constant(Math.abs),
      jsc.number
    ));

    it('Interchange', testLaws.interchange(
      CellArb(jsc.constant(Math.abs)),
      jsc.number
    ));

  });

  //TODO - currently breaking
/*
  describe('Chain Laws', () => {
    const testLaws = laws.Chain(CellEq);

    it('Associativity', testLaws.associativity(
      CellArb(jsc.array(jsc.asciistring)),
      jsc.constant(S.head),
      jsc.constant(S.parseInt(36))
    ));
  });

  describe('Monad Laws', () => {
    const testLaws = laws.Monad(CellEq, Cell);

    it('Left Identity', testLaws.leftIdentity(
      jsc.constant(S.head),
      jsc.string
    ));

    it('Right Identity', testLaws.rightIdentity(
      CellArb(jsc.number)
    ));
  });
*/
});


describe('Fantasy-land Practical Tests', () => {
  describe('Lift', () => {
    const addFunctors = S.lift2(S.add);

    const cResult = addFunctors(new Cell<number>(2), new Cell<number>(3));
    cResult.listen((n:number) => {
      it("lifting the add() results in 5", (done) => {
        expect(n).toEqual(5);
        done();
      });
    });
  });

  describe('Sequence', () => {
    const aStreams = [
      new StreamSink<string>(),
      new StreamSink<string>(),
      new StreamSink<string>()
    ]

    const aCells: Array<Cell<string>> = aStreams.map(stream => stream.hold(""));

    const cArrays: Cell<Array<string>> = S.sequence(Cell, aCells);

    let idx = 0;


    cArrays.listen((sArr:Array<string>) => {
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

      it("sequence() - should be " + target, (done) => {
        expect(res).toEqual(target);
        done();
      });


    });


    aStreams[0].send("Hello");
    aStreams[1].send("World");
    aStreams[0].send("Do");
    aStreams[1].send("");
    aStreams[1].send("Good");
    aStreams[2].send("!");
  });


  describe('Chain', () => {
    const a = new Cell<number>(3);

    it("join test", (done) => {


      const d = S.join(new Cell<Cell<number>>(a));
      d.listen((n:number) => {
        expect(n).toEqual(3);
        done();
      });
    });

    it("chain test", (done) => {

      const e = S.chain((n:number) => new Cell<number>(n + 2), a);
      e.listen((n:number) => {
        expect(n).toEqual(5);
        done();
      });
    })
  });

});
