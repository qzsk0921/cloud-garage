// pages/profile/profile.js
// const userStore = require('../../store/user-store')
import {
  setTabBar
} from '../../utils/business'
import {
  updateUserInfo
} from '../../api/user'

import store from '../../store/common'
import create from '../../utils/create'

// Page({
create(store, {
  /**
   * 页面的初始数据
   */
  data: {
    canIUseGetUserProfile: false,

    userInfo: null,
    showTip: false, //点击徽章
    avatarUrl: "https://thirdwx.qlogo.cn/mmopen/vi_32/DYAIOgq83eqJk7FDzP17Zf8NP7Auygr5ic0GQjM4wlwO28PnriapBB7duSicPqycyIDg9BvHBO05iaqVAibCpKS6WfA/132",
    list: [{
        id: 1,
        icon: '/assets/images/my_icon_maycar.png',
        text: '我的车源',
      },
      {
        id: 2,
        icon: '/assets/images/my_icon_teamcar.png',
        text: '团队车源',
      },
      {
        id: 3,
        icon: '/assets/images/my_icon_helpothers.png',
        text: '帮卖车源',
      },
      {
        id: 4,
        icon: '/assets/images/my_icon_history.png',
        text: '浏览记录',
      },
      {
        id: 5,
        icon: '/assets/images/my_icon_open.png',
        text: '开通记录',
      },
      {
        id: 6,
        icon: '/assets/images/my_icon_contact.png',
        text: '联系我们',
      }
    ]
  },
  // watch: {
  //   userInfo: {
  //     nickName: {
  //       handler(newValue) {
  //         console.log(newValue);
  //         this.setData({
  //           userInfo: newValue
  //         })
  //       },
  //       deep: true
  //     }
  //   }
  // },
  getUserProfile() {
    // userStore.getUserProfile().then(res => {
    //   // console.log(res)
    //   this.setData({
    //     ...res
    //   })
    // })

    wx.getUserProfile({
      desc: '展示用户信息',
      success: (res) => {
        console.log(res)
        // this.store.data.userInfo = res.userInfo
        this.store.data.userInfo['avatarUrl'] = res.userInfo.avatarUrl
        this.store.data.userInfo['city'] = res.userInfo.city
        this.store.data.userInfo['country'] = res.userInfo.country
        this.store.data.userInfo['gender'] = res.userInfo.gender
        this.store.data.userInfo['language'] = res.userInfo.language
        this.store.data.userInfo['nickName'] = res.userInfo.nickName
        this.store.data.userInfo['province'] = res.userInfo.province
        this.update()

        // 上传用户信息
        updateUserInfo(res.userInfo).then(res => {
          console.log(res.msg)
        }).catch(err => {
          console.log('更新微信信息:' + err.msg)
        })
      }
    })
  },
  badgeTapHandle() {
    if (!this.data.showTip) {
      this.setData({
        showTip: true
      })
      setTimeout(() => {
        this.setData({
          showTip: false
        })
      }, 3000)
    }
  },
  navHandle(e) {
    // console.log(e)
    const dataset = e.currentTarget.dataset
    switch (dataset.id) {
      case 1:
        this.navTo('/pages/carResource/carResource?res=mycar');
        break;
      case 2:
        this.navTo('/pages/carResource/carResource?res=teamcar');
        break;
      case 3:
        this.navTo('/pages/carResource/carResource?res=helpcar');
        break;
      case 4:
        this.navTo('/pages/carResource/carResource?res=record');
        break;
      case 5:
        this.navTo('/pages/activationRecord/activationRecord');
        break;
      case 6:
        wx.makePhoneCall({
          phoneNumber: this.data.userInfo.contact_phone.toString() //仅为示例，并非真实的电话号码
        })
        break;
      default:
        console.log('nothing to mattch')
    }
  },
  navTo(url) {
    wx.navigateTo({
      url,
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // wx.hideShareMenu()
    // userStore.bind('profilePage', this)
    // this.data.userInfo = userStore.userInfo
    // this.setData({
    //   ...userStore.userInfo
    // })
    // getApp().setWatcher(this); // 设置监听器
    if (wx.getUserProfile) {
      this.setData({
        canIUseGetUserProfile: true
      })
    }
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    setTabBar.call(this, {
      selected: 1
    })
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    console.log(this.store.data.userInfo)
    this.setData({
      userInfo: this.store.data.userInfo
    })
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})