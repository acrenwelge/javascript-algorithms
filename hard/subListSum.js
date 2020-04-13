/*
 * Given a list of numbers L, implement a method sum(i, j) which returns the sum from the sublist L[i:j] (including i, excluding j).

For example, given L = [1, 2, 3, 4, 5], sum(1, 3) should return sum([2, 3]), which is 5.

You can assume that you can do some pre-processing. sum() should be optimized over the pre-processing step.
*/

var assert = require('assert');
var path = require('path');

describe(path.basename(__filename), () => {
  it('should pass the default case', () => {
    let list = [1,2,3,4,5];
    let i = 1;
    let j = 3;
    assert.equal(sum(list, i, j), 5);
  })
});

function sum(list, i, j) {
  let runningSum = 0;
  for (let x=i; i < j; i++) {
    runningSum += list[i];
  }
  return runningSum;
}
