/*
The ancient Egyptians used to express fractions as a sum of several terms where each numerator is one. For example, 4 / 13 can be represented as 1 / 4 + 1 / 18 + 1 / 468.

Create an algorithm to turn an ordinary fraction a / b, where a < b, into an Egyptian fraction.
*/

var assert = require('assert');
var path = require('path');

describe(path.basename(__filename), () => {
  it('should pass the base case', () => {
    assert.deepStrictEqual(egyptize(4,13),[4,18,468]);
  });
});

function egyptize(a,b) {
  // returns an array where each element is the denominator of the fraction to be summed
  // ideas:
  // - cannot do the division, will lose the precision
  // - sample: 4/13 = 144/468 = 1/4+1/18+1/468
  // - starting from 2, increment until fraction is less
  let denom = 2;
  let residual = a/b;
  let solution = [];
  while(residual > Math.pow(10,-9)) {
    if (1/denom > residual) {
      denom++;
    } else {
      console.log('found denom='+denom);
      solution.push(denom);
      residual -= 1/denom;
      console.log('remaining residual = '+residual);
    }
  }
  return solution;
//  const val = solution.reduce((p,c) => {p+1/c},0);
//  if (val < a/b) {
    // continue
//  }
}
