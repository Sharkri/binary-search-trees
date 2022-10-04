function Node(data, leftNode = null, rightNode = null) {
  return { data, leftNode, rightNode };
}

class Tree {
  constructor(array) {
    if (!Array.isArray(array)) this.array = [null];
    else this.array = [...new Set(array)].sort((a, b) => a - b);
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

  insert(value, root = this.root) {
    if (value >= root.data) {
      if (root.rightNode === null) {
        root.rightNode = Node(value);
        return;
      }
      this.insert(value, root.rightNode);
    } else if (value < root.data) {
      if (root.leftNode === null) {
        root.leftNode = Node(value);
        return;
      }
      this.insert(value, root.leftNode);
    }
  }

  delete(root, key) {
    if (root == null) return root;

    if (key < root.data) root.leftNode = this.delete(root.leftNode, key);
    else if (key > root.data) root.rightNode = this.delete(root.rightNode, key);
    // if key is not greater nor less than root, key has been found
    else {
      // node with only one child or no child
      if (root.leftNode == null) return root.rightNode;
      if (root.rightNode == null) return root.leftNode;

      // node with two children: Get the next biggest value
      root.data = Tree.getMinValue(root.rightNode);
      // Delete the duplicate
      root.rightNode = this.delete(root.rightNode, root.data);
    }

    return root;
  }

  static getMinValue(root) {
    // Traverse down the left since left will always be lowest
    let temp = root;
    while (temp.leftNode != null) temp = temp.leftNode;
    return temp.data;
  }

  getRoot() {
    return this.root;
  }
}

const tree = new Tree([20, 10, 25, 27]);
tree.insert(26);
tree.insert(24);
tree.delete(tree.root, 20);
console.log(tree.root);
