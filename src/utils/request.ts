import { userStore } from '@/store/context'
import Taro from '@tarojs/taro'
import { ACCESS_TOKEN, SUCCESS, REFRESH_TOKEN, UNAUTHORIZED } from '@/constants/c'
import { showMToast } from '@/utils/ui'

/**
 * 获取本地缓存的Token
 * @returns token
 */

export const getToken = () => {
  try {
    const value = Taro.getStorageSync(ACCESS_TOKEN)
    if (value) {
      return value
      // Do something with return value
    }
  } catch (e) {
    // Do something when catch error
  }
}

export const getHeader = () => {
  const ret: any = {}
  if (userStore.accessToken) {
    ret.Authorization = userStore.accessToken
  }

  if (userStore.city?.adcode) {
    ret.cId = userStore.city?.adcode ?? ''
  }

  return ret
}

/**
 * post 请求
 * @param path 路径
 * @param data data
 * @returns
 */
export const doPostAction = ({ url, data }) => {
  return request('POST', url, data)
  // return Taro.request({
  //   method: 'POST',
  //   url: url,
  //   header: getHeader(),
  //   data: data,
  //   dataType: 'test',
  // })
}

/**
 * get 请求
 * @param path 路径
 * @param data data
 * @returns
 */
export const doGetAction = ({ url, data }) => {
  return request('GET', url, data)
  // return Taro.request({
  //   method: 'GET',
  //   url: url,
  //   header: getHeader(),
  //   data: data,
  //   dataType: 'test',
  // })
}

/**
 * put 请求
 * @param path 路径
 * @param data data
 * @returns
 */
export const doPutAction = ({ url, data }) => {
  return Taro.request({
    method: 'PUT',
    url: url,
    header: getHeader(),
    data: data,
    dataType: 'test',
  })
}

/**
 * delete 请求
 * @param path 路径
 * @param data data
 * @returns
 */
export const doDeleteAction = ({ url }) => {
  return Taro.request({
    method: 'DELETE',
    url: url,
    header: getHeader(),
    dataType: 'test',
  })
}

export const request = (options, url, data) => {
  const requestParams = {} as any
  requestParams.method = options
  requestParams.url = url
  requestParams.header = getHeader()
  requestParams.dataType = 'test'
  if (data) {
    requestParams.data = data
  }

  return new Promise((resolve, reject) => {
    Taro.request(requestParams)
      .then(async (res) => {
        const {
          data: { code },
        } = res

        const requestWithNewToken = async () => {
          if (!getToken) {
            reject()
            showMToast('您还未登录，请登录')
          } else {
            try {
              await userStore.updateToken()
              const datas = await request(options, url, data)
              resolve(datas)
            } catch (e) {
              reject(e)
            }
          }
        }

        if (code == SUCCESS) {
          resolve(res)
        } else if (UNAUTHORIZED.some((a) => a == code)) {
          /** 登录过期或者未登录 */
          await requestWithNewToken()
        } else {
          reject(res)
        }
      })
      .catch(() => {})
  })
}
