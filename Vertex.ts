class Source {
    constructor(
        origin : Vertex,
        register_ : () => () => void
    ) {
        this.origin = origin;
        this.register_ = register_;
    }
    private origin : Vertex;
    private register_ : () => () => void;
    private registered : boolean = false;
    private deregister_ : () => void = null;

    register() : void {
        if (!this.registered) {
            this.registered = true;
            this.origin.register();
            if (this.register_ !== null)
                this.deregister_ = this.register_();
        }
    }
    deregister() : void {
        if (this.registered) {
            this.registered = false;
            if (this.deregister_ !== null)
                this.deregister_();
            this.origin.deregister();
        }
    }
}

class Vertex {
	constructor(sources : Source[]) {
		this.rank = 0;
		this.sources = sources;
		this.registered = 0;
	}
    rank : number;
    sources : Source[];
    registered : number;
    register() : void {
        for (let i = 0; i < this.sources.length; i++)
            this.sources[i].register();
        this.registered++;
    }
    deregister() : void {
        for (let i = 0; i < this.sources.length; i++)
            this.sources[i].deregister();
        this.registered--;
    }
}

