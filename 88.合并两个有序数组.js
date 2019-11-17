/*
 * @lc app=leetcode.cn id=88 lang=javascript
 *
 * [88] 合并两个有序数组
 */

// @lc code=start
/**
 * 思路一：双指针，从后向前遍历数组，将nums1、num2的元素拷贝到nums1中
 * 需要注意的是在双指针遍历时，nums2有两种情况
 * 1. 全放入了nums1，结束
 * 2. 还有一些元素没有放入nums1，那接着放就可以了
 * 这个解题思路就是充分利用了nums1的总长度正好可以放入nums1和nums2
 * @param {number[]} nums1
 * @param {number} m
 * @param {number[]} nums2
 * @param {number} n
 * @return {void} Do not return anything, modify nums1 in-place instead.
 */
/*
var merge = function(nums1, m, nums2, n) {
    let i = m - 1
    let j = n - 1
    let k = m + n - 1
    while (i >= 0 && j >= 0)
      nums1[k--] = nums1[i] > nums2[j] ? nums1[i--] : nums2[j--]
    
    // 最后将nums2中剩下的元素放入nums1，这里是关键
    while (j >= 0)
      nums1[k--] = nums2[j--]
};
*/
/**
 * 思路二：双指针，从前向后遍历数组，将num2的元素拷贝到nums1中
 * 需要注意的是
 * 1. 因为从头遍历，nums1会被更改，所以需要一个nums1的副本nums1Copy
 * 2. 双指针遍历后，如果nums1Copy或nums2还有一些元素没有放入nums1，那接着放就可以了
 * @param {number[]} nums1
 * @param {number} m
 * @param {number[]} nums2
 * @param {number} n
 * @return {void} Do not return anything, modify nums1 in-place instead.
 */

var merge = function(nums1, m, nums2, n) {
  let i = 0
  let j = 0
  let k = 0
  let nums1Copy = Array.from(nums1)
  while (i < m && j < n)
    nums1[k++] = nums1Copy[i] < nums2[j] ? nums1Copy[i++] : nums2[j++]
  
  // 最后将nums2或nums1中剩下的元素放入nums1，这里是关键
  while (i < m)
    nums1[k++] = nums1Copy[i++]
  while (j < n)
    nums1[k++] = nums2[j++]
}
// @lc code=end

