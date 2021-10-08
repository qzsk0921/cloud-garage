import {
  login,
  getUserDetail
} from './api/user.js'
// app.js
App({
  onLaunch() {
    const token = wx.getStorageSync('token')
    if (!token) {
      wx.login().then(res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        // console.log(res)
        this.login({
          code: res.code
        }).then(res => {
          wx.setStorageSync('token', res.data.token)
          // this.getUserDetail()
        })
      }).catch(err => {
        console.log(err)
      })
      return false
    }

    this.getUserDetail()
    this.init()
    // 全局分享
    this.onShareAppMessage()
  },
  init() {
    
  },
  onShareAppMessage() {
    wx.onAppRoute((e) => {
      // console.log(e)
      // console.log('当前页面路由发生变化 触发该事件onShareAppMessage')
      const pages = getCurrentPages() //获取加载的页面
      const view = pages[pages.length - 1] //获取当前页面的对象
      if (!view) return false //如果不存在页面对象 则返回
      // 若想给个别页面做特殊处理 可以给特殊页面加isOverShare为true 就不会重写了
      const data = view.data
      if (!data.isOverShare) {
        // data.isOverShare = true
        view.onShareAppMessage = () => { //重写分享配置
          return {
            title: '私域裂变，优质优效',
            path: '/src/pages/home/home', //若无path 默认跳转分享页
            imageUrl: '/src/assets/images/dbe4ac31f9827a60af3afa3ef7e7c01.png', //若无imageUrl 截图当前页面
            success(res) {
              console.log('分享成功', res)
            },
            fail(res) {
              console.log(res)
            }
          }
        }
      }
    })
  },
  getUserDetail() {
    return new Promise((resolve, reject) => {
      getUserDetail().then(res => {
        console.log('app 用户信息')
        //可能会在 Page.onLoad 之后才返回 所以此处加入 callback 以防止这种情况
        if (this.userDetailReadyCallback) {
          console.log('app userDetailReadyCallback')
          this.userDetailReadyCallback(res)
        } else {
          console.log('app no userDetailReadyCallback')
          this.globalData.userInfo = res.data
          console.log('cannot set property userInfo of undefined')
        }
        resolve(res)
      }).catch(res => {
        console.log(res)
        reject(res)
      })
    })
  },
  login(data) {
    return new Promise((resolve, reject) => {
      login(data).then(res => {
        resolve(res)
      }).catch(err => {
        reject(err)
      })
    })
  },
  globalData: {
    userInfo: null,
    // settingInfo: null, //微信设置信息 settingInfo.authSetting['scope.userInfo'](微信已授权)
    // menuButtonObject: wx.getMenuButtonBoundingClientRect(), //按钮（右上角胶囊按钮）的布局位置信息
    // systemInfo: null, //systemInfo system:'ios'||'android',
    // navHeight: null, //顶部导航栏高度
    qnUrl: 'https://sharepuls.xcmbkj.com/',
    // tabbarHeight: null,
    defaultCity: '全国'
  }
})