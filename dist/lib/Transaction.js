"use strict";
var typescript_collections_1 = require('typescript-collections');
var Entry = (function () {
    function Entry(rank, action) {
        this.rank = rank;
        this.action = action;
        this.seq = Entry.nextSeq++;
    }
    Entry.prototype.toString = function () {
        return this.seq.toString();
    };
    Entry.nextSeq = 0;
    return Entry;
}());
exports.Entry = Entry;
var Transaction = (function () {
    function Transaction() {
        this.inCallback = 0;
        this.toRegen = false;
        this.prioritizedQ = new typescript_collections_1.PriorityQueue(function (a, b) {
            // Note: Low priority numbers are treated as "greater" according to this
            // comparison, so that the lowest numbers are highest priority and go first.
            if (a.rank.rank < b.rank.rank)
                return 1;
            if (a.rank.rank > b.rank.rank)
                return -1;
            if (a.seq < b.seq)
                return 1;
            if (a.seq > b.seq)
                return -1;
            return 0;
        });
        this.entries = new typescript_collections_1.Set(function (a) { return a.toString(); });
        this.lastQ = [];
        this.postQ = null;
    }
    Transaction.prototype.requestRegen = function () { this.toRegen = true; };
    Transaction.prototype.prioritized = function (target, f) {
        var e = new Entry(target, f);
        this.prioritizedQ.enqueue(e);
        this.entries.add(e);
    };
    Transaction.prototype.last = function (h) {
        this.lastQ.push(h);
    };
    /**
     * Add an action to run after all last() actions.
     */
    Transaction.prototype.post = function (childIx, action) {
        if (this.postQ == null)
            this.postQ = [];
        // If an entry exists already, combine the old one with the new one.
        while (this.postQ.length <= childIx)
            this.postQ.push(null);
        var existing = this.postQ[childIx], neu = existing === null ? action
            : function () {
                existing();
                action();
            };
        this.postQ[childIx] = neu;
    };
    // If the priority queue has entries in it when we modify any of the nodes'
    // ranks, then we need to re-generate it to make sure it's up-to-date.
    Transaction.prototype.checkRegen = function () {
        if (this.toRegen) {
            this.toRegen = false;
            this.prioritizedQ.clear();
            var es = this.entries.toArray();
            for (var i = 0; i < es.length; i++)
                this.prioritizedQ.enqueue(es[i]);
        }
    };
    Transaction.prototype.close = function () {
        while (true) {
            this.checkRegen();
            if (this.prioritizedQ.isEmpty())
                break;
            var e = this.prioritizedQ.dequeue();
            this.entries.remove(e);
            e.action();
        }
        for (var i = 0; i < this.lastQ.length; i++)
            this.lastQ[i]();
        this.lastQ = [];
        if (this.postQ != null) {
            for (var i = 0; i < this.postQ.length; i++) {
                if (this.postQ[i] != null) {
                    var parent_1 = exports.currentTransaction;
                    try {
                        if (i > 0) {
                            exports.currentTransaction = new Transaction();
                            try {
                                this.postQ[i]();
                                exports.currentTransaction.close();
                            }
                            catch (err) {
                                exports.currentTransaction.close();
                                throw err;
                            }
                        }
                        else {
                            exports.currentTransaction = null;
                            this.postQ[i]();
                        }
                        exports.currentTransaction = parent_1;
                    }
                    catch (err) {
                        exports.currentTransaction = parent_1;
                        throw err;
                    }
                }
            }
            this.postQ = null;
        }
    };
    /**
     * Add a runnable that will be executed whenever a transaction is started.
     * That runnable may start transactions itself, which will not cause the
     * hooks to be run recursively.
     *
     * The main use case of this is the implementation of a time/alarm system.
     */
    Transaction.onStart = function (r) {
        onStartHooks.push(r);
    };
    return Transaction;
}());
exports.Transaction = Transaction;
exports.currentTransaction = null;
var onStartHooks = [], runningOnStartHooks = false;
function transactionally(f) {
    var transWas = exports.currentTransaction;
    if (transWas === null) {
        if (!runningOnStartHooks) {
            runningOnStartHooks = true;
            try {
                for (var i = 0; i < onStartHooks.length; i++)
                    onStartHooks[i]();
            }
            finally {
                runningOnStartHooks = false;
            }
        }
        exports.currentTransaction = new Transaction();
    }
    try {
        var a = f();
        if (transWas === null) {
            exports.currentTransaction.close();
            exports.currentTransaction = null;
        }
        return a;
    }
    catch (err) {
        if (transWas === null) {
            exports.currentTransaction.close();
            exports.currentTransaction = null;
        }
        throw err;
    }
}
exports.transactionally = transactionally;
//# sourceMappingURL=Transaction.js.map