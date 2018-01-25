import { Stream } from "./Stream";
import { Cell } from "./Cell";
/**
 * An interface for implementations of FRP timer systems.
 */
export declare abstract class TimerSystemImpl {
    /**
     * Set a timer that will execute the specified callback at the specified time.
     * @return A function that can be used to cancel the timer.
     */
    abstract setTimer(t: number, callback: () => void): () => void;
    /**
     * Return the current clock time.
     */
    abstract now(): number;
}
export declare class TimerSystem {
    constructor(impl: TimerSystemImpl);
    private impl;
    private tMinimum;
    /**
     * A cell giving the current clock time.
     */
    time: Cell<number>;
    private eventQueue;
    /**
     * A timer that fires at the specified time, which can be null, meaning
     * that the alarm is not set.
     */
    at(tAlarm: Cell<number>): Stream<number>;
}
