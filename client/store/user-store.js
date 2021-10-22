const {
  Store
} = require('westore')
const User = require('../model/user')


class UserStore extends Store {
  constructor() {
    super()
    this.data = {
      motto: '',
      userInfo: {}
    }

    this.user = new User({
      onUserInfoLoaded: () => {
        // this.data.motto = this.user.motto
        this.data.userInfo = this.user.userInfo
        // console.log(this.data.userInfo)
        this.update()
      }
    })
  }

  getUserProfile() {
    this.user.getUserProfile()
  }

  // 自己后台数据
  getUserDetail() {
    this.user.getUserDetail()
  }

}


module.exports = new UserStore