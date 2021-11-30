import Taro, { usePageScroll, useReachBottom } from '@tarojs/taro'
import { View, Text, Image } from '@tarojs/components'
import { useStore } from '@/store/context'
import { Button, Steps, List, Loading, PullRefresh } from '@taroify/core'
import { observer } from 'mobx-react'
import { useRef, useState } from 'react'
import pic from '@/assets/img/common/shg.png'
import lingdang from '@/assets/img/mine/lingdang.png'
import saoyisao from '@/assets/img/mine/saoyisao.png'
import shezhi from '@/assets/img/mine/shezhi.png'
import myPhoto from '@/assets/img/mine/myphoto.png'
import jifen from '@/assets/img/mine/jifen.png'
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
import './index.less'

const MineScreen = (props) => {
  const { commonStore } = useStore()
  console.log(commonStore)
  const [hasMore, setHasMore] = useState(true)
  const [list, setList] = useState<string[]>([])
  const [loading, setLoading] = useState(false)
  const refreshingRef = useRef(false)
  const [scrollTop, setScrollTop] = useState(0)
  const [reachTop, setReachTop] = useState(true)

  const toFist = () => {
    Taro.navigateBack()
  }
  const toMyOrder = () => {
    Taro.navigateTo({ url: '/pages/myOrder/index' })
  }
  const toMyToken = () => {
    Taro.navigateTo({ url: '/pages/myToken/index' })
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
  usePageScroll(({ scrollTop: aScrollTop }) => {
    setScrollTop(aScrollTop)
    setReachTop(aScrollTop === 0)
  })
  const onLoad = () => {
    setLoading(true)
    const newList = refreshingRef.current ? [] : list
    setTimeout(() => {
      refreshingRef.current = false
      for (let i = 0; i < 10; i++) {
        const text = newList.length + 1
        newList.push(text < 10 ? '0' + text : String(text))
      }
      setList(newList)
      setLoading(false)
      setHasMore(newList.length < 40)
    }, 1000)
  }

  function onRefresh() {
    refreshingRef.current = true
    setLoading(false)
    onLoad()
  }
  return (
    <View className='MineScreen__root'>
      <View className='Header__btn'>
        <View className='btn' onClick={toFist}>
          <Image className='img1' src={lingdang} />
        </View>
        <View
          className='btn'
          onClick={() => {
            Taro.scanCode({}).then((res) => {
              console.log(res)
            })
          }}
        >
          <Image className='img2' src={saoyisao} />
        </View>
        <View className='btn' onClick={toSetUp}>
          <Image className='img3' src={shezhi} />
        </View>
      </View>
      <View className='user' onClick={toMyData}>
        <View className='User__Img'>
          <Image className='img' src={myPhoto} />
        </View>
        <View className='User__Name'>
          <Text className='name'>丛林迷雾</Text>
          <Text className='autograph'>天空分外晴朗,白云也绽露笑容</Text>
        </View>
      </View>
      <View className='dolor' onClick={toMyToken}>
        <View className='details'>
          <Image className='img' src={tishi} />
        </View>
        <View className='token'>
          <View className='Token__Img'>
            <Image className='img' src={jifen} />
          </View>
          <Text className='Token__Num'>2800</Text>
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
        <View className='item'>
          <Image className='img' src={map} />
          <View className='item-text'>游记地图</View>
        </View>
        <View className='item'>
          <Image className='img' src={join} />
          <View className='item-text'>邀请好友</View>
        </View>
        <View className='item'>
          <Image className='img' src={renzheng} />
          <View className='item-text'>学生认证</View>
        </View>
        <View className='item'>
          <Image className='img' src={yhquan} />
          <View className='item-text'>优惠券</View>
        </View>
        <View className='item' onClick={toUsual}>
          <Image className='img' src={cyxx} />
          <View className='item-text'>常用信息</View>
        </View>
        <View className='item'>
          <Image className='img' src={kefu} />
          <View className='item-text'>专属客服</View>
        </View>
        <View className='item' onClick={toFollowStore}>
          <Image className='img' src={kefu} />
          <View className='item-text'>关注小店</View>
        </View>
      </View>
      <View className='play-game'>
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
      <View className='my-order'>
        <View className='order-tab'>
          <View className='tab'>我的订单</View>
          <View className='all-order' onClick={toMyOrder}>
            全部订单
            <Image className='img' src={tishi} />
          </View>
        </View>
        <View className='order-list'>
          <View onClick={toMyOrder}>
            <Image src={wpey} />
            <View>待支付</View>
          </View>
          <View className='sec' onClick={toMyOrder}>
            <Image src={peying} />
            <View>进行中</View>
          </View>
          <View onClick={toMyOrder}>
            <Image src={overpey} />
            <View>已完成</View>
          </View>
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
        <List loading={loading} hasMore={hasMore} onLoad={onLoad}>
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
                  {/* <View className='message-one'>分享给TA</View> */}
                  <View className='message-two'>去支付</View>
                </View>
              </View>
            </View>
          ))}
          {!refreshingRef.current && (
            <List.Placeholder>
              {loading && <Loading>加载中...</Loading>}
              {!hasMore && '没有更多了'}
            </List.Placeholder>
          )}
        </List>
      </View>
    </View>
  )
}

export default observer(MineScreen)
