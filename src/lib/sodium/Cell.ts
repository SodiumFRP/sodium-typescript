import { Lambda1, Lambda1_deps, Lambda1_toFunction,
         Lambda2, Lambda2_deps, Lambda2_toFunction,
         Lambda3, Lambda3_deps, Lambda3_toFunction,
         Lambda4, Lambda4_deps, Lambda4_toFunction,
         Lambda5, Lambda5_deps, Lambda5_toFunction,
         Lambda6, Lambda6_deps, Lambda6_toFunction,
         toSources, lambda1 } from "./Lambda";
import { Source, Vertex } from "./Vertex";
import { Transaction } from "./Transaction";
import { Lazy } from "./Lazy";
import { Listener } from "./Listener";
import { Stream, StreamWithSend } from "./Stream";
import { Operational } from "./Operational";
import { Tuple2 } from "./Tuple2";

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
            this.vertex = new Vertex("ConstCell", 0, []);
        }
        else
            Transaction.run(() => this.setStream(str));
    }

    protected setStream(str : Stream<A>) {
        this.str = str;
        const me = this,
              src = new Source(
                str.getVertex__(),
                () => {
                    return str.listen_(me.vertex, (a : A) => {
                        if (me.valueUpdate == null) {
                            Transaction.currentTransaction.last(() => {
                                me.value = me.valueUpdate;
                                me.lazyInitValue = null;
                                me.valueUpdate = null;
                            });
                        }
                        me.valueUpdate = a;
                    }, false);
                }
            );
        this.vertex = new Vertex("Cell", 0, [src]);
        // We do a trick here of registering the source for the duration of the current
        // transaction so that we are guaranteed to catch any stream events that
        // occur in the same transaction.
        this.vertex.register(Vertex.NULL);
        Transaction.currentTransaction.last(() => {
            this.vertex.deregister(Vertex.NULL);
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
     * It should generally be avoided in favour of {@link listen(Handler)} so you don't
     * miss any updates, but in many circumstances it makes sense.
     * <p>
     * NOTE: In the Java and other versions of Sodium, using sample() inside map(), filter() and
     * merge() is encouraged. In the Javascript/Typescript version, not so much, for the
     * following reason: The memory management is different in the Javascript version, and this
     * requires us to track all dependencies. In order for the use of sample() inside
     * a closure to be correct, the cell that was sample()d inside the closure would have to be
     * declared explicitly using the helpers lambda1(), lambda2(), etc. Because this is
     * something that can be got wrong, we don't encourage this kind of use of sample() in
     * Javascript. Better and simpler to use snapshot().
     * <p>
     * NOTE: If you need to sample() a cell, you have to make sure it's "alive" in terms of
     * memory management or it will ignore updates. To make a cell work correctly
     * with sample(), you have to ensure that it's being used. One way to guarantee this is
     * to register a dummy listener on the cell. It will also work to have it referenced
     * by something that is ultimately being listened to.
     */
    sample() : A {
        return Transaction.run(() => { return this.sampleNoTrans__(); });
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
        return Transaction.run(() => me.sampleLazyNoTrans__());
    }

    sampleLazyNoTrans__() : Lazy<A> {  // TO DO figure out how to hide this
        const me = this,
            s = new LazySample<A>(me);
        Transaction.currentTransaction.sample(() => {
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
        return Transaction.run(() =>
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
            cf = this.map((aa : A) => (bb : B) => fn(aa, bb));
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
            mf : (aa : A) => (bb : B) => (cc : C) => D =
                 (aa : A) => (bb : B) => (cc : C) => fn(aa, bb, cc),
            cf = this.map(mf);
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
            mf : (aa : A) => (bb : B) => (cc : C) => (dd : D) => E =
                 (aa : A) => (bb : B) => (cc : C) => (dd : D) => fn(aa, bb, cc, dd),
            cf = this.map(mf);
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
            mf : (aa : A) => (bb : B) => (cc : C) => (dd : D) => (ee : E) => F =
                 (aa : A) => (bb : B) => (cc : C) => (dd : D) => (ee : E) => fn(aa, bb, cc, dd, ee),
            cf = this.map(mf);
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
            mf : (aa : A) => (bb : B) => (cc : C) => (dd : D) => (ee : E) => (ff : F) => G =
                 (aa : A) => (bb : B) => (cc : C) => (dd : D) => (ee : E) => (ff : F) => fn(aa, bb, cc, dd, ee, ff),
            cf = this.map(mf);
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
     * High order depenency traking. If any newly created sodium objects within a value of a cell of a sodium object
     * happen to accumulate state, this method will keep the accumulation of state up to date.
     */
    public tracking(extractor: (a: A) => (Stream<any>|Cell<any>)[]) : Cell<A> {
        const out = new StreamWithSend<A>(null);
        let vertex = new Vertex("tracking", 0, [
            new Source(
                this.vertex,
                () => {
                    let cleanup2: ()=>void = () => {};
                    let updateDeps =
                        (a: A) => {
                            let lastCleanups2 = cleanup2;
                            let deps = extractor(a).map(dep => dep.getVertex__());
                            for (let i = 0; i < deps.length; ++i) {
                                let dep = deps[i];
                                vertex.childrn.push(dep);
                                dep.increment(Vertex.NULL);
                            }
                            cleanup2 = () => {
                                for (let i = 0; i < deps.length; ++i) {
                                    let dep = deps[i];
                                    for (let j = 0; j < vertex.childrn.length; ++j) {
                                        if (vertex.childrn[j] === dep) {
                                            vertex.childrn.splice(j, 1);
                                            break;
                                        }
                                    }
                                    dep.decrement(Vertex.NULL);
                                }
                            };
                            lastCleanups2();
                        };
                    updateDeps(this.sample());
                    var cleanup1 =
                        Operational.updates(this).listen_(
                            vertex,
                            (a: A) => {
                                updateDeps(a);
                                out.send_(a);
                            },
                            false
                        );
                    return () => {
                        cleanup1();
                        cleanup2();
                    }
                }
            )
        ]);
        out.setVertex__(vertex);
        return out.holdLazy(this.sampleLazy());
    }

    /**
     * Lift an array of cells into a cell of an array.
     */
    public static liftArray<A>(ca : Cell<A>[]) : Cell<A[]> {
        return Cell._liftArray(ca, 0, ca.length);
    }

    private static _liftArray<A>(ca : Cell<A>[], fromInc: number, toExc: number) : Cell<A[]> {
        if (toExc - fromInc == 0) {
            return new Cell<A[]>([]);
        } else if (toExc - fromInc == 1) {
            return ca[fromInc].map(a => [a]);
        } else {
            let pivot = Math.floor((fromInc + toExc) / 2);
            // the thunk boxing/unboxing here is a performance hack for lift when there are simutaneous changing cells.
            return Cell._liftArray(ca, fromInc, pivot).lift(
                    Cell._liftArray(ca, pivot, toExc),
                    (array1, array2) => () => array1.concat(array2)
                )
                .map(x => x());
        }
    }

	/**
	 * Apply a value inside a cell to a function inside a cell. This is the
	 * primitive for all function lifting.
	 */
	static apply<A,B>(cf : Cell<(a : A) => B>, ca : Cell<A>, sources? : Source[]) : Cell<B> {
    	return Transaction.run(() => {
            let pumping = false;
    	    const state = new ApplyState<A,B>(),
                out = new StreamWithSend<B>(),
                cf_updates = Operational.updates(cf),
                ca_updates = Operational.updates(ca),
                pump = () => {
                    if (pumping) {
                        return;
                    }
                    pumping = true;
                    Transaction.currentTransaction.prioritized(out.getVertex__(), () => {
                        let f = state.f_present ? state.f : cf.sampleNoTrans__();
                        let a = state.a_present ? state.a : ca.sampleNoTrans__();
                        out.send_(f(a));
                        pumping = false;
                    });
                },
                src1 = new Source(
                        cf_updates.getVertex__(),
                        () => {
                            return cf_updates.listen_(out.getVertex__(), (f : (a : A) => B) => {
                                state.f = f;
                                state.f_present = true;
                                pump();
                            }, false);
                        }
                    ),
                src2 = new Source(
                        ca_updates.getVertex__(),
                        () => {
                            return ca_updates.listen_(out.getVertex__(), (a : A) => {
                                state.a = a;
                                state.a_present = true;
                                pump();
                            }, false);
                        }
                    );
            out.setVertex__(new Vertex("apply", 0,
                [src1, src2].concat(sources ? sources : [])
            ));
            return out.holdLazy(new Lazy<B>(() =>
                    cf.sampleNoTrans__()(ca.sampleNoTrans__())
                ));
        });
	}

	/**
	 * Unwrap a cell inside another cell to give a time-varying cell implementation.
	 */
    static switchC<A>(cca : Cell<Cell<A>>) : Cell<A> {
	    return Transaction.run(() => {
            const za = cca.sampleLazy().map((ba : Cell<A>) => ba.sample()),
                out = new StreamWithSend<A>();
            let outValue: A = null;
            let pumping = false;
            const pump = () => {
                if (pumping) {
                    return;
                }
                pumping = true;
                Transaction.currentTransaction.prioritized(out.getVertex__(), () => {
                    out.send_(outValue);
                    outValue = null;
                    pumping = false;
                });
            };
            let last_ca : Cell<A> = null;
            const cca_value = Operational.value(cca),
                  src = new Source(
                        cca_value.getVertex__(),
                        () => {
                            let kill2 : () => void = last_ca === null ? null :
                                    Operational.value(last_ca).listen_(out.getVertex__(),
                                        (a : A) => { outValue = a; pump(); }, false);
                            const kill1 = cca_value.listen_(out.getVertex__(), (ca : Cell<A>) => {
                                last_ca = ca;
                                // Connect before disconnect to avoid memory bounce, when switching to same cell twice.
                                let nextKill2 = Operational.value(ca).listen_(out.getVertex__(),
                                    (a : A) => {
                                        outValue = a;
                                        pump();
                                    },
                                    false);
                                if (kill2 !== null)
                                    kill2();
                                kill2 = nextKill2;
                            }, false);
                            return () => { kill1(); kill2(); };
                        }
                    );
            out.setVertex__(new Vertex("switchC", 0, [src]));
            return out.holdLazy(za);
        });
	}

	/**
	 * Unwrap a stream inside a cell to give a time-varying stream implementation.
	 */
	static switchS<A>(csa : Cell<Stream<A>>) : Stream<A> {
	    return Transaction.run(() => {
            const out = new StreamWithSend<A>(),
                  h2 = (a : A) => {
                          out.send_(a);
                      },
                  src = new Source(
                      csa.getVertex__(),
                      () => {
                          let kill2 = csa.sampleNoTrans__().listen_(out.getVertex__(), h2, false);
                          const kill1 = csa.getStream__().listen_(out.getVertex__(), (sa : Stream<A>) => {
                              // Connect before disconnect to avoid memory bounce, when switching to same stream twice.
                              let nextKill2 = sa.listen_(out.getVertex__(), h2, true);
                              kill2();
                              kill2 = nextKill2;
                          }, false);
                          return () => { kill1(); kill2(); };
                      }
                  );
	        out.setVertex__(new Vertex("switchS", 0, [src]));
	        return out;
	    });
    }

    /**
     * When transforming a value from a larger type to a smaller type, it is likely for duplicate changes to become
     * propergated. This function insures only distinct changes get propergated.
     */
    calm(eq: (a:A,b:A)=>boolean): Cell<A> {
        return Operational
            .updates(this)
            .collectLazy(
                this.sampleLazy(),
                (newValue, oldValue) => {
                    let result: A;
                    if (eq(newValue, oldValue)) {
                        result = null;
                    } else {
                        result = newValue;
                    }
                    return new Tuple2(result, newValue);
                }
            )
            .filterNotNull()
            .holdLazy(this.sampleLazy());
    }

    /**
     * This function is the same as calm, except you do not need to pass an eq function. This function will use (===)
     * as its eq function. I.E. calling calmRefEq() is the same as calm((a,b) => a === b).
     */
    calmRefEq(): Cell<A> {
        return this.calm((a, b) => a === b);
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
        return Transaction.run(() => {
            return Operational.value(this).listen(h);
        });
    }

    /**
     * Fantasy-land Algebraic Data Type Compatability.
     * Cell satisfies the Functor, Apply, Applicative categories
     * @see {@link https://github.com/fantasyland/fantasy-land} for more info
     */

    //of :: Applicative f => a -> f a
    static 'fantasy-land/of'<A>(a:A):Cell<A> {
      return new Cell<A>(a);
    }

    //map :: Functor f => f a ~> (a -> b) -> f b
    'fantasy-land/map'<B>(f : ((a : A) => B)) : Cell<B> {
      return this.map(f);
    }

    //ap :: Apply f => f a ~> f (a -> b) -> f b
    'fantasy-land/ap'<B>(cf: Cell<(a : A) => B>):Cell<B> {
        return Cell.apply(cf, this);
    }
}
