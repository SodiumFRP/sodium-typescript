import { Stream } from "./Stream";
import { Cell } from "./Cell";
import { StreamWithSend } from "./Stream";
import { transactionally, currentTransaction } from "./Transaction";
import { Unit } from "./Unit";

export class Operational {
    /**
     * A stream that gives the updates/steps for a {@link Cell}.
     * <P>
     * This is an OPERATIONAL primitive, which is not part of the main Sodium
     * API. It breaks the property of non-detectability of cell steps/updates.
     * The rule with this primitive is that you should only use it in functions
     * that do not allow the caller to detect the cell updates.
     */
    static updates<A>(c : Cell<A>) : Stream<A> {
        return c.getStream__();
    }

    /**
     * A stream that is guaranteed to fire once in the transaction where value() is invoked, giving
     * the current value of the cell, and thereafter behaves like {@link updates(Cell)},
     * firing for each update/step of the cell's value.
     * <P>
     * This is an OPERATIONAL primitive, which is not part of the main Sodium
     * API. It breaks the property of non-detectability of cell steps/updates.
     * The rule with this primitive is that you should only use it in functions
     * that do not allow the caller to detect the cell updates.
     */
    static value<A>(c : Cell<A>) : Stream<A> {
        return transactionally(() => {
            let sSpark = new StreamWithSend<Unit>();
            currentTransaction.prioritized(sSpark.getVertex__(), () => {
                sSpark.send_(Unit.UNIT);
            });
            let sInitial = sSpark.snapshot1(c);
            return sInitial.merge(this.updates(c), (l : A, r : A) => { return r; });
        });
    }
}
