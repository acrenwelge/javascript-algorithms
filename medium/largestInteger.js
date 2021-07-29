/**
 * Given a list of numbers, create an algorithm that arranges them in order to form the largest possible integer. For example, given [10, 7, 76, 415], you should return 77641510.
 */

var assert = require('assert');
var path = require('path');

describe(path.basename(__filename), () => {
  it('should pass the default case', () => {
    const nums = [10,7,76,415];
    assert.strictEqual(getLargestInteger(nums),77641510);
  });
  it('should pass the custom case', () => {
    const nums = [33,77,91,6,2];
    assert.strictEqual(getLargestInteger(nums),91776332);
  });
});

function getLargestInteger(nums) {
    // sort by largest starting digit
    let sorted = nums.map(n => String(n).split(''))
        .sort(function(x,y) {
            const len = x.length > y.length ? y.length : x.length;
            let i = 0;
            while(i < len) {
                if (x[i] !== y[i]) {
                    return Number(y[0]) - Number(x[0]);
                }
                i++;
            }
            return x.length > y.length ? 1 : -1;
        })
        .map(arr => arr.join(''))
        .map(n => Number(n));
    return Number(sorted.join(''));
}