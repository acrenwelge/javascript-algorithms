/*
Given a binary tree, find a minimum path sum from root to a leaf.

For example, the minimum path in this tree is [10, 5, 1, -1], which has sum 15.

  10
 /  \
5    5
 \     \
   2    1
       /
     -1
*/

var assert = require('assert');
var BinaryTree = require('../util/datastructures').BinaryTree;
var Node = require('../util/datastructures').BTNode;
var path = require('path');
var logger = require('../util/logger');

describe(path.basename(__filename), () => {
  it('should pass default test', () => {
    let tree = new BinaryTree(
      new Node(null, new Node(null,null,2),5),
      new Node(null, new Node(new Node(null,null,-1),null,1), 5),
      10);
    assert.equal(findMinPath(tree), 15);
  });
});

function findMinPath(tree) {
  // try every path and return the minimum using depth-first search
  // we can store the cumulative sum at each node
  function recurse(node, sum) {
    if (!node) return sum;
    logger.debug(`at node ${node.val}, sum is ${sum}`);
    let newSum = node.val + sum;
    logger.debug(`newSum: ${newSum}`);
    if (!node.left && !node.right) {
      return newSum;
    } else if (!node.left && node.right) {
      return recurse(node.right, newSum);
    } else if (node.left && !node.right) {
      return recurse(node.left, newSum);
    } else {
      let leftMin = recurse(node.left, newSum);
      let rightMin = recurse(node.right, newSum);
      return Math.min(leftMin, rightMin);
    }
  }
  let root = tree.getRoot();
  let leftMin = recurse(root.left, root.val);
  let rightMin = recurse(root.right, root.val);
  logger.debug(`left: ${leftMin}; right: ${rightMin}`);
  return Math.min(leftMin, rightMin);
}
