import {
  lambda1,
  lambda2,
  StreamSink,
  StreamLoop,
  CellSink,
  Transaction,
  Tuple2,
  Operational,
  Cell,
  CellLoop,
  getTotalRegistrations
} from '../../lib/Lib';

import { S } from "../test-utils/Sanctuary";
import {testSequence} from "../test-utils/Sequence";

afterEach(() => {
  if (getTotalRegistrations() != 0) {
    throw new Error('listeners were not deregistered');
  }
});


const CellSequenceAuto = <A>(cells: Array<Cell<A>>): Cell<Array<A>> => {
  const fn = (out:Cell<Array<A>>, cell:Cell<A>) => 
    out = out.lift(cell, (list, a) => list.concat([a]));

  return cells.reduce(fn, new Cell(new Array<A>()));
}

const CellSequenceManual = <A>(cells: Array<Cell<A>>): Cell<Array<A>> => {
  const cFinal = new Cell(new Array<A>());
  
  switch(cells.length) {
    case 0:
        return cFinal;
    case 1:
        return cFinal.lift(cells[0], (xs, x) => [x]);
    case 2:
        return cFinal.lift3(cells[0], cells[1], (xs, x1, x2) => [x1, x2]);
    case 3:
        return cFinal.lift4(cells[0], cells[1], cells[2], (xs, x1, x2, x3) => [x1, x2, x3]);
    case 4:
        return cFinal.lift5(cells[0], cells[1], cells[2], cells[3], (xs, x1, x2, x3, x4) => [x1, x2, x3, x4]);

    default: throw new Error("unreached!");
  }
  
}

test('sanity check sequence - auto', (done) => {
  testSequence (CellSequenceAuto) (done)
});

test('sanity check sequence - manual', (done) => {
  testSequence (CellSequenceManual) (done)
});

test('example - without sequence', (done) => {
  const unlisteners = [];
  const finish = () => setTimeout(() => { //postponed a frame for convenience
    unlisteners.forEach(fn => fn());
    done();
  }, 0);
  const s1 = new StreamSink<number>();
  const s2 = new StreamSink<number>();
  const c1 = s1.map(v => !v ? new Cell(v) : s2.hold(v)).hold(new Cell(0));

  const c = Cell.switchC(c1);

  unlisteners.push(
    c.listen(v => {
      //console.log(v);
      if (v === -1) {
        finish();
      }
    })
  );

  /*
    Sending on s1:
    -1 cleanup / finish
    0 causes the inner value to be a new Cell
    anything else causes the inner value to be a hold of s2

    Sending on s2:
    changes the inner value of s1 if it exists as a hold
  */

  //all of this is fine
  s1.send(1);
  s2.send(1);
  s1.send(0);
  s1.send(1);
  s2.send(1);

  //even this is fine if we add a dummy listener
  unlisteners.push(s2.listen(() => { })); //dummy listener
  s1.send(0);
  s1.send(1);
  s2.send(1);
  s1.send(0);
  s2.send(1);

  //Still seems to work here too (compare to following example where the listener disappears)
  s1.send(0);
  s1.send(1);
  s2.send(1);
  s1.send(0);
  s2.send(1);
  
  //cleanup
  s1.send(-1);
});



test('example 1: with loop and sequence', (done) => {

  //Pick one...

  //const seq = S.sequence(Cell);
  const seq = CellSequenceManual;

  //General cleanup / final checking helpers
  const results = []
  const expected = [
    ["foo", "BAR", "baz"],
    [],
    ["apple"],
    ["apple"],
    ["APPLE"],
    [],
    [],
    []
  ]
  const unlisteners = [];
  const finish = () => setTimeout(() => { //postponed a frame for convenience
    unlisteners.forEach(fn => fn());
    expect(results.length).toBe(expected.length);
    results.forEach((v, i) => expect(v).toEqual(expected[i]));
    done();
  }, 0);

  const sWrite = new StreamSink<boolean>();

  //Modify items
  const sModify = new StreamSink<string>();
  const makeUppercase = (target: string, s: string) => target === s ? s.toUpperCase() : s;

  //Manage list of items
  const sAdd = new StreamSink<string>();
  const sRemove = new StreamSink<string>();
  const sRemoveAll = new StreamSink<string>();

  const cItems = Transaction.run(() => {
    const makeItem = (label: string): Cell<string> => {
      const cLoop = new CellLoop<string>();
      const cUpdate = sModify.snapshot(cLoop, makeUppercase).hold(label);

      cLoop.loop(cUpdate);

      return cLoop;
    };

    const addItem = (label: string) => (xs: Array<Cell<string>>) => xs.concat(makeItem(label));
    const removeAll = () => (xs: Array<Cell<string>>) => [];

    const applyToList = (fn, xs) => fn(xs);

    const ccLoop = new CellLoop<Array<Cell<string>>>();
    const ccUpdate =
      sAdd.map(addItem)
        .orElse(sRemoveAll.map(removeAll))
        .snapshot(ccLoop, applyToList)
        .hold([]);

    ccLoop.loop(ccUpdate);
    const ccItems = ccLoop.map(seq) as Cell<Cell<Array<string>>>; //_cItems is Cell<Array<Cell<string>>>, so first map it with sequence to get Cell<Cell<Array<string>>>

    const cResult = Cell.switchC(ccItems); //Then switchC on it to get Cell<Array<string>>
    
    //None of these helps
    unlisteners.push(ccUpdate.listen(() => {}));
    unlisteners.push(ccItems.listen(() => {}));
    unlisteners.push(ccLoop.listen(() => {}));
    unlisteners.push(cResult.listen(() => {}));

    return cResult;
  });

  //Flush writes
  unlisteners.push(
    sWrite.snapshot(cItems, (evt, items) => {
      results.push(items);
      return evt;
    })
      .listen(evt => {
        if (evt) {
          finish();
        }
      })
  );

  //This is just for the sake of debugging
  unlisteners.push(
    cItems.listen(items => {
      //console.log(items);
    })
  );

  //expected state (after write): ["foo, "BAR", "baz""]
  sAdd.send("foo");
  sAdd.send("bar");
  sAdd.send("baz");
  sModify.send("bar");
  sWrite.send(false);

  //expected state: []
  sRemoveAll.send(null);
  sWrite.send(false);

  //expected state: ["apple"]
  sAdd.send("apple");
  sWrite.send(false);

  //expected state: ["apple"]
  sModify.send("foo");
  sWrite.send(false)

  //expected state: ["APPLE"]
  sModify.send("apple");
  sWrite.send(false);

  //expected state: []
  sRemoveAll.send(null);
  sWrite.send(false);

  //expected state: []
  //But first - if there's nothing in the list, sModify needs a dummy listener
  unlisteners.push(sModify.listen(() => { }));
  sModify.send("foo");
  sWrite.send(false);

  
  expect(cItems.sample()).toEqual([]); //Just to confirm here, it really is a Cell of []
  //-------HERE'S WHERE IT GETS WEIRD!!! -------------
  //The dummy listener which was added in this outer scope is no longer valid if we add+clear again

  //Specifically, adding both of these two lines:
  sAdd.send("foo");
  sRemoveAll.send(null);

  //WITHOUT adding this line:
  //unlisteners.push(sModify.listen(() => { }));

  //Causes a "send() was invoked before listeners were registered" here:
  sModify.send("foo");

  /*
    Note that either of these fixes it:
    1. Commending out either the sAdd or sRemoveAll
    2. Uncommenting the re-adding of the listener
  */


  //----------DONE------------------------
  //expected state : []
  sRemoveAll.send(null);
  sWrite.send(true);
})
