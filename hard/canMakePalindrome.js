/**
Given a string which we can delete at most k, return whether you can make a palindrome.

For example, given 'waterrfetawx' and a k of 2, you could delete f and x to get 'waterretaw'.
*/

var assert = require('assert');

function canMakePalindrome(str, k) {
  console.log(str);
  return true;
}

describe('canMakePalindrome', function() {
  it('should return true for default case', function() {
    assert.equal(canMakePalindrome('waterrfetawx',2), true);
  });
  it('should return false for default case', function() {
    assert.equal(canMakePalindrome('waterrfetawx',1), false);
  });
});
