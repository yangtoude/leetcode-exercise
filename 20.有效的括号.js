/*
 * @lc app=leetcode.cn id=20 lang=javascript
 *
 * [20] 有效的括号
 */

// @lc code=start

/**
 * 检查括号匹配
 * @param {string} m
 * @param {string} n 
 */
const match = (m, n) => {
  return `${m}${n}` === '{}' ||
    `${m}${n}` === '[]' ||
    `${m}${n}` === '()'
}

/**
 * 方法一：栈
 * 遇到左括号就入栈，遇到右括号如果和栈顶元素匹配就出栈
 * 最后检查如果栈的长度为0则匹配，否则不匹配
 * 
 * @param {string} s
 * @return {boolean}
 */
var isValid = function(s) {
  let n = s.length

  if (n % 2 !== 0)
    return false

  let stack = []
  for (let m of s) {
    switch (m) {
      case '{':
      case '[':
      case '(':
        stack.push(m)
        break
      case '}':
      case ']':
      case ')':
        let n = stack[stack.length - 1]
        if (match(n, m))
          stack.pop() // 如果当前元素和栈顶元素匹配
      default:
    }
  }

  return stack.length === 0
};
// @lc code=end

