const MyPromise = require('./MyPromise')

let p = new MyPromise((resolve, reject) => {
  console.log('立即执行构造MyPromise')
  resolve('构造函数执行成功，执行第一个then')
})

// 1. 同一个Promise多次调用
// p.then(() => {
//   console.log(1)
// })

// p.then(() => {
//   console.log(2)
// })

// p.then(() => {
//   console.log(3)
// })


// 2. 链式调用
let p2 = p.then((data) => {
  console.log(data)
  return '执行第二个then'
}).then((data) => {
  console.log(data)
  return '执行第三个then'
}).then((data) => {
  console.log(data)
})
console.log(p2)

// 测试返回Promise对象
// let otherPromise = new MyPromise((resolve, reject) => {
//   resolve('otherPromise执行成功')
// })

// p.then((data) => {
//   console.log(data)
//   return '执行第二个then'
// }).then((data) => {
//   console.log(data)
//   return 'otherPromise'
// }).then((data) => {
//   console.log(data)
//   return 1
// }).then((data) => {
//   console.log(data)
// }).then((data) => {
//   console.log(data)
//   // throw Error('抛出一个错误处理错误情况')
// })
