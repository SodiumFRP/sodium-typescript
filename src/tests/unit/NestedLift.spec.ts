
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
    const cOriginal = new Cell<Data>({cValue: new Cell(1)});
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

