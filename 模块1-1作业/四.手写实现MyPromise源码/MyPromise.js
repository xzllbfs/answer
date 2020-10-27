 // Promise 3种状态
const PROMISE_STATE = {
  PENDING: 'pending',
  FULFILLED: 'fulfilled',
  REJECTED: 'rejected'
}

class MyPromise {
  _state = PROMISE_STATE.PENDING // Promise初始状态
  _data = undefined // resolved结果信息
  _reason = undefined // reject错误信息
  _successFns = [] // 回调执行队列
  _failFns =  [] // 异常处理队列

  constructor (executor) {
    try {
      executor(this.resolve, this.reject)
    } catch (error) {
      this.reject(error)
    }
  }

  resolve = (data) => {
    // 非Pending状态，无法继续
    if (this._state !== PROMISE_STATE.PENDING) return

    this._state = PROMISE_STATE.FULFILLED
    this._data = data

    // 异步情况，将 _successFns 逐一执行
    while (this._successFns.length) {
      this._successFns.shift()()
    }
  }

  reject = (reason) => {
    // 非Pending状态，无法继续
    if (this._state !== PROMISE_STATE.PENDING) return

    this._state = PROMISE_STATE.REJECTED
    this._reason = reason

    // 异步情况，将 _failFns 逐一执行
    while (this._failFns.length) {
      this._failFns.shift()()
    }
  }

  then (onFulfilled, onRejected) {
    if (typeof onFulfilled !== 'function') {
      onFulfilled = value => value
    }
    if (typeof onRejected !== 'function') {
      onRejected = value => value
    }

    let newPromise = new MyPromise((resolve, reject) => {
      if (this._state === PROMISE_STATE.PENDING) { // 将处理函数推入队列
        this._successFns.push(() => {
          setTimeout(() => {
            try {
              let result = onFulfilled(this._data)
              resolvePromise(newPromise, result, resolve, reject)
            } catch (e) {
              reject(e)
            }
          }, 0)
        })
        this._failFns.push(() => {
          setTimeout(() => {
            try {
              let result = onRejected(this._reason)
              resolvePromise(newPromise, result, resolve, reject)
            } catch (e) {
              reject(e)
            }
          }, 0)
        })
      } else if (this._state === PROMISE_STATE.FULFILLED) { // 执行Fullfilled
        setTimeout(() => {
          try {
            let result = onFulfilled(this._data)
            resolvePromise(newPromise, result, resolve, reject)
          } catch (e) {
            reject(e)
          }
        }, 0)
      } else if (this._state === PROMISE_STATE.REJECTED) { // 执行Reject相关方法
        setTimeout(() => {
          try {
            let result = onRejected(this._reason)
            resolvePromise(newPromise, result, resolve, reject)
          } catch (e) {
            reject(e)
          }
        }, 0)
      }
    })
    return newPromise
  }

  catch (failCb) {
    return this.then(undefined, failCb)
  }

  finally (callback) {
    return this.then(value => {
      return MyPromise.resolve(callback()).then(() => value)
    }, reason => {
      return MyPromise.resolve(callback()).then(() => {
        throw reason
      })
    })
  }

  static resolve () {
    return new MyPromise(resolve => {
      this.resolve(value)
    })
  }

  static reject () {
    return new MyPromise((undefined, reject) => {
      this.reject(reason)
    })
  }

  // 实现静态all方法
  static all (array) {
    let result = []
    let index = 0

    return new MyPromise((resolve, reject) => {
      function addData (key, value) {
        result[key] = value
        index++
        if (index === array.length) {
          resolve(result)
        }
      }

      for (let i = 0; i < array.length; i++) {
        let cur = array[i]
        if (cur instanceof MyPromise) {
          // Promise类型
          cur.then(value => {
            addData(i, value)
          }, reject)
        } else {
          // 普通值
          addData(i, array[i], resolve)
        }
      }
    })
  }
}

// 兼容类型
function resolvePromise (promise, result, resolve, reject) {
  console.log('resolvePromise', result)
  if (promise === result) {
    return reject(new Error('Chaining cycle detected for promise'))
  }

  try {
    if (result instanceof MyPromise) {
      // Promise类型，直接调用then
      return result.then(resolve, reject)
    } else {
      // 普通值
      resolve(result)
    }
  } catch (error) {
    reject(error)
  }
}

module.exports = MyPromise