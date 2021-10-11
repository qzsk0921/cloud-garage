// pages/screen/screen.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    currentIndex: 0,
    items: [{
      canCollapse: 0,
      type: "normal",
      // 导航名称
      option: '热门品牌',
      // 该导航下所有的可选项
      children: [{
        // 名称
        option: '温州',
        // id，作为匹配选中状态的标识
        id: 1,
      }],
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
      canCollapse: 0,
      type: "normal",
      option: '车辆类型',
      children: [{
        option: '温州',
        id: 2,
      }],
    }, {
      canCollapse: 0,
      type: "price-input",
      option: '价格',
      children: [{
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
      canCollapse: 0,
      type: "slide-age",
      option: '车龄',
      children: [{
        option: '温州',
        id: 4,
      }],
    }, {
      canCollapse: 0,
      type: "slide-mile",
      option: '里程',
      children: [{
        option: '温州',
        id: 4,
      }],
    },{
      canCollapse: 0,
      type: 'normal',
      option: '变速箱',
      children: [{
        option: '温州',
        id: 5,
      }],
    }, {
      canCollapse: 0,
      type: 'normal',
      option: '排量',
      children: [{
        option: '温州',
        id: 6,
      }],
    }, {
      canCollapse: 0,
      type: 'normal',
      option: '排放标准',
      children: [{
        option: '温州',
        id: 7,
      }],
    }, {
      canCollapse: 1,
      type: 'normal',
      option: '燃油类型',
      children: [{
        option: '温州',
        id: 8,
      }],
    }, {
      canCollapse: 1,
      type: 'normal',
      option: '颜色',
      children: [{
        option: '温州',
        id: 9,
      }],
    }, {
      canCollapse: 1,
      type: 'normal',
      option: '厂家类型',
      children: [{
        option: '温州',
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