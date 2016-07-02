import { Source, Vertex } from "./Vertex";
import { Transaction, transactionally, currentTransaction } from "./Transaction";
import { Lazy } from "./Lazy";
import { Listener } from "./Listener";
import { Stream } from "./Stream";

export class Cell<A> {
	public str : Stream<A>;   // TO DO: Work out how to hide this
	protected value : A;
	protected valueUpdate : A;
	private cleanup : () => void;
	protected lazyInitValue : Lazy<A>;  // Used by LazyCell

    constructor(initValue : A, str? : Stream<A>) {
        this.value = initValue;
        if (!str)
            this.str = new Stream<A>();
        else {
            this.str = str;
            let me = this;
            transactionally(() => {
                me.cleanup = me.str.listen_(Vertex.NULL, (a : A) => {
                        if (this.valueUpdate == null) {
                            currentTransaction.last(() => {
                                me.value = me.valueUpdate;
                                me.lazyInitValue = null;
                                me.valueUpdate = null;
                            });
                        }
                        me.valueUpdate = a;
                    }, false);
            });
        }
    }

    getVertex() : Vertex {
        return null;
    }

    /**
     * Sample the cell's current value.
     * <p>
     * It may be used inside the functions passed to primitives that apply them to {@link Stream}s,
     * including {@link Stream#map(Lambda1)} in which case it is equivalent to snapshotting the cell,
     * {@link Stream#snapshot(Cell, Lambda2)}, {@link Stream#filter(Lambda1)} and
     * {@link Stream#merge(Stream, Lambda2)}.
     * It should generally be avoided in favour of {@link listen(Handler)} so you don't
     * miss any updates, but in many circumstances it makes sense.
     */
    sample() : A {
        return transactionally(() => { return this.sampleNoTrans(); });
    }

    sampleNoTrans() : A {
        return this.value;
    }
}
