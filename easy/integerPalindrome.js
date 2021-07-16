/**
 * Write a program that checks whether an integer is a palindrome. For example, 121 is a palindrome, as well as 888. 678 is not a palindrome. Do not convert the integer into a string.
 */

var assert = require('assert');
var path = require('path');

describe(path.basename(__filename), () => {
    it('should pass the default cases', () => {
        assert.ok(isPalindrome(121));
        assert.ok(isPalindrome(888));
        assert.strictEqual(isPalindrome(678), false);
    });
    it('should pass custom tests', () => {
        assert.ok(isPalindrome(10001010001));
        assert.strictEqual(isPalindrome(90142), false);
    })
});

function isPalindrome(num) {
    let digits = [];
    let x = 1;
    while (Math.pow(10,x) < num) {
        x++;
    }
    while(x > 0) {
        x--;
        digits.push(Math.floor(num / Math.pow(10,x) % 10));
    }
    const reversed = digits.slice().reverse();
    return reversed.every((v,i) => digits[i] === v);
}