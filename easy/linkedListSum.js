/*
Let's represent an integer in a linked list format by having each node represent a digit in the number. The nodes make up the number in reversed order.

For example, the following linked list:

1 -> 2 -> 3 -> 4 -> 5
is the number 54321.

Given two linked lists in this format, return their sum in the same linked list format.

For example, given

9 -> 9
5 -> 2
return 124 (99 + 25) as:

4 -> 2 -> 1
*/

var assert = require('assert');
var LinkedList = require('../util/datastructures').LinkedList;

describe(__filename, function() {
  it('should pass default test', () => {
    let first = new LinkedList([9,9]);
    let second = new LinkedList([5,2]);
    console.log('asserting...');
    assert.deepStrictEqual(new LinkedList([4,2,1]), sumTheLists(first,second));
  });
});

function sumTheLists(firstList, secList) {
  // traverse each list and add digits at each node
  // keep track of remainder and add it at the next nodes
  let i = 0;
  let sum = new LinkedList(null);
  let tens = 0;
  while(firstList.get(i)) {
    console.debug(`on loop #${i}`);
    let num1 = firstList.get(i);
    let num2 = secList.get(i);
    console.debug(`num1: ${num1}, num2: ${num2}`);
    let remain = (num1 + num2 + tens) % 10;
    sum.add(remain);
    tens = Math.floor((num1 + num2) / 10);
    console.debug(`tens: ${tens}, remain: ${remain}`);
    i++;
  }
  if (tens != 0) {
    sum.add(tens);
  }
  return sum;
}
