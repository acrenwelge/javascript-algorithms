/**
 * You are given a list of N points (x1, y1), (x2, y2), ..., (xN, yN) representing a polygon. You can assume these points are given in order; that is, you can construct the polygon by connecting point 1 to point 2, point 2 to point 3, and so on, finally looping around to connect point N to point 1.

Determine if a new point p lies inside this polygon. (If p is on the boundary of the polygon, you should return False).
 */

var assert = require('assert');
var path = require('path');

describe(path.basename(__filename), () => {
    const triangle = [[1,-1],[-2,5],[4,3]];
    it('should pass the positive case', () => {
        assert.strictEqual(insidePolygon(triangle,[1,1]),true);
        assert.strictEqual(insidePolygon(triangle,[0,0]),true);
    });
    it('should pass the negative test', () => {
        assert.strictEqual(insidePolygon(triangle,[7,7]),false);
    });
});

function insidePolygon(points, newPoint) {
    // ray casting - from the point going in any direction
    // count how many times it intersects with the polygon
    const randPt = [Math.random(5),Math.random(5)];
    // slope = (y2 - y1) / (x2 - x1)
    // y2 = slope * x2 + intercept ==> intercept = y2 - (slope * x2)
    const slope = (randPt[1] - newPoint[1]) / (randPt[0] - newPoint[0]);
    const intercept = newPoint[1] - (slope * newPoint[0]);
    let intersections = 0;
    for (let i=0; i < points.length - 2; i++) {
        const pta = points[i];
        const ptb = points[i+1];
        const polySlope = (pta[1] - ptb[1]) / (pta[0] - ptb[0]);
        const polyIntercept = pta[1] - (polySlope * pta[0]);
        // find intersection of this line with the ray
        // intersection: ax + c = bx + d ==> x = (d-c) / (a-b)
        const x_int = (slope - polySlope) / (intercept - polyIntercept);
        // find y = slope * x + intercept
        const y_int = slope * x_int + intercept;
        // check if the intersection is on the polygon
        const xmin = Math.min(pta[0],ptb[0]);
        const xmax = Math.max(pta[0],ptb[0]);
        const ymin = Math.min(pta[1],ptb[1]);
        const ymax = Math.max(pta[1],ptb[1]);
        console.log(x_int + ',' + y_int);
        if (x_int < xmax && x_int > xmin && y_int < ymax && y_int > ymin) {
            intersections++;
        }
    }
    console.log(intersections);
    return intersections % 2 === 0 ? false : true; // even=outside; odd=inside
}