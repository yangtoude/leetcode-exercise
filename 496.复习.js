/*
单调栈问题解决模板
*/

function nextGreaterElement2 (nums) {
  let ans = new Array(nums.length).fill(void 0)

  let s = [] // 栈

  for (let i = nums.length; i >= 0; i--) { // 倒着入栈
    while (s.length && s[s.length - 1] <= nums[i])
      s.pop() // 栈顶出栈
    ans[i] = s.length ?  -1 : s[s.length - 1] // 当前元素之后的第一个比它大的值在栈顶
    s.push(nums[i]) // 入栈，注意对于nums数组是倒着入栈
  }
  return ans
}

/**
 * 方法一：单调栈 -- 倒着入栈
 */

/**
 * 方法一：单调栈，倒着入栈，栈中存放的是预选结果，一旦发现当前元素比栈顶元素大，则出栈（不符合结果要求）
 * 栈中的元素从栈顶到栈底是
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @return {number[]}
 */
var nextGreaterElement = function(nums1, nums2) {
  if (nums1.length > nums2.length)
    throw Error('nums1 不是nums2的子集')
  
  let s = [], res = [], map = new Map()
  for (let i = nums2.length - 1; i >= 0; i--) {
    while (s.length && s[s.length - 1] < nums2[i])
      s.pop()
    map.set(nums2[i], s.length ? s[s.length - 1] : -1), s.push(nums2[i])
  }

  for (let i = 0; i < nums1.length; i++)
    res[i] = map.get(nums1[i])
  return res
}

// 正着入栈，栈中存放的是待比较的元素，一旦发现当前遍历元素比栈顶元素大，则全部出栈
var nextGreaterElement = function (nums1, nums2) {
  if (nums1.length > nums2.length)
    throw Error('nums1 不是nums2的子集')
  
  let s = [], res = [], map = new Map()
  for (let i = 0; i < nums2.length; i++) {
    while (s.length && s[s.length - 1] < nums2[i])
      map.set(s.pop(), nums2[i])
    s.push(nums2[i])
  }

  while (s.length) {
    map.set(s.pop(), -1)
  }

  for (let i = 0; i < nums1.length; i++) {
    res[i] = map.get(nums1[i])
  }
  return res
}

// 倒着入栈，栈中存放的是结果
var nextGreaterElement = function (nums1, nums2) {
  if (nums1.length > nums2.length)
    throw Error('nums1 不是nums2的子集')
  
  let s = [], res = [], map = new Map()
  for (let i = nums2.length - 1; i >= 0; i--) {
    while (s.length && s[s.length - 1] < nums2[i])
      s.pop()
    map.set(nums2[i], s.length ? s[s.length - 1] : -1), s.push(nums2[i])
  }

  for (let i = 0; i < nums1.length; i++) {
    res[i] = map.get(nums1[i])
  }
  return res
}