/*
 * @lc app=leetcode.cn id=189 lang=javascript
 *
 * [189] 旋转数组
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @param {number} k
 * @return {void} Do not return anything, modify nums in-place instead.
 */
var rotate = function(nums, k) {
    
};

/**
 * 方法一：暴力法
 * 将数组元素向后移动k次：遍历k趟，每趟都将数组中的每个元素向后移动1位
 * 需要注意：1，k可以对数组长度求下余数；2，最后一个元素要移动到第1个元素
 * 时间复杂度k * n
 * @param {number[]} nums
 * @param {number} k
 * @return {void} Do not return anything, modify nums in-place instead.
 */
var rotate = function(nums, k) {
  const len = nums.length
  if (len < 2 || k < 0)
    return

  k = k % len
  while (k--) {
    let tmp = nums[len - 1] // 最后一个元素需要特殊处理
    for (let i = len - 1; i > 0; i--)
      nums[i] = nums[i - 1] // 向后移动
    nums[0] = tmp // 将最后一个元素移动到第1个
  }
};

/**
 * 方法二：利用队列出队入队来实现
 * 将数组从尾部出队，然后从头部入队，出队k次、入队k次即可
 * @param {number[]} nums
 * @param {number} k
 * @return {void} Do not return anything, modify nums in-place instead.
 */
var rotate = function(nums, k) {
  if (nums.length < 2 || k < 0)
    return
  while (k--)
    nums.unshift(nums.pop())
};

/**
 * 辅助函数：从i到j局部反转数组
 * @param {array} nums 
 * @param {number} i 开始
 * @param {number} j 结束
 */
var reversePart = function(nums, i, j) {
  while (i < j) {
    let tmp = nums[i]
    nums[i++] = nums[j]
    nums[j--] = tmp
  }
}

/**
 * 方法三：反转数组
 * 先整体反转数组，然后再局部反转数组
 * 比如[1, 2, 3, 4, 5, 6]，移动k = 2后为[5, 6, 1, 2, 3, 4]
 * 其实就相当于先做整体反转[6, 5, 4, 3, 2, 1]，再从0到2-1做局部反转
 * [5, 6, 4, 3, 2, 1]，最后再从2到6 - 1做局部反转得到：
 * [5, 6, 1, 2, 3, 4]
 * @param {number[]} nums
 * @param {number} k
 * @return {void} Do not return anything, modify nums in-place instead.
 */
var rotate = function(nums, k) {
  if (nums.length < 2 || k < 0)
    return

  nums.reverse()
  k = k % nums.length
  reversePart(nums, 0, k - 1)
  reversePart(nums, k, nums.length - 1)
};

// @lc code=end

