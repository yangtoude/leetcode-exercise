/*
 * @lc app=leetcode.cn id=636 lang=typescript
 *
 * [636] 函数的独占时间
 */

// @lc code=start
function exclusiveTime(n: number, logs: string[]): number[] {
  const res: Array<number> = new Array(n).fill(0)
  const stack: Array<number> = [] // 栈中存放被调用的函数，栈顶为正在执行的函数：开始或者结束
  let tmpArr = logs[0].split(':')
  let prev: number = Number(tmpArr[2]) // 栈顶函数执行的开始时间或者结束时间
  let i: number = 1 // logs循环控制变量
  stack.push(Number(tmpArr[0]))

  while (i < logs.length) {
    tmpArr = logs[i].split(':')
    if (tmpArr[1] === 'start') {
      if (stack.length !== 0) {
        res[stack[stack.length - 1]] += Number(tmpArr[2]) - prev
      }
      stack.push(Number(tmpArr[0]))
      prev = Number(tmpArr[2])
    } else {
      res[stack[stack.length - 1]] += Number(tmpArr[2]) - prev + 1
      stack.pop()
      prev = Number(tmpArr[2]) + 1
    }
    i++
  }

  return res
};
// @lc code=end

