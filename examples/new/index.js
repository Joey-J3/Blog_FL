function _new(fn, ...args) {
  // 1.创建一个空对象
  // 2.将空对象的 __proto__ 指向函数的 prototype
  const obj = Object.create(fn.prototype);
  // 3. this指向这个空对象
  // 4.执行构造函数中的代码
  const res = fn.apply(obj, args);
  // 5.若 return 了一个对象，则返回这个对象 res；否则，返回 this 指向的对象 obj
  return Object.prototype.toString.call(res).slice(8, -1) === 'object' ? res : obj;
}

function Person() {}

const person = _new(Person);
console.log(person instanceof Person);