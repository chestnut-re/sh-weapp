
import Taro, { usePageScroll, useDidShow } from '@tarojs/taro'
import { View, ScrollView, Text } from '@tarojs/components'
import { observer } from 'mobx-react'
import { useState, useRef, useEffect } from 'react'

import { LikeService } from '@/service/Like'
import Img from '@/components/Img'
import { H5 } from '@/constants/h5'
import NoDataView from '@/components/noDataView'
import { getMyDate, filterCurDate } from '@/utils/date'

import './index.less'

let pageIndex = 1;
const BrowsePage = () => {
  const [type, setType] = useState() as any

  const [loading, setLoading] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasMores, setHasMores] = useState(false);
  const [goodsList, setGoodsList] = useState<any[]>([])



  useEffect(() => {
    const { router } = Taro.getCurrentInstance()
    const from = router?.params.from
    setType(from)
    Taro.setNavigationBarTitle({
      title: from == '1' ? '我的点赞' : '我的浏览'
    })
    pullDownRefresh();
  }, [])

  const getPageData = async (pIndex = pageIndex) => {
    if (pIndex === 1) setIsLoaded(false);
    const { router } = Taro.getCurrentInstance()
    const from = router?.params.from
    const {
      data: { data }
    } = await LikeService.likeList(from, pIndex)
    setLoading(false)
    return { list: data.records, hasMore: data.total > pIndex * 10 ? true : false, isLoaded: pIndex === 1 };
  }

  const onScrollToLower = async () => {
    if (!hasMores) return
    const { list, hasMore, isLoaded } = await getPageData(++pageIndex);
    setGoodsList(goodsList.concat(list))
    setHasMores(hasMore)
    setIsLoaded(isLoaded)
  };

  const pullDownRefresh = async () => {
    setLoading(true)
    pageIndex = 1;
    const res = await getPageData(1);
    setHasMores(res.hasMore)
    setGoodsList(res.list)
    setIsLoaded(res.isLoaded)
  };

  const anOrder = (e) => {
    const l = `${H5.goodsDetail}?id=${e.goodsId}&goodsPriceId=${e.goodsPriceId}&isRebate=${e.isRebate}&isPurchase=${e.isPurchase}&isPurchaseAdd=${e.isPurchaseAdd}&tagCity=${e.departureCity}&tapInfo=${e.goodsTypeTag}`
    Taro.navigateTo({ url: `/pages/webview/index?url=${encodeURIComponent(l)}` })
  }
  return (
    <View className='MyBrowsePage__root'>
      <ScrollView
        className='browse-scroll'
        scrollY
        scrollWithAnimation
        refresherEnabled
        refresherTriggered={loading}
        onRefresherRefresh={pullDownRefresh}
        onScrollToLower={onScrollToLower}
      >
        <View className='browseView'>
          {goodsList.length > 0 ? (
            goodsList.map((item, index) => (
              <View onClick={() => { anOrder(item) }} className='item' key={item['goodsId']}>
                {index == 0 ? (
                  <View className='date'>{filterCurDate(getMyDate(item['createTime'])) || '2022/00/00'}</View>
                ) : (
                  filterCurDate(getMyDate(goodsList[index].createTime)) != filterCurDate(getMyDate(goodsList[index - 1].createTime)) ? (
                    <View className='date'>{filterCurDate(getMyDate(item['createTime'])) || '2022/00/00'}</View>
                  ) : (
                    null
                  )
                )}
                <View className='card'>
                  {item['state'] == 3 ? <View className='no-jump'>已下架</View> : null}
                  <View className='jumpView'>
                    <Img
                      url={item['promotionalImageUrl']}
                      className='jump'
                    />
                  </View>
                  <View className={item['state'] == 3 ? 'no-right-all' : 'right-all'}>
                    <View className='text'>{item['goodsName']}</View>
                    <View className='money'>{`¥ ${item['personCurrentPrice'] / 100}`}</View>
                    <View className='shopInfo'>
                      <View className='shopHead'>
                        <Img
                          url={item['shopHeadUrl']}
                          className='shopHeadImg'
                        />
                      </View>
                      <Text className='shopName'>{item['shopName'] || '暂无'}</Text>
                    </View>
                  </View>
                </View>
              </View>
            ))
          ) : (
            !loading && (
              <NoDataView
                text={type == '1' ? '亲，还没有点赞商品记录哦～' : '亲，还没有浏览商品记录哦~'}
              />
            )
          )}
        </View>

      </ScrollView>
    </View>
  )
}

export default observer(BrowsePage)
