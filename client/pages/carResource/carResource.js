// pages/carResource/carResource.js
import commonStore from '../../store/common-store.js'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    isOverShare: true,
    ...commonStore.data,
    tabbar: ['全部', '在售', '待审', '审核未通过', '下架'],
    tabbarNum: [90, 1, 0, 0, 88],
    tabWidth: null,
    tabIndex: 0,
    scrollViewHeight: 0,
    refresherEnabled: true, //初始值不启用
    triggered: false,
    activityList: [{
      activityCache: [], //orderAllCache
      count: 1,
      total_page: 1,
      // method: "getOrderAll"
    }, {
      activityCache: [], //orderPayCache
      count: 1,
      total_page: 1,
      // method: "getOrderPay"
    }, {
      activityCache: [], //orderPaidCache
      count: 1,
      total_page: 1
      // method: "getOrderPaid"
    }, {
      activityCache: [], //orderFinishCache
      count: 1,
      total_page: 1,
      // method: "getOrderFinish"
    }, {
      activityCache: [], //orderCancelCache
      count: 1,
      total_page: 1,
      // method: "getactivityCache"
    }],
    page: 1,
    page_size: 10,
  },
  changeTab(e) {
    const index = e.target.dataset.index
    const data = this.data
    const currentActivity = data.activityList[index]

    let objData = {
      tabIndex: index,
    }

    if (data.activityList[index].count > 1) {
      objData[[`activityList[${index}].count`]] = 1
    }

    this.setData(objData)

    if (data.user_type === '1') {
      const share_user_shop_id = data.tabbar[index].share_user_shop_id
      if (!currentActivity.activityCache.length) {
        this.getBusinessActivityListOfSharer({
          page: data.page,
          page_size: data.page_size,
          share_user_shop_id
        }).then(res => {
          // 缓存，减少请求
          this.setData({
            [`activityList[${index}].activityCache`]: res.data.data.data,
            [`activityList[${index}].total_page`]: res.data.data.last_page
          })
        })
      }
    } else if (data.user_type === '2') {
      // 缓存，减少请求(上下架切换状态不能用缓存)
      // if (!currentActivity.activityCache.length) {
      this.getActivityList().then(res => {
        // 缓存，减少请求
        this.setData({
          [`activityList[${index}].activityCache`]: res.data.data.data,
          [`activityList[${index}].total_page`]: res.data.data.last_page
        })
      })
    }
  },
  scrollToRefresherrefresh(e) {
    console.log('scrollToRefresherrefresh')
    this.setData({
      triggered: false,
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    commonStore.bind('carResiyrcePage', this)
    commonStore.init()
    let navigationBarTitleText
    if (options.res === 'mycar') {
      navigationBarTitleText = '我的车源'
    } else if (options.res === 'groupcar') {
      navigationBarTitleText = '团队车源'
    } else if (options.res === "helpcar") {
      navigationBarTitleText = '帮卖车源'
    } else if (options.res === 'record') {
      navigationBarTitleText = '浏览记录'
    }
    this.setData({
      navigationBarTitleText
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
        scrollViewHeight: that.data.systemInfo.screenHeight - (rect.height + that.data.navHeight),
        fixed: rect.height,
      })
    }).exec();

    query.select('.tab').boundingClientRect(function (rect) {
      that.setData({
        tabWidth: rect.width,
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
  onShareAppMessage: function (res) {
    if (res.from === 'button') {
      // 来自页面内转发按钮
      if (this.data.navigationBarTitleText === '我的车源') {
        return {
          title: '分享'+this.data.navigationBarTitleText,
          path: 'pages/carResource/carResource?isShare=1',
          // imageUrl: 'https://sharepuls.xcmbkj.com/img_enrollment.png',
          imageUrl: '/assets/images/my_car_res.png',
          success(res) {
            console.log('分享成功', res)
          },
          fail(res) {
            console.log(res)
          }
        }
      } else if (this.data.navigationBarTitleText === '团队车源') {
        return {
          title: '分享'+this.data.navigationBarTitleText,
          path: 'pages/carResource/carResource?isShare=1',
          imageUrl: '/assets/images/team_car_res.png',
          success(res) {
            console.log('分享成功', res)
          },
          fail(res) {
            console.log(res)
          }
        }
      }
    }
  }
})