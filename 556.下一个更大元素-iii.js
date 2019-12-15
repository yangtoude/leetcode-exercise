/*
 * @lc app=leetcode.cn id=556 lang=javascript
 *
 * [556] 下一个更大元素 III
 */

// @lc code=start
/**
 * 方法一：暴力法
 * 将数字看做字符串，列出所有排列，找出比n大的下一个排列即可
 * 时间复杂度n!，空间复杂度n!
 * @param {number} n
 * @return {number}
 */
var nextGreaterElement = function(n) {
  var list = []
  /**
   * 交换字符串中i、j位置的字符
   * @param {string} s 待交换的字符串 
   * @param {number} i 下标
   * @param {number} j 下标
   * @return 返回一个新的字符串
   */
  var swap = function (s, i, j) {
    if (i === j)
      return s
    let s1 = s.substring(0, i)
    let s2 = s.substring(i + 1, j)
    let s3 = s.substring(j + 1)
    return s1 + s[i] + s2 + s[j] + s3
  }
  
  /**
   * 递归生成字符串s的所有排列
   * @param {string} s 原始字符串
   * @param {number} l 左侧下标
   * @param {number} r 右侧下标
   */
  var permute = function (s, l, r) {
    let i
    if (l === r) {
      list.push(s)
    } else{
      for (i = l; i <= r; i++) {
        s = swap(s, l, r)
        permute(s, l + 1, r)
        s = swap(s, l, i)
      }
    }
  }
  let s = '' + n
  // 生成所有的排列
  permute(s, 0, s.length - 1)
  // 对list进行排序
  list.sort((a, b) => a < b)
  let i;
  for (i = list.length - 1; i >= 0; i--) {
    if (Number(list[i]) === n)
      break
  }
  return i === list.length - 1 ? -1 : Number(list[i + 1])
};
nextGreaterElement(12)
// @lc code=end

