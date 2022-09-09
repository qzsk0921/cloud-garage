// pages/profile/vip.js
const commonStore = require('../../store/common-store.js')
import store from '../../store/common'

import {
  getVipInfo,
  createVip,
  getUserDetail,
} from '../../api/user'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    navigationBarTitleText: "会员中心",
    ...commonStore.data,
    // privileges: [{
    //     src: '../../assets/images/member_icon_1.png',
    //     text: '无限发布车源'
    //   },
    //   {
    //     src: '../../assets/images/member_icon_2.png',
    //     text: '车源一键分享'
    //   }, {
    //     src: '../../assets/images/member_icon_3.png',
    //     text: '团队组建'
    //   }, {
    //     src: '../../assets/images/member_icon_4.png',
    //     text: '车源共享'
    //   }, {
    //     src: '../../assets/images/member_icon_5.png',
    //     text: '帮卖特权'
    //   }, {
    //     src: '../../assets/images/member_icon_6.png',
    //     text: '5个成员名额'
    //   }
    // ],
    vipInfo: {
      user_info: {},
      vip_info: [],
      vip_pack_list: []
    },
  },

  // 开通会员
  submitHandle() {
    console.log('addVipHandle')

    const that = this

    this.createVip({
      vip_pack_id: this.data.vipInfo.vip_pack_list[0].id
    }).then(res => {
      const payModel = res.data;
      wx.requestPayment({
        'timeStamp': payModel.timeStamp.toString(),
        'nonceStr': payModel.nonceStr,
        'package': 'prepay_id=' + payModel.prepay_id, //统一下单接口返回的 prepay_id 参数值，提交格式如：prepay_id=***
        'signType': payModel.signType,
        'paySign': payModel.paySign,
        'success': function (res) {
          console.log(res)
          getVipInfo().then(res => {
            // // 业务代码 1:正常 0:禁用 -1:不存在-------------------------------------------------
            // if (res.data.status === 0) {
            //   wx.reLaunch({
            //     url: '/pages/authorization/forbidden',
            //   })
            // }

            // const title = that.data.btnText === '立即续费' ? '续费成功' : that.data.btnText === '立即升级' ? '升级成功' : '开通成功'
            // v2用户开通或续费成功后，停留再当前页面，并刷新当前页面
            that.setData({
              // btnText: '立即续费',
              vipInfo: res.data
            })


            // getApp().globalData.userInfo = store.data.userInfo = res.data
            // store.update()

            getUserDetail().then(res => {
              store.data.userInfo = res.data
              store.update()
            })

            // wx.showToast({
            //   title,
            //   icon: 'none'
            // })

            // const pages = getCurrentPages() //获取加载的页面
            // const prevPage = pages[pages.length - 2] //获取上个页面的对象
            // if (prevPage.route === 'pages/shop/order/confirmOrder') {
            //   // 如果上一页是订单确认页，开通之后更新订单确认页数据
            //   if (getApp().globalData.orderData) {
            //     that.preOrder(getApp().globalData.orderData, 'noload').then(res => {
            //       prevPage.setData({
            //         orderData: res.data
            //       })
            //       // wx.navigateBack({
            //       //   delta: 0,
            //       // })
            //     })
            //   }
            // } else {
            //   // // 支付成功后，返回个人中心，刷新个人中心页面
            //   // wx.navigateBack({
            //   //   delta: 0,
            //   // })
            // }
          })

          // 获取消息下发权限(只在支付回调或tap手势事件能调用)
          // wx.requestSubscribeMessage({
          //   tmplIds: ['mtwGRB07oFL2fJgoiIipKVCYFFHS0vytiw2rTHqtAz8', 'gB9gMYOrOkLl-yTHdBP5vUS5rgwsTW1hjUYNml-57Go'],
          //   success(res) {},
          //   fail(err) {
          //     console.log(err)
          //   },
          //   complete() {
          //     // console.log("dasda", payModel.package.substr(10))
          //     that.addOrder(payModel.out_trade_no, payModel.package.substr(10))
          //   }
          // })
        },
        'fail': function (res) {
          wx.showToast({
            title: '取消支付，开通失败',
            icon: 'none'
          })
          console.log(res)
        }
      })
    })
  },
  getVipInfo(data) {
    return new Promise((resolve, reject) => {
      getVipInfo(data).then(res => {
        resolve(res)
      }).catch(err => {
        reject(err)
      })
    })
  },
  createVip(data) {
    return new Promise((resolve, reject) => {
      createVip(data).then(res => {
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
    commonStore.bind('profileVipPage', this)
    commonStore.init()

    this.getVipInfo().then(res => {
      this.setData({
        vipInfo: res.data
      })
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