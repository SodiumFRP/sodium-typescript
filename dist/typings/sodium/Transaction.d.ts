import { Vertex } from './Vertex';
import * as Collections from 'typescript-collections';
export declare class Entry {
    constructor(rank: Vertex, action: () => void);
    private static nextSeq;
    rank: Vertex;
    action: () => void;
    seq: number;
    toString(): string;
}
export declare class Transaction {
    static currentTransaction: Transaction;
    private static onStartHooks;
    private static runningOnStartHooks;
    constructor();
    inCallback: number;
    private toRegen;
    requestRegen(): void;
    prioritizedQ: Collections.PriorityQueue<Entry>;
    private entries;
    private sampleQ;
    private lastQ;
    private postQ;
    prioritized(target: Vertex, action: () => void): void;
    sample(h: () => void): void;
    last(h: () => void): void;
    static post_(action: () => void): void;
    /**
     * Add an action to run after all last() actions.
     */
    post(childIx: number, action: () => void): void;
    private checkRegen;
    isActive(): boolean;
    close(): void;
    /**
     * Add a runnable that will be executed whenever a transaction is started.
     * That runnable may start transactions itself, which will not cause the
     * hooks to be run recursively.
     *
     * The main use case of this is the implementation of a time/alarm system.
     */
    static onStart(r: () => void): void;
    static run<A>(f: () => A): A;
}
