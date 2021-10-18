// components/navigation/commonnav.js
const commonStore = require('../../store/common-store.js')
import {
  wxGetSystemInfo
} from '../../utils/wxapi.js'
const app = getApp()

Component({
  /**
   * 组件的属性列表
   */
  properties: {
    color: String,
    bgColor: String,
    navigationBarTitleText: String,
    marginLeft: Number,
    navHeight: Number,
    navTop: Number,
    menuButtonHeight: Number,
    status: {
      type: String,
      default: 'leftarrow'
    },
    tabbarPage: {
      type: String,
      default: ''
    }
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
    navigateBackHandle(e) {
      const _data = this.data
      if (_data.tabbarPage) {
        // tabbar页面优先处理
        wx.switchTab({
          url: _data.tabbarPage,
        })
      } else {
        // 不是tabbar页面的跳转
        if (_data.status === 'isEntryWithShare') {
          wx.redirectTo({
            url: '/pages/index/index',
          })
        } else if (_data.status === 'leftarrow') {
          wx.navigateBack({
            fail(err) {
              console.log(err)
              wx.redirectTo({
                url: '/pages/index/index',
              })
            }
          })
        }
      }

    },
    navigateBack(delta) {
      wx.navigateBack({
        // delta
        fail(err) {
          console.log(err)
          wx.redirectTo({
            url: '/pages/home/home',
          })
        }
      })
    },
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