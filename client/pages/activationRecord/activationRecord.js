// pages/activationRecord/activationRecord.js
const commonStore = require('../../store/common-store.js')
Page({
  /**
   * 页面的初始数据
   */
  data: {
    triggered: false,
    refresherEnabled: true, //初始值不启用
    navStatus: 'isEntryWithShare',
    navigationBarTitleText: "开通记录",
    ...commonStore.data,
    activationList: {
      cache: [{
          id: 1,
          icon: '../../assets/images/my_open.png',
          tit: '帮卖特权',
          startTime: '2021/8/23',
          endTime: '2022/8/23',
          price: 188
        },
        {
          id: 1,
          icon: '../../assets/images/my_open.png',
          tit: '帮卖特权',
          startTime: '2021/8/23',
          endTime: '2022/8/23',
          price: 188
        }
      ]
    }
  },
  scrollToLower() {
    console.log(e)
    console.log('scrollToLower')
  },
  scrollToRefresherrefresh() {
    console.log('scrollToRefresherrefresh')
    this.setData({
      triggered: false,
    })
  },
  scrollToRefresherPull() {
    console.log('scrollToRefresherPull')
    // 禁用左右滑动
  },
  // 下拉刷新被复位
  scrollToRefresherStore() {
    console.log('scrollToRefresherStore')
  },
  scrollToRefresherAbort() {
    console.log('scrollToRefresherAbort')
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (options && options.tabbarPage) {
      this.setData({
        tabbarPage: options.tabbarPage
      })
    }

    commonStore.bind('activationRecordPage', this)
    commonStore.init()
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    this.setData({
      scrollViewHeight: this.data.systemInfo.screenHeight -  this.data.navHeight
    })
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})