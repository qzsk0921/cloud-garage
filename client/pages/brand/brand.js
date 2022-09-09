const brand = require('../../utils/brand.js');
// const brandObjs = require('../../utils/brand.js');
// const config = require('../../utils/config.js');
// import config from '../../config/index'
import {
  getHotBrandList,
  getBrandList
} from '../../api/business'

import store from '../../store/common'
import create from '../../utils/create'

const appInstance = getApp();
// Page({
create(store, {
  data: {
    searchHotBrand: "",
    searchBrand: 0,

    searchLetter: [],
    showLetter: "",
    winHeight: 0,
    brandList: [],
    isShowLetter: false,
    scrollTop: 0, //置顶高度
    scrollTopId: '', //置顶id
    currentBrandCode: '',
    hotBrandList: [],
    // countyList: [{
    //   brandCode: 110000,
    //   county: 'A区'
    // }, {
    //   brandCode: 310000,
    //   county: 'B区'
    // }, {
    //   brandCode: 440100,
    //   county: 'C区'
    // }, {
    //   brandCode: 440300,
    //   county: 'D区'
    // }, {
    //   brandCode: 330100,
    //   county: 'E县'
    // }, {
    //   brandCode: 320100,
    //   county: 'F县'
    // }, {
    //   brandCode: 420100,
    //   county: 'G县'
    // }],
    inputName: '',
    completeList: [],
    county: '',
  },
  onLoad: function (options) {
    // console.log(options)
    if (options.screen == 1) {
      this.setData({
        screen: options.screen
      })
    }

    this.getHotBrandList().then(res => {
      this.setData({
        hotBrandList: res.data
      })
    })

    if (!this.store.data.brandList.length) {
      this.getBrandList().then(res => {
        this.setData({
          brandList: res.data
        })
        this.store.data.brandList = res.data
        this.update()
      })
    } else {
      this.setData({
        brandList: this.store.data.brandList
      })
    }

    // 生命周期函数--监听页面加载
    const searchLetter = brand.searchLetter;
    // const brandList = brand.brandList();
    const sysInfo = wx.getSystemInfoSync();
    console.log(sysInfo);
    const winHeight = sysInfo.windowHeight;
    const itemH = winHeight / searchLetter.length;
    let tempArr = [];

    searchLetter.map(
      (item, index) => {
        // console.log(item);
        // console.log(index);
        let temp = {};
        temp.name = item;
        temp.tHeight = index * itemH;
        temp.bHeight = (index + 1) * itemH;
        tempArr.push(temp)
      }
    );

    // console.log(tempArr);
    this.setData({
      winHeight: winHeight,
      itemH: itemH,
      searchLetter: tempArr,
      // brandList: brand.brandObjs
    });

  },
  onReady: function () {
    // 生命周期函数--监听页面初次渲染完成

  },
  onShow: function () {
    const searchBrand = this.store.data.searchObject[0].id ? this.store.data.searchObject[0].id : this.data.searchBrand

    this.setData({
      searchBrand
    })
    console.log(this.data.searchBrand)
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
  //选择城市
  bindBrand: function (e) {
    // console.log('bindBrand')
    console.log(e);

    if (!this.store.data.searchObject) {
      this.store.data.searchObject = [{
        tag: 'brand',
        name: e.currentTarget.dataset.name,
        id: e.currentTarget.dataset.brand
      }]
    } else {
      this.store.data.searchObject[0] = {
        tag: 'brand',
        name: e.currentTarget.dataset.name,
        id: e.currentTarget.dataset.brand
      }
    }

    if (this.data.screen) {
      // 如果从筛选过来的就返回筛选
      // wx.navigateTo({
      //   url: `../screen/screen?tag=brand&name=${e.currentTarget.dataset.name}&id=${e.currentTarget.dataset.brand}`,
      // })

      const pages = getCurrentPages(); //获取当前页面js里面的pages里的所有信息。
      const prevPage = pages[pages.length - 2];
      prevPage.setData({
        brandInfo: {
          tag: 'brand',
          name: e.currentTarget.dataset.name,
          id: e.currentTarget.dataset.brand
        } // 设置需要传递的参数--自定义
      })

      wx.navigateBack({
        delta: 1,
      })
    } else {
      this.store.data.isSubmitSearchObject = true
      this.update()

      wx.switchTab({
        url: '../index/index'
      })
    }
  },

  bindCounty: function (e) {
    console.log(e);
    this.setData({
      county: e.currentTarget.dataset.brand
    })
    // appInstance.globalData.defaultCounty = this.data.county
    // console.log(appInstance.globalData.defaultCounty);

    appInstance.globalData.defaultBrand = this.data.county
    wx.switchTab({
      // url: '../Travel/TravelHome'
      url: '../index/index'
    })
  },

  //点击热门城市回到顶部
  hotBrand: function () {
    console.log("hotBrand");
    this.setData({
      scrollTop: 0,
    })
  },
  bindScroll: function (e) {
    //  console.log(e.detail)
  },
  // selectCounty: function () {
  //   console.log(config.tencentKey)
  //   console.log(config)
  //   console.log("正在定位区县");
  //   let code = this.data.currentBrandCode
  //   // console.log(code);
  //   const that = this;
  //   wx.request({
  //     url: `https://apis.map.qq.com/ws/district/v1/getchildren?&id=${code}&key=${config.tencentKey}`,
  //     success: function (res) {
  //       console.log(res)
  //       // console.log(res.data)
  //       console.log(res.data.result[0]);
  //       that.setData({
  //         countyList: res.data.result[0],
  //       })
  //       // console.log(that.data.countyList);
  //       console.log("请求区县成功" + `https://apis.map.qq.com/ws/district/v1/getchildren?&id=${code}&key=${config.tencentKey}`);
  //       // console.log(res)
  //     },
  //     fail: function () {
  //       console.log("请求区县失败，请重试");
  //     }
  //   })
  // },
  bindBlur: function (e) {},
  bindKeyInput: function (e) {
    // console.log("input: " + e.detail.value);
    this.setData({
      inputName: e.detail.value
    })
    // this.auto()
  },
  searchHandle() {
    // this.store.data.searchKeyword = this.data.inputName
    // this.update()
    console.log(this.data.brandList)
    const res = this.data.brandList.some(item => {
      const ress = item.data.some(it => {
        if (it.name == this.data.inputName) {
          if (!this.store.data.searchObject) {
            this.store.data.searchObject = [{
              tag: 'brand',
              name: it.name,
              id: it.shop_car_brand_id
            }]
          } else {
            this.store.data.searchObject[0] = {
              tag: 'brand',
              name: it.name,
              id: it.shop_car_brand_id
            }
          }
          return true
        }
        return false
      })
      return ress
    })

    if (!res) {
      this.store.data.searchObject[0] = {
        tag: 'brand',
        name: this.data.inputName,
        id: 1111
      }
    }
    this.store.data.isSubmitSearchObject = true

    this.update()

    wx.switchTab({
      url: '../index/index'
    })
  },
  // auto: function () {
  //   let inputSd = this.data.inputName.trim()
  //   let sd = inputSd.toLowerCase()
  //   let num = sd.length

  //   const brandList = brand.brandObjs

  //   let finalBrandList = []

  //   let temp = brandList.filter(
  //     item => {
  //       let text = item.short.slice(0, num).toLowerCase()
  //       return (text && text == sd)
  //     }
  //   )
  //   //在城市数据中，添加简拼到“shorter”属性，就可以实现简拼搜索
  //   let tempShorter = brandList.filter(
  //     itemShorter => {
  //       if (itemShorter.shorter) {
  //         let textShorter = itemShorter.shorter.slice(0, num).toLowerCase()
  //         return (textShorter && textShorter == sd)
  //       }
  //       return
  //     }
  //   )

  //   let tempChinese = brandList.filter(
  //     itemChinese => {
  //       let textChinese = itemChinese.brand.slice(0, num)
  //       return (textChinese && textChinese == sd)
  //     }
  //   )

  //   if (temp[0]) {
  //     temp.map(
  //       item => {
  //         let testObj = {};
  //         testObj.brand = item.brand
  //         testObj.code = item.code
  //         finalBrandList.push(testObj)
  //       }
  //     )
  //     this.setData({
  //       completeList: finalBrandList,
  //     })
  //   } else if (tempShorter[0]) {
  //     tempShorter.map(
  //       item => {
  //         let testObj = {};
  //         testObj.brand = item.brand
  //         testObj.code = item.code
  //         finalBrandList.push(testObj)
  //       }
  //     );
  //     this.setData({
  //       completeList: finalBrandList,
  //     })
  //   } else if (tempChinese[0]) {
  //     tempChinese.map(
  //       item => {
  //         let testObj = {};
  //         testObj.brand = item.brand
  //         testObj.code = item.code
  //         finalBrandList.push(testObj)
  //       })
  //     this.setData({
  //       completeList: finalBrandList,
  //     })
  //   } else {
  //     return
  //   }
  // },
  getHotBrandList() {
    return new Promise((resolve, reject) => {
      getHotBrandList().then(res => {
        resolve(res)
      }).catch(err => {
        reject(err)
      })
    })
  },
  getBrandList(data) {
    return new Promise((resolve, reject) => {
      getBrandList(data ? data : {}).then(res => {
        resolve(res)
      }).catch(err => {
        reject(err)
      })
    })
  }
})