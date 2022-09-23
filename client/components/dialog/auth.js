// components/dialog/auth.js
// 浏览内容授权体验
import {
  // updateUserInfo
  updatePhone
} from '../../api/user'

import create from '../../utils/create'
import store from '../../store/common'

create({
  // Component({
  /**
   * 组件的属性列表
   */
  properties: {
    dialogVisible: {
      type: Boolean,
      value: false
    },
    title: {
      // 提示的标题
      type: String,
      value: '',
    },
    content: {
      // 提示的内容
      type: String,
      value: ''
    },
    confirmText: {
      // 确认按钮的文字
      type: String,
      value: '确定'
    },
    confirmBgColor: {
      type: String,
      value: '#F23D32'
    },
    cancelText: {
      // 取消按钮的文字
      type: String,
      value: '取消'
    },
    cancelBgColor: {
      type: String,
      value: '#FFFFFF'
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    canIUseGetUserProfile: false
  },

  /**
   * 组件的方法列表
   */
  methods: {
    dialogTapHandle() {
      // this.triggerEvent('signup', false)
      // this.setData({
      //   dialogVisible: false
      // })
    },
    cancelHandle() {
      this.setData({
        dialogVisible: false
      })
      this.triggerEvent('cancel', 'cancel')
    },
    confirmHandle() {
      this.setData({
        dialogVisible: false
      })
      this.triggerEvent('confirm', 'confirm')
    },
    // getUserProfile() {
    //   wx.getUserProfile({
    //     desc: '展示用户信息',
    //     success: (res) => {
    //       console.log(res)
    //       // this.store.data.userInfo = res.userInfo

    //       store.data.userInfo['avatarUrl'] = res.userInfo.avatarUrl
    //       store.data.userInfo['city'] = res.userInfo.city
    //       store.data.userInfo['country'] = res.userInfo.country
    //       store.data.userInfo['gender'] = res.userInfo.gender
    //       store.data.userInfo['language'] = res.userInfo.language
    //       store.data.userInfo['nickName'] = res.userInfo.nickName
    //       store.data.userInfo['province'] = res.userInfo.province
    //       store.update()

    //       // 上传用户信息
    //       updateUserInfo(res.userInfo).then(res => {
    //         console.log(res.msg)
    //       }).catch(err => {
    //         console.log('更新微信信息:' + err.msg)
    //       })
    //     }
    //   })
    // },
    getPhoneNumber(e) {
      this.setData({
        dialogVisible: false
      })
      console.log(e)
      const _this = this
      if (e.detail.encryptedData) {
        this.updatePhone({
          encryptedData: e.detail.encryptedData,
          iv: e.detail.iv,
        }).then(res => {
          const data = res.data.phone
          console.log(data)
          _this.triggerEvent('confirm', 'confirm')

          _this.setData({
            'userInfo.phone': data,
            'phone': data,
          })
          getApp().globalData.userInfo['phone'] = data //服务器解密后反回
          wx.showToast({
            title: '授权成功',
            icon: 'none'
          })
        }).catch(res => {
          console.log(res)
        })
      } else {
        wx.showModal({
          content: '为便于商家服务需要您进行手机号授权',
          // confirmText: '同意',
          confirmText: '确定',
          confirmColor: '#4283FB',
          showCancel: false,
          // cancelText: '拒绝',
          // cancelColor: '#999999',
          success(res) {
            if (res.confirm) {
              console.log('确定')
            } else if (res.cancel) {
              console.log('取消')
            }
          }
        })
      }
    },
    updatePhone(data) {
      return new Promise((resolve, reject) => {
        updatePhone(data).then(res => {
          resolve(res)
        }).catch(res => {
          reject(res)
        })
      })
    },
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