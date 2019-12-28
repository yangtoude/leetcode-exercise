/*
 * @lc app=leetcode.cn id=1047 lang=javascript
 *
 * [1047] 删除字符串中的所有相邻重复项
 */

// @lc code=start
// 如何检查js的变量是否可以迭代
/**
 * 方法一：栈
 * @param {string} S
 * @return {string}
 */
var removeDuplicates = function(S) {
  let stack = []
  for (let m of S) {
    if (m === stack[stack.length - 1]) {
      stack.pop()
      continue
    }
    stack.push(m)
  }
  return stack.join('')
};
// @lc code=end

