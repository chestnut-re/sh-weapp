import WebIM from './WebIM'
/**
 * 环信用户名密码登录
 * @param { string } user
 * @param { string } pwd
 */

export const imLogin = (user: string, pwd: string) => {
  let options = {
    user: user,
    pwd: pwd,
    appkey: WebIM.config.appkey,
    success: function (res) {
      console.log('res', res)
    },
    error: function (err) {
      console.log('res', err)
    },
  }
  WebIM.conn.open(options)
}

/**
 * 环信token登录
 * @param { Object } params
 */

export const imToken = (params: any) => {
  const options = {
    user: params.user,
    accessToken: params.token,
    appKey: WebIM.config.appkey,
  }
  WebIM.conn.open(options)
}

/**
 * 发送消息
 */

export const sendMsg = (msgTxt: string, uesrName: string, callBack) => {
  let id = WebIM.conn.getUniqueId() // 生成本地消息id
  let msg = new WebIM.message('txt', id) // 创建文本消息
  msg.set({
    msg: msgTxt, // 消息内容
    to: uesrName, // 接收消息对象（用户id）
    chatType: 'singleChat', // 设置为单聊
    success: function (ids, serverMsgId) {
      console.log('发送消息成功', ids, serverMsgId)
      callBack(ids, serverMsgId)
    },
    fail: function (e) {
      console.log('Send private text error', e)
    },
  })
  WebIM.conn.send(msg.body).catch((err) => {
    console.log('err', err)
  })
}
