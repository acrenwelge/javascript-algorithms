/*
 * Given a string, return the first recurring character in it, or null if there is no recurring character.

For example, given the string "acbbac", return "b". Given the string "abcdef", return null.
*/

var assert = require('assert');
var path = require('path');

describe(path.basename(__filename), () => {
  it('should pass the default case', () => {
    assert.equal(findFirstRecurring('acbbac'), 'b');
  });
  it('should pass the custom case', () => {
    assert.equal(findFirstRecurring('oqwfnpwoib'), 'w');
  });
});

function findFirstRecurring(str) {
  let x = 0;
  let unique = new Set();
  while (x < str.length) {
    if (unique.has(str.charAt(x))) {
      return str.charAt(x);
    } else {
      unique.add(str.charAt(x));
    }
    x++;
  }
  return null;
}
