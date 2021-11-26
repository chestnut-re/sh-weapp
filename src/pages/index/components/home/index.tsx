import Taro from '@tarojs/taro'
import { View, Text, Button, Image, Input } from '@tarojs/components'
import { useStore } from '@/store/context'
import { observer } from 'mobx-react'
import { useRef, useState } from 'react'
import './index.less'
import place from '@/assets/img/home/vdizhi@2x.png'
import search from '@/assets/img/home/sousuo-2@2x.png'
/**
 * 首页
 */
const HomeScreen = (props) => {
  const { commonStore } = useStore()
  const [value, setValue] = useState('北京')
  const [f, setF] = useState('')
  const arr = [
    'https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=2209999056,1217794382&fm=26&gp=0.jpg',
    'https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=2418077635,996250637&fm=26&gp=0.jpg',
    'https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=2261944737,731173482&fm=26&gp=0.jpg',
    'https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=1874647665,1205912684&fm=26&gp=0.jpg',
    'https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=3152590946,2826023176&fm=26&gp=0.jpg',
    'https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=3975309943,373981693&fm=26&gp=0.jpg',
  ]
  //制造瀑布流单个元素
  const _madeImage = (str, index) => {
    return (
      <View className='.r-o' style='width:180px;'>
        <Image src={str} style='width:180px; height:100px' />
        {index % 2 == 0 ? (
          <View style='width:80px; height:100px'>哇啦啦啦</View>
        ) : (
          <View style='width:80px; height:50px'>啦啦</View>
        )}
      </View>
    )
  }
  const _getHeight = (nodes, childNodes) => {
    console.log(nodes, childNodes)
    //盛放每行高度的数组
    let heights = []
    nodes.forEach((item, index) => {
      //前两个为基准
      if (index < 2) {
        heights.push(item.height)
      } else {
        //查找最低高度然后放置最后改变最低高度过程
        let min = Math.min.apply(null, heights)
        let currentIndex = heights.indexOf(min)
        let x = nodes[currentIndex].left
        let y = min

        childNodes[index].style.position = 'absolute'

        childNodes[index].style.left = x - 10 + 'px'
        childNodes[index].style.top = y + 'px'

        heights[currentIndex] = min + item.height
      }
    })
  }

  const toscc = () => {
    //200毫秒后获取节点信息,避免取值为null
    setTimeout(() => {
      const query = Taro.createSelectorQuery()
      query
        .selectAll('.r-o')
        .boundingClientRect((res) => {
          // 第二个参数是通过ref获取到的瀑布流的每一个元素
          _getHeight(res, f.childNodes)
        })
        .exec()
    }, 200)
  }
  const toDemoPage = () => {
    Taro.navigateTo({ url: '/pages/demo/index' })
  }

  const toWebViewPage = () => {
    const url = decodeURIComponent('http://123.56.248.148/protocol/privacy')
    Taro.navigateTo({ url: `/pages/webview/index?url=${url}` })
  }

  return (
    <View className='HomeScreen__root'>
      <View className='home-header'>
        <View className='now-place'>
          <Text className='text'>{value}</Text>
          <Image className='place' src={place} />
        </View>
        <View className='search-input'>
          <Image className='search' src={search} />
          <Input type='text' placeholder='养殖基地直发海参' focus />
        </View>
      </View>
      <View className='home-body'>
        <View className='route'>大连路线站字符</View>
        <View className='swiper'>
          <View className='swiper-left'>
            <View className='select-route'>
              <View className='season'>当季</View>
              <View className='route-name'>甄选路线</View>
            </View>
            <View className='route-text'>丽江 + 大理 + 香格里拉</View>
            <View className='route-text'>双飞6日</View>
          </View>
          <View className='swiper-right'>
            <View className='right-top'>
              <View className='select-route'>
                <View className='now'>即刻</View>
                <View className='route-name'>就走游周边</View>
              </View>
              <View className='route-text'>古水北镇2日1晚 赏红叶</View>
            </View>
            <View className='right-bottom'>
              <View className='select-route'>
                <View className='local'>当地</View>
                <View className='route-name'>吃喝玩乐</View>
              </View>
              <View className='route-text'>古水北镇2日1晚 赏红叶</View>
            </View>
          </View>
        </View>
      </View>
      <View className='home-order'>
        <View className='order-text'>
          优惠 <Text className='red-text'>「福利」</Text>路线！
        </View>
        <View className='order'>立即下单</View>
      </View>
      <View className='scroll'>
        <View className='r-c'>
          <Text className='r-t' id='f'>
            为你推荐
          </Text>
          <View className='r-i' id='ri' ref={(v) => setF(v)} name='ww'>
            {arr.map((item, index) => {
              return _madeImage(item, index)
            })}
          </View>
        </View>
      </View>
      <Button onClick={toDemoPage}>跳转到 Demo1</Button>
      <Button onClick={toWebViewPage}>跳转到 WebView</Button>
      {/* <Button onClick={toscc}>获取瀑布流</Button> */}
      <Button
        onClick={() => {
          Taro.scanCode({}).then((res) => {
            console.log(res)
          })
        }}
      >
        扫码
      </Button>
    </View>
  )
}

export default observer(HomeScreen)
