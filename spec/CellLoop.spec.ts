///<reference path="./typings.d.ts"/>

import {
    CellLoop,
    Cell,
    Operational,
    Transaction,
    StreamSink,
    Unit,
    CellSink,
    getTotalRegistrations
} from '../src/lib/Sodium';

describe('Cell', () => {

    afterEach(() => {
        if (getTotalRegistrations() != 0) {
            throw new Error('listeners were not deregistered');
        }
    });

    it('should test loopValueSnapshot', () => {
        const out : string[] = [],
            kill = Transaction.transactionally(() => {
                const a = new Cell("lettuce"),
                b = new CellLoop<string>(),
                eSnap = Operational.value(a).snapshot(b, (aa, bb) => aa + " " + bb);
                b.loop(new Cell("cheese"));
                return eSnap.listen(x => out.push(x));
            });

        kill();

        expect(["lettuce cheese"]).toEqual(out);
    });

    it('should test loopValueHold', () => {
        const out : string[] = [],
            value = Transaction.transactionally(() => {
                const a = new CellLoop<string>(),
                    value_ = Operational.value(a).hold("onion");
                a.loop(new Cell("cheese"));
                return value_;
            }),
            sTick = new StreamSink<Unit>(),
            kill = sTick.snapshot1(value).listen(x => out.push(x));

        sTick.send(Unit.UNIT);
        kill();

        expect(["cheese"]).toEqual(out);
    });

    it('should test liftLoop', () => {
        const out : string[] = [],
            b = new CellSink("kettle"),
            c = Transaction.transactionally(() => {
                const a = new CellLoop<string>(),
                    c_ = a.lift(b, (aa, bb) => aa + " " + bb);
                a.loop(new Cell("tea"));
                return c_;
            }),
            kill = c.listen(x => out.push(x));

        b.send("caddy");
        kill();

        expect(["tea kettle", "tea caddy"]).toEqual(out);
    });

});
