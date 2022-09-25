/**
Create a basic sentence checker that takes in a stream of characters and determines whether they form valid sentences.
If a sentence is valid, the program should print it out.

We can consider a sentence valid if it conforms to the following rules:

✅ The sentence must start with a capital letter, followed by a lowercase letter or a space.
✅ All other characters must be lowercase letters, separators (,,;,:) or terminal marks (.,?,!,‽).
✅ There must be a single space between each word.
✅ The sentence must end with a terminal mark immediately following a word.
*/
var assert = require('assert');
var path = require('path');

describe(path.basename(__filename), () => {
  it('should pass the positive case 1', () => {
    assert.strictEqual(sentenceCheck("Hello, my name is andrew."), true);
  });
  it('should pass the negative case 2', () => {
    assert.strictEqual(sentenceCheck("!!! This is not a sentence"), false);
  });
  it('should pass the negative case 3', () => {
    assert.strictEqual(sentenceCheck("aLso Not a sEntEnCe"), false);
  });
  it('should pass the negative case 4', () => {
    assert.strictEqual(sentenceCheck("False Sentence Here."), false);
  });
});

function sentenceCheck(str) {
  const start = str.charCodeAt(0);
  const next = str.charCodeAt(1);
  const lowercase = ['a','z'].map(c => c.charCodeAt(0));
  const uppercase = ['A','Z'].map(c => c.charCodeAt(0));
  const space = ' '.charCodeAt(0);
  const others = [',',';',':','.','?','!',"‽"].map(c => c.charCodeAt(0));
  const terminal = ['.','!','?','‽'].map(c => c.charCodeAt(0));
  if (start < uppercase[0] || start > uppercase[1]) return false;
  if ((next < lowercase[0] ||next > lowercase[1]) && next != space) return false;
  const words = str.split(" ");
  for (let x = 1; x < words.length; x++) {
    const word = words[x];
    console.log(word);
    for (let i = 0; i < word.length; i++) {
      const check = word.charCodeAt(i);
      console.log(word.charAt(i));
      if (check < lowercase[0] || check > lowercase[1]) {
        if (!others.includes(check)) return false;
      }
    }
  }
  lastWord = words[words.length-1];
  const finalChar = lastWord.charCodeAt(lastWord.length-1);
  if (!terminal.includes(finalChar)) return false;
  return true;
}