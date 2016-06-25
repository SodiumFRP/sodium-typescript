import { Source, Vertex } from "./Vertex";

export class Listener<A> {
    constructor(h : (a : A) => void, target : Vertex) {
        this.h = h;
        this.target = target;
    }
    h : (a : A) => void;
    target : Vertex;
}
