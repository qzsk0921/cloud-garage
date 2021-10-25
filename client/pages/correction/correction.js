// pages/correction/correction.js
const commonStore = require('../../store/common-store.js')
import {
  getQnToken
} from '../../api/oss'
import qiniuTools from '../../utils/oss'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    submitFlag: true, // 提交按钮截流
    currentSpecifyCount: 0, //错误描述字数
    currentPicCount: 0, //截图数
    picFileList: [], //错误截图
    navigationBarTitleText: "纠错",
    ...commonStore.data,
  },
  inputHandle(e) {
    // console.log(e)
    this.setData({
      currentSpecifyCount: e.detail.cursor
    })
  },
  beforeRead(e) {
    // console.log(e)
    e.detail.callback(true)
  },
  afterRead(e) {
    console.log(e)
    const {
      file
    } = e.detail;

    const {
      picFileList = []
    } = this.data

    picFileList.push({
      ...file,
    })

    this.setData({
      currentPicCount: this.data.currentPicCount + 1,
      picFileList,
    })
  },
  deleteFile(e) {
    // console.log(e)
    const index = e.detail.index;

    this.data.picFileList.splice(index, 1);
    this.setData({
      currentPicCount: this.data.currentPicCount - 1,
      picFileList: this.data.picFileList
    })
  },
  bindFormSubmit(e) {
    // console.log(e)
    console.log(e.detail.value)
    if (this.data.submitFlag) {
      this.setData({
        submitFlag: false
      })

      const currentValue = e.detail.value
      let array = Object.keys(currentValue)

      let validator = array.some(key => {
        console.log(key)
        if (!currentValue[key]) {
          console.log('if')
          wx.showToast({
            title: '您输入的内容不全',
            icon: 'none'
          })
          return true
        }
        return false
      })

      if (!validator) {
        if (!this.data.picFileList.length) {
          wx.showToast({
            title: '请上传图片',
            icon: 'none'
          })
          validator = true
        }
      }

      //验证失败
      if (validator) {
        this.setData({
          submitFlag: true
        })
        return
      }

      // 上传图片
      getQnToken().then(res => {
        const data = res.data
        // 介绍图
        qiniuTools.uploadQiniu(this.data.picFileList, data.upToken).then(res => {
          // console.log(res)
          const urlArr = res.map(item => {
            return app.globalData.qnUrl + JSON.parse(item.data).key
          })
          // console.log(urlArr)
          this.setData({
            'activityData.cover_url': urlArr
          })
          // 提交
          // write here...
          // this.createActivity(this.data.activityData).then(res => {
          //   this.setData({
          //     submitFlag: true
          //   })
          //   wx.showToast({
          //     title: '提交成功',
          //     icon: 'none'
          //   })
          //   wx.navigateBack({})
          // })
        })
      }).catch(err => {
        console.log(err)
      })

    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    commonStore.bind('correctionPage', this)
    commonStore.init()
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

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