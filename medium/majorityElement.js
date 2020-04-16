/*
 * Given a list of elements, find the majority element, which appears more than half the time (> floor(len(lst) / 2.0)).

You can assume that such element exists.

For example, given [1, 2, 1, 1, 3, 4, 0], return 1.
*/

var assert = require('assert');
var path = require('path');

describe(path.basename(__filename), () => {
  it('should pass the default case', () => {
    let arr = [1,2,1,1,3,4,0];
    assert.equal(findMajorityEl(arr),1);
  })
})

function findMajorityEl(arr) {
  const threshold = Math.floor(arr.length / 2);
  let counts = {};
  for (let el of arr) {
    if (counts[el]) {
      counts[el] += 1;
      if (counts[el] >= threshold) return el;
    } else {
      counts[el] = 1;
    }
  }
  return null;
}
