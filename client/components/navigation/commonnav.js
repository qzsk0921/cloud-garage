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
    isEntryWithShare: {
      type: Boolean,
      default: false
    },
    navHeight: Number,
    navTop: Number,
    menuButtonHeight: Number
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
    // navigateBackHandle(e) {
    //   // console.log(e.target.dataset)
    //   if (this.data.isEntryWithShare) {
    //     wx.redirectTo({
    //       url: '/src/pages/home/home',
    //     })
    //   } else if (e.target.dataset.icon === 'leftarrow') {
    //     this.navigateBack()
    //   }
    // },
    // navigateBack(delta) {
    //   wx.navigateBack({
    //     // delta
    //     fail(err) {
    //       console.log(err)
    //       wx.redirectTo({
    //         url: '/src/pages/home/home',
    //       })
    //     }
    //   })
    // },
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