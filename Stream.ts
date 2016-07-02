import { Lambda1, Lambda1_deps, Lambda1_toFunction,
         Lambda2, Lambda2_deps, Lambda2_toFunction,
         toSources } from "./Lambda";
import { Source, Vertex } from "./Vertex";
import { Transaction, transactionally, currentTransaction } from "./Transaction";
import { CoalesceHandler } from "./CoalesceHandler";
import { Cell } from "./Cell";
import { Listener } from "./Listener";

export class Stream<A> {
    constructor(vertex? : Vertex) {
        this.vertex = vertex ? vertex : new Vertex(0, []);
    }

    getVertex() : Vertex {
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
        let ff = Lambda1_toFunction(f);
        out.vertex = new Vertex(0, [
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
        out.vertex = new Vertex(0, [
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

    private merge_(s : Stream<A>) : Stream<A> {
        const out = new StreamWithSend<A>();
        const left = new Vertex(0, []);
        left.sources.push(new Source(this.vertex, () => {
            return this.listen_(left, (a : A) => {
                    out.send_(a);
                }, false);
        }));
        out.vertex.sources = out.vertex.sources.concat([
                new Source(
                    left,
                    () => {
                        left.register(out.vertex);
                        return () => { left.deregister(out.vertex); }
                    }
                ),
                new Source(
                    s.vertex,
                    () => {
                        return s.listen_(out.vertex, (a : A) => {
                            out.send_(a);
                        }, false);
                    }
                )
            ]);
        return out;
    }

    private coalesce(f : ((left : A, right : A) => A) | Lambda2<A,A,A>) : Stream<A> {
        const out = new StreamWithSend<A>();
        const coalescer = new CoalesceHandler<A>(f, out);
        out.vertex.sources = out.vertex.sources.concat([
                new Source(
                    this.vertex,
                    () => {
                        return this.listen_(out.vertex, (a : A) => {
                            coalescer.send_(a);
                        }, false);
                    }
                )
            ]).concat(toSources(Lambda2_deps(f)));
        return out;
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
        return transactionally<Stream<A>>(() => {
            return this.merge_(s).coalesce(f);
        });
    }

    /**
     * Return a stream that only outputs events for which the predicate returns true.
     */
    filter(f : ((a : A) => boolean) | Lambda1<A,boolean>) : Stream<A> {
        const out = new StreamWithSend<A>(null);
        let ff = Lambda1_toFunction(f);
        out.vertex = new Vertex(0, [
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
        out.vertex = new Vertex(0, [
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
	    return transactionally(() => {
	        return this.map((a : A) => { return c.sample(); });
	    });
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
	snapshot<B,C>(c : Cell<B>, f : ((a : A, b : B) => C) | Lambda2<A,B,C>)
	{
        const out = new StreamWithSend<C>(null);
        let ff = Lambda2_toFunction(f);
        out.vertex = new Vertex(0, [
                new Source(
                    this.vertex,
                    () => {
                        return this.listen_(out.vertex, (a : A) => {
                            out.send_(ff(a, c.sampleNoTrans()));
                        }, false);
                    }
                )
            ].concat(toSources(Lambda2_deps(f)))
        );
        return out;
	}

    listen(h : (a : A) => void) : () => void {
        return transactionally<() => void>(() => {
            return this.listen_(Vertex.NULL, h, false);
        });
    }

    listen_(target : Vertex,
            h : (a : A) => void,
            suppressEarlierFirings : boolean) : () => void {
        if (this.listeners.length == 0)
            if (this.vertex.register(target))
                currentTransaction.requestRegen();
        const listener = new Listener<A>(h, target);
        this.listeners.push(listener);
        if (!suppressEarlierFirings && this.firings.length != 0) {
            const firings = this.firings.slice();
            currentTransaction.prioritized(target, () => {
                // Anything sent already in this transaction must be sent now so that
                // there's no order dependency between send and listen.
                for (let i = 0; i < firings.length; i++)
                    h(firings[i]);
            });
        }
        return () => {
            if (this.listeners.length != 0) {
                for (let i = 0; i < this.listeners.length; i++) {
                    if (this.listeners[i] == listener) {
                        this.listeners.splice(i, 1);
                        break;
                    }
                }
                if (this.listeners.length == 0)
                    this.vertex.deregister(target);
            }
        };
    }
}

export class StreamWithSend<A> extends Stream<A> {
    constructor(vertex? : Vertex) {
        super(vertex);
    }

    send_(a : A) : void {
        if (this.vertex.registered == 0)
            throw "send() was invoked before listeners were registered";
		if (this.firings.length == 0)
			currentTransaction.last(() => {
			    this.firings = [];
            });
		this.firings.push(a);
		const listeners = this.listeners.slice();
        for (let i = 0; i < listeners.length; i++) {
            const h = listeners[i].h;
            currentTransaction.prioritized(listeners[i].target, () => {
                currentTransaction.inCallback++;
                try {
                    h(a);
                    currentTransaction.inCallback--;
                }
                catch (err) {
                    currentTransaction.inCallback--;
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
    private assigned : boolean = false;

    constructor()
    {
        super();
    	if (currentTransaction === null)
    	    throw "StreamLoop/CellLoop must be used within an explicit transaction";
    }

    /**
     * Resolve the loop to specify what the StreamLoop was a forward reference to. It
     * must be invoked inside the same transaction as the place where the StreamLoop is used.
     * This requires you to create an explicit transaction with {@link Transaction#run(Lambda0)}
     * or {@link Transaction#runVoid(Runnable)}.
     */
    loop(sa_out : Stream<A>) : void {
        if (this.assigned)
            throw "StreamLoop looped more than once";
        this.assigned = true;
        this.vertex.sources.push(
            new Source(
                sa_out.getVertex(),
                () => {
                    return sa_out.listen_(this.vertex, (a : A) => {
                        this.send_(a);
                    }, false);
                }
            )
        );
    }
}
