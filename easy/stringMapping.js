/*
 * Determine whether there exists a one-to-one character mapping from one string s1 to another s2.

For example, given s1 = abc and s2 = bcd, return true since we can map a to b, b to c, and c to d.

Given s1 = foo and s2 = bar, return false since the o cannot map to two characters.
*/

var assert = require('assert');
var path = require('path');
var logger = require('../util/logger');

describe(path.basename(__filename), () => {
  it('should pass the default cases', () => {
    let s1 = 'abc';
    let s2 = 'bcd';
    assert.ok(canMap(s1,s2));
    s1 = 'foo';
    s2 = 'bar';
    assert.equal(canMap(s1,s2), false);
  });
  it('should pass custom cases', () => {
    let s = 'robot';
    let t = 'adedp';
    assert.ok(canMap(s,t));
    s = 'aaabbb';
    t = 'cdefgh';
    assert.equal(canMap(s,t), false);
  })
});

function canMap(str1, str2) {
  if (str1.length != str2.length) {
    return false;
  }
  let mappings = {}; // we'll keep track of character mappings here
  // if we find a contradiction we'll return false
  for (let idx = 0; idx < str1.length; idx++) {
    let c = str1.charAt(idx);
    let mapTo = str2.charAt(idx);
    if (mappings[c] && mappings[c] != mapTo) {
      return false;
    } else {
      mappings[c] = mapTo;
    }
  }
  return true;
}
