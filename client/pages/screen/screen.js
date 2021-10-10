// pages/screen/screen.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    currentIndex: 0,
    items: [{
      // 导航名称
      text: '热门品牌',
      // 该导航下所有的可选项
      children: [{
        // 名称
        text: '温州',
        // id，作为匹配选中状态的标识
        id: 1,
      }],
    }, {
      text: '车辆类型',
      children: [{
        text: '温州',
        id: 1,
      }],
    }, {
      text: '价格',
      children: [{
        text: '温州',
        id: 1,
      }],
    }, {
      text: '车龄/里程',
      children: [{
        text: '温州',
        id: 1,
      }],
    }, {
      text: '变速箱',
      children: [{
        text: '温州',
        id: 1,
      }],
    }]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

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