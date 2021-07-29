/**
 * You come across a dictionary of sorted words in a language you've never seen before. Write a program that returns the correct order of letters in this language.

For example, given ['xww', 'wxyz', 'wxyw', 'ywx', 'ywz'], you should return ['x', 'z', 'w', 'y'].
 */

var assert = require('assert');
var path = require('path');

describe(path.basename(__filename), () => {
    it('should pass the default case', () => {
        const words = ['xww', 'wxyz', 'wxyw', 'ywx', 'ywz'];
        assert.deepStrictEqual(sortLetters(words),['x','z','w','y']);
    });
});

function sortLetters(words) {
    /** compare consecutive words with each other letter by letter
     *  keep track of unique letters in a sorted array
     *  insert new letters in this array according to the comparison
     */
    let sorted = [];
    for (let i=0; i < words.length-1; i++) {
        const w1 = words[i];
        const w2 = words[i+1];
        const len = w1.length > w2.length ? w2.length : w1.length;
        for (let j=0; j < len; j++) {
            const c1 = w1.charAt(j);
            const c2 = w2.charAt(j);
            if (c1 === c2) {
                continue;
            } else if (sorted.includes(c1) && sorted.includes(c2)) {
                break;
            } else if (sorted.includes(c1)) {
                sorted.splice(sorted.indexOf(c1)+1,0,c2);
            } else if (sorted.includes(c2)) {
                sorted.splice(sorted.indexOf(c2),0,c1);
            } else {
                sorted.push(c1);
                sorted.push(c2);
            }
        }
    }
    return sorted;
}