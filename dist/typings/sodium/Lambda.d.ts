import { Stream } from "./Stream";
import { Cell } from "./Cell";
import { Source } from "./Vertex";
export declare class Lambda1<A, B> {
    constructor(f: (a: A) => B, deps: Array<Stream<any> | Cell<any>>);
    f: (a: A) => B;
    deps: Array<Stream<any> | Cell<any>>;
}
export declare function lambda1<A, B>(f: (a: A) => B, deps: Array<Stream<any> | Cell<any>>): Lambda1<A, B>;
export declare function Lambda1_deps<A, B>(f: ((a: A) => B) | Lambda1<A, B>): Array<Stream<any> | Cell<any>>;
export declare function Lambda1_toFunction<A, B>(f: ((a: A) => B) | Lambda1<A, B>): (a: A) => B;
export declare class Lambda2<A, B, C> {
    constructor(f: (a: A, b: B) => C, deps: Array<Stream<any> | Cell<any>>);
    f: (a: A, b: B) => C;
    deps: Array<Stream<any> | Cell<any>>;
}
export declare function lambda2<A, B, C>(f: (a: A, b: B) => C, deps: Array<Stream<any> | Cell<any>>): Lambda2<A, B, C>;
export declare function Lambda2_deps<A, B, C>(f: ((a: A, b: B) => C) | Lambda2<A, B, C>): Array<Stream<any> | Cell<any>>;
export declare function Lambda2_toFunction<A, B, C>(f: ((a: A, b: B) => C) | Lambda2<A, B, C>): (a: A, b: B) => C;
export declare class Lambda3<A, B, C, D> {
    constructor(f: (a: A, b: B, c: C) => D, deps: Array<Stream<any> | Cell<any>>);
    f: (a: A, b: B, c: C) => D;
    deps: Array<Stream<any> | Cell<any>>;
}
export declare function lambda3<A, B, C, D>(f: (a: A, b: B, c: C) => D, deps: Array<Stream<any> | Cell<any>>): Lambda3<A, B, C, D>;
export declare function Lambda3_deps<A, B, C, D>(f: ((a: A, b: B, c: C) => D) | Lambda3<A, B, C, D>): Array<Stream<any> | Cell<any>>;
export declare function Lambda3_toFunction<A, B, C, D>(f: ((a: A, b: B, c: C) => D) | Lambda3<A, B, C, D>): (a: A, b: B, c: C) => D;
export declare class Lambda4<A, B, C, D, E> {
    constructor(f: (a: A, b: B, c: C, d: D) => E, deps: Array<Stream<any> | Cell<any>>);
    f: (a: A, b: B, c: C, d: D) => E;
    deps: Array<Stream<any> | Cell<any>>;
}
export declare function lambda4<A, B, C, D, E>(f: (a: A, b: B, c: C, d: D) => E, deps: Array<Stream<any> | Cell<any>>): Lambda4<A, B, C, D, E>;
export declare function Lambda4_deps<A, B, C, D, E>(f: ((a: A, b: B, c: C, d: D) => E) | Lambda4<A, B, C, D, E>): Array<Stream<any> | Cell<any>>;
export declare function Lambda4_toFunction<A, B, C, D, E>(f: ((a: A, b: B, c: C, d: D) => E) | Lambda4<A, B, C, D, E>): (a: A, b: B, c: C, d: D) => E;
export declare class Lambda5<A, B, C, D, E, F> {
    constructor(f: (a: A, b: B, c: C, d: D, e: E) => F, deps: Array<Stream<any> | Cell<any>>);
    f: (a: A, b: B, c: C, d: D, e: E) => F;
    deps: Array<Stream<any> | Cell<any>>;
}
export declare function lambda5<A, B, C, D, E, F>(f: (a: A, b: B, c: C, d: D, e: E) => F, deps: Array<Stream<any> | Cell<any>>): Lambda5<A, B, C, D, E, F>;
export declare function Lambda5_deps<A, B, C, D, E, F>(f: ((a: A, b: B, c: C, d: D, e: E) => F) | Lambda5<A, B, C, D, E, F>): Array<Stream<any> | Cell<any>>;
export declare function Lambda5_toFunction<A, B, C, D, E, F>(f: ((a: A, b: B, c: C, d: D, e: E) => F) | Lambda5<A, B, C, D, E, F>): (a: A, b: B, c: C, d: D, e: E) => F;
export declare class Lambda6<A, B, C, D, E, F, G> {
    constructor(f: (a: A, b: B, c: C, d: D, e: E, f: F) => G, deps: Array<Stream<any> | Cell<any>>);
    f: (a: A, b: B, c: C, d: D, e: E, f: F) => G;
    deps: Array<Stream<any> | Cell<any>>;
}
export declare function lambda6<A, B, C, D, E, F, G>(f: (a: A, b: B, c: C, d: D, e: E, f: F) => G, deps: Array<Stream<any> | Cell<any>>): Lambda6<A, B, C, D, E, F, G>;
export declare function Lambda6_deps<A, B, C, D, E, F, G>(f: ((a: A, b: B, c: C, d: D, e: E, f: F) => G) | Lambda6<A, B, C, D, E, F, G>): Array<Stream<any> | Cell<any>>;
export declare function Lambda6_toFunction<A, B, C, D, E, F, G>(f: ((a: A, b: B, c: C, d: D, e: E, f: F) => G) | Lambda6<A, B, C, D, E, F, G>): (a: A, b: B, c: C, d: D, e: E, f: F) => G;
export declare function toSources(deps: Array<Stream<any> | Cell<any>>): Source[];
