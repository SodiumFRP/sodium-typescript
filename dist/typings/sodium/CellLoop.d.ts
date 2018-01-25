import { Cell } from "./Cell";
import { LazyCell } from "./LazyCell";
/**
 * A forward reference for a {@link Cell} equivalent to the Cell that is referenced.
 */
export declare class CellLoop<A> extends LazyCell<A> {
    constructor();
    /**
     * Resolve the loop to specify what the CellLoop was a forward reference to. It
     * must be invoked inside the same transaction as the place where the CellLoop is used.
     * This requires you to create an explicit transaction with {@link Transaction#run(Lambda0)}
     * or {@link Transaction#runVoid(Runnable)}.
     */
    loop(a_out: Cell<A>): void;
    sampleNoTrans__(): A;
}
