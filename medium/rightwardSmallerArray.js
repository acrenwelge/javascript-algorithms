/*
Given an array of integers, return a new array where each element in the new array is the number of smaller elements to the right of that element in the original input array.

For example, given the array [3, 4, 9, 6, 1], return [1, 1, 2, 1, 0], since:

There is 1 smaller element to the right of 3
There is 1 smaller element to the right of 4
There are 2 smaller elements to the right of 9
There is 1 smaller element to the right of 6
There are no smaller elements to the right of 1
*/

var assert = require('assert');
var path = require('path');
var logger = require('../util/logger');

describe(path.basename(__filename), () => {
  it('should pass the default case', () => {
    var arr = [3,4,9,6,1];
    var ans = [1,1,2,1,0];
    assert.deepEqual(compute(arr), ans);
  });
  it('should pass the custom cases', () => {
    var case1 = [9,8,5,2,1];
    var ans1 = [4,3,2,1,0];
    var case2 = [3,5,7,9,11];
    var ans2 = [0,0,0,0,0];
    assert.deepEqual(compute(case1), ans1);
    assert.deepEqual(compute(case2), ans2);
  });
});

function compute(arr) {
  // easiest solution would be O(n^2) time: for each element iterate through and count # to right that are smaller
  let result = [];
  for (let x=0; x < arr.length; x++) {
    let el = arr[x];
    let count = 0;
    for (let y=x+1; y < arr.length; y++) {
      if (arr[y] < arr[x]) {
        count++;
      }
    }
    result.push(count);
  }
  return result;
}

// time: 3 min
