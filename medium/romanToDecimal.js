/**
 * Given a number in Roman numeral format, convert it to decimal.

The values of Roman numerals are as follows:

{
    'M': 1000,
    'D': 500,
    'C': 100,
    'L': 50,
    'X': 10,
    'V': 5,
    'I': 1
}
In addition, note that the Roman numeral system uses subtractive notation for numbers such as IV and XL.

For the input XIV, for instance, you should return 14.
 */

var assert = require('assert');
var path = require('path');

describe(path.basename(__filename), () => {
    it('should pass the default case', () => {
        assert.strictEqual(romanToDecimal('XIV'),14);
        assert.strictEqual(romanToDecimal('MDCCXLV'),1745);
        assert.strictEqual(romanToDecimal('CMXLIV'),944);
        assert.strictEqual(romanToDecimal('CMXLVIII'),948);
    });
});

function romanToDecimal(roman) {
    const vals = {
        'M': 1000,
        'D': 500,
        'C': 100,
        'L': 50,
        'X': 10,
        'V': 5,
        'I': 1
    }
    const arr = roman.split('');
    let tot = 0;
    for (let x=0; x < arr.length; x++) {
        if (x != arr.length - 1 && vals[arr[x]] < vals[arr[x+1]]) {
            tot += vals[arr[x+1]] - vals[arr[x]];
            x++;
        } else {
            tot += vals[arr[x]];
        }
    }
    return tot;
}