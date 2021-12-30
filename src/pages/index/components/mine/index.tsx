import Taro, { useDidShow, usePageScroll, useShareAppMessage } from '@tarojs/taro'
import { useStore } from '@/store/context'
import { Button, View, Text, Image, Canvas } from '@tarojs/components'
import { Steps, List, Popup } from '@taroify/core'
import { observer } from 'mobx-react'
import { useEffect, useState } from 'react'
import { getUrlParams } from '@/utils/webviewUtils'
import { showMToast } from '@/utils/ui'
import pic from '@/assets/img/common/shg.png'
import lingdang from '@/assets/img/mine/lingdang.png'
import saoyisao from '@/assets/img/mine/saoyisao.png'
import saoyisao1 from '@/assets/img/mine/saoyisao1.png'
import shezhi from '@/assets/img/mine/shezhi.png'
import shezhi1 from '@/assets/img/mine/shezhi1.png'
import myPhoto from '@/assets/img/mine/myphoto.png'
import jump from '@/assets/img/yjfk/jump.png'
import tishi from '@/assets/img/mine/tishi.png'
import liulan from '@/assets/img/mine/liulan.png'
import good from '@/assets/img/mine/good.png'
import map from '@/assets/img/mine/map.png'
import join from '@/assets/img/mine/join.png'
import renzheng from '@/assets/img/mine/renzheng.png'
import yhquan from '@/assets/img/mine/yhquan.png'
import cyxx from '@/assets/img/mine/cyxx.png'
import kefu from '@/assets/img/mine/kefu.png'
import wpey from '@/assets/img/mine/wpey.png'
import peying from '@/assets/img/mine/peying.png'
import overpey from '@/assets/img/mine/overpey.png'
import tuanzhang from '@/assets/img/mine/tuanzhang.png'
import qiandao from '@/assets/img/mine/qiandao.png'
import close from '@/assets/img/mine/close.png'
import db from '@/assets/img/mine/coin.png'
import store from '@/assets/img/mine/store.png'
import circle from '@/assets/img/mine/circle.png'
import weCat from '@/assets/img/mine/weCat.png'
import long from '@/assets/img/mine/long.png'
import link from '@/assets/img/mine/link.png'
import del from '@/assets/img/mine/del.png'
import { H5 } from '@/constants/h5'
import './index.less'

/**
 * 我的页面
 */
const MineScreen = () => {
  const { userStore } = useStore()
  const [hasMore, setHasMore] = useState(true)
  const [list, setList] = useState<any>([])
  const [loading, setLoading] = useState(false)
  const [scrollTop, setScrollTop] = useState(0)
  const [reachTop, setReachTop] = useState(true)
  const [open, setOpen] = useState(false)
  const [cityName, setCityName] = useState('奔赴山海')
  const [isShowCanvas, setIsShowCanvas] = useState(false)
  const [userInfo, setUserInfo] = useState({})
  useEffect(() => {}, [])
  const toFist = () => {
    // Taro.navigateBack()
  }
  const toMyOrder = () => {
    Taro.navigateTo({ url: '/pages/myOrder/index' })
  }
  const toMyToken = () => {
    showMToast('正在开发中')
    // Taro.navigateTo({ url: `/pages/webview/index?url=${encodeURIComponent('http://192.168.10.75:4000/test/page')}` })
    // Taro.navigateTo({ url: `/pages/webview/index?url=${H5.myToken}` })
  }
  const toSetUp = () => {
    Taro.navigateTo({ url: '/pages/setUp/index' })
  }
  const toMyData = () => {
    Taro.navigateTo({ url: '/pages/myData/index' })
  }
  const toMyBrowse = () => {
    Taro.navigateTo({ url: '/pages/myBrowse/index' })
  }
  const toMyLiked = () => {
    Taro.navigateTo({ url: '/pages/myLiked/index' })
  }
  const toUsual = () => {
    Taro.navigateTo({ url: '/pages/usualMessage/index' })
  }
  const toFollowStore = () => {
    Taro.navigateTo({ url: '/pages/followStore/index' })
  }
  const toReferenceRouter = () => {
    Taro.navigateTo({ url: `/pages/webview/index?url=${H5.referenceRouter}` })
  }
  const toMyTravel = () => {
    Taro.navigateTo({ url: `/pages/webview/index?url=${H5.myTravel}` })
  }
  usePageScroll(({ scrollTop: aScrollTop }) => {
    setScrollTop(aScrollTop)
    setReachTop(aScrollTop === 0)
  })

  useShareAppMessage((res) => {
    if (res.from === 'button') {
      // 来自页面内转发按钮
      console.log(res.target)
      if (res.target?.['id'] == 1) {
        return {
          title: `欢迎浏览${cityName}的名片哦！`,
          path: '/page/user?id=123',
        }
      }
    }
    return {
      title: ``,
      path: '',
    }
  })
  /**
   * getUserInfo() 获取用户信息
   */
  const getUserInfo = (e) => {
    setOpen(false)
    console.log(e)
    // if (!e.detail.userInfo) {
    //   Taro.showToast({
    //     title: '获取用户信息失败，请授权',
    //     icon: 'none',
    //   })
    //   return
    // }
    setIsShowCanvas(true)
    setUserInfo(e.detail.userInfo)
    drawImage()
    // this.setState({
    //   isShowCanvas: true,
    //   userInfo: e
    // }, () => {
    //   // 调用绘制图片方法
    //   this.drawImage()
    // })
  }
  /**
   * drawImage() 定义绘制图片的方法
   */
  const drawImage = async () => {
    // 创建canvas对象
    let ctx = Taro.createCanvasContext('cardCanvas')

    // 填充背景色
    let grd = ctx.createLinearGradient(0, 0, 1, 500)
    grd.addColorStop(0, '#1452d0')
    grd.addColorStop(0.5, '#FFF')
    ctx.setFillStyle(grd)
    ctx.fillRect(0, 0, 400, 500)

    // // 绘制圆形用户头像
    // let res = await Taro.downloadFile({
    //   url: userInfo.avatarUrl,
    // })
    ctx.save()
    ctx.beginPath()
    // ctx.arc(160, 86, 66, 0, Math.PI * 2, false)
    ctx.arc(160, 88, 66, 0, Math.PI * 2)
    ctx.closePath()
    ctx.clip()
    ctx.stroke()
    ctx.translate(160, 88)
    // ctx.drawImage(res.tempFilePath, -66, -66, 132, 132)
    ctx.drawImage(pic, -66, -66, 132, 132)
    ctx.restore()

    // 绘制文字
    ctx.save()
    ctx.setFontSize(20)
    ctx.setFillStyle('#FFF')
    // ctx.fillText(userInfo.nickName, 100, 200)
    ctx.fillText('userInfo.nickName', 100, 200)
    ctx.setFontSize(16)
    ctx.setFillStyle('black')
    ctx.fillText('已在胡哥有话说公众号打卡20天', 50, 240)
    ctx.restore()

    // 绘制二维码
    // let qrcode = await Taro.downloadFile({
    //   url: 'https://upload-images.jianshu.io/upload_images/3091895-f0b4b900390aec73.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/258/format/webp.jpg',
    // })
    // ctx.drawImage(qrcode.tempFilePath, 70, 260, 180, 180)
    ctx.drawImage('http://tmp/qyTPUoFI6l6W93ce354089ca55a6c318e3bf691cd256.jpeg', 70, 260, 180, 180)

    // 将以上绘画操作进行渲染
    ctx.draw()
  }
  /**
   * saveCard() 保存图片到本地
   */
  const saveCard = async () => {
    // 将Canvas图片内容导出指定大小的图片
    let res = await Taro.canvasToTempFilePath({
      x: 0,
      y: 0,
      width: 400,
      height: 500,
      destWidth: 360,
      destHeight: 450,
      canvasId: 'cardCanvas',
      fileType: 'png',
    })
    setIsShowCanvas(false)
    let saveRes = await Taro.saveImageToPhotosAlbum({
      filePath: res.tempFilePath,
    })
    if (saveRes.errMsg === 'saveImageToPhotosAlbum:ok') {
      Taro.showModal({
        title: '图片保存成功',
        content: '图片成功保存到相册了，快去发朋友圈吧~',
        showCancel: false,
        confirmText: '确认',
      })
    } else {
      Taro.showModal({
        title: '图片保存失败',
        content: '请重新尝试!',
        showCancel: false,
        confirmText: '确认',
      })
    }
  }
  /**
   * 用户点击右上角分享
   */
  // const onShareAppMessage = (res) => {
  //   if (res.from === 'button') {
  //     // 来自页面内转发按钮
  //     if (res.target.id == 1) {
  //       return {
  //         title: `欢迎浏览${cityName}的名片哦！`,
  //         path: `/pages/vein/card/card?id=${cityName}&typesgo=wo`,
  //       }
  //     }
  //     if (res.target.id == 2) {
  //       return {
  //         title: `欢迎浏览${cityName}的名片哦！`,
  //         path: `/pages/join_company/index?company_id=${cityName}&card_id=${cityName}`,
  //       }
  //     } else {
  //       return {
  //         title: '欢迎浏览我的名片哦！',
  //         path: 'pages/user/company/index',
  //       }
  //     }
  //   }
  // }
  return (
    <View className='MineScreen__root'>
      <View className='index'>
        {/* 使用Canvas绘制分享图片 */}
        {isShowCanvas && (
          <View className='canvas-wrap'>
            <Canvas
              id='card-canvas'
              className='card-canvas'
              style='width: 320px; height: 450px'
              canvasId='cardCanvas'
            ></Canvas>
            <Button onClick={saveCard} className='btn-save' type='primary' size='mini'>
              保存到相册
            </Button>
          </View>
        )}
      </View>

      <View className='Header__btn'>
        <View className='btn' onClick={toFist}>
          <Image className='img1' src={lingdang} />
        </View>
        <View
          className='btn'
          onClick={() => {
            Taro.scanCode({}).then((res) => {
              console.log(res)
              try {
                const params = getUrlParams(res.result)
                const d = JSON.parse(decodeURIComponent(params['data']))
                if (d.type === 'web') {
                  Taro.navigateTo({ url: `/pages/webview/index?url=${d['path']}` })
                } else {
                  showMToast('解析错误')
                }
              } catch (e) {
                console.log(e)
              }
            })
          }}
        >
          <Image className='img2' src={saoyisao1} />
        </View>
        <View className='btn' onClick={toSetUp}>
          <Image className='img3' src={shezhi1} />
        </View>
      </View>
      <View className='user' onClick={toMyData}>
        <View className='User__Img'>
          <Image className='img' src={userStore.userInfo?.pic} />
        </View>
        <View className='User__Name'>
          <View className='name'>{userStore.userInfo?.nickName}</View>
          <View className='autograph'>{userStore.userInfo?.personalSignature}</View>
        </View>
      </View>
      <View className='dolor' onClick={toMyToken}>
        {/* <View className='details'> */}
        <Image className='img-1' src={tishi} />
        {/* </View> */}
        <View className='token'>
          <View className='Token__Num'>{userStore?.totalAmount}</View>
          {/* <View className='Token__Img'> */}
          <Image className='img' src={db} />
          {/* </View> */}
        </View>
      </View>
      <View className='card'>
        <View className='Card__Item Card__Left' onClick={toMyBrowse}>
          <Image className='img' src={liulan} />
          <View>
            <View className='num'>125</View>
            <View className='text'>浏览</View>
          </View>
        </View>
        <View className='Card__Item' onClick={toMyLiked}>
          <Image className='img' src={good} />
          <View>
            <View className='num'>265</View>
            <View className='text'>点赞</View>
          </View>
        </View>
      </View>
      <View className='use-list'>
        <View className='item' onClick={toUsual}>
          <Image className='img' src={cyxx} />
          <View className='item-text'>常用信息</View>
        </View>
        <View className='item'>
          <Image className='img' src={kefu} />
          <View className='item-text'>专属客服</View>
        </View>
        <View className='item' onClick={toFollowStore}>
          <Image className='img' src={store} />
          <View className='item-text'>关注小店</View>
        </View>
        {/* <View className='item'>
          <Image className='img' src={join} />
          <View className='item-text'>邀请好友</View>
        </View> */}
        {/* <View className='item'>
          <Image className='img' src={renzheng} />
          <View className='item-text'>学生认证</View>
        </View>
        <View className='item'>
          <Image className='img' src={yhquan} />
          <View className='item-text'>优惠券</View>
        </View>
        <View className='item'>
          <Image className='img' src={map} />
          <View className='item-text'>游记地图</View>
        </View>
        <View className='item' onClick={() => setOpen(true)}>
          <Image className='img' src={map} />
          <View className='item-text'>分享</View>
        </View> */}
      </View>
      {/* <View className='travel' onClick={toMyTravel}>
        <View className='travel-title'>
          <View className='my'>我的行程</View>
          <View className='all'>
            全部行程 <Image className='img' src={jump} />
          </View>
        </View>
        <View className='travel-text'>
          <Image className='img' src={pic} />
          <View className='trip'>
            <View className='one'>三亚5日自由行(5钻)·直减300『高星4…</View>
            <View className='two'>本次行程已开始，祝您旅途愉快</View>
          </View>
        </View>
      </View> */}
      <View className='my-order'>
        <View className='order-tab'>
          <View className='tab'>我的订单</View>
          <View className='all-order' onClick={toMyOrder}>
            全部订单
            <Image className='img' src={jump} />
          </View>
        </View>
        <View className='order-type'>
          <View className='red-body' onClick={toMyOrder}>
            <Image src={wpey} />
            <View>待付款</View>
            {/* <View className='red-num'>2</View> */}
          </View>
          <View className='sec' onClick={toMyOrder}>
            <Image src={peying} />
            <View>待核销</View>
          </View>
          <View onClick={toMyOrder}>
            <Image src={overpey} />
            <View>已完成</View>
          </View>
        </View>
      </View>
      {/* <View className='play-game' onClick={toReferenceRouter}>
        <View className='trip'>
          <View className='header'>
            <View className='happy'>乐享游玩中</View>
            <View className='share'>我在三亚游玩分享此刻</View>
          </View>
          <View className='play-name'>三亚5日自由行(5钻)·直减300『高星4晚连住』</View>
          <View className='step'>
            <Steps className='custom-color' value={2} alternativeLabel>
              <Steps.Step>第一天</Steps.Step>
              <Steps.Step>第二天</Steps.Step>
              <Steps.Step>第三天</Steps.Step>
              <Steps.Step>第四天</Steps.Step>
              <Steps.Step>第五天</Steps.Step>
            </Steps>
          </View>
          <View className='commander'>
            <View>
              <Image className='img' src={tuanzhang} />
              <Text className='call'>团长</Text>
              <View className='name'>赵大白</View>
            </View>
            <View className='help'>需要帮助？</View>
          </View>
        </View>
        <View className='date'>
          <View>
            <View className='time'>8:30集合</View>
            <View className='place'>亚特兰蒂斯酒店大堂</View>
          </View>
          <Image className='img' src={qiandao} />
        </View>
      </View>
      <View className='join-team'>
        <View className='close'>
          <View>
            <Text>我知道了</Text>
            <Image className='img' src={close} />
          </View>
        </View>
        <View className='join'>
          <Image className='img' src={pic} />
          <View>
            <View className='ontext'>三亚5日自由行(5钻)·直减300『高星4晚连住...</View>
            <View className='untext'>已成团，将于2021/10/22出发</View>
          </View>
        </View>
      </View>
      <View className='order-list'>
        <List
          loading={loading}
          hasMore={hasMore}
          scrollTop={scrollTop}
          onLoad={() => {
            setLoading(true)
            setTimeout(() => {
              for (let i = 0; i < 10; i++) {
                const text = list.length + 1
                list.push(text < 10 ? '0' + text : String(text))
              }
              setList([...list])
              setHasMore(list.length < 40)
              setLoading(false)
            }, 1000)
          }}
        >
          {list.map((item) => (
            <View className='item' key={item}>
              <View className='order-card'>
                <View className='content'>
                  <Image className='img' src={pic} />
                  <View className='name'>
                    三亚5日自由行(5钻)·直减300「高 星4晚连住...
                    <View className='small-name'>
                      <View>2021/10/22出发</View>
                      <View>
                        <Text>成人X2</Text> <Text>儿童X2</Text>
                      </View>
                    </View>
                  </View>
                </View>
                <View className='price'>
                  <View className='discount'>已优惠¥200</View>
                  <View>
                    共计<Text className='money'>¥5798</Text>
                  </View>
                </View>
                <View className='message'>
                  <View className='message-one'>咨询</View>
                  <View className='message-two'>去支付</View>
                </View>
              </View>
            </View>
          ))}
        </List>
      </View>
      <Popup className='popup' open={open} rounded placement='bottom'>
        <View className='popup-title'>
          <View>分享给TA 一起嗨玩</View>
          <Image className='del' src={del} onClick={() => setOpen(false)} />
        </View>
        <View className='popup-select'>
          <Button openType='share' plain id='1'>
            <Image src={weCat} />
            <View>微信</View>
          </Button>
          <Button openType='share' plain id='2'>
            <Image src={circle} />
            <View>朋友圈</View>
          </Button>
          <Button openType='share' plain id='3'>
            <Image src={link} />
            <View>链接</View>
          </Button>
          <Button onGetUserInfo={getUserInfo} openType='getUserInfo' plain id='4'>
            <Image src={long} />
            <View>长图</View>
          </Button>
        </View>
        <View className='btn'>取消</View>
      </Popup> */}
    </View>
  )
}

export default observer(MineScreen)
