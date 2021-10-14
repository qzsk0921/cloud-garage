// components/dialog/guide.js
// 浏览内容授权体验
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    dialogVisible: {
      type: Boolean,
      value: false
    },
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
    dialogTapHandle() {
      // this.triggerEvent('signup', false)
      this.setData({
        dialogVisible: false
      })
    },
    cancelHandle() {
      this.setData({
        dialogVisible: false
      })
    },
    confirmHandle() {
      console.log('去授权')
    }
  }
})
