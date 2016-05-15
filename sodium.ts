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

class Listener<A> {
    constructor(h : (a : A) => void, target : Vertex) {
        this.h = h;
        this.target = target;
    }
    h : (a : A) => void;
    target : Vertex;
}

class Stream<A> {
    constructor() {
        this.vertex = new Vertex(0, []);
    }

    private vertex : Vertex;
    protected listeners : Array<Listener<A>> = [];
    private firings : A[] = [];

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
        out.vertex = new Vertex(0, [
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
        return transactionally<() => void>(() => {
            return this.listen_(Vertex.NULL, h, false);
        });
    }

    listen_(target : Vertex,
            h : (a : A) => void,
            suppressEarlierFirings : boolean) : () => void {
        if (this.listeners.length == 0)
            if (this.vertex.register(target))
                currentTransaction.requestRegen();
        const listener = new Listener<A>(h, target);
        this.listeners.push(listener);
        if (!suppressEarlierFirings && this.firings.length != 0) {
            const firings = this.firings.slice();
            currentTransaction.prioritized(target, () => {
                // Anything sent already in this transaction must be sent now so that
                // there's no order dependency between send and listen.
                for (let i = 0; i < firings.length; i++)
                    h(firings[i]);
            });
        }
        return () => {
            if (this.listeners.length != 0) {
                for (let i = 0; i < this.listeners.length; i++) {
                    if (this.listeners[i] == listener) {
                        this.listeners.splice(i, 1);
                        break;
                    }
                }
                if (this.listeners.length == 0)
                    this.vertex.deregister(target);
            }
        };
    }

    protected send_(a : A) : void {
        if (this.vertex.registered == 0)
            throw "send() was invoked before listeners were registered";
		if (this.firings.length == 0)
			currentTransaction.last(() => {
			    this.firings = [];
            });
		this.firings.push(a);
		const listeners = this.listeners.slice();
        for (let i = 0; i < listeners.length; i++) {
            const h = listeners[i].h;
            currentTransaction.prioritized(listeners[i].target, () => {
                currentTransaction.inCallback++;
                try {
                    h(a);
                    currentTransaction.inCallback--;
                }
                catch (err) {
                    currentTransaction.inCallback--;
                    throw err;
                }
            });
        }
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
        console.log("Hello "+global);
    }

    send(a : A) : void {
        transactionally<void>(
            () => { this.send_(a); }
        )
    }
}

