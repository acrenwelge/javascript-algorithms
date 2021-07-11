/* Given a stack of N elements, interleave the first half of the stack with the second half reversed using only one other queue. This should be done in-place.

Recall that you can only push or pop from a stack, and enqueue or dequeue from a queue.

For example, if the stack is [1, 2, 3, 4, 5], it should become [1, 5, 2, 4, 3]. If the stack is [1, 2, 3, 4], it should become [1, 4, 2, 3].

Hint: Try working backwards from the end state.
*/

var assert = require('assert');
var path = require('path');

describe(path.basename(__filename), () => {
  it('should pass default test', () => {
    let stack = [1,2,3,4,5];
    assert.deepStrictEqual(interLeaveStack(stack), [1,5,2,4,3]);
    let stack2 = [1,2,3,4];
    assert.deepStrictEqual(interLeaveStack(stack2), [1,4,2,3]);
  })
});

function interLeaveStack(stack) {
  // push/pop operations on the stack
  // unshift/pop operations on the queue
  let queue = [];
  for (let i=0; i < Math.floor(stack.length / 2); i++) {
    queue.unshift(stack.pop());
  }
  for (let x=0; x < stack.length; x++) {
    if (x % 2 === 0) continue;
    if (queue.length > 0) {
      stack.splice(x,0,queue.pop());
    }
  }
  return stack;
}
