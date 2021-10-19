// components/Dropdownmenu/universal.js
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
    currentSort: 1, //value 默认综合排序
    sortList: [{
        name: '综合排序',
        value: 1
      },
      {
        name: '价格最低',
        value: 2
      },
      {
        name: '最新发布',
        value: 3
      },
      {
        name: '车龄最短',
        value: 4
      }, {
        name: '里程最少',
        value: 5
      }
    ]
  },

  /**
   * 组件的方法列表
   */
  methods: {
    dropdownItemTapHandle(e) {
      // console.log('dropdownItemTapHandle', e.target.dataset)
      const currentSortObj = e.target.dataset.item
      if (currentSortObj.value === this.data.currentSort) return
      this.setData({
        currentSort: currentSortObj.value
      })
      this.triggerEvent('subClickable', currentSortObj)
    }
  },
  lifetimes: {
    ready() {
      // 在组件在视图层布局完成后执行
      const query = wx.createSelectorQuery().in(this)
      query.select('.dropdown-item-down__content').boundingClientRect(rect => {
        // console.log(rect)
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
  },
})