/*
 * You are given a list of data entries that represent entries and exits of groups of people into a building. An entry looks like this:

{"timestamp": 1526579928, count: 3, "type": "enter"}

This means 3 people entered the building. An exit looks like this:

{"timestamp": 1526580382, count: 2, "type": "exit"}

This means that 2 people exited the building. timestamp is in Unix time.

Find the busiest period in the building, that is, the time with the most people in the building. Return it as a pair of (start, end) timestamps. You can assume the building always starts off and ends up empty, i.e. with 0 people inside.
*/

var assert = require('assert');
var path = require('path');
var logger = require('../util/logger');

describe(path.basename(__filename), () => {
  it('should find the busiest period', () => {
    const evts = [
      {timestamp: 0, count: 1, type: 'enter'},
      {timestamp: 1, count: 1, type: 'exit'},
      {timestamp: 2, count: 3, type: 'enter'},
      {timestamp: 3, count: 1, type: 'enter'},
      {timestamp: 4, count: 2, type: 'exit'},
      {timestamp: 5, count: 1, type: 'enter'},
      {timestamp: 6, count: 3, type: 'exit'},
    ];
    assert.deepEqual(findBusiestPeriod(evts), [3,4]);
  });
  it('should find the busiest period when two peaks exist', () => {
    const evts = [
      {timestamp: 1, count: 4, type: 'enter'},
      {timestamp: 2, count: 3, type: 'exit'},
      {timestamp: 3, count: 5, type: 'enter'},
      {timestamp: 4, count: 3, type: 'exit'},
      {timestamp: 5, count: 5, type: 'enter'},
      {timestamp: 6, count: 8, type: 'exit'},
    ];
    assert.deepEqual(findBusiestPeriod(evts), [5,6]);
  });
});

function findBusiestPeriod(events) {
  let runningCount = 0;
  let maxVal = null;
  let timestamps = [];
  let tmp = 0;
  events.sort((a,b) => {
    return a.timestamp - b.timestamp;
  });
  for (let evt of events) {
    if (evt.type == 'enter') {
      runningCount += evt.count;
    } else if (evt.type == 'exit') {
      runningCount -= evt.count;
    }
    if (tmp == 1) {
      timestamps[1] = evt.timestamp;
      tmp = 0;
    }
    if (runningCount > maxVal) {
      maxVal = runningCount;
      timestamps[0] = evt.timestamp;
      tmp++;
    }
  }
  return timestamps;
}

