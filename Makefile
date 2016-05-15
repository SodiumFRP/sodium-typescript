SOURCES=Vertex.ts \
        Transaction.ts \
        sodium.ts \
        suite.ts

all: $(SOURCES)
	tsc --out sodium.js sodium.ts
	tsc --out suite.js suite.ts

clean:
	rm -f $(SOURCES:.ts=.js)

run: all
	node suite
