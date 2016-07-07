import { Vertex, Source } from "./Vertex";
import { BSTree } from 'typescript-collections';
import { Stream, StreamWithSend } from "./Stream";
import { StreamSink } from "./StreamSink";
import { Cell } from "./Cell";
import { CellSink } from "./CellSink";
import { Transaction, transactionally, currentTransaction } from "./Transaction";

/**
 * An interface for implementations of FRP timer systems.
 */
export abstract class TimerSystemImpl {
    /**
     * Set a timer that will execute the specified callback at the specified time.
     * @return A function that can be used to cancel the timer.
     */
    abstract setTimer(t : number, callback : () => void) : () => void;

    /**
     * Return the current clock time.
     */
    abstract now() : number;
}

let nextSeq : number = 0;

class Event {
    constructor(t : number, sAlarm : StreamWithSend<number>) {
        this.t = t;
        this.sAlarm = sAlarm;
        this.seq = ++nextSeq;
    }
    t : number;
    sAlarm : StreamWithSend<number>;
    seq : number;  // Used to guarantee uniqueness
}

export class TimerSystem {
    constructor(impl : TimerSystemImpl) {
        transactionally(() => {
            this.impl = impl;
            const timeSnk = new CellSink<number>(impl.now());
            this.time = timeSnk;
            // A dummy listener to time to keep it alive even when there are no other listeners.
            this.time.listen((t : number) => { });
            Transaction.onStart(() => {
                const t = impl.now();
                // Pop and execute all events earlier than or equal to t (the current time).
                while (true) {
                    let ev : Event = null;
                    if (!this.eventQueue.isEmpty()) {
                        let mev = this.eventQueue.minimum();
                        if (mev.t <= t) {
                            ev = mev;
                            // TO DO: Detect infinite loops!
                            //this.eventQueue.remove(mev);
                        }
                    }
                    if (ev != null) {
                        timeSnk.send(ev.t);
                        transactionally(() => ev.sAlarm.send_(ev.t));
                    }
                    else
                        break;
                }
                timeSnk.send(t);
            });
        });
    }

    private impl : TimerSystemImpl;

    /**
     * A cell giving the current clock time.
     */
    time : Cell<number>;

    private eventQueue : BSTree<Event> = new BSTree<Event>((a, b) => {
        if (a.t < b.t) return -1;
        if (a.t > b.t) return 1;
        if (a.seq < b.seq) return -1;
        if (a.seq > b.seq) return 1;
        return 0;
    });

    /**
     * A timer that fires at the specified time, which can be null, meaning
     * that the alarm is not set.
     */
    at(tAlarm : Cell<number>) : Stream<number> {
        let current : Event = null,
            cancelCurrent : () => void = null,
            active : boolean = false,
            tAl : number = null,
            sampled : boolean = false;
        const sAlarm = new StreamWithSend<number>(null),
            updateTimer = () => {
                if (cancelCurrent !== null) {
                    cancelCurrent();
                    this.eventQueue.remove(current);
                }
                cancelCurrent = null;
                current = null;
                if (active) {
                    if (!sampled) {
                        sampled = true;
                        tAl = tAlarm.sampleNoTrans__();
                    }
                    if (tAl !== null) {
                        current = new Event(tAl, sAlarm);
                        this.eventQueue.add(current);
                        cancelCurrent = this.impl.setTimer(tAl, () => {
                                    // Open and close a transaction to trigger queued
                                    // events to run.
                                    transactionally(() => {});
                                });
                    }
                }
            };
        sAlarm.setVertex__(new Vertex(0, [
                new Source(
                    tAlarm.getVertex__(),
                    () => {
                        active = true;
                        sampled = false;
                        currentTransaction.prioritized(sAlarm.getVertex__(), updateTimer);
                        const kill = tAlarm.getStream__().listen_(sAlarm.getVertex__(), (oAlarm : number) => {
                            tAl = oAlarm;
                            sampled = true;
                            updateTimer();
                        }, false);
                        return () => {
                            console.log("terminate");
                            active = false;
                            updateTimer();
                            kill();
                        };
                    }
                )
            ]
        ));
        return sAlarm;
    }
}

