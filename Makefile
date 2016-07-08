SOURCES=\
    Cell.ts \
    CellSink.ts \
    CellLoop.ts \
    CoalesceHandler.ts \
    Lambda.ts \
    Lazy.ts \
    LazyCell.ts \
    Listener.ts \
    Operational.ts \
    Stream.ts \
    StreamSink.ts \
    sodium.ts \
    sodium-time.ts \
    TimerSystem.ts \
    MillisecondsTimerSystem.ts \
    SecondsTimerSystem.ts \
    Transaction.ts \
    Tuple2.ts \
    Unit.ts \
    Vertex.ts

all: $(SOURCES) suite.ts
	tsc suite.ts test-timers.ts

clean:
	rm -f $(SOURCES:.ts=.js) \
	    test-timers.js suite.js

# Run the test suite
suite: all
	node --stack-trace-limit=1000 suite

# Alias for suite
test: suite

# Run the program that tests timers
test-timers: all
	node --stack-trace-limit=1000 test-timers
