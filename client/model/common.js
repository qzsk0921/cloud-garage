const { common } = require("../store/common-store")

class Common {
  constructor(option) {
    this.settingInfo = {} //微信设置信息 settingInfo.authSetting['scope.userInfo'](微信已授权)
    this.menuButtonObject = wx.getMenuButtonBoundingClientRect() //按钮（右上角胶囊按钮）的布局位置信息
    this.systemInfo = null //systemInfo system:'ios'||'android',
    this.navHeight = 0 //顶部导航栏高度
    // tabbarHeight: null,
    this.getSystemInfo()
  }

  getSystemInfo() {
    wx.getSystemInfo().then(res => {
      console.log(res)
      this.systemInfo = res
      this.navHeight = res.statusBarHeight + this.menuButtonObject.height + (this.menuButtonObject.top - res.statusBarHeight) * 2
    }).catch(err => {
      console.log(err)
    })
  }
}

module.exports = Common