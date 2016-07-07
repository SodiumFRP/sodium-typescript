SOURCES=\
    Cell.ts \
    CellSink.ts \
    CellLoop.ts \
    CoalesceHandler.ts \
    Lambda.ts \
    Lazy.ts \
    Listener.ts \
    Stream.ts \
    StreamSink.ts \
    suite.ts \
    Transaction.ts \
    Tuple2.ts \
    Unit.ts \
    Vertex.ts

all: $(SOURCES)
	tsc suite.ts

clean:
	rm -f $(SOURCES:.ts=.js)

run: all
	node --stack-trace-limit=1000 suite
