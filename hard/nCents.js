/*
Find the minimum number of coins required to make n cents.

You can use standard American denominations, that is, 1¢, 5¢, 10¢, and 25¢.

For example, given n = 16, return 3 since we can make it with a 10¢, a 5¢, and a 1¢.
*/

var assert = require('assert');

describe(__filename, () => {
  it('should pass the default case of n=16 returns 3', () => {
    assert.equal(minCoins(16), 3);
  });
  it('should pass the custom case of n=99 returns 9', () => {
    // 3 quarters, 2 dimes, 4 cents => 9
    assert.equal(minCoins(99), 9);
  });
});

function minCoins(n) {
  // try to make the total starting with highest value coins
  let outstanding = n;
  let coins = [25,10,5,1];
  let min = 0;
  for (let x=0; x < coins.length; x++) {
    let coin = coins[x];
    while (coin <= outstanding) {
      console.debug(`using ${coin} cents`);
      min++;
      outstanding -= coin;
    }
  }
  return min;
}
