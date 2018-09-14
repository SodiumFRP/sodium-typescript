import {
    StreamSink,
    getTotalRegistrations,
    Transaction,
    CellLoop
} from '../../lib/Lib';

afterEach(() => {
  if (getTotalRegistrations() != 0) {
    throw new Error('listeners were not deregistered');
  }
});

//this passes
test('multiple loop: stream in transaction', done => {
    const cResult = Transaction.run(() => {
        const s = new StreamSink<number>();

        const c1 = new CellLoop<number>();
        const c2 = new CellLoop<number>();
        c1.loop(
            s.snapshot3(c1, c2, (n1, n2, n3) => n1 * n2 * n3).hold(2)
        );

        c2.loop(
            s.snapshot3(c1, c2, (n1, n2, n3) => n1 * n2 * n3).hold(2)
        );


        s.send(4);

        return c1;
    });


    //need to delay the handler so it can call kill
    const kill = cResult.listen(n => setTimeout(() => onValue(n), 0)); 

    const onValue = n => {
        expect(16).toBe(n);
        kill();
        done();
    }
});


//this also passes
test('multiple loop: stream out of transaction', done => {
    const s = new StreamSink<number>();

    const cResult = Transaction.run(() => {

        const c1 = new CellLoop<number>();
        const c2 = new CellLoop<number>();
        c1.loop(
            s.snapshot3(c1, c2, (n1, n2, n3) => n1 * n2 * n3).hold(2)
        );

        c2.loop(
            s.snapshot3(c1, c2, (n1, n2, n3) => n1 * n2 * n3).hold(2)
        );


        s.send(4);

        return c1;
    });


    //need to delay the handler so it can call kill
    const kill = cResult.listen(n => setTimeout(() => onValue(n), 0)); 

    const onValue = n => {
        expect(16).toBe(n);
        kill();
        done();
    }
});

//this fails!
test('multiple loop: stream and send out of transaction', done => {
    const s = new StreamSink<number>();
    const cResult = Transaction.run(() => {

        const c1 = new CellLoop<number>();
        const c2 = new CellLoop<number>();
        c1.loop(
            s.snapshot3(c1, c2, (n1, n2, n3) => n1 * n2 * n3).hold(2)
        );

        c2.loop(
            s.snapshot3(c1, c2, (n1, n2, n3) => n1 * n2 * n3).hold(2)
        );

        return c1;
    });


    //need to delay the handler so it can call kill - due to dummy listener below, use a list
    const kill = cResult.listen(n => setTimeout(() => onValue(n), 0))

    //It fails with "send invoked before listeners were registered"
    //Even though this is clearly after the listen()
    
    //Uncomment this dummy listener for a "fix" (remember to kill it below too)
    //const killDummy = s.listen(() => {});
    
    s.send(4);


    //now we're getting the initial cell value too so we need to collect it
    const out = [];
    const onValue = n => {
        out.push(n);
        if(out.length == 2) {
            expect([2, 16]).toEqual(out);
            kill();
            //killDummy();
            done();
        }
    }
});
