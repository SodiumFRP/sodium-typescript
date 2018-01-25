import { Stream } from "./Stream";
export declare class IOAction {
    static fromAsync<A, B>(performIO: (a: A, result: (b: B) => void) => void): (sa: Stream<A>) => Stream<B>;
}
