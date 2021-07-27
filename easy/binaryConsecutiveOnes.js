/**
 * Given an integer n, return the length of the longest consecutive run of 1s in its binary representation.

For example, given 156, you should return 3.
 */

var assert = require('assert');
var path = require('path');

describe(path.basename(__filename), () => {
    it('should pass the default case', () => {
        assert.strictEqual(longestConsecutive(156),3);
        assert.strictEqual(longestConsecutive(1049),2);
        assert.strictEqual(longestConsecutive(15),4);
    });
});

function longestConsecutive(num) {
    const bin = num.toString(2);
    let numOnes = 0;
    let max = 0;
    for (let x=0; x < bin.length; x++) {
        if (bin.charAt(x) === '1') {
            numOnes++;
        } else {
            numOnes = 0;
        }
        if (numOnes > max) max = numOnes;
    }
    return max;
}