
import {
    lambda1,
    StreamSink,
    CellSink,
    Transaction,
    Tuple2,
    Operational,
    Cell,
    CellLoop,
    getTotalRegistrations
} from '../../lib/Lib';

afterEach(() => {
    if (getTotalRegistrations() != 0) {
        throw new Error('listeners were not deregistered');
    }
});

test('map + nested lift', (done) => {
    const out = new Array<number>();
    const ccOriginal = new Cell<Cell<number>>(new Cell(1));
    const sOffset = new StreamSink<number>();
    const cOffset = sOffset.hold(0);

    const cTotal = ccOriginal.map(cOriginal =>
        cOriginal.lift(cOffset, (value, offset) => value + offset)
    );

    const kill = Cell
        .switchC(cTotal)
        .listen(value => {
            out.push(value);

            if (out.length === 2) {
                done();
            }
        });

    sOffset.send(2);
    sOffset.send(4);
    kill();

    expect(out).toEqual([1, 3, 5]);
});


test('lift + nested data/map', (done) => {
    interface Data {
        cValue: Cell<number>;
    }
    const out = new Array<number>();
    const cOriginal = new Cell<Data>({ cValue: new Cell(1) });
    const sOffset = new StreamSink<number>();
    const cOffset = sOffset.hold(0);

    const cTotal = cOriginal.lift(cOffset, (data, offset) => {
        return {
            cValue: data.cValue.map(value => value + offset)
        }
    })

    
    const kill = Cell
        .switchC(cTotal.map(data => data.cValue))
        .listen(value => {
            out.push(value);

            if (out.length === 2) {
                done();
            }
        });

    sOffset.send(2);
    sOffset.send(4);
    kill();

    expect(out).toEqual([1, 3, 5]);
});

test('map + nested data/lift (w/ Transaction)', (done) => {
    interface Data {
        cValue: Cell<number>;
    }
    
    const out = new Array<number>();
    const cOriginal = new Cell<Data>({ cValue: new Cell(1) });
    const sOffset = new StreamSink<number>();
    const cOffset = sOffset.hold(0);

    const cTotal = cOriginal.map(lambda1((data: Data) => {
        return {
            cValue: data.cValue.lift(cOffset, (value, offset) => value + offset)
        }
    }, [cOffset]));

    const kill = Transaction.run(() => 
        Cell.switchC(cTotal.map(data => data.cValue))
            .listen(value => {
                out.push(value);
                if (out.length === 2) {
                    done();
                }
            })
    );
    

    sOffset.send(2);
    sOffset.send(4);

    kill();

    expect(out).toEqual([1, 3, 5]);

});

test('map + nested data/lift (no Transaction)', (done) => {
    interface Data {
        cValue: Cell<number>;
    }
    
    const out = new Array<number>();
    const cOriginal = new Cell<Data>({ cValue: new Cell(1) });
    const sOffset = new StreamSink<number>();
    const cOffset = sOffset.hold(0);

    const cTotal = cOriginal.map(lambda1((data: Data) => {
        return {
            cValue: data.cValue.lift(cOffset, (value, offset) => value + offset)
        }
    }, [cOffset]));

    const kill = Cell
        .switchC(cTotal.map(data => data.cValue))
        .listen(value => {
            out.push(value);
            if (out.length === 2) {
                done();
            }
        })
    

    sOffset.send(2);
    sOffset.send(4);

    kill();

    expect(out).toEqual([1, 3, 5]);

});

test('example 2: with loop', (done) => {

  //Pick one...

  //General cleanup / final checking helpers
  const results = []
  const expected = [
    "BAZ",  
    "",
    "apple",
    "apple",
    "APPLE",
    "",
    "",
    ""
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

    const addItem = (label: string) => (c: Cell<string>) => makeItem(label);
    const removeAll = () => (c: Cell<string>) => new Cell("");

    const applyToList = (fn, xs) => fn(xs);

    const emptyCell = new Cell("");

    const ccLoop = new CellLoop<Cell<string>>();
    const ccUpdate =
      sAdd.map(addItem)
        .orElse(sRemoveAll.map(removeAll))
        .snapshot(ccLoop, applyToList)
        .hold(emptyCell);

    ccLoop.loop(ccUpdate);
    const ccItems = ccLoop;

    const cResult = Cell.switchC(ccItems); //Then switchC on it to get Cell<Array<string>>
    
    //None of these helps!
    unlisteners.push(emptyCell.listen(() => {}));
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

  //expected state (after write): "BAZ"
  sAdd.send("foo");
  sAdd.send("bar");
  sAdd.send("baz");
  sModify.send("baz");
  sWrite.send(false);

  //expected state: ""
  sRemoveAll.send(null);
  sWrite.send(false);

  //expected state: "apple"
  sAdd.send("apple");
  sWrite.send(false);

  //expected state: "apple"
  sModify.send("foo");
  sWrite.send(false)

  //expected state: "APPLE"
  sModify.send("apple");
  sWrite.send(false);

  //expected state: "" 
  sRemoveAll.send(null);
  sWrite.send(false);

  //expected state: "" 
  //But first - if there's nothing in the list, sModify needs a dummy listener
  unlisteners.push(sModify.listen(() => { }));
  sModify.send("foo");
  sWrite.send(false);

  
  expect(cItems.sample()).toEqual(""); //Just to confirm here, it really is a Cell of ""
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
    1. Commenting out either the sAdd or sRemoveAll
    2. Uncommenting the re-adding of the listener
  */


  //----------DONE------------------------
  //expected state : ""
  sRemoveAll.send(null);
  sWrite.send(true);
});
