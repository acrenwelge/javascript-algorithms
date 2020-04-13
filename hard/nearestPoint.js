/*
 * Given a list of points, a central point, and an integer k, find the nearest k points from the central point.

For example, given the list of points [(0, 0), (5, 4), (3, 1)], the central point (1, 2), and k = 2, return [(0, 0), (3, 1)].
*/

var assert = require('assert');
var path = require('path');
var logger = require('../util/logger');

describe(path.basename(__filename), () => {
  it('should pass the default case', () => {
    pts = [[0,0],[5,4],[3,1]];
    let center =  [1,2];
    assert.deepStrictEqual(getNearestPoints(pts,center,2), [[0,0],[3,1]]);
  })
  it('should pass the custom case', () => {
    pts = [[-100,-10],[200,10],[3,1],[-1,1]];
    let center =  [0,0];
    assert.deepStrictEqual(getNearestPoints(pts,center,1), [[-1,1]]);
  })
})

function getNearestPoints(points, center, k) {
  // distance formula: d = sqrt((y2-y1)^2 + (x2-x1)^2)
  // approach: calculate min distance of all points and sort
  let x2 = center[0];
  let y2 = center[1];
  points.sort((p1,p2) => {
    let d1 = Math.sqrt(Math.pow(p1[0]-x2,2) + Math.pow(p1[1]-y2,2));
    let d2 = Math.sqrt(Math.pow(p2[0]-x2,2) + Math.pow(p2[1]-y2,2));
    logger.debug(`d1: ${d1}`);
    logger.debug(`d2: ${d2}`)
    return d1 - d2;
  });
  logger.debug(points);
  return points.slice(0,k);
}
