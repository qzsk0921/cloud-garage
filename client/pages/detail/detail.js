// pages/detail/detail.js
const {
  common
} = require('../../store/common-store.js')
const commonStore = require('../../store/common-store.js')

Page({
  /**
   * 页面的初始数据
   */
  data: {
    // navigationBarTitleText: "",
    dialog: {
      openHelpsell: {
        // 点击帮卖 未开通帮卖
        opened: 0
      },
      helpsell: {
        // 点击帮卖 已开通生成海报
        opened: 0
      },
      ask: {
        // 点击询问底价
        opened: 0
      },
      sharesheet: {
        // 点击分享
        opened: 0
      },
      poster: {
        // 海报
        opened: 0
      }
    }, // 弹窗和下拉窗
    bgColor: 'rgba(255, 255, 255, 0)', //页面上拉导航栏背景色激活
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
  correctionHandle() {
    wx.navigateTo({
      url: '../correction/correction',
    })
  },
  helpSellHandle() {
    // 先确认是否开通，未开通弹出开通弹出，若已经开通弹出生成海报下拉弹窗
    // this.setData({
    //   [`dialog.openHelpsell.opened`]: 1
    // })
    this.setData({
      [`dialog.helpsell.opened`]: 1
    })
  },
  askHandle() {
    // console.log('askHandle')
    this.setData({
      [`dialog.ask.opened`]: 1
    })
  },
  sideToolbarHandle(e) {
    const mode = e.target.dataset.mode
    if (mode === 'share') {
      this.setData({
        [`dialog.sharesheet.opened`]: 1
      })
    } else if (mode === 'more') {

    } else if (mode === 'market') {

    }
  },
  // 唤起生成海报弹窗
  awakenPosterDialog() {
    console.log('awaken')
    this.setData({
      ['dialog.poster.opened']: 1
    })
  },
  // 关闭弹窗
  dropdownMenuHelpsellMaskTap() {
    this.setData({
      ['dialog.helpsell.opened']: 0
    })
  },
  dropdownMenuAskMaskTap() {
    this.setData({
      ['dialog.ask.opened']: 0
    })
  },
  dropdownMenuShearsheetMaskTap() {
    this.setData({
      ['dialog.sharesheet.opened']: 0
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // console.log(options)
    commonStore.bind('detailPage', this)
    commonStore.init()
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
      if (e.scrollTop >= 250 && this.data.bgColor !== 'rgba(255, 255, 255, 1)') {
        this.setData({
          bgColor: 'rgba(255, 255, 255, 1)'
        })
      } else if (e.scrollTop >= 50 && e.scrollTop < 100 && this.data.bgColor !== 'rgba(255, 255, 255, .2)') {
        this.setData({
          bgColor: 'rgba(255, 255, 255, .3)'
        })
      } else if (e.scrollTop >= 100 && e.scrollTop < 150 && this.data.bgColor !== 'rgba(255, 255, 255, .4)') {
        this.setData({
          bgColor: 'rgba(255, 255, 255, .6)'
        })
      } else if (e.scrollTop >= 150 && e.scrollTop < 200 && this.data.bgColor !== 'rgba(255, 255, 255, .6)') {
        this.setData({
          bgColor: 'rgba(255, 255, 255, .6)'
        })
      } else if (e.scrollTop >= 200 && e.scrollTop < 250 && this.data.bgColor !== 'rgba(255, 255, 255, .8)') {
        this.setData({
          bgColor: 'rgba(255, 255, 255, .8)'
        })
      } else if (e.scrollTop < 50 && this.data.bgColor !== 'rgba(255, 255, 255, 0)') {
        this.setData({
          bgColor: 'rgba(255, 255, 255, 0)'
        })
      }

      if (this.data.shrink) {
        this.setData({
          shrink: false
        })
      }
    }
  }
})