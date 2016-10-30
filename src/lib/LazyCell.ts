import { Lazy } from "./Lazy";
import { Cell } from "./Cell";
import { Stream } from "./Stream";
import { Transaction } from "./Transaction";

export class LazyCell<A> extends Cell<A> {
    constructor(lazyInitValue : Lazy<A>, str? : Stream<A>) {
        super(null, null);
        Transaction.run(() => {
            if (str)
                this.setStream(str);
            this.lazyInitValue = lazyInitValue;
        });
    }

    sampleNoTrans__() : A {  // Override
        if (this.value == null && this.lazyInitValue != null) {
            this.value = this.lazyInitValue.get();
            this.lazyInitValue = null;
        }
        return this.value;
    }
}
