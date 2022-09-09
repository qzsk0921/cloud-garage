// pages/invite/team.js
const commonStore = require('../../store/common-store.js')
import store from '../../store/common'
import create from '../../utils/create'

// Page({
create(store, {

  /**
   * 页面的初始数据
   */
  data: {
    navigationBarTitleText: "",
    ...commonStore.data,
    navStatus: 'isEntryWithShare'
  },
  getPhoneNumber(e) {
    console.log(e)
    const _this = this
    if (e.detail.encryptedData) {
      this.updatePhone({
        encryptedData: e.detail.encryptedData,
        iv: e.detail.iv,
      }).then(res => {
        const data = res.data.phone
        console.log(data)
        _this.setData({
          'userInfo.phone': data,
          'phone': data,
        })
        app.globalData.userInfo['phone'] = data //服务器解密后反回
        wx.showToast({
          title: '绑定成功，请重新点击立即购买',
          icon: 'none'
        })
      }).catch(res => {
        console.log(res)
      })
    } else {
      wx.showModal({
        content: '为便于商家服务需要您进行手机号授权',
        // confirmText: '同意',
        confirmText: '确定',
        confirmColor: '#4283FB',
        showCancel: false,
        // cancelText: '拒绝',
        // cancelColor: '#999999',
        success(res) {
          if (res.confirm) {
            console.log('确定')
          } else if (res.cancel) {
            console.log('取消')
          }
        }
      })
    }
  },
  // 自动填入手机号
  autoPhoneNumber() {
    this.setData({
      phone: this.data.userInfo.phone
    })
  },
  updatePhone(data) {
    return new Promise((resolve, reject) => {
      updatePhone(data).then(res => {
        resolve(res)
      }).catch(res => {
        reject(res)
      })
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    commonStore.bind('inviteTeamPage', this)
    commonStore.init()

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
    // console.log(this.store.data.userInfo)

    this.setData({
      userInfo: this.store.data.userInfo
    })
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