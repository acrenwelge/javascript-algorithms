/**
 * Spreadsheets often use this alphabetical encoding for its columns: "A", "B", "C", ..., "AA", "AB", ..., "ZZ", "AAA", "AAB", ....

Given a column number, return its alphabetical column id. For example, given 1, return "A". Given 27, return "AA".
 */

var assert = require('assert');
const exp = require('constants');
var path = require('path');

describe(path.basename(__filename), () => {
  let tests = [[1,'A'],
                [25,'Y'],
                [26,'Z'],
                [27,'AA'],
                [30,'AD'],
                [676,'YZ'],
                [677,'ZA'],
                [731,'ABC'],
                [17577,'YZA']];
  for (let test of tests) {
    it(`should pass the case n=${test[0]}`, () => {
        assert.strictEqual(convert(test[0]),test[1]);
    });
  }
});

function convert(n) {
    const UNICODE_START = 65; // unicode value of 'A'
    // this is a conversion from base 10 to base 26 then encoding
    let chars = [];
    while (n > 0) {
        const mod = (n-1) % 26;
        // console.log(`c=${mod}`);
        chars.push(String.fromCharCode(mod + UNICODE_START));
        n = Math.floor((n - mod) / 26);
        // console.log(`n=${n}`);
    }
    return chars.reverse().join('');
}