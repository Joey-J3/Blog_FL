Promise._all = (arr) => {
  if (typeof arr[Symbol.iterator] !== 'function') throw new TypeError('Promise.all() only accept iterable object')
  let args = Array.prototype.slice.call(arr);
  return new Promise((resolve, reject) => {
    if (args.length === 0) resolve([]);
    let remaining = args.length;
    function res(i, val) {
      if (val && (typeof val === 'object' || typeof val === 'function')) {
        let then = val.then;
        if (typeof then === 'function') {
          let p = new Promise(then.bind(val));
          p.then(val => {
            res(i, val);
          }, reject);
          return;
        }
      }
      args[i] = val;
      if (--remaining === 0) {
        resolve(args)
      }
    }
    args.forEach((val, index) => {
      res(index, val);
    });
  });
}

const arr = [Promise.resolve(1), Promise.resolve(2), Promise.reject(new Error('3')), Promise.resolve(4)]
Promise._all(arr).then(res => {
  console.log('res:', res);
  return res;
}).catch(err => {
  console.log(err);
})