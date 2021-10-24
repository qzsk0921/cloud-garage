const {
  Store
} = require('westore')
const User = require('../model/user')


class UserStore extends Store {
  constructor() {
    super()
    // this.data = {
    //   motto: '',
    //   userInfo: {}
    // }
    this.userInfo = {}
    this.user = new User({
      onUserInfoLoaded: (resolve) => {
        // this.data.motto = this.user.motto
        this.userInfo = this.user.userInfo
        this.update()
        if (resolve) resolve(this.userInfo)
      }
    })
  }

  getUserProfile() {
    return new Promise((resolve, reject) => {
      this.user.getUserProfile(resolve)
    })
  }

  // 自己后台数据
  getUserDetail() {
    this.user.getUserDetail()
  }

}


module.exports = new UserStore