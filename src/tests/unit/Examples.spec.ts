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
} from '../../lib/Lib';

import {S} from "../test-utils/Sanctuary";

afterEach(() => {
    if (getTotalRegistrations() != 0) {
        throw new Error('listeners were not deregistered');
    }
});

test('example - attempt to cause same error as example 1, but simplified', (done) => {
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
      if(v === -1) {
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

  //even this is fine
  unlisteners.push(s2.listen(() => {})); //dummy listener
  s1.send(0);
  s1.send(1);
  s2.send(1);
  s1.send(0);
  s2.send(1);

  //Still seems to work here too (compare to following example)
  s1.send(0);
  s1.send(1);
  s2.send(1);
  s1.send(0);
  s2.send(1);

  //cleanup
  s1.send(-1);
});

test('example 1: nested switch + CellLoop', (done) => {
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

    //Individual items
    const sModify = new StreamSink<string>();

    const makeUppercase = (target:string, s:string) => target === s ? s.toUpperCase() : s;

    const makeItem = (label: string):Cell<string> => Transaction.run(() => {
        const cLoop = new CellLoop<string>();
        const cUpdate = sModify.snapshot(cLoop, makeUppercase).hold(label);

        cLoop.loop(cUpdate);

        return cLoop;
    })

    //List of items
    const sAdd = new StreamSink<string>();
    const sRemove = new StreamSink<string>();
    const sRemoveAll = new StreamSink<string>();

    const addItem = (label: string) => (xs: Array<Cell<string>>) => xs.concat(makeItem(label));
    const removeAll = () => (xs: Array<Cell<string>>)  => [];

    const applyToList = (fn, xs) => fn(xs);

    const _ccItems = Transaction.run(() => {
        const cLoop = new CellLoop<Array<Cell<string>>>();
        const cUpdate =
            sAdd.map(addItem)
                .orElse(sRemoveAll.map(removeAll))
                .snapshot(cLoop, applyToList)
                .hold([]);

        cLoop.loop(cUpdate);
        return cLoop;
    });

    const ccItems = _ccItems.map(S.sequence(Cell)) as Cell<Cell<Array<string>>>; //_cItems is Cell<Array<Cell<string>>>, so first map it with sequence to get Cell<Cell<Array<string>>>
    const cItems = Cell.switchC(ccItems); //Then switchC on it to get Cell<Array<string>>

    //Flush writes
    unlisteners.push(
        sWrite.snapshot(cItems, (evt, items) => {
            results.push(items);
            return evt;
        })
        .listen(evt => {
            if(evt) {
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

    //test: ["foo, "BAR", "baz""]
    sAdd.send("foo");
    sAdd.send("bar");
    sAdd.send("baz");
    sModify.send("bar");
    sWrite.send(false);

    //test: []
    sRemoveAll.send(null);
    sWrite.send(false);

    //test: ["apple"]
    sAdd.send("apple");
    sWrite.send(false);

    //test: ["apple"]
    sModify.send("foo");
    sWrite.send(false)

    //test: ["APPLE"]
    sModify.send("apple");
    sWrite.send(false);

    //test: []
    sRemoveAll.send(null);
    sWrite.send(false);

    //test: []
    //But first - if there's nothing in the list, sModify needs a dummy listener
    unlisteners.push(sModify.listen(() => {}));
    sModify.send("foo");
    sWrite.send(false);

    //-------HERE'S WHERE IT GETS WEIRD!!! -------------
    //The dummy listener which was added in this outer scope is no longer valid if we add+clear again

    //Specifically, adding both of these two lines:
    sAdd.send("foo");
    sRemoveAll.send(null);

    //Causes a "send() was invoked before listeners were registered" here:
    sModify.send("foo");

    //But when commenting out either of them, everything passes!

    //----------DONE------------------------
    //test: []
    sRemoveAll.send(null);
    sWrite.send(true);
})
