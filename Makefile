SOURCES=Vertex.ts \
        Transaction.ts \
        sodium.ts \
        suite.ts

all: $(SOURCES)
	tsc suite.ts

clean:
	rm -f $(SOURCES:.ts=.js)

run: all
	node suite
