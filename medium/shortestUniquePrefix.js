/*
 * Given a list of words, return the shortest unique prefix of each word. For example, given the list:

dog
cat
apple
apricot
fish
Return the list:

d
c
app
apr
f
*/

var assert = require('assert');
var path = require('path');

describe(path.basename(__filename), () => {
  it('should pass the default case', () => {
    let words = ['dog','cat','apple','apricot','fish'];
    let result = ['d','c','app','apr','f'];
    const res = getUniquePrefixes(words);
    assert.deepEqual(res,result);
  });
});

function getUniquePrefixes(words) {
  // iterate through the entire list for each word
  // O(n^2) solution
  let prefs = [];
  for (let word of words) {
    let endIdx = 1;
    let prefixExists = true;
    while(prefixExists) {
      const prefix = word.substring(0, endIdx);
      let filtered = words.filter(w => w != word && w.startsWith(prefix));
      prefixExists = false;
      if (filtered.length > 0) {
        prefixExists = true;
        endIdx++;
      } else {
        prefs.push(prefix);
        break;
      }
    }
  }
  return prefs;
}

// time: 10 min
// refactor: +5 min
