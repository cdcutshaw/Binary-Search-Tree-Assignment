//class for single node of binary search tree
class Node {
    constructor(data) {
        this.data = data;
        this.left = null;
        this.right = null;
    }
}


export class Tree {
    constructor (arr) {
        const sortedArray = [...new Set(arr)].sort((a,b) => a - b)
        this.root = this.buildTree(sortedArray, 0, sortedArray.length -1);
    }

    
    buildTree(arr, start , end) {
        if (start > end ) {return null}

        let mid = Math.floor((start + end) / 2);
        let node = new Node(arr[mid]);

        node.left = this.buildTree(arr, start, mid - 1);
        node.right = this.buildTree(arr, mid + 1, end);

        return node;
    }
 
    insert(value, currentNode = this.root) {
        if (currentNode === null) return new Node(value);
        if(currentNode.data === value) return;

        if(currentNode.data < value) {
            currentNode.right = this.insert(value, currentNode.right);
        }
        else {currentNode.left = this.insert(value, currentNode.left);
        }
        return currentNode;
    }

    delete(value, currentNode = this.root) {
        //base case
        if(currentNode === null) return currentNode;
        //traverse tree
        if(value < currentNode.data) {
            currentNode.left = this.delete(value, currentNode.left);
        }
        else if (value > currentNode.data) {
            currentNode.right = this.delete(value, currentNode.right);
        }
        //value found -> delete node and update pointers
        else {
            if(currentNode.left === null) {
                return currentNode.right;
            }
            else if (currentNode.right === null) {
                return currentNode.left;
            }
            //if node has 2 children
            else {
                const minData = function findNextSmallestRightData(node) {
                    let min = node.data;
                    let current = node;

                    while (current.left !== null) {
                        current = current.left;
                        min = current.data
                    }
                    return min;
                }
                //determine smallest val in right subtree
                const minRight = minData(currentNode.right);
                currentNode.data = minRight;
                //delete duplicate node from the right subtree
                currentNode.right = this.delete(minRight, currentNode.right)
            }
        }
        return currentNode;
    }

    find(value, currentNode = this.root) {
        if (currentNode === null || currentNode.data === value) return currentNode;

        if(currentNode.data < value) {
            return this.find(value, currentNode.right);
        }
        else {
            return this.find(value, currentNode.left);
        }
    }

    levelOrder(callback) {
        if (typeof callback !== "function") {
            throw new Error("A callback function is required");
        }

        const queue = [];
        if(this.root !== null) queue.push(this.root);

        while (queue.length > 0) {
            const current = queue.shift();
            callback(current);

            if (current.left !== null) queue.push(current.left);
            if(current.right !== null) queue.push(current.right)
        }
    }

    inOrder(callback) {
        if (typeof callback !== "function") {
            throw new Error("A callback function is required");
        }

        const traverse = (node) => {
            if (node === null) return;
            traverse(node.left);
            callback(node);
            traverse(node.right);
        };
        traverse(this.root);
    }

    preOrder(callback){
        if (typeof callback !== "function") {
            throw new Error("A callback function is required");
        }

        const traverse = (node) => {
            if (node === null) return;
            callback(node);
            traverse(node.left);
            traverse(node.right);
        };
        traverse(this.root);
    }

    postOrder(callback) {
        if (typeof callback !== "function") {
            throw new Error("A callback function is required");
        }

        const traverse = (node) => {
            if (node === null) return;
            traverse(node.left);
            traverse(node.right);
            callback(node);
        };
        traverse(this.root);
    }

    height(node) {
        if (node === null) return -1;

        const leftHeight = this.height(node.left);
        const rightHeight = this.height(node.right);

        return Math.max(leftHeight, rightHeight) + 1
    }

    depth(node ) {
        let current = this.root;
        let depth = 0;

        while(current !== null) {
            if(node.data === current.data) {
                return depth;
            }
            else if (node.data < current.data) {
                current = current.left;
            }
            else {
                current = current.right
            }
            depth++
        }
        return -1;
    }

    isBalanced (root = this.root) {
        if (root === null) return true;

        const leftHeight = this.height(root.left);
        const rightHeight = this.height(root.right);
        const diff = Math.abs(leftHeight - rightHeight);

        return diff <= 1 && this.isBalanced(root.left) && this.isBalanced(root.right)
    }

    rebalance() {
        const inorderList = [];
        this.inOrder((node) => inorderList.push(node.data));
        this.root = this.buildTree(inorderList, 0, inorderList.length - 1)
    }
}
