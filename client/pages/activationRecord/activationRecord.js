// pages/activationRecord/activationRecord.js
const commonStore = require('../../store/common-store.js')
import {
  getActivationRecoord
} from '../../api/business'
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
        "id": 6,
        "mall_car_user_id": 1,
        "price": "188.00",
        "order_sn": "mc202110221517222905",
        "out_trade_no": "123456",
        "pay_time": 1634888399,
        "status": 1,
        "expire_time": 1666423042,
        "create_time": 1634887042
      }],
      count: 0,
      total_page: 0,
    },
    page: 1,
    page_size: 10,
  },
  scrollToLower() {
    console.log(e)
    console.log('scrollToLower')
    let activationList = this.data.activationList

    if (activationList.count + 1 > activationList.total_page) return

    let tempData = {
      page: ++activationList.count,
      page_size: this.data.page_size,
      // share_user_shop_id
    }

    this.getActivationRecoord(tempData).then(res => {
      activationList.cache.push(...res.data.data)
      this.setData({
        [`activationList.cache`]: activationList.cache
      })
    })
  },
  scrollToRefresherrefresh() {
    console.log('scrollToRefresherrefresh')
    this.setData({
      triggered: false,
      'activationList.count': 1
    })
    this.getActivationRecoord().then(res => {
      this.setData({
        [`activationList.cache`]: res.data.data,
        [`activationList.total_page`]: res.data.last_page
      })
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
  getActivationRecoord(data) {
    const tempData = {
      page: this.data.page,
      page_size: this.data.page_size,
    }
    return new Promise((resolve, reject) => {
      getActivationRecoord(data ? data : tempData).then(res => {
        resolve(res)
      }).catch(res => {
        reject(res)
      })
    })
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
      scrollViewHeight: this.data.systemInfo.screenHeight - this.data.navHeight
    })
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    if (this.data.activationList.count > 1) {
      this.setData({
        [`activationList.count`]: 1
      })
    }

    this.getActivationRecoord().then(res => {
      // const currentOrder = this.data.activityList[this.data.tabIndex]
      // 缓存
      // if (!currentOrder.activityCache.length) {
      this.setData({
        [`activationList.cache`]: res.data.data,
        [`activationList.total_page`]: res.data.last_page
      })
    })
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