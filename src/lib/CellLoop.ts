import { Cell } from "./Cell";
import { Lazy } from "./Lazy";
import { LazyCell } from "./LazyCell";
import { Transaction } from "./Transaction";
import { StreamLoop } from "./Stream";

/**
 * A forward reference for a {@link Cell} equivalent to the Cell that is referenced.
 */
export class CellLoop<A> extends LazyCell<A> {
    constructor() {
    	super(null, new StreamLoop<A>());
    }

    /**
     * Resolve the loop to specify what the CellLoop was a forward reference to. It
     * must be invoked inside the same transaction as the place where the CellLoop is used.
     * This requires you to create an explicit transaction with {@link Transaction#run(Lambda0)}
     * or {@link Transaction#runVoid(Runnable)}.
     */
    loop(a_out : Cell<A>) : void {
        const me = this;
        Transaction.transactionally(() => {
            (<StreamLoop<A>>me.getStream__()).loop(a_out.getStream__());
            me.lazyInitValue = a_out.sampleLazy();
        });
    }

    sampleNoTrans__() : A
    {
        if (!(<StreamLoop<A>>this.getStream__()).assigned__)
            throw new Error("CellLoop sampled before it was looped");
        return super.sampleNoTrans__();
    }
}
