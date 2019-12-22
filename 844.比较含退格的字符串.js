/*
 * @lc app=leetcode.cn id=844 lang=javascript
 *
 * [844] 比较含退格的字符串
 */

// @lc code=start
/**
 * 方法一：栈  -- 未通过
 * @param {string} S
 * @param {string} T
 * @return {boolean}
 */
var backspaceCompare = function(S, T) {
  let s = S.split('') // 数组首位为栈顶
  let t = T.split('')

  let str1 = ''
  let str2 = ''
  let m = 0
  while (s.length) {
    let a = s.shift()
    if (a === '#') {
      m++
    } else {
      while (m-- >= 0) {
        s.shift()
      }
      str1 += a
    }
  }

  let n = 0
  while (t.length) {
    let a = t.shift()
    if (a === '#') {
      n++
    } else {
      while (n-- >= 0) {
        t.shift()
      }
      str2 += a
    }
  }

  console.log(str1, str2)

  return str1 === str2
};

var build = (s) => {
  let stack = []
  let arr = s.split('')
  for (let c of arr) {
    if (c !== '#') {
      stack.push(c)
    } else if (stack.length) {
      stack.pop()
    }
  }
  return stack.join('')
}

/**
 * 方法一：栈  -- 参考官方答案  用栈来重新构造字符串
 * 时间复杂度 O(M + N)
 * 空间复杂度 O(m + n)
 * @param {string} S
 * @param {string} T
 * @return {boolean}
 */
var backspaceCompare = function(S, T) {
  return build(S) === build(T)
}

/**
 * 方法二：双指针
 * 一个字符是否属于最终字符串的一部分，取决于它后面有多少个退格符。
 * 如果反向遍历字符串，就可以先知道有多少个退格符，然后知道退格符左边有多少个字符会被删除，对应的也就知道哪些字符会保留在最终的字符串中。
 * 
 * 算法： 反向遍历字符串，如果遍历到一个退格符，那么再往左第一个非退格字符将会被删除，剩余未被删除的字符就是最终的字符串。
 * 时间复杂度：O(M + N)O(M+N)，其中 M, NM,N 是字符串 S 和 T 的长度。
 * 空间复杂度：O(1)O(1)。
 * @param {string} S
 * @param {string} T
 * @return {boolean}
 */
var backspaceCompare = function (S, T) {
  let i = S.length - 1, j = T.length - 1
  let skipS = 0, skipT = 0

  while (i >= 0 || j >= 0) {
    while (i >= 0) {
      if (S.charAt(i) === '#')
        skipS++, i--
      else if (skipS > 0)
        skipS--, i--
      else
        break
    }

    while (j >= 0) {
      if (T.charAt(j) === '#')
        skipT++, j--
      else if (skipT > 0)
        skipT--, j--
      else
        break
    }

    if (i >= 0 && j >= 0 && S.charAt(i) !== T.charAt(j))
      return false
    if ((i >= 0) !== (j >= 0))
      return false
    i--, j--
  }
  return true
}
// @lc code=end

