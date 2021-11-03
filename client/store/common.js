export default {
  data: {
    settingInfo: {}, //微信设置信息 settingInfo.authSetting['scope.userInfo'](微信已授权)
    menuButtonObject: wx.getMenuButtonBoundingClientRect(), //按钮（右上角胶囊按钮）的布局位置信息
    systemInfo: null, //systemInfo system:'ios'||'android',
    navHeight: 0, //顶部导航栏高度
    // motto: 'Hello World',
    userInfo: null,
    // hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    brandList: [], //品牌列表

    type: null, //生成二维码用 1:团队车源，2:个人车源，3:商品详情，4:帮卖商品详情
    searchKeyword: '',
    searchCity: '全国',
    searchCityCode: '0',
    searchSortType: 1,
    searchStartPrice: 0,
    searchEndPrice: '',
    searchHotBrand: '',
    searchBrand: 0, //id
    searchBrandName: '', //品牌名称，前端显示用
    searchObject: [{
      tag: 'brand',
      id: '',
      name: '不限'
    }, {
      tag: 'vehicle', //车辆类型
      id: '',
      name: '不限'
    }, {
      tag: 'price', //价格
      id: '',
      name: '不限',
      start_price: '',
      end_price: ''
    }, {
      tag: 'licensing', //车龄
      id: '',
      name: '不限',
      start_licensing_time: '',
      end_licensing_time: ''
    }, {
      tag: 'kilometers', //里程
      id: '',
      name: '不限',
      start_kilometers: '',
      end_kilometers: ''
    }, {
      tag: 'transmission', //变速箱
      id: '',
      name: '不限'
    }, {
      tag: 'displacement', //排量
      id: '',
      name: '不限'
    }, {
      tag: 'emission', //排放标准
      id: '',
      name: '不限'
    }, {
      tag: 'fuel', //燃油类型
      id: '',
      name: '不限'
    }, {
      tag: 'color', //车身颜色
      id: '',
      name: '不限'
    }, {
      tag: 'vendor', // 厂家类型
      id: '',
      name: '不限'
    }], //更多筛选
    // logs: [],
    // b: { 
    //   arr: [{ name: '数值项目1' }] ,
    //   //深层节点也支持函数属性
    //   fnTest:function(){
    //     return this.motto.split('').reverse().join('')
    //   }
    // },
    // firstName: 'dnt',
    // lastName: 'zhang',
    // fullName: function () {
    //   return this.firstName + this.lastName
    // },
    // pureProp: 'pureProp',
    // globalPropTest: 'abc', //更改我会刷新所有页面,不需要再组件和页面声明data依赖
    // ccc: { ddd: 1 } //更改我会刷新所有页面,不需要再组件和页面声明data依赖
  },
  globalData: ['globalPropTest', 'ccc.ddd'],
  logMotto: function () {
    console.log(this.data.motto)
  },
  //默认 false，为 true 会无脑更新所有实例
  //updateAll: true
}