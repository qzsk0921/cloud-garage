import {
  login,
  getUserDetail
} from './api/user.js'
import userStore from './store/user-store.js'

import store from './store/common'


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
          userStore.getUserDetail()
        })
      }).catch(err => {
        console.log(err)
      })
      return false
    }

    this.init()
  },
  init() {
    // this.getSystemInfo()

    // userStore.bind('appPage', this)
    // userStore.getUserDetail()
    getUserDetail().then(res=>{
      this.globalData.userInfo = res.data
      store.data.userInfo = res.data
      store.update()
    })
    // 全局分享
    this.onShareAppMessage()
  },

  // getSystemInfo() {
  //   wx.getSystemInfo().then(res => {
  //     // console.log(res)
  //     setTimeout(function () {
  //       store.data.systemInfo = res
  //       store.data.navHeight = res.statusBarHeight + store.data.menuButtonObject.height + (store.data.menuButtonObject.top - res.statusBarHeight) * 2
  //       store.update()
  //     }, 100)

  //     // this.navHeight = res.statusBarHeight + this.menuButtonObject.height + (this.menuButtonObject.top - res.statusBarHeight) * 2
  //   }).catch(err => {
  //     console.log(err)
  //   })
  // },
  /**
   * 设置监听器
   */
  setWatcher(page) { // 接收index.js传过来的data对象和watch对象
    let data = page.data;
    let watch = page.watch;
    Object.keys(watch).forEach(v => {
      let key = v.split('.'); // 将watch中的属性以'.'切分成数组
      let nowData = data; // 将data赋值给nowData
      for (let i = 0; i < key.length - 1; i++) { // 遍历key数组的元素，除了最后一个！
        nowData = nowData[key[i]]; // 将nowData指向它的key属性对象
      }
      let lastKey = key[key.length - 1];
      // 假设key==='my.name',此时nowData===data['my']===data.my,lastKey==='name'
      let watchFun = watch[v].handler || watch[v]; // 兼容带handler和不带handler的两种写法
      let deep = watch[v].deep; // 若未设置deep,则为undefine
      this.observe(nowData, lastKey, watchFun, deep, page); // 监听nowData对象的lastKey
    })
  },

  /**
   * 监听属性 并执行监听函数
   */
  observe(obj, key, watchFun, deep, page) {
    var val = obj[key];
    // 判断deep是true 且 val不能为空 且 typeof val==='object'（数组内数值变化也需要深度监听）
    if (deep && val != null && typeof val === 'object') {
      Object.keys(val).forEach(childKey => { // 遍历val对象下的每一个key
        this.observe(val, childKey, watchFun, deep, page); // 递归调用监听函数
      })
    }
    var that = this;
    Object.defineProperty(obj, key, {
      configurable: true,
      enumerable: true,
      set: function (value) {
        // 用page对象调用,改变函数内this指向,以便this.data访问data内的属性值
        watchFun.call(page, value, val); // value是新值，val是旧值
        val = value;
        if (deep) { // 若是深度监听,重新监听该对象，以便监听其属性。
          that.observe(obj, key, watchFun, deep, page);
        }
      },
      get: function () {
        return val;
      }
    })
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
  // getUserDetail() {
  //   return new Promise((resolve, reject) => {
  //     getUserDetail().then(res => {
  //       console.log('app 用户信息')
  //       //可能会在 Page.onLoad 之后才返回 所以此处加入 callback 以防止这种情况
  //       if (this.userDetailReadyCallback) {
  //         console.log('app userDetailReadyCallback')
  //         this.userDetailReadyCallback(res)
  //       } else {
  //         console.log('app no userDetailReadyCallback')
  //         this.globalData.userInfo = res.data
  //         console.log('cannot set property userInfo of undefined')
  //       }
  //       resolve(res)
  //     }).catch(res => {
  //       console.log(res)
  //       reject(res)
  //     })
  //   })
  // },
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