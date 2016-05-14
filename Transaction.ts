class Transaction {
    constructor() {
    }

    close() {
    }
}

var sodium_trans : Transaction = null;

function transactionally<A>(f : () => A) : A {
    let transWas : Transaction = sodium_trans;
    if (transWas === null)
        sodium_trans = new Transaction();
    let a : A = f();
    if (transWas === null) {
        sodium_trans.close();
        sodium_trans = null;
    }
    return a;
}

