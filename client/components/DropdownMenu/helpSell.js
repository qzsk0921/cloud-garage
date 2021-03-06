// components/DropdownMenu/helpSell.js
// import userStore from '../../store/user-store.js'
import {
  updatePhone
} from '../../api/user'
import {
  checkMobile
} from '../../utils/util'
import {
  addSaleGoods
} from '../../api/goods'

import store from '../../store/common'
import create from '../../utils/create'

// Component({
create({
  /**
   * 组件的属性列表
   */
  properties: {
    opened: {
      type: Number,
      value: 0
    },
    goods_id: Number
  },
  observers: {
    'opened': function (val) {
      // console.log(val)
      if(val===1) {
        // 更新用户信息
        this.setData({
          userInfo: store.data.userInfo
        })
      }
    }
  },
  /**
   * 组件的初始数据
   */
  data: {
    height: 0,
    userInfo: null
    // ...userStore.userInfo
  },

  /**
   * 组件的方法列表
   */
  methods: {
    // 点击生成海报
    posterHandle() {
      if (checkMobile(this.data.phone)) {
        // 添加帮买商品
        const temp = {
          phone: this.data.phone,
          goods_id: this.data.goods_id
        }
        addSaleGoods(temp).then(res => {
          console.log('添加帮买商品' + res.msg)
          // 手机号校验成功
          this.setData({
            opened: 0
          })
          this.triggerEvent('awakenposterdialog')
        }).catch(err => {
          wx.showToast({
            title: err.msg,
            icon: 'none'
          })
        })


      } else {
        wx.showToast({
          title: '请输入正确的手机号',
          icon: 'none'
        })
      }
    },
    dropdownItemTapHandle() {

    },
    maskTapHandle() {

    },
    getPhoneNumber(e) {
      console.log(e)
      const _this = this
      if (e.detail.encryptedData) {
        this.updatePhone({
          encryptedData: e.detail.encryptedData,
          iv: e.detail.iv,
        }).then(res => {
          const data = res.data.phone
          console.log(data)
          _this.setData({
            'userInfo.phone': data,
            'phone': data,
          })
          app.globalData.userInfo['phone'] = data //服务器解密后反回
          wx.showToast({
            title: '绑定成功，请重新点击立即购买',
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
    // 自动填入手机号
    autoPhoneNumber() {
      this.setData({
        phone: this.data.userInfo.phone
      })
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
      this.setData({
        userInfo: store.data.userInfo
      })
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
  },
})