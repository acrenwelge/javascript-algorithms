/*
Given an N by M matrix consisting only of 1's and 0's, find the largest rectangle containing only 1's and return its area.

For example, given the following matrix:

[[1, 0, 0, 0],
 [1, 0, 1, 1],
 [1, 0, 1, 1],
 [0, 1, 0, 0]]
Return 4.
*/

var assert = require('assert');
var path = require('path');
var logger = require('../util/logger');

describe(path.basename(__filename), () => {
  it('should pass default test', () => {
    let mat = [[1,0,0,0],
               [1,0,1,1],
               [1,0,1,1],
               [0,1,0,0]];
    assert.equal(getLargestRect(mat),4);
  });
  it('should pass custom test', () => {
    let mat = [[0,1,1,0,0,1],
               [1,1,1,1,0,1],
               [0,1,1,1,1,0],
               [1,1,1,0,0,1],
               [1,0,1,0,1,0]];
    assert.equal(getLargestRect(mat),8);
  });
});

function getLargestRect(matrix) {
  // transform 2d matrix to 1d histogram by collapsing (summing) the rows
  // then find max area under the histogram at each "layer" while collapsing
  function maxAreaHistogram(hist) {
    // naive solution - O(n^2) to search through histogram at each block
    logger.debug(`histo: ${histogram}`);
    let max = 0;
    for (let x=0; x < hist.length; x++) {
      let val = hist[x];
      let y = x-1;
      let width = 1;
      while(y >= 0) {
        if (hist[y] < val) break;
        width++;
        y--;
      }
      y = x+1; // reset
      while(y < hist.length) {
        if (hist[y] < val) break;
        width++;
        y++;
      }
      let area = val * width;
      max = Math.max(area, max);
    }
    logger.debug(`histo max: ${max}`);
    return max;
  }
  let histogram = Array(matrix[0].length).fill(0);
  let maxArea = 0;
  for (let row=0; row < matrix.length; row++) {
    for (let col=0; col < matrix[row].length; col++) {
      if (matrix[row][col] == 0) {
        histogram[col] = 0;
      } else {
        histogram[col] += matrix[row][col];
      }
    }
    maxArea = Math.max(maxArea, maxAreaHistogram(histogram));
    logger.debug(`matrix max: ${maxArea}`);
  }
  return maxArea;
}

function firstAttempt(matrix) {
  // we can search through the matrix from the top left
  // we store coordinates we've already seen in a set
  let points = new Set(); // all 1 cells we've seen already
  let solution = {area: 0};
  function explore(row,col) {
    let startCol = col;
    let startRow = row;
    let tmp = {topLeft: [row,col]};
    let incrRow = true;
    while(row < matrix.length-1 && col < matrix[row].length-1) {
      if(incrRow) { // look down by a row
        for (let tmpCol = startCol; tmpCol <= col; tmpCol++) {
          if (matrix[row][col] == 1) {
          }
        }
        row++;
      } else {
        col++;
      }
      incrRow = !incrRow;
    }
    tmp.area = (tmp.botRight[0]-tmp.topLeft[0]) * (tmp.botRight[1]-tmp.topLeft[1]);
    if (tmp.area > solution.area) {
      solution = tmp;
    }
  }
  for(let row=0; row<matrix.length; row++) {
    for(let col=0; col<matrix[row].length; col++){
      if (!points.has([row,col]) && matrix[row][col] == 1) {
        explore(row,col);
      }
    }
  }
}
