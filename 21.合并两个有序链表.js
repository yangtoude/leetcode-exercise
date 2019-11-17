/*
 * @lc app=leetcode.cn id=21 lang=javascript
 *
 * [21] 合并两个有序链表
 */

// @lc code=start
/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */
/**
 * 方法1：迭代法：双指针遍历，创建一个新链表返回
 * 1. 创建一个哨兵节点dummyHead，节点的next指向新链表，最后返回哨兵节点的next即可
 * 2. 双指针遍历后，需要判断下l1和l2是否为空，将p.next指向不为空的节点
 *    这里需要注意的是，l1和l2只可能有1个不为空
 * @param {ListNode} l1
 * @param {ListNode} l2
 * @return {ListNode}
 */
var mergeTwoLists = function(l1, l2) {
  let dummyHead = new ListNode(0)
  let p = dummyHead
  while (l1 && l2) {
    if (l1.val < l2.val)
      p.next = l1, l1 = l1.next
    else
      p.next = l2, l2 = l2.next
    p = p.next
  }

  // l1和l2只可能有1个不为空
  p.next = l1 ? l1 : l2

  return dummyHead.next
};

/**
 * 方法2：递归法
 * 如果当前l1的值小于l2的值，则l1.next指向以l1.next为头节点的链表和l2为头节点的链表合并后的头结点
 * 然后将l1作为头结点返回
 * 否则将l2.next指向以l2.next为头节点的链表和以l1为头节点的链表合并之后的链表的头结点，并将l2作为链表头节点返回
 * 递归结束条件l1为null，则返回l2，l2为null则返回l1
 * @param {ListNode} l1
 * @param {ListNode} l2
 * @return {ListNode}
 */
var mergeTwoLists = function(l1, l2) {
  if (!l1)
    return l2
  if (!l2)
    return l1
  if (l1.val < l2.val) {
    l1.next = mergeTwoLists(l1.next, l2)
    return l1
  } else {
    l2.next = mergeTwoLists(l1, l2.next)
    return l2
  }
}
// @lc code=end

