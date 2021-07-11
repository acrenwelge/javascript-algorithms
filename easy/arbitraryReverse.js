/*
 * Implement reverse(lst, i, j), which reverses lst from i to j.
 */

var assert = require('assert');
var path = require('path');

describe(path.basename(__filename), () => {
  it('should reverse array from idx 2 to 4', () => {
    const lst = [1,2,3,4,5];
    assert.deepStrictEqual(reverseMe(lst,2,4), [1,2,4,3,5]);
  })
});

function reverseMe(lst, i, j) {
  const part = lst.splice(i,(j-i)).reverse();
  lst.splice(i,0,part);
  return lst.flat();
}