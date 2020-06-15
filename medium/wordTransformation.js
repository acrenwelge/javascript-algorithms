/*
 * Given a start word, an end word, and a dictionary of valid words, find the shortest transformation sequence from start to end such that only one letter is changed at each step of the sequence, and each transformed word exists in the dictionary. If there is no possible transformation, return null. Each word in the dictionary have the same length as start and end and is lowercase.

For example, given start = "dog", end = "cat", and dictionary = {"dot", "dop", "dat", "cat"}, return ["dog", "dot", "dat", "cat"].

Given start = "dog", end = "cat", and dictionary = {"dot", "tod", "dat", "dar"}, return null as there is no possible transformation from dog to cat.
*/

var assert = require('assert');
var path = require('path');
var logger = require('../util/logger.js');

describe(path.basename(__filename), () => {
  beforeEach(() => {
    logger.setLevel('OFF');
  })
  it('should pass the default case 1', () => {
    const start = 'dog';
    const end = 'cat';
    const dict = ['dot','dop','dat','cat'];
    assert.deepEqual(['dog','dot','dat','cat'], transform(start,end,dict));
  });
  it('should pass the default case 2', () => {
    const start = 'dog';
    const end = 'cat';
    const dict = ['dot','tod','dat','dar'];
    assert.equal(null, transform(start,end,dict));
  });
  it('should validate 1 letter difference', () => {
    const word = 'dog';
    const dict = ['dot','dat','cat'];
    assert.deepEqual(['dot'],findOneLetterDiff(word, dict));
  })
})

// returns shortest transformation sequence (or null if none exist)
function transform(start, end, dict) {
  function recurse(start, arr) {
    logger.info(`recursing... start = ${start}; arr=${arr}`);
    let nextWords = findOneLetterDiff(start, dict);
    logger.info(`nextWords: ${nextWords}`);
    if (nextWords == null) {
      return null;
    }
    for (let w of nextWords) {
      if (w == end) {
        arr.push(w);
        logger.info(`returning ${arr}`)
        return arr;
      }
      if (arr.includes(w)) {
        continue;
      }
      arr.push(w);
      let ans = recurse(w, arr);
      if (ans == null) {
        arr.pop();
        continue;
      } else {
        arr.join(ans);
        logger.info(`returning ${arr}`)
        return arr;
      }
    }
    return null;
  }
  if (!dict.includes(end)) {
    return null;
  }
  return recurse(start, [start]);
}

/*
 * Finds and returns the next words in the dictionary that are one letter away from word1.
 * If there are none, return null
 */
function findOneLetterDiff(word, dict) {
  let matches = [];
  for (let entry of dict) {
    logger.info(`searching ${entry} for letter difference`)
    if (entry.length != word.length) {
      continue;
    }
    let diffCount = 0;
    for (let i=0; i < entry.length; i++) {
      logger.info(`looking at character ${entry.charAt(i)} - diffCount=${diffCount}`);
      if (entry.charAt(i) != word.charAt(i)) {
        diffCount++;
      }
      if (diffCount > 1) {
        diffCount = 0;
        break;
      }
    }
    if (diffCount == 1) {
      logger.info(`pushing ${entry} - array is ${matches}`);
      matches.push(entry);
    }
  }
  return matches;
}
