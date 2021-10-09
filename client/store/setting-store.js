
const { Store } = require('westore')
const Setting = require('../model/setting')

class SettingStore extends Store {
  constructor() {
    super()
    this.data = {
      settingInfo: []
    }

    this.setting = new Setting({
      onSettingLoaded: () => {
        this.data.settingInfo = this.setting.settingInfo
        this.update()
      }
    })
  }

  loadSetting() {
    this.setting.loadSetting()
    this.update('settingInfo')
  }
}


module.exports = new SettingStore
