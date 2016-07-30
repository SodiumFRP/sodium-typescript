///<reference path="./typings.d.ts"/>

import {
    IOAction,
    StreamSink,
    getTotalRegistrations
} from '../src/lib/Sodium';

describe('IOAction', () => {
    const name = "fromAsync",
        action = IOAction.fromAsync((a : number, result : (b : number) => void) => {
            setTimeout(() => {
                    result(a + 1);
                }, 1);
        }),
        out : number[] = [],
        sa = new StreamSink<number>(),
        kill = action(sa).listen(b => out.push(b));

    let out0 : number[] = [],
        out1 : number[] = [],
        out2 : number[] = [];

    afterEach(() => {
        if (getTotalRegistrations() != 0) {
            throw new Error('listeners were not deregistered');
        }
    });

    beforeEach((done) => {
        sa.send(5);
        out0 = out.map((num) => num);

        setTimeout(() => {
            sa.send(9);
            out1 = out.map((num) => num);

            setTimeout(() => {
                out2 = out.map((num) => num);
                kill();
                done();
            }, 100);
        }, 100)
    });

    it('should test fromAsync', () => {

        expect([]).toEqual(out0);
        expect([6]).toEqual(out1);
        expect([6, 10]).toEqual(out2);

    });
});