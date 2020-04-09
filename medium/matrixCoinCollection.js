/**
You are given a 2-d matrix where each cell represents number of coins in that cell.
Assuming we start at matrix[0][0], and can only move right or down, find the maximum
number of coins you can collect by the bottom right corner.

For example, in this matrix

0 3 1 1
2 0 0 4
1 5 3 1
The most we can collect is 0 + 2 + 1 + 5 + 3 + 1 = 12 coins.
*/

var assert = require('assert');
var path = require('path');

describe(path.basename(__filename), () => {
  it('should pass the default case', function() {
    // let solutions = getCoins([[0,3,1,1],[2,0,0,4],[1,5,3,1]])
    // assert.equal(Math.max(...solutions),12);
    assert.equal(getMaxCoins([[0,3,1,1],[2,0,0,4],[1,5,3,1]]), 12);
  });
});

function getMaxCoins(matrix) {
  // recursive formula (assuming row, col != 0):
  // max(row,col) = max(max(row-1,col),max(row,col-1))
  // we work backwards from bottom right and compare the choices
  // we recursively make all moves and return
  function recurse(row, col, sum) {
    let cellVal = matrix[row][col];
    if (row == 0 && col == 0) {
      return sum + cellVal;
    } else if (row == 0) {
      return recurse(row, col-1, sum + cellVal);
    } else if (col == 0) {
      return recurse(row-1, col, sum + cellVal);
    } else {
      let rMax = recurse(row-1, col, sum + cellVal);
      let cMax = recurse(row, col-1, sum + cellVal);
      return Math.max(rMax, cMax);
    }
  }
  return recurse(matrix.length-1, matrix[0].length-1, 0);
}
