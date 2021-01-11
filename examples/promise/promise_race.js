Promise._race = (arr) => {
  if (typeof arr[Symbol.iterator] === 'function') throw new TypeError('Promise.race() only accept iterable object');
  let args = [].slice.call(arr);
  return new Promise((resolve, reject) => {
    if (args.length === 0) resolve();
    args.forEach(value => {
      if (value && (typeof value === 'object' || typeof value === 'function')) {
        if (typeof value.then === 'function') {
          value.then(resolve, reject);
        }
      }
    });
  })
}