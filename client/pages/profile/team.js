// pages/profile/team.js
import {
  getViewRecord,
  getMyResource,
  getTeamResource,
  getHelpResource,
  getOtherTeamResource,
  getPersonalResource,
  cancelSaleGoods
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
    // userInfo: null,
    navigationBarTitleText: '我的团队',
    touchMoveEnabled: true,
    refresherEnabled: true, //初始值不启用
    invitscanDialogVisibile: false, //邀请扫码

    settingInfo: {}, //微信设置信息 settingInfo.authSetting['scope.userInfo'](微信已授权)
    menuButtonObject: null,
    systemInfo: null,
    navHeight: null,

    searchKeyword: '',
    sq_jinzhu_id: '',

    isOverShare: true,
    // ...commonStore.data,
    scrollViewHeight: 0,
    refresherEnabled: true, //初始值不启用
    triggered: false,
    activityList: {
      activityCache: [
        {
          avatar:'https://sharepuls.xcmbkj.com/Fqy_7NdHF8isvFgbGFKUmbOC853w',
          nickname: '用户昵称1',
          date1: '2021/7/22',
          date2: '2021/3/22',
          source1: 21,
          source2: 31
        },
        {
          avatar:'https://sharepuls.xcmbkj.com/Fqy_7NdHF8isvFgbGFKUmbOC853w',
          nickname: '用户昵称2',
          date1: '2021/7/22',
          date2: '2021/3/22',
          source1: 22,
          source2: 32
        },
        {
          avatar:'https://sharepuls.xcmbkj.com/Fqy_7NdHF8isvFgbGFKUmbOC853w',
          nickname: '用户昵称3',
          date1: '2021/7/22',
          date2: '2021/3/22',
          source1: 23,
          source2: 33
        }
      ],
      count: 1,
      total_page: 1,
    },
    dialog: {
      // 电话弹窗
      invitshare: {
        opened: 0,
      },
    },
    page: 1,
    page_size: 10,
  },
   // 邀请加入
   invitHandle() {
    this.setData({
      'dialog.invitshare.opened': 1,
    })
  },
  // 面对面扫码弹窗
  awakenCodeHandle() {
    this.setData({
      invitscanDialogVisibile: true
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

        if (diffX < 0 && this.data.activityList.activityCache[this.data.itemIndex].isMoved) { //向右
          translateX = 'transform: translateX(' + (diffX / 1 < -2 * 98 ? 0 : -2 * 98 + -diffX / 1) + 'rpx' + ');';
          if (this.data.refresherEnabled) {
            this.setData({
              refresherEnabled: !this.data.refresherEnabled
            })
          }
        } else if (diffX > 0 && !this.data.activityList.activityCache[this.data.itemIndex].isMoved) { //向左
          translateX = 'transform: translateX(' + (diffX / 1 > 2 * 98 ? -2 * 98 : -diffX / 1) + 'rpx' + ');';
          if (this.data.refresherEnabled) {
            this.setData({
              refresherEnabled: !this.data.refresherEnabled
            })
          }
        } else {
          // translateX = 'transform: translateX(0);';
        }
        this.setData({
          [`activityList.activityCache[${this.data.itemIndex}].translateX`]: translateX,
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
      if (diffX < 0 && this.data.activityList.activityCache[this.data.itemIndex].isMoved) { //向右
        // if (diffX / 1 < -50) {
        if (diffX / 1 < -20) {
          translateX = 'transform: translateX(0rpx);'
          this.setData({
            [`activityList.activityCache[${this.data.itemIndex}].isMoved`]: 0,
            [`activityList.activityCache[${this.data.itemIndex}].translateX`]: translateX,
          })
        } else {
          translateX = 'transform: translateX(-' + 2 * 98 + 'rpx)';
          this.setData({
            [`activityList.activityCache[${this.data.itemIndex}].translateX`]: translateX,
          })
        }
      } else if (diffX > 0 && !this.data.activityList.activityCache[this.data.itemIndex].isMoved) { //向左
        // if (diffX / 1 > 50) {
        if (diffX / 1 > 20) {
          translateX = 'transform: translateX(-' + 2 * 98 + 'rpx)';
          this.setData({
            [`activityList.activityCache[${this.data.itemIndex}].isMoved`]: 1,
            [`activityList.activityCache[${this.data.itemIndex}].translateX`]: translateX,
          })
        } else {
          translateX = 'transform: translateX(0rpx);';
          this.setData({
            [`activityList.activityCache[${this.data.itemIndex}].translateX`]: translateX,
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
      if (diffX < 0 && this.data.activityList.activityCache[this.data.itemIndex].isMoved) { //向右
        if (diffX / 1 < -50) {
          translateX = 'transform: translateX(0rpx);'
          this.setData({
            [`activityList.activityCache[${this.data.itemIndex}].isMoved`]: 0,
            [`activityList.activityCache[${this.data.itemIndex}].translateX`]: translateX
          })
        } else {
          translateX = 'transform: translateX(-' + 2 * 98 + 'rpx)';
          this.setData({
            [`activityList.activityCache[${this.data.itemIndex}].translateX`]: translateX
          })
        }
      } else if (diffX > 0 && !this.data.activityList.activityCache[this.data.itemIndex].isMoved) { //向左
        if (diffX / 1 > 50) {
          translateX = 'transform: translateX(-' + 2 * 98 + 'rpx)';
          this.setData({
            [`activityList.activityCache[${this.data.itemIndex}].isMoved`]: 1,
            [`activityList.activityCache[${this.data.itemIndex}].translateX`]: translateX
          })
        } else {
          translateX = 'transform: translateX(0rpx);';
          this.setData({
            [`activityList.activityCache[${this.data.itemIndex}].translateX`]: translateX
          });
        }
      }
    }
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
      // 下架，待审，未通过点击不进详情
      const status = e.currentTarget.dataset.status
      if (status === 4 || status === 2 || status === 3) return false

      wx.navigateTo({
        url: `../detail/detail?id=${e.currentTarget.dataset.activity_id}`,
      })
    }
  },
  scrollToRefresherPull() {
    console.log('scrollToRefresherPull')
    // 禁用左右滑动
    if (this.data.touchMoveEnabled) {
      this.setData({
        touchMoveEnabled: !this.data.touchMoveEnabled
      })
    }
  },
  // 下拉刷新被复位
  scrollToRefresherStore() {
    if (!this.data.touchMoveEnabled) {
      this.setData({
        touchMoveEnabled: !this.data.touchMoveEnabled
      })
    }
  },
  scrollToRefresherAbort() {
    console.log('scrollToRefresherAbort')
    if (!this.data.touchMoveEnabled) {
      this.setData({
        touchMoveEnabled: !this.data.touchMoveEnabled
      })
    }
  },
  scrollToRefresherrefresh(e) {
    console.log('scrollToRefresherrefresh')
    if(this.data.activityList.count) {
      this.setData({
        triggered: false,
        'activityList.count': 1
      })
    } else if(this.data.activityList.count){
      this.setData({
        triggered: false,
        'activityList.count': 1
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
    // console.log(this.data.options)
    if (['helpcar', 'record', 'otherTeamcar', 'personalcar'].includes(this.data.options.res) || [1, 2].cludes(this.data.options.t)) {
      if (activityList.count + 1 > activityList.total_page) return
      this.setData({
        'activityList.count': ++activityList.count
      })
    } else {
      if (activityList.count + 1 > activityList.total_page) return
      this.setData({
        'activityList.count': ++activityList.count
      })
    }

    this[this.data.apiName]('scrollToLower')
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.hideShareMenu()
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

    // let navigationBarTitleText, apiName, myid
    // if (options.res === 'mycar') {
    //   // 1:团队车源，2:个人车源，3:商品详情，4:帮卖商品详情
    //   this.store.data.type = 2
    //   this.update()

    //   navigationBarTitleText = '我的车源'
    //   myid = 1
    //   apiName = 'getMyResource'
    //   // this.getMyResource()
    // } else if (options.res === 'teamcar') {
    //   this.store.data.type = 1
    //   this.update()

    //   navigationBarTitleText = '团队车源'
    //   myid = 2
    //   apiName = 'getTeamResource'
    //   this.getTeamResource()
    // } else if (options.res === "helpcar") {
    //   this.store.data.type = 4
    //   this.update()

    //   navigationBarTitleText = '帮卖车源'
    //   myid = 3
    //   apiName = 'getHelpResource'
    //   this.getHelpResource()
    // } else if (options.res === 'record') {
    //   navigationBarTitleText = '浏览记录'
    //   myid = 4
    //   apiName = 'getViewRecord'
    //   this.getViewRecord()
    // } else if (options.res === 'otherTeamcar' || options.t == 1) {
    //   // 他人查看团队车源

    //   wx.getSystemInfo().then(res => {
    //     // console.log(res)
    //     this.store.data.systemInfo = res
    //     this.store.data.navHeight = res.statusBarHeight + this.store.data.menuButtonObject.height + (this.store.data.menuButtonObject.top - res.statusBarHeight) * 2
    //     this.update()
    //     this.setData({
    //       scrollViewHeight: res.screenHeight - (this.store.data.navHeight),
    //     })
    //   }).catch(err => {
    //     console.log(err)
    //   })

    //   getUserDetail().then(res => {
    //     this.store.data.userInfo = res.data
    //     this.store.update()
    //   })

    //   if (options.status === 'isEntryWithShare') {
    //     this.setData({
    //       navStatus: options.status
    //     })
    //   }
    //   navigationBarTitleText = '团队车源'
    //   myid = 5
    //   apiName = 'getOtherTeamResource'
    //   this.getOtherTeamResource()
    // } else if (options.res === 'personalcar' || options.t == 2) {
    //   // 他人查看个人车源

    //   wx.getSystemInfo().then(res => {
    //     // console.log(res)
    //     this.store.data.systemInfo = res
    //     this.store.data.navHeight = res.statusBarHeight + this.store.data.menuButtonObject.height + (this.store.data.menuButtonObject.top - res.statusBarHeight) * 2
    //     this.update()
    //     this.setData({
    //       scrollViewHeight: res.screenHeight - (this.store.data.navHeight),
    //     })
    //   }).catch(err => {
    //     console.log(err)
    //   })

    //   getUserDetail().then(res => {
    //     this.store.data.userInfo = res.data
    //     this.store.update()
    //     navigationBarTitleText = `（${this.store.data.userInfo.nickName}）车源`
    //   })

    //   if (options.status === 'isEntryWithShare') {
    //     this.setData({
    //       navStatus: options.status
    //     })
    //   }

    //   // navigationBarTitleText = `（${this.store.data.userInfo.nickName}）车源`
    //   myid = 6
    //   apiName = 'getPersonalResource'
    //   this.getPersonalResource()
    // }

    this.setData({
      navigationBarTitleText,
      apiName,
      sq_jinzhu_id: options.u ? options.u : '',
      myid
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
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.setData({
      navHeight: this.store.data.navHeight,
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
          title: this.store.data.userInfo.nickName + '的车源，任你挑选',
          // path: `pages/carResource/carResource?res=marketcar&sq_jinzhu_id=${this.store.data.userInfo.id}`,
          // 1我的车源 2团队车源
          path: `pages/carResource/carResource?t=2&res=personalcar&u=${this.store.data.userInfo.sq_jinzhu_id}&s=${this.store.data.userInfo.id}&status=isEntryWithShare`,
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
          title: '精选车源，任你挑选',
          path: `pages/carResource/carResource?t=1&res=otherTeamcar&u=${this.store.data.userInfo.sq_jinzhu_id}&s=${this.store.data.userInfo.id}&status=isEntryWithShare`,
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
        console.log(this.data.activityList.activityCache)
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

    return new Promise((resolve, reject) => {
      getMyResource(tempData).then(res => {
        if (dataObj === 'scrollToLower') {
          _data.activityList.activityCache.push(...res.data.data)
          // this.setData({
          //   [`activityList.activityCache`]: _data.activityList.activityCache,
          //   [`activityList.total_page`]: res.data.last_page
          // })
          this.setData({
            [`activityList[${_data.tabIndex}].activityCache`]: _data.activityList.activityCache,
            [`activityList[${_data.tabIndex}].total_page`]: res.data.last_page,
            [`activityList[${_data.tabIndex}].count`]: res.data.current_page,
          })
        } else {
          this.setData({
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
          this.setData({
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
        sq_jinzhu_id: _data.sq_jinzhu_id ? _data.sq_jinzhu_id : _data.options.u
      }
    } else if (dataObj === 'scrollToLower') {
      tempData = {
        page: _data.activityList.count,
        page_size: _data.page_size,
        keyword: _data.searchKeyword,
        sq_jinzhu_id: _data.sq_jinzhu_id ? _data.sq_jinzhu_id : _data.options.u
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
        sq_jinzhu_id: _data.sq_jinzhu_id ? _data.sq_jinzhu_id : _data.options.u
      }
    } else if (dataObj === 'scrollToLower') {
      tempData = {
        page: _data.activityList[_data.tabIndex].count,
        page_size: _data.page_size,
        keyword: _data.searchKeyword,
        sq_jinzhu_id: _data.sq_jinzhu_id ? _data.sq_jinzhu_id : _data.options.u
      }
    }

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