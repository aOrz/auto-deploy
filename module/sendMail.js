var nodemailer = require('nodemailer');

// create reusable transporter object using the default SMTP transport
var transporter = nodemailer.createTransport('smtps://503241187@qq.com:pwd@smtp.qq.com');

// setup e-mail data with unicode symbols
module.exports = function (body, error) {
  var mailOptions = {
    from: '"自动部署" <503241187@qq.com>', // sender address
    to: '503241187@qq.com', // list of receivers
    subject: '上线通知 ' + (error ? "--失败" :''), // Subject line
    text: body, // plaintext body
    html: body // html body
};

// send mail with defined transport object
transporter.sendMail(mailOptions, function(error, info){
    if(error){
        return console.log(error);
    }
    console.log('Message sent: ' + info.response);
});
}