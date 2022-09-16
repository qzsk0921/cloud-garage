// components/dialog/vipAndHelpother.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    dialogVisible: {
      type: Number,
      value: 0
    },
    dialogvipAndHelpotherTit:String,
    dialogvipAndHelpotherCont:String,
    dialogvipAndHelpotherDate:String,
  },

  /**
   * 组件的初始数据
   */
  data: {

  },
  observers: {
    'dialogVisible': function (val) {
      // console.log(val)
      if (val === 1) {
        console.log(this.data.dialogVisible)
      }
    }
  },
  /**
   * 组件的方法列表
   */
  methods: {
    confirmHandle() {
      this.setData({
        dialogVisible: 0
      })
    }
  },
  lifetimes: {
    ready() {
      // 在组件在视图层布局完成后执行
    },
    attached: function () {
      // 在组件实例进入页面节点树时执行
    },
    detached: function () {
      // 在组件实例被从页面节点树移除时执行
    },
  }
})