/*
Given the head to a singly linked list, where each node also has a “random” pointer that points to anywhere in the linked list, deep clone the list.
*/

var assert = require('assert');
var path = require('path');

describe(path.basename(__filename), () => {
  it('should clone', () => {
    let o1,o2,o3;
    o1 = {val: 'a', random: o1}
    o2 = {val: 'b', random: o1}
    o3 = {val: 'c', random: o2}
    let list = [o1,o2,o3];
    assert.deepStrictEqual(deepClone(list), list);
  });
});

function deepClone(list) {
  let clone = [];
  for (let node of list) {
    clone.push({val: node.val, random: node.random});
  }
  return clone;
}
