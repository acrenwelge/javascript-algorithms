/**
You are given given a list of rectangles represented by min and max x- and y-coordinates. Compute whether or not a pair of rectangles overlap each other. If one rectangle completely covers another, it is considered overlapping.

For example, given the following rectangles:

{
    "top_left": (1, 4),
    "dimensions": (3, 3) # width, height
},
{
    "top_left": (-1, 3),
    "dimensions": (2, 1)
},
{
    "top_left": (0, 5),
    "dimensions": (4, 4)
}
return true as the first and third rectangle overlap each other.
*/

var assert = require('assert');
var path = require('path');
var logger = require('../util/logger');

describe(path.basename(__filename), () => {
  it('should return true', () => {
    let r1 = {
      "top_left": [1,4],
      "dimensions": [3,3]
    };
    let r2 = {
      "top_left": [-1,3],
      "dimensions": [2,1],
    };
    let r3 = {
      "top_left": [0,5],
      "dimensions": [4,4]
    };
    assert.ok(findOverlap([r1,r2,r3]));
  });
  it('should return false', () => {
    let r1 = {
      "top_left": [0,0],
      "dimensions": [1,1]
    };
    let r2 = {
      "top_left": [-2,2],
      "dimensions": [2,1]
    };
    assert.equal(findOverlap([r1,r2]), false);
  });
});

function findOverlap(rects) {
  for (let x = 0; x < rects.length; x++) {
    // compare each pair of rectangles together
    for (let y = 0; y < rects.length; y++) {
      logger.info(`x: ${x}; y: ${y}`);
      if (x != y) {
        const r1 = rects[x];
        const r2 = rects[y];
        const r1_top_right = [r1["top_left"][0] + r1["dimensions"][0], r1["top_left"][1]];
        const r2_top_right = [r2["top_left"][0] + r2["dimensions"][0], r2["top_left"][1]];
        const r1_bot_left = [r1["top_left"][0], r1["top_left"][1] - r1["dimensions"][1]];
        const r2_bot_left = [r2["top_left"][0], r2["top_left"][1] - r2["dimensions"][1]];
        // overlap occurs when 4 pts of r1 are within r2 or vice versa
        // r1 within r2
        if (r1["top_left"][0] >= r2["top_left"][0] && r1["top_left"][1] <= r2["top_left"][1]
          && r1_top_right[0] <= r2_top_right[0] && r1_bot_left[1] >= r2_bot_left[1]) {
          return true;
        }
        // r2 within r1
        if (r2["top_left"][0] >= r1["top_left"][0] && r2["top_left"][1] <= r1["top_left"][1]
          && r2_top_right[0] <= r1_top_right[0] && r2_bot_left[1] >= r1_bot_left[1]) {
          return true;
        }
      }
    }
  }
  return false; // no overlaps found
}
