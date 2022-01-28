import { makeObservable, observable, action } from 'mobx'

class CommonData {
  counter = 0
  bizId = '' // 业务员绑定
  taskId = '' // 分享任务注册
  goodsId = '' // 分享商品注册
  source = '' // 来源
  afterLoginCallback = null // 登录回调

  constructor() {
    makeObservable(this, {
      counter: observable,
      bizId: observable,
      taskId: observable,
      goodsId: observable,
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
