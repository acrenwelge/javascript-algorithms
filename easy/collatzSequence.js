/**
 * A Collatz sequence in mathematics can be defined as follows. Starting with any positive integer:

if n is even, the next number in the sequence is n / 2
if n is odd, the next number in the sequence is 3n + 1
It is conjectured that every such sequence eventually reaches the number 1. Test this conjecture.

Bonus: What input n <= 1000000 gives the longest sequence?
 */

var assert = require('assert');
var path = require('path');

describe(path.basename(__filename), () => {
  it('should test the conjecture', () => {
    let result = collatz(75);
    assert.strictEqual(result[result.length-1], 1);
    result = collatz(9);
    assert.strictEqual(result[result.length-1], 1);
    result = collatz(24);
    assert.strictEqual(result[result.length-1], 1);
    result = collatz(37);
    assert.strictEqual(result[result.length-1], 1);
    result = collatz(40);
    assert.strictEqual(result[result.length-1], 1);
  });
  xit('should find the longest sequence', function (done) {
    this.timeout(0); // disable timeout
    setTimeout(done, 300);
    let seq = [];
    let max = [];
    for (let x = 2; x < 1000000; x++) {
        seq = collatz(x);
        if (seq.length > max.length) max = seq;
    }
    console.log(`Longest sequence is n=${seq[0]}`);
    console.log(seq);
  });
});

function collatz(n) {
    let seq = [n];
    console.log(`starting seq n=${n}`);
    while(n > 1) {
        n = collatzNext(n);
        seq.push(n);
    }
    return seq;
}

function collatzNext(n) {
    if (n % 2 === 0) {
        return n / 2;
    } else {
        return 3 * n + 1;
    }
}