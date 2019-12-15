/*
 * @lc app=leetcode.cn id=496 lang=javascript
 *
 * [496] 下一个更大元素 I
 */

 /*
 vector<int> nextGreaterElement(vector<int>& nums) {
    vector<int> ans(nums.size()); // 存放答案的数组
    stack<int> s;
    for (int i = nums.size() - 1; i >= 0; i--) { // 倒着往栈里放
        while (!s.empty() && s.top() <= nums[i]) { // 判定个子高矮
            s.pop(); // 矮个起开，反正也被挡着了。。。
        }
        ans[i] = s.empty() ? -1 : s.top(); // 这个元素身后的第一个高个
        s.push(nums[i]); // 进队，接受之后的身高判定吧！
    }
    return ans;
}

 这就是单调队列解决问题的模板。for 循环要从后往前扫描元素，因为我们借助的是栈的结构，
 倒着入栈，其实是正着出栈。while 循环是把两个“高个”元素之间的元素排除，因为他们的存在没有意义，前面挡着个“更高”的元素，所以他们
 不可能被作为后续进来的元素的 Next Great Number 了。
 这个算法的时间复杂度不是那么直观，如果你看到 for 循环嵌套 while 循环，可能认为这个算法的复杂度也是 O(n^2)，但是实际上这个算法的复杂度只有 O(n)。

分析它的时间复杂度，要从整体来看：总共有 n 个元素，每个元素都被 push 入栈了一次，
而最多会被 pop 一次，没有任何冗余操作。所以总的计算规模是和元素规模 n 成正比的，也就是 O(n) 的复杂度。


 */

// @lc code=start
/**
 * 方法一：单调栈
 * 所有元素都入栈，先入栈，然后再用栈顶元素和当前遍历元素比较
 * 比当前元素小，则说明找到了结果，则添加到map中，栈顶元素作为key，当前遍历元素作为值
 * 遍历完成后，需再检查栈中是否为空，不为空，则说明栈中剩余的元素没有找到结果
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @return {number[]}
 */
var nextGreaterElement = function(nums1, nums2) {
  if (nums1.length > nums2.length)
    throw Error('nums1 不是nums2的子集')
  
  for (let item of nums1) {
    if (!nums2.includes(item))
      throw Error('nums1 不是nums2的子集')
  }

  // 单调栈
  let s = []
  // 结果数组
  let res = []
  // 保存中间结果的map
  let map = new Map()
  for (let i = 0; i < nums2.length; i++) {
    while (s.length && s[s.length - 1] < nums2[i])
      map.set(s.pop(), nums2[i])
    s.push(nums2[i])
  }

  while (s.length)
    map.set(s.pop(), -1)

  for (let i = 0; i < nums1.length; i++)
    res[i] = map.get(nums1[i])
  return res
};

/**
 * 方法二：暴力法 -- 遍历
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @return {number[]}
 */
var nextGreaterElement = function(nums1, nums2) {
  if (nums1.length > nums2.length)
    throw Error('nums1 不是nums2的子集')

  let res = []
  for (let item of nums1) {
    let idx = nums2.indexOf(item)
    if (idx === -1)
      throw Error('nums1 不是nums2的子集')
    else {
      idx++
      let flag = false
      while (idx < nums2.length) {
        if (nums2[idx] > item) {
          res.push(nums2[idx])
          flag = true
          break
        }

        idx++
      }
      if (!flag)
        res.push(-1)
    }
  }
  return res
}

/**
 * 方法一：单调栈
 * 所有元素都倒着入栈，将当前遍历元素作为map的key，将栈顶元素（如果不为口）或-1作为map的值
 * 检查栈顶元素如果小于当前遍历元素，则说明栈顶元素不符合要求，则出栈（与正着入栈的思路是不同的）
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @return {number[]}
 */
var nextGreaterElement = function(nums1, nums2) {
  if (nums1.length > nums2.length)
    throw Error('nums1 不是nums2的子集')
  
  let s = [], res = [], map = new Map()
  for (let i = nums2.length - 1; i >= 0; i--) {
    while (s.length && s[s.length - 1] <= nums2[i])
      s.pop()
    map.set(nums2[i], s.length ? s[s.length - 1] : -1)
    s.push(nums2[i])
  }

  for (let i = 0; i < nums1.length; i++)
    res[i] = map.get(nums1[i])
  return res
}

// @lc code=end

