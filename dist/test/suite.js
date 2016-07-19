"use strict";
var sodium_frp_1 = require("../lib/sodium-frp");
var sodium_frp_io_1 = require("../lib/sodium-frp-io");
var Vertex_1 = require("../lib/Vertex");
function fail(err) {
    throw new Error(err);
}
function assertEquals(sb, is) {
    if (JSON.stringify(is) != JSON.stringify(sb))
        fail("expected: " + sb + "\n       got:      " + is);
}
function shouldThrow(substr, f) {
    try {
        f();
    }
    catch (err) {
        if (err.message.search(substr) >= 0)
            return;
        else
            fail("unexpected exception: " + err);
    }
    fail("should throw exception");
}
var current_test = null;
function test(name, t) {
    current_test = name;
    var pass = true;
    try {
        t();
        if (Vertex_1.getTotalRegistrations() != 0)
            throw new Error("listeners were not deregistered!");
        current_test = null;
        console.log(name + " - PASS");
    }
    catch (err) {
        console.log(name + " - FAIL:");
        if (err.stack !== undefined)
            console.log(err.stack);
        else
            console.log(err);
        pass = false;
        current_test = null;
    }
}
test("map", function () {
    var s = new sodium_frp_1.StreamSink();
    var out = [];
    var kill = s.map(function (a) { return a + 1; })
        .listen(function (a) { return out.push(a); });
    s.send(7);
    kill();
    assertEquals([8], out);
});
test("send_with_no_listener_1", function () {
    shouldThrow("invoked before listeners", function () {
        var s = new sodium_frp_1.StreamSink();
        s.send(7);
    });
});
test("send_with_no_listener_2", function () {
    (function () {
        var s = new sodium_frp_1.StreamSink();
        var out = [];
        var kill = s.map(function (a) { return a + 1; })
            .listen(function (a) { return out.push(a); });
        s.send(7);
        kill();
        s.send(9); // this should not throw, because once() uses this mechanism
    });
});
test("map_track", function () {
    var s = new sodium_frp_1.StreamSink(), t = new sodium_frp_1.StreamSink(), out = [], kill = s.map(sodium_frp_1.lambda1(function (a) { return a + 1; }, [t]))
        .listen(function (a) { return out.push(a); });
    s.send(7);
    t.send("banana");
    kill();
    assertEquals([8], out);
});
test("mapTo", function () {
    var s = new sodium_frp_1.StreamSink(), out = [], kill = s.mapTo("fusebox")
        .listen(function (a) { return out.push(a); });
    s.send(7);
    s.send(9);
    kill();
    assertEquals(["fusebox", "fusebox"], out);
});
test("mergeNonSimultaneous", function () {
    var s1 = new sodium_frp_1.StreamSink(), s2 = new sodium_frp_1.StreamSink(), out = [];
    var kill = s2.orElse(s1)
        .listen(function (a) { return out.push(a); });
    s1.send(7);
    s2.send(9);
    s1.send(8);
    kill();
    assertEquals([7, 9, 8], out);
});
test("mergeSimultaneous", function () {
    var s1 = new sodium_frp_1.StreamSink(function (l, r) { return r; }), s2 = new sodium_frp_1.StreamSink(function (l, r) { return r; }), out = [], kill = s2.orElse(s1)
        .listen(function (a) { return out.push(a); });
    sodium_frp_1.transactionally(function () {
        s1.send(7);
        s2.send(60);
    });
    sodium_frp_1.transactionally(function () {
        s1.send(9);
    });
    sodium_frp_1.transactionally(function () {
        s1.send(7);
        s1.send(60);
        s2.send(8);
        s2.send(90);
    });
    sodium_frp_1.transactionally(function () {
        s2.send(8);
        s2.send(90);
        s1.send(7);
        s1.send(60);
    });
    sodium_frp_1.transactionally(function () {
        s2.send(8);
        s1.send(7);
        s2.send(90);
        s1.send(60);
    });
    kill();
    assertEquals([60, 9, 90, 90, 90], out);
});
test("coalesce", function () {
    var s = new sodium_frp_1.StreamSink(function (a, b) { return a + b; }), out = [], kill = s.listen(function (a) { return out.push(a); });
    sodium_frp_1.transactionally(function () {
        s.send(2);
    });
    sodium_frp_1.transactionally(function () {
        s.send(8);
        s.send(40);
    });
    kill();
    assertEquals([2, 48], out);
});
test("filter", function () {
    var s = new sodium_frp_1.StreamSink(), out = [], kill = s.filter(function (a) { return a < 10; })
        .listen(function (a) { return out.push(a); });
    s.send(2);
    s.send(16);
    s.send(9);
    kill();
    assertEquals([2, 9], out);
});
test("filterNotNull", function () {
    var s = new sodium_frp_1.StreamSink(), out = [], kill = s.filterNotNull()
        .listen(function (a) { return out.push(a); });
    s.send("tomato");
    s.send(null);
    s.send("peach");
    kill();
    assertEquals(["tomato", "peach"], out);
});
test("merge2", function () {
    var sa = new sodium_frp_1.StreamSink(), sb = sa.map(function (x) { return Math.floor(x / 10); })
        .filter(function (x) { return x != 0; }), sc = sa.map(function (x) { return x % 10; }).merge(sb, function (x, y) { return x + y; }), out = [], kill = sc.listen(function (a) { return out.push(a); });
    sa.send(2);
    sa.send(52);
    kill();
    assertEquals([2, 7], out);
});
test("loopStream", function () {
    var sa = new sodium_frp_1.StreamSink(), sc = sodium_frp_1.transactionally(function () {
        var sb = new sodium_frp_1.StreamLoop(), sc_ = sa.map(function (x) { return x % 10; }).merge(sb, function (x, y) { return x + y; }), sb_out = sa.map(function (x) { return Math.floor(x / 10); })
            .filter(function (x) { return x != 0; });
        sb.loop(sb_out);
        return sc_;
    }), out = [], kill = sc.listen(function (a) { return out.push(a); });
    sa.send(2);
    sa.send(52);
    kill();
    assertEquals([2, 7], out);
});
test("gate", function () {
    var s = new sodium_frp_1.StreamSink(), pred = new sodium_frp_1.CellSink(true), out = [], kill = s.gate(pred).listen(function (a) { return out.push(a); });
    s.send("H");
    pred.send(false);
    s.send('O');
    pred.send(true);
    s.send('I');
    kill();
    assertEquals(["H", "I"], out);
});
test("collect", function () {
    var ea = new sodium_frp_1.StreamSink(), out = [], sum = ea.collect(0, function (a, s) { return new sodium_frp_1.Tuple2(a + s + 100, a + s); }), kill = sum.listen(function (a) { return out.push(a); });
    ea.send(5);
    ea.send(7);
    ea.send(1);
    ea.send(2);
    ea.send(3);
    kill();
    assertEquals([105, 112, 113, 115, 118], out);
});
test("accum", function () {
    var ea = new sodium_frp_1.StreamSink(), out = [], sum = ea.accum(100, function (a, s) { return a + s; }), kill = sum.listen(function (a) { return out.push(a); });
    ea.send(5);
    ea.send(7);
    ea.send(1);
    ea.send(2);
    ea.send(3);
    kill();
    assertEquals([100, 105, 112, 113, 115, 118], out);
});
test("once", function () {
    var s = new sodium_frp_1.StreamSink(), out = [], kill = s.once().listen(function (a) { return out.push(a); });
    s.send("A");
    s.send("B");
    s.send("C");
    kill();
    assertEquals(["A"], out);
});
test("defer", function () {
    var s = new sodium_frp_1.StreamSink(), c = s.hold(" "), out = [], kill = sodium_frp_1.Operational.defer(s).snapshot1(c)
        .listen(function (a) { return out.push(a); });
    s.send("C");
    s.send("B");
    s.send("A");
    kill();
    assertEquals(["C", "B", "A"], out);
});
test("hold", function () {
    var s = new sodium_frp_1.StreamSink(), c = s.hold(0), out = [], kill = sodium_frp_1.Operational.updates(c)
        .listen(function (a) { return out.push(a); });
    s.send(2);
    s.send(9);
    kill();
    assertEquals([2, 9], out);
});
test("snapshot", function () {
    var c = new sodium_frp_1.CellSink(0), s = new sodium_frp_1.StreamSink(), out = [], kill = s.snapshot(c, function (x, y) { return x + " " + y; })
        .listen(function (a) { return out.push(a); });
    s.send(100);
    c.send(2);
    s.send(200);
    c.send(9);
    c.send(1);
    s.send(300);
    kill();
    assertEquals(["100 0", "200 2", "300 1"], out);
});
test("values", function () {
    var c = new sodium_frp_1.CellSink(9), out = [], kill = c.listen(function (a) { return out.push(a); });
    c.send(2);
    c.send(7);
    kill();
    assertEquals([9, 2, 7], out);
});
test("constantCell", function () {
    var c = new sodium_frp_1.Cell(12), out = [], kill = c.listen(function (a) { return out.push(a); });
    kill();
    assertEquals([12], out);
});
test("mapC", function () {
    var c = new sodium_frp_1.CellSink(6), out = [], kill = c.map(function (a) { return "" + a; })
        .listen(function (a) { return out.push(a); });
    c.send(8);
    kill();
    assertEquals(["6", "8"], out);
});
test("mapCLateListen", function () {
    shouldThrow("invoked before listeners", function () {
        var c = new sodium_frp_1.CellSink(6), out = [], cm = c.map(function (a) { return "" + a; });
        c.send(2);
        var kill = cm.listen(function (a) { return out.push(a); });
        c.send(8);
        kill();
        assertEquals(["2", "8"], out);
    });
});
test("apply", function () {
    var cf = new sodium_frp_1.CellSink(function (a) { return "1 " + a; }), ca = new sodium_frp_1.CellSink(5), out = [], kill = sodium_frp_1.Cell.apply(cf, ca).listen(function (a) { return out.push(a); });
    cf.send(function (a) { return "12 " + a; });
    ca.send(6);
    kill();
    assertEquals(["1 5", "12 5", "12 6"], out);
});
test("lift", function () {
    var a = new sodium_frp_1.CellSink(1), b = new sodium_frp_1.CellSink(5), out = [], kill = a.lift(b, function (aa, bb) { return aa + " " + bb; })
        .listen(function (a) { return out.push(a); });
    a.send(12);
    b.send(6);
    kill();
    assertEquals(["1 5", "12 5", "12 6"], out);
});
test("liftGlitch", function () {
    var a = new sodium_frp_1.CellSink(1), a3 = a.map(function (x) { return x * 3; }), a5 = a.map(function (x) { return x * 5; }), b = a3.lift(a5, function (x, y) { return x + " " + y; }), out = [], kill = b.listen(function (x) { return out.push(x); });
    a.send(2);
    kill();
    assertEquals(["3 5", "6 10"], out);
});
test("liftFromSimultaneous", function () {
    var t = sodium_frp_1.transactionally(function () {
        var b1 = new sodium_frp_1.CellSink(3), b2 = new sodium_frp_1.CellSink(5);
        b2.send(7);
        return new sodium_frp_1.Tuple2(b1, b2);
    });
    var b1 = t.a, b2 = t.b, out = [], kill = b1.lift(b2, function (x, y) { return x + y; })
        .listen(function (a) { return out.push(a); });
    kill();
    assertEquals([10], out);
});
test("holdIsDelayed", function () {
    var s = new sodium_frp_1.StreamSink(), h = s.hold(0), sPair = s.snapshot(h, function (a, b) { return a + " " + b; }), out = [], kill = sPair.listen(function (a) { return out.push(a); });
    s.send(2);
    s.send(3);
    kill();
    assertEquals(["2 0", "3 2"], out);
});
var SC = (function () {
    function SC(a, b, sw) {
        this.a = a;
        this.b = b;
        this.sw = sw;
    }
    return SC;
}());
test("switchC", function () {
    var ssc = new sodium_frp_1.StreamSink(), 
    // Split each field out of SC so we can update multiple cells in a
    // single transaction.
    ca = ssc.map(function (s) { return s.a; }).filterNotNull().hold("A"), cb = ssc.map(function (s) { return s.b; }).filterNotNull().hold("a"), csw_str = ssc.map(function (s) { return s.sw; }).filterNotNull().hold("ca"), 
    // ****
    // NOTE! Because this lambda contains references to Sodium objects, we
    // must declare them explicitly using lambda1() so that Sodium knows
    // about the dependency, otherwise it can't manage the memory.
    // ****
    csw = csw_str.map(sodium_frp_1.lambda1(function (s) { return s == "ca" ? ca : cb; }, [ca, cb])), co = sodium_frp_1.Cell.switchC(csw), out = [], kill = co.listen(function (c) { return out.push(c); });
    ssc.send(new SC("B", "b", null));
    ssc.send(new SC("C", "c", "cb"));
    ssc.send(new SC("D", "d", null));
    ssc.send(new SC("E", "e", "ca"));
    ssc.send(new SC("F", "f", null));
    ssc.send(new SC(null, null, "cb"));
    ssc.send(new SC(null, null, "ca"));
    ssc.send(new SC("G", "g", "cb"));
    ssc.send(new SC("H", "h", "ca"));
    ssc.send(new SC("I", "i", "ca"));
    kill();
    assertEquals(["A", "B", "c", "d", "E", "F", "f", "F", "g", "H", "I"], out);
});
var SS = (function () {
    function SS(a, b, sw) {
        this.a = a;
        this.b = b;
        this.sw = sw;
    }
    return SS;
}());
test("switchS", function () {
    var sss = new sodium_frp_1.StreamSink(), sa = sss.map(function (s) { return s.a; }), sb = sss.map(function (s) { return s.b; }), csw_str = sss.map(function (s) { return s.sw; }).filterNotNull().hold("sa"), 
    // ****
    // NOTE! Because this lambda contains references to Sodium objects, we
    // must declare them explicitly using lambda1() so that Sodium knows
    // about the dependency, otherwise it can't manage the memory.
    // ****
    csw = csw_str.map(sodium_frp_1.lambda1(function (sw) { return sw == "sa" ? sa : sb; }, [sa, sb])), so = sodium_frp_1.Cell.switchS(csw), out = [], kill = so.listen(function (x) { return out.push(x); });
    sss.send(new SS("A", "a", null));
    sss.send(new SS("B", "b", null));
    sss.send(new SS("C", "c", "sb"));
    sss.send(new SS("D", "d", null));
    sss.send(new SS("E", "e", "sa"));
    sss.send(new SS("F", "f", null));
    sss.send(new SS("G", "g", "sb"));
    sss.send(new SS("H", "h", "sa"));
    sss.send(new SS("I", "i", "sa"));
    kill();
    assertEquals(["A", "B", "C", "d", "e", "F", "G", "h", "I"], out);
});
var SS2 = (function () {
    function SS2() {
        this.s = new sodium_frp_1.StreamSink();
    }
    return SS2;
}());
test("switchSSimultaneous", function () {
    var ss1 = new SS2(), ss2 = new SS2(), ss3 = new SS2(), ss4 = new SS2(), css = new sodium_frp_1.CellSink(ss1), 
    // ****
    // NOTE! Because this lambda contains references to Sodium objects, we
    // must declare them explicitly using lambda1() so that Sodium knows
    // about the dependency, otherwise it can't manage the memory.
    // ****
    so = sodium_frp_1.Cell.switchS(css.map(sodium_frp_1.lambda1(function (b) { return b.s; }, [ss1.s, ss2.s, ss3.s, ss4.s]))), out = [], kill = so.listen(function (c) { return out.push(c); });
    ss1.s.send(0);
    ss1.s.send(1);
    ss1.s.send(2);
    css.send(ss2);
    ss1.s.send(7);
    ss2.s.send(3);
    ss2.s.send(4);
    ss3.s.send(2);
    css.send(ss3);
    ss3.s.send(5);
    ss3.s.send(6);
    ss3.s.send(7);
    sodium_frp_1.transactionally(function () {
        ss3.s.send(8);
        css.send(ss4);
        ss4.s.send(2);
    });
    ss4.s.send(9);
    kill();
    assertEquals([0, 1, 2, 3, 4, 5, 6, 7, 8, 9], out);
});
test("loopCell", function () {
    var sa = new sodium_frp_1.StreamSink(), sum_out = sodium_frp_1.transactionally(function () {
        var sum = new sodium_frp_1.CellLoop(), sum_out_ = sa.snapshot(sum, function (x, y) { return x + y; }).hold(0);
        sum.loop(sum_out_);
        return sum_out_;
    }), out = [], kill = sum_out.listen(function (a) { return out.push(a); });
    sa.send(2);
    sa.send(3);
    sa.send(1);
    kill();
    assertEquals([0, 2, 5, 6], out);
    assertEquals(6, sum_out.sample());
});
test("accum", function () {
    var sa = new sodium_frp_1.StreamSink(), out = [], sum = sa.accum(100, function (a, s) { return a + s; }), kill = sum.listen(function (a) { return out.push(a); });
    sa.send(5);
    sa.send(7);
    sa.send(1);
    sa.send(2);
    sa.send(3);
    kill();
    assertEquals([100, 105, 112, 113, 115, 118], out);
});
test("loopValueSnapshot", function () {
    var out = [], kill = sodium_frp_1.transactionally(function () {
        var a = new sodium_frp_1.Cell("lettuce"), b = new sodium_frp_1.CellLoop(), eSnap = sodium_frp_1.Operational.value(a).snapshot(b, function (aa, bb) { return aa + " " + bb; });
        b.loop(new sodium_frp_1.Cell("cheese"));
        return eSnap.listen(function (x) { return out.push(x); });
    });
    kill();
    assertEquals(["lettuce cheese"], out);
});
test("loopValueHold", function () {
    var out = [], value = sodium_frp_1.transactionally(function () {
        var a = new sodium_frp_1.CellLoop(), value_ = sodium_frp_1.Operational.value(a).hold("onion");
        a.loop(new sodium_frp_1.Cell("cheese"));
        return value_;
    }), sTick = new sodium_frp_1.StreamSink(), kill = sTick.snapshot1(value).listen(function (x) { return out.push(x); });
    sTick.send(sodium_frp_1.Unit.UNIT);
    kill();
    assertEquals(["cheese"], out);
});
test("liftLoop", function () {
    var out = [], b = new sodium_frp_1.CellSink("kettle"), c = sodium_frp_1.transactionally(function () {
        var a = new sodium_frp_1.CellLoop(), c_ = a.lift(b, function (aa, bb) { return aa + " " + bb; });
        a.loop(new sodium_frp_1.Cell("tea"));
        return c_;
    }), kill = c.listen(function (x) { return out.push(x); });
    b.send("caddy");
    kill();
    assertEquals(["tea kettle", "tea caddy"], out);
});
var name = "fromAsync", action = sodium_frp_io_1.IOAction.fromAsync(function (a, result) {
    setTimeout(function () {
        result(a + 1);
    }, 1);
}), out = [], sa = new sodium_frp_1.StreamSink(), kill = action(sa).listen(function (b) { return out.push(b); });
sa.send(5);
setTimeout(function () {
    sa.send(9);
    setTimeout(function () {
        assertEquals([6, 10], out);
        console.log(name + " - PASS");
        kill();
    }, 100);
}, 100);
//# sourceMappingURL=suite.js.map