import { TimerSystem, TimerSystemImpl } from "./TimerSystem";

/**
 * A timer system implementation using milliseconds as the time unit.
 */
export class MillisecondsTimerSystem extends TimerSystem {
    constructor() {
        super(new MillisecondsTimerSystemImpl());
    }
}

class MillisecondsTimerSystemImpl extends TimerSystemImpl {
    /**
     * Set a timer that will execute the specified callback at the specified time.
     * @return A function that can be used to cancel the timer.
     */
    setTimer(t : number, callback : () => void) : () => void
    {
        let timeout = setTimeout(callback, Math.max(t - this.now(), 0));
        return () => { clearTimeout(timeout); }
    }

    /**
     * Return the current clock time.
     */
    now() : number
    {
        return Date.now();
    }
}
