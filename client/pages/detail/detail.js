// pages/detail/detail.js
// const {
//   common
// } = require('../../store/common-store.js')
// const commonStore = require('../../store/common-store.js')
import {
  getGoodDetail,
  getRecommendList
} from '../../api/goods'
import {
  updatePhone
} from '../../api/user'

import store from '../../store/common'
import create from '../../utils/create'

// Page({
create(store, {
  /**
   * 页面的初始数据
   */
  data: {
    isOverShare: true,
    recommendListFlag: 0,
    userInfo: null,
    settingInfo: {}, //微信设置信息 settingInfo.authSetting['scope.userInfo'](微信已授权)
    menuButtonObject: null,
    systemInfo: null,
    navHeight: '',
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
    // ...commonStore.data,
    detail: {
      // cover_url: 'https://www.nissanusa.com/content/dam/Nissan/us/vehicles/gtr/2021/overview/2021-nissan-gtr-awd-sports-car.jpg',
      // name: '宝马1系（进口） 2013款 改款 116i 都市型'
    },
    recommendList: [
      // {
      //   id: 1,
      //   cover_url: 'https://www.nissanusa.com/content/dam/Nissan/us/vehicles/gtr/2021/overview/2021-nissan-gtr-awd-sports-car.jpg',
      //   name: '奥迪A8 2014款 A8L 45 TFSI quattro舒适型',
      //   price: 10.80,
      //   kilometers_str: 25,
      //   licensing_str: "2021-10-19",
      //   market_price: "25.00",
      //   name: "2021合资1.0L奥迪自动",
      //   area: '北京'
      // },
      // {
      //   id: 2,
      //   cover_url: 'https://www.nissanusa.com/content/dam/Nissan/us/vehicles/gtr/2021/overview/2021-nissan-gtr-awd-sports-car.jpg',
      //   name: '奥迪A8 2014款 A8L 45 TFSI quattro舒适型',
      //   price: 10.80,
      //   kilometers_str: 25,
      //   licensing_str: "2021-10-19",
      //   market_price: "25.00",
      //   name: "2021合资1.0L奥迪自动",
      //   area: '北京'
      // },
      // {
      //   id: 3,
      //   cover_url: 'https://www.nissanusa.com/content/dam/Nissan/us/vehicles/gtr/2021/overview/2021-nissan-gtr-awd-sports-car.jpg',
      //   name: '奥迪A8 2014款 A8L 45 TFSI quattro舒适型',
      //   price: 10.80,
      //   kilometers_str: 25,
      //   licensing_str: "2021-10-19",
      //   market_price: "25.00",
      //   name: "2021合资1.0L奥迪自动",
      //   area: '北京'
      // }, {
      //   id: 4,
      //   cover_url: 'https://www.nissanusa.com/content/dam/Nissan/us/vehicles/gtr/2021/overview/2021-nissan-gtr-awd-sports-car.jpg',
      //   name: '奥迪A8 2014款 A8L 45 TFSI ',
      //   price: 10.80,
      //   kilometers_str: 25,
      //   licensing_str: "2021-10-19",
      //   market_price: "25.00",
      //   name: "2021合资1.0L奥迪自动",
      //   area: '北京'
      // },
      // {
      //   id: 5,
      //   cover_url: 'https://www.nissanusa.com/content/dam/Nissan/us/vehicles/gtr/2021/overview/2021-nissan-gtr-awd-sports-car.jpg',
      //   name: '奥迪A8 2014款 A8L 45 TFSI ',
      //   price: 10.80,
      //   kilometers_str: 25,
      //   licensing_str: "2021-10-19",
      //   market_price: "25.00",
      //   name: "2021合资1.0L奥迪自动",
      //   area: '北京'
      // }
    ]
  },
  // 纠错
  correctionHandle() {
    if (!this.tapValidate()) return
    wx.navigateTo({
      url: '../correction/correction?goods_id=' + this.data.goods_id,
    })
  },
  // 帮卖
  helpSellHandle() {
    if (!this.tapValidate()) return
    // 先确认是否开通，未开通弹出开通提示弹出，若已经开通弹出生成海报下拉弹窗
    if (this.store.data.userInfo.is_sale_role) {
      // 开通提示弹窗
      this.setData({
        [`dialog.openHelpsell.opened`]: 1
      })
    } else {
      // 海报下拉弹窗
      this.setData({
        [`dialog.helpsell.opened`]: 1
      })
    }

  },
  // 询问底价
  askHandle() {
    // console.log('askHandle')
    if (!this.tapValidate()) return

    this.setData({
      [`dialog.ask.opened`]: 1
    })
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
        // console.log(data)
        this.setData({
          'userInfo.phone': data,
          'phone': data
        })
        // app.globalData.userInfo['phone'] = data //服务器解密后反回
        this.store.data.userInfo.phone = data
        this.update()

        wx.showToast({
          title: '绑定成功',
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
  sideToolbarHandle(e) {
    const mode = e.target.dataset.mode
    if (mode === 'share') {
      if (!this.tapValidate()) return
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
  // 相关推荐更多
  recommendToMoreHandle() {
    wx.switchTab({
      url: '/pages/index/index',
    })
  },
  itemTapHandle(e) {
    // console.log(e)
    wx.navigateTo({
      url: `/pages/detail/detail?id=${e.currentTarget.dataset.id}`,
    })
  },
  tapValidate() {
    // status 状态 4:待审核 1:正常 2:下架 3:审核未通过 0:所有
    let res = false
    if (this.data.detail.status === 2) {
      wx.showToast({
        title: '该商品已下架',
        icon: 'none'
      })
    } else if (this.data.detail.status === 4) {
      wx.showToast({
        title: '该商品尚未审核通过',
        icon: 'none'
      })
    } else {
      res = true
    }
    return res
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    // commonStore.bind('detailPage', this)
    // commonStore.init()
    this.setData({
      guideDialogVisibile: true,
      goods_id: options.id
    })

    this.getGoodDetail({
      goods_id: options.id
    }).then(res => {
      this.setData({
        detail: res.data
      })
    })
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

    this.setData({
      navHeight: this.store.data.navHeight,
      'userInfo.phone': this.store.data.userInfo.phone
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
  onShareAppMessage: function (res) {
    if (res.from === 'button') {
      // 来自页面内转发按钮
      return {
        title: '分享' + this.data.detail.name,
        path: 'pages/detail/detail?goods_id=' + this.data.detail.id,
        imageUrl: this.data.detail.cover_url,
        success(res) {
          console.log('分享成功', res)
        },
        fail(res) {
          console.log(res)
        }
      }
    }
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

      if (e.scrollTop > 600) {
        // 请求相关推荐
        if (!this.data.recommendListFlag) {
          this.setData({
            recommendListFlag: true
          })
          this.getRecommendList().then(res => {
            this.setData({
              recommendList: res.data
            })
          })
        }
      }
    }
  },
  getGoodDetail(data) {
    data = data ? data : {}
    return new Promise((resolve, reject) => {
      getGoodDetail(data).then(res => {
        resolve(res)
      }).catch(err => {
        reject(err)
      })
    })
  },
  getRecommendList() {
    return new Promise((resolve, reject) => {
      getRecommendList().then(res => {
        resolve(res)
      }).catch(err => {
        reject(err)
      })
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
})