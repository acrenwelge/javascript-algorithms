/**
 * Given a set of distinct positive integers, find the largest subset such that every pair of elements in the subset (i, j) satisfies either i % j = 0 or j % i = 0.

For example, given the set [3, 5, 10, 20, 21], you should return [5, 10, 20]. Given [1, 3, 6, 24], return [1, 3, 6, 24].
 */

var assert = require('assert');
var path = require('path');

describe(path.basename(__filename), () => {
    it('should pass the default cases', () => {
        const set = [3,5,10,20,21];
        assert.deepStrictEqual(largestSubset(set),new Set([5,10,20]));
        const set2 = [1,3,6,24];
        assert.deepStrictEqual(largestSubset(set2), new Set([1,3,6,24]));
    });
});

function largestSubset(set) {
    let possible = [];
    function searchExistingSubsets(i,j,subsets) {
        let found = false;
        for (let subset of subsets) {
            if (found) break;
            for (let num of subset) {
                if (found) break;
                if (num % set[i] === 0 || num % set[j] === 0
                    || set[i] % num === 0 || set[j] % num === 0) {
                        subset.add(set[i]);
                        subset.add(set[j]);
                        found = true;
                    }
            }
        }
        if (!found) {
            subsets.push(new Set([set[i],set[j]]));
        }
    }
    for (let i=0; i < set.length; i++) {
        for (let j=0; j < set.length; j++) {
            if (i !== j && (set[i] % set[j] === 0 || set[j] % set[i] === 0)) {
                if (possible.length === 0) possible.push(new Set([set[i],set[j]]));
                else {
                    searchExistingSubsets(i,j,possible);
                }
            }
        }
    }
    possible.sort((x,y) => y.size - x.size);
    return possible[0];
}