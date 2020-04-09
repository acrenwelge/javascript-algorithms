/*
 * Given an array of integers in which two elements appear exactly once and all other elements appear exactly twice, find the two elements that appear only once.

For example, given the array [2, 4, 6, 8, 10, 2, 6, 10], return 4 and 8. The order does not matter.

Follow-up: Can you do this in linear time and constant space?
*/

var assert = require('assert');
var path = require('path');

describe(path.basename(__filename), () => {
  it('should pass the default case', () => {
    assert.deepEqual(findElements([2,4,6,8,10,2,6,10]),[4,8]);
  })
})

function findElements(arr) {
  // keep track of count of each element
  let counts = {};
  for (let el of arr) {
    if (!counts[el]) {
      counts[el] = 1;
    } else {
      counts[el] += 1;
    }
  }
  let dups = [];
  for (let prop of Object.getOwnPropertyNames(counts)) {
    if (counts[prop] === 1) dups.push(Number(prop));
  }
  return dups;
}
