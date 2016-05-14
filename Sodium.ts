/// <reference path='Vertex.ts'/>
/// <reference path='Transaction.ts'/>

class Lambda1<A,B> {
    constructor(f : (a : A) => B,
                deps : Array<Stream<any>|Cell<any>>) {
        this.f = f;
        this.deps = deps;
    }
    f : (a : A) => B;
    deps : Array<Stream<any>|Cell<any>>;
}

function Lambda1_deps<A,B>(f : ((a : A) => B) | Lambda1<A,B>) : Array<Stream<any>|Cell<any>> {
    if (f instanceof Lambda1)
        return f.deps;
    else
        return [];
}

function toSources(deps : Array<Stream<any>|Cell<any>>) : Source[] {
    let ss : Source[] = [];
    for (let i = 0; i < deps.length; i++) {
        let dep = deps[i];
        ss.push(new Source(dep.getVertex(), null));
    }
    return ss;
}

function Lambda1_toFunction<A,B>(f : ((a : A) => B) | Lambda1<A,B>) : (a : A) => B {
    if (f instanceof Lambda1)
        return f.f;
    else
        return <(a : A) => B>f;
}

class Stream<A> {
    constructor() {
        this.vertex = new Vertex([]);
    }

    private vertex : Vertex;
    protected listeners : Array<(a : A) => void> = [];

    getVertex() : Vertex {
        return this.vertex;
    }

    /**
     * Transform the stream's event values according to the supplied function, so the returned
     * Stream's event values reflect the value of the function applied to the input
     * Stream's event values.
     * @param f Function to apply to convert the values. It may construct FRP logic or use
     *    {@link Cell#sample()} in which case it is equivalent to {@link Stream#snapshot(Cell)}ing the
     *    cell. Apart from this the function must be <em>referentially transparent</em>.
     */
    map<B>(f : ((a : A) => B) | Lambda1<A,B>) : Stream<B> {
        const out = new Stream<B>();
        let ff = Lambda1_toFunction(f);
        out.vertex = new Vertex([
                new Source(
                    this.vertex,
                    () => {
                        return this.listen((a : A) => {
                            out.send_(ff(a));
                        });
                    }
                )
            ].concat(toSources(Lambda1_deps(f)))
        );
        return out;
    }

    listen(h : (a : A) => void) : () => void {
        if (this.listeners.length == 0)
            this.vertex.register();
        this.listeners.push(h);
        return () => {
            if (this.listeners.length != 0) {
                for (let i = 0; i < this.listeners.length; i++) {
                    if (this.listeners[i] == h) {
                        this.listeners.splice(i, 1);
                        break;
                    }
                }
                if (this.listeners.length == 0)
                    this.vertex.deregister();
            }
        };
    }

    protected send_(a : A) : void {
        if (this.vertex.registered == 0)
            throw "send() was invoked before listeners were registered";
        for (let i = 0; i < this.listeners.length; i++)
            this.listeners[i](a);
    }
}

class Cell<A> {
    constructor(a : A) {
    }

    getVertex() : Vertex {
        return null;
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

