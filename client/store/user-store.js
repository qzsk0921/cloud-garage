const { Store } = require('westore')
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
        this.data.motto = this.user.motto
        this.data.userInfo = this.user.userInfo
        this.update()
      }
    })
  }

  getUserProfile() {
    this.user.getUserProfile()
  }

}


module.exports = new UserStore
