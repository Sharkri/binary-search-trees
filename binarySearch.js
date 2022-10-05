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

  delete(key, root = this.root) {
    if (root == null) return root;

    if (key < root.data) root.leftNode = this.delete(key, root.leftNode);
    else if (key > root.data) root.rightNode = this.delete(key, root.rightNode);
    // if key is not greater nor less than root, key has been found
    else {
      // node with only one child or no child
      if (root.leftNode == null) return root.rightNode;
      if (root.rightNode == null) return root.leftNode;

      // node with two children: Get the next biggest value
      root.data = Tree.getMinValue(root.rightNode);
      // Delete the duplicate
      root.rightNode = this.delete(root.data, root.rightNode);
    }

    return root;
  }

  find(value) {
    let temp = this.root;
    while (temp !== null) {
      if (temp.data < value) temp = temp.rightNode;
      else if (temp.data > value) temp = temp.leftNode;
      else return temp;
    }
    return null;
  }

  levelOrder(func) {
    const queue = [this.root];
    const nodes = [];
    while (queue.length) {
      const firstNode = queue[0];
      nodes.push(firstNode);
      queue.shift();
      if (firstNode.leftNode) queue.push(firstNode.leftNode);
      if (firstNode.rightNode) queue.push(firstNode.rightNode);
    }

    return typeof func === "function"
      ? func(nodes)
      : nodes.map((node) => node.data);
  }

  levelOrderRec(func, nodes = [], queue = [this.root]) {
    if (!queue.length) {
      return typeof func === "function"
        ? func(nodes)
        : nodes.map((node) => node.data);
    }
    const firstNode = queue[0];
    nodes.push(firstNode);
    queue.shift();
    if (firstNode.leftNode != null) queue.push(firstNode.leftNode);
    if (firstNode.rightNode != null) queue.push(firstNode.rightNode);
    return this.levelOrderRec(func, nodes, queue);
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

const tree = new Tree([1, 2, 3, 4, 5, 6, 7, 8, 9]);
function test(nodes) {
  console.log(nodes.map((node) => node.data * 2));
}
tree.levelOrder(test);
console.log(tree.levelOrderRec());
console.log(tree.getRoot());
