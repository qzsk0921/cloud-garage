// pages/carResource/carResource.js
// import commonStore from '../../store/common-store.js'
import {
  getViewRecord,
  getMyResource,
  getTeamResource,
  getHelpResource,
  getOtherTeamResource,
  getPersonalResource,
  cancelSaleGoods,
} from '../../api/goods'

import store from '../../store/common'
import create from '../../utils/create'
import {
  getUserDetail
} from '../../api/user.js'

let timer = null

// Page({
create(store, {
  /**
   * 页面的初始数据
   */
  data: {
    guideArr: ['https://sharepuls.xcmbkj.com/miniprogram_cloudgarage/car_guide_team_1.png', 'https://sharepuls.xcmbkj.com/miniprogram_cloudgarage/car_guide_2.png', 'https://sharepuls.xcmbkj.com/miniprogram_cloudgarage/car_guide_3.png'],
    guideIdx: 0,
    teamGuideImgVisible: 0,
    // userInfo: null,
    touchMoveEnabled: true,
    openvipDialogVisibile: false,
    confirmDialogVisibile: false,
    settingInfo: {}, //微信设置信息 settingInfo.authSetting['scope.userInfo'](微信已授权)
    menuButtonObject: null,
    systemInfo: null,
    navHeight: null,

    searchKeyword: '',

    user_id: '',
    team_id: '',

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
    page_size: 10,
  },
  // 编辑
  editHandle(e) {

    if (!this.store.data.userInfo.is_shop_vip) {
      this.awakenCodeHandle()
      return
    }

    const id = e.currentTarget.dataset.item.id
    console.log(id)

    wx.navigateTo({
      url: `/pages/publish/publish?id=${id}&mode=edit`,
    })
  },
  // 下架 导航链接，跳转至记账
  offHandle(e) {
    // console.log(e)
    const id = e.currentTarget.dataset.item.id
    wx.navigateTo({
      url: `/pages/carResource/bookkeeping?id=${id}`,
    })
  },
  touchStart: function (e) {
    if (e.touches.length == 1) {
      this.setData({
        startX: e.touches[0].clientX,
        itemIndex: e.currentTarget.dataset.index
      });
    }
  },
  touchMove: function (e) {
    if (timer) {
      clearTimeout(timer)
    }
    // 左右滑动时不下拉。下拉时不左右滑动
    timer = setTimeout(() => {
      if (!this.data.touchMoveEnabled) {
        return
      }
      console.log('touchMove')
      if (e.touches.length == 1) {
        const moveX = e.touches[0].clientX;
        // utils.debounce(() => {
        const diffX = this.data.startX - moveX;
        let translateX;

        if (diffX < 0 && this.data.activityList[this.data.tabIndex].activityCache[this.data.itemIndex].isMoved) { //向右
          translateX = 'transform: translateX(' + (diffX / 1 < -110 ? 0 : -110 + -diffX / 1) + 'rpx' + ');';
          if (this.data.refresherEnabled) {
            this.setData({
              refresherEnabled: !this.data.refresherEnabled
            })
          }
        } else if (diffX > 0 && !this.data.activityList[this.data.tabIndex].activityCache[this.data.itemIndex].isMoved) { //向左
          translateX = 'transform: translateX(' + (diffX / 1 > 110 ? -110 : -diffX / 1) + 'rpx' + ');';
          if (this.data.refresherEnabled) {
            this.setData({
              refresherEnabled: !this.data.refresherEnabled
            })
          }
        } else {
          // translateX = 'transform: translateX(0);';
        }
        this.setData({
          [`activityList[${this.data.tabIndex}].activityCache[${this.data.itemIndex}].translateX`]: translateX,
        });
        // }, 100)
      }
    }, 0)
  },
  touchEnd: function (e) {
    console.log('touchEnd')
    if (!this.data.refresherEnabled) {
      this.setData({
        refresherEnabled: !this.data.refresherEnabled,
      })
    }

    if (!this.data.touchMoveEnabled) return

    if (e.changedTouches.length == 1) {
      const endX = e.changedTouches[0].clientX;
      const diffX = this.data.startX - endX;
      let translateX;
      if (diffX < 0 && this.data.activityList[this.data.tabIndex].activityCache[this.data.itemIndex].isMoved) { //向右
        // if (diffX / 1 < -50) {
        if (diffX / 1 < -20) {
          translateX = 'transform: translateX(0rpx);'
          this.setData({
            [`activityList[${this.data.tabIndex}].activityCache[${this.data.itemIndex}].isMoved`]: 0,
            [`activityList[${this.data.tabIndex}].activityCache[${this.data.itemIndex}].translateX`]: translateX,
          })
        } else {
          translateX = 'transform: translateX(-' + 110 + 'rpx)';
          this.setData({
            [`activityList[${this.data.tabIndex}].activityCache[${this.data.itemIndex}].translateX`]: translateX,
          })
        }
      } else if (diffX > 0 && !this.data.activityList[this.data.tabIndex].activityCache[this.data.itemIndex].isMoved) { //向左
        // if (diffX / 1 > 50) {
        if (diffX / 1 > 20) {
          translateX = 'transform: translateX(-' + 110 + 'rpx)';
          this.setData({
            [`activityList[${this.data.tabIndex}].activityCache[${this.data.itemIndex}].isMoved`]: 1,
            [`activityList[${this.data.tabIndex}].activityCache[${this.data.itemIndex}].translateX`]: translateX,
          })
        } else {
          translateX = 'transform: translateX(0rpx);';
          this.setData({
            [`activityList[${this.data.tabIndex}].activityCache[${this.data.itemIndex}].translateX`]: translateX,
          });
        }
      }
    }
  },
  touchCancel(e) {
    //防止touchEnd不触发
    console.log('touchCancel')
    if (!this.data.refresherEnabled) {
      this.setData({
        refresherEnabled: !this.data.refresherEnabled
      })
    }

    if (!this.data.touchMoveEnabled) return

    if (e.changedTouches.length == 1) {
      const endX = e.changedTouches[0].clientX;
      const diffX = this.data.startX - endX;
      let translateX;
      if (diffX < 0 && this.data.activityList[this.data.tabIndex].activityCache[this.data.itemIndex].isMoved) { //向右
        if (diffX / 1 < -50) {
          translateX = 'transform: translateX(0rpx);'
          this.setData({
            [`activityList[${this.data.tabIndex}].activityCache[${this.data.itemIndex}].isMoved`]: 0,
            [`activityList[${this.data.tabIndex}].activityCache[${this.data.itemIndex}].translateX`]: translateX
          })
        } else {
          translateX = 'transform: translateX(-' + 110 + 'rpx)';
          this.setData({
            [`activityList[${this.data.tabIndex}].activityCache[${this.data.itemIndex}].translateX`]: translateX
          })
        }
      } else if (diffX > 0 && !this.data.activityList[this.data.tabIndex].activityCache[this.data.itemIndex].isMoved) { //向左
        if (diffX / 1 > 50) {
          translateX = 'transform: translateX(-' + 110 + 'rpx)';
          this.setData({
            [`activityList[${this.data.tabIndex}].activityCache[${this.data.itemIndex}].isMoved`]: 1,
            [`activityList[${this.data.tabIndex}].activityCache[${this.data.itemIndex}].translateX`]: translateX
          })
        } else {
          translateX = 'transform: translateX(0rpx);';
          this.setData({
            [`activityList[${this.data.tabIndex}].activityCache[${this.data.itemIndex}].translateX`]: translateX
          });
        }
      }
    }
  },
  teamGuideImgHandle() {

    const temp = {
      guideIdx: ++this.data.guideIdx,
    }

    if (this.data.guideIdx >= this.data.guideArr.length) {
      temp.teamGuideImgVisible = 0
    }

    this.setData(temp)
  },
  // 非会员引导开通云车会员
  awakenCodeHandle() {
    this.setData({
      openvipDialogVisibile: true
    })
  },
  // 对话框确认按钮
  diaConfirmHandle(e) {
    // 手机号授权成功
    // console.log('diaConfirmHandle')
    console.log(e.detail)
    if (e.detail) {
      // 更新用户数据
      getUserDetail().then(res => {
        this.store.data.userInfo = res.data
        this.store.update()
      })
    }
  },
  // 对话框取消按钮
  diaCancelHandle(e) {
    console.log('diaCancelHandle')
    console.log(e.detail)
  },
  // 发布车源
  publishHandle() {
    // 1.用户未授权手机号，弹窗提示
    // 2.用户已授权手机号，点击跳转至发布车源
    if (!this.store.data.userInfo.phone) {
      this.setData({
        confirmDialogVisibile: true,
        confirmText: '授权',
        confirmBgColor: '#2872EC'
      })
    } else {
      if (!this.store.data.userInfo.is_shop_vip) {
        this.setData({
          openvipDialogVisibile: true
        })
      } else {
        wx.navigateTo({
          url: '/pages/publish/publish',
        })
      }
    }
  },
  sideToolbarHandle() {
    // 更多车源(团队车源)
    wx.navigateTo({
      // url: `/pages/carResource/carResource?t=1&res=otherTeamcar&u=${this.store.data.userInfo.sq_jinzhu_id}`,
      url: `/pages/carResource/carResource?t=1&res=otherTeamcar&u=${this.store.data.userInfo.team_id}`,
    })
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
    const _this = this
    wx.showModal({
      title: '提示',
      content: '确定取消帮卖吗?',
      success(res) {
        if (res.confirm) {
          console.log('用户点击确定')
          cancelSaleGoods({
            goods_id
          }).then(res => {
            wx.showToast({
              title: '取消成功',
              icon: 'none'
            })
            // this.setData({
            //   triggered: false,
            //   'activityList.count': 1
            // })
            _this[_this.data.apiName]()
          }).catch(err => {
            wx.showToast({
              title: err.msg,
              icon: 'none'
            })
          })
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })

  },
  // 帮卖车源页 联系商家
  callSaleHandle(e) {
    const phone = e.currentTarget.dataset.phone
    wx.makePhoneCall({
      phoneNumber: phone,
    })
  },
  toDetailHandle(e) {
    console.log(e)
    console.log(this.store.data.userInfo)
    if (!this.store.data.userInfo || (this.store.data.userInfo && !this.store.data.userInfo.nickName)) {
      // 未授权提示授权
      this.setData({
        guideDialogVisibile: true,
        activity_id: e.currentTarget.dataset.activity_id
      })
    } else {
      // 已授权
      // 4:待审核 1:正常 2:下架 3:审核未通过 0:所有 
      // 下架，待审，点击不进详情
      // 审核未通过，点击进入车源拒审、下架说明详情页
      const status = e.currentTarget.dataset.status
      if (status === 4 || status === 2) return false
      if (status === 3) {
        wx.navigateTo({
          url: `/pages/carResource/denialDetail?id=${e.currentTarget.dataset.activity_id}`,
        })
      } else {
        wx.navigateTo({
          url: `../detail/detail?id=${e.currentTarget.dataset.activity_id}`,
        })
      }
    }
  },
  scrollToRefresherrefresh(e) {
    console.log('scrollToRefresherrefresh')
    if (this.data.activityList.count) {
      this.setData({
        triggered: false,
        'activityList.count': 1
      })
    } else if (this.data.activityList[this.data.tabIndex].count) {
      this.setData({
        triggered: false,
        [`activityList[${this.data.tabIndex}].count`]: 1
      })
    }

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
    console.log(this.data.options)
    if (['helpcar', 'record', 'otherTeamcar', 'personalcar'].includes(this.data.options.res) || (this.data.options.t && [1, 2].cludes(this.data.options.t))) {
      if (activityList.count + 1 > activityList.total_page) return
      this.setData({
        'activityList.count': ++activityList.count
      })
    } else {
      if (activityList[this.data.tabIndex].count + 1 > activityList[this.data.tabIndex].total_page) return
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
    wx.hideShareMenu()

    if (options && options.tabbarPage) {
      this.setData({
        tabbarPage: options.tabbarPage
      })
    }

    // commonStore.bind('carResiyrcePage', this)
    // commonStore.init()

    // scene 需要使用 decodeURIComponent 才能获取到生成二维码时传入的 scene
    // const order_id = options.order_id ? options.order_id : decodeURIComponent(options.scene)
    let temp = {}

    if (options.scene) {
      const scene = decodeURIComponent(options.scene).substr(1)
      console.log(scene)
      //scene=order_id=84&user_type=1
      //id=31&first_id=110&share_id=110
      if (scene && scene != 'undefined') {
        scene.split('&').forEach(it => {
          const i = it.split('=')
          temp[i[0]] = i[1]
        })
      } else {
        temp = options
      }
      options = temp
    }
    console.log(options)

    const data = this.data
    this.setData({
      options
    })

    // console.log(this.data)

    let navigationBarTitleText, apiName, myid, touchMoveEnabled = true
    if (options.res === 'mycar') {
      // 1:团队车源，2:个人车源，3:商品详情，4:帮卖商品详情
      this.store.data.type = 2
      this.update()

      navigationBarTitleText = '我的车源'
      myid = 1
      apiName = 'getMyResource'
      this.getMyResource()

      //第一次显示引导页 0 没来过 1 来过
      const teamGuideImgVisible = wx.getStorageSync('teamGuideImgVisible')
      // console.log(teamGuideImgVisible)
      if (!teamGuideImgVisible) {
        this.setData({
          teamGuideImgVisible: 1
        })
        wx.setStorageSync('teamGuideImgVisible', 1)
      }
    } else if (options.res === 'teamcar') {
      this.store.data.type = 1
      this.update()

      navigationBarTitleText = '团队车源'
      myid = 2
      apiName = 'getTeamResource'

      if (this.store.data.userInfo.is_captain) {
        //第一次显示引导页 0 没来过 1 来过
        const teamGuideImgVisible = wx.getStorageSync('teamGuideImgVisible')
        // console.log(teamGuideImgVisible)
        if (!teamGuideImgVisible) {
          this.setData({
            teamGuideImgVisible: 1
          })
          wx.setStorageSync('teamGuideImgVisible', 1)
        }
      } else {
        touchMoveEnabled = false
      }

      this.getTeamResource()

    } else if (options.res === "helpcar") {
      this.store.data.type = 4
      this.update()

      navigationBarTitleText = '帮卖车源'
      myid = 3
      apiName = 'getHelpResource'
      this.getHelpResource()
    } else if (options.res === 'record') {
      navigationBarTitleText = '浏览记录'
      myid = 4
      apiName = 'getViewRecord'
      this.getViewRecord()
    } else if (options.res === 'otherTeamcar' || options.t == 1) {
      // 他人查看团队车源

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

      getUserDetail().then(res => {
        this.store.data.userInfo = res.data
        this.store.update()
        this.setData({
          userInfo: res.data
        })
      })

      if (options.status === 'isEntryWithShare') {
        this.setData({
          navStatus: options.status
        })
      }
      navigationBarTitleText = '团队车源'
      myid = 5
      apiName = 'getOtherTeamResource'
      this.getOtherTeamResource()
    } else if (options.res === 'personalcar' || options.t == 2) {
      // 他人查看个人车源

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

      getUserDetail().then(res => {
        this.store.data.userInfo = res.data
        this.store.update()
        navigationBarTitleText = `（${this.store.data.userInfo.nickName}）车源`
      })

      if (options.status === 'isEntryWithShare') {
        this.setData({
          navStatus: options.status
        })
      }

      // navigationBarTitleText = `（${this.store.data.userInfo.nickName}）车源`
      myid = 6
      apiName = 'getPersonalResource'
      this.getPersonalResource()
    }

    this.setData({
      navigationBarTitleText,
      apiName,
      team_id: options.u ? options.u : '',
      myid,
      touchMoveEnabled
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
        scrollViewHeight: that.store.data.systemInfo.screenHeight - rect.height,
        fixed: rect.height,
      })
    }).exec();

    if (this.data.myid === 1 || this.data.myid === 2) {
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
      navHeight: this.store.data.navHeight,
    })

    if (this.store.data.userInfo) {
      this.setData({
        userInfo: this.store.data.userInfo
      })
    }
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
          title: this.store.data.userInfo.nickName + '的车源，任你挑选',
          // 1我的车源 2团队车源
          path: `pages/carResource/carResource?t=2&res=personalcar&u=${this.store.data.userInfo.team_id}&s=${this.store.data.userInfo.id}&status=isEntryWithShare`,
          // imageUrl: 'https://sharepuls.xcmbkj.com/img_enrollment.png',
          imageUrl: 'https://sharepuls.xcmbkj.com/miniprogram_cloudgarage/my_car_res.png',
          success(res) {
            console.log('分享成功', res)
          },
          fail(res) {
            console.log(res)
          }
        }
      } else if (this.data.navigationBarTitleText === '团队车源') {
        // 团队车源，在没有车源的情况下，点击分享，不进行分享逻辑执行，并toast：您当前没有可分享的车源
        return {
          title: '精选车源，任你挑选',
          path: `pages/carResource/carResource?t=1&res=otherTeamcar&u=${this.store.data.userInfo.team_id}&s=${this.store.data.userInfo.id}&status=isEntryWithShare`,
          imageUrl: 'https://sharepuls.xcmbkj.com/miniprogram_cloudgarage/team_car_res.png',
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
  shareHandle() {
    wx.showToast({
      title: '您当前没有可分享的车源',
      icon: 'none'
    })
  },
  shareHandle1() {
    wx.showToast({
      title: '您当前没有可分享的车源',
      icon: 'none'
    })
  },
  // 两个弹窗提示
  shareHandle2() {
    if (this.store.data.userInfo.is_captain && !this.store.data.userInfo.captain_is_vip) {
      this.setData({
        openvipDialogVisibile: true
      })
    } else if ((!this.store.data.userInfo.is_captain && this.store.data.userInfo.is_team_member) && !this.store.data.userInfo.captain_is_vip) {
      wx.showModal({
        title: '温馨提示',
        content: '团长会员已过期，无法使用该特权',
        showCancel: false,
        success(res) {
          if (res.confirm) {
            console.log('用户点击确定')
          } else if (res.cancel) {
            console.log('用户点击取消')
          }
        }
      })
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
        console.log(this.data.activityList[this.data.tabIndex].activityCache)
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
        keyword: _data.searchKeyword
      }
    } else if (dataObj === 'scrollToLower') {
      tempData = {
        page: _data.activityList[_data.tabIndex].count,
        page_size: _data.page_size,
        keyword: _data.searchKeyword
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
          _data.activityList[_data.tabIndex].activityCache.push(...res.data.data)
          // this.setData({
          //   [`activityList.activityCache`]: _data.activityList.activityCache,
          //   [`activityList.total_page`]: res.data.last_page
          // })
          this.setData({
            [`activityList[${_data.tabIndex}].activityCache`]: _data.activityList[_data.tabIndex].activityCache,
            [`activityList[${_data.tabIndex}].total_page`]: res.data.last_page,
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
          console.log(this.data.activityList)
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
        keyword: _data.searchKeyword
      }
    } else if (dataObj === 'scrollToLower') {
      tempData = {
        page: _data.activityList[_data.tabIndex].count,
        page_size: _data.page_size,
        keyword: _data.searchKeyword
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
          _data.activityList[_data.tabIndex].activityCache.push(...res.data.data)

          this.setData({
            [`activityList[${_data.tabIndex}].activityCache`]: _data.activityList[_data.tabIndex].activityCache,
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
        keyword: _data.searchKeyword,
        team_id: _data.team_id ? _data.team_id : _data.options.u
      }
    } else if (dataObj === 'scrollToLower') {
      tempData = {
        page: _data.activityList.count,
        page_size: _data.page_size,
        keyword: _data.searchKeyword,
        team_id: _data.team_id ? _data.team_id : _data.options.u
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
  getPersonalResource(dataObj) {
    const _data = this.data
    let tempData
    if (!dataObj) {
      tempData = {
        page: _data.page,
        page_size: _data.page_size,
        keyword: _data.searchKeyword,
        user_id: _data.user_id ? _data.user_id : _data.options.s
      }
    } else if (dataObj === 'scrollToLower') {
      tempData = {
        page: _data.activityList[_data.tabIndex].count,
        page_size: _data.page_size,
        keyword: _data.searchKeyword,
        user_id: _data.user_id ? _data.user_id : _data.options.s
      }
    }
    //tabIndex和status不一样需要解析
    const status = this.tabIndexParse(_data.tabIndex)
    // if (status) {
    tempData.status = status
    // }
    console.log(tempData)
    return new Promise((resolve, reject) => {
      getPersonalResource(tempData).then(res => {
        if (dataObj === 'scrollToLower') {
          _data.activityList.activityCache.push(...res.data.data)
          this.setData({
            // [`activityList[${_data.tabIndex}].activityCache`]: _data.activityList.activityCache,
            // [`activityList[${_data.tabIndex}].total_page`]: res.data.last_page,
            // [`activityList[${_data.tabIndex}].count`]: res.data.current_page,
            [`activityList.activityCache`]: _data.activityList.activityCache,
            [`activityList.total_page`]: res.data.last_page
          })
        } else {
          this.setData({
            // [`activityList[${_data.tabIndex}].activityCache`]: res.data.data,
            // [`activityList[${_data.tabIndex}].total_page`]: res.data.last_page,
            // [`activityList[${_data.tabIndex}].count`]: 1
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
})