/*
 * @lc app=leetcode.cn id=225 lang=javascript
 *
 * [225] 用队列实现栈
 */

// @lc code=start

// 队列的实现
class Queue {
  constructor() {
    this.dataStore = []
  }
  front() {
    return this.dataStore[0]
  }
  back() {
    return this.dataStore[this.dataStore.length - 1]
  }
  // 队尾入队
  enqueue(element) {
    this.dataStore.push(element)
  }
  // 队首出队
  dequeue() {
    return this.dataStore.shift()
  }
  clear() {
    this.dataStore = []
  }
  getLength() {
    return this.dataStore.length
  }
  count() {
    return this.dataStore.length
  }
  isEmpty() {
    return this.dataStore.length === 0
  }
  toString() {
    return this.dataStore.join('\n')
  }
}

// 方法一：用数组来实现栈
/**
 * Initialize your data structure here.
 */
var MyStack = function() {
  this.data = []
};

/**
 * Push element x onto stack. 
 * @param {number} x
 * @return {void}
 */
MyStack.prototype.push = function(x) {
  this.data.push(x)
};

/**
 * Removes the element on top of the stack and returns that element.
 * @return {number}
 */
MyStack.prototype.pop = function() {
  if (this.data.length)
    return this.data.pop()
};

/**
 * Get the top element.
 * @return {number}
 */
MyStack.prototype.top = function() {
  return this.data[this.data.length - 1]
};

/**
 * Returns whether the stack is empty.
 * @return {boolean}
 */
MyStack.prototype.empty = function() {
  return this.data.length === 0
};


// 方法二：用一个队列来实现栈
// 压栈实现：队列入队然后将队列反转
// 因为队列的出入队顺序和栈的顺序是相反的，反转后就符合栈的行为了
/**
 * Initialize your data structure here.
 */
var MyStack = function() {
  this.queue = new Queue()
};

/**
 * Push element x onto stack. 
 * @param {number} x
 * @return {void}
 */
MyStack.prototype.push = function(x) {
  this.queue.enqueue(x)
  let count = this.queue.count()
  while (count > 1) {
    this.queue.enqueue(this.queue.dequeue())
    count--
  }
};

/**
 * Removes the element on top of the stack and returns that element.
 * @return {number}
 */
MyStack.prototype.pop = function() {
  if (!this.queue.isEmpty()) {
    return this.queue.dequeue()
  }
};

/**
 * Get the top element.
 * @return {number}
 */
MyStack.prototype.top = function() {
  return this.queue.front()
};

/**
 * Returns whether the stack is empty.
 * @return {boolean}
 */
MyStack.prototype.empty = function() {
  return this.queue.isEmpty()
};

// 方法三：用两个个队列来实现栈
// 队列2用来临时存储队列1的出栈元素 将栈顶元素单独保存top用
// pop操作时queue1中剩下最后一个元素作为结果返回
// 并用queue2临时保存出栈元素，最后将queue2和queue1交换
/**
 * Initialize your data structure here.
 */
var MyStack = function() {
  this.queue1 = new Queue
  this.queue2 = new Queue
  this.stackTop = void 0
};

/**
 * Push element x onto stack. 
 * @param {number} x
 * @return {void}
 */
MyStack.prototype.push = function(x) {
  this.queue1.enqueue(x)
  this.stackTop = x
};

/**
 * O(n)
 * Removes the element on top of the stack and returns that element.
 * @return {number}
 */
MyStack.prototype.pop = function() {
  while (this.queue1.count() > 1) {
    this.stackTop = this.queue1.dequeue()
    this.queue2.enqueue(this.stackTop)
  }
  let res = this.queue1.dequeue()
  let tmp = this.queue1
  this.queue1 = this.queue2
  this.queue2 = tmp
  return res
};

/**
 * Get the top element.
 * @return {number}
 */
MyStack.prototype.top = function() {
  return this.stackTop
};

/**
 * Returns whether the stack is empty.
 * @return {boolean}
 */
MyStack.prototype.empty = function() {
  return this.queue1.isEmpty()
};

// 方法四：用两个队列来实现栈
// 将元素从q2入队，并将该元素作为栈顶元素保存
// 当q1非空（栈非空）时，将q1的元素全部出队，然后再将出队的元素从q2入队
// 通过这样的方式新元素（栈中的栈顶元素）将会在q2的前端，然后将q1与q2交换
/**
 * Initialize your data structure here.
 */
var MyStack = function() {
  this.queue1 = new Queue
  this.queue2 = new Queue
  this.stackTop = void 0
};

/**
 * O(n)
 * Push element x onto stack. 
 * @param {number} x
 * @return {void}
 */
MyStack.prototype.push = function(x) {
  this.queue2.enqueue(x)
  this.stackTop = x
  while (!this.queue1.isEmpty()) {
    this.queue2.enqueue(this.queue1.dequeue())
  }
  let tmp = this.queue2
  this.queue2 = this.queue1
  this.queue1 = tmp
};

/**
 * 直接让q1出队，然后将出队后的q1中的队首元素作为栈顶元素保存O(1)
 * Removes the element on top of the stack and returns that element.
 * @return {number}
 */
MyStack.prototype.pop = function() {
  let res = this.queue1.dequeue()
  if (!this.queue1.isEmpty()) {
    this.stackTop = this.queue1.front()
  }
  return res
};

/**
 * Get the top element.
 * @return {number}
 */
MyStack.prototype.top = function() {
  return this.stackTop
};

/**
 * Returns whether the stack is empty.
 * @return {boolean}
 */
MyStack.prototype.empty = function() {
  return this.queue1.isEmpty()
};

/** 
 * Your MyStack object will be instantiated and called as such:
 * var obj = new MyStack()
 * obj.push(x)
 * var param_2 = obj.pop()
 * var param_3 = obj.top()
 * var param_4 = obj.empty()
 */
// @lc code=end

