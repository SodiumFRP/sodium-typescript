import {
    StreamSink,
    getTotalRegistrations,
    Transaction,
    CellLoop,
    lambda3
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

//very interestingly - this also passes
test('single loop: stream and send out of transaction', done => {
    const s = new StreamSink<number>();

    const cResult = Transaction.run(() => {

        const c = new CellLoop<number>();
        c.loop(
            s.snapshot(c, (n1, n2) => n1 * n2).hold(2)
        );

        return c;
    });


    //need to delay the handler so it can call kill
    const kill = cResult.listen(n => setTimeout(() => onValue(n), 0)); 

    s.send(4);
    const out = [];

    const onValue = n => {
        out.push(n);
        if(out.length === 2) {
            expect([2, 8]).toEqual(out);
            kill();
            done();
        }
    }
});


//this fails - even though all the above tests pass!
//still fails with the lambda and delay attempts
test('multiple loop w/ lambda: stream and send out of transaction', done => {
    const s = new StreamSink<number>();
    const cResult = Transaction.run(() => {

        const c1 = new CellLoop<number>();
        const c2 = new CellLoop<number>();

        //As an attempted fix, put everything in lambdas
        c1.loop(
            s.snapshot3(c1, c2, lambda3((n1, n2, n3) => n1 * n2 * n3, [s, c1, c2])).hold(2)
        );

        c2.loop(
            s.snapshot3(c1, c2, lambda3((n1, n2, n3) => n1 * n2 * n3, [s, c1, c2])).hold(2)
        );

        return c1;
    });


    //need to delay the handler so it can call kill 
    const kill = cResult.listen(n => setTimeout(() => onValue(n), 0))

    //Uncomment this dummy listener for a "fix" (remember to kill it below too)
    //const killDummy = s.listen(() => {});

    //As an attempted fix - put it in another transaction, and delay that
    setTimeout(
        () => Transaction.run(() => {
            s.send(4);
        }),
        0
    );


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

