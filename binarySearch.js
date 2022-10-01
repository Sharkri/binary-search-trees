function Node(data, leftNode = null, rightNode = null) {
  return { data, leftNode, rightNode };
}

class Tree {
  constructor(array) {
    if (!Array.isArray(array)) this.array = [];
    else this.array = [...new Set(array)];
    this.root = this.buildTree(this.array, 0, this.array.length - 1);
  }

  buildTree(array, start, end) {
    if (start > end) return null;
    const mid = Math.floor((start + end) / 2);
    const node = Node(array[mid]);
    node.leftNode = this.buildTree(array, start, mid - 1);
    node.rightNode = this.buildTree(array, mid + 1, end);

    return node;
  }

  getRoot() {
    return this.root;
  }
}
const array = [5, 2, 3, 1, 7];
const tree = new Tree(array);
console.log(tree.getRoot());
