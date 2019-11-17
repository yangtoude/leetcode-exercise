/*
 * @lc app=leetcode.cn id=26 lang=javascript
 *
 * [26] 删除排序数组中的重复项
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @return {number}
 */
var removeDuplicates = function(nums) {
    
};

/**
 * @param {number[]} nums
 * @return {number}
 */
var removeDuplicates = function(nums) {
    
};

/**
 * @param {number[]} nums
 * @return {number}
 */
var removeDuplicates = function(nums) {
    
};

/**
 * @param {number[]} nums
 * @return {number}
 */
var removeDuplicates = function(nums) {
    
};

/**
 * 快慢指针
 * 快指针j逐个遍历，慢指针指向需要替换的元素（替换后，i之前的元素不再含有重复元素）
 * i最终会指向新数组的最后一位
 * @param {number[]} nums
 * @return {number}
 */
var removeDuplicates = function(nums) {
  let len = nums.length
  if (len == 0)
    return 0

  let i = 0
  for (let j = 1; j < len; j++) {
    if (nums[j] != nums[i]) {
      i++ // 先把i移动到第2个重复元素，这里是关键
      nums[i] = nums[j] // 然后替换
    }
  }
  return i + 1
};
// @lc code=end

