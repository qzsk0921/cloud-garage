// 引入 OCR SDK 文件
const ocrSdk = require('../../../ocrsdk/index');
const { OcrType } = ocrSdk;
const { secretId, secretKey } = require('../config');

Page({
  data: {
    cardList: [
      {
        type: OcrType.ID_CARD,
        title: '身份证',
        text: '识别身份证件',
        img: 'https://ocr-static-1254418846.file.myqcloud.com/mpsdk/images/card-id-front.svg',
        config: { CropIdCard: true, CropPortrait: true },
      },
      {
        type: OcrType.BANK_CARD,
        title: '银行卡',
        text: '识别银行卡号码等',
        img: 'https://ocr-static-1254418846.file.myqcloud.com/mpsdk/images/card-bank.svg',
      },
      {
        type: OcrType.BUSINESS_CARD,
        title: '名片',
        text: '扫描名片识别内容',
        img: 'https://ocr-static-1254418846.file.myqcloud.com/mpsdk/images/card-business.svg',
      },
    ],
  },

  onLoad() {
    const {
      theme,
      autoMode,
    } = wx.demoConfig;
    wx.setNavigationBarTitle({
      title: autoMode ? '自动识别模式' : '拍照识别模式',
    })
    this.setData({
      theme
    });
  },

  onItemTap(e) {
    const { item } = e.currentTarget.dataset;
    const { type, config } = item;
    const {
      theme,
      autoMode,
      maxTry,
      resultPage,
      modifiable,
      disableAlbum,
    } = wx.demoConfig;
    ocrSdk.start({
      secretId,
      secretKey,
      ocrType: type,
      ocrOption: {
        Config: config,
      },
      cameraConfig: {
        autoMode,
        maxTry,
        disableAlbum,
      },
      resultPage,
      resultPageConfig: {
        modifiable,
      },
      theme,
      success: (res) => {
        console.log('ocr result is:', res);
        if (!resultPage) {
          wx.showToast({
            icon: 'success',
            duration: 3000,
            title: '识别成功',
          });
          setTimeout(() => {
            wx.navigateBack();
          }, 3000);
        } else {
          wx.navigateBack();
        }
      },
      fail: (error) => {
        console.log('ocr failed:', error);
      },
    });
  },
});
