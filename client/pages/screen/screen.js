// pages/screen/screen.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    translateY:0, //content滚动距离
    currentIndex: 0,
    items: [{
      haveArrow: true,
      canCollapse: false,
      type: "normal",
      // 导航名称
      option: '热门品牌',
      currentOption: '',
      // 该导航下所有的可选项
      content: [{
        option: '大众',
      }, {
        option: '宝马',
      }, {
        option: '丰田',
      }, {
        option: '本田',
      }, {
        option: '起亚',
      }, {
        option: '别克',
      }, {
        option: '奔驰',
      }]
    }, {
      haveArrow: false,
      canCollapse: false,
      type: "normal",
      option: '车辆类型',
      currentOption: '不限',
      content: [{
        option: '不限',
        id: 2,
      }, {
        option: '微型车',
        id: 2,
      }, {
        option: '小型车',
        id: 2,
      }, {
        option: '紧凑型',
        id: 2,
      }, {
        option: '中型车',
        id: 2,
      }, {
        option: '中大型',
        id: 2,
      }],
    }, {
      haveArrow: false,
      canCollapse: false,
      type: "price-input",
      option: '价格',
      content: [{
        option: '温州',
        id: 3,
      }],
      content: [{
        option: '不限'
      }, {
        option: '0-3万'
      }, {
        option: '3-5万'
      }, {
        option: '5-10万'
      }, {
        option: '10-15万'
      }, {
        option: '15-20万'
      }, {
        option: '20-30万'
      }, {
        option: '30-50万'
      }, {
        option: '50万以上'
      }]
    }, {
      haveArrow: false,
      canCollapse: false,
      type: "slide-age",
      option: '车龄',
      currentOption: '不限',
      content: [{
        option: '温州',
        id: 4,
      }],
    }, {
      haveArrow: false,
      canCollapse: false,
      type: "slide-mile",
      option: '里程',
      currentOption: '不限',
      content: [{
        option: '温州',
        id: 4,
      }],
    }, {
      haveArrow: false,
      canCollapse: false,
      type: 'normal',
      option: '变速箱',
      content: [{
        option: '不限',
        id: 5,
      }, {
        option: '手动',
        id: 5,
      }, {
        option: '自动',
        id: 5,
      }],
    }, {
      haveArrow: false,
      canCollapse: false,
      type: 'normal',
      option: '排量',
      currentOption: '不限',
      content: [{
        option: '不限',
        id: 6,
      }, {
        option: '1.0及以下',
        id: 6,
      }, {
        option: '1.1L-1.6L',
        id: 6,
      }, {
        option: '1.7L-2.0L',
        id: 6,
      }],
    }, {
      haveArrow: false,
      haveArrow: false,
      canCollapse: false,
      type: 'normal',
      option: '排放标准',
      currentOption: '不限',
      content: [{
        option: '不限',
        id: 7,
      }, {
        option: '国五',
        id: 7,
      }],
    }, {
      haveArrow: true,
      canCollapse: true,
      type: 'normal',
      option: '燃油类型',
      currentOption: '不限',
      content: [{
        option: '不限',
        id: 8,
      }, {
        option: '汽油',
        id: 8,
      }, {
        option: '柴油',
        id: 8,
      }, {
        option: '电动',
        id: 8,
      }, {
        option: '油电混合',
        id: 8,
      }],
    }, {
      haveArrow: true,
      canCollapse: true,
      type: 'normal',
      option: '车身颜色',
      currentOption: '不限',
      content: [{
        option: '不限',
        id: 9,
      }, {
        option: '黑色',
        color: '#000',
        id: 9,
      }, {
        option: '白色',
        color: '#fff',
        id: 9,
      }, {
        option: '银灰色',
        color: '#D2D4D8',
        id: 9,
      }, {
        option: '深灰色',
        color: '#A6A7A9',
        id: 9,
      }, {
        option: '红色',
        color: '#E73327',
        id: 9,
      }],
    }, {
      haveArrow: true,
      canCollapse: true,
      type: 'normal',
      option: '厂家类型',
      currentOption: '不限',
      content: [{
        option: '不限',
        id: 10,
      }, {
        option: '国产',
        id: 10,
      }, {
        option: '合资',
        id: 10,
      }, {
        option: '进口',
        id: 10,
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
    this.setData({
      [`items[${idx}].canCollapse`]: !this.data.items[idx].canCollapse
    })
  },
  // 分类选择
  itemTapHandle(e) {
    const idx = e.target.dataset.index
    const _this = this
    if (idx || idx === 0) {
      const query = wx.createSelectorQuery();
      // 在页面渲染完成OnReady回调 获取元素高度时，如果不加定时器，获取的元素的高度还是没渲染完异步数据前的高度
      query.selectAll('.tree-select__item').boundingClientRect(function (rect) {
        console.log(rect[idx].top)
        _this.setData({
          translateY: -rect[idx].top
        })
      }).exec();
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