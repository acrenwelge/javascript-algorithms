/*
 * You are given an array of length n + 1 whose elements belong to the set {1, 2, ..., n}. By the pigeonhole principle, there must be a duplicate. Find it in linear time and space.
 */

var assert = require('assert');
var path = require('path');

describe(path.basename(__filename), () => {
  it('should pass default test', () => {
    let arr = [1,2,3,3];
    assert.equal(findDup(arr), 3);
  })
})

function findDup(arr) {
  let set = new Set();
  for (let el of arr) {
    if (set.has(el)) {
      return el;
    } else {
      set.add(el);
    }
  }
}
