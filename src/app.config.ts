export default {
  pages: [
    'pages/home/index',
    'pages/msg/index',
    'pages/mine/index',
    'pages/login/index',
    'pages/pay/index',
    'pages/myOrder/index',
    'pages/usualMessage/index',
    'pages/resetPassword/index',
    'pages/verification/index',
    'pages/password/index',
    'pages/setPic/index',
    'pages/myData/index',
    'pages/location/index',
    'pages/setAutograph/index',
    'pages/setName/index',
    'pages/setPassword/index',
    'pages/pedestrian/index',
    'pages/myToken/index',
    'pages/setUp/index',
    'pages/search/index',
    'pages/aboutUs/index',
    'pages/traveler/index',
    'pages/feedBack/index',
    'pages/setSex/index',
    'pages/followStore/index',
    'pages/webview/index',
  ],
  tabBar: {
    custom: false,
    color: '#b4c1c0',
    selectedColor: '#4dcfc5',
    borderStyle: 'white',
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    list: [
      {
        pagePath: 'pages/home/index',
        iconPath: './assets/img/home/home.png',
        selectedIconPath: './assets/img/home/home-selected.png',
        text: '首页',
      },
      {
        pagePath: 'pages/msg/index',
        iconPath: './assets/img/home/message.png',
        selectedIconPath: './assets/img/home/message-selected.png',
        text: '消息',
      },
      {
        pagePath: 'pages/mine/index',
        iconPath: './assets/img/home/mine.png',
        selectedIconPath: './assets/img/home/mine-selected.png',
        text: '我的',
      },
    ],
    // usingComponents: {
    //   customtabbar: "custom-tab-bar/index"
    // }
  },
  subpackages: [
    {
      root: 'minePackage',
      name: 'mine',
      pages: ['pages/systemsNotice/index', 'pages/chat/index', 'pages/browse/index'],
    },
  ],
  window: {
    backgroundTextStyle: 'light',
    navigationBarBackgroundColor: '#fff',
    navigationBarTitleText: 'WeChat',
    navigationBarTextStyle: 'black',
  },
  permission: {
    'scope.userLocation': {
      desc: '获取定位设置用户当前城市',
    },
  },
}
