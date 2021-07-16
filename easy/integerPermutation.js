/**
 * Given an integer, find the next permutation of it in absolute order. For example, given 48975, the next permutation would be 49578.
 */

 var assert = require('assert');
 var path = require('path');
 
 describe(path.basename(__filename), () => {
     it('should pass the default cases', () => {
         assert.strictEqual(nextPerm(48975),49578);
     });
     it('should pass the custom case', () => {
        assert.strictEqual(nextPerm(43251),43512);
    });
});

function nextPerm(x) {
    let digits = String(x).split("").map(s => Number(s));
    // Find the rightmost position p at which digits[p] < digits[p+1]
    let p = null;
    for (let x=digits.length-2; x > 0; x--) {
        if (digits[x] < digits[x+1]) {
            p = x;
            break;
        }
    }
    if(p === null) {
        return Number(digits.join(''));
    }
    // find the index to the right of p that is as small as possible but bigger than digits[p]
    const min = digits[p];
    let stop = null;
    for (let j = p; j < digits.length; j++) {
        if (digits[j] > min && (stop === null || digits[j] < stop)) {
            stop = j;
        }
    }
    // swap them
    digits[p] = digits[stop];
    digits[stop] = min;
    // sort the elements to the right of p
    let sorted = digits.slice(p+1,digits.length).sort((z,y) => z - y);
    return Number(digits.slice(0,p+1).concat(sorted).join(''));
}