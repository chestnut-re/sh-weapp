import { doGetAction, doPostAction, doPutAction } from '@/utils/request'
import { BASE_URL } from '../constants/c'

/**
 * 用户相关
 */
 export class UserService {
  /// 获取用户信息
  static getUserInfo() {
    return doGetAction({ url: `${BASE_URL}/users/customer/userInfo/get`, data: {} })
  }

   ///修改用户信息
   static getProdAreaList () {
     return doPutAction({ url: `${BASE_URL}/users/customer/userInfo/update`, data: {} })
  }
}