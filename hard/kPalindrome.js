/**
Given a string which we can delete at most k, return whether you can make a palindrome.

For example, given 'waterrfetawx' and a k of 2, you could delete f and x to get 'waterretaw'.
*/

var assert = require('assert');

describe(__filename, function() {
  it('helper function should check', function() {
    assert.ok(check('racecar'));
    assert.ok(!check('blah'));
  });
  it('should return true for default case with k=2', function() {
    assert.equal(canMakePalindrome('waterrfetawx',2), true);
  });
  it('should return false for default case with k=1', function() {
    assert.equal(canMakePalindrome('waterrfetawx',1), false);
  });
});

function check(str) {
  // helper func to check if string is palindrome
  console.debug(`checking ${str}`);
  let split = str.split('');
  return JSON.stringify(split) == JSON.stringify(split.reverse());
}

function canMakePalindrome(str, k) {
  // base case: TRUE for k=0, str = '' or 'x' or 'xx' where x and y are distinct characters
  // for k=1 and str.length <= 2 => TRUE for any string
  // for k=2 and str.length <= 3 => TRUE for any string
  // general base case: if str.length <= k+1 => TRUE
  // another observation: given n = string.length, for each character we can choose whether to delete or not
  // for a total of 2^n possibilities (k=1)
  function recurse(str, k) {
    console.debug(`k=${k}`);
    if (k <= 0) return false;
    if (str.length <= k+1 || check(str)) return true;
    for (let i=0; i < str.length; i++) {
      // 2 options at each character - to remove or not. we check both cases
      let removed = str.slice(0,i).concat(str.slice(i+1));
      if (check(removed)) {
        return true;
      }
      if (recurse(removed,k-1)) {
        return true;
      }
    }
  }
  recurse(str,k);
  return true;
}

