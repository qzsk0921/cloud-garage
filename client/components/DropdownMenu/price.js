// components/DropdownMenu/price.js
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
    currentPirce: 1, //value 默认不限
    minPrice: '',
    maxPrice: '',
    priceList: [{
        name: '不限',
        id: 1,
        start_price: null,
        end_price: null
      }, {
        name: '5万以下',
        id: 2,
        start_price: 0,
        end_price: 50000
      }, {
        name: '5-10万',
        id: 3,
        start_price: 50000,
        end_price: 100000
      }, {
        name: '10-15万',
        id: 4,
        start_price: 100000,
        end_price: 150000
      }, {
        name: '15-30万',
        id: 5,
        start_price: 150000,
        end_price: 300000
      },
      {
        name: '30-100万',
        id: 6,
        start_price: 300000,
        end_price: 1000000
      }, {
        name: '100-200万',
        id: 7,
        start_price: 1000000,
        end_price: 2000000
      }, {
        name: '200万以上',
        id: 8,
        start_price: 200000,
        end_price: null
      }
    ]
  },

  /**
   * 组件的方法列表
   */
  methods: {
    dropdownItemTapHandle(e) {
      // console.log('dropdownItemTapHandle', e.target.dataset)
      const currentItemObj = e.target.dataset.item

      if (currentItemObj) {
        if (currentItemObj.id === this.data.currentPirce) return
        this.setData({
          currentPirce: currentItemObj.id,
          minPrice: '', // 清空自定义价格
          maxPrice: ''
        })

        //type 按钮用normal 自定义用custom
        currentItemObj.type = 'normal'
        currentItemObj.tag = 'price'
        this.triggerEvent('subClickablePrice', currentItemObj)
      }
    },
    minPriceInputHandle(e) {
      console.log(e)
      this.setData({
        minPrice: e.detail.value
      })
    },
    maxPriceInputHandle(e) {
      console.log(e)
      this.setData({
        maxPrice: e.detail.value
      })
    },
    priceSubmitHandle() {
      const _data = this.data
      // console.log(_data.minPrice >= Number(_data.maxPrice))
      if (_data.minPrice >= Number(_data.maxPrice)) {
        wx.showToast({
          icon: 'none',
          title: '您输入的价格不正确'
        })
      } else {
        const currentItemObj = {
          type: 'custom',
          tag: 'price',
          name: `${_data.minPrice}-${_data.maxPrice}万`,
          start_price: _data.minPrice,
          end_price: _data.maxPrice,
        }
        this.triggerEvent('subClickablePrice', currentItemObj)

        // 清空固定区间价格
        this.setData({
          currentPirce: null
        })
      }
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
  },
})