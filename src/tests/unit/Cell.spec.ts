import {
  Cell,
  getTotalRegistrations
} from '../../lib/Lib';

afterEach(() => {
  if (getTotalRegistrations() != 0) {
    throw new Error('listeners were not deregistered');
  }
});

test('should test constantCell', (done) => {

  const c = new Cell<number>(12);
  const out: number[] = [];

  const kill = c.listen(a => {
      out.push(a);
      done();
  });


  expect([12]).toEqual(out);
  kill();
});
