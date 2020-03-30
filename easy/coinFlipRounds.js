/*
You have n fair coins and you flip them all at the same time. Any that come up tails you set aside. The ones that come up heads you flip again. How many rounds do you expect to play before only one coin remains?

Write a function that, given n, returns the number of rounds you'd expect to play until one coin remains.
*/

var assert = require('assert');
var path = require('path');

describe(path.basename(__filename), () => {
  it('round number tests', () => {
    assert.equal(numRounds(1),0);
    assert.equal(numRounds(2),1);
    assert.equal(numRounds(4),2);
  });

  it('not round number tests', () => {
    assert.equal(numRounds(3),2);
    assert.equal(numRounds(10),4);
  });
});

function numRounds(n) {
  // each round we expect half the coins to be set aside
  let coinsRemain = n;
  let rounds = 0;
  while (coinsRemain > 1) {
    coinsRemain /= 2;
    rounds++;
  }
  return rounds;
}
