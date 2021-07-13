/**
 * Let X be a set of n intervals on the real line. We say that a set of points P "stabs" X if every interval in X contains at least one point in P. Compute the smallest set of points that stabs X.

For example, given the intervals [(1, 4), (4, 5), (7, 9), (9, 12)], you should return [4, 9].
 */

var assert = require('assert');
var path = require('path');

describe(path.basename(__filename), () => {
    it('should pass the default case', () => {
        assert.deepStrictEqual(minStabs([[1,4],[4,5],[7,9],[9,12]]),[4,9]);
    });
    it('should pass the custom case', () => {
        const ints = [[0,10],[1,3],[2,4],[7,11],[15,19]];
        assert.deepStrictEqual(minStabs(ints),[3,9,17]);
    });
    it('should pass the extra custom case', () => {
        const ints = [[1,2],[3,4],[9,11],[10,12]];
        assert.deepStrictEqual(minStabs(ints),[2,4,11]);
    });
});

// approach: find where intervals overlap
function minStabs(intervals) {
    let points = [];
    let ci = getCompressedIntervals(intervals);
    while (true) {
        let newCi = getCompressedIntervals(ci);
        if (ci.every((interval, idx) => interval[0] === newCi[idx][0] 
        && interval[1] === newCi[idx][1])) break;
        ci = newCi;
    }
    points = ci.map(i => Math.round((i[0]+i[1])/2)).sort((x,y) => x - y);
    return [...new Set(points)]; // remove duplicates
}

// compresses intervals where an overlap is found
function getCompressedIntervals(intervals) {
    // keep track of whether an interval has an overlapping partner
    let intervalOverlapsAnother = new Array(intervals.length).fill(false);
    let compressedIntervals = [];
    for (let x=0; x < intervals.length; x++) {
        for (let y=x+1; y < intervals.length; y++) {
            let find = findOverlap(intervals[x], intervals[y]);
            if (find.overlaps) {
                compressedIntervals.push([find.min, find.max]);
                intervalOverlapsAnother[x] = true;
                intervalOverlapsAnother[y] = true;
            }
        }
    }
    intervalOverlapsAnother.forEach((intHasOverlap, idx) => {
        // this is needed so that we include points for lone intervals (no overlaps)
        if (!intHasOverlap) compressedIntervals.push(intervals[idx]);
    });
    return compressedIntervals;
}

function findOverlap(ia, ib) {
    if ((ia[0] <= ib[1] && ia[1] >= ib[0]) || (ib[0] <= ia[1] && ib[1] >= ia[0])) {
        return {
            overlaps: true,
            min: Math.max(ia[0],ib[0]),
            max: Math.min(ia[1],ib[1])
        }
    } else return {overlaps: false}
}