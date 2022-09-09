// pages/carResource/bookkeepinglog.js
import store from '../../store/common'
import create from '../../utils/create'

// Page({
create(store, {

  /**
   * 页面的初始数据
   */
  data: {
    navigationBarTitleText: '成交记账',
    refresherEnabled: true, //初始值不启用

    settingInfo: {}, //微信设置信息 settingInfo.authSetting['scope.userInfo'](微信已授权)
    menuButtonObject: null,
    systemInfo: null,
    navHeight: null,

    searchKeyword: '',

    isOverShare: true,
    // ...commonStore.data,
    scrollViewHeight: 0,
    refresherEnabled: true, //初始值不启用
    triggered: false,
    goodsList: {
      cache: [{
        area: "福建厦门",
        c_type: 2,
        category_id: 91,
        city: 350200,
        collect_num: 0,
        color: "白色",
        comment_num: 0,
        cover: ["https://image.wms.xcmbkj.com/20211101617f43e076d91"],
        cover_url: "https://image.wms.xcmbkj.com/20211101617f4333ae3b0",
        create_time: 1635730404,
        description: "它的驾控体验相当的理想，还有方向盘的转向精准度相当出色。完全依托于它德系车的传统，底盘的调教非常扎实，只要我快速通过减速缓互带，底盘的表现还是一如既往的沉稳大气。外观整体表现也是很人性化，时尚运动化并重的朗逸，前脸的格栅处理得很合理。刹车调教得非常出色，制动调教很线性，符合像我这种大大咧咧人的格调。当我开车稍微速度快点，只要我脚踏刹车板，它就会给我最大的自信使车的速度降下来，把车更好的刹停。",
        earnings: "0.00",
        enjoy: 0,
        id: 1333,
        inventory: 0,
        is_back: 0,
        is_buy: 0,
        is_delete: 0,
        is_hot: 0,
        is_join: 0,
        is_postage: 1,
        is_private: 0,
        is_pull: 0,
        is_sale: 0,
        is_self: 1,
        join_goods_id: 0,
        kilometers_str: "9500.00",
        licensing_str: "2022",
        market_price: "141900.00",
        name: "2022大众朗逸合资1.1L-1.6L自动",
        postage: "0.00",
        price: "71200.00",
        price_str: "7.12万元",
        province: 350000,
        read_num: 3,
        remark: "测试数据",
        sale_price: "0.00",
        shop_id: 156,
        shop_phone: "13559570101",
        small_path: "pages/detail/detail?id=1333",
        sq_jinzhu_id: 21614,
        status: 1,
        team_id: 65,
        type: 2,
      }, {
        area: "福建厦门",
        c_type: 2,
        category_id: 91,
        city: 350200,
        collect_num: 0,
        color: "白色",
        comment_num: 0,
        cover: ["https://image.wms.xcmbkj.com/20211101617f43e076d91"],
        cover_url: "https://image.wms.xcmbkj.com/20211101617f4333ae3b0",
        create_time: 1635730404,
        description: "它的驾控体验相当的理想，还有方向盘的转向精准度相当出色。完全依托于它德系车的传统，底盘的调教非常扎实，只要我快速通过减速缓互带，底盘的表现还是一如既往的沉稳大气。外观整体表现也是很人性化，时尚运动化并重的朗逸，前脸的格栅处理得很合理。刹车调教得非常出色，制动调教很线性，符合像我这种大大咧咧人的格调。当我开车稍微速度快点，只要我脚踏刹车板，它就会给我最大的自信使车的速度降下来，把车更好的刹停。",
        earnings: "0.00",
        enjoy: 0,
        id: 1333,
        inventory: 0,
        is_back: 0,
        is_buy: 0,
        is_delete: 0,
        is_hot: 0,
        is_join: 0,
        is_postage: 1,
        is_private: 0,
        is_pull: 0,
        is_sale: 0,
        is_self: 1,
        join_goods_id: 0,
        kilometers_str: "9500.00",
        licensing_str: "2022",
        market_price: "141900.00",
        name: "2022大众朗逸合资1.1L-1.6L自动",
        postage: "0.00",
        price: "71200.00",
        price_str: "7.12万元",
        province: 350000,
        read_num: 3,
        remark: "测试数据",
        sale_price: "0.00",
        shop_id: 156,
        shop_phone: "13559570101",
        small_path: "pages/detail/detail?id=1333",
        sq_jinzhu_id: 21614,
        status: 1,
        team_id: 65,
        type: 2,
      }, {
        area: "福建厦门",
        c_type: 2,
        category_id: 91,
        city: 350200,
        collect_num: 0,
        color: "白色",
        comment_num: 0,
        cover: ["https://image.wms.xcmbkj.com/20211101617f43e076d91"],
        cover_url: "https://image.wms.xcmbkj.com/20211101617f4333ae3b0",
        create_time: 1635730404,
        description: "它的驾控体验相当的理想，还有方向盘的转向精准度相当出色。完全依托于它德系车的传统，底盘的调教非常扎实，只要我快速通过减速缓互带，底盘的表现还是一如既往的沉稳大气。外观整体表现也是很人性化，时尚运动化并重的朗逸，前脸的格栅处理得很合理。刹车调教得非常出色，制动调教很线性，符合像我这种大大咧咧人的格调。当我开车稍微速度快点，只要我脚踏刹车板，它就会给我最大的自信使车的速度降下来，把车更好的刹停。",
        earnings: "0.00",
        enjoy: 0,
        id: 1333,
        inventory: 0,
        is_back: 0,
        is_buy: 0,
        is_delete: 0,
        is_hot: 0,
        is_join: 0,
        is_postage: 1,
        is_private: 0,
        is_pull: 0,
        is_sale: 0,
        is_self: 1,
        join_goods_id: 0,
        kilometers_str: "9500.00",
        licensing_str: "2022",
        market_price: "141900.00",
        name: "2022大众朗逸合资1.1L-1.6L自动",
        postage: "0.00",
        price: "71200.00",
        price_str: "7.12万元",
        province: 350000,
        read_num: 3,
        remark: "测试数据",
        sale_price: "0.00",
        shop_id: 156,
        shop_phone: "13559570101",
        small_path: "pages/detail/detail?id=1333",
        sq_jinzhu_id: 21614,
        status: 1,
        team_id: 65,
        type: 2,
      }, {
        area: "福建厦门",
        c_type: 2,
        category_id: 91,
        city: 350200,
        collect_num: 0,
        color: "白色",
        comment_num: 0,
        cover: ["https://image.wms.xcmbkj.com/20211101617f43e076d91"],
        cover_url: "https://image.wms.xcmbkj.com/20211101617f4333ae3b0",
        create_time: 1635730404,
        description: "它的驾控体验相当的理想，还有方向盘的转向精准度相当出色。完全依托于它德系车的传统，底盘的调教非常扎实，只要我快速通过减速缓互带，底盘的表现还是一如既往的沉稳大气。外观整体表现也是很人性化，时尚运动化并重的朗逸，前脸的格栅处理得很合理。刹车调教得非常出色，制动调教很线性，符合像我这种大大咧咧人的格调。当我开车稍微速度快点，只要我脚踏刹车板，它就会给我最大的自信使车的速度降下来，把车更好的刹停。",
        earnings: "0.00",
        enjoy: 0,
        id: 1333,
        inventory: 0,
        is_back: 0,
        is_buy: 0,
        is_delete: 0,
        is_hot: 0,
        is_join: 0,
        is_postage: 1,
        is_private: 0,
        is_pull: 0,
        is_sale: 0,
        is_self: 1,
        join_goods_id: 0,
        kilometers_str: "9500.00",
        licensing_str: "2022",
        market_price: "141900.00",
        name: "2022大众朗逸合资1.1L-1.6L自动",
        postage: "0.00",
        price: "71200.00",
        price_str: "7.12万元",
        province: 350000,
        read_num: 3,
        remark: "测试数据",
        sale_price: "0.00",
        shop_id: 156,
        shop_phone: "13559570101",
        small_path: "pages/detail/detail?id=1333",
        sq_jinzhu_id: 21614,
        status: 1,
        team_id: 65,
        type: 2,
      }], //orderAllCache
      count: 1,
      total_page: 1,
      // method: "getOrderAll"
    },
    page: 1,
    page_size: 10,
  },
  // 设置日期
  setDate() {
    const dateObj = new Date()
    const year = dateObj.getFullYear()
    const month = this.formatNumber(dateObj.getMonth() + 1)

    this.setData({
      year: year,
      month: month,
      date: `${year}-${month}`,
      startDate: `${year-5}-${month}`,
      endDate: `${year}-${month}`
    })
  },
  formatNumber(n) {
    n = n.toString()
    return n[1] ? n : `0${n}`
  },
  bindDateChange(e) {
    console.log(e)
    const value = e.detail.value
    this.setData({
      date: value,
      year: value.split('-')[0],
      month: value.split('-')[1],
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    wx.hideShareMenu()

    const that = this;
    const query = wx.createSelectorQuery();
   
    if (!that.store.data.systemInfo) {
      wx.getSystemInfo().then(res => {
        // console.log(res)
        this.store.data.systemInfo = res
        this.store.data.navHeight = res.statusBarHeight + this.store.data.menuButtonObject.height + (this.store.data.menuButtonObject.top - res.statusBarHeight) * 2
        this.update()

        // 在页面渲染完成OnReady回调 获取元素高度时，如果不加定时器，获取的元素的高度还是没渲染完异步数据前的高度
        query.select('.fixed').boundingClientRect(function (rect) {
          // console.log(rect)
          that.setData({
            scrollViewHeight: res.screenHeight - rect.height,
            fixed: rect.height,
          })
        }).exec();
      }).catch(err => {
        console.log(err)
      })
    }
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
      navHeight: this.store.data.navHeight,
    })

    this.setDate()
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