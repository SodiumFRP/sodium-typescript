///<reference path="./typings.d.ts"/>

import {
    IOAction,
    StreamSink,
    getTotalRegistrations
} from '../src/lib/Sodium';

describe('IOAction', () => {
    function checkMemory() : void {
        if (getTotalRegistrations() != 0)
            throw new Error("listeners were not deregistered!");
    }

    it('should test fromAsync', () => {
        const name = "fromAsync",
            action = IOAction.fromAsync((a : number, result : (b : number) => void) => {
                setTimeout(() => {
                        result(a + 1);
                    }, 1);
            }),
            out : number[] = [],
            sa = new StreamSink<number>(),
            kill = action(sa).listen(b => out.push(b));

        sa.send(5);
        expect([]).toEqual(out);

        // TODO: need to test timeout
        /*
        setTimeout(() => {
            sa.send(9);
            expect([6]).toEqual(out);
            setTimeout(() => {
                expect([6, 10]).toEqual(out);
                kill();
                checkMemory();
                console.log(name + " - PASS");
            }, 100);
        }, 100);
        */
    });
});