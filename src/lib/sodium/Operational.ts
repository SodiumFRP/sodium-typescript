import { Stream, StreamWithSend } from "./Stream";
import { Cell } from "./Cell";
import { Transaction } from "./Transaction";
import { Unit } from "./Unit";
import { Source, Vertex } from "./Vertex";

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
        /*  Don't think this is needed
        const out = new StreamWithSend<A>(null);
        out.setVertex__(new Vertex("updates", 0, [
                new Source(
                    c.getStream__().getVertex__(),
                    () => {
                        return c.getStream__().listen_(out.getVertex__(), (a : A) => {
                            out.send_(a);
                        }, false);
                    }
                ),
                new Source(
                    c.getVertex__(),
                    () => {
                        return () => { };
                    }
                )
            ]
        ));
        return out;
        */
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
        return Transaction.run(() => {
            const sSpark = new StreamWithSend<Unit>();
            Transaction.currentTransaction.prioritized(sSpark.getVertex__(), () => {
                sSpark.send_(Unit.UNIT);
            });
            const sInitial = sSpark.snapshot1(c);
            return Operational.updates(c).orElse(sInitial);
        });
    }

	/**
	 * Push each event onto a new transaction guaranteed to come before the next externally
	 * initiated transaction. Same as {@link split(Stream)} but it works on a single value.
	 */
	static defer<A>(s : Stream<A>) : Stream<A> {
	    return Operational.split<A>(s.map((a : A) => {
	        return [a];
	    }));
    }

	/**
	 * Push each event in the list onto a newly created transaction guaranteed
	 * to come before the next externally initiated transaction. Note that the semantics
	 * are such that two different invocations of split() can put events into the same
	 * new transaction, so the resulting stream's events could be simultaneous with
	 * events output by split() or {@link defer(Stream)} invoked elsewhere in the code.
	 */
	static split<A>(s : Stream<Array<A>>) : Stream<A> {
	    const out = new StreamWithSend<A>(null);
        out.setVertex__(new Vertex("split", 0, [
                new Source(
                    s.getVertex__(),
                    () => {
                        out.getVertex__().childrn.push(s.getVertex__());
                        let cleanups: (()=>void)[] = [];
                        cleanups.push(
                            s.listen_(Vertex.NULL, (as : Array<A>) => {
                                for (let i = 0; i < as.length; i++) {
                                    Transaction.currentTransaction.post(i, () => {
                                        Transaction.run(() => {
                                            out.send_(as[i]);
                                        });
                                    });
                                }
                            }, false)
                        );
                        cleanups.push(() => {
                            let chs = out.getVertex__().childrn;
                            for (let i = chs.length-1; i >= 0; --i) {
                                if (chs[i] == s.getVertex__()) {
                                    chs.splice(i, 1);
                                    break;
                                }
                            }
                        });
                        return () => {
                            cleanups.forEach(cleanup => cleanup());
                            cleanups.splice(0, cleanups.length);
                        }
                    }
                )
            ]
        ));
        return out;
    }
}
