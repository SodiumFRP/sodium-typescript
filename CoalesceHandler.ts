import { Lambda1, Lambda1_deps, Lambda1_toFunction,
         Lambda2, Lambda2_deps, Lambda2_toFunction,
         toSources } from "./Lambda";
import { Transaction, transactionally, currentTransaction } from "./Transaction";
import { StreamWithSend } from "./Stream";
import { Vertex } from "./Vertex";

export class CoalesceHandler<A>
{
	constructor(f : ((l : A, r : A) => A) | Lambda2<A,A,A>, out : StreamWithSend<A>)
	{
	    this.f = Lambda2_toFunction(f);
	    this.out = out;
        this.out.getVertex().sources = this.out.getVertex().sources.concat(
            toSources(Lambda2_deps(f)));
        this.accumValid = false;
    }
	private f : (l : A, r : A) => A;
	private out : StreamWithSend<A>;
	private accumValid : boolean;
    private accum : A;
    send_(a : A) {
        if (this.accumValid)
            this.accum = this.f(this.accum, a);
        else {
            currentTransaction.prioritized(this.out.getVertex(), () => {
                this.out.send_(this.accum);
                this.accumValid = false;
                this.accum = null;
            });
            this.accum = a;
            this.accumValid = true;
        }
    }
}
