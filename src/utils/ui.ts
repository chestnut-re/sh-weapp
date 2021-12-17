import Taro from '@tarojs/taro'

/**
 * 显示 Loading
 */
export function showLoading() {
  Taro.showLoading()
}

/**
 * 隐藏 Loading
 */
export function hideLoading() {
  Taro.hideLoading()
}

/**
 * 显示消息弹框
 */
export function showMsgDialog(title, msg) {
  Taro.showModal({
    title: title,
    content: msg,
    showCancel: false,
    success: function (res) {
      if (res.confirm) {
        console.log('用户点击确定')
      } else if (res.cancel) {
        console.log('用户点击取消')
      }
    },
  })
}

/**
 * 显示消息弹框
 */
export function showDialog(title, msg, onSuccess) {
  Taro.showModal({
    title: title,
    content: msg,
    showCancel: true,
    success: function (res) {
      if (res.confirm) {
        onSuccess && onSuccess()
        console.log('用户点击确定')
      } else if (res.cancel) {
        console.log('用户点击取消')
      }
    },
  })
}

/**
 * Toast
 * @param {string} content 内容
 */
function showMToast(content) {
  Taro.showToast({
    title: content,
    duration: 2000,
    icon: 'none', //'loading', //'success'、'loading'、'none'
    mask: false,
    // image: '图片路径/图片对象',
  })
}
