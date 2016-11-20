const config = require('../config/config.js'),
  fs = require('fs'),
  path = require('path'),
  shelljs = require('shelljs'),
  mail = require('./sendMail.js');

  function pull(moduleName) {
    let modulePath = path.resolve(config.root,moduleName);
    shelljs.cd(modulePath);
    let out = shelljs.exec('git pull');
    if (out.code == 0 ) {
      mail(out.stdout,error);
    }else{
      mail(out.stderr,error);
    }
  }

  function clone(moduleName) {
    let rootPath = path.resolve(config.root);
    shelljs.cd(rootPath);
    let out = shelljs.exec(`git clone git@github.com:${config.user}/${moduleName}`);
    if (out.code == 0 ) {
      mail(out.stdout);
    }else{
      mail(out.stderr);
    }
  }

module.exports = function (moduleName) {
  let ret = 'ok';
    if (!shelljs.which('git')) {
    ret = 'Sorry, this script requires git';
  }
  console.log(config.root,moduleName)
  let modulePath = path.resolve(config.root,moduleName);
  let exists = fs.existsSync(modulePath);
  if (exists) {
    pull(moduleName);
  } else {
    clone(moduleName);
  }

  return ret;
}