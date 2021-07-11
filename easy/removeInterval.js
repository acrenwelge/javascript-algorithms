/*
Given a collection of intervals, find the minimum number of intervals you need to remove to make the rest of the intervals non-overlapping.

Intervals can "touch", such as [0, 1] and [1, 2], but they won't be considered overlapping.

For example, given the intervals (7, 9), (2, 4), (5, 8), return 1 as the last interval can be removed and the first two won't overlap.

The intervals are not necessarily sorted in any order.
*/

var assert = require('assert');
var path = require('path');
var logger = require('../util/logger');

describe(path.basename(__filename), () => {
  it('should pass the default cases', () => {
    const inter = [[7,9],[2,4],[5,8]];
    assert.strictEqual(minIntervalsToRemove(inter), 1);
  });
})

function minIntervalsToRemove(intervals) {
  // first sort the intervals by last value...
  intervals.sort((x,y) => x[1] - y[1]);
  let count = 0;
  let end = intervals[0][1];
  for (let i=1; i < intervals.length; i++) {
    if(intervals[i][0] >= end) {
      end = intervals[i][1];
      count++;
    }
  }
  return count;
}