// pages/search/search.js
// import commonStore from '../../store/common-store.js'
import {
  getHotBrandList
} from '../../api/business'

import store from '../../store/common'
import create from '../../utils/create'

// Page({
create(store, {
  /**
   * 页面的初始数据
   */
  data: {
    navigationBarTitleText: '搜索',
    // ...commonStore.data,

    settingInfo: {}, //微信设置信息 settingInfo.authSetting['scope.userInfo'](微信已授权)
    menuButtonObject: null,
    systemInfo: null,
    navHeight: null,

    searchKeyword: '',
    // searchHistory: ['奥迪', '奔驰', '宝马', '凯迪拉克', '奥迪', '奔驰', '宝马', '凯迪拉克', '奥迪', '奔驰', '宝马', '凯迪拉克', '奥迪', '奔驰', '宝马', '凯迪拉克'],
    // searchHot: ['劳斯莱斯', '宝马5系', '捷豹']
    searchHistory: [],
    searchHot: []
  },
  inputHandle(e) {
    console.log(e)
    this.data.searchKeyword = e.detail.value
  },
  btnSearchHandle() {
    this.store.data.searchKeyword = this.data.searchKeyword
    this.update()

    this.saveSearchHandle({
      name: this.data.searchKeyword
    })

    wx.switchTab({
      url: '/pages/index/index',
    })
  },
  searchHandle(e) {
    console.log(e)
    const dataset = e.target.dataset

    this.store.data.searchKeyword = dataset.keyword
    this.update()

    this.saveSearchHandle({
      name: dataset.keyword
    })

    wx.switchTab({
      url: '/pages/index/index',
    })
  },
  // 存储历史搜索
  saveSearchHandle(keywordObj) {
    // 空值时不存储
    if (keywordObj.name.trim()) {
      const logs = wx.getStorageSync('logs') || []
      // 去重
      if (logs.length) {
        logs.some((item, index) => {
          if (item.name === keywordObj.name)
            return logs.splice(index, 1)
          else return false
        })
      }
      logs.unshift(keywordObj)
      wx.setStorageSync('logs', logs)
    }
  },
  // 清除搜索历史
  clearSearchHandle() {
    wx.removeStorageSync('logs')
    this.setData({
      searchHistory: []
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // commonStore.bind('searchPage', this)
    // commonStore.init()

    getHotBrandList().then(res => {
      this.setData({
        searchHistory: wx.getStorageSync('logs') || [],
        searchHot: res.data
      })
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    const that = this;
    const query = wx.createSelectorQuery();
    // 在页面渲染完成OnReady回调 获取元素高度时，如果不加定时器，获取的元素的高度还是没渲染完异步数据前的高度
    query.select('.fixed').boundingClientRect(function (rect) {
      // console.log(rect)
      that.setData({
        // scrollViewHeight: that.data.systemInfo.screenHeight - (rect.height + that.data.navHeight),
        fixed: rect.height,
      })
    }).exec();
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.setData({
      navHeight: this.store.data.navHeight
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