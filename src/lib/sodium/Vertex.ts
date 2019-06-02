import { Transaction } from "./Transaction";
import { Dictionary, Set } from "typescript-collections";

let totalRegistrations : number = 0;
export function getTotalRegistrations() : number {
    return totalRegistrations;
}

export class Source {
    // Note:
    // When register_ == null, a rank-independent source is constructed (a vertex which is just kept alive for the
    // lifetime of vertex that contains this source).
    // When register_ != null it is likely to be a rank-dependent source, but this will depend on the code inside register_.
    //
    // rank-independent souces DO NOT bump up the rank of the vertex containing those sources.
    // rank-depdendent sources DO bump up the rank of the vertex containing thoses sources when required.
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

    register(target : Vertex) : void {
        if (!this.registered) {
            this.registered = true;
            if (this.register_ !== null)
                this.deregister_ = this.register_();
            else {
                // Note: The use of Vertex.NULL here instead of "target" is not a bug, this is done to create a
                // rank-independent source. (see note at constructor for more details.). The origin vertex still gets
                // added target vertex's children for the memory management algorithm.
                this.origin.increment(Vertex.NULL);
                target.children_add(this.origin);
                this.deregister_ = () => {
                    this.origin.decrement(Vertex.NULL);
                    target.children_remove(this.origin);
                }
            }
        }
    }
    deregister(target : Vertex) : void {
        if (this.registered) {
            this.registered = false;
            if (this.deregister_ !== null)
                this.deregister_();
        }
    }
}

export enum Color { black, gray, white, purple };
let roots : Vertex[] = [];
let nextID : number = 0;
let verbose : boolean = false;

export function setVerbose(v : boolean) : void { verbose = v; }

export function describeAll(v : Vertex, visited : Set<number>)
{
    if (visited.contains(v.id)) return;
    console.log(v.descr());
    visited.add(v.id);
    let chs = v.children();
    for (let i = 0; i < chs.length; i++)
        describeAll(chs[i], visited);
}

export class Vertex {
    static NULL : Vertex = new Vertex("user", 1e12, []);
    static collectingCycles : boolean = false;
    static toBeFreedList : Vertex[] = [];
    id : number;

	constructor(name : string, rank : number, sources : Source[]) {
	    this.name = name;
		this.rank = rank;
		this.sources = sources;
		this.id = nextID++;
	}
	name : string;
    rank : number;
    sources : Source[];
    targets : Dictionary<Vertex,number> = new Dictionary(v => "" + v.id);
    childrn : Dictionary<Vertex,number> = new Dictionary(v => "" + v.id);
    refCount() : number { return this.targets.size(); };
    visited : boolean = false;
    register(target : Vertex) : boolean {
        return this.increment(target);
    }
    deregister(target : Vertex) : void {
        if (verbose)
            console.log("deregister "+this.descr()+" => "+target.descr());
        this.decrement(target);
        Transaction._collectCyclesAtEnd();
    }

    targetArrayCacheDirty : boolean = false;
    childArrayCacheDirty : boolean = false;

    private targets_add(target : Vertex) {
        let count = (this.targets.getValue(target) || 0);
        this.targets.setValue(target, count + 1);
        this.targetArrayCacheDirty = true;
        this.targetArrayCache.splice(0, this.targetArrayCache.length);
    }

    private targets_remove(target : Vertex) : boolean {
        let count = (this.targets.getValue(target) || 0);
        if (count == 0) {
            return false;
        }
        let newCount = count - 1;
        if (newCount == 0) {
            this.targets.remove(target);
        } else {
            this.targets.setValue(target, newCount);
        }
        this.targetArrayCacheDirty = true;
        this.targetArrayCache.splice(0, this.targetArrayCache.length);
        return true;
    }

    children_add(child : Vertex) {
        let count = (this.childrn.getValue(child) || 0);
        this.childrn.setValue(child, count + 1);
        this.childArrayCacheDirty = true;
        this.childArrayCache.splice(0, this.childArrayCache.length);
    }

    children_remove(child : Vertex) : boolean {
        let count = (this.childrn.getValue(child) || 0);
        if (count == 0) {
            return false;
        }
        let newCount = count - 1;
        if (newCount == 0) {
            this.childrn.remove(child);
        } else {
            this.childrn.setValue(child, newCount);
        }
        this.childArrayCacheDirty = true;
        this.childArrayCache.splice(0, this.childArrayCache.length);
        return true;
    }

    private incRefCount(target : Vertex) : boolean {
        let anyChanged : boolean = false;
        if (this.refCount() == 0) {
            for (let i = 0; i < this.sources.length; i++)
                this.sources[i].register(this);
        }
        this.targets_add(target);
        target.children_add(this);
        if (target.ensureBiggerThan(this.rank))
            anyChanged = true;
        totalRegistrations++;
        return anyChanged;
    }

    private decRefCount(target : Vertex) : void {
        if (verbose)
            console.log("DEC "+this.descr());
        target.children_remove(this);
        let matched = this.targets_remove(target);
        if (matched) {
            if (this.refCount() == 0) {
                for (let i = 0; i < this.sources.length; i++)
                    this.sources[i].deregister(this);
            }
            totalRegistrations--;
        }
    }

    addSource(src : Source) : void {
        this.sources.push(src);
        if (this.refCount() > 0)
            src.register(this);
    }

	private ensureBiggerThan(limit : number) : boolean {
        if (this.visited) {
            // Timer.spec.ts has a vertex cycle, this should be fixed first.
            //throw new Error("Vertex cycle detected.");
            return false;
        }
		if (this.rank > limit)
			return false;

        this.visited = true;
        this.rank = limit + 1;
        this.targetArray()
            .forEach(
                target =>
                    target.ensureBiggerThan(this.rank)
            );
        this.visited = false;
		return true;
	}

	descr() : string {
        let colStr : string = null;
        switch (this.color) {
        case Color.black: colStr = "black"; break;
        case Color.gray:  colStr = "gray"; break;
        case Color.white: colStr = "white"; break;
        case Color.purple: colStr = "purple"; break;
        }
        let str = this.id+" "+this.name+" ["+this.refCount()+"/"+this.refCountAdj+"] "+colStr+" ->";
        let chs = this.children();
        for (let i = 0; i < chs.length; i++) {
            str = str + " " + chs[i].id;
        }
        return str;
	}

	// --------------------------------------------------------
	// Synchronous Cycle Collection algorithm presented in "Concurrent
	// Cycle Collection in Reference Counted Systems" by David F. Bacon
	// and V.T. Rajan.

    color : Color = Color.black;
    buffered : boolean = false;
    refCountAdj : number = 0;

    private childArrayCache: Vertex[] = [];
	children() : Vertex[] {
        if (!this.childArrayCacheDirty) {
            return this.childArrayCache;
        }
        this.childArrayCache.splice(0, this.childArrayCache.length);
        this.childrn.forEach((child, count) => {
            for (let i = 0; i < count; ++i) {
                this.childArrayCache.push(child);
            }
        });
        this.childArrayCacheDirty = false;
        return this.childArrayCache;
    }

    private targetArrayCache: Vertex[] = [];
    targetArray() : Vertex[] {
        if (!this.targetArrayCacheDirty) {
            return this.targetArrayCache;
        }
        this.targetArrayCache.splice(0, this.targetArrayCache.length);
        this.targets.forEach((target, count) => {
            for (let i = 0; i < count; ++i) {
                this.targetArrayCache.push(target);
            }
        });
        this.targetArrayCacheDirty = false;
        return this.targetArrayCache;
    }

	increment(referrer : Vertex) : boolean {
	    return this.incRefCount(referrer);
	}

	decrement(referrer : Vertex) : void {
	    this.decRefCount(referrer);
	    if (this.refCount() == 0)
	        this.release();
        else
            this.possibleRoots();
	}

    release() : void {
        this.color = Color.black;
        if (!this.buffered)
            this.free();
    }

    free() : void {
        let targets: Vertex[] = this.targetArray().slice(0);
        for (let i = 0; i < targets.length; ++i) {
            this.decRefCount(targets[i]);
        }
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

	static collectCycles() : void {
        if (Vertex.collectingCycles) {
            return;
        }
        try {
            Vertex.collectingCycles = true;
            Vertex.markRoots();
            Vertex.scanRoots();
            Vertex.collectRoots();
            for (let i = Vertex.toBeFreedList.length-1; i >= 0; --i) {
                let vertex = Vertex.toBeFreedList.splice(i, 1)[0];
                vertex.free();
            }
        } finally {
            Vertex.collectingCycles = false;
        }
	}

	static markRoots() : void {
        const newRoots : Vertex[] = [];
        // check refCountAdj was restored to zero before mark roots
        if (verbose) {
            let stack: Vertex[] = roots.slice(0);
            let visited: Set<number> = new Set();
            while (stack.length != 0) {
                let vertex = stack.pop();
                if (visited.contains(vertex.id)) {
                    continue;
                }
                visited.add(vertex.id);
                if (vertex.refCountAdj != 0) {
                    console.log("markRoots(): reachable refCountAdj was not reset to zero: " + vertex.descr());
                }
                let chs = vertex.children;
                for (let i = 0; i < chs.length; ++i) {
                    let child = chs[i];
                    stack.push(child);
                }
            }
        }
        //
	    for (let i = 0; i < roots.length; i++) {
            if (verbose)
                console.log("markRoots "+roots[i].descr());  // ###
	        if (roots[i].color == Color.purple) {
	            roots[i].markGray();
	            newRoots.push(roots[i]);
            }
	        else {
	            roots[i].buffered = false;
                if (roots[i].color == Color.black && roots[i].refCount() == 0)
	                Vertex.toBeFreedList.push(roots[i]);
            }
	    }
	    roots = newRoots;
	}

	static scanRoots() : void {
	    for (let i = 0; i < roots.length; i++)
	        roots[i].scan();
	}

	static collectRoots() : void {
	    for (let i = 0; i < roots.length; i++) {
	        roots[i].buffered = false;
	        roots[i].collectWhite();
        }
        if (verbose) { // double check adjRefCount is zero for all vertices reachable by roots
            let stack: Vertex[] = roots.slice(0);
            let visited: Set<number> = new Set();
            while (stack.length != 0) {
                let vertex = stack.pop();
                if (visited.contains(vertex.id)) {
                    continue;
                }
                visited.add(vertex.id);
                if (vertex.refCountAdj != 0) {
                    console.log("collectRoots(): reachable refCountAdj was not reset to zero: " + vertex.descr());
                }
                let chs = vertex.children;
                for (let i = 0; i < chs.length; ++i) {
                    let child = chs[i];
                    stack.push(child);
                }
            }
        }
	    roots = [];
	}

	markGray() : void {
	    if (this.color != Color.gray) {
	        this.color = Color.gray;
	        let chs = this.children();
	        for (let i = 0; i < chs.length; i++) {
	            chs[i].refCountAdj--;
                if (verbose)
                    console.log("markGray "+this.descr());
	            chs[i].markGray();
            }
	    }
	}

	scan() : void {
	    if (verbose)
            console.log("scan "+this.descr());
	    if (this.color == Color.gray) {
	        if (this.refCount()+this.refCountAdj > 0)
	            this.scanBlack();
	        else {
	            this.color = Color.white;
                if (verbose)
                    console.log("scan WHITE "+this.descr());
                let chs = this.children();
                for (let i = 0; i < chs.length; i++)
                    chs[i].scan();
	        }
	    }
	}

	scanBlack() : void {
        this.refCountAdj = 0;
	    this.color = Color.black;
        let chs = this.children();
        for (let i = 0; i < chs.length; i++) {
            if (verbose)
                console.log("scanBlack "+this.descr());
            if (chs[i].color != Color.black)
                chs[i].scanBlack();
        }
	}

	collectWhite() : void {
	    if (this.color == Color.white && !this.buffered) {
            if (verbose)
                console.log("collectWhite "+this.descr());
	        this.color = Color.black;
	        this.refCountAdj = 0;
            let chs = this.children();
            for (let i = 0; i < chs.length; i++)
                chs[i].collectWhite();
            Vertex.toBeFreedList.push(this);
	    }
	}
}
