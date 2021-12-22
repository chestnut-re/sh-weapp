import { doGetAction, doPostAction, doPutAction } from '@/utils/request'
import { transImg } from '@/utils/upload'
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
  static editUserInfo({ pic, nickName, sex, birthday, address, personalSignature }: any) {
    return doPutAction({
      url: `${BASE_URL}/users/customer/userInfo/update`,
      data: {
        pic: pic,
        nickName: nickName,
        sex: sex,
        birthday: birthday,
        address: address,
        personalSignature: personalSignature,
      },
    })
  }

  /// 上传头像
  static postUploadFile(file) {
    return transImg({
      url: `${BASE_URL}/third/oss/uploadFile`,
      list: file,
    })
  }
}
