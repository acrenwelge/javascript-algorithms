/**
 * Given a string and a pattern, find the starting indices of all occurrences of the pattern in the string. For example, given the string "abracadabra" and the pattern "abr", you should return [0, 7].
 */

 var assert = require('assert');
 var path = require('path');
 
 describe(path.basename(__filename), () => {
   it('should pass the default case', () => {
       assert.deepStrictEqual(findPatterns("abracadabra", "abr"),[0,7]);
   });
   it('should pass the custom case', () => {
    assert.deepStrictEqual(findPatterns("superdupertrooper", "er"),[3,8,15]);
});
});

function findPatterns(str, pattern) {
    let fromIdx = str.indexOf(pattern);
    if (fromIdx === -1) return [];
    let patterns = [];
    while(fromIdx != -1) {
        patterns.push(fromIdx);
        fromIdx = str.indexOf(pattern, fromIdx+1);
        console.log(fromIdx);
    }
    return patterns;
}
 