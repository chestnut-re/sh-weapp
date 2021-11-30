import { makeObservable, observable, action } from 'mobx'

/**
 * 用户相关数据
 */
class UserData {
  /**用户信息 */
  userInfo = null

  constructor() {
    makeObservable(this, {
      userInfo: observable,
      login: action,
      loginOut: action,
    })
  }

  login() {}

  loginOut() {}

  /**是否已经登录 */
  get isLogin() {
    return this.userInfo
  }
}

function createUserStore() {
  return new UserData()
}

export { createUserStore }
