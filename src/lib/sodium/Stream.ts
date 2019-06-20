import { Lambda1, Lambda1_deps, Lambda1_toFunction,
         Lambda2, Lambda2_deps, Lambda2_toFunction,
         Lambda3, Lambda3_deps, Lambda3_toFunction,
         Lambda4, Lambda4_deps, Lambda4_toFunction,
         Lambda5, Lambda5_deps, Lambda5_toFunction,
         Lambda6, Lambda6_deps, Lambda6_toFunction,
         toSources } from "./Lambda";
import { Source, Vertex } from "./Vertex";
import { Transaction } from "./Transaction";
import { CoalesceHandler } from "./CoalesceHandler";
import { Cell } from "./Cell";
//import { StreamLoop } from "./StreamLoop";
import { Listener } from "./Listener";
import { Tuple2 } from "./Tuple2";
import { Lazy } from "./Lazy";
import { LazyCell } from "./LazyCell";
import * as Z from "sanctuary-type-classes";

class MergeState<A> {
    constructor() {}
    left : A = null;
    left_present : boolean = false;
    right : A = null;
    right_present : boolean = false;
}

export class Stream<A> {
    constructor(vertex? : Vertex) {
        this.vertex = vertex ? vertex : new Vertex("Stream", 0, []);
    }

    getVertex__() : Vertex {
        return this.vertex;
    }

    protected vertex : Vertex;
    protected listeners : Array<Listener<A>> = [];
    protected firings : A[] = [];

    /**
     * Transform the stream's event values according to the supplied function, so the returned
     * Stream's event values reflect the value of the function applied to the input
     * Stream's event values.
     * @param f Function to apply to convert the values. It may construct FRP logic or use
     *    {@link Cell#sample()} in which case it is equivalent to {@link Stream#snapshot(Cell)}ing the
     *    cell. Apart from this the function must be <em>referentially transparent</em>.
     */
    map<B>(f : ((a : A) => B) | Lambda1<A,B>) : Stream<B> {
        const out = new StreamWithSend<B>(null);
        const ff = Lambda1_toFunction(f);
        out.vertex = new Vertex("map", 0, [
                new Source(
                    this.vertex,
                    () => {
                        return this.listen_(out.vertex, (a : A) => {
                            out.send_(ff(a));
                        }, false);
                    }
                )
            ].concat(toSources(Lambda1_deps(f)))
        );
        return out;
    }

    /**
     * Transform the stream's event values into the specified constant value.
     * @param b Constant value.
     */
    mapTo<B>(b : B) : Stream<B> {
        const out = new StreamWithSend<B>(null);
        out.vertex = new Vertex("mapTo", 0, [
                new Source(
                    this.vertex,
                    () => {
                        return this.listen_(out.vertex, (a : A) => {
                            out.send_(b);
                        }, false);
                    }
                )
            ]
        );
        return out;
    }

    /**
     * Variant of {@link Stream#merge(Stream, Lambda2)} that merges two streams and will drop an event
     * in the simultaneous case.
     * <p>
     * In the case where two events are simultaneous (i.e. both
     * within the same transaction), the event from <em>this</em> will take precedence, and
     * the event from <em>s</em> will be dropped.
     * If you want to specify your own combining function, use {@link Stream#merge(Stream, Lambda2)}.
     * s1.orElse(s2) is equivalent to s1.merge(s2, (l, r) -&gt; l).
     * <p>
     * The name orElse() is used instead of merge() to make it really clear that care should
     * be taken, because events can be dropped.
     */
    orElse(s : Stream<A>) : Stream<A> {
        return this.merge(s, (left : A, right: A) => {
            return left;
        });
    }

    /**
     * Merge two streams of the same type into one, so that events on either input appear
     * on the returned stream.
     * <p>
     * If the events are simultaneous (that is, one event from this and one from <em>s</em>
     * occurring in the same transaction), combine them into one using the specified combining function
     * so that the returned stream is guaranteed only ever to have one event per transaction.
     * The event from <em>this</em> will appear at the left input of the combining function, and
     * the event from <em>s</em> will appear at the right.
     * @param f Function to combine the values. It may construct FRP logic or use
     *    {@link Cell#sample()}. Apart from this the function must be <em>referentially transparent</em>.
     */
    merge(s : Stream<A>, f : ((left : A, right : A) => A) | Lambda2<A,A,A>) : Stream<A> {
        const ff = Lambda2_toFunction(f);
        const mergeState = new MergeState<A>();
        let pumping = false;
        const out = new StreamWithSend<A>(null);
        const pump = () => {
            if (pumping) {
                return;
            }
            pumping = true;
            Transaction.currentTransaction.prioritized(out.getVertex__(), () => {
                if (mergeState.left_present && mergeState.right_present) {
                    out.send_(ff(mergeState.left, mergeState.right));
                } else if (mergeState.left_present) {
                    out.send_(mergeState.left);
                } else if (mergeState.right_present) {
                    out.send_(mergeState.right);
                }
                mergeState.left = null;
                mergeState.left_present = false;
                mergeState.right = null;
                mergeState.right_present = false;
                pumping = false;
            });
        };
        const vertex = new Vertex("merge", 0,
            [
                new Source(
                    this.vertex,
                    () => this.listen_(out.vertex, (a : A) => {
                        mergeState.left = a;
                        mergeState.left_present = true;
                        pump();
                    }, false)
                ),
                new Source(
                    s.vertex,
                    () => s.listen_(out.vertex, (a : A) => {
                        mergeState.right = a;
                        mergeState.right_present = true;
                        pump();
                    }, false)
                )
            ].concat(toSources(Lambda2_deps(f)))
        );
        out.vertex = vertex;
        return out;
    }

    /**
     * Return a stream that only outputs events for which the predicate returns true.
     */
    filter(f : ((a : A) => boolean) | Lambda1<A,boolean>) : Stream<A> {
        const out = new StreamWithSend<A>(null);
        const ff = Lambda1_toFunction(f);
        out.vertex = new Vertex("filter", 0, [
                new Source(
                    this.vertex,
                    () => {
                        return this.listen_(out.vertex, (a : A) => {
                            if (ff(a))
                                out.send_(a);
                        }, false);
                    }
                )
            ].concat(toSources(Lambda1_deps(f)))
        );
        return out;
    }

    /**
     * Return a stream that only outputs events that have present
     * values, discarding null values.
     */
    filterNotNull() : Stream<A> {
        const out = new StreamWithSend<A>(null);
        out.vertex = new Vertex("filterNotNull", 0, [
                new Source(
                    this.vertex,
                    () => {
                        return this.listen_(out.vertex, (a : A) => {
                            if (a !== null)
                                out.send_(a);
                        }, false);
                    }
                )
            ]
        );
        return out;
    }

    /**
     * Return a stream that only outputs events from the input stream
     * when the specified cell's value is true.
     */
    gate(c : Cell<boolean>) : Stream<A> {
        return this.snapshot(c, (a : A, pred : boolean) => {
            return pred ? a : null;
        }).filterNotNull();
    }

	/**
	 * Variant of {@link snapshot(Cell, Lambda2)} that captures the cell's value
	 * at the time of the event firing, ignoring the stream's value.
	 */
	snapshot1<B>(c : Cell<B>) : Stream<B> {
        const out = new StreamWithSend<B>(null);
        out.vertex = new Vertex("snapshot1", 0, [
                new Source(
                    this.vertex,
                    () => {
                        return this.listen_(out.vertex, (a : A) => {
                            out.send_(c.sampleNoTrans__());
                        }, false);
                    }
                ),
                new Source(c.getVertex__(), null)
            ]
        );
        return out;
	}

	/**
	 * Return a stream whose events are the result of the combination using the specified
	 * function of the input stream's event value and the value of the cell at that time.
     * <P>
     * There is an implicit delay: State updates caused by event firings being held with
     * {@link Stream#hold(Object)} don't become visible as the cell's current value until
     * the following transaction. To put this another way, {@link Stream#snapshot(Cell, Lambda2)}
     * always sees the value of a cell as it was before any state changes from the current
     * transaction.
     */
	snapshot<B,C>(b : Cell<B>, f_ : ((a : A, b : B) => C) | Lambda2<A,B,C>) : Stream<C>
	{
        const out = new StreamWithSend<C>(null);
        const ff = Lambda2_toFunction(f_);
        out.vertex = new Vertex("snapshot", 0, [
                new Source(
                    this.vertex,
                    () => {
                        return this.listen_(out.vertex, (a : A) => {
                            out.send_(ff(a, b.sampleNoTrans__()));
                        }, false);
                    }
                ),
                new Source(b.getVertex__(), null)
            ].concat(toSources(Lambda2_deps(f_)))
        );
        return out;
	}

	/**
	 * Return a stream whose events are the result of the combination using the specified
	 * function of the input stream's event value and the value of the cells at that time.
     * <P>
     * There is an implicit delay: State updates caused by event firings being held with
     * {@link Stream#hold(Object)} don't become visible as the cell's current value until
     * the following transaction. To put this another way, snapshot()
     * always sees the value of a cell as it was before any state changes from the current
     * transaction.
     */
	snapshot3<B,C,D>(b : Cell<B>, c : Cell<C>, f_ : ((a : A, b : B, c : C) => D) | Lambda3<A,B,C,D>) : Stream<D>
	{
        const out = new StreamWithSend<D>(null);
        const ff = Lambda3_toFunction(f_);
        out.vertex = new Vertex("snapshot", 0, [
                new Source(
                    this.vertex,
                    () => {
                        return this.listen_(out.vertex, (a : A) => {
                            out.send_(ff(a, b.sampleNoTrans__(), c.sampleNoTrans__()));
                        }, false);
                    }
                ),
                new Source(b.getVertex__(), null),
                new Source(c.getVertex__(), null)
            ].concat(toSources(Lambda3_deps(f_)))
        );
        return out;
	}

	/**
	 * Return a stream whose events are the result of the combination using the specified
	 * function of the input stream's event value and the value of the cells at that time.
     * <P>
     * There is an implicit delay: State updates caused by event firings being held with
     * {@link Stream#hold(Object)} don't become visible as the cell's current value until
     * the following transaction. To put this another way, snapshot()
     * always sees the value of a cell as it was before any state changes from the current
     * transaction.
     */
	snapshot4<B,C,D,E>(b : Cell<B>, c : Cell<C>, d : Cell<D>,
	    f_ : ((a : A, b : B, c : C, d : D) => E) | Lambda4<A,B,C,D,E>) : Stream<E>
	{
        const out = new StreamWithSend<E>(null);
        const ff = Lambda4_toFunction(f_);
        out.vertex = new Vertex("snapshot", 0, [
                new Source(
                    this.vertex,
                    () => {
                        return this.listen_(out.vertex, (a : A) => {
                            out.send_(ff(a, b.sampleNoTrans__(), c.sampleNoTrans__(),
                                            d.sampleNoTrans__()));
                        }, false);
                    }
                ),
                new Source(b.getVertex__(), null),
                new Source(c.getVertex__(), null),
                new Source(d.getVertex__(), null)
            ].concat(toSources(Lambda4_deps(f_)))
        );
        return out;
	}

	/**
	 * Return a stream whose events are the result of the combination using the specified
	 * function of the input stream's event value and the value of the cells at that time.
     * <P>
     * There is an implicit delay: State updates caused by event firings being held with
     * {@link Stream#hold(Object)} don't become visible as the cell's current value until
     * the following transaction. To put this another way, snapshot()
     * always sees the value of a cell as it was before any state changes from the current
     * transaction.
     */
	snapshot5<B,C,D,E,F>(b : Cell<B>, c : Cell<C>, d : Cell<D>, e : Cell<E>,
	    f_ : ((a : A, b : B, c : C, d : D, e : E) => F) | Lambda5<A,B,C,D,E,F>) : Stream<F>
	{
        const out = new StreamWithSend<F>(null);
        const ff = Lambda5_toFunction(f_);
        out.vertex = new Vertex("snapshot", 0, [
                new Source(
                    this.vertex,
                    () => {
                        return this.listen_(out.vertex, (a : A) => {
                            out.send_(ff(a, b.sampleNoTrans__(), c.sampleNoTrans__(),
                                            d.sampleNoTrans__(), e.sampleNoTrans__()));
                        }, false);
                    }
                ),
                new Source(b.getVertex__(), null),
                new Source(c.getVertex__(), null),
                new Source(d.getVertex__(), null),
                new Source(e.getVertex__(), null)
            ].concat(toSources(Lambda5_deps(f_)))
        );
        return out;
	}

	/**
	 * Return a stream whose events are the result of the combination using the specified
	 * function of the input stream's event value and the value of the cells at that time.
     * <P>
     * There is an implicit delay: State updates caused by event firings being held with
     * {@link Stream#hold(Object)} don't become visible as the cell's current value until
     * the following transaction. To put this another way, snapshot()
     * always sees the value of a cell as it was before any state changes from the current
     * transaction.
     */
	snapshot6<B,C,D,E,F,G>(b : Cell<B>, c : Cell<C>, d : Cell<D>, e : Cell<E>, f : Cell<F>,
	    f_ : ((a : A, b : B, c : C, d : D, e : E, f : F) => G) | Lambda6<A,B,C,D,E,F,G>) : Stream<G>
	{
        const out = new StreamWithSend<G>(null);
        const ff = Lambda6_toFunction(f_);
        out.vertex = new Vertex("snapshot", 0, [
                new Source(
                    this.vertex,
                    () => {
                        return this.listen_(out.vertex, (a : A) => {
                            out.send_(ff(a, b.sampleNoTrans__(), c.sampleNoTrans__(),
                                            d.sampleNoTrans__(), e.sampleNoTrans__(),
                                            f.sampleNoTrans__()));
                        }, false);
                    }
                ),
                new Source(b.getVertex__(), null),
                new Source(c.getVertex__(), null),
                new Source(d.getVertex__(), null),
                new Source(e.getVertex__(), null),
                new Source(f.getVertex__(), null)
            ].concat(toSources(Lambda6_deps(f_)))
        );
        return out;
	}

	/**
	 * Create a {@link Cell} with the specified initial value, that is updated
     * by this stream's event values.
     * <p>
     * There is an implicit delay: State updates caused by event firings don't become
     * visible as the cell's current value as viewed by {@link Stream#snapshot(Cell, Lambda2)}
     * until the following transaction. To put this another way,
     * {@link Stream#snapshot(Cell, Lambda2)} always sees the value of a cell as it was before
     * any state changes from the current transaction.
     */
    hold(initValue : A) : Cell<A> {
        return new Cell<A>(initValue, this);
	}

	/**
	 * A variant of {@link hold(Object)} with an initial value captured by {@link Cell#sampleLazy()}.
	 */
	holdLazy(initValue : Lazy<A>) : Cell<A> {
	    return new LazyCell<A>(initValue, this);
	}

    /**
     * Transform an event with a generalized state loop (a Mealy machine). The function
     * is passed the input and the old state and returns the new state and output value.
     * @param f Function to apply to update the state. It may construct FRP logic or use
     *    {@link Cell#sample()} in which case it is equivalent to {@link Stream#snapshot(Cell)}ing the
     *    cell. Apart from this the function must be <em>referentially transparent</em>.
     */
    collect<B,S>(initState : S, f : ((a : A, s : S) => Tuple2<B,S>) | Lambda2<A,S,Tuple2<B,S>>) : Stream<B> {
        return this.collectLazy(new Lazy<S>(() => { return initState; }), f);
    }

    /**
     * A variant of {@link collect(Object, Lambda2)} that takes an initial state returned by
     * {@link Cell#sampleLazy()}.
     */
    collectLazy<B,S>(initState : Lazy<S>, f : ((a : A, s : S) => Tuple2<B,S>) | Lambda2<A,S,Tuple2<B,S>>) : Stream<B> {
        const ea = this;
        return Transaction.run(() => {
            const es = new StreamLoop<S>(),
                s = es.holdLazy(initState),
                ebs = ea.snapshot(s, f),
                eb = ebs.map((bs : Tuple2<B,S>) => { return bs.a; }),
                es_out = ebs.map((bs : Tuple2<B,S>) => { return bs.b; });
            es.loop(es_out);
            return eb;
        });
    }

    /**
     * Accumulate on input event, outputting the new state each time.
     * @param f Function to apply to update the state. It may construct FRP logic or use
     *    {@link Cell#sample()} in which case it is equivalent to {@link Stream#snapshot(Cell)}ing the
     *    cell. Apart from this the function must be <em>referentially transparent</em>.
     */
    accum<S>(initState : S, f : ((a : A, s : S) => S) | Lambda2<A,S,S>) : Cell<S> {
        return this.accumLazy(new Lazy<S>(() => { return initState; }), f);
    }

    /**
     * A variant of {@link accum(Object, Lambda2)} that takes an initial state returned by
     * {@link Cell#sampleLazy()}.
     */
    accumLazy<S>(initState : Lazy<S>, f : ((a : A, s : S) => S) | Lambda2<A,S,S>) : Cell<S> {
        const ea = this;
        return Transaction.run(() => {
            const es = new StreamLoop<S>(),
                s = es.holdLazy(initState),
                es_out = ea.snapshot(s, f);
            es.loop(es_out);
            return es_out.holdLazy(initState);
        });
    }

    /**
     * Return a stream that outputs only one value: the next event of the
     * input stream, starting from the transaction in which once() was invoked.
     */
    once() : Stream<A> {
    /*
        return Transaction.run(() => {
            const ev = this,
                out = new StreamWithSend<A>();
            let la : () => void = null;
            la = ev.listen_(out.vertex, (a : A) => {
                if (la !== null) {
                    out.send_(a);
                    la();
                    la = null;
                }
            }, false);
            return out;
        });
        */
        // We can't use the implementation above, beacuse deregistering
        // listeners triggers the exception
        // "send() was invoked before listeners were registered"
        // We can revisit this another time. For now we will use the less
        // efficient implementation below.
        const me = this;
        return Transaction.run(() => me.gate(me.mapTo(false).hold(true)));
    }

    listen(h : (a : A) => void) : () => void {
        return Transaction.run<() => void>(() => {
            return this.listen_(Vertex.NULL, h, false);
        });
    }

    listen_(target : Vertex,
            h : (a : A) => void,
            suppressEarlierFirings : boolean) : () => void {
        if (this.vertex.register(target))
            Transaction.currentTransaction.requestRegen();
        const listener = new Listener<A>(h, target);
        this.listeners.push(listener);
        if (!suppressEarlierFirings && this.firings.length != 0) {
            const firings = this.firings.slice();
            Transaction.currentTransaction.prioritized(target, () => {
                // Anything sent already in this transaction must be sent now so that
                // there's no order dependency between send and listen.
                for (let i = 0; i < firings.length; i++)
                    h(firings[i]);
            });
        }
        return () => {
            let removed = false;
            for (let i = 0; i < this.listeners.length; i++) {
                if (this.listeners[i] == listener) {
                    this.listeners.splice(i, 1);
                    removed = true;
                    break;
                }
            }
            if (removed)
                this.vertex.deregister(target);
        };
    }


    /**
     * Fantasy-land Algebraic Data Type Compatability.
     * Stream satisfies the Functor and Monoid Categories (and hence Semigroup)
     * @see {@link https://github.com/fantasyland/fantasy-land} for more info
     */

    //map :: Functor f => f a ~> (a -> b) -> f b
    'fantasy-land/map'<B>(f : ((a : A) => B)) : Stream<B> {
      return this.map(f);
    }

    //concat :: Semigroup a => a ~> a -> a
    'fantasy-land/concat'(a:Stream<A>) : Stream<A> {
      return this.merge(a, (left:any, right) => {
        return (Z.Semigroup.test(left)) ? Z.concat(left, right) : left;
      });
    }

    //empty :: Monoid m => () -> m
    'fantasy-land/empty'() : Stream<A> {
      return new Stream<A>();
    }
}

export class StreamWithSend<A> extends Stream<A> {
    constructor(vertex? : Vertex) {
        super(vertex);
    }

    setVertex__(vertex : Vertex) {  // TO DO figure out how to hide this
        this.vertex = vertex;
    }

    send_(a : A) : void {
		if (this.firings.length == 0)
			Transaction.currentTransaction.last(() => {
			    this.firings = [];
            });
		this.firings.push(a);
		const listeners = this.listeners.slice();
        for (let i = 0; i < listeners.length; i++) {
            const h = listeners[i].h;
            Transaction.currentTransaction.prioritized(listeners[i].target, () => {
                Transaction.currentTransaction.inCallback++;
                try {
                    h(a);
                    Transaction.currentTransaction.inCallback--;
                }
                catch (err) {
                    Transaction.currentTransaction.inCallback--;
                    throw err;
                }
            });
        }
    }
}

/**
 * A forward reference for a {@link Stream} equivalent to the Stream that is referenced.
 */
export class StreamLoop<A> extends StreamWithSend<A> {
    assigned__ : boolean = false;  // to do: Figure out how to hide this

    constructor()
    {
        super();
        this.vertex.name = "StreamLoop";
    	if (Transaction.currentTransaction === null)
    	    throw new Error("StreamLoop/CellLoop must be used within an explicit transaction");
    }

    /**
     * Resolve the loop to specify what the StreamLoop was a forward reference to. It
     * must be invoked inside the same transaction as the place where the StreamLoop is used.
     * This requires you to create an explicit transaction with {@link Transaction#run(Lambda0)}
     * or {@link Transaction#runVoid(Runnable)}.
     */
    loop(sa_out : Stream<A>) : void {
        if (this.assigned__)
            throw new Error("StreamLoop looped more than once");
        this.assigned__ = true;
        this.vertex.addSource(
            new Source(
                sa_out.getVertex__(),
                () => {
                    return sa_out.listen_(this.vertex, (a : A) => {
                        this.send_(a);
                    }, false);
                }
            )
        );
    }
}
