// 封装timeout函数方便复用，返回Promise对象
let timeout = function (time) {
  return new Promise((resolve, reject) => {
    setTimeout(function() {
      resolve()
    }, time)
  })
}

// 执行链式调用
let a, b, c
timeout(10)
  .then(() => {
    a = 'hello'
    return timeout(10)
  })
  .then(() => {
    b = 'lagou'
    return timeout(10)
  })
  .then(() => {
    c = 'I ❤ U'
    console.log(a + b + c)
  })