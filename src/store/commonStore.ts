import { makeObservable, observable, action } from 'mobx'

class CommonData {
  counter = 0
  bizId = '' // 业务员绑定
  afterLoginCallback = null // 登录回调

  constructor() {
    makeObservable(this, {
      counter: observable,
      bizId: observable,
      incrementAsync: action,
    })
  }

  incrementAsync() {
    setTimeout(() => {
      this.counter++
    }, 1000)
  }

  setAfterLoginCallback(callback) {
    this.afterLoginCallback = callback
  }

  removeAfterLoginCallback() {
    this.afterLoginCallback = null
  }
}

function createCommonStore() {
  return new CommonData()
}

export { createCommonStore }
