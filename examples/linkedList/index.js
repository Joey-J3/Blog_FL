// js 双向链表实现
class Node {
  constructor(value = 0, next = null, prev = null) {
    this.value = value;
    this.next = next;
    this.prev = prev;
  }
}
class LinkedList {
  constructor() {
    this.size = 0
    this.head = new Node();
    this.tail = new Node();
    this.head.next = this.tail;
    this.tail.prev = this.head;
  }
  head() {
    return this.size === 0 ? undefined : this.head.next.value
  }
  tail() {
    return this.size === 0 ? undefined : this.tail.prev.value
  }
  get(index) { // O(n)
    // 判断 index 是否合法
    if (!(index < this.size && index > -1)) return;
    let curNode = this.head.next;
    for (let i = 0; i < index; i++) {
      curNode = curNode.next;
    }
    return curNode;
  }
  getRight(index) {
    return this.get(this.size - 1 - index);
  }
  push(value) {  // O(1)
    let node = new Node(value);
    node.next = this.tail;
    node.prev = this.tail.prev
    this.tail.prev.next = node;
    this.tail.prev = node
    this.size++;
  }
  pop() { // O(1)
    return this.remove(this.size - 1);;
  }
  unshift(value) { // O(1)
    let node = new Node(value);
    node.next = this.head.next;
    node.prev = this.head;
    this.head.next.prev = node;
    this.head.next = node;
    this.size++
  }
  shift() {
    return this.remove(0);
  }
  insert(value, index) {
    let node = new Node(value);
    let nextNode = this.get(index)
    node.prev = nextNode.prev;
    node.next = nextNode;
    nextNode.prev.next = node;
    nextNode.prev = node
    this.size++;
  }
  remove(index) {
    let targetNode = this.get(index);
    if (!targetNode) return;
    targetNode.prev.next = targetNode.next;
    targetNode.next.prev = targetNode.prev
    const value = targetNode.value;
    targetNode = null;
    this.size--;
    return value;
  }
}

let linkedList = new LinkedList();

console.log(
  linkedList.push(1),
  linkedList.push(3),
  linkedList.push(5),
  linkedList.get(1).value,
  linkedList.getRight(0).value,
  linkedList.insert(7, 2),
  linkedList.get(2).value,
  linkedList.pop(),
  linkedList.shift(),
  linkedList.unshift(100),
  linkedList.get(0).value,
  linkedList.remove(0)
);

