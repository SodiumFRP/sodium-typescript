SOURCES=Vertex.ts \
        Transaction.ts \
        Stream.ts \
        Sodium.ts \
        suite.ts

all: $(SOURCES:.ts=.js)
	tsc --out suite.js suite.ts

clean:
	rm -f $(SOURCES:.ts=.js)

run: all
	node suite
