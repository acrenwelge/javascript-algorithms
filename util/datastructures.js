var assert = require('assert');

class BTNode {
  left;
  right;
  val;

  constructor(left, right, val) {
    this.left = left;
    this.right = right;
    this.val = val;
  }

  getLeft() {
    return this.left;
  }

  getRight() {
    return this.right;
  }
}

class BinaryTree {
  root;

  getRoot() {
    return this.root;
  }

  constructor(left, right, val) {
    this.root = new BTNode(left,right,val);
  }
}

class LLNode {
  constructor(next, val) {
    this.next = next;
    this.val = val;
  }
}

class LinkedList {
  start;

  getNext() {
    return this.next;
  }

  get(idx) {
    let node = this.start;
    for (let i=0; i <= idx; i++) {
      if (i === idx) {
        if (node) {
          return node.val;
        } else return null;
      }
      if (node.next) {
        node = node.next;
      } else {
        return null;
      }
    }
  }

  add(val) {
    let currNode = this.start;
    if (!currNode) {
      this.start = new LLNode(null, val);
      return;
    }
    while (currNode.next != null) {
      currNode = currNode.next;
    }
    currNode.next = new LLNode(null, val);
  }

  constructor(val) {
    if (Array.isArray(val)) {
      this.start = this.constructNode(0, val);
    } else if (val) {
      this.start = new LLNode(null, val);
    } else {
      this.start = null;
    }
  }

  constructNode(i, arr) {
    if (i < arr.length) {
      let next = this.constructNode(i+1,arr);
      return new LLNode(next, arr[i]);
    } else {
      return null;
    }
  }
}

module.exports = {
  BinaryTree,
  BTNode,
  LinkedList,
}

describe('LinkedList', () => {
  it('should set and retrieve values', () => {
    let ll = new LinkedList();
    ll.add('hello');
    assert.equal(ll.get(0),'hello');
  });
  it('should initialize when pased array', () => {
    let ll = new LinkedList([5,8,6,2]);
    assert.equal(ll.get(1),8);
  });
  it('should initialize single value', () => {
    let ll = new LinkedList('hola');
    assert.equal(ll.get(0), 'hola');
  });
});
