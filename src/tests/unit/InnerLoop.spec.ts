

import {
    lambda1,
    StreamSink,
    CellSink,
    Transaction,
    Tuple2,
    Operational,
    Cell,
    CellLoop,
    getTotalRegistrations,
    lambda2
} from '../../lib/Lib';

afterEach(() => {
    if (getTotalRegistrations() != 0) {
        throw new Error('listeners were not deregistered');
    }
});

enum STRATEGY {
    SWITCH_MAP = "switch+map",
    LIFT = "lift"
}

const runTest = (strategy:STRATEGY, done: () => void) => {
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
    ];

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
    const sRemoveAll = new StreamSink<string>();

    const cItems = Transaction.run(() => {
        const makeItem = (label: string, cCurr?:Cell<string>): Cell<string> => {
            const cLoop = new CellLoop<string>();

            const cUpdate = sModify.snapshot(cLoop, makeUppercase).hold(label);

            cLoop.loop((() => {
                switch(strategy) {
                    case STRATEGY.SWITCH_MAP:   return cUpdate;
                    case STRATEGY.LIFT:   return cUpdate.lift(cCurr, lambda2((update, current) => update, [cCurr]));
                }                
            })());

            return cLoop;
        };

        const ccLoop = new CellLoop<Cell<string>>();

        const emptyCell = new Cell("");

        const ccUpdate =
            sAdd.orElse(sRemoveAll)
                .snapshot(ccLoop, lambda2((str, cCurr) => (() => {
                    switch(strategy) {
                        case STRATEGY.SWITCH_MAP: return Cell.switchC(cCurr.map(() => str === "" ? emptyCell : makeItem(str)));
                        case STRATEGY.LIFT:   return str === "" ? emptyCell : makeItem(str, cCurr);
                    }
                })(), [emptyCell, sModify]))
                .hold(emptyCell);

        ccLoop.loop(ccUpdate);
        const ccItems = ccLoop;

        const cResult = Cell.switchC(ccItems); //Then switchC on it to get Cell<Array<string>>

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
    sRemoveAll.send("");
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
    sRemoveAll.send("");
    sWrite.send(false);

    //expected state: ""
    sModify.send("foo"); //Causes a "send() was invoked before listeners were registered" here:
    sWrite.send(false);

    //Last write - won't get checked
    sAdd.send("foo");
    sRemoveAll.send("");

    //This will pass fine with the listenOnInnerLoop set to true
    sModify.send("foo");

    //----------DONE------------------------
    //expected state : ""
    sRemoveAll.send("");
    sWrite.send(true);
}

test('Inner Loop ' + STRATEGY.SWITCH_MAP, (done) => {
    runTest (STRATEGY.SWITCH_MAP, done);
});

test('Inner Loop ' + STRATEGY.LIFT, (done) => {
    runTest (STRATEGY.LIFT, done);
});
