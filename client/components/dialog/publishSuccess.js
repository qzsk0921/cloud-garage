// components/dialog/publishSuccess.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    dialogVisible: {
      type: Number,
      value: 0
    }
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    // 返回首页
    backhomeHandle() {
      wx.switchTab({
        url: '/pages/index/index',
      })
    },
    // 查看我的商品 跳转至我的商品列表
    viewgoodsHandle() {
      wx.redirectTo({
        url: '/pages/carResource/carResource?res=mycar&tabbarPage=/pages/profile/profile',
      })
    }
  }
})