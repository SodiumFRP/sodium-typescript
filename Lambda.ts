import { Stream } from "./Stream";
import { Cell } from "./Cell";
import { Source } from "./Vertex";

export class Lambda1<A,B> {
    constructor(f : (a : A) => B,
                deps : Array<Stream<any>|Cell<any>>) {
        this.f = f;
        this.deps = deps;
    }
    f : (a : A) => B;
    deps : Array<Stream<any>|Cell<any>>;
}

export function Lambda1_deps<A,B>(f : ((a : A) => B) | Lambda1<A,B>) : Array<Stream<any>|Cell<any>> {
    if (f instanceof Lambda1)
        return f.deps;
    else
        return [];
}

export function Lambda1_toFunction<A,B>(f : ((a : A) => B) | Lambda1<A,B>) : (a : A) => B {
    if (f instanceof Lambda1)
        return f.f;
    else
        return <(a : A) => B>f;
}

export class Lambda2<A,B,C> {
    constructor(f : (a : A, b : B) => C,
                deps : Array<Stream<any>|Cell<any>>) {
        this.f = f;
        this.deps = deps;
    }
    f : (a : A, b : B) => C;
    deps : Array<Stream<any>|Cell<any>>;
}

export function Lambda2_deps<A,B,C>(f : ((a : A, b : B) => C) | Lambda2<A,B,C>) : Array<Stream<any>|Cell<any>> {
    if (f instanceof Lambda2)
        return f.deps;
    else
        return [];
}

export function Lambda2_toFunction<A,B,C>(f : ((a : A, b : B) => C) | Lambda2<A,B,C>) : (a : A, b : B) => C {
    if (f instanceof Lambda2)
        return f.f;
    else
        return <(a : A, b : B) => C>f;
}

export function toSources(deps : Array<Stream<any>|Cell<any>>) : Source[] {
    let ss : Source[] = [];
    for (let i = 0; i < deps.length; i++) {
        let dep = deps[i];
        ss.push(new Source(dep.getVertex__(), null));
    }
    return ss;
}
