// pages/publish/publish.js
import config from '../../config/index'
import store from '../../store/common'
import qiniuTools from '../../utils/oss'
import {
  getQnToken
} from '../../api/oss'
import {
  addGood,
  getGoodEditDetail,
  editGood
} from '../../api/publish'
const duration = 1000

const commonStore = require('../../store/common-store.js')
// https://www.showdoc.com.cn/1503621351863792/7743787617794968 app接口文档
Page({

  /**
   * 页面的初始数据
   */
  data: {
    submitFlag: true, // 提交按钮截流
    mode: 'create', //edit编辑 create创建
    navigationBarTitleText: "发布云车",
    ...commonStore.data,
    currentCountIntroduction: 0, //车辆简介
    // cover_urlFileList: [], //优惠介绍图
    // coverFileList: [], //海报图
    // prove_imagesFileList: [], //视频
    formData: {
      cover_url: '', //封面
      frame_number: '', //车架号
      band_id: '', //品牌和车型（车辆型号）
      shop_car_model_id: '', //型号
      vehicle_type_id: '', //宝马X5
      band: '', //品牌车型
      licensing_time: '', //上牌时间 Y-m-d date
      price: '', //报价
      is_transfer_fee: 0, //1:有 0:无 过户费
      kilometers: '', //表显里程 公里数
      color_id: '', //车身颜色id
      color: '', //车身颜色
      yearly_inspection: '', //年检到期时间 Y-m-d date
      force_insurance: '', //强制险到期时间 Y-m-d date
      transmission_case_id: '', //变速箱id
      transmission_case: '',
      displacement_id: '', //排量id
      displacement: '',
      emission_standard_id: '', //排放标准
      emission_standard: '',
      vendor_type_id: '', //厂商类型
      vendor_type: '',
      fuel_type_id: '', //燃油类型
      market_price: '', //指导价
      location_name: '', //车辆位置 自定义参数
      province: '', //省code(车辆位置)
      city: '', //市code(车辆位置)
      description: '', //描述——————下面为云车库参数
      cover: [], //展示图
      prove_images: [], //证明材料
      // company_show_image_arr: [], //公司介绍图片
    },
    dialogPublishSuccessVisible: 0, //发布成功弹窗
    dialogStandardVisible: 0 //发布标准弹窗
  },
  // 发布
  async formSubmit(e) {
    // this.
    // this.ios10Handle()
    // console.log(e.detail.value)
    if (this.data.submitFlag) {
      this.setData({
        submitFlag: false
      })
      const formData = e.detail.value

      Object.keys(formData).forEach(key => {
        if (['frame_number', 'price', 'kilometers', 'market_price', 'description'].includes(key)) {
          console.log(key)
          this.data.formData[key] = formData[key]
        }
      })
      // 校验
      if (!this.formValidate(this.data.formData)) {
        //验证失败
        this.setData({
          submitFlag: true
        })
        return
      }

      let http_cover_url = null,
        http_cover = null,
        http_prove_images = null

      const tempUpdate = {
        'formData.cover_url': this.data.formData.cover_url,
        'formData.cover': this.data.formData.cover,
        'formData.prove_images': this.data.formData.prove_images,
      }

      // 头像
      //https协议的资源 不重复上传（未修改）
      if (this.data.formData.cover_url && this.data.formData.cover_url.length) {
        if (!/^https/.test(this.data.formData.cover_url[0].url)) {
          http_cover_url = await this.updateQiniu(this.data.formData.cover_url)
          if (http_cover_url) {
            tempUpdate['formData.cover_url'] = http_cover_url[0]
          } else {
            console.log('http_avatar上传失败')
            return
          }
        } else {
          tempUpdate['formData.cover_url'] = this.data.formData.cover_url[0].url
        }
      }

      // 展示图
      if (this.data.formData.cover.length) {
        // http_http_cover = this.data.formData.http_cover
        // 取出修改的公司介绍图数组
        let tempArr = [],
          httpTempArr = []
        this.data.formData.cover.forEach((item, index) => {
          if (!/^https/.test(item.url)) {
            // this.data.formData.cover.splice(index, 1)
            tempArr.push(item)
          } else {
            httpTempArr.push(item.url)
          }
        })

        if (tempArr.length) {
          // 有更换则上传
          let temp_http_cover = await this.updateQiniu(tempArr)
          // http_cover = this.data.formData.cover.concat(temp_http_cover).concat(httpTempArr.map(it => it.url))
          http_cover = httpTempArr.concat(temp_http_cover.map(url => {
            return url
          }))

          tempUpdate['formData.cover'] = http_cover
        } else {
          tempUpdate['formData.cover'] = this.data.formData.cover.map(item => item.url)
        }
      }

      // 证明材料
      if (this.data.formData.prove_images.length) {
        console.log('prove_images')
        // http_prove_images = this.data.formData.prove_images
        // 取出修改的公司介绍图数组
        let tempArr = [],
          httpTempArr = []
        this.data.formData.prove_images.forEach((item, index) => {
          if (!/^https/.test(item.url)) {
            // this.data.formData.prove_images.splice(index, 1)
            tempArr.push(item)
          } else {
            httpTempArr.push(item.url)
          }
        })

        if (tempArr.length) {
          // 有更换则上传
          let temp_http_prove_images = await this.updateQiniu(tempArr)
          // http_prove_images = this.data.formData.prove_images.concat(temp_http_prove_images).concat(httpTempArr.map(it => it.url))

          http_prove_images = httpTempArr.concat(temp_http_prove_images.map(url => {
            return url
          }))

          tempUpdate['formData.prove_images'] = http_prove_images
        } else {
          tempUpdate['formData.prove_images'] = this.data.formData.prove_images.map(item => item.url)
        }
      }

      this.setData(tempUpdate)

      if (this.data.mode === 'create') {
        console.log(this.data.formData)
        // 返回我的名片页面
        this.addGood(this.data.formData).then(res => {
          // this.setData({
          //   submitFlag: true
          // })
          wx.showToast({
            icon: 'none',
            title: '发布成功',
            duration
          })

          setTimeout(() => {
            // wx.reLaunch({
            //   url: '/pages/index/index',
            // })
            this.setData({
              dialogPublishSuccessVisible: 1
            })
          }, duration)
        }).catch(res => {
          this.setData({
            submitFlag: true
          })
          this.data.formData.cover_url = [{
            url: this.data.formData.cover_url,
            type: 'image',
            thumb: this.data.formData.cover_url
          }]
          this.data.formData.cover = this.data.formData.cover.map(item => {
            return {
              url: item,
              type: 'image',
              thumb: item
            }
          })
          this.data.formData.prove_images = this.data.formData.prove_images.map(item => {
            return {
              url: item,
              type: 'image',
              thumb: item
            }
          })

          const tempUpdate = {
            'formData.cover_url': this.data.formData.cover_url,
            'formData.cover': this.data.formData.cover,
            'formData.prove_images': this.data.formData.prove_images,
          }
          this.setData(tempUpdate)
        })
      } else if (this.data.mode === 'edit') {
        // 删除图片https的不用删
        // let cdnFiles = [].concat(this.data.formData.cover_url, this.data.formData.cover, this.data.formData.prove_images)

        // qiniuTools.deleteQiniu(needDelFiles)
        this.editGood(this.data.formData).then(res => {
          // this.setData({
          //   submitFlag: true
          // })
          wx.showToast({
            icon: 'none',
            title: '发布成功',
            duration
          })

          setTimeout(() => {
            // wx.reLaunch({
            //   url: '/pages/index/index',
            // })
            this.setData({
              dialogPublishSuccessVisible: 1
            })
          }, duration)
        })
      }
    }
  },
  formValidate(formData) {
    // console.log(formData)
    const flag = Object.keys(formData).some(key => {
      if (!formData[key] || (typeof formData[key] == 'object' && !formData[key].length)) {
        if (key === 'cover_url') {
          wx.showToast({
            icon: 'none',
            title: '请选择封面',
          })
          return true
        } else if (key === 'frame_number') {
          wx.showToast({
            icon: 'none',
            title: '请输入车架号',
          })
          return true
        } else if (key === 'band_id') {
          wx.showToast({
            icon: 'none',
            title: '请选择车型',
          })
          return true
        } else if (key === 'shop_car_model_id') {
          wx.showToast({
            icon: 'none',
            title: '请选择车型',
          })
          return true
        } else if (key === 'licensing_time') {
          wx.showToast({
            icon: 'none',
            title: '请选择上牌时间'
          })
          return true
        } else if (key === 'price') {
          wx.showToast({
            icon: 'none',
            title: '请输入价格'
          })
          return true
        } else if (key === 'kilometers') {
          wx.showToast({
            icon: 'none',
            title: '请输入表显里程'
          })
          return true
        } else if (key === 'color_id') {
          wx.showToast({
            icon: 'none',
            title: '请选择车身颜色'
          })
          return true
        } else if (key === 'yearly_inspection') {
          wx.showToast({
            icon: 'none',
            title: '请选择年检到期时间'
          })
          return true
        } else if (key === 'force_insurance') {
          wx.showToast({
            icon: 'none',
            title: '请选择强制险到期时间'
          })
          return true
        } else if (key === 'transmission_case_id') {
          wx.showToast({
            icon: 'none',
            title: '请选择变速箱'
          })
          return true
        } else if (key === 'displacement_id') {
          wx.showToast({
            icon: 'none',
            title: '请选择排量'
          })
          return true
        } else if (key === 'emission_standard_id') {
          wx.showToast({
            icon: 'none',
            title: '请选择排放标准'
          })
          return true
        } else if (key === 'vendor_type_id') {
          wx.showToast({
            icon: 'none',
            title: '请选择厂家类型'
          })
          return true
        } else if (key === 'fuel_type_id') {
          wx.showToast({
            icon: 'none',
            title: '请选择燃油类型'
          })
          return true
        } else if (key === 'market_price') {
          wx.showToast({
            icon: 'none',
            title: '请输入指导价格'
          })
          return true
        } else if (key === 'location_name') {
          wx.showToast({
            icon: 'none',
            title: '请选择车辆位置'
          })
          return true
        } else if (key === 'description') {
          wx.showToast({
            icon: 'none',
            title: '请输入车辆描述'
          })
          return true
        } else if (key === 'cover') {
          wx.showToast({
            icon: 'none',
            title: '请选择车辆展示图'
          })
          return true
        } else if (key === 'prove_images') {
          // 选填
          wx.showToast({
            icon: 'none',
            title: '请选择证明材料'
          })
          return false
        }
        return false
      }
      return false
    })

    // 全部填写再校验手机号码
    if (!flag) {
      // if (!checkMobile(formData.mobile)) {
      //   wx.showToast({
      //     title: '请输入正确手机号',
      //     icon: 'none'
      //   })
      //   return false
      // } else {
      //   return true
      // }
      return true
    } else {
      return false
    }
  },
  // 上传资源
  updateQiniu(filePath) {
    console.log(filePath)
    return new Promise((resolve, reject) => {
      if (this.data.qnToken) {
        qiniuTools.uploadQiniu(filePath, this.data.qnToken, resolve, reject)
      } else {
        // return new Promise((resolve, reject) => {
        getQnToken().then(res => {
          const upToken = this.data.qnToken = res.data.upToken
          // 介绍图
          qiniuTools.uploadQiniu(filePath, upToken, resolve, reject)
        })
        // })
      }
    })
  },
  // 公司简介
  textareaInputIntroductionHandle(e) {
    let len = e.detail.value.length

    if (len > 200) {
      len = 200
    }
    this.textareaInputHandle(len, 'currentCountIntroduction')
  },
  textareaInputHandle(num, type) {
    const data = {}

    data[type] = num

    this.setData(data)
  },
  // 查看发车规范
  viewStandardHandle() {
    this.setData({
      dialogStandardVisible: 1
    })
  },
  formatNumber(n) {
    n = n.toString()
    return n[1] ? n : `0${n}`
  },
  // 上牌时间
  bindDateChange(e) {
    // console.log(e)
    const value = e.detail.value
    this.setData({
      'formData.licensing_time': value
    })
  },
  // 年检日期
  bindYearDateChange(e) {
    const value = e.detail.value
    this.setData({
      'formData.yearly_inspection': value
    })
  },
  // 强险日期
  bindForceDateChange(e) {
    const value = e.detail.value
    this.setData({
      'formData.force_insurance': value
    })
  },
  // 过户费
  transferFeeHandle() {
    this.setData({
      'formData.is_transfer_fee': this.data.formData.is_transfer_fee ? 0 : 1
    })
  },
  // 车辆型号
  modeHandle() {
    const currentMode = this.data.formData.band
    wx.navigateTo({
      url: `/pages/publish/band?page=pages/publish/publish&currentMode=${currentMode}`,
    })
  },
  // 车身颜色
  colorHandle() {
    this.optionPage('color')
  },
  // 变速箱
  gearboxHandle() {
    this.optionPage('transmission')
  },
  // 排量
  displacementHandle() {
    this.optionPage('displacement')
  },
  // 排放标准
  emission_standardHandle() {
    this.optionPage('emission_standard')
  },
  //厂家类型
  vendor_typeHandle() {
    this.optionPage('vendor')
  },
  //燃油类型
  fuel_typeHandle() {
    this.optionPage('fuel')
  },
  // 选项页面(选颜色，变速箱，排量，排放标准)
  optionPage(type) {
    let mytype = null

    switch (type) {
      case 'color':
        mytype = 7
        break;
      case 'transmission':
        mytype = 1
        break;
      case 'displacement':
        mytype = 2
        // expected output: "Mangoes and papayas are $2.79 a pound."
        break;
      case 'emission_standard':
        mytype = 3
        break;
      case 'vendor':
        mytype = 8
        break;
      case 'fuel':
        mytype = 5
        break;
      default:
        console.log(`Sorry, we are out of ${type}.`);
    }

    wx.navigateTo({
      url: `/pages/publish/option?type=${mytype}&page=pages/publish/publish`,
    })
  },
  // 位置
  locationHandle() {
    this.getSetting('location')
  },
  getSetting(type) {
    const that = this
    // 查询一下用户是否授权了地理位置 scope.userLocation
    wx.getSetting({
      success(res) {
        console.log(res)
        if (!res.authSetting['scope.userLocation']) {
          wx.openSetting({
            success(res) {
              console.log(res.authSetting)
              // res.authSetting = {
              //   "scope.userInfo": true,
              //   "scope.userLocation": true
              // }
              if (res.authSetting['scope.userLocation']) {
                wx.authorize({
                  scope: 'scope.userLocation',
                  success() {
                    that.getLocation(type)
                  },
                  fail(err) {
                    console.log(err)
                  }
                })
              }
            }
          })
        } else {
          that.getLocation(type)
        }
      }
    })
  },
  getLocation(type) {
    const that = this;
    wx.getLocation({
      isHighAccuracy: true,
      type: 'gcj02',
      success: function (res) {
        let latitude = res.latitude
        let longitude = res.longitude
        wx.request({
          url: `https://apis.map.qq.com/ws/geocoder/v1/?location=${latitude},${longitude}&key=${config.tencentKey}`,
          success: res => {
            // console.log(res)
            const result = res.data.result

            store.data.currentAddress = {
              address: result.formatted_addresses.recommend,
              longitude: result.location.lng,
              latitude: result.location.lat,
              location: result.address_component.province + ' ' + result.address_component.city
            }

            store.update()

            if (that.getLocationCallback) {
              thie.getLocationCallback(result.address_component.province + ' ' + result.address_component.city)
            }

            if (type === 'location') {
              wx.navigateTo({
                url: '/pages/publish/treeselect?type=location&page=pages/publish/publish',
              })
            } else if (type === 'addressHandle') {
              // wx.chooseLocation({
              //   success: function (res) {
              //     // console.log('chooseLocation success')
              //     console.log(res)
              //     that.setData({
              //       // 'formData.address': res.name,
              //       'formData.address': res.address,
              //       'formData.address_latitude': res.latitude,
              //       'formData.address_longitude': res.longitude,
              //       'card.data.address': res.address //名片地址动态变化
              //     })
              //   },
              //   fail: function (res) {
              //     // 接口调用失败的回调函数
              //     console.log('chooseLocation fail')
              //     console.log(res)
              //   },
              //   complete: function (res) {
              //     // 接口调用结束的回调函数（调用成功、失败都会执行）
              //     console.log('chooseLocation complete')
              //     console.log(res)
              //   }
              // })
            }
          }
        })
      },
      fail: function (err) {
        console.log(err)
      },
      complete: function () {
        console.log('complete')
      }
    })
  },
  afterReadCover(event) {
    console.log(event)
    const {
      file
    } = event.detail;

    this.setData({
      'formData.cover_url': [file]
    });
  },
  afterReadShow(event) {
    console.log(event)
    const {
      file
    } = event.detail;
    // file.forEach((item, index) => {
    //   item.deletable = true
    // })

    // 当设置 mutiple 为 true 时, file 为数组格式，否则为对象格式
    const {
      cover = []
    } = this.data.formData;

    // console.log(tempFilePaths)
    cover.push(
      ...file,
    );
    this.setData({
      'formData.cover': cover
    });
  },
  afterReadProof(event) {
    console.log(event)
    const {
      file
    } = event.detail;
    // file.forEach((item, index) => {
    //   item.deletable = true
    // })

    // 当设置 mutiple 为 true 时, file 为数组格式，否则为对象格式
    const {
      prove_images = []
    } = this.data.formData;

    // console.log(tempFilePaths)
    prove_images.push(
      ...file,
    );
    this.setData({
      'formData.prove_images': prove_images
    });

    // wx.uploadFile({
    //   url: 'https://example.weixin.qq.com/upload', // 仅为示例，非真实的接口地址
    //   filePath: file.url,
    //   name: 'file',
    //   formData: {
    //     user: 'test'
    //   },
    //   success(res) {
    //     console.log(file)
    //     // 上传完成需要更新 file
    //     const {
    //       companypicList = []
    //     } = this.data;
    //     companypicList.push({
    //       ...file,
    //       url: res.data
    //     });
    //     this.setData({
    //       companypicList
    //     });
    //   },
    // });
  },

  deleteCoverHandle(e) {
    console.log(e)

    const currentThumb = e.detail.file.thumb

    this.data.formData.cover_url.some((item, index) => {
      if (item.thumb == currentThumb) {
        this.data.formData.cover_url.splice(index, 1)
        return true
      }
      return false
    })

    this.setData({
      'formData.cover_url': this.data.formData.cover_url
    });
  },
  deleteShowHandle(e) {
    console.log(e)

    const currentThumb = e.detail.file.thumb

    this.data.formData.cover.some((item, index) => {
      if (item.thumb == currentThumb) {
        this.data.formData.cover.splice(index, 1)
        return true
      }
      return false
    })

    this.setData({
      'formData.cover': this.data.formData.cover
    });
  },
  deleteProofHandle(e) {
    console.log(e)

    const currentThumb = e.detail.file.thumb

    this.data.formData.prove_images.some((item, index) => {
      if (item.thumb == currentThumb) {
        this.data.formData.prove_images.splice(index, 1)
        return true
      }
      return false
    })

    this.setData({
      'formData.prove_images': this.data.formData.prove_images
    });
  },
  getGoodEditDetail(data) {
    return new Promise((resolve, reject) => {
      getGoodEditDetail(data).then(res => {
        resolve(res)
      }).catch(err => {
        reject(err)
      })
    })
  },
  addGood(data) {
    return new Promise((resolve, reject) => {
      addGood(data).then(res => {
        resolve(res)
      }).catch(err => {
        reject(err)
      })
    })
  },
  editGood(data) {
    return new Promise((resolve, reject) => {
      editGood(data).then(res => {
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
    commonStore.bind('publishPage', this)
    commonStore.init()

    //发车规范 0 下次不提示 1 提示
    const dialogStandardVisible = wx.getStorageSync('dialogStandardVisible')
    // console.log(dialogStandardVisible)
    if (!dialogStandardVisible) {
      this.setData({
        dialogStandardVisible: 1
      })
    }

    const {
      id,
      mode
    } = options

    if (mode === 'edit' && id) {
      this.data.mode = mode
      this.getGoodEditDetail({
        goods_id: id
      }).then(res => {
        const formData = res.data.car_extend

        formData.licensing_time = this.formatTime(formData.licensing_time * 1000, 'yy-mm-dd') //上牌时间

        formData.yearly_inspection = this.formatTime(formData.yearly_inspection * 1000, 'yy-mm') //年检到期时间

        formData.force_insurance = this.formatTime(formData.force_insurance * 1000, 'yy-mm') //强制险到期时间

        formData.cover_url = [{
          url: res.data.cover_url,
          type: 'image',
          thumb: res.data.cover_url
        }]
        formData.cover = res.data.cover.map(item => {
          return {
            url: item,
            type: 'image',
            thumb: item
          }
        })
        formData.prove_images = res.data.car_extend.prove_images.map(item => {
          return {
            url: item,
            type: 'image',
            thumb: item
          }
        })
        formData.description = res.data.description //描述
        formData.market_price = res.data.market_price //指导价
        formData.price = res.data.price //报价
        formData.location_name = res.data.province_name + res.data.city_name //车辆位置 自定义参数
        formData.province = res.data.province //省code(车辆位置)
        formData.city = res.data.city //市code(车辆位置)

        //设置描述字数
        this.textareaInputHandle(res.data.description.length, 'currentCountIntroduction')

        this.setData({
          formData
        })
      })
    }
  },
  formatNumber(n) {
    n = n.toString()
    return n[1] ? n : 0 + n
  },
  formatTime(date, mode) {
    var date = new Date(date)
    var year = date.getFullYear()
    var month = date.getMonth() + 1
    var day = date.getDate()
    var hour = date.getHours()
    var minute = date.getMinutes()
    var second = date.getSeconds()

    if (mode === 'yy-mm-dd') {
      return [year, month, day].map(this.formatNumber).join('-')
    } else if (mode === 'yy-mm') {
      return [year, month].map(this.formatNumber).join('-')
    }
    return [year, month, day].map(this.formatNumber).join('-') + ' ' + [hour, minute, second].map(this.formatNumber).join(':')
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
    console.log(this.data.formData)
    this.setData({
      submitFlag: true
    })
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