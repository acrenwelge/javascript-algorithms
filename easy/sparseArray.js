/*
You have a large array with most of the elements as zero.

Use a more space-efficient data structure, SparseArray, that implements the same interface:

init(arr, size): initialize with the original large array and size.
set(i, val): updates index at i with val.
get(i): gets the value at index i.
*/

var assert = require('assert');

describe(__filename, function() {
  it('initializes properly', () => {
    let arr = [0,0,0,5,4,0,0,0,0,0,9,1];
    let spArr = new SparseArray();
    spArr.init(arr,arr.length);
    assert.equal(spArr.get(3), arr[3]);
  });

  it('sets and gets properly', () => {
    let spArr = new SparseArray();
    spArr.set(8, 3);
    assert.equal(spArr.get(8), 3);
  });
});

// just use a simple object
class SparseArray {
  db = {};

  init(arr, size) {
    for (let i=0; i < size; i++) {
      if (arr[i] != 0) {
        this.db[i] = arr[i];
      }
    }
  }

  set(i, val) {
    this.db[i] = val;
  }

  get(i) {
    let val = this.db[i];
    if (val) {
      return val;
    } else {
      return 0;
    }
  }
}
