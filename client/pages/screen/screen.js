// pages/screen/screen.js
import {
  getScreenCategory,
} from '../../api/business'
import store from '../../store/common'
import create from '../../utils/create'

// Page({
create(store, {
  /**
   * 页面的初始数据
   */
  data: {
    currentScrollTopId: 'a1', //content滚动id
    screenCategory: [{
      haveArrow: true,
      canCollapse: false,
      type: "normal",
      // 导航名称
      option: '热门品牌',
      id: 'a1',
      currentOptionId: '',
      // 该导航下所有的可选项
      content: [{
        option: '大众',
        id: 1,
      }, {
        option: '宝马',
        id: 2
      }, {
        option: '丰田',
        id: 3
      }, {
        option: '本田',
        id: 4
      }]
    }, {
      haveArrow: false,
      canCollapse: false,
      type: "normal",
      option: '车辆类型',
      id: 'a2',
      currentOption: '不限',
      currentOptionId: '',
      content: [{
        option: '不限',
        id: 1,
      }, {
        option: '微型车',
        id: 2,
      }, {
        option: '小型车',
        id: 3,
      }, {
        option: '紧凑型',
        id: 4,
      }, {
        option: '中型车',
        id: 5,
      }, {
        option: '中大型',
        id: 6,
      }],
    }, {
      haveArrow: false,
      canCollapse: false,
      type: "price-input",
      option: '价格',
      id: 'a3',
      currentOption: [0, 100000000],
      currentOptionId: '',
      content: [{
        option: '不限',
        id: 1
      }, {
        option: '0-3万',
        id: 2
      }, {
        option: '3-5万',
        id: 3
      }, {
        option: '5-10万',
        id: 4
      }, {
        option: '10-15万',
        id: 5
      }, {
        option: '15-20万',
        id: 6
      }, {
        option: '20-30万',
        id: 7
      }, {
        option: '30-50万',
        id: 8
      }, {
        option: '50万以上',
        id: 9
      }]
    }, {
      haveArrow: false,
      canCollapse: false,
      type: "slide-age",
      option: '车龄',
      id: 'a4',
      currentOption: '不限',
      currentOptionId: '',
      content: [{
        option: '温州',
        id: 4,
      }],
    }, {
      haveArrow: false,
      canCollapse: false,
      type: "slide-mile",
      option: '里程',
      id: 'a5',
      currentOption: '不限',
      currentOptionId: '',
      content: [{
        option: '温州',
        id: 4,
      }],
    }, {
      haveArrow: false,
      canCollapse: false,
      type: 'normal',
      option: '变速箱',
      id: 'a6',
      currentOptionId: '',
      content: [{
        option: '不限',
        id: 1,
      }, {
        option: '手动',
        id: 2,
      }, {
        option: '自动',
        id: 3,
      }],
    }, {
      haveArrow: false,
      canCollapse: false,
      type: 'normal',
      option: '排量',
      id: 'a7',
      currentOption: '不限',
      currentOptionId: '',
      content: [{
        option: '不限',
        id: 1,
      }, {
        option: '1.0及以下',
        id: 2,
      }, {
        option: '1.1L-1.6L',
        id: 3,
      }, {
        option: '1.7L-2.0L',
        id: 4,
      }],
    }, {
      haveArrow: false,
      haveArrow: false,
      canCollapse: false,
      type: 'normal',
      option: '排放标准',
      id: 'a8',
      currentOption: '不限',
      currentOptionId: '',
      content: [{
        option: '不限',
        id: 1,
      }, {
        option: '国五',
        id: 2,
      }],
    }, {
      haveArrow: true,
      canCollapse: true,
      type: 'normal',
      option: '燃油类型',
      id: 'a9',
      currentOption: '不限',
      currentOptionId: '',
      content: [{
        option: '不限',
        id: 1,
      }, {
        option: '汽油',
        id: 2,
      }, {
        option: '柴油',
        id: 3,
      }, {
        option: '电动',
        id: 4,
      }, {
        option: '油电混合',
        id: 5,
      }],
    }, {
      haveArrow: true,
      canCollapse: true,
      type: 'normal',
      option: '车身颜色',
      id: 'a10',
      currentOption: '不限',
      currentOptionId: '',
      content: [{
        option: '不限',
        id: 1,
      }, {
        option: '黑色',
        color: '#000',
        id: 2,
      }, {
        option: '白色',
        color: '#fff',
        id: 3,
      }, {
        option: '银灰色',
        color: '#D2D4D8',
        id: 4,
      }, {
        option: '深灰色',
        color: '#A6A7A9',
        id: 5,
      }, {
        option: '红色',
        color: '#E73327',
        id: 6,
      }],
    }, {
      haveArrow: true,
      canCollapse: true,
      type: 'normal',
      option: '厂家类型',
      id: 'a11',
      currentOption: '不限',
      currentOptionId: '',
      content: [{
        option: '不限',
        id: 1,
      }, {
        option: '国产',
        id: 2,
      }, {
        option: '合资',
        id: 3,
      }, {
        option: '进口',
        id: 4,
      }],
    }],
    change: false, // 当两个slider在最右端重合时，将change设置为true，从而隐藏slider2，才能继续操作slider1
    max: 10000, // 两个slider所能达到的最大值
    min: 0, // 两个slider所能取的最小值
    rate: 100, // slider的最大最小值之差和100（或1000）之间的比率
    scale: 1, // 比例系数。页面显示值的时候，需要将slider1Value(slider2Value)乘以比例系数scale
    slider1Max: 1, // slider1的最大取值
    slider1Value: 0, // slider1的值
    slider2Value: 10000, // slider2的值
    slider2Min: 0, // slider2的最小取值
    slider1W: 100, // slider1的宽度
    slider2W: 0, // slider2的宽度
    leftSliderPriceWidthX: '-1.5%',
    rightSliderPriceWidthX: '-21%'
  },
  // 开始滑动
  changeStart: function (e) {
    var idx = parseInt(e.currentTarget.dataset.idx)
    if (idx === 1) {
      // dW是当前操作的slider所能占据的最大宽度百分数
      var dW = (this.data.slider2Value - this.data.min) / this.data.rate
      this.setData({
        slider1W: dW,
        slider2W: 100 - dW,
        slider1Max: this.data.slider2Value,
        slider2Min: this.data.slider2Value,
        change: false
      })
    } else if (idx === 2) {
      var dw = (this.data.max - this.data.slider1Value) / this.data.rate
      this.setData({
        slider2W: dw,
        slider1W: 100 - dw,
        slider1Max: this.data.slider1Value,
        slider2Min: this.data.slider1Value,
        change: false
      })
    }
  },
  // 正在滑动
  changing: function (e) {
    console.log(9999)
    var idx = parseInt(e.currentTarget.dataset.idx)
    var value = e.detail.value
    let rightSliderPriceWidthX = (this.data.max - value) / 116 - 21
    let leftSliderPriceWidthX = value / 116
    if (idx === 1) {
      this.setData({
        slider1Value: value,
        leftSliderPriceWidthX: leftSliderPriceWidthX + '%'
      })
    } else if (idx === 2) {
      this.setData({
        slider2Value: value,
        rightSliderPriceWidthX: rightSliderPriceWidthX + '%'
      })
    }
  },
  changed: function (e) {
    if (this.data.slider1Value === this.data.slider2Value && this.data.slider2Value === this.data.max) {
      this.setData({
        change: true
      })
    }
  },
  arrowTapHandle(e) {
    // console.log(e)
    const idx = e.target.dataset.idx
    if (idx === 0) {
      console.log(idx)
      wx.switchTab({
        url: '/pages/index/index',
      })
      return
    }
    this.setData({
      [`screenCategory[${idx}].canCollapse`]: !this.data.screenCategory[idx].canCollapse
    })

  },
  tapHandle(e) {
    const dataset = e.target.dataset
    this.setData({
      [`screenCategory[${dataset.index}].currentOptionId`]: dataset.it.id,
      [`screenCategory[${dataset.index}].currentOption`]: dataset.it.name
    })
  },
  priceTapHandle(e) {
    const currentItemObj = e.currentTarget.dataset.item

    // 相同选项返回
    if (currentItemObj[1] === this.data.screenCategory[2].currentOption[1]) return
    
    this.setData({
      // currentPirce: currentItemObj.id,
      // minPrice: '', // 清空自定义价格
      // maxPrice: ''
      'screenCategory[2].currentOption': currentItemObj.map(it=>it*10000) // 转万
    })
  },
  minPriceInputHandle(e) {
    console.log(e)
    this.setData({
      minPrice: e.detail.value * 10000
    })
  },
  maxPriceInputHandle(e) {
    console.log(e)
    this.setData({
      maxPrice: e.detail.value * 10000
    })
  },
  // 分类选择
  itemTapHandle(e) {
    const currentScrollTopId = e.target.dataset.id
    if (currentScrollTopId) {
      this.setData({
        currentScrollTopId,
      })
    }
  },
  searchSubmitHandle() {
    const data = this.data
    // 校验输入的价格
    if (data.minPrice && data.maxPrice) {
      if (data.minPrice >= Number(data.maxPrice)) {
        wx.showToast({
          icon: 'none',
          title: '您输入的价格不正确'
        })
        return false
      } else {
        this.setData({
          'screenCategory[2].currentOption': [data.minPrice, data.maxPrice]
        })
      }
    }
    // console.log(this.data.screenCategory[2].currentOption)
    const tempData = {
      band_id: data.screenCategory[0].currentOptionId,
      vehicle_type_id: data.screenCategory[1].currentOptionId,
      start_price: data.screenCategory[2].currentOption[0],
      end_price: data.screenCategory[2].currentOption[1],
      start_licensing_time: 1,
      end_licensing_time: 200000,
      start_kilometers: 0,
      end_kilometers: 5000000,
      transmission_case_id: data.screenCategory[5].currentOptionId,
      displacement_id: data.screenCategory[6].currentOptionId,
      emission_standard_id: data.screenCategory[7].currentOptionId,
      fuel_type_id: data.screenCategory[8].currentOptionId,
      color_id: data.screenCategory[9].currentOptionId,
      vendor_type_id: data.screenCategory[10].currentOptionId,
    }

    this.store.data.searchObject = tempData
    this.update()

    wx.switchTab({
      url: '/pages/index/index'
    })
  },
  resetHandle() {
    this.data.screenCategory.forEach(item => {
      item.currentOptionId = ''
      item.currentOption = '不限'
    })
    this.setData({
      screenCategory: this.data.screenCategory
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getScreenCategory().then(res => {
      const data = res.data
      this.setData({
        // screenCategory: res.data
        'screenCategory[0].content': data.hot_brand,
        'screenCategory[1].content': data.model,
        'screenCategory[2].content': data.price,
        'screenCategory[5].content': data.transmission_case,
        'screenCategory[6].content': data.displacement,
        'screenCategory[7].content': data.emission_standard,
        'screenCategory[8].content': data.fuel_type,
        'screenCategory[9].content': data.color,
        'screenCategory[10].content': data.vendor_type,
      })
      console.log(this.data.screenCategory[0])
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

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
  onShareAppMessage: function () {

  },
  getScreenCategory() {
    return new Promise((resolve, reject) => {
      getScreenCategory().then(res => {
        resolve(res)
      }).catch(err => {
        reject(err)
      })
    })
  }
})