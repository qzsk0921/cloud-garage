// AppID(小程序ID) wx2dc717318145b1ff
export default {
  baseUrl: 'https://wms.wljkxys.com',
  // baseUrl:'https://mbapp-test.xcmbkj.com', //测试
  contentType: 'application/json',
  tencentKey: 'NMUBZ-KWM6V-E5IPZ-UARUF-6CKRH-FFBM2',
  qnUrl: 'https://sharepuls.xcmbkj.com/',
  qnUpdateUrl: 'https://upload-z2.qiniup.com/',
  tabBar: {
    list: [{
      "pagePath": "/pages/index/index",
      "text": "车源",
      "iconPath": "/assets/images/nav_icon_car_uncheck.png",
      "selectedIconPath": "/assets/images/nav_icon_car_check.png"
    },
    {
      "pagePath": "/pages/profile/profile",
      "text": "个人中心",
      "iconPath": "/assets/images/nav_icon_my_uncheck.png",
      "selectedIconPath": "/assets/images/nav_icon_my_check.png"
    }]
  }
}