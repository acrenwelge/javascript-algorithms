/*
Given a list of words, determine whether the words can be chained to form a circle. A word X can be placed in front of another word Y in a circle if the last character of X is same as the first character of Y.

For example, the words ['chair', 'height', 'racket', touch', 'tunic'] can form the following circle: chair --> racket --> touch --> height --> tunic --> chair
*/

var assert = require('assert');
var path = require('path');

describe(path.basename(__filename), () => {
  it('should pass the default case', () => {
    assert.ok(canBeChained(['chair','height','racket','touch','tunic']));
  });
  it('should pass the negative case', () => {
    assert.ok(!canBeChained(['chairs','height','racket','touch','tunic']));
  });
});

function canBeChained(arr) {
    let initChar;
    let recurse = (remaining, finalChar) => {
        if (remaining.length === 0) {
            // check final condition
            if (finalChar === initChar) return true;
        }
        for (let word of remaining) {
            if(word.charAt(0) === finalChar) {
                let newRemain = remaining.filter(w => w !== word);
                return recurse(newRemain, word.charAt(word.length-1));
            }
        }
        return false;
    }
    // brute force - try every combination
    for (let word of arr) {
        initChar = word.charAt(0);
        let finalChar = word.charAt(word.length-1);
        let isValid = recurse(arr.filter(w => w !== word), finalChar);
        if (isValid) return true;
    }
    return false;
}