class Stack {
  private data: Array<any>
  constructor () {
    this.data = []
  }
  push (value: number|void) {
    this.data.push(value)
  }
  pop (): number|void {
    return this.data.pop()
  }
  isEmpty (): boolean {
    return this.data.length === 0
  }
}

class CQueue {
  private s1: Stack
  private s2: Stack
  constructor() {
    this.s1 = new Stack
    this.s2 = new Stack
  }

  /* 思路2: 入队时处理（s2为临时栈），出队时直接出队s1 */
  appendTail(value: number): void {
    while (!this.s1.isEmpty()) {
      this.s2.push(this.s1.pop())
    }
    this.s2.push(value)
    while (!this.s2.isEmpty()) {
      this.s1.push(this.s2.pop())
    }
  }

  deleteHead(): number|void {
    const res = this.s1.pop()
    return res === void 0 ? -1 : res
  }


  /* 思路1:  入队时入s1栈，出队时处理*/
  // appendTail(value: number): void {
  //   this.s1.push(value)
  // }

  // deleteHead(): number|undefined {
  //   if (this.s2.isEmpty()) {
  //     while (!this.s1.isEmpty())
  //       this.s2.push(this.s1.pop())
  //   }

  //   const res = this.s2.pop()

  //   return res === undefined ? -1 : res

  //   // if(!B.isEmpty()) return B.removeLast();
  //   // if(A.isEmpty()) return -1;
  //   // while(!A.isEmpty())
  //   //     B.addLast(A.removeLast());
  //   // return B.removeLast();
  // }
}

/**
* Your CQueue object will be instantiated and called as such:
* var obj = new CQueue()
* obj.appendTail(value)
* var param_2 = obj.deleteHead()
*/