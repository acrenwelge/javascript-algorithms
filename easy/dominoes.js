/**
 * You are given an string representing the initial conditions of some dominoes. Each element can take one of three values:

L, meaning the domino has just been pushed to the left,
R, meaning the domino has just been pushed to the right, or
., meaning the domino is standing still.
Determine the orientation of each tile when the dominoes stop falling. Note that if a domino receives a force 
from the left and right side simultaneously, it will remain upright.

For example, given the string .L.R....L, you should return LL.RRRLLL.

Given the string ..R...L.L, you should return ..RR.LLLL.
 */

var assert = require('assert');
var path = require('path');

describe(path.basename(__filename), () => {
  it('should pass case 1', () => {
    assert.strictEqual(getOrientation('.L.R....L'), 'LL.RRRLLL');
  });
  it('should pass case 2', () => {
    assert.strictEqual(getOrientation('..R...L.L'), '..RR.LLLL');
  });
});

function getOrientation(dominoes) {
  let l=0, r=1;
  const arr = ("L"+dominoes+"R").split("");
  while(l<arr.length-1){
      while(arr[r]=='.') 
          r++;
      if(arr[l]==arr[r]) 
          for(let i=l+1; i<r; i++) 
              arr[i]=arr[l];
      if(arr[l]>arr[r]) 
          for(let i=1; i<=(r-l-1)/2; i++){
              arr[l+i] = 'R';
              arr[r-i] = 'L';
          }   
      l=r++;
  }
  return arr.slice(1,arr.length-1).join("");
}