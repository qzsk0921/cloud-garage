// const commonStore = require('../../store/common-store.js')
import {
  setTabBar
} from '../../utils/business'
import commonStore from '../../store/common-store.js'
// 获取应用实例
const app = getApp()

Page({
  data: {
    width: 300,
    height: 300,
    aniPath: '',    // Web URL
    anidata: {},     // JSON

    navStatus: 'isEmpty',
    navigationBarTitleText: "脉呗云车",
    ...commonStore.data,
    currentMenuIndex: 0, //默认 综合排序 0
    scrollViewHeight: 0,
    refresherEnabled: true, //初始值不启用
    triggered: false,
    conditionTag: [
      {
        name: '宝马',
        tag: 'brand',
        id: '1'
      },
      {
        name: '小型车',
        tag: 'class'
      }, 
      {
        name: '5-10万',
        type: 'normal',
        tag: 'price',
        id: '3'
      },
      {
        name: '6年以内',
        tag: 'year',
        id: '1'
      },
    ],
    // motto: 'Hello World',
    // userInfo: {},
    // hasUserInfo: false,
    // canIUse: wx.canIUse('button.open-type.getUserInfo'),
    // canIUseGetUserProfile: false,
    // canIUseOpenData: wx.canIUse('open-data.type.userAvatarUrl') && wx.canIUse('open-data.type.userNickName') // 如需尝试获取用户信息可改为false
    searchText: '',
    conditions: [{
      name: '综合排序',
      opened: 0,
      value: 1
    }, {
      name: '品牌',
      opened: 0,
      value: 2
    }, {
      name: '价格',
      opened: 0,
      value: 3,
    }, {
      name: '筛选',
      opened: 0,
      value: 4
    }],
    activityList: {
      activityCache: [{
        id:1,
        cover_url: '/assets/images/home_picture_loading.png',
        tit: '标题，最多显示两行，由上牌时间、厂家…',
        addr: '福建厦门',
        price: '48.7',
        year: '2019',
        color: '红色',
        mile: '10'
      }, {
        id:2,
        cover_url: '/assets/images/nav_icon_car_check.png',
        tit: '奔驰19年7月奔驰GLA45，正常行驶2万多里，原版原漆奔驰19年7月奔驰GLA45，正常行驶2万多里，原版原漆奔驰19年7月奔驰GLA45，正常行驶2万多里，原版原漆',
        addr: '福建厦门',
        price: '48.7',
        year: '2019',
        color: '红色',
        mile: '10'
      }, {
        id:3,
        cover_url: '/assets/images/nav_icon_car_check.png',
        tit: '标题，最多显示两行，由上牌时间、厂家…',
        addr: '福建厦门',
        price: '48.7',
        year: '2019',
        color: '红色',
        mile: '10'
      }, {
        id:4,
        cover_url: '/assets/images/nav_icon_car_check.png',
        tit: '标题，最多显示两行，由上牌时间、厂家…',
        addr: '福建厦门',
        price: '48.7',
        year: '2019',
        color: '红色',
        mile: '10'
      }], //orderAllCache
      count: 1,
      total_page: 1,
      // method: "getOrderAll"
    },
    page: 1,
    page_size: 10,
  },
  // 跳转到商品详情
  toDetailHandle(e) {
    console.log(e)
    wx.navigateTo({
      url: `../detail/detail?id=${e.currentTarget.dataset.activity_id}`,
    })
  },
  dropdownMenuItemTap(e) {
    console.log(e)
    const itemIndex = e.target.dataset.index
    if (itemIndex || itemIndex === 0) {
      //  0 排序用dropdown,1 品牌跳转, 2价格用dropdown, 3 筛选跳转

      // 高亮
      this.setData({
        currentMenuIndex: itemIndex
      })

      if (itemIndex === 0) {
        // 展开综合排序收齐其他(价格下拉窗)
        this.setData({
          [`conditions[2].opened`]: 0
        })
      } else if (itemIndex === 1) {
        console.log('品牌跳转')
        wx.navigateTo({
          url: '/pages/brand/brand',
        })
        return false
      } else if (itemIndex === 2) {
        // 展开价格收齐其他
        this.setData({
          [`conditions[0].opened`]: 0
        })
      } else if (itemIndex === 3) {
        console.log('筛选跳转')
        wx.navigateTo({
          url: '/pages/screen/screen',
        })
        return false
      }

      this.setData({
        [`conditions[${itemIndex}].opened`]: !this.data.conditions[itemIndex].opened
      })
    } else {
      this.data.conditions.forEach((item, index) => {
        if (item.opened) {
          this.setData({
            [`conditions[${index}].opened`]: 0
          })
        }
      });
    }
  },
  subClickableHandle(e) {
    console.log(e.detail)
    const currentSortObj = e.detail
    this.setData({
      [`conditions[0].opened`]: 0,
      [`conditions[0].name`]: currentSortObj.name
    })
  },
  // 价格筛选
  subClickablePriceHandle(e) {

    this.setData({
      [`conditions[2].opened`]: 0,
    })

    console.log(e.detail)
    const _data = this.data
    const subPriceObj = e.detail

    // let ind
    if (_data.conditionTag.length) {
      const even = _data.conditionTag.some((item, index) => {
        if (item.tag === 'price') {
          if (item.type === subPriceObj.type) {
            // 匹配 删除替换现有元素,修改数组
            // ind = index
            _data.conditionTag.splice(index, 1, subPriceObj)

            this.setData({
              conditionTag: _data.conditionTag
            })

          } else {
            // 没有匹配 添加到数组的末尾
            _data.conditionTag.splice(index, 1, subPriceObj)

            this.setData({
              conditionTag: _data.conditionTag
            })

          }
        }
        return item.tag === 'price'
      })

      if (!even) {
        // 还没有价格条件
        this.setData({
          conditionTag: _data.conditionTag.concat(subPriceObj)
        })
      }
    } else {
      this.setData({
        conditionTag: [].concat(subPriceObj)
      })
    }
  },
  handleInputFocus() {
    wx.navigateTo({
      url: '../search/search',
    })
  },
  jumpToSelectArea() {
    wx.navigateTo({
      url: '../area/area',
    })
  },
  conditionCloseTap(e) {
    console.log('conditionCloseTap')
    const dataset = e.target.dataset
    console.log(dataset)
    this.data.conditionTag.some((item, index) => {
      if (dataset.tag === item.tag && dataset.id === item.id) {
        console.log(index)
        this.data.conditionTag.splice(index, 1)
        this.setData({
          conditionTag: this.data.conditionTag
        })
        return true
      }
    })
  },
  // 清空
  clearConditionHandle(e) {
    console.log(e.target)
    console.log(e.currentTarget)
    this.setData({
      conditionTag: []
    })
  },
  scrollToRefresherPull() {
    console.log('scrollToRefresherPull')
    // 禁用左右滑动
  },
  scrollToRefresherrefresh(e) {
    console.log('scrollToRefresherrefresh')
    this.setData({
      triggered: false,
    })
  },
  // 下拉刷新被复位
  scrollToRefresherStore() {
    console.log('scrollToRefresherStore')
  },
  scrollToRefresherAbort() {
    console.log('scrollToRefresherAbort')
  },
  // // 滚动到最底部
  scrollToLower(e) {
    console.log(e)
    console.log('scrollToLower')
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {
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
    
    setTabBar.call(this)
  },
  // // 事件处理函数
  // bindViewTap() {
  //   wx.navigateTo({
  //     url: '../logs/logs'
  //   })
  // },
  onLoad() {
    // if (wx.getUserProfile) {
    //   this.setData({
    //     canIUseGetUserProfile: true
    //   })
    // }
    this.setData({
      navHeight: app.globalData.navHeight,
    })
    commonStore.bind('indexPage', this)
    commonStore.init()
  },
  onShow() {
    this.setData({
      defaultCity: app.globalData.defaultCity
    })
  },
  // getUserProfile(e) {
  //   // 推荐使用wx.getUserProfile获取用户信息，开发者每次通过该接口获取用户个人信息均需用户确认，开发者妥善保管用户快速填写的头像昵称，避免重复弹窗
  //   wx.getUserProfile({
  //     desc: '展示用户信息', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
  //     success: (res) => {
  //       console.log(res)
  //       this.setData({
  //         userInfo: res.userInfo,
  //         hasUserInfo: true
  //       })
  //     }
  //   })
  // },
  // getUserInfo(e) {
  //   // 不推荐使用getUserInfo获取用户信息，预计自2021年4月13日起，getUserInfo将不再弹出弹窗，并直接返回匿名的用户个人信息
  //   console.log(e)
  //   this.setData({
  //     userInfo: e.detail.userInfo,
  //     hasUserInfo: true
  //   })
  // }
  aaaa() {
    console.log('aaaa弹走鱼尾纹')
    //授权引导提示弹窗
    this.setData({
      // guideDialogVisibile: true,
      jsonAddDialogVisibile: true,
    })
  }
})