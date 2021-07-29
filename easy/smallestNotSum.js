/**
 * Given a sorted array, find the smallest positive integer that is not the sum of a subset of the array.
For example, for the input [1, 2, 3, 10], you should return 7.
Do this in O(N) time.
 */

var assert = require('assert');
var path = require('path');

describe(path.basename(__filename), () => {
    it('should pass the default case', () => {
        const arr = [1,2,3,10];
        assert.strictEqual(smallestNonSum(arr),7);
      });
});

function smallestNonSum(arr) {
    // search until we find the sum of a subset that matches
    // increment and repeat
    // stop if we find subset sum that is greater
    let nextSmall = 1;
    for (let i=0; i < arr.length && arr[i] <= nextSmall; i++) {
        nextSmall += arr[i];
    }
    return nextSmall;
}