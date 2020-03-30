/*
Implement a bit array.

A bit array is a space efficient array that holds a value of 1 or 0 at each index.

init(size): initialize the array with size
set(i, val): updates index at i with val where val is either 1 or 0.
get(i): gets the value at index i.
*/

var assert = require('assert');

describe(__filename, () => {
  it('should initialize properly', () => {
    let barr = new BitArray();
    barr.init(5);
    barr.set(0,1);
    assert.equal(barr.get(0),1);
  });
  it('should get and set', () => {
    let barr = new BitArray();
    barr.init(3);
    assert.equal(barr.get(1),0);
    barr.set(1,1);
    assert.equal(barr.get(1),1);
  });
});

class BitArray {
  arr = [];

  init(size) {
    for (let i=0; i < size; i++) {
      this.arr.push(false);
    }
  }

  set(i, val) {
    if (val === 0) {
      this.arr[i] = false;
    } else if (val === 1) {
      this.arr[i] = true;
    }
  }

  get(i) {
    if (i > this.arr.length) throw new Error('Index out of bounds');
    let val = this.arr[i];
    if (val) {
      return 1;
    } else return 0;
  }
}
