// pages/invite/team.js
const commonStore = require('../../store/common-store.js')
import store from '../../store/common'
import create from '../../utils/create'
import {
  updateUserInfo,
  // updatePhone,
  getUserDetail
} from '../../api/user'

import {
  addTeamMember
} from '../../api/team'

// Page({
create(store, {

  /**
   * 页面的初始数据
   */
  data: {
    phone: '',
    userInfo: null,
    canIUseGetUserProfile: false,
    navigationBarTitleText: "",
    ...commonStore.data,
    navStatus: 'isEntryWithShare'
  },
  joinHandle() {
    // 用户授权后，再次点击立即加入，跳转至加入成功/失败页面
    console.log(`team_id=====${this.data.options.team_id} phone===${this.data.phone}`)
    this.addTeamMember({
      team_id: this.data.options.team_id
    }).then(res => {
      wx.navigateTo({
        url: '/pages/invite/success',
      })
    }).catch(err => {
      wx.navigateTo({
        url: `/pages/invite/fail?msg=${err.msg}`,
      })
    })
  },
  getUserProfile() {
    wx.getUserProfile({
      desc: '展示用户信息',
      success: (res) => {
        console.log(res)
        // this.store.data.userInfo = res.userInfo
        this.store.data.userInfo['avatarUrl'] = res.userInfo.avatarUrl
        this.store.data.userInfo['city'] = res.userInfo.city
        this.store.data.userInfo['country'] = res.userInfo.country
        this.store.data.userInfo['gender'] = res.userInfo.gender
        this.store.data.userInfo['language'] = res.userInfo.language
        this.store.data.userInfo['nickName'] = res.userInfo.nickName
        this.store.data.userInfo['province'] = res.userInfo.province
        this.update()

        this.setData({
          userInfo: res.userInfo
        })
        console.log(this.data.userInfo)
        // 上传用户信息
        updateUserInfo(res.userInfo).then(res => {
          console.log(res.msg)
        }).catch(err => {
          console.log('更新微信信息:' + err.msg)
        })
      }
    })
  },
  // getPhoneNumber(e) {
  //   console.log(e)
  //   const _this = this
  //   if (e.detail.encryptedData) {
  //     this.updatePhone({
  //       encryptedData: e.detail.encryptedData,
  //       iv: e.detail.iv,
  //     }).then(res => {
  //       const data = res.data.phone
  //       console.log(data)
  //       _this.setData({
  //         'userInfo.phone': data,
  //         'phone': data,
  //       })
  //       getApp().globalData.userInfo['phone'] = data //服务器解密后反回
  //       wx.showToast({
  //         title: '绑定成功，请重新点击立即购买',
  //         icon: 'none'
  //       })
  //     }).catch(res => {
  //       console.log(res)
  //     })
  //   } else {
  //     wx.showModal({
  //       content: '为便于商家服务需要您进行手机号授权',
  //       // confirmText: '同意',
  //       confirmText: '确定',
  //       confirmColor: '#4283FB',
  //       showCancel: false,
  //       // cancelText: '拒绝',
  //       // cancelColor: '#999999',
  //       success(res) {
  //         if (res.confirm) {
  //           console.log('确定')
  //         } else if (res.cancel) {
  //           console.log('取消')
  //         }
  //       }
  //     })
  //   }
  // },
  // 自动填入手机号
  // autoPhoneNumber() {
  //   this.setData({
  //     phone: this.data.userInfo.phone
  //   })
  // },
  // updatePhone(data) {
  //   return new Promise((resolve, reject) => {
  //     updatePhone(data).then(res => {
  //       resolve(res)
  //     }).catch(res => {
  //       reject(res)
  //     })
  //   })
  // },
  addTeamMember(data) {
    return new Promise((resolve, reject) => {
      addTeamMember(data).then(res => {
        resolve(res)
      }).catch(err => {
        reject(err)
      })
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    commonStore.bind('inviteTeamPage', this)
    commonStore.init()

    if (wx.getUserProfile) {
      this.setData({
        canIUseGetUserProfile: true
      })
    }

    wx.getSystemInfo().then(res => {
      // console.log(res)
      this.store.data.systemInfo = res
      this.store.data.navHeight = res.statusBarHeight + this.store.data.menuButtonObject.height + (this.store.data.menuButtonObject.top - res.statusBarHeight) * 2
      this.update()
      this.setData({
        scrollViewHeight: res.screenHeight - (this.store.data.navHeight),
      })
    }).catch(err => {
      console.log(err)
    })

    let temp = {}
    if (JSON.stringify(options) == "{}") {

    } else {
      // 扫普通码进入
      if (options.team_id || options.n) {
        temp = options
      } else if (options.q) {
        const q = decodeURIComponent(options.q) // 获取到二维码原始链接内容
        // const scancode_time = parseInt(options.scancode_time) // 获取用户扫码时间 UNIX 时间戳
        if (q && q != 'undefined') {
          q.split('?')[1].split('&').forEach(it => {
            const i = it.split('=')
            temp[i[0]] = i[1]
          })
        } else {
          temp = options
        }

        // temp.navStatus = 'isEntryWithShare'
        // temp.tabbar = ['TA的简介', 'TA的产品', 'TA的企业', 'TA的评价']
      } else if (options.scene) {
        // 扫小程序码
        const scene = decodeURIComponent(options.scene)

        // if (q && q != 'undefined') {
        if (scene && scene != 'undefined') {
          scene.split('?')[1].split('&').forEach(it => {
            const i = it.split('=')
            temp[i[0]] = i[1]
          })
        } else {
          temp = options
        }
        
        console.log(`team_id=====${options.id}`)
        if (temp.id) {
          this.addTeamMember({
            team_id: options.id
          }).then(res => {
            wx.navigateTo({
              url: '/pages/invite/success',
            })
          }).catch(err => {
            wx.navigateTo({
              url: `/pages/invite/fail?msg=${err.msg}`,
            })
          })
        }
      } else {
        // 非扫码
        temp = options
        // 以下调试后删除（type=2&b=4269&s=3452）--------------------------------------------
      }
      options = temp

      this.setData({
        options
      })
    }
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {
    console.log(this.store.data.userInfo)

    if (this.store.data.userInfo) {
      this.setData({
        userInfo: this.store.data.userInfo
      })
    } else {
      getUserDetail().then(res => {
        store.data.userInfo = res.data
        store.update()

        this.setData({
          userInfo: res.data,
        })
      })
    }
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})