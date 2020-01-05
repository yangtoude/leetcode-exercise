/*
 * @lc app=leetcode.cn id=144 lang=javascript
 *
 * [144] 二叉树的前序遍历
 *
 * https://leetcode-cn.com/problems/binary-tree-preorder-traversal/description/
 *
 * algorithms
 * Medium (61.67%)
 * Likes:    187
 * Dislikes: 0
 * Total Accepted:    58.8K
 * Total Submissions: 93.1K
 * Testcase Example:  '[1,null,2,3]'
 *
 * 给定一个二叉树，返回它的 前序 遍历。
 * 
 * 示例:
 * 
 * 输入: [1,null,2,3]  
 * ⁠  1
 * ⁠   \
 * ⁠    2
 * ⁠   /
 * ⁠  3 
 * 
 * 输出: [1,2,3]
 * 
 * 
 * 进阶: 递归算法很简单，你可以通过迭代算法完成吗？
 * 
 */

// @lc code=start
/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * 方法一：迭代 + 栈
 * 根左右
 * @param {TreeNode} root
 * @return {number[]}
 */
var preorderTraversal = function(root) {
  let stack = [], res = []
  while (root || stack.length) {
    while (root)
      res.push(root.val), stack.push(root), root = root.left
    root = stack.pop(), /* 此时，该节点的左子树已经遍历完 */ root = root.right /* 对右子树遍历 */
  }
  return res
};

/**
 * 递归辅助函数
 * @param {TreeNode} root
 * @param {number[]} res
 * @return {number[]}
 */
var preorder = function(root, res) {
  if (!root)
    return res

  res.push(root.val)
  preorder(root.left, res)
  preorder(root.right, res)

  return res
}

/**
 * 方法二：递归
 */
var preorderTraversal = function(root) {
  return root ? preorder(root, []): []
}

/**
 * 方法三：带颜色标记的栈模拟方法
 */
var preorderTraversal = function(root) {
  const [WHITE, GRAY] = [0, 1] // WHITE - 未访问的新结点； GRAY - 已访问的结点
  const res = []
  const stack = [[WHITE, root]]
  let color, node
  while (stack.length) {
    [color, node] = stack.pop() // 若栈中有元素，则按照左节点、根节点、右节点的顺序依次弹出元素
    if (!node)
      continue
    if (color === WHITE)
      // 当前指向的节点是未访问过的节点，将其右、左、根节点依次入栈
      // 出栈时，就变成了根、左、右
      stack.push([WHITE, node.right]), stack.push([WHITE, node.left]), stack.push([GRAY, node])
    else
      res.push(node.val)
  }
  return res
}
// @lc code=end

