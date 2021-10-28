// components/DropdownMenu/shareSheet.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    opened: {
      type: Number,
      value: 0
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    height: 0,
    options: [{
        name: '分享给好友',
        icon: '../../assets/images/details_share_popup_wechat.png',
        mode: 'share'
      },
      {
        name: '生成海报',
        icon: '../../assets/images/details_share_popup_posters.png',
        mode: 'poster'
      }
    ]
  },

  /**
   * 组件的方法列表
   */
  methods: {
    cancelHandle() {
      this.setData({
        opened: 0,
      })
    },
    optionTapHandle(e) {
      const mode = e.target.dataset.mode
      console.log(e)
      if (mode === 'share') {
        // 分享给好友
        // console.log('分享给好友')
        this.setData({
          opened: 0,
        })
      } else if (mode === 'poster') {
        // 生成海报
        console.log('生成海报')
        this.setData({
          opened: 0,
        })
        this.triggerEvent('awakenposterdialog')
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