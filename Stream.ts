/// <reference path='Vertex.ts'/>
/// <reference path='Transaction.ts'/>

class Stream<A> {
    constructor() {
        this.vertex = new Vertex([]);
    }
    private static create<A>(sources : Source[]) {
        let s = new Stream<A>();
        s.vertex = new Vertex(sources);
        return s;
    }

    private vertex : Vertex;
    protected listeners : Array<(a : A) => void> = [];

    /**
     * Transform the stream's event values according to the supplied function, so the returned
     * Stream's event values reflect the value of the function applied to the input
     * Stream's event values.
     * @param f Function to apply to convert the values. It may construct FRP logic or use
     *    {@link Cell#sample()} in which case it is equivalent to {@link Stream#snapshot(Cell)}ing the
     *    cell. Apart from this the function must be <em>referentially transparent</em>.
     */
    map<B>(f : (a : A) => B) : Stream<B> {
        const out = new Stream<B>();
        out.vertex = new Vertex([
            new Source(
                this.vertex,
                () => {
                    return this.listen((a : A) => {
                        out.send_(f(a));
                    });
                }
            )
        ]);
        return out;
    }

    listen(h : (a : A) => void) : () => void {
        if (this.listeners.length == 0) {
            for (let i = 0; i < this.vertex.sources.length; i++) {
                let src = this.vertex.sources[i];
                src.deregister = src.register();
            }
        }
        this.listeners.push(h);
        return () => {
            if (this.listeners.length != 0) {
                for (let i = 0; i < this.listeners.length; i++) {
                    if (this.listeners[i] == h) {
                        this.listeners.splice(i, 1);
                        break;
                    }
                }
                if (this.listeners.length == 0) {
                    for (let i = 0; i < this.vertex.sources.length; i++) {
                        let src = this.vertex.sources[i];
                        src.deregister();
                        src.deregister = null;
                    }
                }
            }
        };
    }

    protected send_(a : A) : void {
        if (this.listeners.length == 0)
            throw "send() was invoked before listeners were registered";
        for (let i = 0; i < this.listeners.length; i++)
            this.listeners[i](a);
    }
}

class StreamSink<A> extends Stream<A> {
    constructor() {
        super();
    }

    send(a : A) : void {
        transactionally<void>(
            () => { this.send_(a); }
        )
    }
}

