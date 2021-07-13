/** Given an array and a number k that's smaller than the length of the array, rotate the array to the right k elements in-place.
 */

var assert = require('assert');
var path = require('path');

describe(path.basename(__filename), () => {
    it('should rotate 2 elements to the right', () => {
        const arr = [1,2,3,4];
        assert.deepStrictEqual(rotateK(arr,2), [3,4,1,2]);
    });
    it('should rotate 3 elements to the right', () => {
        const arr = [3,9,1,7,3,2,1];
        assert.deepStrictEqual(rotateK(arr,3), [7,3,2,1,3,9,1]);
    });
});

function rotateK(arr,k) {
    return arr.slice(k,arr.length).concat(arr.slice(0,k));
}