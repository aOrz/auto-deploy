module.exports = {
  port: 3000,//端口号
  host: '120.77.32.127',
  root: '../', //部署路径相对于部署程序的路径
  user: '4013465w',//github 用户名，暂时仅支持 github
  mail:{
    from:'503241187@qq.com',//邮件发送邮箱
    pwd : '',//发送邮箱密码
    smtp : 'smtp.qq.com',//邮件服务器
    subject: '上线通知',//邮件主题
    to: '503241187@qq.com' //部署邮件接收邮箱
  },
  url:'git@github.com'
}