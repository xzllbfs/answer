const fp = require('lodash/fp')
// 数据
// horsepower 马力，dollar_value 价格，in_stock 库存
const cars = [
  { name: 'Ferrari FF', horsepower: 660, dollar_value: 700000, in_stock: true },
  { name: 'Spyker C12 Zagato', horsepower: 650, dollar_value: 648000, in_stock: false },
  { name: 'Jaguar XKR-S', horsepower: 550, dollar_value: 132000, in_stock: false },
  { name: 'Audi R8', horsepower: 525, dollar_value: 114200, in_stock: false },
  { name: 'Pagani huayra', horsepower: 700, dollar_value: 1300000, in_stock: false }
]


// 练习1：使用函数组合 fp.flowRight() 重新实现下面这个函数
let isLastInStock = fp.flowRight(
  fp.prop('in_stock'), fp.last
)
console.log('练习1结果：', isLastInStock(cars))


// 练习2：使用 fp.flowRight()、fp.prop() 和 fp.first()获取第一car的name
let getFirstCarName = fp.flowRight(
  fp.prop('name'), fp.first
)
console.log('练习2结果：', getFirstCarName(cars))


// 练习3：使用帮助函数 _averge 重构 averageDollarValue，使用函数组合的方式实现
let _average = function (xs) {
  return fp.reduce(fp.add, 0, xs) / xs.length
}
let averageDollarValue = fp.flowRight(
  _average, fp.map(fp.prop('dollar_value'))
)
console.log('练习3结果：', averageDollarValue(cars))


// 练习4：练习4：使用flowRight写一个 sanitizeNames()函数，返回一个下划线连接的小写字符串，把数组中name转换成这种形式：例如：sanitizeNames(["Hello World"]) => ["hello_world"]
let _underscore = fp.replace(/\W+/g, '_')
let sanitizeNames = fp.map(({ name }) => {
  return fp.flowRight(_underscore, fp.toLower)(name)
})
console.log('练习4结果：', sanitizeNames(cars))