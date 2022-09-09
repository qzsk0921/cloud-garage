// pages/publish/cartype.js
// const brand = require('../../utils/brand.js');

import {
  getCarType
} from '../../api/publish'
import store from '../../store/common'
import create from '../../utils/create'

const appInstance = getApp();
// Page({
create(store, {
  data: {
    winHeight: 0,
    typeList: [],
    scrollTop: 0, //置顶高度
    scrollTopId: '', //置顶id
  },
  onLoad: function (options) {
    // console.log(options)
    if (options) {
      this.data.options = options
    }

    this.getCarType().then(res => {
      this.setData({
        typeList: res.data
      })
    })


    // 生命周期函数--监听页面加载
    // const searchLetter = brand.searchLetter;
    const sysInfo = wx.getSystemInfoSync();
    console.log(sysInfo);
    const winHeight = sysInfo.windowHeight;
    // const itemH = winHeight / searchLetter.length;
    let tempArr = [];

    // searchLetter.map(
    //   (item, index) => {
    //     // console.log(item);
    //     // console.log(index);
    //     let temp = {};
    //     temp.name = item;
    //     temp.tHeight = index * itemH;
    //     temp.bHeight = (index + 1) * itemH;
    //     tempArr.push(temp)
    //   }
    // );

    // console.log(tempArr);
    this.setData({
      winHeight: winHeight,
      // itemH: itemH,
      // searchLetter: tempArr,
    });

  },
  onReady: function () {
    // 生命周期函数--监听页面初次渲染完成

  },
  onShow: function () {
    // 生命周期函数--监听页面显示
  },
  onHide: function () {
    // 生命周期函数--监听页面隐藏

  },
  onUnload: function () {
    // 生命周期函数--监听页面卸载

  },
  onPullDownRefresh: function () {
    // 页面相关事件处理函数--监听用户下拉动作

  },
  onReachBottom: function () {
    // 页面上拉触底事件的处理函数

  },

  clickLetter: function (e) {
    // console.log(e);
    console.log(e.currentTarget.dataset.letter)
    const showLetter = e.currentTarget.dataset.letter;
    this.setData({
      toastShowLetter: showLetter,
      isShowLetter: true,
      scrollTopId: showLetter,
    })
    // const that = this;
    // wx.showToast({
    //   title: showLetter,
    //   disabled: true,
    //   duration: 500,
    //   complete: function() {
    //     that.setData({
    //       scrollTopId: showLetter,
    //     })
    //   }
    // })
    const that = this;
    setTimeout(function () {
      that.setData({
        isShowLetter: false
      })
    }, 500)
  },
  //选择品牌车型
  bindBrand: function (e) {
    // console.log('bindBrand')
    console.log(e);
    const dataset = e.currentTarget.dataset
    const pages = getCurrentPages();
    const prevPage = pages[pages.length - 2]; //上一个页面
    if (this.data.options.page) {
      if (this.data.options.page === 'pages/publish/publish') {
        // from名片编辑页
        prevPage.setData({
          'formData.band_id': dataset.it.shop_car_brand_id,
          'formData.shop_car_model_id': dataset.it.shop_car_model_id,
          'formData.band': dataset.it.name,
          'formData.vehicle_type_id': dataset.it.id
        })

        wx.navigateBack({
          delta: 0,
        })
      }
    }
    // 
  },
  bindScroll: function (e) {
    //  console.log(e.detail)
  },
  bindBlur: function (e) {},
  getCarType(data) {
    return new Promise((resolve, reject) => {
      getCarType(data ? data : {}).then(res => {
        resolve(res)
      }).catch(err => {
        reject(err)
      })
    })
  }
})