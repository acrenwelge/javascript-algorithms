/*
You are given an array of nonnegative integers. 
Let's say you start at the beginning of the array and are trying to advance to the end.
You can advance at most, the number of steps that you're currently on.
Determine whether you can get to the end of the array.

For example, given the array [1, 3, 1, 2, 0, 1], we can go from indices 0 -> 1 -> 3 -> 5, so return true.

Given the array [1, 2, 1, 0, 0], we can't reach the end, so return false.
*/
var assert = require('assert');
var path = require('path');

describe(path.basename(__filename), () => {
    it('should pass default tests', () => {
      const arr = [1,3,1,3,0,1];
      assert.ok(canGetToEnd(arr));
      const arr2 = [1,2,1,0,0];
      assert.strictEqual(canGetToEnd(arr2), false);
    });
    it('should pass custom tests', () => {
        const arr = [0,9,9,9,9,9];
        assert.strictEqual(canGetToEnd(arr), false);
        const arr2 = [1,1,4,0,0,2,0,1];
        assert.ok(canGetToEnd(arr2));
        const arr3 = [9,9,9,9,9,0];
        assert.ok(canGetToEnd(arr3));
    });
    it('should pass empty array', () => {
        const arr = [];
        assert.ok(canGetToEnd(arr));
    })
    it('should pass trivial case', () => {
        const arr = [1];
        assert.ok(canGetToEnd(arr));
    })
});

function canGetToEnd(arr) {
    // take all possible number of steps
    if (arr.length === 0) return true;
    let maxStep = arr[0];
    for (let x=1; x <= maxStep; x++) {
        if (arr.length - x === 0) return true;
        if (canGetToEnd(arr.slice(x, arr.length))) return true;
    }
    return false;
}