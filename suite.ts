/// <reference path='Sodium.ts'/>

function fail(err : string) : void {
    throw err;
}

function assertEqual<A>(is : A, sb: A) : void {
    if (JSON.stringify(is) != JSON.stringify(sb))
        fail("expected: "+sb+"\n     got: "+is+"\n"+(is == sb));
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
        pass = false;
        current_test = null
    }
}

test("map", () => {
    let s = new StreamSink<number>();
    let answers : number[] = [];
    let kill = s.map((a : number) => a + 1).listen((a : number) => {
        answers.push(a);
    });
    s.send(7);
    kill();
    let x : number[] = [];
    x.push(8);
    assertEqual(answers, [8]);
});

test("send_with_no_listener", () => {
    shouldThrow("invoked before listeners",
        () => {
            let s = new StreamSink<number>();
            s.send(7);
        }
    );
});

