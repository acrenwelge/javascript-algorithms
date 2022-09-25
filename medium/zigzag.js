/* Given a string and a number of lines k, print the string in zigzag form. In zigzag, characters are printed out diagonally from top left to bottom right until reaching the kth line, then back up to top right, and so on.

For example, given the sentence "thisisazigzag", you should print:

k=5     next letter on first line = k*2-1; diagonal length = k
t       i       7 spaces; [0,8]    [i,(k-i-1)*2]
 h     z g      5 spaces; [1,7,9]  [i,(k-i-1)*2-1,(k-i-1)*2+1]
  i   a   z     3 spaces; [2,6,10] [i,(k-i-1)*2-2,(k-i-1)*2+2]
   s s     a    1 spaces; [3,5,11] 
    i       g   7 spaces; [4,12]   

k=4
t     a     g   5 (# spaces = (k-1)*2-1-2*row)
 h   s z   a    3 
  i i   i z     1
   s     g

k=3
t   i   i   g   3
 h s s z g a    1
  i   a   z

k=2
t i i a i z g   1 space betw; (0th+1sp+2nd+1sp+4th+1sp+6th+...+)
 h s s z g a
*/
var assert = require('assert');
var path = require('path');
var logger = require('../util/logger');

describe(path.basename(__filename), () => {
  it('should pass the default case', () => {
    console.log(zigzag('thisisazigzag',4));
  });
});

function zigzag(s,k) {
/*
    1) Create an array of k strings, arr[k]
    2) Initialize direction as "down" and row as 0. The 
   direction indicates whether we need to move up or 
   down in rows. 
    3) Traverse the input string, do following for every
   character.
        a) Append current character to string of current row.
        b) If row number is k-1, then change direction to 'up'
        c) If row number is 0, then change direction to 'down'
        d) If direction is 'down', do row++.  Else do row--.
    4) One by one print all strings of arr[].
*/
  let arr = new Array(k);
  arr.fill('');
  let row = 0;
  let down = true;
  for (let i=0; i < s.length; i++) {
    const letter = s.charAt(i);
    arr[row] = arr[row].concat(letter);
    if (row === k-1) {
        down = false;
    } else if (row === 0) {
        down = true;
    }
    down ? row++ : row--;
  }
  return arr.join();
}