const config = require('../config/config.js'),
  fs = require('fs'),
  path = require('path'),
  shelljs = require('shelljs'),
  message = require('./sendMessage.js');

function pull(moduleName) {
  let modulePath = path.resolve(config.root, moduleName);
  shelljs.cd(modulePath);
  let out = shelljs.exec('git pull');
  if (out.code == 0) {
    message(out.stdout, out.code);
  } else {
    message(out.stderr, out.code);
  }
}

function clone(moduleName) {
  let rootPath = path.resolve(config.root);
  shelljs.cd(rootPath);
  let out = shelljs.exec(`git clone git@github.com:${config.user}/${moduleName}`);
  if (out.code == 0) {
    message(out.stdout);
  } else {
    message(out.stderr);
  }
}

module.exports = function(moduleName) {
  let ret = 'ok';
  if (!shelljs.which('git')) {
    ret = 'Sorry, this script requires git';
  }
  console.log(config.root, moduleName);
  let modulePath = path.resolve(config.root, moduleName);
  let exists = fs.existsSync(modulePath);
  if (exists) {
    pull(moduleName);
  } else {
    clone(moduleName);
  }

  return ret;
};
