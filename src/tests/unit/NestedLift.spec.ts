
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

    const cFinal = Cell.switchC(cTotal);

    const kill = cFinal.listen(value => {
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

    const cFinal = Cell.switchC(cTotal.map(data => data.cValue));

    const kill = cFinal.listen(value => {
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

test('TBD - http://sodium.nz/t/changes-in-nested-cells/267/', (done) => {
    interface Data {
        cValue: Cell<number>;
    }

    const runTest = (tempFix: boolean): Array<number> => {
        const unlisteners = new Array<() => void>();
        const out = new Array<number>();
        const cOriginal = new Cell<Data>({ cValue: new Cell(1) });
        const sOffset = new StreamSink<number>();
        const cOffset = sOffset.hold(0);

        const cTotal = cOriginal.map(lambda1((data: Data) => {
            return {
                cValue: data.cValue.lift(cOffset, (value, offset) => value + offset)
            }
        }, [cOffset]));

        //o_O - Why does this make a difference ?!?!
        if (tempFix) {
            unlisteners.push(cTotal.sample().cValue.listen(() => { }));
        }

        const cFinal = Cell.switchC(cTotal.map(data => data.cValue));

        unlisteners.push(cFinal.listen(value => {
            out.push(value);
            if (out.length === (tempFix ? 2 : 1)) {
                done();
            }
        }));

        sOffset.send(2);
        sOffset.send(4);

        unlisteners.forEach(unlistener => unlistener());

        return out;

    }

    //Check it out - different results depending on if we listened!
    expect(runTest(true)).toEqual([1, 3, 5]);
    expect(runTest(false)).toEqual([1]);

});