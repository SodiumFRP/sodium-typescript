import { Vertex } from "./Vertex";
export declare class Listener<A> {
    constructor(h: (a: A) => void, target: Vertex);
    h: (a: A) => void;
    target: Vertex;
}
