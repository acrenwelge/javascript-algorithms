/*
 * Given a 2-D matrix representing an image, a location of a pixel in the screen and a color C, replace the color of the given pixel and all adjacent same colored pixels with C.

For example, given the following matrix, and location pixel of (2, 2), and 'G' for green:

B B W
W W W
W W W
B B B
Becomes

B B G
G G G
G G G
B B B
*/

var assert = require('assert');
var path = require('path');
var logger = require('../util/logger');

describe(path.basename(__filename), () => {
  it('should pass the default case', () => {
    let matrix = [
      ['B','B','W'],
      ['W','W','W'],
      ['W','W','W'],
      ['B','B','B']];
    let color = 'G';
    let loc = [2,2];
    assert.deepStrictEqual(replace(matrix,loc,color), [
      ['B','B','G'],
      ['G','G','G'],
      ['G','G','G'],
      ['B','B','B']
    ]);
  })
})

function replace(matrix, loc, color) {
  let replColor = matrix[loc[0]][loc[1]];
  logger.setLevel('ALL');
  let rlvl = 0;
  function recurse(matrix, loc) {
    if (rlvl++ > 1000) {
      logger.error('too many recursions - aborting');
      process.abort();
    }
    let row = loc[0];
    let col = loc[1];
    logger.debug(`row: ${row}, col: ${col}`);
    // replace this cell
    matrix[row][col] = color;
    // check left, up, right, and down
    if (row-1 >= 0 && matrix[row-1][col] == replColor) {
      recurse(matrix, [row-1,col], color);
    }
    if (col-1 >= 0 && matrix[row][col-1] == replColor) {
      recurse(matrix, [row,col-1], color);
    }
    if (row+1 < matrix.length && matrix[row+1][col] == color) {
      recurse(matrix, [row+1,col], color);
    }
    if (col+1 < matrix[row].length && matrix[row][col+1] == color) {
      recurse(matrix, [row,col+1], color);
    }
  }
  recurse(matrix, loc, color);
  return matrix;
}
