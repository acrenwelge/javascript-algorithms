/*
 * Given a binary tree where all nodes are either 0 or 1, prune the tree so that subtrees containing all 0s are removed.

For example, given the following tree:

   0
  / \
 1   0
    / \
   1   0
  / \
 0   0
should be pruned to:

   0
  / \
 1   0
    /
   1
We do not remove the tree at the root or its left child because it still has a 1 as a descendant.
*/

var assert = require('assert');
var path = require('path');
var logger = require('../util/logger');

describe(path.basename(__filename), () => {
  it('should prune 0s from default case tree', () => {
    let tree = {v: 0,
      l: {v: 1},
      r: {v:0,
        l:{v:1,
          l:{v:0},
          r:{v:0}},
        r:{v:0}}};
    let result = {
      v:0,
      l:{v:1},
      r:{v:0,
        l:{v:1}}};
    logger.debug(pruneZeros(tree));
    logger.debug(result);
    assert.deepStrictEqual(pruneZeros(tree), result);
  });
  it('should pass custom case', () => {
    let tree = {v: 0,
      l: {v: 1},
      r: {v:0,
        l:{v:0,
          l:{v:0},
          r:{v:0}},
        r:{v:0}}};
    let result = {
      v:0,
      l:{v:1}};
    logger.debug(pruneZeros(tree));
    logger.debug(result);
    assert.deepStrictEqual(pruneZeros(tree), result);
  })
});

function pruneZeros(tree) {
  // use recursion: go down each side of tree
  // if either side is a zero tree, remove it
  // if both are zero trees, remove the current tree
  // base case: both sides are null (just check value of node)
  function shouldPrune(tree) {
    if (!tree.l && !tree.r) {
      if (tree.v === 0) {
        return true;
      } else if (tree.v === 1) {
        return false;
      }
    } else if (tree.l && !tree.r) {
      let pruneLeft = shouldPrune(tree.l);
      if (pruneLeft) {
        delete tree.l;
      }
      return tree.v === 0 && pruneLeft;
    } else if (tree.r && !tree.l) {
      let pruneRight = shouldPrune(tree.r);
      if (pruneRight) {
        delete tree.r;
      }
      return tree.v === 0 && pruneRight;
    } else {
      let leftAreZeros = shouldPrune(tree.l);
      let rightAreZeros = shouldPrune(tree.r);
      if (leftAreZeros) {
        delete tree.l;
      }
      if (rightAreZeros) {
        delete tree.r;
      }
      return tree.v === 0 && leftAreZeros && rightAreZeros;
    }
  }
  let pruneAll = shouldPrune(tree);
  if (pruneAll) {
    return {};
  } else {
    return tree;
  }
}
