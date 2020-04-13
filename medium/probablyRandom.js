/*
 * You are given n numbers as well as n probabilities that sum up to 1. Write a function to generate one of the numbers with its corresponding probability.

For example, given the numbers [1, 2, 3, 4] and probabilities [0.1, 0.5, 0.2, 0.2], your function should return 1 10% of the time, 2 50% of the time, and 3 and 4 20% of the time.

You can generate random numbers between 0 and 1 uniformly.
*/

var assert = require('assert');
var path = require('path');

describe(path.basename(__filename), () => {
  it('should pass the default case', () => {
    // to test, I'll run the function 10k times and count how many of each I get
    let nums = [1,2,3,4];
    let probs = [0.1,0.5,0.2,0.2];
    let counts = {};
    let i=0;
    while (i<10000) {
      let ans = getGeneratedNum(nums,probs);
      counts[ans]++;
      i++;
    }
    if (counts[1] < 500 || counts[1] > 1500) {
      assert.fail('1 out of probability range');
    }
    if (counts[2] < 4000 || counts[2] > 6000) {
      assert.fail('2 out of probability range');
    }
    if (counts[3] < 1500 || counts[3] > 2500) {
      assert.fail('3 out of probability range');
    }
    if (counts[4] < 1500 || counts[4] > 2500) {
      assert.fail('4 out of probability range');
    }
  });
  it('should pass a custom case', () => {
    let nums = [5, 20, 30];
    let probs = [0.05, 0.2, 0.75];
    let counts = {};
    let i=0;
    while (i<10000) {
      let ans = getGeneratedNum(nums,probs);
      counts[ans]++;
      i++;
    }
    if (counts[5] < 400 || counts[1] > 600) {
      assert.fail('5 out of probability range');
    }
    if (counts[20] < 1500 || counts[4] > 2500) {
      assert.fail('20 out of probability range');
    }
    if (counts[30] < 7000 || counts[2] > 8000) {
      assert.fail('30 out of probability range');
    }
  });
})

function getGeneratedNum(nums, probs) {
  // approach: iterate through nums and probs and track cumulative probability
  let rangeStart = 0;
  let rangeEnd = probs[0];
  let rand = Math.random();
  for (let i=0; i < nums.length; i++) {
    if (rand > rangeStart && rand < rangeEnd) {
      return nums[i];
    }
    rangeStart = rangeEnd;
    rangeEnd = i+1 === nums.length ? 1 : rangeEnd + probs[i+1];
  }
}
