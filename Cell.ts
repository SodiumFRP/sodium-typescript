import { Source, Vertex } from "./Vertex";
import { Transaction, transactionally, currentTransaction } from "./Transaction";
import { Lazy } from "./Lazy";
import { Listener } from "./Listener";
import { Stream } from "./Stream";
import { Operational } from "./Operational";

export class Cell<A> {
	private str : Stream<A>;
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

    getVertex__() : Vertex {
        return null;
    }

    getStream__() : Stream<A> {  // TO DO: Figure out how to hide this
        return this.str;
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

	/**
	 * Listen for updates to the value of this cell. This is the observer pattern. The
	 * returned {@link Listener} has a {@link Listener#unlisten()} method to cause the
	 * listener to be removed. This is an OPERATIONAL mechanism is for interfacing between
	 * the world of I/O and for FRP.
	 * @param h The handler to execute when there's a new value.
	 *   You should make no assumptions about what thread you are called on, and the
	 *   handler should not block. You are not allowed to use {@link CellSink#send(Object)}
	 *   or {@link StreamSink#send(Object)} in the handler.
	 *   An exception will be thrown, because you are not meant to use this to create
	 *   your own primitives.
     */
    listen(h : (a : A) => void) : () => void {
        return transactionally(() => {
            return Operational.value(this).listen(h);
        });
    }
}
