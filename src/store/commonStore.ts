import { makeObservable, observable, action } from 'mobx'

class CommonData {
  counter = 0

  bizId = ''

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
}

function createCommonStore() {
  return new CommonData()
}

export { createCommonStore }
