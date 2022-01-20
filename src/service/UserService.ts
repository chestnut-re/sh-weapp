import { doGetAction, doPostAction, doPutAction, getHeader } from '@/utils/request'
import Taro from '@tarojs/taro'
import { BASE_URL } from '../constants/c'

/**
 * 用户相关
 */
export class UserService {
  /// 获取用户信息
  static getUserInfo() {
    return doGetAction({ url: `${BASE_URL}/users/customer/userInfo/get`, data: {} })
  }
  /// 获取用户代币
  static getUserWallet() {
    return doGetAction({ url: `${BASE_URL}/wallet/c/myWallet`, data: {} })
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
    return Taro.uploadFile({
      url: `${BASE_URL}/third/oss/uploadFile`,
      filePath: file.url,
      name: 'file',
      header: getHeader(),
      formData: {
        // fileUrl: list.url,
        fileType: '1',
        file: file,
      },
    })
  }

  /**
   * 绑定业务员
   */
  static bindBizUser(userId) {
    return doPostAction({ url: `${BASE_URL}/users/customer/salesmanRelation/bind/${userId}`, data: {} })
  }

  /**
   * 建立推荐关系
   */
  static bindRecommend(userId) {
    return doPostAction({ url: `${BASE_URL}/users/recommend/bind/${userId}`, data: {} })
  }

  /**
   * 解锁乐豆
   */
  static unLockPullBean(data) {
    return doGetAction({ url: `${BASE_URL}/market/rebate/unLockPullBean`, data: data })
  }
}
