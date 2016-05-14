class Source {
    constructor(
        origin : Vertex,
        register : () => () => void
    ) {
        this.origin = origin;
        this.register = register;
        this.deregister = null;
    }
    origin : Vertex;
    register : () => () => void;
    deregister : () => void;
}

class Vertex {
	constructor(sources : Source[]) {
		this.rank = 0;
		this.sources = sources;
	}
    rank : number;
    sources : Source[];
}

