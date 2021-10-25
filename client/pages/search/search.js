// pages/search/search.js
import commonStore from '../../store/common-store.js'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    navigationBarTitleText: '搜索',
    ...commonStore.data,
    searchHistory: ['奥迪', '奔驰', '宝马', '凯迪拉克', '奥迪', '奔驰', '宝马', '凯迪拉克', '奥迪', '奔驰', '宝马', '凯迪拉克', '奥迪', '奔驰', '宝马', '凯迪拉克'],
    searchHot: ['劳斯莱斯', '宝马5系', '捷豹']
  },
  handleInputChange(e) {
    console.log(e)
    const val = e.detail.value
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    commonStore.bind('searchPage', this)
    commonStore.init()
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