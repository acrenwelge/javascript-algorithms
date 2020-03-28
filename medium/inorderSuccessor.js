/*
Given a node in a binary search tree, return the next bigger element, also known as the inorder successor.

For example, the inorder successor of 22 is 30.

   10
  /  \
 5    30
     /  \
   22    35
You can assume each node has a parent pointer.
*/

var BinaryTree = require('../util/datastructures').BinaryTree;
var assert = require('assert');

describe('Inorder successor', () => {
  it('should pass default test', () => {
    assert.equal(getNextBiggest(22), 30);
  });
});

function getNextBiggest(node) {
  return 0;
}
