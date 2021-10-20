// components/dialog/poster.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    dialogVisible: {
      type: Number,
      value: 0
    },
  },

  /**
   * 组件的初始数据
   */
  data: {
    canvasWidth: 750,
    canvasHeight: 1192,
    qr_img: '/client/assets/images/my_icon_teamcar.png', // 二维码
    car_detail: {
      "l1": "标题，最多显示两行，由上牌时间、厂家类型、排量、车辆类型、变速箱类型组合展示",
      "l3": "10.8",
      "l4": "宝马",
      "l5": "0.5万公里",
      "l6": "2021年3月23日",
      "cover": "https://www.nissanusa.com/content/dam/Nissan/us/vehicles/gtr/2021/overview/2021-nissan-gtr-awd-sports-car.jpg" //封面图
    }
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
    // 生成海报
    savePoster() {
      // 生成图片
      wx.showLoading({
        title: '海报生成中...'
      });
      setTimeout(this.drawCanvas, 500)
    },
    // 绘制canvas
    drawCanvas() {
      const _this = this;

      const {
        // avatarUrl,
        canvasWidth,
        canvasHeight,
        // ma_img,
        // user,
        // hImg,
        // book_list
        car_detail
      } = this.data;
      const ctx = wx.createCanvasContext('canvas');
      const canvas_width = canvasWidth;
      const canvas_height = canvasHeight;
      // 背景色
      ctx.setFillStyle('#ffffff');
      ctx.fillRect(0, 0, canvasWidth, canvasHeight);

      // 绘制头图
      ctx.drawImage(car_detail.cover, 0, 82, canvasWidth, 502);

      // // 绘制头像
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


      // 绘制大标题
      ctx.setFontSize(34);
      ctx.setFillStyle("#fff");
      const headText = car_detail.l1;
      ctx.fillText(headText, (canvasWidth - ctx.measureText(headText).width) / 2, 620);

      // 绘制报价
      ctx.setFontSize(56);
      ctx.setFillStyle("#EC5846");

      const offer = car_detail.l3
      ctx.fillText(offer, 32, 820);
      // 底部背景色

      // // 书籍列表
      // const bookListStartY = headerHeight;
      // /*循环绘制每一本书籍*/
      // for (let i = 0; i < book_list.length; i++) {
      //   const book = book_list[i];
      //   drawBook(book, i, book_list.length - 1 === i);
      // }


      // ctx.setFillStyle('#eeeeee');
      // ctx.fillRect(0, canvasHeight - bottomHeight, canvasWidth, bottomHeight);

      // 底部二维码
      ctx.save(); // 先保存状态 已便于画完圆再用
      ctx.beginPath(); //开始绘制

      const maWidth = 219; // 二维码宽度
      const maArcWidth = 230; // 二维码外层宽度
      const maCenterY = 847 + maWidth / 2; // 图片中心Y坐标
      ctx.arc(491, maCenterY, maArcWidth / 2, 0, Math.PI * 2, false);
      ctx.fill();
      ctx.clip();
      // 二维码白色底色
      ctx.setFillStyle('#ffffff')
      ctx.fillRect((canvasWidth - maArcWidth) / 2, maCenterY - maArcWidth / 2, maArcWidth, maArcWidth)
      ctx.drawImage(qr_img, 491, 847, maWidth, maWidth);
      ctx.restore(); //恢复之前保存的绘图上下文 恢复之前保存的绘图上下文即状态 可以继续绘制


      // 底部文字
      ctx.setFontSize(28);
      ctx.setFillStyle("#333333");

      const footerText1 = '【汽车品牌】';
      const footerText2 = '  私人定律  ';
      const footerText3 = '参与测评';
      const footerLine1 = footerText1 + footerText2 + footerText3;
      const footerText4 = '寻找适合你的古典音乐';
      const line1StartX = (canvasWidth - ctx.measureText(footerLine1).width) / 2;
      const footerText2StartX = line1StartX + ctx.measureText(footerText1).width;
      const footerText3StartX = line1StartX + ctx.measureText(footerText1 + footerText2).width;

      const footerLine1Y = canvasHeight - 60;
      const footerLine2Y = canvasHeight - 30;


      ctx.fillText(footerText1, line1StartX, footerLine1Y);
      ctx.fillText(footerText3, footerText3StartX, footerLine1Y);
      ctx.fillText(footerText4, (canvasWidth - ctx.measureText(footerText4).width) / 2, footerLine2Y);
      ctx.setFillStyle("#D02D2B");
      ctx.fillText(footerText2, footerText2StartX, footerLine1Y);



      function drawBook(item, i, isLast) {
        const bookStartY = bookListStartY + i * bookHeight + 20; // 当前图书起始Y坐标 顶部留空20px
        const bookEndY = bookListStartY + (i + 1) * bookHeight; // 当前图书结束Y坐标
        //绘制左图
        const imgX = 26; // 图片X起点
        const imgY = bookStartY; // 图片Y起点
        const imgWidth = 160; // 图片左侧起始
        const imgHeight = 220; // 图片左侧起始


        // 如果封面已加载到本地
        if (localImgInfo[item.cover]) {
          ctx.drawImage(localImgInfo[item.cover], imgX, imgY, imgWidth, imgHeight)
        } else {
          ctx.setFillStyle('#f7f7f7');
          ctx.fillRect(imgX, imgY, imgWidth, imgHeight);
        }

        let titleX = 200; // 文字x起点坐标
        const RIGHT_MAX_WIDTH = canvas_width - titleX - imgX; // 右侧文本最大宽度 =  canvas总宽度 - 左侧img宽度 - 右侧留白
        // 绘制书名
        ctx.setFontSize(28);
        ctx.setFillStyle("#000000");
        let bookTitle = item.name || ''; // 书名
        let titleLineHeight = 36;

        let titleY = bookStartY + titleLineHeight + 10;
        const titleRowNum = drawText(bookTitle, titleX, titleY, titleLineHeight, RIGHT_MAX_WIDTH);

        // 绘制书籍副标题
        const subTitleStartY = titleRowNum * titleLineHeight + bookStartY + 26; // 副标题起始Y

        let smallTextStartY = subTitleStartY;

        let subTitle = item.sub_name || '';
        if (subTitle) {
          ctx.setFontSize(24);
          ctx.setFillStyle("#5D5953");


          let subTitleLineHeight = 30;
          let subTitleY = subTitleStartY + subTitleLineHeight;
          const subTitleRowNum = drawText(subTitle, titleX, subTitleY, subTitleLineHeight, RIGHT_MAX_WIDTH);
          smallTextStartY = smallTextStartY + subTitleLineHeight * subTitleRowNum + 16;
        }



        // 小文字行高一致 大小颜色一致
        const smallTextLineHeight = 28;
        ctx.setFontSize(20);
        ctx.setFillStyle("#8D9199");


        // 作者
        let author = '作者：' + (item.author || '');
        const authorY = smallTextStartY + smallTextLineHeight;
        drawText(author, titleX, authorY, smallTextLineHeight, RIGHT_MAX_WIDTH);
        let translatorY = authorY + smallTextLineHeight;
        let publisherY = translatorY;
        if (item.translator) {
          // 译者
          let translator = '译者：' + item.translator;
          drawText(translator, titleX, translatorY, smallTextLineHeight, RIGHT_MAX_WIDTH);

          publisherY = translatorY + smallTextLineHeight;
        }


        // 绘制出版社
        let publisher = item.publisher || '';
        drawText(publisher, titleX, publisherY, smallTextLineHeight, RIGHT_MAX_WIDTH);






        // 最后一个底部没有分割线
        if (!isLast) {
          //分割线
          ctx.setStrokeStyle('#c1c1c1');
          ctx.beginPath();
          // ctx.setLineWidth(0.6);
          // ctx.setLineDash([4, 2]);
          ctx.setLineDash([6, 2]);

          // ctx.lineDashOffset = 0.4; // 虚线偏移量，初始值为0

          ctx.moveTo(imgX, bookEndY);
          ctx.lineTo(canvasWidth - imgX, bookEndY);
          // context.lineTo(265, 209 + c)
          ctx.stroke();
        }

      }

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
      function drawText(text, startX, startY, lineHeight, MAX_WIDTH) {
        let allAtr = text.split('');
        let rowArr = []; // 拆分出来的每一行
        let rowStrArr = []; // 每一行的文字数组
        for (let i = 0; i < allAtr.length; i++) {
          const currentStr = allAtr[i];
          rowStrArr.push(currentStr);
          const rowStr = rowStrArr.join('');
          if (ctx.measureText(rowStr).width > MAX_WIDTH) {
            rowStrArr.pop(); // 删除最后一个
            rowArr.push(rowStrArr.join('')); // 完成一行
            rowStrArr = [currentStr];
            continue;
          }
          // 最后一个字母 直接添加到一行
          if (i === allAtr.length - 1) {
            rowArr.push(rowStr); // 完成一行
          }
        }

        for (let i = 0; i < rowArr.length; i++) {
          ctx.fillText(rowArr[i], startX, startY + i * lineHeight);
        }
        return rowArr.length;
      }

      // 绘制图片
      ctx.draw(false, function () {
        // 延时生成图片 否则真机测试文字会样式混乱
        setTimeout(() => {
          // 生成图片
          wx.canvasToTempFilePath({
            canvasId: 'canvas',
            success: res => {
              wx.hideLoading();
              _this.createShareImgSuccess(res.tempFilePath);
            },
            fail: () => {
              wx.showToast({
                title: '图片生成失败~',
                icon: 'none'
              });
            }
          })
        }, 300)

      })
    },
  }
})