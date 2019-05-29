import { Dictionary } from 'typescript-collections';
import { Stream, StreamWithSend } from './Stream';
import { Vertex, Source } from './Vertex';

export class Router<A,K> {
    private _inStream: Stream<A>;
    private _table: Dictionary<K,StreamWithSend<A>[]>;
    private _vertex: Vertex;

    public constructor(inStream: Stream<A>, selector: (a: A) => K[], keyToStr?: (k: K)=>string) {
        this._inStream = inStream;
        this._table = new Dictionary(keyToStr);
        this._vertex =
            new Vertex(
                "Router",
                this._inStream.getVertex__().rank + 1, // <-- estimated rank only, maybe adjusted by ensureBiggerThan
                []
            );
        this._vertex.addSource(
            new Source(
                this._inStream.getVertex__(),
                () =>
                    this._inStream.listen_(
                        this._vertex,
                        (a: A) => {
                            let ks = selector(a);
                            let outs: StreamWithSend<A>[] = [];
                            for (let i = 0; i < ks.length; ++i) {
                                let k = ks[i];
                                let outs2 = this._table.getValue(k);
                                if (outs2 != undefined) {
                                    for (let j = 0; j < outs2.length; ++j) {
                                        outs.push(outs2[j]);
                                    }
                                }
                            }
                            for (let i = 0; i < outs.length; ++i) {
                                outs[i].send_(a);
                            }
                        },
                        true
                    )
            )
        );
    }

    public filterIncludes(k: K): Stream<A> {
        let out = new StreamWithSend<A>();
        let vertex =
            new Vertex(
                "Router::filterEquals",
                this._vertex.rank + 1, // <-- estimated rank only, maybe adjusted by ensureBiggerThan
                [
                    new Source(
                        this._vertex,
                        () => {
                            this._vertex.increment(out.getVertex__());
                            let outs: StreamWithSend<A>[] = this._table.getValue(k);
                            if (outs == undefined) {
                                outs = [];
                                this._table.setValue(k, outs);
                            }
                            outs.push(out);
                            return () => {
                                this._vertex.decrement(out.getVertex__());
                                let outs2 = this._table.getValue(k);
                                for (let i = outs2.length-1; i >= 0; --i) {
                                    if (outs2[i] == out) {
                                        outs2.splice(i, 1);
                                        break;
                                    }
                                }
                                if (outs2.length == 0) {
                                    this._table.remove(k);
                                }
                            };
                        }
                    )
                ]
            );
        out.setVertex__(vertex);
        return out;
    }
}
