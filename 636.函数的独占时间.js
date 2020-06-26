/*
 * @lc app=leetcode.cn id=636 lang=javascript
 *
 * [636] 函数的独占时间
 */
// @lc code=start
function exclusiveTime(n, logs) {
  var res = new Array(n).fill(0);
  var stack = []; // 栈中存放被调用的函数，栈顶为正在执行的函数：开始或者结束
  var tmpArr = logs[0].split(':');
  var prev = Number(tmpArr[2]); // 栈顶函数执行的开始时间或者结束时间
  var i = 1; // logs循环控制变量
  stack.push(Number(tmpArr[0]));
  while (i < logs.length) {
      tmpArr = logs[i].split(':');
      if (tmpArr[1] === 'start') {
          if (stack.length !== 0) {
              res[stack[stack.length - 1]] += Number(tmpArr[2]) - prev;
          }
          stack.push(Number(tmpArr[0]));
          prev = Number(tmpArr[2]);
      }
      else {
          res[stack[stack.length - 1]] += Number(tmpArr[2]) - prev + 1;
          stack.pop();
          prev = Number(tmpArr[2]) + 1;
      }
      i++;
  }
  return res;
}
;
// @lc code=end
