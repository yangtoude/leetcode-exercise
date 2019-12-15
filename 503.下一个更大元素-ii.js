/*
 * @lc app=leetcode.cn id=503 lang=javascript
 *
 * [503] 下一个更大元素 II
 */

// @lc code=start
/**
 * 方法一：暴力法
 * [1, 2, 1]
 * [1, 2, 3, 2, 1, 5]
 * [5, 4, 3, 2, 1]
 * @param {number[]} nums
 * @return {number[]}
 */
var nextGreaterElements = function(nums) {
  let n = nums.length
  if (n === 0)
    return []
  if (n === 1)
    return [-1]

  let res = []
  for (let i = 0; i < n; i++) {
    let j = i + 1
    let flag = false
    // 内层循环终止条件
    while (j !== i) {
      // i到最后一个元素时，j从0开始
      // 但要注意如果i也为0时的判断，否则会陷入死循环
      if (j === n)
        if (i !== 0)
          j = 0
        else
          break
      if (nums[j] > nums[i]) {
        res.push(nums[j])
        flag = true
        break
      }
      j++
    }
    if (!flag)
      res.push(-1)
  }
  return res
};

/**
 * 方法二：单调栈法，倒着入栈，入栈两次即可
 * 所有元素先入栈
 * 栈中保存的是下标。将当前元素和栈顶元素比较，不符合要求的栈顶元素出栈
 * 符合要求的将栈顶元素填充到结果数组对应的位置
 * @param {number[]} nums
 * @return {number[]}
 */
var nextGreaterElements = function(nums) {
  let n = nums.length
  if (!n)
    return []
  if (n === 1)
    return [-1]
  
  let res = new Array(n).fill(void 0)
  let s = [] // 保存下标
  for (let i = 2 * n - 1; i >= 0; i--) {
    while (s.length && nums[s[s.length - 1]] <= nums[i % n])
      // 当前元素大于栈顶元素, 不符合要求的出栈
      s.pop()
    res[i % n] = !s.length ? -1 : nums[s[s.length - 1]]
    s.push(i % n)
  }
  return res
}

/**
 * 方法二：单调栈法，正着入栈，入栈两次即可
 * 所有元素先入栈，栈中保存的是备选结果
 * 栈中保存的是下标。将当前元素和栈顶元素比较，符合要求的栈顶元素出栈并放入结果数组
 * @param {number[]} nums
 * @return {number[]}
 */
var nextGreaterElements = function(nums) {
  let n = nums.length
  if (!n)
    return []
  if (n === 1)
    return [-1]
  
  let res = new Array(n).fill(void 0)
  let s = [] // 保存下标
  for (let i = 0; i <= 2 * n - 1; i++) {
    while (s.length && nums[s[s.length - 1]] < nums[i % n])
      res[s.pop()] = nums[i % n]
    s.push(i % n)
  }

  // 入栈两次都没有找到结果的则补1
  for (let i = 0; i < res.length; i++) {
    if (res[i] === void 0) {
      res[i] = -1
    }
  }

  return res
}

nextGreaterElements([1,2,1])
// @lc code=end

