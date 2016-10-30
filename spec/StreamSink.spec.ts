///<reference path="./typings.d.ts"/>

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
} from '../src/lib/Sodium';

describe('StreamSink', () => {

    afterEach(() => {
        if (getTotalRegistrations() != 0) {
            throw new Error('listeners were not deregistered');
        }
    });

    it('should test map()', () => {
        const s = new StreamSink<number>();
        const out : number[] = [];
        const kill = s.map(a => a + 1)
                    .listen(a => out.push(a));
        s.send(7);
        kill();

        expect([8]).toEqual(out);
    });

    it('should throw an error send_with_no_listener_1', () => {
        const s = new StreamSink<number>();

        try {
            s.send(7);
        } catch (e) {
            expect(e.message).toBe('send() was invoked before listeners were registered');
        }

    });

    it('should (not?) throw an error send_with_no_listener_2', () => {
        const s = new StreamSink<number>();
        const out : number[] = [];
        const kill = s.map(a => a + 1)
                    .listen(a => out.push(a));

        s.send(7);
        kill();

        try {
            // TODO: the message below is bit misleading, need to verify with Stephen B.
            //       - "this should not throw, because once() uses this mechanism"
            s.send(9);
        } catch (e) {
            expect(e.message).toBe('send() was invoked before listeners were registered');
        }
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

    it('should test mapTo()', () => {
        const s = new StreamSink<number>(),
        out : string[] = [],
        kill = s.mapTo("fusebox")
                .listen(a => out.push(a));

        s.send(7);
        s.send(9);
        kill();

        expect(['fusebox', 'fusebox']).toEqual(out);
    });

    it('should do mergeNonSimultaneous', () => {
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

    it('should do mergeSimultaneous', () => {
        const s1 = new StreamSink<number>((l : number, r : number) => { return r; }),
            s2 = new StreamSink<number>((l : number, r : number) => { return r; }),
            out : number[] = [],
            kill = s2.orElse(s1)
                 .listen(a => out.push(a));

        Transaction.run<void>(() => {
            s1.send(7);
            s2.send(60);
        });
        Transaction.run<void>(() => {
                s1.send(9);
            });
        Transaction.run<void>(() => {
            s1.send(7);
            s1.send(60);
            s2.send(8);
            s2.send(90);
        });
        Transaction.run<void>(() => {
            s2.send(8);
            s2.send(90);
            s1.send(7);
            s1.send(60);
        });
        Transaction.run<void>(() => {
            s2.send(8);
            s1.send(7);
            s2.send(90);
            s1.send(60);
        });
        kill();

        expect([60,9,90,90,90]).toEqual(out);
    });

    it('should do coalesce', () => {
        const s = new StreamSink<number>((a, b) => a+b),
        out : number[] = [],
        kill = s.listen(a => out.push(a));

        Transaction.run<void>(() => {
            s.send(2);
        });
        Transaction.run<void>(() => {
            s.send(8);
            s.send(40);
        });
        kill();

        expect([2, 48]).toEqual(out);
    });

    it('should test filter()', () => {
        const s = new StreamSink<number>(),
        out : number[] = [],
        kill = s.filter(a => a < 10)
                .listen(a => out.push(a));

        s.send(2);
        s.send(16);
        s.send(9);
        kill();

        expect([2, 9]).toEqual(out);
    });

    it('should test filterNotNull()', () => {
        const s = new StreamSink<string>(),
        out : string[] = [],
        kill = s.filterNotNull()
                .listen(a => out.push(a));

        s.send("tomato");
        s.send(null);
        s.send("peach");
        kill();

        expect(["tomato", "peach"]).toEqual(out);
    });

    it('should test merge()', () => {
        const sa = new StreamSink<number>(),
        sb = sa.map(x => Math.floor(x / 10))
                .filter(x => x != 0),
        sc = sa.map(x => x % 10)
                .merge(sb, (x,y) => x+y),
        out : number[] = [],
        kill = sc.listen(a => out.push(a));

        sa.send(2);
        sa.send(52);
        kill();

        expect([2, 7]).toEqual(out);
    });

    it('should test loop()', () => {
        const sa = new StreamSink<number>(),
            sc = Transaction.run(() => {
                const sb = new StreamLoop<number>(),
                    sc_ = sa.map(x => x % 10).merge(sb,
                        (x, y) => x+y),
                    sb_out = sa.map(x => Math.floor(x / 10))
                            .filter(x => x != 0);
                sb.loop(sb_out);
                return sc_;
            }),
            out : number[] = [],
            kill = sc.listen(a => out.push(a));

        sa.send(2);
        sa.send(52);
        kill();

        expect([2, 7]).toEqual(out);
    });

    it('should test gate()', () => {
        const s = new StreamSink<string>(),
            pred = new CellSink<boolean>(true),
            out : string[] = [],
            kill = s.gate(pred).listen(a => out.push(a));

        s.send("H");
        pred.send(false);
        s.send('O');
        pred.send(true);
        s.send('I');
        kill();

        expect(["H", "I"]).toEqual(out);
    });

    it('should test collect()', () => {
        const ea = new StreamSink<number>(),
            out : number[] = [],
            sum = ea.collect(0, (a, s) => new Tuple2(a+s+100, a+s)),
            kill = sum.listen(a => out.push(a));

        ea.send(5);
        ea.send(7);
        ea.send(1);
        ea.send(2);
        ea.send(3);
        kill();

        expect([105,112,113,115,118]).toEqual(out);
    });

    it('should test accum()', () => {
        const ea = new StreamSink<number>(),
            out : number[] = [],
            sum = ea.accum(100, (a, s) => a + s),
            kill = sum.listen(a => out.push(a));

        ea.send(5);
        ea.send(7);
        ea.send(1);
        ea.send(2);
        ea.send(3);
        kill();

        expect([100,105,112,113,115,118]).toEqual(out);
    });

    it('should test once()', () => {
        const s = new StreamSink<string>(),
        out : string[] = [],
        kill = s.once().listen(a => out.push(a));

        s.send("A");
        s.send("B");
        s.send("C");
        kill();

        expect(["A"]).toEqual(out);
    });

    it('should test defer()', () => {
        const s = new StreamSink<string>(),
        c = s.hold(" "),
        out : string[] = [],
        kill = Operational.defer(s).snapshot1(c)
               .listen(a => out.push(a));

        s.send("C");
        s.send("B");
        s.send("A");
        kill();

        expect(["C","B","A"]).toEqual(out);
    });

    it('should test hold()', () => {
        const s = new StreamSink<number>(),
        c = s.hold(0),
        out : number[] = [],
        kill = Operational.updates(c)
              .listen(a => out.push(a));

        s.send(2);
        s.send(9);
        kill();

        expect([2, 9]).toEqual(out);
    });

    it('should do holdIsDelayed', () => {
        const s = new StreamSink<number>(),
        h = s.hold(0),
        sPair = s.snapshot(h, (a, b) => a + " " + b),
        out : string[] = [],
        kill = sPair.listen(a => out.push(a));

        s.send(2);
        s.send(3);
        kill();

        expect(["2 0", "3 2"]).toEqual(out);
    });

    it('should test switchC()', () => {
        class SC {
            constructor(a : string, b : string, sw : string) {
                this.a = a;
                this.b = b;
                this.sw = sw;
            }

            a : string;
            b : string;
            sw : string;
        }

        const ssc = new StreamSink<SC>(),
        // Split each field out of SC so we can update multiple cells in a
        // single transaction.
        ca = ssc.map(s => s.a).filterNotNull().hold("A"),
        cb = ssc.map(s => s.b).filterNotNull().hold("a"),
        csw_str = ssc.map(s => s.sw).filterNotNull().hold("ca"),
        // ****
        // NOTE! Because this lambda contains references to Sodium objects, we
        // must declare them explicitly using lambda1() so that Sodium knows
        // about the dependency, otherwise it can't manage the memory.
        // ****
        csw = csw_str.map(lambda1(s => s == "ca" ? ca : cb, [ca, cb])),
        co = Cell.switchC(csw),
        out : string[] = [],
        kill = co.listen(c => out.push(c));

        ssc.send(new SC("B", "b", null));
        ssc.send(new SC("C", "c", "cb"));
        ssc.send(new SC("D", "d", null));
        ssc.send(new SC("E", "e", "ca"));
        ssc.send(new SC("F", "f", null));
        ssc.send(new SC(null, null, "cb"));
        ssc.send(new SC(null, null, "ca"));
        ssc.send(new SC("G", "g", "cb"));
        ssc.send(new SC("H", "h", "ca"));
        ssc.send(new SC("I", "i", "ca"));
        kill();

        expect(["A", "B", "c", "d", "E", "F", "f", "F", "g", "H", "I"]).toEqual(out);

    });

    it('should test switchS()', () => {
        class SS {
            constructor(a : string, b : string, sw : string) {
                this.a = a;
                this.b = b;
                this.sw = sw;
            }

            a : string;
            b : string;
            sw : string;
        }

        const sss = new StreamSink<SS>(),
            sa = sss.map(s => s.a),
            sb = sss.map(s => s.b),
            csw_str = sss.map(s => s.sw).filterNotNull().hold("sa"),
            // ****
            // NOTE! Because this lambda contains references to Sodium objects, we
            // must declare them explicitly using lambda1() so that Sodium knows
            // about the dependency, otherwise it can't manage the memory.
            // ****
            csw = csw_str.map(lambda1(sw => sw == "sa" ? sa : sb, [sa, sb])),
            so = Cell.switchS(csw),
            out : string[] = [],
            kill = so.listen(x => out.push(x));

        sss.send(new SS("A", "a", null));
        sss.send(new SS("B", "b", null));
        sss.send(new SS("C", "c", "sb"));
        sss.send(new SS("D", "d", null));
        sss.send(new SS("E", "e", "sa"));
        sss.send(new SS("F", "f", null));
        sss.send(new SS("G", "g", "sb"));
        sss.send(new SS("H", "h", "sa"));
        sss.send(new SS("I", "i", "sa"));
        kill();

        expect(["A", "B", "C", "d", "e", "F", "G", "h", "I"]).toEqual(out);
    });

    it('should do switchSSimultaneous', () => {
        class SS2 {
            s : StreamSink<number> = new StreamSink<number>();
        }

        const ss1 = new SS2(),
            ss2 = new SS2(),
            ss3 = new SS2(),
            ss4 = new SS2(),
            css = new CellSink<SS2>(ss1),
            // ****
            // NOTE! Because this lambda contains references to Sodium objects, we
            // must declare them explicitly using lambda1() so that Sodium knows
            // about the dependency, otherwise it can't manage the memory.
            // ****
            so = Cell.switchS(css.map(lambda1((b : SS2) => b.s, [ss1.s, ss2.s, ss3.s, ss4.s]))),
            out : number[] = [],
            kill = so.listen(c => out.push(c));

        ss1.s.send(0);
        ss1.s.send(1);
        ss1.s.send(2);
        css.send(ss2);
        ss1.s.send(7);
        ss2.s.send(3);
        ss2.s.send(4);
        ss3.s.send(2);
        css.send(ss3);
        ss3.s.send(5);
        ss3.s.send(6);
        ss3.s.send(7);
        Transaction.run(() => {
            ss3.s.send(8);
            css.send(ss4);
            ss4.s.send(2);
        });
        ss4.s.send(9);
        kill();

        expect([0, 1, 2, 3, 4, 5, 6, 7, 8, 9]).toEqual(out);
    });

    it('should test loopCell', () => {
        const sa = new StreamSink<number>(),
        sum_out = Transaction.run(() => {
                const sum = new CellLoop<number>(),
                      sum_out_ = sa.snapshot(sum, (x, y) => x + y).hold(0);
                sum.loop(sum_out_);
                return sum_out_;
            }),
        out : number[] = [],
        kill = sum_out.listen(a => out.push(a));

        sa.send(2);
        sa.send(3);
        sa.send(1);
        kill();

        expect([0, 2, 5, 6]).toEqual(out);
        expect(6).toEqual(sum_out.sample());
    });

});
