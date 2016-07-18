import { Lambda2 } from "./Lambda";
import { StreamWithSend } from "./Stream";
export declare class CoalesceHandler<A> {
    constructor(f: ((l: A, r: A) => A) | Lambda2<A, A, A>, out: StreamWithSend<A>);
    private f;
    private out;
    private accumValid;
    private accum;
    private verbose;
    send_(a: A): void;
}
