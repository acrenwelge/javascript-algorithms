/**
 * MegaCorp wants to give bonuses to its employees based on how many lines of codes they have written.
 * They would like to give the smallest positive amount to each worker consistent with the constraint that if a 
 * developer has written more lines of code than their neighbor, they should receive more money.
 * Given an array representing a line of seats of employees at MegaCorp, determine how much each one should get paid.
 * For example, given [10, 40, 200, 1000, 60, 30], you should return [1, 2, 3, 4, 2, 1].
 */

var assert = require('assert');
var path = require('path');

describe(path.basename(__filename), () => {
  it('should return the correct bonuses', () => {
    assert.deepEqual(getBonuses([10, 40, 200, 1000, 60, 30]), [1, 2, 3, 4, 2, 1]);
  });
});

function getBonuses(employees) {
  const bonuses = [];
  for (let i = 0; i < employees.length; i++) {
    bonuses.push(1);
  }
  let left = 0;
  let right = 1;
  while (right < employees.length) {
    if (employees[right] > employees[left]) {
      bonuses[right] = bonuses[left] + 1;
    }
    left++;
    right++;
  }
  left = employees.length - 1;
  right = employees.length - 2;
  while (right >= 0) {
    if (employees[right] > employees[left]) {
      bonuses[right] = Math.max(bonuses[right], bonuses[left] + 1);
    }
    left--;
    right--;
  }
  return bonuses;
}