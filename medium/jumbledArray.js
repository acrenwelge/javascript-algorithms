/**
 * The sequence [0, 1, ..., N] has been jumbled, and the only clue you have for its order is an array representing 
 * whether each number is larger or smaller than the last. Given this information, reconstruct an array that is 
 * consistent with it. For example, given [None, +, +, -, +], you could return [1, 2, 3, 0, 4].
 */

 var assert = require('assert');
 var path = require('path');
 var logger = require('../util/logger');
 
 describe(path.basename(__filename), () => {
  it('should pass the default case', () => {
    const example = [null,true,true,false,true]; // true = +; false = -
    let newArr = reconstruct(example);
    for (let x=1; x < example.length; x++) {
      const prev = newArr[x-1];
      const curr = newArr[x];
      const isAbove = curr > prev ? true : false;
      assert.equal(example[x], isAbove);
    }
  });
  it('should pass the custom case', () => {
    const example = [null,false,false,false,true]; // true = +; false = -
    let newArr = reconstruct(example);
    for (let x=1; x < example.length; x++) {
      const prev = newArr[x-1];
      const curr = newArr[x];
      const isAbove = curr > prev ? true : false;
      assert.equal(example[x], isAbove);
    }
  });
  it('should pass the custom case', () => {
    const example = [null,true,true,true,true]; // true = +; false = -
    let newArr = reconstruct(example);
    for (let x=1; x < example.length; x++) {
      const prev = newArr[x-1];
      const curr = newArr[x];
      const isAbove = curr > prev ? true : false;
      assert.equal(example[x], isAbove);
    }
  });
  it('should pass the custom case', () => {
    const example = [null,false,false,false,false]; // true = +; false = -
    let newArr = reconstruct(example);
    for (let x=1; x < example.length; x++) {
      const prev = newArr[x-1];
      const curr = newArr[x];
      const isAbove = curr > prev ? true : false;
      assert.equal(example[x], isAbove);
    }
  });
 });

 function reconstruct(arr) {
  // add/subtract 1 starting from 0
  const N = arr.length;
  let incr = 0;
  let decr = 0;
  let ans = [0];
  for (i=1; i < N; i++) {
    if (arr[i]) {
      ans.push(incr + 1);
      incr++;
    } else {
      ans.push(decr - 1);
      decr--;
    }
  }
  return ans.map(x => x - decr);
 }