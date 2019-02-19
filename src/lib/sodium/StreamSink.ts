import { Lambda1, Lambda1_deps, Lambda1_toFunction,
         Lambda2, Lambda2_deps, Lambda2_toFunction } from "./Lambda";
import { StreamWithSend } from "./Stream";
import { CoalesceHandler } from "./CoalesceHandler";
import { Transaction } from "./Transaction";
import { Vertex } from './Vertex';

/**
 * A stream that allows values to be pushed into it, acting as an interface between the
 * world of I/O and the world of FRP. Code that exports StreamSinks for read-only use
 * should downcast to {@link Stream}.
 */
export class StreamSink<A> extends StreamWithSend<A> {
    private disableListenCheck: boolean = false;

    constructor(f? : ((l : A, r : A) => A) | Lambda2<A, A, A>) {
        super();
        if (!f)
            f = <(l : A, r : A) => A>((l : A, r : A) => {
                throw new Error("send() called more than once per transaction, which isn't allowed. Did you want to combine the events? Then pass a combining function to your StreamSink constructor.");
            });
        this.coalescer = new CoalesceHandler<A>(f, this);
    }

    private coalescer : CoalesceHandler<A>;

    send(a : A) : void {
        Transaction.run<void>(
            () => {
                // We throw this error if we send into FRP logic that has been constructed
                // but nothing is listening to it yet. We need to do it this way because
                // it's the only way to manage memory in a language with no finalizers.
                if (!this.disableListenCheck) {
                    if (this.vertex.refCount() == 0) {
                        throw new Error("send() was invoked before listeners were registered");
                    }
                }
                //
                if (Transaction.currentTransaction.inCallback > 0)
                    throw new Error("You are not allowed to use send() inside a Sodium callback");
                this.coalescer.send_(a);
            }
        )
    }

    listen_(target : Vertex,
            h : (a : A) => void,
            suppressEarlierFirings : boolean) : () => void {
        let result = super.listen_(target, h, suppressEarlierFirings);
        this.disableListenCheck = true;
        return result;
    }
}
