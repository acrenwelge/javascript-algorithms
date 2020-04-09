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
var path = require('path');
var logger = require('../util/logger');

describe(path.basename(__filename), () => {
  it('should pass default test', () => {
    let bst = {val: 10};
    bst.left = {val: 5, parentRef: bst};
    bst.right = {val: 30, parentRef: bst, left: {val: 22}, right: {val: 35}};
    bst.right.left.parentRef = bst.right;
    bst.right.right.parentRef = bst.right;
    assert.equal(getNextBiggest(bst.right.left), 30);
  });
  it('should pass custom test', () => {
  /*
      4
     / \
    2   5
   / \
  1   3
  */
    let bst = {val: 4};
    bst.left = {val: 2, parentRef: bst};
    bst.right = {val: 5, parentRef: bst};
    bst.left.left = {val: 1, parentRef: bst.left};
    bst.left.right = {val: 3, parentRef: bst.left};
    assert.equal(getNextBiggest(bst.left), 3);
  });
});

function getNextBiggest(node) {
  let downMax = node.val;
  let upMax = node.val;
  if (node.right) {
    downMax = lookDown(node, node.val, Number.MAX_VALUE, false);
  }
  if (node.parentRef) {
    upMax = lookUp(node, node.val, Number.MAX_VALUE);
  }
  logger.debug(`down: ${downMax}, up: ${upMax}`);
  if (downMax == node.val) {
    downMax = Number.MAX_VALUE; // don't choose it b/c must be GREATER than initial value
  } else if (upMax == node.val) {
    upMax = Number.MAX_VALUE;
  } else if (downMax == node.val && upMax == node.val) { // didn't find a bigger value
    return null;
  }
  return Math.min(downMax, upMax);
}

// alternate looking at right and left children
function lookDown(node, min, nextBig, isLeft) {
  let compare = isLeft ? node.left : node.right;
  if (compare) {
    if (compare.val < nextBig && compare.val > min) nextBig = compare.val;
    return lookDown(compare, min, nextBig, !isLeft);
  } else {
    return nextBig;
  }
}

function lookUp(node, min, nextBig) {
  if (node.parentRef) {
    if (node.parentRef.val < nextBig && node.parentRef.val > min) {
      nextBig = node.parentRef.val;
    }
    return lookUp(node.parentRef, min, nextBig);
  } else {
    return nextBig;
  }
}
