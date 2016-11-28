let nodemailer = require('nodemailer');
let config = require('../config/config.js')
// create reusable transporter object using the default SMTP transport
let transporter = nodemailer.createTransport(`smtps://${config.mail.from}:${config.mail.pwd}@${config.mail.smtp}`);

// setup e-mail data with unicode symbols
module.exports = function (body, error, moduleName) {
  let mailOptions = {
    from: `"自动部署" <${config.mail.from}>`, // sender address
    to: config.mail.to, // list of receivers
    subject: config.mail.subject + '--' + moduleName + (error ? "--失败" :''), // Subject line
    text: body, // plaintext body
    html: body.replace(/ /gi,"&nbsp;").replace(/\n/gi,"<br>") // html body
};

// send mail with defined transport object
transporter.sendMail(mailOptions, function(error, info){
    if(error){
        return console.log(error);
    }
    console.log('Message sent: ' + info.response);
});
}