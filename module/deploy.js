const config = require('../config/config.js'),
  fs = require('fs'),
  path = require('path'),
  shelljs = require('shelljs');

  function pull(moduleName) {
    let modulePath = path.resolve(config.root,moduleName);
    shelljs.cd(modulePath);
    shelljs.exec('git pull');
  }

  function clone(moduleName) {
    let rootPath = path.resolve(config.root);
    shelljs.cd(rootPath);
    shelljs.exec(`git clone git@github.com:${config.user}/${moduleName}`);
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