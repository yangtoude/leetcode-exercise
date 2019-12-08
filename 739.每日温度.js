/*
 * @lc app=leetcode.cn id=739 lang=javascript
 *
 * [739] 每日温度
 */

// @lc code=start

/**
 * 方法二：单调栈维护 -- 倒着入栈
 * @param {number[]} T
 * @return {number[]}
 */
var dailyTemperatures = function(T) {
  let n = T.length
  let ans = new Array(n).fill(void 0)
  let s = []
  for (let i = n - 1; i >= 0; i--) {
    while (s.length && T[i] >= T[s[s.length - 1]]) {
      s.pop()
    }
    // 栈为空 即后面没有比当前天温度高的
    // 不为空 栈顶元素对应的下标减去当前下标即为经过几天后温度比当前天温度高明出处。
    ans[i] = s.length === 0 ? 0 : s[s.length - 1] - i
    s.push(i)

    // 注意位置不要颠倒
    // s.push(i)    
    // ans[i] = s.length === 0 ? 0 : s[s.length - 1] - i
  }
  return ans
}

/**
 * 方法二：单调栈维护 -- 倒着入栈 -- 固定长度数组模拟栈，需要一个栈顶索引维护
 * @param {number[]} T
 * @return {number[]}
 */
var dailyTemperatures = function(T) {
  let n = T.length
  let ans = new Array(n).fill(void 0)
  let s = new Array(n).fill(void 0)
  let top = -1
  for (let i = n - 1; i >= 0; i--) {
    let cur = T[i]
    while (top >= 0 && cur >= T[s[top]]) {
      top--
    }
    s[++top] = i
    // 栈中保存的是符合的是比当前元素第一个大的值的索引
    ans[i] = top === 0 ? 0 : s[top - 1] - i
  }
  return ans
}


/**
 * 方法一：单调栈 -- 正着入栈
 */
var dailyTemperatures = function (T) {
  let n = T.length
  if (n < 2)
    return new Array(n).fill(0)
  
  let ans = new Array(n).fill(void 0)
  let s = []
  for (let i = 0; i < n; i++) {
    while (s.length && T[s[s.length - 1]] < T[i]) {
      // 栈中保存的是待计算等待天数的索引
      let index = s.pop()
      ans[index] = i - index
    }
    s.push(i)
  }

  while (s.length) {
    ans[s.pop()] = 0
  }
  return ans
}

/**
 * 方法三：暴力法 -- 遍历
 */
var dailyTemperatures = function (T) {
  let n = T.length
  let ans = new Array(n).fill(void 0)
  for (let i = 0; i < n; i++) {
    for (let j = i + 1; j < n; j++) {
      if (T[i] < T[j]) {
        ans[i] = j - i
        break
      }
    }
  }

  // 注意上述遍历只是找到了有结果的
  for (let i = 0; i < n; i++) {
    if (!ans[i])
      ans[i] = 0
  }

  return ans
}

/**
 * 方法四：逆序遍历 + 跳跃(剪枝)
 * 依然逆序遍历，但是每次的结果利用到了右侧已经计算的结果，这样可以加快遍历速度。
 * 如题目中的数组[73, 74, 75, 71, 69, 72, 76, 73],
当我们要计算75元素右侧第一个比他大的元素的时候，
由于我们逆序遍历，已经计算了71元素的右侧第一个比他大的元素是76，
因此我们可以跳过69，72，直接将76与75比较即可。
处。
 */
var dailyTemperatures = function (T) {
  let n = T.length
  let ans = []
  ans[n - 1] = 0
  for (let i = n - 2; i >= 0; i--) {
    if (T[i] < T[i + 1]) {
      // 相邻的符合条件，则只用等1天
      ans[i] = 1
      continue
    }

    // 相邻的不符合条件，则利用之前的结果来计算和查找
    // 下一个(相邻)肯定是不符合条件的，否则不会走到这里，所以需要再往右找
    // 因为第i + 1个的结果已经知道了，即 ans[i + 1]，所以再加上它就相当于
    // 把不符合条件的略过了，比如当前元素如果是75，那么逻辑走到这儿，有可能
    // 符合条件的则是：2(75索引) + 1 + 1(71的结果)
    // 然后再检查是否符合条件，如果不符合则继续迭代rightIndex
    let rightIndx = i + 1 + ans[i + 1]
    while (ans[rightIndx] !== 0 && T[rightIndx] <= T[i])
      rightIndx += ans[rightIndx]
    ans[i] = T[rightIndx] > T[i] ? rightIndx - i : 0
  }
  return ans
}

// 查找第一个比i大的值
var binarySearch = function (arr, i) {
  let low = 0
  let high = arr.length - 1
  while (low <= high) {
    let mid = low + ((high - low) >> 1)
    let midVal = arr[mid]
    if (i < midVal) {
      if (mid === 0 || arr[mid - 1] < i) {
        return midVal
      }
      high = mid - 1
    } else {
      low = mid + 1
    }
  }

  return -1
}

/**
 * 方法五：记录索引 + 二分  --  将找温度转化为找最小坐标 -- 基数排序的思想
 * 前提：温度有上下限
 */
var dailyTemperatures = function (T) {
  let n = T.length
  let indexArr = new Array(101).fill(null)
  let ans = new Array(n).fill(void 0)

  for (let i = 0; i < n; i++) {
    let t = T[i]
    if (indexArr[t] === null)
      indexArr[t] = []
    indexArr[t].push(i)
  }

  for (let i = 0; i < n; i++) {
    let t = T[i]
    let minIndex = Infinity
    for (let bigger = t + 1; bigger <= 100; bigger++) {
      if (indexArr[bigger] === null)
        continue
      
      // 二分查找第一个比i大的索引，然后所有[t + 1, 100]中找取得的索引的最小值即是答案
      let nextIndex = binarySearch(indexArr[bigger], i)
      if (nextIndex !== -1) {
        if (nextIndex < minIndex) {
          minIndex = nextIndex
        }
      }
    }

    if (minIndex !== Infinity)
      ans[i] = minIndex - i
  }

  // 注意上述遍历只是找到了有结果的
  for (let i = 0; i < n; i++) {
    if (!ans[i])
      ans[i] = 0
  }

  return ans
}
// @lc code=end
 
