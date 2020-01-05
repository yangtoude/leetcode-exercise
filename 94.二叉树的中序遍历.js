/*
 * @lc app=leetcode.cn id=94 lang=javascript
 *
 * [94] 二叉树的中序遍历
 *
 * https://leetcode-cn.com/problems/binary-tree-inorder-traversal/description/
 *
 * algorithms
 * Medium (67.86%)
 * Likes:    358
 * Dislikes: 0
 * Total Accepted:    89.8K
 * Total Submissions: 129.3K
 * Testcase Example:  '[1,null,2,3]'
 *
 * 给定一个二叉树，返回它的中序 遍历。
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
 * 输出: [1,3,2]
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
 * @param {object} root
 * @param {array} res 
 */
var inorder = function(root, res) {
  if (!root)
    return res
  
  inorder(root.left, res)
  res.push(root.val)
  inorder(root.right, res)
  return res
}
/**
 * 方法一：递归遍历
 * 时间复杂度：O(n)O(n)。递归函数 T(n) = 2 \cdot T(n/2)+1T(n)=2⋅T(n/2)+1。
 * 空间复杂度：最坏情况下需要空间O(n)O(n)，平均情况为O(\log n)O(logn)。
 * @param {TreeNode} root
 * @return {number[]}
 */
var inorderTraversal = function(root) {
  if (!root)
    return []
  
  return inorder(root, [])
};

/**
 * 方法二：迭代 + 栈
 * 时间复杂度：O(n)
 * 空间复杂度：O(n)
 * @param {TreeNode} root
 * @return {number[]}
 */
var inorderTraversal = function(root) {
  let statck = [], res = []

  while (root || statck.length) {
    while (root)
      // 先找到所有的左节点入栈
      statck.push(root), root = root.left
    // 左节点先出栈放入结果数组，然后遍历右子树
    root = statck.pop(), res.push(root.val), root = root.right
  }
  return res
};

/**
 * 方法二的统一化写法
 * 左根右
 * 与先序遍历不同的是，出栈时才将结果写入列表
 */
var inorderTraversal = function(root) {
  let res = [], statck = []
  while (root || statck.length) {
    while (root)
      statck.push(root), root = root.left
    root = statck.pop(), /* 此时左子树遍历完成 */ res.push(root.val), /* 将父节点加入列表 */ root = root.right /* 遍历右子树 */
  }
  return res
}

/*
官方题解中介绍了三种方法来完成树的中序遍历，包括：

递归
借助栈的迭代方法
莫里斯遍历
在树的深度优先遍历中（包括前序、中序、后序遍历），递归方法最为直观易懂，但考虑到效率，我们通常不推荐使用递归。
栈迭代方法虽然提高了效率，但其嵌套循环却非常烧脑，不易理解，容易造成“一看就懂，一写就废”的窘况。而且对于不同的遍历顺序（前序、中序、后序），循环结构差异很大，更增加了记忆负担。

因此，我在这里介绍一种“颜色标记法”（瞎起的名字……），兼具栈迭代方法的高效，又像递归方法一样简洁易懂，更重要的是，这种方法对于前序、中序、后序遍历，能够写出完全一致的代码。
其核心思想如下：
使用颜色标记节点的状态，新节点为白色，已访问的节点为灰色。
如果遇到的节点为白色，则将其标记为灰色，然后将其右子节点、自身、左子节点依次入栈。
如果遇到的节点为灰色，则将节点的值输出。
*/

/**
 * 方法三：迭代 + 栈 + 标记法
 * 使用带有访问标志的栈来模拟递归
 * 理解1: 这个方法很好，递归与非递归的记忆方法相同，只是顺序相反（只需要移动三句话的顺序）。如中序遍历：递归是左根右，非递归是右根左；先序遍历：左右根=》根右左。后序类似
 * 理解2: 前序：在第一次访问时打印，加入栈的顺序是右左根（根左右的反向）。 中序，在第二次访问时打印，加入栈的顺序是右根左（左根右的反向）。 后序，在第三次访问时打印，加入栈的顺序是根右左（左右根的反向）。
 * 理解3: 楼主这个方法应该是模拟计算机中的函数栈，很妙
 */
var inorderTraversal = function(root) {
  const [WHITE, GRAY] = [0, 1] // WHITE - 未访问的新结点； GRAY - 已访问的结点
  const res = []
  const stack = [[WHITE, root]]
  let color, node
  while (stack.length) {
    [color, node] = stack.pop() // 若栈中有元素，则按照左节点、根节点、右节点的顺序依次弹出元素
    if (!node)
      continue
    if (color === WHITE)
      // 当前指向的节点是未访问过的节点，将其右、根、左节点依次入栈
      // 出栈时，就变成了左、根、右
      stack.push([WHITE, node.right]), stack.push([GRAY, node]), stack.push([WHITE, node.left])
    else
      res.push(node.val)
  }
  return res
}
// @lc code=end

