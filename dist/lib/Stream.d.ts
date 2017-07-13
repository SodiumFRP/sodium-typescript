import { Lambda1, Lambda2, Lambda3, Lambda4, Lambda5, Lambda6 } from "./Lambda";
import { Vertex } from "./Vertex";
import { Cell } from "./Cell";
import { Listener } from "./Listener";
import { Tuple2 } from "./Tuple2";
import { Lazy } from "./Lazy";
export declare class Stream<A> {
    constructor(vertex?: Vertex);
    getVertex__(): Vertex;
    protected vertex: Vertex;
    protected listeners: Array<Listener<A>>;
    protected firings: A[];
    /**
     * Transform the stream's event values according to the supplied function, so the returned
     * Stream's event values reflect the value of the function applied to the input
     * Stream's event values.
     * @param f Function to apply to convert the values. It may construct FRP logic or use
     *    {@link Cell#sample()} in which case it is equivalent to {@link Stream#snapshot(Cell)}ing the
     *    cell. Apart from this the function must be <em>referentially transparent</em>.
     */
    map<B>(f: ((a: A) => B) | Lambda1<A, B>): Stream<B>;
    /**
     * Transform the stream's event values into the specified constant value.
     * @param b Constant value.
     */
    mapTo<B>(b: B): Stream<B>;
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
    orElse(s: Stream<A>): Stream<A>;
    private merge_(s);
    coalesce__(f: ((left: A, right: A) => A) | Lambda2<A, A, A>): Stream<A>;
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
    merge(s: Stream<A>, f: ((left: A, right: A) => A) | Lambda2<A, A, A>): Stream<A>;
    /**
     * Return a stream that only outputs events for which the predicate returns true.
     */
    filter(f: ((a: A) => boolean) | Lambda1<A, boolean>): Stream<A>;
    /**
     * Return a stream that only outputs events that have present
     * values, discarding null values.
     */
    filterNotNull(): Stream<A>;
    /**
     * Return a stream that only outputs events from the input stream
     * when the specified cell's value is true.
     */
    gate(c: Cell<boolean>): Stream<A>;
    /**
     * Variant of {@link snapshot(Cell, Lambda2)} that captures the cell's value
     * at the time of the event firing, ignoring the stream's value.
     */
    snapshot1<B>(c: Cell<B>): Stream<B>;
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
    snapshot<B, C>(b: Cell<B>, f_: ((a: A, b: B) => C) | Lambda2<A, B, C>): Stream<C>;
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
    snapshot3<B, C, D>(b: Cell<B>, c: Cell<C>, f_: ((a: A, b: B, c: C) => D) | Lambda3<A, B, C, D>): Stream<D>;
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
    snapshot4<B, C, D, E>(b: Cell<B>, c: Cell<C>, d: Cell<D>, f_: ((a: A, b: B, c: C, d: D) => E) | Lambda4<A, B, C, D, E>): Stream<E>;
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
    snapshot5<B, C, D, E, F>(b: Cell<B>, c: Cell<C>, d: Cell<D>, e: Cell<E>, f_: ((a: A, b: B, c: C, d: D, e: E) => F) | Lambda5<A, B, C, D, E, F>): Stream<F>;
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
    snapshot6<B, C, D, E, F, G>(b: Cell<B>, c: Cell<C>, d: Cell<D>, e: Cell<E>, f: Cell<F>, f_: ((a: A, b: B, c: C, d: D, e: E, f: F) => G) | Lambda6<A, B, C, D, E, F, G>): Stream<G>;
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
    hold(initValue: A): Cell<A>;
    /**
     * A variant of {@link hold(Object)} with an initial value captured by {@link Cell#sampleLazy()}.
     */
    holdLazy(initValue: Lazy<A>): Cell<A>;
    /**
     * Transform an event with a generalized state loop (a Mealy machine). The function
     * is passed the input and the old state and returns the new state and output value.
     * @param f Function to apply to update the state. It may construct FRP logic or use
     *    {@link Cell#sample()} in which case it is equivalent to {@link Stream#snapshot(Cell)}ing the
     *    cell. Apart from this the function must be <em>referentially transparent</em>.
     */
    collect<B, S>(initState: S, f: ((a: A, s: S) => Tuple2<B, S>) | Lambda2<A, S, Tuple2<B, S>>): Stream<B>;
    /**
     * A variant of {@link collect(Object, Lambda2)} that takes an initial state returned by
     * {@link Cell#sampleLazy()}.
     */
    collectLazy<B, S>(initState: Lazy<S>, f: ((a: A, s: S) => Tuple2<B, S>) | Lambda2<A, S, Tuple2<B, S>>): Stream<B>;
    /**
     * Accumulate on input event, outputting the new state each time.
     * @param f Function to apply to update the state. It may construct FRP logic or use
     *    {@link Cell#sample()} in which case it is equivalent to {@link Stream#snapshot(Cell)}ing the
     *    cell. Apart from this the function must be <em>referentially transparent</em>.
     */
    accum<S>(initState: S, f: ((a: A, s: S) => S) | Lambda2<A, S, S>): Cell<S>;
    /**
     * A variant of {@link accum(Object, Lambda2)} that takes an initial state returned by
     * {@link Cell#sampleLazy()}.
     */
    accumLazy<S>(initState: Lazy<S>, f: ((a: A, s: S) => S) | Lambda2<A, S, S>): Cell<S>;
    /**
     * Return a stream that outputs only one value: the next event of the
     * input stream, starting from the transaction in which once() was invoked.
     */
    once(): Stream<A>;
    listen(h: (a: A) => void): () => void;
    listen_(target: Vertex, h: (a: A) => void, suppressEarlierFirings: boolean): () => void;
}
export declare class StreamWithSend<A> extends Stream<A> {
    constructor(vertex?: Vertex);
    setVertex__(vertex: Vertex): void;
    send_(a: A): void;
}
/**
 * A forward reference for a {@link Stream} equivalent to the Stream that is referenced.
 */
export declare class StreamLoop<A> extends StreamWithSend<A> {
    assigned__: boolean;
    constructor();
    /**
     * Resolve the loop to specify what the StreamLoop was a forward reference to. It
     * must be invoked inside the same transaction as the place where the StreamLoop is used.
     * This requires you to create an explicit transaction with {@link Transaction#run(Lambda0)}
     * or {@link Transaction#runVoid(Runnable)}.
     */
    loop(sa_out: Stream<A>): void;
}
