/**
Given a string which we can delete at most k, return whether you can make a palindrome.

For example, given 'waterrfetawx' and a k of 2, you could delete f and x to get 'waterretaw'.
*/

var assert = require('assert');
var path = require('path');
var logger = require('../util/logger');

describe(path.basename(__filename), () => {
  it('helper function should check', function() {
    assert.ok(check('racecar'));
    assert.ok(!check('blah'));
  });
  it('should return true for default case with k=2', function() {
    assert.strictEqual(canMakePalindrome('waterrfetawx',2), true);
  });
  it('should return false for default case with k=1', function() {
    assert.strictEqual(canMakePalindrome('waterrfetawx',1), false);
  });
  it('should pass custom test "hxelltolbleh"', () => {
    // should work with k=3 but not k=2
    assert.strictEqual(canMakePalindrome('hxelltolbleh',3), true);
    assert.strictEqual(canMakePalindrome('hxelltolbleh',2), false);
  });
  it('should pass custom test "blah"', () => {
    assert.strictEqual(canMakePalindrome('blah',1), false);
  });
});

function check(str) {
  // helper func to check if string is palindrome
  // logger.debug(`checking ${str}`);
  let split = str.split('');
  return JSON.stringify(split) == JSON.stringify(split.reverse());
}

function canMakePalindrome(string, K) {
  // base case: TRUE for k=0, str = '' or 'x' or 'xx' where x is any character
  // for k=1 and str.length <= 2 => TRUE for any string
  // for k=2 and str.length <= 3 => TRUE for any string
  // general base case: if str.length <= k+1 => TRUE
  // another observation: given n = string.length, for each character we can choose whether to delete or not
  // for a total of 2^n possibilities (k=1)
  function recurse(str, k) {
    logger.debug(`k=${k}`);
    // shortcuts
    if (check(str)) return true;
    if (k <= 0) return false;
    if (str.length <= k+1) return true;
    for (let i=1; i < str.length; i++) {
      // 2 options at each character - to remove or not. we check both cases
      let removed = str.slice(0,i).concat(str.slice(i+1));
      logger.debug(removed);
      if (check(removed)) {
        logger.debug(`found true palindrome! ${removed}`);
        return true;
      }
      if (k > 0 && recurse(removed,k-1)) {
        logger.debug(`found a possibility: ${removed}`);
        return true;
      }
      // the case for the character not being removed is handled by continuing to the next iteration
    }
    logger.debug('not found');
    return false; // default is not possible to make palindrome
  }
  return recurse(string,K);
}

