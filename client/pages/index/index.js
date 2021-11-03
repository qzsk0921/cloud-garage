import {
  setTabBar
} from '../../utils/business'
import {
  getGoodsList
} from '../../api/goods'
// import {
//   updateUserInfo
// }from '../../api/user'
// import commonStore from '../../store/common-store.js'
import config from '../../config/index'

import store from '../../store/common'
import create from '../../utils/create'

// 获取应用实例
const app = getApp()

// Page({
create(store, {
  data: {
    settingInfo: {}, //微信设置信息 settingInfo.authSetting['scope.userInfo'](微信已授权)
    menuButtonObject: null,
    systemInfo: null,
    navHeight: null,

    searchKeyword: '',
    searchCity: '全国',
    searchCityCode: 0,
    searchSortType: 1,
    searchStartPrice: 0,
    searchEndPrice: '',
    searchHotBrand: '',
    searchBrand: 0,
    searchBrandName: '',
    searchObject: null, //更多筛选
    // searchCity: '全国',
    // searchCityCode: 0,
    // currentKeyword: '',
    // searchSortType: 1,
    // searchStartPrice: 0,
    // searchEndPrice: Infinity,

    width: 300,
    height: 300,
    aniPath: '', // Web URL
    anidata: {}, // JSON

    navStatus: 'isEmpty',
    navigationBarTitleText: "脉呗云车",
    // ...commonStore.data,
    currentMenuIndex: 0, //默认 综合排序 0
    scrollViewHeight: 0,
    refresherEnabled: true, //初始值不启用
    triggered: false,
    conditionTag: [
      // {
      //   name: '宝马',
      //   tag: 'brand',
      //   id: '1'
      // },
      // {
      //   name: '小型车',
      //   tag: 'class'
      // },
      // {
      //   name: '5-10万',
      //   type: 'normal',
      //   tag: 'price',
      //   id: '3'
      // },
      // {
      //   name: '6年以内',
      //   tag: 'year',
      //   id: '1'
      // },
    ],
    // motto: 'Hello World',
    // userInfo: {},
    // hasUserInfo: false,
    // canIUse: wx.canIUse('button.open-type.getUserInfo'),
    // canIUseGetUserProfile: false,
    // canIUseOpenData: wx.canIUse('open-data.type.userAvatarUrl') && wx.canIUse('open-data.type.userNickName') // 如需尝试获取用户信息可改为false
    // searchText: '',
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
    goodsList: {
      cache: [
        //   {
        //   "id": 304,
        //   "type": 2,
        //   "name": "2019微型车10微型车10微型车10CVT变速箱",
        //   "cover": "[\"http:\\/\\/baidu.com\"]",
        //   "cover_url": "https://www.nissanusa.com/content/dam/Nissan/us/vehicles/gtr/2021/overview/2021-nissan-gtr-awd-sports-car.jpg",
        //   "price": "10.00",
        //   "market_price": "10.00",
        //   "is_private": 0,
        //   "earnings": "0.00",
        //   "inventory": 0,
        //   "description": null,
        //   "category_id": 91,
        //   "shop_id": 46,
        //   "is_self": 0,
        //   "is_hot": 0,
        //   "is_sale": 0,
        //   "sale_price": "0.00",
        //   "is_pull": 0,
        //   "is_buy": 0,
        //   "enjoy": 0,
        //   "collect_num": 0,
        //   "comment_num": 0,
        //   "create_time": 1633769197,
        //   "read_num": 24,
        //   "province": 440000,
        //   "city": 441900,
        //   "is_postage": 0,
        //   "postage": "0.00",
        //   "is_delete": 0,
        //   "is_join": 0,
        //   "is_back": 0,
        //   "join_goods_id": 0,
        //   "team_id": 4,
        //   "status": 2,
        //   "sq_jinzhu_id": 11613,
        //   "c_type": 2,
        //   "kilometers_str": "10.00",
        //   "shop_phone": "13559570108",
        //   "area": "广东东莞",
        //   "price_str": "10元",
        //   "color": "红色",
        //   "licensing_str": "2019-03-12",
        //   "small_path": "pages/detail/detail?goods_id=304"
        // }
      ], //orderAllCache
      count: 1,
      total_page: 1,
      // method: "getOrderAll"
    },
    page: 1,
    page_size: 10,
  },
  watch: {
    searchObject: {
      handler(nv, ov) {
        console.log(nv, ov)
        // 过滤条件
        // if (this.store.data.searchObject != null && typeof this.store.data.searchObject === 'object') {
        //   const requireSearchObject = this.store.data.searchObject.filter(
        //     item => item.name !== '不限'
        //   )
        // }
        const requireSearchObject = this.store.data.searchObject.filter(
          item => item.name !== '不限'
        )
        console.log(requireSearchObject)
        if (ov && ov.length) {
          requireSearchObject.forEach(item => {
            ov.forEach((it, ind) => {
              if (it.tag === item.tag) {
                const temp = {
                  name: item.name,
                  id: item.id,
                  tag: item.tag
                }
                ov.splice(ind, 1, temp)
              }
            })
          })

          this.setData({
            conditionTag: ov,
            'goodsList.count': 1,
          })
        } else {
          this.setData({
            conditionTag: requireSearchObject,
            'goodsList.count': 1,
          })
        }

        // this.getGoodsList(this.store.data.searchObject)
      },
      deep: true
    },
    searchCityCode: {
      handler(newValue, oldValue) {
        console.log(newValue)
        // 重新搜索
        this.setData({
          'goodsList.count': 1,
        })
        // console.log(newValue)
        if (newValue) {
          // 定位111111 全国222222
          if (newValue === 111111 || newValue === 222222) {
            this.getGoodsList({
              city: 0
            })
          } else {
            this.getGoodsList({
              city: newValue
            })
          }
        } else if (newValue == 0 && oldValue == 0) {
          // 全国
          this.getGoodsList({
            city: 0
          })
        } else {
          // 全国
          this.setData({
            searchCity: this.store.data.searchCity
          })
          this.getGoodsList({
            city: 0
          })
        }
      },
      deep: true
    },
    conditionTag: {
      handler(nv, ov) {
        console.log(nv, ov)
        this.setData({
          'goodsList.count': 1,
        })
        this.getGoodsList()
      },
      deep: true
    },
    // searchBrand: {
    //   handler(nv, ov) {
    //     // console.log(nv)
    //     {
    //       //   name: '宝马',
    //       //   tag: 'brand',
    //       //   id: '1'
    //       // },
    //       const even = this.data.conditionTag.some((item, index) => {
    //         if (item.tag === 'brand') {
    //           if (nv === 0) return true
    //           this.data.conditionTag.splice(index, 1, {
    //             name: this.store.data.searchBrandName,
    //             tag: 'brand',
    //             id: nv
    //           })
    //           this.setData({
    //             conditionTag: this.data.conditionTag
    //           })
    //           return true
    //         } else {
    //           return false
    //         }
    //       })

    //       if (!even) {
    //         if (nv === 0) return true
    //         this.setData({
    //           conditionTag: this.data.conditionTag.concat([{
    //             name: this.store.data.searchBrandName,
    //             tag: 'brand',
    //             id: nv
    //           }])
    //         })
    //       }
    //       this.setData({
    //         'goodsList.count': 1,
    //       })
    //       this.getGoodsList({
    //         band_id: nv
    //       })
    //     }
    //   }
    // },
    searchKeyword: {
      handler(nv, ov) {
        console.log(nv)
        this.setData({
          'goodsList.count': 1,
        })
        this.getGoodsList({
          keyword: nv
        })
      }
    }
  },
  // 跳转到商品详情
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
      wx.navigateTo({
        url: `../detail/detail?id=${e.currentTarget.dataset.activity_id}`,
      })
    }
  },
  toDetail() {
    wx.navigateTo({
      url: `../detail/detail?id=${this.data.activity_id}`,
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
  // 排序筛选
  subClickableHandle(e) {
    console.log(e.detail)
    const currentSortObj = e.detail
    this.setData({
      [`conditions[0].opened`]: 0,
      [`conditions[0].name`]: currentSortObj.name,
      searchSortType: e.detail.value,
      'goodsList.count': 1
    })
    if (this.searchSortType !== e.detail.value) {
      this.getGoodsList()
    }
  },
  // 价格筛选
  subClickablePriceHandle(e) {
    this.setData({
      [`conditions[2].opened`]: 0
    })

    this.store.data.searchStartPrice = e.detail.start_price
    this.store.data.searchEndPrice = e.detail.end_price
    this.update()

    console.log(e.detail)
    const _data = this.data
    const subPriceObj = e.detail

    // let ind
    if (_data.conditionTag.length) {
      const even = _data.conditionTag.some((item, index) => {
        if (item.tag === 'price') {
          if (item.type === subPriceObj.type) {
            // 匹配 删除替换现有元素,修改数组
            if (subPriceObj.id === 1) {
              // 不限除外
              _data.conditionTag.splice(index, 1)
            } else {
              _data.conditionTag.splice(index, 1, subPriceObj)
            }

            this.setData({
              'goodsList.count': 1,
              conditionTag: _data.conditionTag
            })

          } else {
            // 没有匹配 添加到数组的末尾
            if (subPriceObj.id === 1) {
              // 不限除外
              _data.conditionTag.splice(index, 1)
            } else {
              _data.conditionTag.splice(index, 1, subPriceObj)
            }

            this.setData({
              'goodsList.count': 1,
              conditionTag: _data.conditionTag
            })

          }
        }
        return item.tag === 'price'
      })

      if (!even) {
        // 还没有价格条件
        this.setData({
          'goodsList.count': 1,
          conditionTag: _data.conditionTag.concat(subPriceObj)
        })
      }
    } else {
      // 不限除外
      if (subPriceObj.id === 1) return

      this.setData({
        'goodsList.count': 1,
        conditionTag: [].concat(subPriceObj)
      })
    }

    // if (this.data.searchStartPrice !== e.detail.start_price || this.data.searchEndPrice !== e.detail.end_price) {
    //   this.setData({
    //     // searchStartPrice: e.detail.start_price,
    //     // searchEndPrice: e.detail.end_price,
    //   })
    // }
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

    if (dataset.tag === 'price') {
      this.store.data.searchStartPrice = 0
      this.store.data.searchEndPrice = ''
      this.update()
    } else if (dataset.tag === 'brand') {
      this.store.data.searchBrand = 0
      this.store.data.searchBrandName = ''
      this.update()
    }
    // console.log(dataset)
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
    this.store.data.searchBrand = 0
    this.store.data.searchBrandName = ''
    this.store.data.searchStartPrice = 0
    this.store.data.searchEndPrice = ''
    this.update()

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
      'goodsList.count': 1
    })

    this.getGoodsList()
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
    let goodsList = this.data.goodsList

    if (goodsList.count + 1 > goodsList.total_page) return

    // let tempData = {
    //   page: ++goodsList.count,
    //   page_size: this.data.page_size,
    //   city: this.data.searchCityCode ? this.data.searchCityCode : 0
    // }

    this.setData({
      'goodsList.count': ++goodsList.count
    })
    this.getGoodsList('scrollToLower')
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
            that.store.data.searchCityCode = res.data.result.ad_info.adcode
            that.update()
            that.setData({
              city: res.data.result.ad_info.city,
              searchCityCode: res.data.result.ad_info.adcode,
              county: res.data.result.ad_info.district,
              searchCity: res.data.result.ad_info.city
            })
            // that.selectCounty();
          }
        })
      },
      fail: function (err) {
        console.log(err)
        that.setData({
          searchCityCode: that.data.searchCityCode
        })
      },
      complete: function () {
        console.log('complete')
      }
    })
  },
  getGoodsList(dataObj) {
    const _data = this.data
    let tempData = {
      page: _data.goodsList.count,
      page_size: _data.page_size,
      // city: _data.searchCityCode,
      city: _data.searchCityCode,
      sort_type: _data.searchSortType,
      start_price: _data.searchStartPrice,
      end_price: _data.searchEndPrice,
      band_id: _data.searchBrand,
      keyword: _data.searchKeyword
    }

    if (typeof dataObj === 'object') {
      Object.keys(dataObj).forEach(key => {
        tempData[key] = dataObj[key]
      })
    }

    return new Promise((resolve, reject) => {
      getGoodsList(tempData).then(res => {
        if (dataObj === 'scrollToLower') {
          _data.goodsList.cache.push(...res.data.data)
          this.setData({
            [`goodsList.cache`]: _data.goodsList.cache,
            [`goodsList.total_page`]: res.data.last_page
          })
        } else {
          this.setData({
            // 测试数据
            // [`goodsList.cache`]: [].concat(res.data.data).concat(res.data.data).concat(res.data.data).concat(res.data.data),
            [`goodsList.cache`]: res.data.data,
            [`goodsList.total_page`]: res.data.last_page
          })
        }
        resolve(res)
      }).catch(err => {
        reject(err)
      })
    })
  },
  getSystemInfo() {
    const _this = this
    wx.getSystemInfo().then(res => {
      console.log(res)
      this.store.data.systemInfo = res
      this.store.data.navHeight = res.statusBarHeight + this.store.data.menuButtonObject.height + (this.store.data.menuButtonObject.top - res.statusBarHeight) * 2
      const model = res.model
      if (model.search('iPhone X') != -1) {
        wx.setStorageSync('model', model)
        app.globalData.isIphoneX = true
        _this.setData({
          isIphoneX: true
        })
      }
      this.update()
      // this.navHeight = res.statusBarHeight + this.menuButtonObject.height + (this.menuButtonObject.top - res.statusBarHeight) * 2
    }).catch(err => {
      console.log(err)
    })
  },
  onLoad(option) {
    getApp().setWatcher(this) //设置监听器
    // if (wx.getUserProfile) {
    //   this.setData({
    //     canIUseGetUserProfile: true
    //   })
    // }
    this.getSystemInfo()
    // commonStore.bind('indexPage', this)
    // commonStore.init()
    // 1.进入首页时，需调用获取定位授权
    this.getLocation()

    //第一次登陆提示json动图 显示一次 来过吗 0 没来过 1 来过
    const jsonAddDialogVisibile = wx.getStorageSync('jsonAddDialogVisibile')
    // console.log(jsonAddDialogVisibile)
    if (!jsonAddDialogVisibile) {
      this.setData({
        jsonAddDialogVisibile: 1
      })
      wx.setStorageSync('jsonAddDialogVisibile', 1)
    }
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
        // scrollViewHeight: that.store.data.systemInfo.screenHeight - (rect.height + that.store.data.navHeight),
        scrollViewHeight: that.store.data.systemInfo.screenHeight - (rect.height + 50),
        fixed: rect.height,
      })
    }).exec();

    setTabBar.call(this)
  },
  onShow() {
    // console.log(this.data.conditionTag)

    if (!this.data.navHeight) {
      this.setData({
        navHeight: this.store.data.navHeight,
      })
    }
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

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    // console.log('onHide')
    this.setData({
      [`conditions[0].opened`]: 0,
      [`conditions[2].opened`]: 0
    })
  },
  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    // console.log('onUnload')
  },
})