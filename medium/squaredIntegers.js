/*
 * Given a positive integer n, find the smallest number of squared integers which sum to n.

For example, given n = 13, return 2 since 13 = 3^2 + 2^2 = 9 + 4.

Given n = 27, return 3 since 27 = 3^2 + 3^2 + 3^2 = 9 + 9 + 9.
*/

var assert = require('assert');
var path = require('path');
var logger = require('../util/logger');
logger.setLevel('ALL');

describe(path.basename(__filename), () => {
  it('recursive solution - should pass the default case', () => {
    assert.equal(findSmallestSquaredSumRecursive(13),2);
    assert.equal(findSmallestSquaredSumRecursive(27),3);
  });
});

function findSmallestSquaredSum(n) {
  // approach: count backwards from sqrt(n)
  // square each number and keep track of sum
  // keep looping until sum = n
  // in the worst case we would need to use 1^2 n times: 1^2 + 1^2 + 1^2... = n * (1^2) = n
  const startAt = Math.floor(Math.sqrt(n));
  let currentNum = startAt;
  let sum = 0;
  let count = 0;
  logger.debug(`n=${n}, starting at ${startAt}`);
  while (currentNum >= 1) {
    const squared = Math.pow(currentNum,2);
    logger.debug(`checking i=${currentNum}, i^2=${squared}`);
    logger.debug(`current sum is ${sum}`);
    if (sum + squared === n) {
      return count + 1;
    } else {
      sum += squared;
      count++;
      let diff = n - sum;
      while (diff > squared) {
        sum += squared;
        diff = n - sum;
        count++;
      }
    }
    currentNum--;
  }
  return count;
}

function findSmallestSquaredSumRecursive(n) {
  // base case: n<=3, ans = n (n=1=1^2; n=2=1^2+1^2; n=3=1^2+1^2+1^2)
  let ans = n;
  if (n<=3) {
    return ans;
  }
  for (let x=1; x <= n; x++) {
    let tmp = Math.pow(x,2);
    if (tmp > n) {
      break;
    } else {
      ans = Math.min(ans, 1+findSmallestSquaredSumRecursive(n-tmp));
    }
  }
  return ans;
}

// first attempt: 12 min
