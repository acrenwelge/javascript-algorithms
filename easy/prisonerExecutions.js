/**
 * There are N prisoners standing in a circle, waiting to be executed. The executions are carried out starting with the kth person, and removing every successive kth person going clockwise until there is no one left.

Given N and k, write an algorithm to determine where a prisoner should stand in order to be the last survivor.

For example, if N = 5 and k = 2, the order of executions would be [2, 4, 1, 5, 3], so you should return 3.

Bonus: Find an O(log N) solution if k = 2.
 */

var assert = require('assert');
const { exec } = require('child_process');
var path = require('path');

describe(path.basename(__filename), () => {
    it('should pass the default case', () => {
        assert.strictEqual(findSurvivor(5,2),3);
    });
    it('should pass the custom case', () => {
        assert.strictEqual(findSurvivor(6,3),1);
        // 3, 6, 4, 2, 5, 1
        assert.strictEqual(findSurvivor(6,1),6);
        // 1, 2, 3, 4, 5, 6
    });
});

function findSurvivor(n,k) {
    if (n === 1) return 1;
    return (findSurvivor(n-1,k) + (k-1)) % n + 1;
}