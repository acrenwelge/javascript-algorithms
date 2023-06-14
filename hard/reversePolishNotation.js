/*
 * Given an arithmetic expression in Reverse Polish Notation, write a program to evaluate it.

The expression is given as a list of numbers and operands. For example: [5, 3, '+'] should return 5 + 3 = 8.

For example, [15, 7, 1, 1, '+', '-', '/', 3, '*', 2, 1, 1, '+', '+', '-'] should return 5, since it is equivalent 
to ((15 / (7 - (1 + 1))) * 3) - (2 + (1 + 1)) = 5.

You can assume the given expression is always valid.
*/

var assert = require('assert');
var path = require('path');

describe(path.basename(__filename), () => {
  it('should pass default test 1', () => {
    const case1 = [5,3,'+'];
    assert.strictEqual(reversePolishNotation(case1), 8);
  })
  it('should pass default test 2', () => {
    const case2 = [15, 7, 1, 1, '+', '-', '/', 3, '*', 2, 1, 1, '+', '+', '-'];
    assert.strictEqual(reversePolishNotation(case2), 5);
  })
});

function reversePolishNotation(arr) {
  const operators = ['+', '-', '*', '/'];
  const stack = [];
  for (let a of arr) {
    if (operators.includes(a)) {
      const num1 = stack.pop();
      const num2 = stack.pop();
      const result = eval(`${num2} ${a} ${num1}`);
      stack.push(result);
    } else {
      stack.push(a);
    }
  }
  return stack.pop();
}
