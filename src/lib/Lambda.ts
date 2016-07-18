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

export function lambda1<A,B>(f : (a : A) => B,
                deps : Array<Stream<any>|Cell<any>>) : Lambda1<A,B>
{
    return new Lambda1(f, deps);
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

export function lambda2<A,B,C>(f : (a : A, b : B) => C,
                deps : Array<Stream<any>|Cell<any>>) : Lambda2<A,B,C>
{
    return new Lambda2(f, deps);
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

export class Lambda3<A,B,C,D> {
    constructor(f : (a : A, b : B, c : C) => D,
                deps : Array<Stream<any>|Cell<any>>) {
        this.f = f;
        this.deps = deps;
    }
    f : (a : A, b : B, c : C) => D;
    deps : Array<Stream<any>|Cell<any>>;
}

export function lambda3<A,B,C,D>(f : (a : A, b : B, c : C) => D,
                deps : Array<Stream<any>|Cell<any>>) : Lambda3<A,B,C,D>
{
    return new Lambda3(f, deps);
}

export function Lambda3_deps<A,B,C,D>(f : ((a : A, b : B, c : C) => D)
        | Lambda3<A,B,C,D>) : Array<Stream<any>|Cell<any>> {
    if (f instanceof Lambda3)
        return f.deps;
    else
        return [];
}

export function Lambda3_toFunction<A,B,C,D>(f : ((a : A, b : B, c : C) => D) | Lambda3<A,B,C,D>) : (a : A, b : B, c : C) => D {
    if (f instanceof Lambda3)
        return f.f;
    else
        return <(a : A, b : B, c : C) => D>f;
}

export class Lambda4<A,B,C,D,E> {
    constructor(f : (a : A, b : B, c : C, d : D) => E,
                deps : Array<Stream<any>|Cell<any>>) {
        this.f = f;
        this.deps = deps;
    }
    f : (a : A, b : B, c : C, d : D) => E;
    deps : Array<Stream<any>|Cell<any>>;
}

export function lambda4<A,B,C,D,E>(f : (a : A, b : B, c : C, d : D) => E,
                deps : Array<Stream<any>|Cell<any>>) : Lambda4<A,B,C,D,E>
{
    return new Lambda4(f, deps);
}

export function Lambda4_deps<A,B,C,D,E>(f : ((a : A, b : B, c : C, d : D) => E)
        | Lambda4<A,B,C,D,E>) : Array<Stream<any>|Cell<any>> {
    if (f instanceof Lambda4)
        return f.deps;
    else
        return [];
}

export function Lambda4_toFunction<A,B,C,D,E>(f : ((a : A, b : B, c : C, d : D) => E)
        | Lambda4<A,B,C,D,E>) : (a : A, b : B, c : C, d : D) => E {
    if (f instanceof Lambda4)
        return f.f;
    else
        return <(a : A, b : B, c : C, d : D) => E>f;
}

export class Lambda5<A,B,C,D,E,F> {
    constructor(f : (a : A, b : B, c : C, d : D, e : E) => F,
                deps : Array<Stream<any>|Cell<any>>) {
        this.f = f;
        this.deps = deps;
    }
    f : (a : A, b : B, c : C, d : D, e : E) => F;
    deps : Array<Stream<any>|Cell<any>>;
}

export function lambda5<A,B,C,D,E,F>(f : (a : A, b : B, c : C, d : D, e : E) => F,
                deps : Array<Stream<any>|Cell<any>>) : Lambda5<A,B,C,D,E,F>
{
    return new Lambda5(f, deps);
}

export function Lambda5_deps<A,B,C,D,E,F>(f : ((a : A, b : B, c : C, d : D, e : E) => F)
        | Lambda5<A,B,C,D,E,F>) : Array<Stream<any>|Cell<any>> {
    if (f instanceof Lambda5)
        return f.deps;
    else
        return [];
}

export function Lambda5_toFunction<A,B,C,D,E,F>(f : ((a : A, b : B, c : C, d : D, e : E) => F)
        | Lambda5<A,B,C,D,E,F>) : (a : A, b : B, c : C, d : D, e : E) => F {
    if (f instanceof Lambda5)
        return f.f;
    else
        return <(a : A, b : B, c : C, d : D, e : E) => F>f;
}

export class Lambda6<A,B,C,D,E,F,G> {
    constructor(f : (a : A, b : B, c : C, d : D, e : E, f : F) => G,
                deps : Array<Stream<any>|Cell<any>>) {
        this.f = f;
        this.deps = deps;
    }
    f : (a : A, b : B, c : C, d : D, e : E, f : F) => G;
    deps : Array<Stream<any>|Cell<any>>;
}

export function lambda6<A,B,C,D,E,F,G>(f : (a : A, b : B, c : C, d : D, e : E, f : F) => G,
                deps : Array<Stream<any>|Cell<any>>) : Lambda6<A,B,C,D,E,F,G>
{
    return new Lambda6(f, deps);
}

export function Lambda6_deps<A,B,C,D,E,F,G>(f : ((a : A, b : B, c : C, d : D, e : E, f : F) => G)
        | Lambda6<A,B,C,D,E,F,G>) : Array<Stream<any>|Cell<any>> {
    if (f instanceof Lambda6)
        return f.deps;
    else
        return [];
}

export function Lambda6_toFunction<A,B,C,D,E,F,G>(f : ((a : A, b : B, c : C, d : D, e : E, f : F) => G)
        | Lambda6<A,B,C,D,E,F,G>) : (a : A, b : B, c : C, d : D, e : E, f : F) => G {
    if (f instanceof Lambda6)
        return f.f;
    else
        return <(a : A, b : B, c : C, d : D, e : E, f : F) => G>f;
}

export function toSources(deps : Array<Stream<any>|Cell<any>>) : Source[] {
    const ss : Source[] = [];
    for (let i = 0; i < deps.length; i++) {
        const dep = deps[i];
        ss.push(new Source(dep.getVertex__(), null));
    }
    return ss;
}
