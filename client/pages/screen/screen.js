// pages/screen/screen.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    currentScrollTopId: '', //content滚动id
    // currentIndex: 0,
    items: [{
      haveArrow: true,
      canCollapse: false,
      type: "normal",
      // 导航名称
      option: '热门品牌',
      id:'a1',
      currentOptionId: '',
      // 该导航下所有的可选项
      content: [{
        option: '大众',
        id:1,
      }, {
        option: '宝马',
        id:2
      }, {
        option: '丰田',
        id:3
      }, {
        option: '本田',
        id:4
      }, {
        option: '起亚',
        id:5
      }, {
        option: '别克',
        id:6
      }, {
        option: '奔驰',
        id:7
      }]
    }, {
      haveArrow: false,
      canCollapse: false,
      type: "normal",
      option: '车辆类型',
      id:'a2',
      currentOption: '不限',
      currentOptionId: 1,
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
      id:'a3',
      currentOption: '不限',
      currentOptionId: 1,
      content: [{
        option: '不限',
        id:1
      }, {
        option: '0-3万',
        id:2
      }, {
        option: '3-5万',
        id:3
      }, {
        option: '5-10万',
        id:4
      }, {
        option: '10-15万',
        id:5
      }, {
        option: '15-20万',
        id:6
      }, {
        option: '20-30万',
        id:7
      }, {
        option: '30-50万',
        id:8
      }, {
        option: '50万以上',
        id:9
      }]
    }, {
      haveArrow: false,
      canCollapse: false,
      type: "slide-age",
      option: '车龄',
      id:'a4',
      currentOption: '不限',
      currentOptionId: 1,
      content: [{
        option: '温州',
        id: 4,
      }],
    }, {
      haveArrow: false,
      canCollapse: false,
      type: "slide-mile",
      option: '里程',
      id:'a5',
      currentOption: '不限',
      currentOptionId: 1,
      content: [{
        option: '温州',
        id: 4,
      }],
    }, {
      haveArrow: false,
      canCollapse: false,
      type: 'normal',
      option: '变速箱',
      id:'a6',
      currentOptionId: 1,
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
      id:'a7',
      currentOption: '不限',
      currentOptionId: 1,
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
      id:'a8',
      currentOption: '不限',
      currentOptionId: 1,
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
      id:'a9',
      currentOption: '不限',
      currentOptionId: 1,
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
      id:'a10',
      currentOption: '不限',
      currentOptionId: 1,
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
      id:'a11',
      currentOption: '不限',
      currentOptionId: 1,
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
    slider1Max: 10000, // slider1的最大取值
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
    if(idx===0) {
      console.log(idx)
      wx.switchTab({
        url: '/pages/index/index',
      })
      return
    }
    this.setData({
      [`items[${idx}].canCollapse`]: !this.data.items[idx].canCollapse
    })
    
  },
  tapHandle(e) {
    const dataset = e.target.dataset
    this.setData({
      [`items[${dataset.index}].currentOptionId`]: dataset.it.id,
      [`items[${dataset.index}].currentOption`]: dataset.it.option
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
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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

  }
})