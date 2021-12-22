import { userStore } from '@/store/context'
import Taro from '@tarojs/taro'

export const getHeader = () => {
  return {
    Authorization: userStore.accessToken,
    cId: userStore.city?.citycode ?? '',
  }
}
/**
 * 上传图片
 */
export const transImg = async ({ url, list }) => {
  return Taro.uploadFile({
    url: url,
    filePath: list.url,
    name: 'file',
    header: getHeader(),
    formData: {
      // fileUrl: list.url,
      fileType: '1',
      file: list,
    },
  })
}
