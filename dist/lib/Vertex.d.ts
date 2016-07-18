import { Set } from "typescript-collections";
export declare function getTotalRegistrations(): number;
export declare class Source {
    constructor(origin: Vertex, register_: () => () => void);
    origin: Vertex;
    private register_;
    private registered;
    private deregister_;
    register(target: Vertex): void;
    deregister(target: Vertex): void;
}
export declare enum Color {
    black = 0,
    gray = 1,
    white = 2,
    purple = 3,
}
export declare function setVerbose(v: boolean): void;
export declare function describeAll(v: Vertex, visited: Set<number>): void;
export declare class Vertex {
    static NULL: Vertex;
    id: number;
    constructor(name: string, rank: number, sources: Source[]);
    name: string;
    rank: number;
    sources: Source[];
    targets: Vertex[];
    childrn: Vertex[];
    refCount(): number;
    visited: boolean;
    register(target: Vertex): boolean;
    deregister(target: Vertex): void;
    private incRefCount(target);
    private decRefCount(target);
    addSource(src: Source): void;
    private ensureBiggerThan(limit);
    descr(): string;
    color: Color;
    buffered: boolean;
    refCountAdj: number;
    children(): Vertex[];
    increment(referrer: Vertex): boolean;
    decrement(referrer: Vertex): void;
    release(): void;
    free(): void;
    possibleRoots(): void;
    static collectCycles(): void;
    static markRoots(): void;
    static scanRoots(): void;
    static collectRoots(): void;
    markGray(): void;
    scan(): void;
    scanBlack(): void;
    collectWhite(): void;
}
