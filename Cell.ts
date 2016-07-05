import { Lambda1, Lambda1_deps, Lambda1_toFunction,
         Lambda2, Lambda2_deps, Lambda2_toFunction,
         Lambda3, Lambda3_deps, Lambda3_toFunction,
         Lambda4, Lambda4_deps, Lambda4_toFunction,
         Lambda5, Lambda5_deps, Lambda5_toFunction,
         Lambda6, Lambda6_deps, Lambda6_toFunction,
         toSources } from "./Lambda";
import { Source, Vertex } from "./Vertex";
import { Transaction, transactionally, currentTransaction } from "./Transaction";
import { Lazy } from "./Lazy";
import { Listener } from "./Listener";
import { Stream, StreamWithSend } from "./Stream";
import { Operational } from "./Operational";

class LazySample<A> {
    constructor(cell : Cell<A>) {
        this.cell = cell;
    }
    cell : Cell<A>;
    hasValue : boolean = false;
    value : A = null;
}

class ApplyState<A,B> {
    constructor() {}
    f : (a : A) => B = null;
    f_present : boolean = false;
    a : A = null;
    a_present : boolean = false;
}

export class Cell<A> {
	private str : Stream<A>;
	protected value : A;
	protected valueUpdate : A;
	private cleanup : () => void;
	protected lazyInitValue : Lazy<A>;  // Used by LazyCell
	private vertex : Vertex;

    constructor(initValue : A, str? : Stream<A>) {
        this.value = initValue;
        if (!str) {
            this.str = new Stream<A>();
            this.vertex = new Vertex(0, []);
        }
        else
            transactionally(() => this.setStream(str));
    }

    protected setStream(str : Stream<A>) {
        this.str = str;
        const me = this,
              src = new Source(
                str.getVertex__(),
                () => {
                    return str.listen_(me.vertex, (a : A) => {
                        if (me.valueUpdate == null) {
                            currentTransaction.last(() => {
                                me.value = me.valueUpdate;
                                me.lazyInitValue = null;
                                me.valueUpdate = null;
                            });
                        }
                        me.valueUpdate = a;
                    }, false);
                }
            );
        this.vertex = new Vertex(0, [src]);
        // We do a trick here of registering the source for the duration of the current
        // transaction so that we are guaranteed to catch any stream events that
        // occur in the same transaction.
        src.register(Vertex.NULL);
        currentTransaction.last(() => {
            src.deregister(Vertex.NULL);
        });
    }

    getVertex__() : Vertex {
        return this.vertex;
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
        return transactionally(() => { return this.sampleNoTrans__(); });
    }

    sampleNoTrans__() : A {  // TO DO figure out how to hide this
        return this.value;
    }

    /**
     * A variant of {@link sample()} that works with {@link CellLoop}s when they haven't been looped yet.
     * It should be used in any code that's general enough that it could be passed a {@link CellLoop}.
     * @see Stream#holdLazy(Lazy) Stream.holdLazy()
     */
    sampleLazy() : Lazy<A> {
        const me = this;
        return transactionally(() => me.sampleLazyNoTrans__());
    }

    sampleLazyNoTrans__() : Lazy<A> {  // TO DO figure out how to hide this
        const me = this,
            s = new LazySample<A>(me);
        currentTransaction.last(() => {
            s.value = me.valueUpdate != null ? me.valueUpdate : me.sampleNoTrans__();
            s.hasValue = true;
            s.cell = null;
        });
        return new Lazy<A>(() => {
            if (s.hasValue)
                return s.value;
            else
                return s.cell.sample();
        });
    }

    /**
     * Transform the cell's value according to the supplied function, so the returned Cell
     * always reflects the value of the function applied to the input Cell's value.
     * @param f Function to apply to convert the values. It must be <em>referentially transparent</em>.
     */
    map<B>(f : ((a : A) => B) | Lambda1<A,B>) : Cell<B> {
        const c = this;
        return transactionally(() =>
            Operational.updates(c).map(f).holdLazy(c.sampleLazy().map(Lambda1_toFunction(f)))
        );
    }

	/**
	 * Lift a binary function into cells, so the returned Cell always reflects the specified
	 * function applied to the input cells' values.
	 * @param fn Function to apply. It must be <em>referentially transparent</em>.
	 */
	lift<B,C>(b : Cell<B>,
	          fn0 : ((a : A, b : B) => C) |
	                Lambda2<A,B,C>) : Cell<C> {
        const fn = Lambda2_toFunction(fn0),
            cf = this.map(aa => bb => fn(aa, bb));
        return Cell.apply(cf, b,
            toSources(Lambda2_deps(fn0)));
	}

	/**
	 * Lift a ternary function into cells, so the returned Cell always reflects the specified
	 * function applied to the input cells' values.
	 * @param fn Function to apply. It must be <em>referentially transparent</em>.
	 */
	lift3<B,C,D>(b : Cell<B>, c : Cell<C>,
	             fn0 : ((a : A, b : B, c : C) => D) |
	                   Lambda3<A,B,C,D>) : Cell<D> {
        const fn = Lambda3_toFunction(fn0),
            cf = this.map(aa => bb => cc => fn(aa, bb, cc));
        return Cell.apply(
                   Cell.apply<B, (c : C) => D>(cf, b),
                   c,
                   toSources(Lambda3_deps(fn0)));
	}

	/**
	 * Lift a quaternary function into cells, so the returned Cell always reflects the specified
	 * function applied to the input cells' values.
	 * @param fn Function to apply. It must be <em>referentially transparent</em>.
	 */
	lift4<B,C,D,E>(b : Cell<B>, c : Cell<C>, d : Cell<D>,
	               fn0 : ((a : A, b : B, c : C, d : D) => E) |
	                     Lambda4<A,B,C,D,E>) : Cell<E> {
        const fn = Lambda4_toFunction(fn0),
            cf = this.map(aa => bb => cc => dd => fn(aa, bb, cc, dd));
        return Cell.apply(
                   Cell.apply(
                       Cell.apply<B, (c : C) => (d : D) => E>(cf, b),
                       c),
                   d,
                   toSources(Lambda4_deps(fn0)));
	}

	/**
	 * Lift a 5-argument function into cells, so the returned Cell always reflects the specified
	 * function applied to the input cells' values.
	 * @param fn Function to apply. It must be <em>referentially transparent</em>.
	 */
	lift5<B,C,D,E,F>(b : Cell<B>, c : Cell<C>, d : Cell<D>, e : Cell<E>,
	                 fn0 : ((a : A, b : B, c : C, d : D, e : E) => F) |
	                       Lambda5<A,B,C,D,E,F>) : Cell<F> {
        const fn = Lambda5_toFunction(fn0),
            cf = this.map(aa => bb => cc => dd => ee => fn(aa, bb, cc, dd, ee));
        return Cell.apply(
                   Cell.apply(
                       Cell.apply(
                           Cell.apply<B, (c : C) => (d : D) => (e : E) => F>(cf, b),
                           c),
                       d),
                   e,
                   toSources(Lambda5_deps(fn0)));
	}

	/**
	 * Lift a 6-argument function into cells, so the returned Cell always reflects the specified
	 * function applied to the input cells' values.
	 * @param fn Function to apply. It must be <em>referentially transparent</em>.
	 */
	lift6<B,C,D,E,F,G>(b : Cell<B>, c : Cell<C>, d : Cell<D>, e : Cell<E>, f : Cell<F>,
	                   fn0 : ((a : A, b : B, c : C, d : D, e : E, f : F) => G) |
	                         Lambda6<A,B,C,D,E,F,G>) : Cell<G> {
        const fn = Lambda6_toFunction(fn0),
            cf = this.map(aa => bb => cc => dd => ee => ff => fn(aa, bb, cc, dd, ee, ff));
        return Cell.apply(
                   Cell.apply(
                       Cell.apply(
                           Cell.apply(
                               Cell.apply<B, (c : C) => (d : D) => (e : E) => (f : F) => G>(cf, b),
                               c),
                           d),
                       e),
                   f,
                   toSources(Lambda6_deps(fn0)));
	}

	/**
	 * Apply a value inside a cell to a function inside a cell. This is the
	 * primitive for all function lifting.
	 */
	static apply<A,B>(cf : Cell<(a : A) => B>, ca : Cell<A>, sources? : Source[]) : Cell<B> {
    	return transactionally(() => {
    	    const state = new ApplyState<A,B>(),
                out = new StreamWithSend<B>(),
                cf_value = Operational.value(cf),
                ca_value = Operational.value(ca),
                src1 = new Source(
                        cf_value.getVertex__(),
                        () => {
                            return cf_value.listen_(out.getVertex__(), (f : (a : A) => B) => {
                                state.f = f;
                                state.f_present = true;
                                if (state.a_present)
                                    out.send_(state.f(state.a));
                            }, false);
                        }
                    ),
                src2 = new Source(
                        ca_value.getVertex__(),
                        () => {
                            return ca_value.listen_(out.getVertex__(), (a : A) => {
                                state.a = a;
                                state.a_present = true;
                                if (state.f_present)
                                    out.send_(state.f(state.a));
                            }, false);
                        }
                    );
            out.setVertex__(new Vertex(0,
                [src1, src2].concat(sources ? sources : []) 
            ));
            return out.coalesce__((l, r) => r).holdLazy(new Lazy<B>(() =>
                    cf.sampleNoTrans__()(ca.sampleNoTrans__())
                ));
        });
	}

	/**
	 * Unwrap a cell inside another cell to give a time-varying cell implementation.
	 */
    static switchC<A>(bba : Cell<Cell<A>>) : Cell<A> {
	    return transactionally(() => {
            const za = bba.sampleLazy().map((ba : Cell<A>) => ba.sample()),
                out = new StreamWithSend<A>();
            let currentKill : () => void = null;
            const bba_value = Operational.value(bba);
            out.setVertex__(new Vertex(0, [
                    new Source(
                        bba_value.getVertex__(),
                        () => {
                            return bba_value.listen_(out.getVertex__(), (ba : Cell<A>) => {
                                // Note: If any switch takes place during a transaction, then the
                                // lastFiringOnly() below will always cause a sample to be fetched
                                // from the one we just switched to. So anything from the old input cell
                                // that might have happened during this transaction will be suppressed.
                                if (currentKill !== null)
                                    currentKill();
                                currentKill = Operational.value(ba).listen_(out.getVertex__(),
                                    (a : A) => out.send_(a), false);
                            }, false);
                        }
                    )
                ]));
            return out.coalesce__((l, r) => r).holdLazy(za);
        });
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
