/* eslint-disable import/extensions */
import Tree from "./binarySearch.js";

function createRandomArray(sizeOfArray, max) {
  const array = [];
  for (let i = 0; i < sizeOfArray; i += 1) {
    array.push(Math.floor(Math.random() * max + 1));
  }
  return array;
}

const log = (msg) => console.log(msg, "\n");

const tree = new Tree(createRandomArray(25, 100));
log(tree.getRoot());
log(`is tree balanced: ${tree.isBalanced()}`);
tree.insert(150);
tree.insert(69420);
tree.insert(1234);
log(`is tree balanced: ${tree.isBalanced()}`);
tree.rebalance();
log(`is tree balanced: ${tree.isBalanced()}`);
log(tree.preorder());
log(tree.postorder());
log(tree.inorder());
