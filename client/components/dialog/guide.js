// components/dialog/guide.js
// 浏览内容授权体验
import {
  updateUserInfo
} from '../../api/user'
import store from '../../store/common'

Component({
  /**
   * 组件的属性列表
   */
  properties: {
    dialogVisible: {
      type: Boolean,
      value: false
    },
  },

  /**
   * 组件的初始数据
   */
  data: {
    canIUseGetUserProfile:false
  },

  /**
   * 组件的方法列表
   */
  methods: {
    dialogTapHandle() {
      // this.triggerEvent('signup', false)
      this.setData({
        dialogVisible: false
      })
    },
    cancelHandle() {
      this.setData({
        dialogVisible: false
      })
    },
    confirmHandle() {
      console.log('去授权')
      this.setData({
        dialogVisible: false
      })

      wx.getUserProfile({
        desc: '展示用户信息',
        success: (res) => {
          // console.log(res)
          store.data.userInfo = res.userInfo
          store.update()
          // 上传用户信息
          updateUserInfo(res.userInfo).then(res => {
            console.log('上传用户信息'+res.msg)
            this.triggerEvent('todetail')
          }).catch(err => {
            console.log('更新微信信息:' + err.msg)
          })
        }
      })
    }
  },
  lifetimes: {
    ready() {
      // 在组件在视图层布局完成后执行
      if (wx.getUserProfile) {
        this.setData({
          canIUseGetUserProfile: true
        })
      }
    },
    attached: function () {
      // 在组件实例进入页面节点树时执行
    },
    detached: function () {
      // 在组件实例被从页面节点树移除时执行
    },
  }
})