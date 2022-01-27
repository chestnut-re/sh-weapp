import Taro, { useDidShow, usePageScroll, useTabItemTap } from '@tarojs/taro'
import { useStore } from '@/store/context'
import { ScrollView, View, Text, Image, Canvas } from '@tarojs/components'
import { observer } from 'mobx-react'
import { useEffect, useState } from 'react'
import { getUrlParams, getUrlPath } from '@/utils/webviewUtils'
import { showMToast } from '@/utils/ui'
import pic from '@/assets/img/common/shg.png'

import shezhi from '@/assets/img/mine/shezhi.png'

import jump from '@/assets/img/yjfk/jump.png'
import tishi from '@/assets/img/mine/tishi.png'
import liulan from '@/assets/img/mine/liulan.png'
import good from '@/assets/img/mine/good.png'

import cyxx from '@/assets/img/mine/cyxx.png'
import kefu from '@/assets/img/mine/kefu.png'
import wpey from '@/assets/img/mine/wpey.png'
import peying from '@/assets/img/mine/peying.png'
import overpey from '@/assets/img/mine/overpey.png'

import db from '@/assets/img/mine/coin.png'
import store from '@/assets/img/mine/store.png'

import { H5 } from '@/constants/h5'

import ShareView from '@/components/shareView'
import LongImgView from '@/components/longImgView'
import './index.less'
import { MyOrderService } from '@/service/MyOrderService'
import { RMB_CON } from '@/utils/price'
/**
 * 我的页面
 */
const MineScreen = () => {
  const { userStore, commonStore } = useStore()
  const [open, setOpen] = useState(false)
  const [cityName, setCityName] = useState('奔赴山海')
  const [isShowCanvas, setIsShowCanvas] = useState(false)

  const [userInfo, setUserInfo] = useState({})


  const [isShowLongImg, setIsShowLongImg] = useState(false)
  const [image, setImage] = useState('')

  const [orderCount, setOrderCount] = useState({})

  const picture =
    'https://shanhai-shoping.oss-cn-beijing.aliyuncs.com/img/user/pic/cd2d77f5983f44c5b6e20c313e12d26e.jpg'
  useEffect(() => {
    if (userStore.isBindMobile) {
      userStore.getMineInfo()
      getQuerySortOrderCount()
    }
  }, [])

  useTabItemTap(item => {
    if (!userStore.isBindMobile) {
      // 未登录
      Taro.redirectTo({ url: '/pages/login/index' })
      return
    }
  })

  const getQuerySortOrderCount = () => {
    MyOrderService.querySortOrderCount().then((res) => {
      const { data: { data } } = res
      if (data) {
        setOrderCount(data)
      }
      console.log('res data data data data', data)
    })
  }


  const toFist = () => {
    // Taro.navigateBack()
  }
  const toMyOrder = (type) => {
    Taro.navigateTo({ url: `/pages/myorder/index?type=${type}` })
  }
  const toMyToken = () => {
    if (userStore?.totalAmount > 0) {
      Taro.navigateTo({ url: `/pages/webview/index?url=${encodeURIComponent(H5.myToken)}` })
    }
  }

  const toMyTokenExplain = (e) => {
    e.stopPropagation();
    Taro.navigateTo({ url: `/pages/webview/index?url=${encodeURIComponent(H5.beansExplain)}` })
  }

  const toSetUp = () => {
    Taro.navigateTo({ url: '/pages/setUp/index' })
  }
  const toMyData = () => {
    Taro.navigateTo({ url: '/pages/myData/index' })
  }

  /**
   * 点赞列表或浏览列表
   * @param from 1 点赞 2 分享
   */

  const onLikeOrBrowse = (from) => {
    Taro.navigateTo({ url: `/minePackage/pages/browse/index?from=${from}` })

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
    console.log('res', res)
    if (res.errMsg == 'canvasToTempFilePath:ok') {
      setImage(res.tempFilePath)
    }

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

  const startDrawImg = async () => {
    setOpen(false)
    await drawImage()
    setIsShowLongImg(true)

    // setIsShowCanvas(true)
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

  const onScanCode = () => {
    // 判断是否登录，没有登录先去登录
    if (!userStore.isBindMobile) {
      // 未登录
      Taro.navigateTo({ url: '/pages/login/index' })
      return
    }
    Taro.scanCode({}).then((res) => {
      try {
        const params = getUrlParams(res.result)
        const d = JSON.parse(decodeURIComponent(params['data']))
        if (d.type === 'web') {
          Taro.navigateTo({ url: `/pages/webview/index?url=${encodeURIComponent(d['path'])}` })
        } else {
          showMToast('请扫描店铺二维码')
        }
      } catch (e) {
        console.log(e)
      }
    })
  }

  return (
    <View className='MineScreen__root'>
      <View className='index'>
        <Canvas
          id='card-canvas'
          className='card-canvas'
          style='width: 320px; height: 450px; position:fixed; left:100%'
          canvasId='cardCanvas'
        ></Canvas>
      </View>
      <ScrollView className='mineScroll' scrollY scrollWithAnimation >
        <ShareView
          onLongImg={startDrawImg}
          copyLink='23123123123'
          onClose={() => {
            setOpen(false)
          }}
          open={open}
        />
        <LongImgView
          open={isShowLongImg}
          imgUrl={image}
          onClose={() => {
            setIsShowLongImg(false)
          }}
        />
        {/* <View className='Header__btn'>
          <View className='btn' onClick={toFist}>
            <Image className='img1' src={lingdang} />
          </View>
          <View
            className='btn'
            onClick={() => {
              onScanCode()
            }}
          >
            <Image className='img2' src={saoyisao1} />
          </View>
          <View className='btn' onClick={toSetUp}>
            <Image className='img3' src={shezhi1} />
          </View>
        </View> */}
        <View className='user' onClick={toMyData}>
          <View className='User__Img'>
            <Image className='img' src={userStore.userInfo?.pic ?? picture} />
          </View>
          <View className='User__Name'>
            <View className='name'>{userStore.userInfo?.nickName}</View>
            <View className='autograph'>{userStore.userInfo?.personalSignature}</View>
          </View>
        </View>
        <View className='dolor' onClick={toMyToken}>
          <View className='myTokenView'>
            <Text className='txt'>我的乐豆</Text>
            <Image onClick={toMyTokenExplain} className='img' src={tishi} />
          </View>
          <View className='myTokenNum'>
            <View className='Token__Num'>{RMB_CON(userStore?.totalAmount)}</View>
            <Image className='img' src={db} />
          </View>
        </View>
        <View className='card'>
          <View className='Card__Item Card__Left' onClick={() => onLikeOrBrowse(2)}>
            <Image className='img' src={liulan} />
            <View>
              <View className='num'>{userStore.browseNum}</View>
              <View className='text'>浏览</View>
            </View>
          </View>
          <View className='Card__Item' onClick={() => onLikeOrBrowse(1)}>
            <Image className='img' src={good} />
            <View>
              <View className='num'>{userStore.likeNum}</View>
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
          <View className='item' onClick={toSetUp}>
            <Image className='img' src={shezhi} />
            <View className='item-text'>设置中心</View>
          </View>
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
            <View
              className='all-order'
              onClick={() => {
                toMyOrder(0)
              }}
            >
              全部订单
              <Image className='img' src={jump} />
            </View>
          </View>
          <View className='order-type'>
            <View
              className='red-body'
              onClick={() => {
                toMyOrder(1)
              }}
            >
              <Image src={wpey} />
              <View>待付款</View>
              {orderCount['unpaidCountNum'] && orderCount['unpaidCountNum'] > 0 ? (
                <View className='red-num'>{orderCount['unpaidCountNum']}</View>
              ) : (null)}
            </View>
            <View
              className='sec red-body'
              onClick={() => {
                toMyOrder(2)
              }}
            >
              <Image src={peying} />
              <View>待核销</View>
              {orderCount['unconfirmedCountNum'] && orderCount['unconfirmedCountNum'] > 0 ? (
                <View className='red-num'>{orderCount['unconfirmedCountNum']}</View>
              ) : (null)}

            </View>
            <View
              className='red-body'
              onClick={() => {
                toMyOrder(3)
              }}
            >
              <Image src={overpey} />
              <View>已完成</View>
              {orderCount['completedCountNum'] && orderCount['completedCountNum'] > 0 ? (
                <View className='red-num'>{orderCount['completedCountNum']}</View>
              ) : (null)}
            </View>
          </View>
        </View>

      </ScrollView>
    </View>
  )
}

export default observer(MineScreen)
