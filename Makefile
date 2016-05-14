SOURCES=Vertex.ts \
        Transaction.ts \
        Sodium.ts \
        suite.ts

all: $(SOURCES)
	tsc --out suite.js suite.ts

clean:
	rm -f $(SOURCES:.ts=.js)

run: all
	node suite
