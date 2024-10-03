import {Tree} from "./BST.js"

//testing
const prettyPrint = (node, prefix = "", isLeft = true) => {
    if (node === null) {
      return;
    }
    if (node.right !== null) {
      prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
    }
    console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
    if (node.left !== null) {
      prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
    }
  };

  
//create balanced bst from array of random #s <100
let testarray = [46, 4, 74, 2, 0, 10, 43, 6, 4, 38, 59, 22, 43, 56, 99, 1];
const tree = new Tree(testarray);

prettyPrint(tree.root);
console.log(tree.isBalanced(tree.root));


// reprint elements inLevel, inOrder, preOrder, postOrder
function printNode (node){
    console.log(node.data);
  };

/* tree.levelOrder(printNode); */
tree.inOrder(printNode);
/* tree.preOrder(printNode); */
/* tree.postOrder(printNode); */


//unbalance tree 
tree.insert(101, tree.root);
tree.insert(222, tree.root);
tree.insert(476, tree.root);
tree.delete(1, tree.root);
prettyPrint(tree.root);
console.log(tree.isBalanced(tree.root));

//rebalance tree
tree.rebalance();
prettyPrint(tree.root);
console.log(tree.isBalanced(tree.root));

// reprint elements inLevel, inOrder, preOrder, postOrder
tree.levelOrder(printNode);
/* tree.inOrder(printNode); */
/* tree.preOrder(printNode); */
/* tree.postOrder(printNode); */
