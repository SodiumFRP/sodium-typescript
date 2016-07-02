import { Lambda1, Lambda2, Stream, StreamSink, StreamLoop, Cell, CellSink,
         Tuple2, transactionally, Unit } from "./sodium";

function fail(err : string) : void {
    throw err;
}

function assertEquals<A>(sb: A, is : A) : void {
    if (JSON.stringify(is) != JSON.stringify(sb))
        fail("expected: "+sb+"\n       got: "+is);
}

function shouldThrow(substr : string, f : () => void) : void {
    try {
        f();
    }
    catch (err) {
        if (err.search(substr) >= 0)
            return;
        else
            fail("unexpected exception: "+err);
    }
    fail("should throw exception");
}

let current_test : string = null;

function test(name : string, t : () => void)
{
    current_test = name;
    let pass = true;
    try {
        t();
        current_test = null
        console.log(name + " - PASS");
    }
    catch (err) {
        console.log(name + " - FAIL:");
        console.log("  " + err);
        if (err.stack !== undefined)
            console.log(err.stack);
        pass = false;
        current_test = null;
    }
}

test("map", () => {
    let s = new StreamSink<number>();
    let out : number[] = [];
    let kill = s.map((a : number) => a + 1).listen((a : number) => {
        out.push(a);
    });
    s.send(7);
    kill();
    assertEquals([8], out);
});

test("send_with_no_listener_1", () => {
    shouldThrow("invoked before listeners",
        () => {
            let s = new StreamSink<number>();
            s.send(7);
        }
    );
});

test("send_with_no_listener_2", () => {
    shouldThrow("invoked before listeners",
        () => {
            let s = new StreamSink<number>();
            let out : number[] = [];
            let kill = s.map((a : number) => a + 1).listen((a : number) => {
                out.push(a);
            });
            s.send(7);
            kill();
            s.send(9);  // should throw
        }
    );
});

test("map_track", () => {
    let s = new StreamSink<number>(),
        t = new StreamSink<string>(),
        out : number[] = [],
        kill = s.map(new Lambda1((a : number) => a + 1, [t]))
                .listen((a : number) => {
                    out.push(a);
                });
    s.send(7);
    t.send("banana");
    kill();
    let x : number[] = [];
    x.push(8);
    assertEquals([8], out);
});

test("mapTo", () => {
    let s = new StreamSink<number>(),
        out : string[] = [],
        kill = s.mapTo("fusebox").listen((a : string) => {
            out.push(a);
        });
    s.send(7);
    s.send(9);
    kill();
    assertEquals(["fusebox", "fusebox"], out);
});

test("mergeNonSimultaneous", () => {
    let s1 = new StreamSink<number>(),
        s2 = new StreamSink<number>(),
        out : number[] = [];
    let kill = s2.orElse(s1).listen((a : number) => {
        out.push(a);
    });
    s1.send(7);
    s2.send(9);
    s1.send(8);
    kill();
    assertEquals([7,9,8], out);
});

test("mergeSimultaneous", () => {
    let s1 = new StreamSink<number>((l : number, r : number) => { return r; }),
        s2 = new StreamSink<number>((l : number, r : number) => { return r; }),
        out : number[] = [],
        kill = s2.orElse(s1).listen((a : number) => {
            out.push(a);
        });
    transactionally<void>(() => {
        s1.send(7);
        s2.send(60);
    });
    transactionally<void>(() => {
            s1.send(9);
        });
    transactionally<void>(() => {
        s1.send(7);
        s1.send(60);
        s2.send(8);
        s2.send(90);
    });
    transactionally<void>(() => {
        s2.send(8);
        s2.send(90);
        s1.send(7);
        s1.send(60);
    });
    transactionally<void>(() => {
        s2.send(8);
        s1.send(7);
        s2.send(90);
        s1.send(60);
    });
    kill();
    assertEquals([60,9,90,90,90], out);
});

test("coalesce", () => {
    let s = new StreamSink<number>((a : number, b : number) => { return a+b; }),
        out : number[] = [],
        kill = s.listen((a : number) => {
            out.push(a);
        });
    transactionally<void>(() => {
        s.send(2);
    });
    transactionally<void>(() => {
        s.send(8);
        s.send(40);
    });
    kill();
    assertEquals([2, 48], out);
});

test("filter", () => {
    let s = new StreamSink<number>(),
        out : number[] = [],
        kill = s.filter((a : number) => { return a < 10; }).listen((a : number) => {
            out.push(a);
        });
    s.send(2);
    s.send(16);
    s.send(9);
    kill();
    assertEquals([2, 9], out);
});

test("filterNotNull", () => {
    let s = new StreamSink<string>(),
        out : string[] = [],
        kill = s.filterNotNull().listen((a : string) => {
            out.push(a);
        });
    s.send("tomato");
    s.send(null);
    s.send("peach");
    kill();
    assertEquals(["tomato", "peach"], out);
});

test("merge2", () => {
    let sa = new StreamSink<number>(),
        sb = sa.map((x : number) => { return Math.floor(x / 10); })
                   .filter((x : number) => { return x != 0; }),
        sc = sa.map((x : number) => { return x % 10; }).merge(sb,
            (x : number, y : number) => { return x+y; }),
        out : number[] = [],
        kill = sc.listen((a : number) => {
            out.push(a);
        });
    sa.send(2);
    sa.send(52);
    kill();
    assertEquals([2, 7], out);
});

test("loopStream", () => {
    let sa = new StreamSink<number>(),
        sc = transactionally(() => {
            let sb = new StreamLoop<number>(),
                sc_ = sa.map((x : number) => { return x % 10; }).merge(sb,
                    (x : number, y : number) => { return x+y; }),
                sb_out = sa.map((x : number) => { return Math.floor(x / 10); })
                           .filter((x : number) => { return x != 0; });
            sb.loop(sb_out);
            return sc_;
        }),
        out : number[] = [],
        kill = sc.listen((a : number) => {
            out.push(a);
        });
    sa.send(2);
    sa.send(52);
    kill();
    assertEquals([2, 7], out);
});

test("gate", () => {
    let s = new StreamSink<string>(),
        pred = new CellSink<boolean>(true),
        out : string[] = [],
        kill = s.gate(pred).listen((a : string) => {
            out.push(a);
        });
    s.send("H");
    pred.send(false);
    s.send('O');
    pred.send(true);
    s.send('I');
    kill();
    assertEquals(["H", "I"], out);
});

test("collect", () => {
    let ea = new StreamSink<number>(),
        out : number[] = [],
        sum = ea.collect(0, (a : number, s : number) => {
                return new Tuple2(a+s+100, a+s);
            }),
        kill = sum.listen((a : number) => { out.push(a); });
    ea.send(5);
    ea.send(7);
    ea.send(1);
    ea.send(2);
    ea.send(3);
    kill();
    assertEquals([105,112,113,115,118], out);
});

test("accum", () => {
    let ea = new StreamSink<number>(),
        out : number[] = [],
        sum = ea.accum(100, (a : number, s : number) => { return a + s; }),
        kill = sum.listen((a : number) => { out.push(a); });
    ea.send(5);
    ea.send(7);
    ea.send(1);
    ea.send(2);
    ea.send(3);
    kill();
    assertEquals([100,105,112,113,115,118], out);
});
