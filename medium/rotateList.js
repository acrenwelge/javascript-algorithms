/*
Write a function that rotates a list by k elements. For example, [1, 2, 3, 4, 5, 6] rotated by two becomes [3, 4, 5, 6, 1, 2]. Try solving this without creating a copy of the list. How many swap or move operations do you need?
*/

var assert = require('assert');

describe('rotateList', function() {
  it('should....', function() {
    assert.equal(rotateList([1,2,3,4,5,6],2),[3,4,5,6,1,2]);
  });
});

function rotateList(arr, k) {
  let part = arr.slice(0,k);
  return arr.join(part);
}
