/*
 * Given an array of elements, return the length of the longest subarray where all its elements are distinct.

For example, given the array [5, 1, 3, 5, 2, 3, 4, 1], return 5 as the longest subarray of distinct elements is [5, 2, 3, 4, 1].
*/

var assert = require('assert');
var path = require('path');
var logger = require('../util/logger');

describe(path.basename(__filename), () => {
  it('should pass the default case', () => {
    const arr = [5,1,3,5,2,3,4,1];
    assert.strictEqual(getDistinctSubarr(arr), 5); // [5,2,3,4,1] is the longest distinct subarray
  });
});

function getDistinctSubarr(arr) {
  // iterate through the array
  // each time we find a duplicate, record the current subarray as a candidate
  // continue by cutting off the array at the index of the first duplicate
  // return the length of the longest subarray we find
  let i = 0;
  let subs = [];
  for (let j=1; j < arr.length; j++) {
    const currentSub = arr.slice(i,j);
    if (currentSub.includes(arr[j])) {
      subs.push(currentSub);
      i = arr.indexOf(arr[j]) + 1;
    } else if (j == arr.length - 1) {
      subs.push(arr.slice(i,j+1));
    }
  }
  const sorted = subs.sort((x,y) => y.length - x.length);
  return sorted[0].length;
}