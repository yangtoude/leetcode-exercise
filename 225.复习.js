// 用队列实现栈

// 队列的实现
class Queue {
  constructor () {
    this.data = []
  }
  // 队尾入队
  push (item) {
    this.data.push(item)
  }
  // 队首出队
  pop () {
    return this.data.shift()
  }
  // 获取队首元素
  peek () {
    return this.data[0]
  }
  size () {
    return this.data.length
  }
  isEmpty () {
    return this.data.length === 0
  }
}

// 利用队列实现栈 方法一：1个队列来实现
// 队首 -- 栈顶
// 队尾 -- 栈底
var MyStack = function () {
  this.queue = new Queue
}

// 
MyStack.prototype.push = function (item) {
  // 直接入队是不行的，这样先入队的会在队首（栈顶）
  // 根据栈的定义，先入队（入栈）的应该在队尾（栈底）
  // 所以入队后需要将队列最后入队的元素（也就是栈顶元素）放到最前面
  this.queue.push(item)
  let count = this.queue.size()
  // 注意这里的边界控制，只是将除了队尾元素之外的其他元素都操作一遍
  while (count > 1) {
    this.queue.push(this.queue.pop())
    count--
  }
}

MyStack.prototype.pop = function () {
  return this.queue.pop()
}

MyStack.prototype.top = function () {
  return this.queue.peek()
}

MyStack.prototype.empty = function () {
  return this.queue.isEmpty()
}

// 方法二：两个个队列来实现
// 元素入栈时，q2先入队，并将该元素作为栈顶元素保存
// 然后将q1出队，q2将q1中的元素入队
// 然后交换q1和q2，这样就保证了新入队的元素始终在队列的头部，实现了栈的后入先出
// 需要注意的点：1，栈顶元素需要单独保存，入栈时更新该元素，出栈时页需要更新
// 因为无法从q1或q2中拿到栈顶元素
// 2,通过q1的出队、q2的入队、q1和q2的交换实现后入的元素在先入元素的前面

var MyStack = function () {
  this.q1 = new Queue
  this.q2 = new Queue
  this.stackTop = void 0
}

MyStack.prototype.push = function (item) {
  this.q2.push(item)
  // 保存栈顶元素：后入的元素
  this.stackTop = item
  while (!this.q1.isEmpty()) {
    this.q2.push(this.q1.pop())
  }
  // 交换q1和q2
  let tmp = this.q1
  this.q1 = this.q2
  this.q2 = tmp
}

// 注意先出栈，然后更新栈顶元素
MyStack.prototype.pop = function () {
  let res = this.q1.pop()
  if (!this.q1.isEmpty()) {
    this.stackTop = this.q1.peek()
  }
  return res
}

MyStack.prototype.top = function () {
  return this.stackTop
}

MyStack.prototype.empty = function () {
  return this.q1.isEmpty()
}


// 方法三：两个个队列来实现
// 元素入栈时，q1入队，这样后入的元素在q1的尾部（栈底），并将该元素保存为栈顶元素
// 出栈时，将q1除栈底的元素全部出队，然后放入q2中，注意出队时需要更新栈顶元素
// 然后将q1最后一个元素出队将结果返回
// 最后将q1和q2交换

var MyStack = function () {
  this.q1 = new Queue
  this.q2 = new Queue
  this.stackTop = void 0
}

MyStack.prototype.push = function (item) {
  this.q1.push(item)
  this.stackTop = item
}

// 
MyStack.prototype.pop = function () {
  while (this.q1.size() > 1) {
    this.stackTop = this.q1.pop()
    this.q2.push(this.stackTop)
  }

  let res = this.q1.pop()
  let tmp = this.q1
  this.q1 = this.q2
  this.q2 = tmp
  return res
}

MyStack.prototype.top = function () {
  return this.stackTop
}

MyStack.prototype.empty = function () {
  return this.q1.isEmpty()
}