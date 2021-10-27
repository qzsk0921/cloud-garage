// components/DropdownMenu/ask.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    opened: {
      type: Number,
      value: 0
    },
    phone: String
  },

  /**
   * 组件的初始数据
   */
  data: {
    height: 0
  },

  /**
   * 组件的方法列表
   */
  methods: {
    dropdownItemTapHandle(e) {
      // console.log(e)
      const dataset = e.target.dataset.type
      if (dataset === 'call') {
        wx.makePhoneCall({
          phoneNumber: this.data.phone //仅为示例，并非真实的电话号码
        })
      } else if (dataset === 'cancel') {
        this.setData({
          opened: 0
        })
      }
    }
  },
  lifetimes: {
    ready() {
      // 在组件在视图层布局完成后执行
      const query = wx.createSelectorQuery().in(this)
      query.select('.dropdown-item-down__content').boundingClientRect(rect => {
        console.log(rect)
        this.setData({
          height: rect.height
        })
      }).exec()
    },
    attached: function () {
      // 在组件实例进入页面节点树时执行
    },
    detached: function () {
      // 在组件实例被从页面节点树移除时执行
    },
  }
})