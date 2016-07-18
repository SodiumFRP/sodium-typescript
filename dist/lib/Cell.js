"use strict";
var Lambda_1 = require("./Lambda");
var Vertex_1 = require("./Vertex");
var Transaction_1 = require("./Transaction");
var Lazy_1 = require("./Lazy");
var Stream_1 = require("./Stream");
var Operational_1 = require("./Operational");
var LazySample = (function () {
    function LazySample(cell) {
        this.hasValue = false;
        this.value = null;
        this.cell = cell;
    }
    return LazySample;
}());
var ApplyState = (function () {
    function ApplyState() {
        this.f = null;
        this.f_present = false;
        this.a = null;
        this.a_present = false;
    }
    return ApplyState;
}());
var Cell = (function () {
    function Cell(initValue, str) {
        var _this = this;
        this.value = initValue;
        if (!str) {
            this.str = new Stream_1.Stream();
            this.vertex = new Vertex_1.Vertex("ConstCell", 0, []);
        }
        else
            Transaction_1.transactionally(function () { return _this.setStream(str); });
    }
    Cell.prototype.setStream = function (str) {
        var _this = this;
        this.str = str;
        var me = this, src = new Vertex_1.Source(str.getVertex__(), function () {
            return str.listen_(me.vertex, function (a) {
                if (me.valueUpdate == null) {
                    Transaction_1.currentTransaction.last(function () {
                        me.value = me.valueUpdate;
                        me.lazyInitValue = null;
                        me.valueUpdate = null;
                    });
                }
                me.valueUpdate = a;
            }, false);
        });
        this.vertex = new Vertex_1.Vertex("Cell", 0, [src]);
        // We do a trick here of registering the source for the duration of the current
        // transaction so that we are guaranteed to catch any stream events that
        // occur in the same transaction.
        this.vertex.register(Vertex_1.Vertex.NULL);
        Transaction_1.currentTransaction.last(function () {
            _this.vertex.deregister(Vertex_1.Vertex.NULL);
        });
    };
    Cell.prototype.getVertex__ = function () {
        return this.vertex;
    };
    Cell.prototype.getStream__ = function () {
        return this.str;
    };
    /**
     * Sample the cell's current value.
     * <p>
     * It may be used inside the functions passed to primitives that apply them to {@link Stream}s,
     * including {@link Stream#map(Lambda1)} in which case it is equivalent to snapshotting the cell,
     * {@link Stream#snapshot(Cell, Lambda2)}, {@link Stream#filter(Lambda1)} and
     * {@link Stream#merge(Stream, Lambda2)}.
     * It should generally be avoided in favour of {@link listen(Handler)} so you don't
     * miss any updates, but in many circumstances it makes sense.
     */
    Cell.prototype.sample = function () {
        var _this = this;
        return Transaction_1.transactionally(function () { return _this.sampleNoTrans__(); });
    };
    Cell.prototype.sampleNoTrans__ = function () {
        return this.value;
    };
    /**
     * A variant of {@link sample()} that works with {@link CellLoop}s when they haven't been looped yet.
     * It should be used in any code that's general enough that it could be passed a {@link CellLoop}.
     * @see Stream#holdLazy(Lazy) Stream.holdLazy()
     */
    Cell.prototype.sampleLazy = function () {
        var me = this;
        return Transaction_1.transactionally(function () { return me.sampleLazyNoTrans__(); });
    };
    Cell.prototype.sampleLazyNoTrans__ = function () {
        var me = this, s = new LazySample(me);
        Transaction_1.currentTransaction.last(function () {
            s.value = me.valueUpdate != null ? me.valueUpdate : me.sampleNoTrans__();
            s.hasValue = true;
            s.cell = null;
        });
        return new Lazy_1.Lazy(function () {
            if (s.hasValue)
                return s.value;
            else
                return s.cell.sample();
        });
    };
    /**
     * Transform the cell's value according to the supplied function, so the returned Cell
     * always reflects the value of the function applied to the input Cell's value.
     * @param f Function to apply to convert the values. It must be <em>referentially transparent</em>.
     */
    Cell.prototype.map = function (f) {
        var c = this;
        return Transaction_1.transactionally(function () {
            return Operational_1.Operational.updates(c).map(f).holdLazy(c.sampleLazy().map(Lambda_1.Lambda1_toFunction(f)));
        });
    };
    /**
     * Lift a binary function into cells, so the returned Cell always reflects the specified
     * function applied to the input cells' values.
     * @param fn Function to apply. It must be <em>referentially transparent</em>.
     */
    Cell.prototype.lift = function (b, fn0) {
        var fn = Lambda_1.Lambda2_toFunction(fn0), cf = this.map(function (aa) { return function (bb) { return fn(aa, bb); }; });
        return Cell.apply(cf, b, Lambda_1.toSources(Lambda_1.Lambda2_deps(fn0)));
    };
    /**
     * Lift a ternary function into cells, so the returned Cell always reflects the specified
     * function applied to the input cells' values.
     * @param fn Function to apply. It must be <em>referentially transparent</em>.
     */
    Cell.prototype.lift3 = function (b, c, fn0) {
        var fn = Lambda_1.Lambda3_toFunction(fn0), cf = this.map(function (aa) { return function (bb) { return function (cc) { return fn(aa, bb, cc); }; }; });
        return Cell.apply(Cell.apply(cf, b), c, Lambda_1.toSources(Lambda_1.Lambda3_deps(fn0)));
    };
    /**
     * Lift a quaternary function into cells, so the returned Cell always reflects the specified
     * function applied to the input cells' values.
     * @param fn Function to apply. It must be <em>referentially transparent</em>.
     */
    Cell.prototype.lift4 = function (b, c, d, fn0) {
        var fn = Lambda_1.Lambda4_toFunction(fn0), cf = this.map(function (aa) { return function (bb) { return function (cc) { return function (dd) { return fn(aa, bb, cc, dd); }; }; }; });
        return Cell.apply(Cell.apply(Cell.apply(cf, b), c), d, Lambda_1.toSources(Lambda_1.Lambda4_deps(fn0)));
    };
    /**
     * Lift a 5-argument function into cells, so the returned Cell always reflects the specified
     * function applied to the input cells' values.
     * @param fn Function to apply. It must be <em>referentially transparent</em>.
     */
    Cell.prototype.lift5 = function (b, c, d, e, fn0) {
        var fn = Lambda_1.Lambda5_toFunction(fn0), cf = this.map(function (aa) { return function (bb) { return function (cc) { return function (dd) { return function (ee) { return fn(aa, bb, cc, dd, ee); }; }; }; }; });
        return Cell.apply(Cell.apply(Cell.apply(Cell.apply(cf, b), c), d), e, Lambda_1.toSources(Lambda_1.Lambda5_deps(fn0)));
    };
    /**
     * Lift a 6-argument function into cells, so the returned Cell always reflects the specified
     * function applied to the input cells' values.
     * @param fn Function to apply. It must be <em>referentially transparent</em>.
     */
    Cell.prototype.lift6 = function (b, c, d, e, f, fn0) {
        var fn = Lambda_1.Lambda6_toFunction(fn0), cf = this.map(function (aa) { return function (bb) { return function (cc) { return function (dd) { return function (ee) { return function (ff) { return fn(aa, bb, cc, dd, ee, ff); }; }; }; }; }; });
        return Cell.apply(Cell.apply(Cell.apply(Cell.apply(Cell.apply(cf, b), c), d), e), f, Lambda_1.toSources(Lambda_1.Lambda6_deps(fn0)));
    };
    /**
     * Apply a value inside a cell to a function inside a cell. This is the
     * primitive for all function lifting.
     */
    Cell.apply = function (cf, ca, sources) {
        return Transaction_1.transactionally(function () {
            var state = new ApplyState(), out = new Stream_1.StreamWithSend(), cf_value = Operational_1.Operational.value(cf), ca_value = Operational_1.Operational.value(ca), src1 = new Vertex_1.Source(cf_value.getVertex__(), function () {
                return cf_value.listen_(out.getVertex__(), function (f) {
                    state.f = f;
                    state.f_present = true;
                    if (state.a_present)
                        out.send_(state.f(state.a));
                }, false);
            }), src2 = new Vertex_1.Source(ca_value.getVertex__(), function () {
                return ca_value.listen_(out.getVertex__(), function (a) {
                    state.a = a;
                    state.a_present = true;
                    if (state.f_present)
                        out.send_(state.f(state.a));
                }, false);
            });
            out.setVertex__(new Vertex_1.Vertex("apply", 0, [src1, src2].concat(sources ? sources : [])));
            return out.coalesce__(function (l, r) { return r; }).holdLazy(new Lazy_1.Lazy(function () {
                return cf.sampleNoTrans__()(ca.sampleNoTrans__());
            }));
        });
    };
    /**
     * Unwrap a cell inside another cell to give a time-varying cell implementation.
     */
    Cell.switchC = function (cca) {
        return Transaction_1.transactionally(function () {
            var za = cca.sampleLazy().map(function (ba) { return ba.sample(); }), out = new Stream_1.StreamWithSend();
            var last_ca = null;
            var cca_value = Operational_1.Operational.value(cca), src = new Vertex_1.Source(cca_value.getVertex__(), function () {
                var kill2 = last_ca === null ? null :
                    Operational_1.Operational.value(last_ca).listen_(out.getVertex__(), function (a) { return out.send_(a); }, false);
                var kill1 = cca_value.listen_(out.getVertex__(), function (ca) {
                    // Note: If any switch takes place during a transaction, then the
                    // coalesce__() below will always cause a sample to be fetched
                    // from the one we just switched to. So anything from the old input cell
                    // that might have happened during this transaction will be suppressed.
                    last_ca = ca;
                    if (kill2 !== null)
                        kill2();
                    kill2 = Operational_1.Operational.value(ca).listen_(out.getVertex__(), function (a) { return out.send_(a); }, false);
                }, false);
                return function () { kill1(); kill2(); };
            });
            out.setVertex__(new Vertex_1.Vertex("switchC", 0, [src]));
            return out.coalesce__(function (l, r) { return r; }).holdLazy(za);
        });
    };
    /**
     * Unwrap a stream inside a cell to give a time-varying stream implementation.
     */
    Cell.switchS = function (csa) {
        return Transaction_1.transactionally(function () {
            var out = new Stream_1.StreamWithSend(), h2 = function (a) {
                out.send_(a);
            }, src = new Vertex_1.Source(csa.getVertex__(), function () {
                var kill2 = csa.sampleNoTrans__().listen_(out.getVertex__(), h2, false);
                var kill1 = csa.getStream__().listen_(out.getVertex__(), function (sa) {
                    kill2();
                    kill2 = sa.listen_(out.getVertex__(), h2, true);
                }, false);
                return function () { kill1(); kill2(); };
            });
            out.setVertex__(new Vertex_1.Vertex("switchS", 0, [src]));
            return out;
        });
    };
    /**
     * Listen for updates to the value of this cell. This is the observer pattern. The
     * returned {@link Listener} has a {@link Listener#unlisten()} method to cause the
     * listener to be removed. This is an OPERATIONAL mechanism is for interfacing between
     * the world of I/O and for FRP.
     * @param h The handler to execute when there's a new value.
     *   You should make no assumptions about what thread you are called on, and the
     *   handler should not block. You are not allowed to use {@link CellSink#send(Object)}
     *   or {@link StreamSink#send(Object)} in the handler.
     *   An exception will be thrown, because you are not meant to use this to create
     *   your own primitives.
     */
    Cell.prototype.listen = function (h) {
        var _this = this;
        return Transaction_1.transactionally(function () {
            return Operational_1.Operational.value(_this).listen(h);
        });
    };
    return Cell;
}());
exports.Cell = Cell;
//# sourceMappingURL=Cell.js.map