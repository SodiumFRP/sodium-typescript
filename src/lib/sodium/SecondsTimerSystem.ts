import { TimerSystem, TimerSystemImpl } from "./TimerSystem";

/**
 * A timer system implementation using seconds as the time unit.
 */
export class SecondsTimerSystem extends TimerSystem {
    constructor() {
        super(new SecondsTimerSystemImpl());
    }
}

class SecondsTimerSystemImpl extends TimerSystemImpl {
    /**
     * Set a timer that will execute the specified callback at the specified time.
     * @return A function that can be used to cancel the timer.
     */
    setTimer(t : number, callback : () => void) : () => void
    {
        let timeout = setTimeout(callback, Math.max((t - this.now()) * 1000, 0));
        return () => { clearTimeout(timeout); }
    }

    /**
     * Return the current clock time.
     */
    now() : number
    {
        return Date.now() * 0.001;
    }
}
