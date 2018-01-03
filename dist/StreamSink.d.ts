import { Lambda2 } from "./Lambda";
import { StreamWithSend } from "./Stream";
/**
 * A stream that allows values to be pushed into it, acting as an interface between the
 * world of I/O and the world of FRP. Code that exports StreamSinks for read-only use
 * should downcast to {@link Stream}.
 */
export declare class StreamSink<A> extends StreamWithSend<A> {
    constructor(f?: ((l: A, r: A) => A) | Lambda2<A, A, A>);
    private coalescer;
    send(a: A): void;
}
