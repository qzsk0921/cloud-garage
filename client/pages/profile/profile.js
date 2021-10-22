// pages/profile/profile.js
const userStore = require('../../store/user-store')
import {
  setTabBar
} from '../../utils/business'
Page({
  /**
   * 页面的初始数据
   */
  data: {
    showTip: false, //点击徽章
    avatar_url: "https://thirdwx.qlogo.cn/mmopen/vi_32/DYAIOgq83eqJk7FDzP17Zf8NP7Auygr5ic0GQjM4wlwO28PnriapBB7duSicPqycyIDg9BvHBO05iaqVAibCpKS6WfA/132",
    // nick_name: "Ewan Sun",
    ...userStore.userInfo,
    list: [{
        id: 1,
        icon: '/assets/images/my_icon_mycar.png',
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
  getUserProfile() {
    userStore.getUserProfile()
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
    const dataset = e.target.dataset
    switch (dataset.id) {
      case 1:
        this.navTo('/pages/carResource/carResource?res=mycar');
        break;
      case 2:
        this.navTo('/pages/carResource/carResource?res=groupcar');
        break;
      case 3:
        this.navTo('/pages/carResource/carResource?res=helpcar');
        break;
      case 4:
        this.navTo('/pages/carResource/carResource?res=record');
        break;
      case 5:
        this.navTo('/pages/activationRecord/activationRecord?tabbarPage=/pages/profile/profile');
        break;
      case 6:
        wx.makePhoneCall({
          phoneNumber: '1340000' //仅为示例，并非真实的电话号码
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