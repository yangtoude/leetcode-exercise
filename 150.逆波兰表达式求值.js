/*
 * @lc app=leetcode.cn id=150 lang=javascript
 *
 * [150] 逆波兰表达式求值
 */

// @lc code=start

// 用一个栈来实现
// 遍历记号数组，遇到运算符就取出操作数并计算，并将计算结果压入栈中
// 遇到操作数则直接入栈
// 遍历完成后将结果出栈
// 注意操作数的计算顺序
// a b依次入栈，则b为右操作数，a为左操作数

/**
 * 方法一：一种巧妙的运算法映射方法
 * @param {string[]} tokens
 * @return {number}
 */
var evalRPN = function(tokens) {
  var SIGN = {
    '*': (a, b) => a * b,
    '/': (a, b) => Math.trunc(a / b),
    '+': (a, b) => a + b,
    '-': (a, b) => a - b
  }

  const stack = []
  for (let item of tokens) {
    if (item in SIGN) {
      const b = stack.pop()
      const a = stack.pop()
      const res = SIGN[item](a, b)
      stack.push(res)
    } else {
      stack.push(Number(item))
    }
  }
  return stack.pop()
};

// 更精炼的代码
var evalRPN = function(tokens) {
  const SIGN = {
    '*': (a, b) => a * b,
    '/': (a, b) => Math.trunc(a / b),
    '+': (a, b) => a + b,
    '-': (a, b) => a - b
  }

  const stack = []
  for (let item of tokens) {
    if (item in SIGN) {
      const b = stack.pop()
      const a = stack.pop()
      stack.push(SIGN[item](a, b))
    } else {
      stack.push(Number(item))
    }
  }
  return stack.pop()
};
// @lc code=end

