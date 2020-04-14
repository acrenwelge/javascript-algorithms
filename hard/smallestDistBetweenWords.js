/*
 * Find an efficient algorithm to find the smallest distance (measured in number of words) between any two given words in a string.

For example, given words "hello", and "world" and a text content of "dog cat hello cat dog dog hello cat world", return 1 because there's only one word "cat" in between the two words.
*/

var assert = require('assert');
var path = require('path');

describe(path.basename(__filename), () => {
  it('should pass the default case', () => {
    let str = "dog cat hello cat dog dog hello cat world";
    assert.equal(getSmallestDistance(str,'hello','world'),1);
  });
  it('should pass custom case', () => {
    let str = "my super awesome really really fantastic and really cool and amazing string";
    assert.equal(getSmallestDistance(str,'really','amazing'),2);
  });
});

function getSmallestDistance(str, word1, word2) {
  // approach: iterate through to find all combos
  // stop at each instance of word1 and calculate the distance to each subsequent word2
  // sort the distances and take the smallest
  let distances = [];
  let words = str.split(' ');
  for (let x=0; x < words.length; x++) {
    if (words[x] == word1) {
      for (let y=x; y < words.length; y++) {
        if (words[y] == word2) {
          distances.push(y-x-1);
        }
      }
    }
  }
  distances.sort();
  return distances[0];
}

// time: 5 min
