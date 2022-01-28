import { userStore, commonStore } from '@/store/context'
import qs from 'query-string'
/**
 * 解析 url 参数，返回对象
 * @param url url
 * @returns object
 */
export function getUrlParams(url: string): any {
  const parameters = {}

  url.replace(/[?&]+([^=&]+)=([^&]*)/gi, (m: string, key: any, value: any) => {
    parameters[key] = value
    return value
  })

  return parameters
}

/**
 * 拼接url
 */
export const generateUrl = (path: string): string => {
  const allParams = getUrlParams(window.location.href)
  const newParams = getUrlParams(path)
  return `${window.location.origin}${path.split('?')[0]}?${qs.stringify({ ...allParams, ...newParams })}`
}

/**
 * url 添加token
 */
export const dealWebViewURL = (url: string) => {
  const allParams = getUrlParams(url)
  const addParams = {
    t: userStore.accessToken,
    openId: userStore.openId,
    taskId: commonStore.taskId,
    source: commonStore.source,
  }

  if (userStore.openId) {
    addParams.openId = userStore.openId
  }

  if (userStore.taskId) {
    addParams.taskId = userStore.taskId
  }

  if (userStore.source) {
    addParams.source = userStore.source
  }

  return `${url.split('?')[0]}?${qs.stringify({ ...allParams, ...addParams })}`
}

/**
 * 获取url文件名字
 */

export const getUrlPath = (url: string): any => {
  const matches = url.match(/\/([^\/?#]+)[^\/]*$/) || []
  if (matches.length > 1) {
    return matches[1]
  }
  return null
}
