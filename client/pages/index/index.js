// const commonStore = require('../../store/common-store.js')
import {
  setTabBar
} from '../../utils/business'
import commonStore from '../../store/common-store.js'
import config from '../../config/index'

// 获取应用实例
const app = getApp()

Page({
  data: {
    defaultCity: '全国',
    width: 300,
    height: 300,
    aniPath: '', // Web URL
    anidata: {}, // JSON

    navStatus: 'isEmpty',
    navigationBarTitleText: "脉呗云车",
    ...commonStore.data,
    currentMenuIndex: 0, //默认 综合排序 0
    scrollViewHeight: 0,
    refresherEnabled: true, //初始值不启用
    triggered: false,
    conditionTag: [{
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
        "id": 304,
        "type": 2,
        "name": "2019微型车10微型车10微型车10CVT变速箱",
        "cover": "[\"http:\\/\\/baidu.com\"]",
        "cover_url": "https://www.nissanusa.com/content/dam/Nissan/us/vehicles/gtr/2021/overview/2021-nissan-gtr-awd-sports-car.jpg",
        "price": "10.00",
        "market_price": "10.00",
        "is_private": 0,
        "earnings": "0.00",
        "inventory": 0,
        "description": null,
        "category_id": 91,
        "shop_id": 46,
        "is_self": 0,
        "is_hot": 0,
        "is_sale": 0,
        "sale_price": "0.00",
        "is_pull": 0,
        "is_buy": 0,
        "enjoy": 0,
        "collect_num": 0,
        "comment_num": 0,
        "create_time": 1633769197,
        "read_num": 24,
        "province": 440000,
        "city": 441900,
        "is_postage": 0,
        "postage": "0.00",
        "is_delete": 0,
        "is_join": 0,
        "is_back": 0,
        "join_goods_id": 0,
        "team_id": 4,
        "status": 2,
        "sq_jinzhu_id": 11613,
        "c_type": 2,
        "kilometers_str": "10.00",
        "shop_phone": "13559570108",
        "area": "广东东莞",
        "price_str": "10元",
        "color": "红色",
        "licensing_str": "2019-03-12",
        "small_path": "pages/detail/detail?goods_id=304"
      }], //orderAllCache
      count: 1,
      total_page: 1,
      // method: "getOrderAll"
    },
    page: 1,
    page_size: 10,
  },
  watch: {
    defaultCity: {
      handler(newValue) {
        console.log(newValue);
        console.log('area update 重新搜索')
        // 重新搜索
      },
      deep: true
    }
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
  getLocation() {
    const that = this;
    wx.getLocation({
      type: 'wgs84',
      success: function (res) {
        let latitude = res.latitude
        let longitude = res.longitude
        wx.request({
          url: `https://apis.map.qq.com/ws/geocoder/v1/?location=${latitude},${longitude}&key=${config.tencentKey}`,
          success: res => {
            console.log(res)
            // console.log(res.data.result.ad_info.city+res.data.result.ad_info.adcode);
            that.setData({
              city: res.data.result.ad_info.city,
              currentCityCode: res.data.result.ad_info.adcode,
              county: res.data.result.ad_info.district,
              defaultCity: res.data.result.ad_info.city
            })
            // that.selectCounty();
          }
        })
      },
      fail: function (err) {
        console.log(err)
        that.setData({
          defaultCity: that.data.defaultCity
        })
      },
      complete: function () {
        console.log('complete')
        //第一次登陆提示
        that.setData({
          jsonAddDialogVisibile: true,
        })
      }
    })
  },
  onLoad() {
    getApp().setWatcher(this) //设置监听器
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
    // 1.进入首页时，需调用获取定位授权
    this.getLocation()
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
  // aaaa() {
  //   //授权引导提示弹窗
  //   this.setData({
  //     guideDialogVisibile: true,
  //     jsonAddDialogVisibile: true,
  //   })
  // }
})