import { Stream, StreamWithSend } from "./Stream";
import { Vertex, Source } from "./Vertex";
import { transactionally } from "./Transaction";

export class IOAction {
    /*!
     * Convert a function that performs asynchronous I/O taking input A
     * and returning a value of type B into an I/O action of type
     * (sa : Stream<A>) => Stream<B>
     */
    static fromAsync<A,B>(performIO : (a : A, result : (b : B) => void) => void)
            : (sa : Stream<A>) => Stream<B> {
        return (sa : Stream<A>) => {
            const out = new StreamWithSend<B>(null);
            out.setVertex__(new Vertex("map", 0, [
                    new Source(
                        sa.getVertex__(),
                        () => {
                            return sa.listen_(out.getVertex__(), (a : A) => {
                                performIO(a, (b : B) => {
                                    transactionally(() => {
                                        out.send_(b);
                                    });
                                });
                            }, false);
                        }
                    )
                ]
            ));
            return out;
        }
    }
}
