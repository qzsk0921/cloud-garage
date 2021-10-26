// components/navigation/commonnav.js
const commonStore = require('../../store/common-store.js')
import {
  wxGetSystemInfo
} from '../../utils/wxapi.js'
import create from '../../utils/create'

const app = getApp()

// Component({
create({
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
    transition: Boolean, //详情页顶部导航栏过渡
    status: {
      type: String,
      value: 'leftarrow'
    },
    tabbarPage: {
      type: String,
      value: ''
    }
  },
  /**
   * 组件的初始数据
   */
  data: {
    settingInfo: {}, //微信设置信息 settingInfo.authSetting['scope.userInfo'](微信已授权)
    menuButtonObject: null,
    systemInfo: null,
    navHeight: '',
  },
  /**
   * 组件的方法列表
   */
  methods: {
    navigateBackHandle(e) {
      const _data = this.data,
        el = e.target.dataset.el
      if (_data.tabbarPage) {
        // tabbar页面优先处理
        if (el) {
          // 点击左边的元素触发
          wx.switchTab({
            url: _data.tabbarPage,
          })
        }
      } else {
        // 不是tabbar页面的跳转
        if (_data.status === 'isEntryWithShare') {
          if (el) {
            wx.redirectTo({
              url: '/pages/index/index',
            })
          }
        } else {
          if (el) {
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