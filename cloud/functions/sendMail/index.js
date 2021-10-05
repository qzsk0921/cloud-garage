const cloud = require('wx-server-sdk')
console.log(cloud)
// 引入发送邮件的类库
const nodemailer = require("nodemailer");
// 创建一个smtp客户端配置
const config = {
  host: 'smtp.qq.com', //SMTP服务器地址 网易163邮箱 stmp.163.com
  port: 465,  //端口号，通常为465，587，25，不同的邮件客户端端口号可能不一样 网易邮箱端口25
  secure: true, //如果端口是465，就为true;如果是587、25，就填false
  auth: {
    user: '153252148@qq.com', //邮箱账号
    pass: 'lfpksldwlhysbhbg' //邮箱密码，QQ的需要是独立授权码，不是QQ邮箱的密码
  }
}
// 创建一个smtp客户端对象
const transporter = nodemailer.createTransport(config)
// cloud.init({
//   env: cloud.DYNAMIC_CURRENT_ENV,
// })
cloud.init()
exports.main = async (event, context) => {
  console.log(event)
  console.log('哈哈哈哈call cf sendMail')
  // 创建一个邮件对象
  const mail = {
    // from: event.from, //发件邮箱 '来自小石头 <1587072557@qq.com>'
    // to:event.to, //收件人
    // subject: event.subject, //主题 '来自小石头的问候'
    // text: event.text, //邮件内容，text或者html格式
    // html: event.html //'你好啊，编程小石头' //可以是链接，也可以是验证码
    from: '来自evan you<153252148@qq.com>', //发件邮箱 '来自小石头 <1587072557@qq.com>'
    to: '243732778@qq.com', //收件人
    subject: '来自星辰追梦的问候', //主题 '来自小石头的问候'
    text: 'text', //邮件内容，text或者html格式
    html:  'Hi,早上好' //'你好啊，编程小石头' //可以是链接，也可以是验证码
  };

  const res = await transporter.sendMail(mail);
  return res;
}