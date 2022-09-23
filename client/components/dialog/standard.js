// components/dialog/standard.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    dialogVisible: {
      type: Number,
      value: 0
    },
  },

  /**
   * 组件的初始数据
   */
  data: {
    isTipOn: 0
  },

  /**
   * 组件的方法列表
   */
  methods: {
    // // 处理ios10以上穿透到input使其获取焦点的问题
    // ios10Handle() {
    //   //iOS11以上机型中点击弹框会穿透到弹窗下面的input输入框，并唤起键盘
    //   setTimeout(() => {
    //     wx.hideKeyboard({
    //       complete: res => {
    //         console.log('hideKeyboard res', res)
    //       }
    //     })
    //   }, 200)
    // },
    // parentHandle() {
    //   this.ios10Handle()
    // },
    tipHandle() {
      this.setData({
        isTipOn: !this.data.isTipOn
      })
    },
    confirmHandle() {
      this.setData({
        dialogVisible: 0
      })

      if (this.data.isTipOn) {
        wx.setStorageSync('dialogStandardVisible', 1)
      } else {
        wx.removeStorageSync('dialogStandardVisible')
      }
    }
  },
  lifetimes: {
    ready() {
      // 在组件在视图层布局完成后执行
      //发车规范 0 下次不提示 1 提示
      this.setData({
        isTipOn: wx.getStorageSync('dialogStandardVisible')
      })
    },
    attached: function () {
      // 在组件实例进入页面节点树时执行
    },
    detached: function () {
      // 在组件实例被从页面节点树移除时执行
    },
  }
})