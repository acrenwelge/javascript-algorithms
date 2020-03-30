/*
Design and implement a HitCounter class that keeps track of requests (or hits). It should support the following operations:

record(timestamp): records a hit that happened at timestamp
total(): returns the total number of hits recorded
range(lower, upper): returns the number of hits that occurred between timestamps lower and upper (inclusive)
Follow-up: What if our system has limited memory?
*/

var assert = require('assert');

describe(__filename, () => {
  it('should record properly', () => {
    let counter = new HitCounter();
    let current = new Date();
    counter.record(current.getTime());
    assert.equal(counter.total,1);
  });

  it('should implement range inclusively', () => {
    let before = new Date();
    let counter = new HitCounter();
    counter.record(before.getTime());
    let after = new Date();
    counter.record(after.getTime());
    assert.equal(counter.range(before.getTime(),after.getTime()), 2);
  });

  it('should return subset of ranges', () => {
    let before = new Date();
    let counter = new HitCounter();
    counter.record(before.getTime());
    setTimeout(() => {
      counter.record(Date.now());
    }, 500);
    setTimeout(() => {
      counter.record(Date.now());
    }, 1000);
    setTimeout(() => {
      assert.equal(counter.range(before.getTime()+1,Date.now()), 2);
    }, 1200);
  });
});

class HitCounter {
  db = {};

  record(timestamp) {
    if (!this.db[timestamp]) {
      this.db[timestamp] = 1;
    } else {
      this.db[timestamp]++;
    }
  }

  get total() {
    return Object.keys(this.db).length;
  }

  range(lower, upper) {
    let count = 0;
    for (let key of Object.keys(this.db)) {
      if (key >= lower && key <= upper) {
        count += this.db[key];
      }
    }
    return count;
  }
}

