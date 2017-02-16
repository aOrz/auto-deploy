var mail = require('./sendMail.js');
var weixin = require('./sendWeixin.js');

module.exports = function (body, error) {
  mail(body, error);
  weixin(body, error);
}