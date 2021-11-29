import Taro from '@tarojs/taro'
import { View, Text, Image } from '@tarojs/components'
import { useStore } from '@/store/context'
import { Button } from '@taroify/core'
import { BullhornOutlined, SettingOutlined, Scan, Manager, InfoOutlined, Points } from '@taroify/icons'
import { observer } from 'mobx-react'
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
import './index.less'

const MineScreen = (props) => {
  const { commonStore } = useStore()
  console.log(commonStore)

  const toFist = () => {
    Taro.navigateBack()
  }
  const toLogin = () => {
    Taro.navigateTo({ url: '/pages/login/index' })
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

  const toFollowStore = () => {
    Taro.navigateTo({ url: '/pages/followStore/index' })
  }
  return (
    <View className='MineScreen__root'>
      <View className='Header__btn'>
        <View className='btn' onClick={toFist}>
          <Image className='img' src={lingdang} />
        </View>
        <View
          className='btn'
          onClick={() => {
            Taro.scanCode({}).then((res) => {
              console.log(res)
            })
          }}
        >
          <Image className='img' src={saoyisao} />
        </View>
        <View className='btn' onClick={toSetUp}>
          <Image className='img' src={shezhi} />
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
      <View>
        <View>
          <View>
            <View>乐享游玩中</View>
            <View>我在三亚游玩分享此刻</View>
          </View>
          <View>三亚5日自由行(5钻)·直减300『高星4晚连住』</View>
          <View>进度条</View>
          <View>
            <View>
              <Image className='img' src={jifen} />
              <View>团长</View>
              <View>赵大白</View>
            </View>
            <View>需要帮助？</View>
          </View>
        </View>
        <View>
          <View>
            <View></View>
            <View></View>
          </View>
          <View></View>
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
        <View className='item'>
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
    </View>
  )
}

export default observer(MineScreen)
