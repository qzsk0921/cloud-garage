import {
  getUserDetail
} from '../api/user.js'

class User {

  constructor(options) {
    this.motto = 'Hello World'
    this.userInfo = {}
    this.options = options

    // this.getUserDetail()
  }

  getUserProfile(resolve) {
    wx.getUserProfile({
      desc: '展示用户信息',
      success: (res) => {
        console.log(res)
        this.userInfo = res.userInfo
        this.options.onUserInfoLoaded && this.options.onUserInfoLoaded(resolve)
      }
    })
  }

  getUserDetail() {
    getUserDetail().then(res => {
      this.userInfo = res.data
      this.options.onUserInfoLoaded && this.options.onUserInfoLoaded()
    }).catch(res => {
      console.log(res)
    })
  }

}

module.exports = User