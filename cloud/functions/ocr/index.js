// 云函数入口文件
const cloud = require('wx-server-sdk')
// "image-node-sdk": "^1.0.7"

cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {

  console.log(event)
  const wxContext = cloud.getWXContext()

  return {
    event,
    openid: wxContext.OPENID,
    appid: wxContext.APPID,
    unionid: wxContext.UNIONID,
    data: {
      mame: '康',
      phone: '13000000000',
      qq: '153252148',
      company: '光电信号有限公司'
    }
  }
}