/*
 * @lc app=leetcode.cn id=1021 lang=javascript
 *
 * [1021] 删除最外层的括号
 */

// @lc code=start
/**
 * 方法一：字符串
 * @param {string} S
 * @return {string}
 */
var removeOuterParentheses = function(S) {
  let res = ''
  let m = 0 // 括号层级
  for (let c of S) {
    if (c === ')')
      --m
    if (m >= 1)
      res += c
    if (c === '(')
      ++m
  }
  return res
};
/**
 * 方法二：栈
 */
var removeOuterParentheses = function(S) {
  let ans = ''
  let stack = []

  let start = 0  // 初始化原语的起始位置
  let end = 0  // 初始化原语的结束位置
  let flag = false  // 标志每个原语
  for (let i = 0; i < S.length; i++) {
    let ch = S.charAt(i)

    if (ch === '(') { // 左括号入栈
      stack.push(ch)
      if (!flag) { // 遇到的第一个左括号，是原语的开始位置，记录下原语开始位置
        start = i
        flag = true
      }
    }

    if (ch === ')') { // 右括号出栈
      stack.pop()
      if (!stack.length) { // 栈为空时找到了一个完整的原语
        end = i
        ans += S.substring(start + 1, end) // 去掉原语的最外层括号，并追加到答案中
        flag = false // 重置标志位为false，往后接着找下一个原语
        start = end // 往后找，再次初始化原语开始位置
      }
    }
  }

  return ans
}
// @lc code=end

