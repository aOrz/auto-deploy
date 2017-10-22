var http = require('http');

var qs = require('querystring');
var config = require('../config/config.js');

const Imis = require('imis-server-sdk');
const imis = new Imis(config.serverChan.sckey, 'auto-deploy');

module.exports = function(body, error) {
  var data = {
    text: config.serverChan.subject + (error ? '--失败' : ''),
    desp: body,
  }; //这是需要提交的数据

  imis.send({
    logs: body,
    notice: 0,
    title: data.text,
  });
  var content = qs.stringify(data);
  var options = {
    hostname: 'sc.ftqq.com',
    // port: 80,
    path: '/' + config.serverChan.sckey + '.send?' + content,
    method: 'GET',
  };

  var req = http.request(options, function(res) {
    console.log('STATUS: ' + res.statusCode);
    console.log('HEADERS: ' + JSON.stringify(res.headers));
    res.setEncoding('utf8');
    res.on('data', function(chunk) {
      console.log('BODY: ' + chunk);
    });
  });

  req.on('error', function(e) {
    console.log('problem with request: ' + e.message);
  });

  req.end();
};
