/* You're given a string consisting solely of (, ), and *. * can represent either a (, ), or an empty string. Determine whether the parentheses are balanced.

For example, (()* and (*) are balanced. )*( is not balanced.
*/

var assert = require('assert');
var path = require('path');

describe(path.basename(__filename), () => {
  xit('should pass default test', () => {
    assert.ok(balanced("(()*"));
    assert.ok(balanced("(*)"));
    assert.strictEqual(balanced(")*("),false);
  })
});

function balanced(str) {
  // Approach is wrong here - fails the case "()()"

  /** Work in from the beginning and end of the string
   * @param subs - substring to check
   * @param open - number of open brackets before the current substring
   * @param aStart - num of asterisks before the substring
   * @param aEnd - num of asterisks after the substring
   * @returns `true` if balanced; `false` if not
   */
  function checkBalanceNested(subs, open, aStart, aEnd) {
    if(subs.length === 0) {
      return true;
    } else if (subs.length === 1) {
      if (str.indexOf(0) === '(') {
        return aEnd > 0;
      } else if (str.indexOf(0) === ')') {
        return aStart > 0;
      } else return true;
    } else {
      // check first character and see if there is a matching closing character
      const begin = str.indexOf(0);
      const end = str.indexOf(str.length - 1);
      if (begin === ')') {
        if (open > 0) {
          return checkBalanceNested(subs.substring(1,subs.length-2), open-1, aStart, aEnd);
        } else return false;
      } else if (begin === '(') {
        if (end === ')') {
          return checkBalanceNested(subs.substring(1,subs.length-2), open, aStart, aEnd);
        } else if (end === '(') {
          return false;
        } else {
          return checkBalanceNested(subs.substring(1,subs.length-2), open, aStart, aEnd + 1);
        }
      } else if (begin === '*') {
        if (end === ')') {
          return checkBalanceNested(subs.substring(1,subs.length-2), open, aStart, aEnd);
        } else if (end === '(') {
          return false;
        } else {
          return checkBalanceNested(subs.substring(1,subs.length-2), open, aStart+1, aEnd+1);
        }
      }
    }
  }
  return checkBalanceNested(str, 0, 0, 0);
}