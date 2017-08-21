import { Lambda1, Lambda2, Lambda3, Lambda4, Lambda5, Lambda6 } from "./Lambda";
import { Source, Vertex } from "./Vertex";
import { Lazy } from "./Lazy";
import { Stream } from "./Stream";
export declare class Cell<A> {
    private str;
    protected value: A;
    protected valueUpdate: A;
    private cleanup;
    protected lazyInitValue: Lazy<A>;
    private vertex;
    constructor(initValue: A, str?: Stream<A>);
    protected setStream(str: Stream<A>): void;
    getVertex__(): Vertex;
    getStream__(): Stream<A>;
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
    sample(): A;
    sampleNoTrans__(): A;
    /**
     * A variant of {@link sample()} that works with {@link CellLoop}s when they haven't been looped yet.
     * It should be used in any code that's general enough that it could be passed a {@link CellLoop}.
     * @see Stream#holdLazy(Lazy) Stream.holdLazy()
     */
    sampleLazy(): Lazy<A>;
    sampleLazyNoTrans__(): Lazy<A>;
    /**
     * Transform the cell's value according to the supplied function, so the returned Cell
     * always reflects the value of the function applied to the input Cell's value.
     * @param f Function to apply to convert the values. It must be <em>referentially transparent</em>.
     */
    map<B>(f: ((a: A) => B) | Lambda1<A, B>): Cell<B>;
    /**
     * Lift a binary function into cells, so the returned Cell always reflects the specified
     * function applied to the input cells' values.
     * @param fn Function to apply. It must be <em>referentially transparent</em>.
     */
    lift<B, C>(b: Cell<B>, fn0: ((a: A, b: B) => C) | Lambda2<A, B, C>): Cell<C>;
    /**
     * Lift a ternary function into cells, so the returned Cell always reflects the specified
     * function applied to the input cells' values.
     * @param fn Function to apply. It must be <em>referentially transparent</em>.
     */
    lift3<B, C, D>(b: Cell<B>, c: Cell<C>, fn0: ((a: A, b: B, c: C) => D) | Lambda3<A, B, C, D>): Cell<D>;
    /**
     * Lift a quaternary function into cells, so the returned Cell always reflects the specified
     * function applied to the input cells' values.
     * @param fn Function to apply. It must be <em>referentially transparent</em>.
     */
    lift4<B, C, D, E>(b: Cell<B>, c: Cell<C>, d: Cell<D>, fn0: ((a: A, b: B, c: C, d: D) => E) | Lambda4<A, B, C, D, E>): Cell<E>;
    /**
     * Lift a 5-argument function into cells, so the returned Cell always reflects the specified
     * function applied to the input cells' values.
     * @param fn Function to apply. It must be <em>referentially transparent</em>.
     */
    lift5<B, C, D, E, F>(b: Cell<B>, c: Cell<C>, d: Cell<D>, e: Cell<E>, fn0: ((a: A, b: B, c: C, d: D, e: E) => F) | Lambda5<A, B, C, D, E, F>): Cell<F>;
    /**
     * Lift a 6-argument function into cells, so the returned Cell always reflects the specified
     * function applied to the input cells' values.
     * @param fn Function to apply. It must be <em>referentially transparent</em>.
     */
    lift6<B, C, D, E, F, G>(b: Cell<B>, c: Cell<C>, d: Cell<D>, e: Cell<E>, f: Cell<F>, fn0: ((a: A, b: B, c: C, d: D, e: E, f: F) => G) | Lambda6<A, B, C, D, E, F, G>): Cell<G>;
    /**
     * Apply a value inside a cell to a function inside a cell. This is the
     * primitive for all function lifting.
     */
    static apply<A, B>(cf: Cell<(a: A) => B>, ca: Cell<A>, sources?: Source[]): Cell<B>;
    /**
     * Unwrap a cell inside another cell to give a time-varying cell implementation.
     */
    static switchC<A>(cca: Cell<Cell<A>>): Cell<A>;
    /**
     * Unwrap a stream inside a cell to give a time-varying stream implementation.
     */
    static switchS<A>(csa: Cell<Stream<A>>): Stream<A>;
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
    listen(h: (a: A) => void): () => void;
    /**
     * Fantasy-land Algebraic Data Type Compatability.
     * Cell satisfies the Monad and Comonad Categories (and hence Functor, Apply, Applicative, and Extend as well)
     * @see {@link https://github.com/fantasyland/fantasy-land} for more info
     */
    static 'fantasy-land/of'<A>(a: A): Cell<A>;
    'fantasy-land/map'<B>(f: ((a: A) => B)): Cell<B>;
    'fantasy-land/ap'<B>(cf: Cell<(a: A) => B>): Cell<B>;
    'fantasy-land/chain'<B>(f: ((a: A) => Cell<B>)): Cell<B>;
    'fantasy-land/extend'<B>(f: ((a: Cell<A>) => B)): Cell<B>;
    'fantasy-land/extract'(): A;
}
