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
    },{
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
      console.log('dropdownItemTapHandle', e.target.dataset)
      const currentSortObj = e.target.dataset.item
      if (currentSortObj.value === this.data.currentSort) return
      this.setData({
        currentSort: currentSortObj.value
      })
      this.triggerEvent('subClickable', currentSortObj)
    }
  }
})