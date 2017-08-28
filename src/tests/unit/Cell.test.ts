import { expect } from 'chai';
import {
  Cell,
  getTotalRegistrations
} from '../../lib/Sodium';

export class CellTest {
  afterEach(){
    if (getTotalRegistrations() != 0) {
      throw new Error('listeners were not deregistered');
    }
  }

  'should test constantCell'(done){
    const c = new Cell<number>(12);
    const out: number[] = [];

    const kill = c.listen(a => {
        out.push(a);
        done();
    });


    expect([12]).to.deep.equal(out);
    kill();
  }
}
