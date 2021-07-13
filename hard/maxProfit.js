/** Given a array of numbers representing the stock prices of a company in chronological order, write a function that calculates the maximum profit you could have made from buying and selling that stock. You're also given a number fee that represents a transaction fee for each buy and sell transaction.

You must buy before you can sell the stock, but you can make as many transactions as you like.

For example, given [1, 3, 2, 8, 4, 10] and fee = 2, you should return 9, since you could buy the stock at 1 dollar, and sell at 8 dollars, and then buy it at 4 dollars and sell it at 10 dollars. Since we did two transactions, there is a 4 dollar fee, so we have 7 + 6 = 13 profit minus 4 dollars of fees.
 */

var assert = require('assert');
var path = require('path');
var logger = require('../util/logger');

describe(path.basename(__filename), () => {
    it('should pass the default case', () => {
        const prices = [1,3,2,8,4,10];
        const fee = 2;
        assert.strictEqual(maxProfit(prices,fee), 9);
    });
    it('should return 0 when fee is too high', () => {
        const prices = [1,3,2,5,4,6];
        const fee = 6;
        assert.strictEqual(maxProfit(prices,fee), 0);
    });
    it('should return 0 when there is no profit to be made', () => {
        const prices = [9,7,4,2,1];
        const fee = 0;
        assert.strictEqual(maxProfit(prices,fee), 0);
    });
    it('should pass the custom case', () => {
        const prices = [2,9,3,7,1,1];
        const fee = 1;
        assert.strictEqual(maxProfit(prices,fee), 9);
    });
    it('should pass another custom case', () => {
        const prices = [1,2,12,6,1,7,10];
        const fee = 2;
        assert.strictEqual(maxProfit(prices,fee), 16);
    });
});

function maxProfit(allPrices, fee) {
    /* Approach: choice to buy (or sell) at each price. Consider both possibilities
    - first, must buy before can sell
    - only consider a sell if you actually make a profit
    - keep track of current profit, including transaction fees
    */
   function localMax(prices, localState) {
    const priceNow = prices[0];
    if (prices.length === 1) { // on the last price
        if (localState.boughtAt === null) { // can't sell - nothing to sell
            return localState.currentProfit;
        } else { // required to sell regardless of price
            return localState.currentProfit + (priceNow - localState.boughtAt - fee);
        }
    }
    let nextPrices = prices.slice(1,prices.length);
    if (localState.boughtAt === null) { // consider to buy or not
        let notBuy = localMax(nextPrices, localState);
        let buy = localMax(nextPrices, {boughtAt: priceNow, currentProfit: localState.currentProfit});
        logger.debug(`buy: ${buy}; notbuy: ${notBuy}`);
        return (notBuy > buy ? notBuy : buy);
    } else { // consider to sell or not
        const profitOrLoss = (priceNow - localState.boughtAt - fee);
        let sold = localMax(nextPrices, {boughtAt: null, currentProfit: localState.currentProfit + profitOrLoss});
        let notSold = localMax(nextPrices, localState);
        logger.debug(`sold: ${sold}; notsold: ${notSold}`);
        return (sold > notSold ? sold : notSold);
    }
   }
   return localMax(allPrices, {boughtAt: null, currentProfit: 0});
}