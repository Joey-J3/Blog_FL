var urls = [
  'https://www.kkkk1000.com/images/getImgData/getImgDatadata.jpg', 
  'https://www.kkkk1000.com/images/getImgData/gray.gif', 
  'https://www.kkkk1000.com/images/getImgData/Particle.gif', 
  'https://www.kkkk1000.com/images/getImgData/arithmetic.png', 
  'https://www.kkkk1000.com/images/getImgData/arithmetic2.gif', 
  'https://www.kkkk1000.com/images/getImgData/getImgDataError.jpg', 
  'https://www.kkkk1000.com/images/getImgData/arithmetic.gif', 
  'https://www.kkkk1000.com/images/wxQrCode2.png'
];

// 异步加载图片
function loadImg(url) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => {
      console.log('一张图片加载完成');
      document.body.appendChild(img)
      resolve()
    }
    img.onerror = reject;
    img.src = url
  })
}

// 限制同时加载的 url
function limitLoad(urls, handler, limit) {
  const sequence = [...urls];
  let promises = [];
  promises = sequence.splice(0, limit).map((url, index) => {
    return handler(url).then(() => {
      return index;
    })
  });

  return sequence.reduce((last, url, currentIndex) => {
    return last.then(() => {
      // 返回最快改变状态的 promise
      return Promise.race(promises);
    }).catch((err) => {
      // 防止中断整个链式调用
      console.error(err);
    }).then((res) => {
      promises[res] = handler(sequence[currentIndex]).then(() => {
        return res
      });
    })
  }, Promise.resolve()).then(() => {
    return Promise.all(promises)
  })
}

limitLoad(urls, loadImg, 3).then(() => {
  console.log('所有图片加载完成');
}).catch(err => {
  console.error(err);
})