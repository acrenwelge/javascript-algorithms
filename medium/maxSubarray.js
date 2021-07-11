/*
 * Given a circular array, compute its maximum subarray sum in O(n) time. A subarray can be empty, and in this case the sum is 0.

For example, given [8, -1, 3, 4], return 15 as we choose the numbers 3, 4, and 8 where the 8 is obtained from wrapping around.

Given [-4, 5, 1, 0], return 6 as we choose the numbers 5 and 1.
*/

var assert = require('assert');
var path = require('path');
var logger = require('../util/logger');
logger.setLevel('ALL');

describe(path.basename(__filename), () => {
  it('should pass the default cases', () => {
    const a = [8,-1,3,4];
    assert.equal(maxSubarray(a),15);
    const b = [-4,5,1,0];
    assert.equal(maxSubarray(b), 6);
  });
  it('should pass custom cases', () => {
    const c = [-2, -5, -9, -1];
    assert.equal(slowMaxSubarray(c), 0);
    const d = [3,9,-4,1,2,-3];
    assert.equal(slowMaxSubarray(d), 12);
  })
})

function maxSubarray(arr) {
  // this implementation is incorrect
  if (arr.length === 0) return 0;
  // array can be divided into consecutive non-zero elements
  // keep track of sum of each subarray, breaking when negative element is found
  // deal with wrap-around case by joining first / last subarray if connected
  let subarrays = [];
  let sum = 0;
  let x = 0;
  for (let i=0; i < arr.length; i++) {
    if (arr[i] >= 0 ) {
      sum += arr[i];
      if (i === arr.length - 1) {
        subarrays.push({sum: sum, start: x, end: i});
      }
    }
    else if (arr[i] < 0) {
      if (sum > 0) subarrays.push({sum: sum, start: x, end: i});
      sum = 0;
      x = i+1;
    }
  }
  // wrap-around
  if (subarrays.length != 0 && subarrays[0].start === 0 && subarrays[subarrays.length-1].end === arr.length-1) {
    subarrays.push({sum: subarrays[0].sum + subarrays[subarrays.length-1].sum });
  }
  logger.info(subarrays);
  let max = 0;
  for (let j = 0; j < subarrays.length; j++) {
    if (subarrays[j].sum > max) {
      max = subarrays[j].sum;
    }
  }
  logger.info("max:" + max);
  return max;
}

function slowMaxSubarray(arr) {
  // solved in O(n^2)
  let max = 0;
  for (let i=0; i<arr.length; i++) {
    for (let j=0; j<arr.length; j++) {
      if (j > i) {
        let sub = arr.slice(i,j);
        let sum = 0;
        sub.forEach(x => sum += x);
        if (sum > max) {
          max = sum;
        }
      }
    }
  }
  return max;
}
