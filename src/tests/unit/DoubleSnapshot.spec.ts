

import {
    lambda1,
    StreamSink,
    CellSink,
    Transaction,
    Tuple2,
    Operational,
    Cell,
    CellLoop,
    getTotalRegistrations,
    lambda2
} from '../../lib/Lib';

/*
 * Types
 */

interface Area {
    width: number;
    height: number;
}

interface Point {
    x: number;
    y: number;
}

interface State {
    info: string;
}

interface Unlisteners {
    display?: () => void;
    touch?: () => void;
    state?: () => void;
}

/*
 * Setup
 */

afterEach(() => {
    if (getTotalRegistrations() != 0) {
        throw new Error('listeners were not deregistered');
    }
});

/* 
 * Tests
 */
test('Double Snapshot', done => {
    const unlisteners:Unlisteners = {}; 
    const displayOut = new Array<Area>();
    const stateOut = new Array<State>();
    
    
    const sDisplay_Sink = new StreamSink<Area>();
    const cDisplay = sDisplay_Sink.hold({width: 1024, height: 768});
    unlisteners.display = 
        cDisplay.listen(area => {
            displayOut.push(area);
            checkEnd();
        });

    const sTouch_Sink = new StreamSink<Point>();
    const sTouch = 
        sTouch_Sink
            .snapshot(cDisplay, (touchPoint, display) => 
                ({
                    x: display.width + touchPoint.x,
                    y: display.height + touchPoint.y
                })
            );
    //unlisteners.touch = sTouch.listen(() => {});

    const sState_Sink = new StreamSink<void>();
    const cState = sState_Sink.accum({info: "Current State"}, (f, s) => s); 
    const sState = 
        sTouch.snapshot(cState, (point, state) => 
            ({
                info: state.info + `: (${point.x}, ${point.y})`
            })
        );
    unlisteners.state = 
        sState.listen(state => {
            stateOut.push(state);
            checkEnd();
        }); 

    sTouch_Sink.send({x: 176, y: 0});
    sDisplay_Sink.send({width: 2048, height: 1536});
    sState_Sink.send(null);
    sTouch_Sink.send({x: 176, y: 0});

    function checkEnd() {
        if(displayOut.length === 2 && stateOut.length === 2) {
            //need to delay in case of only immediate listener
            setTimeout(() => {
                unlisten(unlisteners);
            
                expect(displayOut).toEqual([
                    {width: 1024, height: 768},
                    {width: 2048, height: 1536}
                ]);

                expect(stateOut).toEqual([
                    { info: "Current State: (1200, 768)" },
                    { info: "Current State: (2224, 1536)" }
                ])
                done();
            }, 0);
        }
    }
});

function unlisten(unlisteners:Unlisteners) {
    Object.keys(unlisteners)
        .map(key => unlisteners[key])
        .forEach(fn => fn());
}
