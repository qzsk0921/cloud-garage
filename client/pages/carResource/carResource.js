// pages/carResource/carResource.js
// import commonStore from '../../store/common-store.js'
import {
  getViewRecord,
  getMyResource,
  getTeamResource,
  getHelpResource,
  getOtherTeamResource,
  getMarketResource,
  cancelSaleGoods
} from '../../api/goods'
import store from '../../store/common'
import create from '../../utils/create'

// Page({
create(store, {
  /**
   * 页面的初始数据
   */
  data: {
    // userInfo: null,

    settingInfo: {}, //微信设置信息 settingInfo.authSetting['scope.userInfo'](微信已授权)
    menuButtonObject: null,
    systemInfo: null,
    navHeight: null,

    searchKeyword: '',
    sq_jinzhu_id: '',

    isOverShare: true,
    // ...commonStore.data,
    tabbar: ['全部', '在售', '待审', '审核未通过', '下架'],
    // tabbarNum: [90, 1, 0, 0, 88],
    tabbarNum: [0, 0, 0, 0, 0],
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
    page_size: 5,
  },
  inputHandle(e) {
    console.log(e)
    this.data.searchKeyword = e.detail.value
  },
  searchHandle() {
    this.setData({
      searchKeyword: this.data.searchKeyword
    })
    this[this.data.apiName]()
  },
  changeTab(e) {
    const index = e.target.dataset.index
    const data = this.data
    // const currentActivity = data.activityList[index]

    let objData = {
      tabIndex: index,
    }

    if (data.activityList[index].count > 1) {
      objData[[`activityList[${index}].count`]] = 1
    }

    this.setData(objData)
    // 缓存，减少请求(上下架切换状态不能用缓存)
    // if (!currentActivity.activityCache.length) {
    // this.getActivityList().then(res => {
    //   // 缓存，减少请求
    //   this.setData({
    //     [`activityList[${index}].activityCache`]: res.data.data.data,
    //     [`activityList[${index}].total_page`]: res.data.data.last_page
    //   })
    // })
    this[this.data.apiName]()
  },
  // 帮卖车源页 取消帮卖
  cancelSaleHandle(e) {
    console.log(e)
    const goods_id = e.currentTarget.dataset.activity_id
    cancelSaleGoods({
      goods_id
    }).then(res => {
      wx.showToast({
        title: '取消成功',
        icon: 'none'
      })
      this.setData({
        triggered: false,
        'activityList.count': 1
      })
      this[this.data.apiName]()
    }).catch(err => {
      wx.showToast({
        title: err.msg,
        icon: 'none'
      })
    })
  },
  // 帮卖车源页 联系商家
  callSaleHandle(e) {
    const phone = e.currentTarget.dataset.phone
    wx.makePhoneCall({
      phoneNumber: phone,
    })
  },
  scrollToRefresherrefresh(e) {
    console.log('scrollToRefresherrefresh')
    this.setData({
      triggered: false,
      'activityList.count': 1
    })
    // if (this.data.options.res === 'mycar') {
    //   this[this.data.apiName]()
    // } else if (this.data.options.res === 'teamcar') {
    //   this[this.data.apiName]()
    // } else if (this.data.options.res === "helpcar") {
    //   this[this.data.apiName]()
    // } else if (this.data.options.res === 'record') {
    //   this[this.data.apiName]()
    // }
    this[this.data.apiName]()
  },
  // // 滚动到最底部
  scrollToLower(e) {
    console.log(e)
    console.log('scrollToLower')
    let activityList = this.data.activityList

    // if (this.data.options.res === 'mycar') {
    //   this.data.apiName('scrollToLower')
    // } else if (this.data.options.res === 'teamcar') {
    //   this.data.apiName('scrollToLower')
    // } else if (this.data.options.res === "helpcar") {
    //   if (activityList.count + 1 > activityList.total_page) return
    //   this.setData({
    //     'activityList.count': ++activityList.count
    //   })
    //   this.data.apiName('scrollToLower')
    // } else if (this.data.options.res === 'record') {
    //   if (activityList.count + 1 > activityList.total_page) return
    //   this.setData({
    //     'activityList.count': ++activityList.count
    //   })
    //   this.data.apiName('scrollToLower')
    // } else if (this.data.options.res === 'otherTeamcar') {
    //   this.data.apiName('scrollToLower')
    // } else if (this.data.options.res === 'getmarketcar') {
    //   this.data.apiName('scrollToLower')
    // }

    if (this.data.options.res === "helpcar" || this.data.options.res === 'record') {
      if (activityList.count + 1 > activityList.total_page) return
      this.setData({
        'activityList.count': ++activityList.count
      })
    } else {
      if (activityList.count + 1 > activityList.total_page) return
      this.setData({
        [`activityList[${this.data.tabIndex}].count`]: ++activityList[this.data.tabIndex].count
      })
    }

    this[this.data.apiName]('scrollToLower')
  },
  tabIndexParse(index) {
    let status
    switch (index) {
      // 状态 0:创建 1:待审核 2:审核驳回 3:推广中 4:已下架
      // 状态 4:待审核 1:正常 2:下架 3:审核未通过 0:所有
      case 0:
        status = 0
        break;
      case 1:
        status = 1
        break;
      case 2:
        status = 4
        break;
      case 3:
        status = 3
        break;
      case 4:
        status = 2
        break;
      default:
        console.log(`Sorry, we are out of ${index}.`)
    }
    return status
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // commonStore.bind('carResiyrcePage', this)
    // commonStore.init()
    const data = this.data
    this.setData({
      options
    })

    let navigationBarTitleText, apiName
    if (options.res === 'mycar') {
      navigationBarTitleText = '我的车源'
      apiName = 'getMyResource'
      this.getMyResource()
    } else if (options.res === 'teamcar') {
      navigationBarTitleText = '团队车源'
      apiName = 'getTeamResource'
      this.getTeamResource()
    } else if (options.res === "helpcar") {
      navigationBarTitleText = '帮卖车源'
      apiName = 'getHelpResource'
      this.getHelpResource()
    } else if (options.res === 'record') {
      navigationBarTitleText = '浏览记录'
      apiName = 'getViewRecord'
      this.getViewRecord()
    } else if (options.res === 'otherTeamcar' || options.t == 1) {
      navigationBarTitleText = '更多车源'
      apiName = 'getOtherTeamResource'
      this.getOtherTeamResource()
    } else if (options.res === 'marketcar' || options.t == 2) {
      // // 他人车源
      // navigationBarTitleText = '市场车源'
      // apiName = 'getMarketResource'
      // this.getMarketResource()
      wx.switchTab({
        url: '/pages/index/index',
      })
    }

    this.setData({
      navigationBarTitleText,
      apiName,
      sq_jinzhu_id: options.u ? options.u : ''
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
        // scrollViewHeight: that.store.data.systemInfo.screenHeight - (rect.height + that.store.data.navHeight),
        scrollViewHeight: that.store.data.systemInfo.screenHeight - (that.store.data.navHeight),
        fixed: rect.height,
      })
    }).exec();

    if (this.data.navigationBarTitleText !== '浏览记录' && this.data.navigationBarTitleText !== '帮卖车源' && this.data.navigationBarTitleText !== '更多车源') {
      query.select('.tab').boundingClientRect(function (rect) {
        that.setData({
          tabWidth: rect.width,
        })
      }).exec();
    }
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
  onShareAppMessage: function (res) {
    console.log(this.store.data.useInfo)
    if (res.from === 'button') {
      // 来自页面内转发按钮
      if (this.data.navigationBarTitleText === '我的车源') {
        return {
          title: this.data.navigationBarTitleText,
          // path: `pages/carResource/carResource?res=marketcar&sq_jinzhu_id=${this.store.data.userInfo.id}`,
          // 1我的车源 2团队车源
          path: `pages/carResource/carResource?t=1&res=marketcar&u=${this.store.data.userInfo.sq_jinzhu_id}&s=${this.store.data.userInfo.id}`,
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
          title: this.data.navigationBarTitleText,
          path: `pages/carResource/carResource?t=2&res=otherTeamcar&u=${this.store.data.userInfo.sq_jinzhu_id}&s=${this.store.data.userInfo.id}`,
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
  },
  getViewRecord(dataObj) {
    const _data = this.data
    // dataObj = dataObj ? dataObj : {
    //   page: this.data.page,
    //   page_size: this.data.page_size
    // }
    let tempData
    if (!dataObj) {
      tempData = {
        page: _data.page,
        page_size: _data.page_size,
      }
    } else if (dataObj === 'scrollToLower') {
      tempData = {
        page: _data.activityList.count,
        page_size: _data.page_size,
      }
    }
    console.log(tempData)
    return new Promise((resolve, reject) => {
      getViewRecord(tempData).then(res => {
        if (dataObj === 'scrollToLower') {
          _data.activityList.activityCache.push(...res.data.data)
          this.setData({
            [`activityList.activityCache`]: _data.activityList.activityCache,
            [`activityList.total_page`]: res.data.last_page
          })
        } else {
          this.setData({
            'activityList.activityCache': res.data.data,
            'activityList.total_page': res.data.last_page,
            'activityList.count': res.data.current_page,
          })
        }
        resolve(res)
      }).catch(err => {
        reject(err)
      })
    })
  },
  getHelpResource(dataObj) {
    const _data = this.data
    let tempData
    if (!dataObj) {
      tempData = {
        page: _data.page,
        page_size: _data.page_size,
      }
    } else if (dataObj === 'scrollToLower') {
      tempData = {
        page: _data.activityList.count,
        page_size: _data.page_size,
      }
    }
    console.log(tempData)
    return new Promise((resolve, reject) => {
      getHelpResource(tempData).then(res => {
        if (dataObj === 'scrollToLower') {
          _data.activityList.activityCache.push(...res.data.data)
          this.setData({
            [`activityList.activityCache`]: _data.activityList.activityCache,
            [`activityList.total_page`]: res.data.last_page
          })
        } else {
          this.setData({
            'activityList.activityCache': res.data.data,
            'activityList.total_page': res.data.last_page,
            'activityList.count': res.data.current_page,
          })
        }
        resolve(res)
      }).catch(err => {
        reject(err)
      })
    })
  },
  getMyResource(dataObj) {
    const _data = this.data
    // dataObj = dataObj ? dataObj : {
    //   page: this.data.page,
    //   page_size: this.data.page_size
    // }
    let tempData
    if (!dataObj) {
      tempData = {
        page: _data.page,
        page_size: _data.page_size,
        searchKeyword: _data.searchKeyword
      }
    } else if (dataObj === 'scrollToLower') {
      tempData = {
        page: _data.activityList[_data.tabIndex].count,
        page_size: _data.page_size,
        searchKeyword: _data.searchKeyword
      }
    }

    //tabIndex和status不一样需要解析
    const status = this.tabIndexParse(this.data.tabIndex)
    // if (status) {
    tempData.status = status
    // }
    console.log(tempData)

    return new Promise((resolve, reject) => {
      getMyResource(tempData).then(res => {
        if (dataObj === 'scrollToLower') {
          _data.activityList.activityCache.push(...res.data.data)
          // this.setData({
          //   [`activityList.activityCache`]: _data.activityList.activityCache,
          //   [`activityList.total_page`]: res.data.last_page
          // })
          this.setData({
            [`activityList[${data.tabIndex}].activityCache`]: _data.activityList.activityCache,
            [`activityList[${data.tabIndex}].total_page`]: res.data.last_page,
            [`activityList[${_data.tabIndex}].count`]: res.data.current_page,
          })
        } else {
          // all	所有 sale	在售 pending	审核中 fail	审核失败 down	下架
          let tabbarNum = [res.data.all, res.data.sale, res.data.pending, res.data.fail, res.data.down]

          // this.setData({
          //   tabbarNum,
          //   'activityList.activityCache': res.data.data,
          //   'activityList.total_page': res.data.last_page
          // })
          this.setData({
            tabbarNum,
            [`activityList[${_data.tabIndex}].activityCache`]: res.data.data,
            [`activityList[${_data.tabIndex}].total_page`]: res.data.last_page,
            [`activityList[${_data.tabIndex}].count`]: 1
          })
        }
        resolve(res)
      }).catch(err => {
        reject(err)
      })
    })
  },
  getTeamResource(dataObj) {
    const _data = this.data

    let tempData
    if (!dataObj) {
      tempData = {
        page: _data.page,
        page_size: _data.page_size,
        searchKeyword: _data.searchKeyword
      }
    } else if (dataObj === 'scrollToLower') {
      tempData = {
        page: _data.activityList[_data.tabIndex].count,
        page_size: _data.page_size,
        searchKeyword: _data.searchKeyword
      }
    }

    //tabIndex和status不一样需要解析
    const status = this.tabIndexParse(_data.tabIndex)
    // if (status) {
    tempData.status = status
    // }

    console.log(tempData)

    return new Promise((resolve, reject) => {
      getTeamResource(tempData).then(res => {
        if (dataObj === 'scrollToLower') {
          _data.activityList.activityCache.push(...res.data.data)

          this.setData({
            [`activityList[${_data.tabIndex}].activityCache`]: _data.activityList.activityCache,
            [`activityList[${_data.tabIndex}].total_page`]: res.data.last_page,
            [`activityList[${_data.tabIndex}].count`]: res.data.current_page,
          })
        } else {
          let tabbarNum = [res.data.all, res.data.sale, res.data.pending, res.data.fail, res.data.down]
          // this.setData({
          //   tabbarNum,
          //   'activityList.activityCache': res.data.data,
          //   'activityList.total_page': res.data.last_page
          // })
          this.setData({
            tabbarNum,
            [`activityList[${_data.tabIndex}].activityCache`]: res.data.data,
            [`activityList[${_data.tabIndex}].total_page`]: res.data.last_page,
            [`activityList[${_data.tabIndex}].count`]: 1
          })
        }
        resolve(res)
      }).catch(err => {
        reject(err)
      })
    })
  },
  getOtherTeamResource(dataObj) {
    const _data = this.data
    let tempData
    if (!dataObj) {
      tempData = {
        page: _data.page,
        page_size: _data.page_size,
        searchKeyword: _data.searchKeyword,
        sq_jinzhu_id: _data.sq_jinzhu_id
      }
    } else if (dataObj === 'scrollToLower') {
      tempData = {
        page: _data.activityList.count,
        page_size: _data.page_size,
        searchKeyword: _data.searchKeyword,
        sq_jinzhu_id: _data.sq_jinzhu_id
      }
    }
    console.log(tempData)
    return new Promise((resolve, reject) => {
      getOtherTeamResource(tempData).then(res => {
        if (dataObj === 'scrollToLower') {
          _data.activityList.activityCache.push(...res.data.data)
          this.setData({
            [`activityList.activityCache`]: _data.activityList.activityCache,
            [`activityList.total_page`]: res.data.last_page
          })
        } else {
          this.setData({
            'activityList.activityCache': res.data.data,
            'activityList.total_page': res.data.last_page,
            'activityList.count': res.data.current_page,
          })
        }
        resolve(res)
      }).catch(err => {
        reject(err)
      })
    })
  },
  getMarketResource(dataObj) {
    const _data = this.data
    let tempData
    if (!dataObj) {
      tempData = {
        page: _data.page,
        page_size: _data.page_size,
        searchKeyword: _data.searchKeyword,
        sq_jinzhu_id: _data.sq_jinzhu_id
      }
    } else if (dataObj === 'scrollToLower') {
      tempData = {
        page: _data.activityList[_data.tabIndex].count,
        page_size: _data.page_size,
        searchKeyword: _data.searchKeyword,
        sq_jinzhu_id: _data.sq_jinzhu_id
      }
    }
    //tabIndex和status不一样需要解析
    const status = this.tabIndexParse(_data.tabIndex)
    // if (status) {
    tempData.status = status
    // }
    console.log(tempData)
    return new Promise((resolve, reject) => {
      getMarketResource(tempData).then(res => {
        if (dataObj === 'scrollToLower') {
          _data.activityList.activityCache.push(...res.data.data)
          this.setData({
            [`activityList[${_data.tabIndex}].activityCache`]: _data.activityList.activityCache,
            [`activityList[${_data.tabIndex}].total_page`]: res.data.last_page,
            [`activityList[${_data.tabIndex}].count`]: res.data.current_page,
          })
        } else {
          let tabbarNum = [res.data.all, res.data.sale, res.data.pending, res.data.fail, res.data.down]
          this.setData({
            tabbarNum,
            [`activityList[${_data.tabIndex}].activityCache`]: res.data.data,
            [`activityList[${_data.tabIndex}].total_page`]: res.data.last_page,
            [`activityList[${_data.tabIndex}].count`]: 1
          })
        }
        resolve(res)
      }).catch(err => {
        reject(err)
      })
    })
  },
})