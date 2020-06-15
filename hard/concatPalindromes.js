/*
 * Given a list of words, find all pairs of unique indices such that the concatenation of the two words is a palindrome.

For example, given the list ["code", "edoc", "da", "d"], return [(0, 1), (1, 0), (2, 3)]
*/

var assert = require('assert');
var path = require('path');

describe(path.basename(__filename), () => {
  it('palindrome checker should work', () => {
    const pal = 'racecar';
    const notpal = 'tomato';
    assert.equal(isPalindrome(pal), true);
    assert.equal(isPalindrome(notpal),false);
  });
  it('should pass default test', () => {
    const arr = ['code','edoc','da','d'];
    assert.deepEqual(findPairs(arr),[[0,1],[1,0],[2,3]]);
  });
});

function findPairs(list) {
  let pairs = [];
  for (let x=0; x < list.length; x++) {
    for (let y=0; y < list.length; y++) {
      const word = list[x];
      const compare = list[y];
      if (x != y && isPalindrome(word.concat(compare))) {
        pairs.push([x, y]);
      }
    }
  }
  return pairs;
}

function isPalindrome(word) {
  const wordArr = word.split('');
  const reversed = wordArr.slice().reverse();
  for (let x=0; x < wordArr.length; x++) {
    if (wordArr[x] != reversed[x]) {
      return false;
    }
  }
  return true;
}
