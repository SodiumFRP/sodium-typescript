import { Lambda1, Lambda2, Stream, StreamSink, Cell, transactionally } from "./sodium";

function fail(err : string) : void {
    throw err;
}

function assertEqual<A>(sb: A, is : A) : void {
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
    assertEqual([8], out);
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
    let s = new StreamSink<number>();
    let t = new StreamSink<string>();
    let out : number[] = [];
    let kill = s.map(new Lambda1((a : number) => a + 1, [t]))
                .listen((a : number) => {
                    out.push(a);
                });
    s.send(7);
    t.send("banana");
    kill();
    let x : number[] = [];
    x.push(8);
    assertEqual([8], out);
});

test("mapTo", () => {
    let s = new StreamSink<number>();
    let out : string[] = [];
    let kill = s.mapTo("fusebox").listen((a : string) => {
        out.push(a);
    });
    s.send(7);
    s.send(9);
    kill();
    assertEqual(["fusebox", "fusebox"], out);
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
    assertEqual([7,9,8], out);
});

test("mergeSimultaneous", () => {
    let s1 = new StreamSink<number>((l : number, r : number) => { return r; }),
        s2 = new StreamSink<number>((l : number, r : number) => { return r; }),
        out : number[] = [];
    let kill = s2.orElse(s1).listen((a : number) => {
        out.push(a);
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
    assertEqual([7,9,8], out);
});
