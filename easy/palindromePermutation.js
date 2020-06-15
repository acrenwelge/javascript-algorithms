/*
 * Given a string, determine whether any permutation of it is a palindrome.

For example, carrace should return true, since it can be rearranged to form racecar, which is a palindrome. daily should return false, since there's no rearrangement that can form a palindrome.
*/

var assert = require('assert');
var path = require('path');

describe(path.basename(__filename), () => {
  it('should pass the default cases', () => {
    assert.ok(canMakePalindrome('carrace'));
    assert.ok(!canMakePalindrome('daily'));
  });
  it('should pass a custom case', () => {
    assert.ok(canMakePalindrome('adoalplod'));
  })
});

function canMakePalindrome(word) {
  // if there is <=1 character without a pair then we can make a palindrome
  let x=0;
  let chars = new Set();
  while(x < word.length) {
    if (chars.has(word.charAt(x))) {
      chars.delete(word.charAt(x));
    } else {
      chars.add(word.charAt(x));
    }
    x++;
  }
  return chars.size <= 1 ? true : false;
}
