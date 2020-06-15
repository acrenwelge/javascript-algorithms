/*
 * Given an N by N matrix, rotate it by 90 degrees clockwise.

For example, given the following matrix:

[[1, 2, 3],
 [4, 5, 6],
 [7, 8, 9]]
you should return:

[[7, 4, 1],
 [8, 5, 2],
 [9, 6, 3]]
Follow-up: What if you couldn't use any extra space?
*/

var assert = require('assert');
var path = require('path');
var logger = require('../util/logger');

describe(path.basename(__filename), () => {
  it('should pass the default case', () => {
    const matrix = [
      [1,2,3],
      [4,5,6],
      [7,8,9]];
    assert.deepStrictEqual(rotate(matrix), [
      [7,4,1],
      [8,5,2],
      [9,6,3]
    ]);
  });
  it('should pass the custom case', () => {
    const matrix = [
      [2,4],
      [3,6]
    ];
    assert.deepStrictEqual(rotate(matrix), [
      [3,2],
      [6,4]
    ])
  })
})

function rotate(matrix) {
  const rows = matrix.length;
  let newMatrix = [];
  for (let i=0; i < rows; i++) {
    newMatrix.push(Array(rows).fill(null));
  }
  for (let i=0; i < rows; i++) {
    for (let j=0; j < matrix[i].length; j++) {
      newMatrix[j][rows-i-1] = matrix[i][j];
    }
  }
  return newMatrix
}
