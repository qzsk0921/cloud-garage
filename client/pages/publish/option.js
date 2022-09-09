// pages/publish/option.js

// import store from '../../store/common'
// import create from '../../utils/create'
const commonStore = require('../../store/common-store.js')
import {
  getOption
} from '../../api/publish'

Page({
  
  /**
   * 页面的初始数据
   */
  data: {
    navigationBarTitleText: "",
    ...commonStore.data,
    currentCountIntroduction: 0, //车辆简介
    // 1:变速箱 2:排量 3:排放标准 4:座位数量 5:燃油类型 6:国别（暂时无用） 7:车身颜色 8:厂家类型 9:车辆品牌 10:车辆型号
    optionData: [{
      navigationBarTitleText: "颜色",
      type: "color",
      id: 7,
      currentOptionId: '',
      content: [
        //   {
        //   extend: "#333333",
        //   name: "黑色",
        //   id: 1
        // }, {
        //   name: "白色",
        //   extend: "#ffffff",
        //   id: 2
        // }, {
        //   name: "银灰色",
        //   extend: "#D2D4D8",
        //   id: 3
        // }, {
        //   name: "深灰色",
        //   extend: "#A6A7A9",
        //   id: 4
        // }, {
        //   name: "红色",
        //   extend: "#E73327",
        //   id: 5
        // }, {
        //   name: "蓝色",
        //   extend: "#3483F5",
        //   id: 6
        // }, {
        //   name: "绿色",
        //   extend: "#66D651",
        //   id: 7
        // }, {
        //   name: "黄色",
        //   extend: "#FFD427",
        //   id: 8
        // }, {
        //   name: "香槟色",
        //   extend: "#E5C088",
        //   id: 9
        // }, {
        //   name: "紫色",
        //   extend: "#8244FF",
        //   id: 10
        // }, {
        //   name: "橙色",
        //   extend: "#FF8F2E",
        //   id: 11
        // }, {
        //   name: "棕色",
        //   extend: "#904D1E",
        //   id: 12
        // }, {
        //   name: "其他",
        //   extend: "",
        //   id: 13
        // }
      ]
    }, {
      navigationBarTitleText: "变速箱",
      type: "gearbox",
      id: 1,
      currentOptionId: '',
      content: [{
        name: "手动",
        extend: "",
        id: 1,
      }, {
        name: "自动",
        extend: "",
        id: 2,
      }, {
        name: "手自一体",
        extend: "",
        id: 3,
      }]
    }, {
      navigationBarTitleText: "排量",
      type: "displacement",
      id: 2,
      currentOptionId: '',
      content: [
        //   {
        //   create_time: 1635400484,
        //   extend: "",
        //   id: 374,
        //   name: "1.0L及以下",
        //   sort: 0,
        //   status: 1,
        //   type: 2
        // }
      ]
    }, {
      navigationBarTitleText: "排放标准",
      type: "emission_standardHandle",
      id: 3,
      currentOptionId: '',
      content: [
        //   {
        //   create_time: 1635400613,
        //   extend: "",
        //   id: 381,
        //   name: "国六",
        //   sort: 0,
        //   status: 1,
        //   type: 3
        // }
      ]
    }, {
      navigationBarTitleText: "厂家类型",
      type: "vendor_type",
      id: 8,
      currentOptionId: '',
      content: []
    }, {
      navigationBarTitleText: "燃油类型",
      type: "vendor_type",
      id: 5,
      currentOptionId: '',
      content: []
    }],
  },
  resolveParam(type, dataset) {
    console.log(type, dataset)
    let myData = ""
    switch (type) {
      case '7':
        // myData = '颜色';
        myData = {
          'formData.color_id': dataset.item.id,
          'formData.color': dataset.item.name
        }
        break;
      case '1':
        myData = {
          'formData.transmission_case_id': dataset.item.id,
          'formData.transmission_case': dataset.item.name
        }
        break;
      case '2':
        // 排量
        myData = {
          'formData.displacement_id': dataset.item.id,
          'formData.displacement': dataset.item.name
        }
        break;
      case '3':
        // 排放标准
        myData = {
          'formData.emission_standard_id': dataset.item.id,
          'formData.emission_standard': dataset.item.name
        }
        break;
        // case 'vendor':
      case '8':
        // 厂家类型
        myData = {
          'formData.vendor_type_id': dataset.item.id,
          'formData.vendor_type': dataset.item.name
        }
        break;
        // case 'fuel':
      case '5':
        //  燃油类型
        myData = {
          'formData.fuel_type_id': dataset.item.id,
          'formData.fuel_type': dataset.item.name
        }
        break;
        // case 'model':
        //   myData = '车辆类型';
        //   break;
      default:
        console.log(`Sorry, we are out of ${type}.`);
    }

    return myData
  },
  tapHandle(e) {
    console.log(e)
    const dataset = e.target.dataset
    this.setData({
      'currentOptionData.currentOptionId': dataset.item.id,
      // [`optionData[${dataset.index}].currentOption`]: dataset.it.name
    })

    const pages = getCurrentPages();
    const prevPage = pages[pages.length - 2]; //上一个页面
    if (this.data.options.page) {
      if (this.data.options.page === 'pages/publish/publish') {
        const setData = this.resolveParam(this.data.options.type, dataset)
        console.log(setData)
        // from名片编辑页
        prevPage.setData(setData)

        wx.navigateBack({
          delta: 0,
        })
      }
    }
  },

  getOption(data) {
    return new Promise((resolve, reject) => {
      getOption(data).then(res => {
        resolve(res)
      }).catch(err => {
        reject(err)
      })
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    if (options) {
      this.data.options = options
      if (options.type) {
        this.getOption({
          type: options.type
        }).then(res => {
          // 提取选项类型
          this.data.optionData.some((item) => {
            const setData = {}
            if (item.id == options.type) {

              item.content = res.data
              setData.navigationBarTitleText = this.setNavigationBarTitleText(options.type)
              setData.currentOptionData = item
              this.setData(setData)
              console.log(this.data.currentOptionData)
              return true
            } else return false
          })
        })
      }
    }

    commonStore.bind('publishOptionPage', this)
    commonStore.init()
  },
  setNavigationBarTitleText(expr) {
    let navigationBarTitleText = ""
    switch (expr) {
      // case 'color':
      case '7':
        navigationBarTitleText = '颜色';
        break;
        // case 'transmission':
      case '1':
        navigationBarTitleText = '变速箱';
        break;
        // case 'displacement':
      case '2':
        navigationBarTitleText = '排量';
        break;
        // case 'emission_standard':
      case '3':
        navigationBarTitleText = '排放标准';
        break;
        // case 'vendor':
      case '8':
        navigationBarTitleText = '厂家类型';
        break;
        // case 'fuel':
      case '5':
        navigationBarTitleText = '燃油类型';
        break;
        // case 'model':
        //   navigationBarTitleText = '车辆类型';
        //   break;
      default:
        console.log(`Sorry, we are out of ${expr}.`);
    }
    return navigationBarTitleText
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})