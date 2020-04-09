/*
 * Given an array of numbers and an index i, return the index of the nearest larger number of the number at index i, where distance is measured in array indices.

For example, given [4, 1, 3, 5, 6] and index 0, you should return 3.

If two distances to larger numbers are the equal, then return any one of them. If the array at i doesn't have a nearest larger integer, then return null.

Follow-up: If you can preprocess the array, can you do this in constant time?
*/

var assert = require('assert');
var path = require('path');

describe(path.basename(__filename), () => {
  it('should pass default case', () => {
    let arr = [4,1,3,5,6];
    assert.equal(findNextLargestIdx(arr,0),3);
  })
  it('should return null for no larger values', () => {
    let arr = [4,9,3,5,6];
    assert.equal(findNextLargestIdx(arr,1),null);
  })
  it('should look in both directions', () => {
    let arr = [5,9,2,4,1,8,5];
    let result = findNextLargestIdx(arr,3);
    assert(result === 0 || result === 6);
    assert.equal(findNextLargestIdx(arr,4),2);
  })
  it('should return index of minimum distance', () => {
    let arr = [4,0,0,1,0,0,0,4];
    assert(findNextLargestIdx(arr,3) === 0);
  })
  it('preprocessed array case in constant time', () => {
    let arr = [1,2,3,4,5];
    assert.equal(findNextLargestIdx(arr,1),2);
  })
})

function findNextLargestIdx(arr, idx) {
  // first idea: start at idx and iterate through
  // keep track of #s higher than arr[idx]
  // if the next one is less than prev (while still higher than orig) then replace it
  // when finished, the number that remains is the answer
  //
  // next idea: instead of keeping track of number, keep track of array index it occurs at!
  //
  // also: no need for 2 separate for loops, just iterate through all and compare distances each time
  const orig = arr[idx];
  let foundOne = false;
  let nearestLargestIdx = arr.length-1;
  for (let i=0; i < arr.length; i++) {
    if (arr[i] > orig) {
      foundOne = true;
      if (arr[i] < arr[nearestLargestIdx]) {
        nearestLargestIdx = i;
      } else if (arr[i] === arr[nearestLargestIdx]) {
        let lastDist = Math.abs(idx-nearestLargestIdx);
        let currDist = Math.abs(idx - i);
        nearestLargestIdx = currDist < lastDist ? i : nearestLargestIdx;
      }
    }
  }
  if (!foundOne) {
    return null;
  }
  return nearestLargestIdx;
}

function withPreprocessing(arr, idx) {
  // if we assume array is sorted we can improve from O(n) to O(1)
  // since it is sorted we know the next highest must be arr[idx+1]
  // so just return that!
  if (idx < arr.length-1 && idx >=0 ) {
    return idx+1;
  } else {
    return null;
  }
}
