// app.js
const fp = require('lodash/fp')
const { Maybe, Container } = require('./support')


// 练习1：使用 fp.add(x, y) 和 fp.map(f, x)
// 创建一个能让 functor 里的值增加的函数ex1
let maybe = Maybe.of([5, 6, 1])
let ex1 = (count) => {
  // 你需要实现的函数
  return maybe.map(fp.map(fp.add(count)))
}
console.log('练习1结果：', ex1(1))


// 练习2：实现一个函数ex2，
// 能够使用 fp.first 获得列表的第一个元素
let xs = Container.of([
  'do', 'ray', 'me', 'fa', 'so', 'la', 'ti', 'do'
])
let ex2 = () => {
  // 你需要实现的函数
  return xs.map(fp.first)
}
console.log('练习2结果：', ex2())


// 练习3：实现一个函数ex3，
// 使用safeProp 和 fp.first 找到user的名字的首字母
let safeProp = fp.curry(function (x, o) {
  return Maybe.of(o[x])
})
let user = { id: 2, name: 'Albert'}
let ex3 = () => {
  // 你需要实现的函数
  return safeProp('name', user).map(fp.first)
}
console.log('练习3结果：', ex3())

// 练习4：使用Maybe重写ex4，不要有if语句
let ex4 = function (n) {
  return Maybe.of(n).map((item) => {
    return parseInt(item)
  })
}
console.log('练习4结果：', ex4(1.1))
