import * as sodium from '../../lib/Lib';

afterEach(() => {
    if (sodium.getTotalRegistrations() != 0) {
        throw new Error('listeners were not deregistered');
    }
});
  
test("should test rank", done => {
    const ca = new sodium.CellSink<boolean>(false);
    const cb = sodium.Cell.switchC(ca.map(a => {
      if (a) {
        let ca = new sodium.Cell(0);
        for (let i = 0; i < 50; ++i) {
          ca = ca.map(x => x);
        }
        return ca;
      } else {
        return new sodium.Cell(0);
      }
    }));
    let sa = new sodium.Stream<number>();
    let sb = sa.snapshot1(cb);
    const kill = sb.listen(() => {});
    const rank1 = sb.getVertex__().rank;
    ca.send(true);
    const rank2 = sb.getVertex__().rank;
    kill();
    expect(rank1).toEqual(rank2);
    done();
});
