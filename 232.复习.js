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

var MyQueue = function () {
  this.s1 = new Stack
  this.s2 = new Stack
}

MyQueue.prototype.push = function (x) {
  while (!this.s1.empty()) {
    this.s2.push(this.s1.pop())
  }
  this.s2.push(x)
  while (!this.s2.empty()) {
    this.s1.push(this.s2.pop())
  }
}

MyQueue.prototype.pop = function () {
  return this.s1.pop()
}

MyQueue.prototype.peek = function () {
  return this.s1.peek()
}

MyQueue.prototype.empty = function () {
  return this.s1.empty()
}


var MyQueue = function () {
  this.s1 = new Stack
  this.s2 = new Stack
  this.front = void 0
}

MyQueue.prototype.push = function (x) {
  if (this.s1.empty()) {
    this.front = x
  }
  this.s1.push(x)
}

MyQueue.prototype.pop = function () {
  if (this.s2.empty()) {
    while (!this.s1.empty()) {
      this.s2.push(this.s1.pop())
    }
  }
  return this.s2.pop()
}

MyQueue.prototype.peek = function () {
  if (!this.s2.empty()) {
    return this.s2.peek()
  }
  return this.front
}

MyQueue.prototype.empty = function () {
  return this.s1.empty() && this.s2.empty()
}