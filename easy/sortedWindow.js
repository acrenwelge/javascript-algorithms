/*
Given an array of integers out of order, determine the bounds of the smallest window that must be sorted in order for the entire array to be sorted. For example, given [3, 7, 5, 6, 9], you should return (1, 3).
*/
var assert = require('assert');
var path = require('path');
var logger = require('../util/logger');

describe(path.basename(__filename), () => {
  it('should pass the default case', () => {
    let window = sortedWindow([3, 7, 5, 6, 9]);
    assert.equal(window[0],1);
    assert.equal(window[1],3);
  });
});

function sortedWindow(arr) {
    let lookForAscending = true;
    let start, end;
    for (let i=0; i < arr.length-1; i++) {
        const a = arr[i];
        const b = arr[i+1];
        if (a > b && lookForAscending) {
            start = i;
            lookForAscending = false;
        } else if (b > arr[start] && !lookForAscending) {
            end = i;
        }
    }
    return [start, end];
}