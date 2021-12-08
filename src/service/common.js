import Taro from '@tarojs/taro'
import { userStore } from '@/store/context'
import { getHeader } from '@/utils/request'
import { BASE_URL } from '../constants/c'


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
