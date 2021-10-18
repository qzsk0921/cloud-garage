// pages/detail/detail.js
const commonStore = require('../../store/common-store.js')

Page({
  /**
   * 页面的初始数据
   */
  data: {
    // navigationBarTitleText: "",
    shrink: true, //右下角工具栏默认收缩
    ...commonStore.data,
    detail: {
      imageUrl: 'https://www.nissanusa.com/content/dam/Nissan/us/vehicles/gtr/2021/overview/2021-nissan-gtr-awd-sports-car.jpg',
      tit: '宝马1系（进口） 2013款 改款 116i 都市型'
    },
    recommendList: [{
        id: 1,
        imgUrl: 'https://www.nissanusa.com/content/dam/Nissan/us/vehicles/gtr/2021/overview/2021-nissan-gtr-awd-sports-car.jpg',
        desc: '奥迪A8 2014款 A8L 45 TFSI quattro舒适型',
        tip: '2016 / 4.9万公里 /北京',
        price: 10.80,
      },
      {
        id: 2,
        imgUrl: 'https://www.nissanusa.com/content/dam/Nissan/us/vehicles/gtr/2021/overview/2021-nissan-gtr-awd-sports-car.jpg',
        desc: '奥迪A8 2014款 A8L 45 TFSI quattro舒适型',
        tip: '2016 / 4.9万公里 /北京',
        price: 10.80,
      },
      {
        id: 3,
        imgUrl: 'https://www.nissanusa.com/content/dam/Nissan/us/vehicles/gtr/2021/overview/2021-nissan-gtr-awd-sports-car.jpg',
        desc: '奥迪A8 2014款 A8L 45 TFSI quattro舒适型',
        tip: '2016 / 4.9万公里 /北京',
        price: 10.80,
      }, {
        id: 4,
        imgUrl: 'https://www.nissanusa.com/content/dam/Nissan/us/vehicles/gtr/2021/overview/2021-nissan-gtr-awd-sports-car.jpg',
        desc: '奥迪A8 2014款 A8L 45 TFSI ',
        tip: '2016 / 4.9万公里 /北京',
        price: 10.80,
      },
      {
        id: 5,
        imgUrl: 'https://www.nissanusa.com/content/dam/Nissan/us/vehicles/gtr/2021/overview/2021-nissan-gtr-awd-sports-car.jpg',
        desc: '奥迪A8 2014款 A8L 45 TFSI ',
        tip: '2016 / 4.9万公里 /北京',
        price: 10.80,
      }
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
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

  },
  onPageScroll(e) {
    console.log(e)
    if (e.scrollTop === 0) {
      this.setData({
        shrink: true
      })
    } else {
      if (this.data.shrink) {
        this.setData({
          shrink: false
        })
      }
    }
  }
})