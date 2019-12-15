// 参考：
// [JS实现全排列](https://juejin.im/post/5bcb415c518825314076ab9f)
// [全排列算法的JS实现](https://www.cnblogs.com/kindofblue/p/4947748.html)
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
permute('12', 0, 1)
console.log(list)