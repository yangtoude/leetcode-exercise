/*
 * @lc app=leetcode.cn id=145 lang=javascript
 *
 * [145] 二叉树的后序遍历
 *
 * https://leetcode-cn.com/problems/binary-tree-postorder-traversal/description/
 *
 * algorithms
 * Hard (67.48%)
 * Likes:    205
 * Dislikes: 0
 * Total Accepted:    44K
 * Total Submissions: 63.4K
 * Testcase Example:  '[1,null,2,3]'
 *
 * 给定一个二叉树，返回它的 后序 遍历。
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
 * 输出: [3,2,1]
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
 * 递归辅助函数
 * @param {TreeNode} root
 * @param {number[]} res
 * @return {number[]}
 */
var postorder = function(root, res) {
  if (!root)
    return res

  postorder(root.left, res)
  postorder(root.right, res)
  res.push(root.val)

  return res
}

/**
 * 方法一：递归
 * 左右父
 * @param {TreeNode} root
 * @return {number[]}
 */
var postorderTraversal = function(root) {
  return root ? postorder(root, []) : []
};

/**
 * 方法二：迭代 + 栈
 * 左右父
  能不能借助先序遍历的思路来呢，我们将上面的顺序翻转过来得到，父>右>左。
  所以现在可以按照之前的方法遍历，最后把结果翻转一下。
 * @param {TreeNode} root
 * @return {number[]}
 */
var postorderTraversal = function(root) {
  let stack = [], res = []

  while (root || stack.length) {
    while (root)
      res.push(root.val), stack.push(root), root = root.right // 先将右节点压栈
    root = stack.pop(), /* 此时该节点的右子树已经全遍历完 */ root = root.left /* 对左子树遍历 */
  }

  return res.reverse()
};

/**
 * 方法三：带颜色标记的栈模拟方法
 */
var postorderTraversal = function(root) {
  const [WHITE, GRAY] = [0, 1] // WHITE - 未访问的新结点； GRAY - 已访问的结点
  const res = []
  const stack = [[WHITE, root]]
  let color, node
  while (stack.length) {
    [color, node] = stack.pop() // 若栈中有元素，则按照左节点、根节点、右节点的顺序依次弹出元素
    if (!node)
      continue
    if (color === WHITE)
      // 当前指向的节点是未访问过的节点，将其根、右、左节点依次入栈
      // 出栈时，就变成了根、左、右
      stack.push([GRAY, node]), stack.push([WHITE, node.right]), stack.push([WHITE, node.left])
    else
      res.push(node.val)
  }
  return res
}
// @lc code=end

