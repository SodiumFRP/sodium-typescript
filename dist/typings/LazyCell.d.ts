import { Lazy } from "./Lazy";
import { Cell } from "./Cell";
import { Stream } from "./Stream";
export declare class LazyCell<A> extends Cell<A> {
    constructor(lazyInitValue: Lazy<A>, str?: Stream<A>);
    sampleNoTrans__(): A;
}
