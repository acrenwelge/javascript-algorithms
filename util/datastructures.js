class BinaryTree {
  constructor(left, right, val) {
    this.left = left;
    this.right = right;
    this.val = val;
  }
}

class Node {
  constructor(next, val) {
    this.next = next;
    this.val = val;
  }
}

class LinkedList {
  getNext() {
    return this.next;
  }

  constructor(arr) {
    this.start = constructNode(0, arr);
  }

  constructNode(i, arr) {
    if (i < arr.length) {
      let next = constructNode(i+1,arr);
      return new Node(next, arr[i]);
    } else {
      return null;
    }
  }
}

module.exports = {
  BinaryTree: BinaryTree,
  LinkedList: LinkedList
}
