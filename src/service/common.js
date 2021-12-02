import Taro from '@tarojs/taro'
import { userStore } from '@/store/context'
import { BASE_URL } from '../constants/c'
import { getHeader } from '@/utils/request'

export default {
  getUser() {
    return Taro.request({
      url: `${BASE_URL}/api/zdl/ware/delivery/was`,
      header: getHeader,
      data: {
        openid: userStore.openid,
      },
    })
  },
}
