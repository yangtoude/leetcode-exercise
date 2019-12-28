/*
 * @lc app=leetcode.cn id=682 lang=javascript
 *
 * [682] 棒球比赛
 */

// @lc code=start
/**
 * 方法一：栈 -- 一次遍历
 * @param {string[]} ops
 * @return {number}
 */
var calPoints = function(ops) {
  let sm = 0
  let stack = []
  for (let m of ops) {
    if (m === '+') {
      let top = stack.pop()
      let newTop = Number(top) + Number(stack[stack.length - 1])
      stack.push(top)
      stack.push(String(newTop))
      sm += Number(newTop)
    } else if (m === 'D') {
      let newTop = 2 * Number(stack[stack.length - 1])
      stack.push(String(newTop))
      sm += newTop
    } else if (m === 'C') {
      let top = stack.pop()
      sm -= Number(top)
    } else {
      stack.push(m)
      sm += Number(m)
    }
  }

  return sm
};

/**
 * 方法一：栈 -- 两次遍历
 * @param {string[]} ops
 * @return {number}
 */
var calPoints = function(ops) {
  let stack = []
  for (let m of ops) {
    if (m === '+') {
      let top = stack.pop()
      let newTop = Number(top) + Number(stack[stack.length - 1])
      stack.push(top)
      stack.push(newTop)
    } else if (m === 'D') {
      stack.push(2 * Number(stack[stack.length - 1]))
    } else if (m === 'C') {
      stack.pop()
    } else {
      stack.push(m)
    }
  }

  let sm = 0
  for (let m of stack)
    sm += Number(m)

  return sm
};
// @lc code=end

