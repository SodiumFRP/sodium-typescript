SOURCES=\
    Cell.ts \
    CellSink.ts \
    CoalesceHandler.ts \
    Lambda.ts \
    Lazy.ts \
    Listener.ts \
    StreamSink.ts \
    Stream.ts \
    suite.ts \
    Transaction.ts \
    Vertex.ts

all: $(SOURCES)
	tsc suite.ts

clean:
	rm -f $(SOURCES:.ts=.js)

run: all
	node suite
