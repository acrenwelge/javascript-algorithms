/*
Given an array of numbers representing the stock prices of a company in chronological order and an integer k, return the maximum profit you can make from k buys and sells. You must buy the stock before you can sell it, and you must sell the stock before you can buy it again.

For example, given k = 2 and the array [5, 2, 4, 0, 1], you should return 3.
*/

var assert = require('assert');
var path = require('path');
var logger = require('../util/logger');

describe(path.basename(__filename), () => {
  it('should solve trivial case', () => {
    assert.equal(maxProfitForK1([5,2,4,0,1]),2);
  });
  it('should pass default case', () => {
    assert.equal(maxProfit([5,2,4,0,1],2),3);
  });
  it('should pass custom case', () => {
    assert.equal(maxProfit([1,4,9,5,3,7,1,2],2),12);
  });
});

function maxProfit(prices, k) {
  // let profit(k,i) represent the max profit possible by ith day
  // it is the max of
  // - (1) selling the stock bought on jth day on the ith day or
  // - (2) not selling on ith day. Thus:
  // profit(k,i) = max(profit(k,i-1), max(price[i] – price[j] + profit(k-1,j))
  // for all j in range [0, i-1]                                       ^ max profit on day j with 1 less transaction
  function forDate(k, i) {
    if (k == 0) return 0; // base case - no profit if we can't buy/sell anymore
    let sold = 0;
    for (let j = 0; j < i; j++) {
      let val = prices[i] - prices[j] + forDate(k-1,j);
      if (val > sold) {
        sold = val; // max from selling
      }
    }
    let notSold = 0; // base case (i=0) - no earlier dates we could have bought
    if (i > 0) {
      notSold = forDate(k, i-1); // defer to prev day profit
    }
    return Math.max(sold, notSold);
  }
  return forDate(k, prices.length-1);
}

function wrongMaxProfit(prices, k) {
  // so the problem we need to solve is finding the k largest increases
  // one approach is for each price, compute the difference between it and all later prices and take the max
  // which gives the answer for k=1
  // expanding this to arbitrary k, for each price diff > 0, we find all subsequent price increases and take the highest k

  let profits = []; // to contain all profits possible (data about when we buy and sell)
  for (let i=0; i < prices.length; i++) {
    let buy = prices[i];
    for (let j=i; j < prices.length; j++) {
      let sell = prices[j];
      if (sell - buy > 0) {
        profits.push({buy: i, sell: j});
      }
    }
  }
  logger.debug(profits);
  // now the problem is to find the highest valid combination of k profit objects (valid = sell before buying again)
  // there is some ambiguity in the question (does it mean # buys/sells can be UP TO k or STRICTLY k? we assume strictly k here)
  // we can create an array which contains nested arrays each representing k valid, unique transactions
  // then we simply compute the total profit of each and take the max
  let validTrx = [];
  if (profits.length == k) {
    validTrx.push(profits);
  } else {
    for (let i=0; i < profits.length - k; i++) {
      let transactions = [];
      transactions.push(profits[i]);
      for (let j=1; j < k; j++) {
        if (profits[i+j].buy > profits[i+j-1].sell) { // validate the sequence of transactions (sell before buy again)
          transactions.push(profits[i+j]);
        }
      }
      validTrx.push(transactions);
    }
  }
  logger.debug(validTrx);
  return validTrx
    .map(series =>
      series.map(trx => prices[trx.sell] - prices[trx.buy]) // map each sequence of transactions to its profit
            .reduce((a,c) => a + c))
    .reduce((acc, curr) => Math.max(acc, curr)); // take the max profit
}

function maxProfitForK1(prices) {
  let maxProfit = 0;
  for (let i=0; i < prices.length; i++) {
    let buy = prices[i];
    for (let j=i; j < prices.length; j++) {
      let sell = prices[j];
      if (sell - buy > maxProfit) {
        maxProfit = sell - buy;
      }
    }
  }
  return maxProfit;
}
