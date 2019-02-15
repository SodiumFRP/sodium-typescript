import { Stream } from "./Stream";
export declare class IOAction {
    /*!
     * Convert a function that performs asynchronous I/O taking input A
     * and returning a value of type B into an I/O action of type
     * (sa : Stream<A>) => Stream<B>
     */
    static fromAsync<A, B>(performIO: (a: A, result: (b: B) => void) => void): (sa: Stream<A>) => Stream<B>;
}
