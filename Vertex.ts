export class Source {
    constructor(
        origin : Vertex,
        register_ : () => () => void
    ) {
        if (origin === null)
            throw new Error("null origin!");
        this.origin = origin;
        this.register_ = register_;
    }
    origin : Vertex;
    private register_ : () => () => void;
    private registered : boolean = false;
    private deregister_ : () => void = null;

    register(target : Vertex) : boolean {
        let anyChanged = false;
        if (!this.registered) {
            this.registered = true;
            if (this.origin.increment(target))
                anyChanged = true;
            if (this.register_ !== null)
                this.deregister_ = this.register_();
        }
        return anyChanged;
    }
    deregister(target : Vertex) : void {
        if (this.registered) {
            this.registered = false;
            if (this.deregister_ !== null)
                this.deregister_();
            this.origin.decrement(target);
        }
    }
}

enum Color { black, gray, white, purple, green };
let roots : Vertex[] = [];

export class Vertex {
    static NULL : Vertex = new Vertex(1e12, []);

	constructor(rank : number, sources : Source[]) {
		this.rank = rank;
		this.sources = sources;
	}
    rank : number;
    sources : Source[];
    targets : Vertex[] = [];
    refCount() : number { return this.targets.length; };
    visited : boolean = false;
    register(target : Vertex) : boolean {
        return this.increment(target);
    }
    deregister(target : Vertex) : void {
        this.decrement(target);
        //let anyChanged = Vertex.collectCycles();
    }
    private incRefCount(target : Vertex) : boolean {
        let anyChanged : boolean = false;
        this.targets.push(target);
        if (target.ensureBiggerThan(this.rank))
            anyChanged = true;
        return anyChanged;
    }

    private allocate() : boolean {
        let anyChanged = false;
        for (let i = 0; i < this.sources.length; i++)
            if (this.sources[i].register(this))
                anyChanged = true;
        return anyChanged;
    }

    private decRefCount(target : Vertex) : void {
        for (let i = 0; i < this.targets.length; i++)
            if (this.targets[i] === target) {
                this.targets.splice(i, 1);
                break;
            }
    }

    addSource(src : Source) : boolean {
        this.sources.push(src);
        if (this.refCount() > 0)
            return src.register(this);
        else
            return false;
    }

	private ensureBiggerThan(limit : number) : boolean {
		if (this.rank > limit || this.visited)
			return false;

        this.visited = true;
		this.rank = limit + 1;
		for (let i = 0; i < this.targets.length; i++)
			this.targets[i].ensureBiggerThan(this.rank);
        this.visited = false;
		return true;
	}

	// --------------------------------------------------------
	// Synchronous Cycle Collection algorithm presented in "Concurrent
	// Cycle Collection in Reference Counted Systems" by David F. Bacon
	// and V.T. Rajan.

    color : Color = Color.black;
    buffered : boolean = false;

	children() : Vertex[] {
	    const chs : Vertex[] = [];
	    for (let i = 0; i < this.sources.length; i++)
	        chs.push(this.sources[i].origin);
	    return chs;
	}

	increment(referrer : Vertex) : boolean {
	    let anyChanged = false;
        if (this.refCount() == 0)
            if (this.allocate())
                anyChanged = true;
	    if (this.incRefCount(referrer))
	        anyChanged = true;
	    return anyChanged;
	}

	decrement(referrer : Vertex) : void {
	    this.decRefCount(referrer);
	    if (this.refCount() == 0)
	        this.release();
        else
            this.possibleRoots();
	}

    release() : void {
        for (let i = 0; i < this.sources.length; i++)
            this.sources[i].deregister(this);
        this.color = Color.black;
        if (!this.buffered)
            this.free();
    }

    free() : void {
    }

	possibleRoots() : void {
	    if (this.color != Color.purple) {
	        this.color = Color.purple;
	        if (!this.buffered) {
                this.buffered = true;
                roots.push(this);
            }
        }
	}

	static collectCycles() : boolean {
	    Vertex.markRoots();
	    const anyChanged = Vertex.scanRoots();
	    Vertex.collectRoots();
	    return anyChanged;
	}

	static markRoots() : void {
	    const newRoots : Vertex[] = [];
	    for (let i = 0; i < roots.length; i++) {
	        if (roots[i].color == Color.purple) {
	            roots[i].markGray();
	            newRoots.push(roots[i]);
            }
	        else {
	            roots[i].buffered = false;
	            if (roots[i].color == Color.black && roots[i].refCount() == 0)
	                roots[i].free();
            }
	    }
	    roots = newRoots;
	}

	static scanRoots() : boolean {
	    let anyChanged = false;
	    for (let i = 0; i < roots.length; i++)
	        if (roots[i].scan())
	            anyChanged = true;
        return anyChanged;
	}

	static collectRoots() : void {
	    for (let i = 0; i < roots.length; i++) {
	        roots[i].buffered = false;
	        console.log("collect a cycle");
	        roots[i].collectWhite();
	    }
	    roots = [];
	}

	markGray() : void {
	    if (this.color != Color.gray) {
	        this.color = Color.gray;
	        let chs = this.children();
	        for (let i = 0; i < chs.length; i++) {
	            chs[i].decRefCount(this);
	            chs[i].markGray();
            }
	    }
	}
	
	scan() : boolean {
	    let anyChanged = false;
	    if (this.color == Color.gray) {
	        if (this.refCount() > 0) {
	            if (this.scanBlack())
	                anyChanged = true;
            }
	        else {
	            this.color = Color.white;
                let chs = this.children();
                for (let i = 0; i < chs.length; i++) {
                    if (chs[i].scan())
                        anyChanged = true;
                }
	        }
	    }
	    return anyChanged;
	}

	scanBlack() : boolean {
	    let anyChanged = false;
	    this.color = Color.black;
        let chs = this.children();
        for (let i = 0; i < chs.length; i++) {
            if (chs[i].incRefCount(this))
                anyChanged = true;
            if (chs[i].color != Color.black)
                if (chs[i].scanBlack())
                    anyChanged = true;
        }
        return anyChanged;
	}

	collectWhite() : void {
	    if (this.color == Color.white && !this.buffered) {
	        this.color = Color.black;
            let chs = this.children();
            for (let i = 0; i < chs.length; i++)
                chs[i].collectWhite();
            this.free();
	    }
	}
}
