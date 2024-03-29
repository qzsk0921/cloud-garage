// components/dialog/invitScan.js

Component({
  /**
   * 组件的属性列表
   */
  properties: {
    dialogVisible: {
      type: Boolean,
      value: false
    },
    invitcanDialogData: String,
    navHeight: Number
  },

  /**
   * 组件的初始数据
   */
  data: {

  },
  observers: {
    // 'dialogVisible': function (val) {
    //   console.log(val)
    //   if (val) {
    //     setTimeout(() => {
    //       this.loadAnimation()
    //     }, 1000)
    //   }
    // }
  },
  /**
   * 组件的方法列表
   */
  methods: {
    closeHandle() {
      this.setData({
        dialogVisible: false
      })
      // this.canvas.width = this.canvas.height = 0
    },
  },
  lifetimes: {
    ready() {},
    attached() {

    }
  }
})
