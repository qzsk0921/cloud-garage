// components/dialog/poster.js
const localImgInfo = []; //  网络图片通过getImageInfo 加载到本地
import {
  getQRcode
} from '../../api/business'
// import { userInfo } from '../../store/user-store';
import create from '../../utils/create'
import store from '../../store/common'

// Component({
create({
  /**
   * 组件的属性列表
   */
  properties: {
    dialogVisible: {
      type: Number,
      value: 0
    },
    detail: {
      type: Object,
      value: {}
    },
    // userInfo: {
    //   type: Object,
    //   value: {}
    // }
  },
  observers: {
    'dialogVisible': function (val) {
      // console.log(val)
      if (val === 1) {
        const tempData = {
          type: this.data.detail.type,
          sq_jinzhu_id: this.data.detail.sq_jinzhu_id,
          goods_id: this.data.detail.id,
          share_user_id: store.data.userInfo.id
        }
        getQRcode(tempData).then(res => {
          this.getLocalImg([this.data.detail.cover_url, res.data.url])
        })
      }
    }
  },
  /**
   * 组件的初始数据
   */
  data: {
    canvasWidth: 750,
    canvasHeight: 1192,
    // qr_img: '../../assets/images/my_icon_teamcar.png', // 二维码
    // car_detail: {
    //   "l1": "标题，最多显示两行，由上牌时间、厂家类型、排量、车辆类型、变速箱类型组合展示",
    //   "l3": "10.8",
    //   "l4": "宝马",
    //   "l5": "0.5万公里",
    //   "l6": "2021年3月23日",
    //   "cover": "https://www.nissanusa.com/content/dam/Nissan/us/vehicles/gtr/2021/overview/2021-nissan-gtr-awd-sports-car.jpg" //封面图
    // }
  },

  /**
   * 组件的方法列表
   */
  methods: {
    // 关闭弹窗
    dialogTapHandle() {
      this.setData({
        dialogVisible: 0
      })
    },
    // getLocalImg
    getLocalImg(imgList) {
      // const {
      //   bg,
      //   book_list
      // } = this.data;
      // const imgList = book_list.map(item => {
      //   return item.cover;
      // });
      // imgList.push(bg);
      // const imgList = [this.data.detail.cover_url, this.data.detail.car_extend.small_path]
      const _this = this
      imgList.forEach((item, index) => {
        wx.getImageInfo({
          src: item,
          success: function (res) {
            console.log(res)
            // 保存到本地
            localImgInfo[index] = res.path;
            if (index === 1) {
              console.log(localImgInfo[index])
              _this.setData({
                qrcode: localImgInfo[index]
              })
            }
          }
        })
        // wx.getImageInfo({
        //   src: this.data.detail.cover_url,
        //   success: function (res) {
        //     console.log(res)
        //     // 保存到本地
        //     localImgInfo['cover'] = res.path;
        //   }
        // })
      })
    },
    // 生成海报
    savePoster() {
      // 生成图片
      wx.showLoading({
        title: '海报生成中...'
      });
      setTimeout(this.drawCanvas.bind(this), 500)
    },
    // 绘制canvas
    drawCanvas() {
      const {
        canvasWidth,
        canvasHeight,
      } = this.data;
      const detail = this.data.detail
      // 在自定义组件下，当前组件实例的this，表示在这个自定义组件下查找拥有 canvas-id 的 canvas ，如果省略则不在任何自定义组件内查找
      const ctx = wx.createCanvasContext('canvas', this);
      // const canvas_width = canvasWidth;
      // const canvas_height = canvasHeight;
      // 背景色
      ctx.setFillStyle('#ffffff');
      ctx.fillRect(0, 0, canvasWidth, canvasHeight);

      // 绘制头图
      // ctx.drawImage(car_detail.cover, 0, 82, canvasWidth, 502);
      ctx.drawImage(localImgInfo[0], 40, 82, 670, 502);

      // 绘制头像
      // ctx.save(); // 先保存状态 已便于画完圆再用
      // ctx.beginPath(); //开始绘制

      // const avatarWidth = 66; // 头像宽度
      // const avatarCenterY = 86; // 头像中心Y坐标
      // ctx.arc(canvasWidth / 2, avatarCenterY, avatarWidth / 2, 0, Math.PI * 2, false);
      // ctx.setFillStyle('#eeeeee');
      // ctx.fill();
      // ctx.clip();
      // ctx.drawImage(localImgInfo['avatarUrl'] || avatarUrl, (canvasWidth - avatarWidth) / 2, avatarCenterY - avatarWidth / 2, avatarWidth, avatarWidth);
      // ctx.restore(); //恢复之前保存的绘图上下文 恢复之前保存的绘图上下午即状态 可以继续绘制


      // 绘制标题
      ctx.setFontSize(34);
      ctx.setFillStyle("#333333");
      const headText = detail.name;
      // // 字体加粗
      // ctx.fillText(headText, 40, 619);
      // ctx.fillText(headText, 39, 620);
      // 分行
      fillTextLineBreak(headText, 670, 58)

      // 绘制报价
      ctx.setFillStyle('#EC5846');
      ctx.fillRect(40, 740, 95, 44);

      ctx.setFontSize(28);
      ctx.setFillStyle("#ffffff");
      ctx.fillText('报价', 60, 770);

      ctx.setFontSize(56);
      ctx.setFillStyle("#EC5846");

      const offer = parseFloat(detail.price) / 10000
      ctx.fillText(offer, 40, 861);

      ctx.setFontSize(28);
      ctx.fillText('万', 183, 861);

      // // 底部背景色

      // // // 书籍列表
      // // const bookListStartY = headerHeight;
      // // /*循环绘制每一本书籍*/
      // // for (let i = 0; i < book_list.length; i++) {
      // //   const book = book_list[i];
      // //   drawBook(book, i, book_list.length - 1 === i);
      // // }


      // // ctx.setFillStyle('#eeeeee');
      // // ctx.fillRect(0, canvasHeight - bottomHeight, canvasWidth, bottomHeight);

      // 底部二维码
      ctx.save(); // 先保存状态 已便于画完圆再用
      ctx.beginPath(); //开始绘制

      const maWidth = 219; // 二维码宽度
      // const maArcWidth = 230; // 二维码外层宽度
      const maCenterY = 847 + maWidth / 2; // 图片中心Y坐标
      ctx.arc(491 + maWidth / 2, maCenterY, maWidth / 2, 0, Math.PI * 2, false);
      ctx.fill();
      ctx.clip();
      // 二维码白色底色
      ctx.setFillStyle('#ffffff')
      ctx.fillRect(491, maCenterY - maWidth / 2, maWidth, maWidth)
      ctx.drawImage(localImgInfo[1], 491, maCenterY - maWidth / 2, maWidth, maWidth);
      ctx.restore(); //恢复之前保存的绘图上下文 恢复之前保存的绘图上下文即状态 可以继续绘制

      ctx.setFontSize(26);
      ctx.setFillStyle("#333333");
      ctx.fillText('扫码查看详情', 516, 1103)



      // 底部文字
      ctx.setFontSize(28);
      ctx.setFillStyle("#333333");

      const footerText1 = '【汽车品牌】';
      const footerText2 = '【表显里程】';
      const footerText3 = '【上牌时间】';
      const footerText1v = detail.car_extend.band;
      const footerText2v = detail.car_extend.kilometers_str;
      const footerText3v = detail.car_extend.licensing_time;

      const line1StartX = 32;
      const footerLine1Y = 937;

      const footerNextTextStartX = line1StartX + ctx.measureText(footerText1).width;

      ctx.fillText(footerText1, line1StartX, footerLine1Y);
      ctx.fillText(footerText2, line1StartX, footerLine1Y + 64);
      ctx.fillText(footerText3, line1StartX, footerLine1Y + 64 * 2);


      ctx.setFillStyle("#4A74F6");
      ctx.fillText(footerText1v, footerNextTextStartX, footerLine1Y);
      ctx.fillText(footerText2v, footerNextTextStartX, footerLine1Y + 64);
      ctx.fillText(footerText3v, footerNextTextStartX, footerLine1Y + 64 * 2);


      // function drawBook(item, i, isLast) {
      //   const bookStartY = bookListStartY + i * bookHeight + 20; // 当前图书起始Y坐标 顶部留空20px
      //   const bookEndY = bookListStartY + (i + 1) * bookHeight; // 当前图书结束Y坐标
      //   //绘制左图
      //   const imgX = 26; // 图片X起点
      //   const imgY = bookStartY; // 图片Y起点
      //   const imgWidth = 160; // 图片左侧起始
      //   const imgHeight = 220; // 图片左侧起始


      //   // 如果封面已加载到本地
      //   if (localImgInfo[item.cover]) {
      //     ctx.drawImage(localImgInfo[item.cover], imgX, imgY, imgWidth, imgHeight)
      //   } else {
      //     ctx.setFillStyle('#f7f7f7');
      //     ctx.fillRect(imgX, imgY, imgWidth, imgHeight);
      //   }

      //   let titleX = 200; // 文字x起点坐标
      //   const RIGHT_MAX_WIDTH = canvas_width - titleX - imgX; // 右侧文本最大宽度 =  canvas总宽度 - 左侧img宽度 - 右侧留白
      //   // 绘制书名
      //   ctx.setFontSize(28);
      //   ctx.setFillStyle("#000000");
      //   let bookTitle = item.name || ''; // 书名
      //   let titleLineHeight = 36;

      //   let titleY = bookStartY + titleLineHeight + 10;
      //   const titleRowNum = drawText(bookTitle, titleX, titleY, titleLineHeight, RIGHT_MAX_WIDTH);

      //   // 绘制书籍副标题
      //   const subTitleStartY = titleRowNum * titleLineHeight + bookStartY + 26; // 副标题起始Y

      //   let smallTextStartY = subTitleStartY;

      //   let subTitle = item.sub_name || '';
      //   if (subTitle) {
      //     ctx.setFontSize(24);
      //     ctx.setFillStyle("#5D5953");


      //     let subTitleLineHeight = 30;
      //     let subTitleY = subTitleStartY + subTitleLineHeight;
      //     const subTitleRowNum = drawText(subTitle, titleX, subTitleY, subTitleLineHeight, RIGHT_MAX_WIDTH);
      //     smallTextStartY = smallTextStartY + subTitleLineHeight * subTitleRowNum + 16;
      //   }



      //   // 小文字行高一致 大小颜色一致
      //   const smallTextLineHeight = 28;
      //   ctx.setFontSize(20);
      //   ctx.setFillStyle("#8D9199");


      //   // 作者
      //   let author = '作者：' + (item.author || '');
      //   const authorY = smallTextStartY + smallTextLineHeight;
      //   drawText(author, titleX, authorY, smallTextLineHeight, RIGHT_MAX_WIDTH);
      //   let translatorY = authorY + smallTextLineHeight;
      //   let publisherY = translatorY;
      //   if (item.translator) {
      //     // 译者
      //     let translator = '译者：' + item.translator;
      //     drawText(translator, titleX, translatorY, smallTextLineHeight, RIGHT_MAX_WIDTH);

      //     publisherY = translatorY + smallTextLineHeight;
      //   }


      //   // 绘制出版社
      //   let publisher = item.publisher || '';
      //   drawText(publisher, titleX, publisherY, smallTextLineHeight, RIGHT_MAX_WIDTH);






      //   // 最后一个底部没有分割线
      //   if (!isLast) {
      //     //分割线
      //     ctx.setStrokeStyle('#c1c1c1');
      //     ctx.beginPath();
      //     // ctx.setLineWidth(0.6);
      //     // ctx.setLineDash([4, 2]);
      //     ctx.setLineDash([6, 2]);

      //     // ctx.lineDashOffset = 0.4; // 虚线偏移量，初始值为0

      //     ctx.moveTo(imgX, bookEndY);
      //     ctx.lineTo(canvasWidth - imgX, bookEndY);
      //     // context.lineTo(265, 209 + c)
      //     ctx.stroke();
      //   }

      // }

      // 将文字绘制到行 长文本自动换行 并返回行数
      /*
       * params
       * @text           需要绘制的文本字符
       * @startX         第一行文本的起始X坐标
       * @startY         第一行文本的起始Y坐标
       * @lineHeight     文本行高
       * @MAX_WIDTH      单行文字最大宽度，超过临界值自动换行
       *
       * return rowLength  返回绘制文本的行数
       * */
      // function drawText(text, startX, startY, lineHeight, MAX_WIDTH) {
      //   let allAtr = text.split('');
      //   let rowArr = []; // 拆分出来的每一行
      //   let rowStrArr = []; // 每一行的文字数组
      //   for (let i = 0; i < allAtr.length; i++) {
      //     const currentStr = allAtr[i];
      //     rowStrArr.push(currentStr);
      //     const rowStr = rowStrArr.join('');
      //     if (ctx.measureText(rowStr).width > MAX_WIDTH) {
      //       rowStrArr.pop(); // 删除最后一个
      //       rowArr.push(rowStrArr.join('')); // 完成一行
      //       rowStrArr = [currentStr];
      //       continue;
      //     }
      //     // 最后一个字母 直接添加到一行
      //     if (i === allAtr.length - 1) {
      //       rowArr.push(rowStr); // 完成一行
      //     }
      //   }

      //   for (let i = 0; i < rowArr.length; i++) {
      //     ctx.fillText(rowArr[i], startX, startY + i * lineHeight);
      //   }
      //   return rowArr.length;
      // }

      /**
       * 
       * @param {*} text 
       * @param {*} lw 行宽
       * @param {*} lh 行高
       */
      function fillTextLineBreak(text, lw, lh) {
        const chr = text.split(""); //这个方法是将一个字符串分割成字符串数组
        let temp = "";
        let row = [];

        for (let a = 0; a < chr.length; a++) {
          if (ctx.measureText(temp).width < lw) {
            temp += chr[a];
          } else {
            a--; //这里添加了a-- 是为了防止字符丢失，效果图中有对比
            row.push(temp);
            temp = "";
          }
        }
        row.push(temp);

        //如果数组长度大于2 则截取前两个
        if (row.length > 2) {
          let rowCut = row.slice(0, 2);
          let rowPart = rowCut[1];
          let test = "";
          let empty = [];
          for (let a = 0; a < rowPart.length; a++) {
            if (ctx.measureText(test).width < lw) {
              test += rowPart[a];
            } else {
              break;
            }
          }
          empty.push(test);
          let group = empty[0] + "..." //这里只显示两行，超出的用...表示
          rowCut.splice(1, 1, group);
          row = rowCut;
        }
        for (let b = 0; b < row.length; b++) {
          ctx.fillText(row[b], 40, 632 + b * lh, lw);
        }
      }
      // 绘制图片
      ctx.draw(false, (() => {
        // 延时生成图片 否则真机测试文字会样式混乱
        setTimeout(() => {
          // 生成图片
          wx.canvasToTempFilePath({
            canvasId: 'canvas',
            success: res => {
              wx.hideLoading();
              this.createShareImgSuccess(res.tempFilePath);
            },
            fail: (err) => {
              console.log(err)
              wx.showToast({
                title: '图片生成失败~',
                icon: 'none'
              });
            }
          }, this)
        }, 300)
      })())
    },
    // 创建分享图成功
    createShareImgSuccess(tempFilePath) {
      const _this = this;
      this.setData({
        animatDisappear: false,
        showPoster: true,
        dialogVisible: 0,
        tempShareImg: tempFilePath,
      });
      wx.saveImageToPhotosAlbum({
        filePath: tempFilePath, //这个只是测试路径，没有效果
        success(res) {
          wx.showToast({
            title: '海报已保存至相册，快去分享吧!',
            icon: 'none',
            duration: 3000,
          })
          _this.setData({
            animatDisappear: true
          })
        },
        // 保存到相册失败
        fail: function (err) {
          wx.hideLoading();
          if (err.errMsg === "saveImageToPhotosAlbum:fail cancel") {
            _this.saveShareImgErr();
          } else if (err.errMsg === "saveImageToPhotosAlbum:fail:auth denied" || err.errMsg === "saveImageToPhotosAlbum:fail auth deny" || err.errMsg === "saveImageToPhotosAlbum:fail authorize no response") {
            wx.showModal({
              title: '温馨提示',
              content: '请开启保存到相册权限，开启后自动保存相册',
              success(res) {
                if (res.confirm) {
                  wx.openSetting({
                    success(settingdata) {
                      if (settingdata.authSetting['scope.writePhotosAlbum']) {
                        _this.createShareImgSuccess(tempFilePath);
                      } else {
                        _this.saveShareImgErr();
                      }
                    }
                  })
                } else if (res.cancel) {
                  _this.saveShareImgErr();
                }
              }
            })
          } else {
            _this.saveShareImgErr();
          }
        }
      })
    },
    // 保存到手机失败
    saveShareImgErr() {
      wx.showToast({
        title: '图片保存失败~ ',
        icon: 'none',
        duration: 3000,
      })
    },
  },
  lifetimes: {
    ready() {
      // 在组件在视图层布局完成后执行
    },
    attached: function () {
      // 在组件实例进入页面节点树时执行
    },
    detached: function () {
      // 在组件实例被从页面节点树移除时执行
    },
  }
})