// pages/carResource/denialDetail.js
const commonStore = require('../../store/common-store.js')
import store from '../../store/common'
import create from '../../utils/create'
import {
  getGoodEditDetail,
} from '../../api/publish'

// Page({
create(store, {

  /**
   * 页面的初始数据
   */
  data: {
    navigationBarTitleText: "",
    ...commonStore.data,
    formData: {
      description: ''
    },
    carDetail: {
      // area: "福建厦门",
      // c_type: 2,
      // category_id: 91,
      // city: 350200,
      // collect_num: 0,
      // color: "白色",
      // comment_num: 0,
      // cover: ["https://image.wms.xcmbkj.com/20211101617f43e076d91"],
      // cover_url: "https://image.wms.xcmbkj.com/20211101617f4333ae3b0",
      // create_time: 1635730404,
      // description: "它的驾控体验相当的理想，还有方向盘的转向精准度相当出色。完全依托于它德系车的传统，底盘的调教非常扎实，只要我快速通过减速缓互带，底盘的表现还是一如既往的沉稳大气。外观整体表现也是很人性化，时尚运动化并重的朗逸，前脸的格栅处理得很合理。刹车调教得非常出色，制动调教很线性，符合像我这种大大咧咧人的格调。当我开车稍微速度快点，只要我脚踏刹车板，它就会给我最大的自信使车的速度降下来，把车更好的刹停。",
      // earnings: "0.00",
      // enjoy: 0,
      // id: 1333,
      // inventory: 0,
      // is_back: 0,
      // is_buy: 0,
      // is_delete: 0,
      // is_hot: 0,
      // is_join: 0,
      // is_postage: 1,
      // is_private: 0,
      // is_pull: 0,
      // is_sale: 0,
      // is_self: 1,
      // join_goods_id: 0,
      // kilometers_str: "9500.00",
      // licensing_str: "2022",
      // market_price: "141900.00",
      // name: "2022大众朗逸合资1.1L-1.6L自动",
      // postage: "0.00",
      // price: "71200.00",
      // price_str: "7.12万元",
      // province: 350000,
      // read_num: 3,
      // remark: "测试数据",
      // sale_price: "0.00",
      // shop_id: 156,
      // shop_phone: "13559570101",
      // small_path: "pages/detail/detail?id=1333",
      // sq_jinzhu_id: 21614,
      // status: 1,
      // team_id: 65,
      // type: 2,
    },
  },
  // 发布
  formSubmit(e) {

    // const formData = e.detail.value
    // Object.keys(formData).forEach(key => {
    //   this.data.formData[key] = formData[key]
    // })
    // // 校验
    // if (!this.formValidate(this.data.formData)) return

    // console.log(this.data.formData)
    wx.navigateTo({
      url: `/pages/publish/publish?mode=edit&id=${this.data.id}`,
    })
  },

  // formValidate(formData) {
  //   const flag = Object.keys(formData).some(key => {
  //     if (!formData[key] || !formData[key].length) {
  //       if (key === 'description') {
  //         wx.showToast({
  //           icon: 'none',
  //           title: '请输入拒审原因'
  //         })
  //         return true
  //       }
  //       return false
  //     }
  //     return false
  //   })

  //   // 全部填写再校验手机号码
  //   if (!flag) {
  //     // if (!checkMobile(formData.mobile)) {
  //     //   wx.showToast({
  //     //     title: '请输入正确手机号',
  //     //     icon: 'none'
  //     //   })
  //     //   return false
  //     // } else {
  //     //   return true
  //     // }
  //     return true
  //   } else {
  //     return false
  //   }
  // },
  getGoodEditDetail(data) {
    return new Promise((resolve, reject) => {
      getGoodEditDetail(data).then(res => {
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
    if (options.id) {
      this.data.id = options.id
      this.getGoodEditDetail({
        goods_id: options.id
      }).then(res => {
        this.setData({
          carDetail: res.data
        })
      })
    }
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