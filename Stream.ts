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

    private merge_(s : Stream<A>, f : ((left : A, right : A) => A) | Lambda2<A,A,A>) : Stream<A> {
        const out = new StreamWithSend<A>();
        const left = new Vertex(0, []);
        const right = out.vertex;
        right.sources.push(new Source(left, () => { return null; }));
        const coalescer = new CoalesceHandler<A>(f, out);
        const send = (a : A) => {
                            coalescer.send_(a);
                     };
        out.vertex.sources = out.vertex.sources.concat([
                new Source(
                    this.vertex,
                    () => {
                        return this.listen_(left, send, false);
                    }
                ),
                new Source(
                    s.vertex,
                    () => {
                        return s.listen_(right, send, false);
                    }
                )
            ])
            .concat(toSources(Lambda2_deps(f)));
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
    protected merge(s : Stream<A>, f : ((left : A, right : A) => A) | Lambda2<A,A,A>) : Stream<A> {
        return transactionally<Stream<A>>(() => {
            return this.merge_(s, f);
        });
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
