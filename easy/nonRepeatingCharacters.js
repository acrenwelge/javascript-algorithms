/**
 * Given a string with repeated characters, rearrange the string so that no two adjacent characters are the same. If this is not possible, return None.

For example, given "aaabbc", you could return "ababac". Given "aaab", return None.
 */

var assert = require('assert');
var path = require('path');

describe(path.basename(__filename), () => {
    it('should pass the positive case', () => {
        assert.strictEqual(rearrange("aaabbc"),"ababac");
    });
    it('should pass the negative case', () => {
        assert.strictEqual(rearrange("aaab"),null);
    });
});

function rearrange(str) {
    // record a mapping of characters to their count
    // then write out the characters, alternating, starting with highest counts
    let counts = {};
    for (let i=0; i < str.length; i++) {
        const c = str.charAt(i);
        if (!counts[c]) {
            counts[c] = 1;
        } else {
            counts[c] = counts[c] + 1;
        }
    }
    const sorted = Object.entries(counts).sort(([,a],[,b]) => a-b);
    if (sorted[sorted.length - 1][1] > str.length / 2) return null;
    let newStr = "";
    for (let j = sorted.length-2; j >= 0; j--) {
        let char1 = sorted[j];
        let char2 = sorted[j+1];
        if (char2[1] === 0) char2 = sorted[j+2];
        const reps = char2[1] < char1[1] ? char2[1] : char1[1];
        newStr += (char2[0] + char1[0]).repeat(reps);
        char1[1] -= reps;
        char2[1] -= reps;
    }
    return newStr;
}