module.exports = {
  port: 9988, //此配置暂时无用，默认 9988
  root: '../', //部署路径相对于部署程序的路径
  user: '4013465w', //github 用户名，暂时仅支持 github
  mail: {
    from: '503241187@qq.com', //邮件发送邮箱
    pwd: '', //发送邮箱密码
    smtp: 'smtp.qq.com', //邮件服务器
    subject: '上线通知', //邮件主题
    to: '503241187@qq.com', //部署邮件接收邮箱
  },
  serverChan: {
    //http://sc.ftqq.com/?c=code
    subject: '上线通知', //主题
    sckey: '',
    imis: '', // imis key(可选)
  },
};
