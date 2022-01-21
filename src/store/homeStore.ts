import { makeObservable, observable, action } from 'mobx'

class HomeData {
  refreshHomePage = 0
  constructor() {
    makeObservable(this, {
      refreshHomePage: observable,
      onRefreshHomePage: action,
    })
  }
  onRefreshHomePage() {
    this.refreshHomePage++
  }
}

function createHomeStore() {
  return new HomeData()
}

export { createHomeStore }
