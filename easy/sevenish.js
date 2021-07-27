/**
 * Let's define a "sevenish" number to be one which is either a power of 7, or the sum of unique powers of 7. The first few sevenish numbers are 1, 7, 8, 49, and so on. Create an algorithm to find the nth sevenish number.
 */

var assert = require('assert');
var path = require('path');

describe(path.basename(__filename), () => {
    it('should pass the default case', () => {
        assert.strictEqual(sevenish(4),49);
        assert.strictEqual(sevenish(5),50);
        assert.strictEqual(sevenish(6),56);
        assert.strictEqual(sevenish(7),343);
    });
});

function sevenish(n) {
    if(n === 1) return 1;
    let x = 2;
    let powers = [1,7];
    let sev = [1,7];
    while (x < n) {
        // find the next sum of unique powers
        let sum;
        let exit = false;
        for (let p=0; p < powers.length; p++) {
            for (let q=0; q < powers.length; q++) {
                const test = powers[p] + powers[q];
                if (p !== q && test > sev[sev.length-1]) {
                    sum = test;
                    exit = true;
                    break;
                }
            }
            if (exit) break;
        }
        // find the next power of 7
        const nextPower = Math.pow(7,powers.length);
        // find the next sevenish number
        if (sum) {
            if (sum < nextPower) {
                sev.push(sum);
            } else {
                powers.push(nextPower);
                sev.push(nextPower);
            }
        } else {
            powers.push(nextPower);
            sev.push(nextPower);
        }
        x++;
    }
    return sev[sev.length-1];
}