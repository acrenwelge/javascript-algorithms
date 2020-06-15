/*
 * Given a string s and a list of words words, where each word is the same length, find all starting indices of substrings in s that is a concatenation of every word in words exactly once.

For example, given s = "dogcatcatcodecatdog" and words = ["cat", "dog"], return [0, 13], since "dogcat" starts at index 0 and "catdog" starts at index 13.

Given s = "barfoobazbitbyte" and words = ["dog", "cat"], return [] since there are no substrings composed of "dog" and "cat" in s.

The order of the indices does not matter.
*/


var assert = require('assert');
var path = require('path');
var logger = require('../util/logger');

describe(path.basename(__filename), () => {
  it('should pass the default case', () => {
    const str = 'dogcatcatcodecatdog';
    const words = ['cat','dog'];
    assert.deepEqual(findStartingIndeces(str,words), [0,13]);
  });
  it('should pass the second case', () => {
    const str = 'barfoobazbitbyte';
    const words = ['cat','dog'];
    assert.deepEqual(findStartingIndeces(str,words), []);
  });
})

function findStartingIndeces(str, words) {
  // approach: generate all the ways to concatenate the words in the list
  // then for each possibility find the starting index in the string
  let combos = [];
}
