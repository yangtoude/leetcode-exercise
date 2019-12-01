/*
 * @lc app=leetcode.cn id=232 lang=javascript
 *
 * [232] 用栈实现队列
 */

// 先实现一个栈
class Stack {
  constructor () {
    this.data = []
  }
  push (item) {
    this.data.push(item)
  }
  pop () {
    return this.data.pop()
  }
  peek () {
    return this.data[this.data.length - 1]
  }
  empty () {
    return this.data.length === 0
  }
}

// @lc code=start
// 方法一：双栈
/**
 * 在入栈时，先将s1放入s2，再将新元素放入s2，此时栈顶元素在s2的栈底
 * 所以再将s2放入s1即可
 * Initialize your data structure 
 */
var MyQueue = function() {
  this.s1 = new Stack
  this.s2 = new Stack
};

/**
 * Push element x to the back of queue. 
 * @param {number} x
 * @return {void}
 */
MyQueue.prototype.push = function(x) {
  while (!this.s1.empty()) {
    this.s2.push(this.s1.pop())
  }
  this.s2.push(x)
  while (!this.s2.empty()) {
    this.s1.push(this.s2.pop())
  }
};

/**
 * Removes the element from in front of queue and returns that element.
 * @return {number}
 */
MyQueue.prototype.pop = function() {
  return this.s1.pop()
};

/**
 * Get the front element.
 * @return {number}
 */
MyQueue.prototype.peek = function() {
  return this.s1.peek()
};

/**
 * Returns whether the queue is empty.
 * @return {boolean}
 */
MyQueue.prototype.empty = function() {
  return this.s1.empty()
};


// 方法二：双栈
/**
 * 在入栈时，始终入栈s1，此时栈顶（队首）元素始终在s1的栈底
 * 将第一个入栈的元素作为队首元素保存
 * 在出栈时，将s1全部放入s2，此时队首元素在s2的顶部，将队首元素出栈作为结果返回
 * s2为空时只要将s1再放入s2即可
 * Initialize your data structure 
 */
var MyQueue = function() {
  this.s1 = new Stack
  this.s2 = new Stack
  this.front = void 0
};

/**
 * Push element x to the back of queue. 
 * @param {number} x
 * @return {void}
 */
MyQueue.prototype.push = function(x) {
  if (this.s1.empty()) {
    this.front = x
  }
  this.s1.push(x)
};

/**
 * Removes the element from in front of queue and returns that element.
 * @return {number}
 */
MyQueue.prototype.pop = function() {
  if (this.s2.empty()) {
    while (!this.s1.empty()) {
      this.s2.push(this.s1.pop())
    }
  }

  return this.s2.pop()
};

/**
 * Get the front element.
 * @return {number}
 */
MyQueue.prototype.peek = function() {
  // 我们定义了 front 变量来保存队首元素，每次 入队 操作我们都会随之更新这个变量。当 s2 为空，front 变量就是对首元素，
  // 当 s2 非空，s2 的栈顶元素就是队首元素。
  if (!this.s2.empty()) {
    return this.s2.peek()
  }

  // 如果s2为空，那么要么之前没有出过队，队首元素没变
  // 要么
  return this.front
};

/**
 * Returns whether the queue is empty.
 * @return {boolean}
 */
MyQueue.prototype.empty = function() {
  return this.s1.empty() && this.s2.empty()
};
/** 
 * Your MyQueue object will be instantiated and called as such:
 * var obj = new MyQueue()
 * obj.push(x)
 * var param_2 = obj.pop()
 * var param_3 = obj.peek()
 * var param_4 = obj.empty()
 */
// @lc code=end

