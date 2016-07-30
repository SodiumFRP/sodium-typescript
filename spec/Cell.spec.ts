///<reference path="./typings.d.ts"/>

import {
    Cell
} from '../src/lib/Sodium';

describe('Cell', () => {
    it('should test constantCell', () => {
        const c = new Cell<number>(12),
        out : number[] = [],
        kill = c.listen(a => out.push(a));

        kill();

        expect([12]).toEqual(out);
    });

});