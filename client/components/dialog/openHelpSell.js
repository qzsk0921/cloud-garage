import { Store } from 'westore';
// components/dialog/openHelpSell.js
import {
  openActivation
} from '../../api/business'

// import store from '../../store/common'
// import create from '../../utils/create'

Component({
  /**
   * 组件的属性列表
   */
  properties: {
    dialogVisible: {
      type: Number,
      value: 0
    },
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
    // 开通
    confirmHandle() {
      this.setData({
        dialogVisible: false
      })
      this.openActivation().then(res => {
        const payModel = res.data;
        wx.requestPayment({
          'timeStamp': payModel.timeStamp.toString(),
          'nonceStr': payModel.nonceStr,
          'package': 'prepay_id=' + payModel.prepay_id, //统一下单接口返回的 prepay_id 参数值，提交格式如：prepay_id=***
          'signType': payModel.signType,
          'paySign': payModel.paySign,
          'success': function (res) {
            console.log(res)
            // store.data.userInfo.is_sale_role = 1
            // store.update()
            wx.showToast({
              title: '恭喜您，已开通帮卖特权，快去使用您的特权吧~',
              icon: 'none'
            })
            // console.log(res)
            // console.log(that.data.payData.status)
            // 获取消息下发权限(只在支付回调或tap手势事件能调用)
            // wx.requestSubscribeMessage({
            //   tmplIds: ['mtwGRB07oFL2fJgoiIipKVCYFFHS0vytiw2rTHqtAz8', 'gB9gMYOrOkLl-yTHdBP5vUS5rgwsTW1hjUYNml-57Go'],
            //   success(res) {},
            //   fail(err) {
            //     console.log(err)
            //   },
            //   complete() {
            //     // console.log("dasda", payModel.package.substr(10))
            //     that.addOrder(payModel.out_trade_no, payModel.package.substr(10))
            //   }
            // })
          },
          'fail': function (res) {
            wx.showToast({
              title: '取消支付，开通失败',
              icon: 'none'
            })
            console.log(res)
          }
        }).catch(res => {
          console.log(res)
        })
      })
    },
    // 取消
    cancelHandle() {
      this.setData({
        dialogVisible: false
      })
    },
    dialogTapHandle() {
      // this.triggerEvent('signup', false)
      this.setData({
        dialogVisible: false
      })
    },
    openActivation() {
      return new Promise((resolve, reject) => {
        openActivation().then(res => {
          resolve(res)
        }).catch(res => {
          reject(res)
        })
      })
    },
  }
})