// components/dialog/json-add.js
import lottie from 'lottie-miniprogram'

Component({
  /**
   * 组件的属性列表
   */
  properties: {
    dialogVisible: {
      type: Boolean,
      value: false
    },
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
    tryHandle() {
      this.setData({
        dialogVisible: false
      })
      // this.canvas.width = this.canvas.height = 0
    },
    loadAnimation() {
      wx.createSelectorQuery().in(this).selectAll('#canvas').node(res => {
        const canvas = this.canvas = res[0].node
        const context = canvas.getContext('2d')

        canvas.width = 460
        canvas.height = 612

        lottie.setup(canvas)
        this.ani = lottie.loadAnimation({
          loop: true,
          autoplay: true,
          animationData: require('../../json/catrim.js'),
          rendererSettings: {
            context,
          },
        })
      }).exec()
    }
  },
  lifetimes: {
    ready() {},
    attached() {

    }
  }
})