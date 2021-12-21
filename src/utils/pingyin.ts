import { pinyin } from 'pinyin-pro'

/**
 * 获取文字首字母
 */
export const getFirstPingYin = (value: string) => {
  const ret = pinyin(value, { pattern: 'first', toneType: 'none' })
  return ret[0].toUpperCase()
}
