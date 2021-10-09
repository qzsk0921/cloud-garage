class Setting {
  constructor(options) {
    this.settingInfo = []
    this.options = options
  }

  loadSetting() {
    wx.getSetting({
      success: (res) => {
        console.log('res是否开启授权', res)
        this.settingInfo = res
        this.options.onSettingLoaded && this.options.onSettingLoaded()
      }
    })
  }
}

module.exports = Setting