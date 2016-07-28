///<reference path="./typings.d.ts"/>

import {
    lambda1,
    StreamSink
} from '../src/lib/Sodium';

describe('StreamSink:suite', () => {

    it('should test .map()', () => {
        const s = new StreamSink<number>();
        const out : number[] = [];
        const kill = s.map(a => a + 1)
                    .listen(a => out.push(a));
        s.send(7);
        kill();

        expect([8]).toEqual(out);
    });

    it('should map_tack', () => {
        const s = new StreamSink<number>(),
        t = new StreamSink<string>(),
        out : number[] = [],
        kill = s.map(lambda1((a : number) => a + 1, [t]))
                .listen(a => out.push(a));

        s.send(7);
        t.send("banana");
        kill();

        expect([8]).toEqual(out);
    });

    it('should do mapTo', () => {
        const s = new StreamSink<number>(),
        out : string[] = [],
        kill = s.mapTo("fusebox")
                .listen(a => out.push(a));

        s.send(7);
        s.send(9);
        kill();

        expect(['fusebox', 'fusebox']).toEqual(out);
    });

    it('should mergeNonSimultaneous', () => {
        const s1 = new StreamSink<number>(),
            s2 = new StreamSink<number>(),
            out : number[] = [];

        const kill = s2.orElse(s1)
                    .listen(a => out.push(a));

        s1.send(7);
        s2.send(9);
        s1.send(8);
        kill();

        expect([7,9,8]).toEqual(out);
    });
});
