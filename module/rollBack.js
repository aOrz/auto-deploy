const shelljs = require('shelljs'),
  config = require('../config/config.js');

function getRollBackTag() {
  let out = shelljs.exec('git log --tags --decorate --simplify-by-decoration --pretty="format:%tag"');
  // out = shelljs.exec(`git log --format="%h" ${out.stdout} |grep n1`);
  if (out.code == 0) {
    let ret = '<br>';
    let arr = out.stdout.split('\n');
    for (var i = arr.length - 1; i >= 0; i--) {
      ret += `${config.host}:${config.port}/roll_back/${arr[i] }<br/>`;
    }
    return ret;
  } else {
    return 'error';
  }
}

function rollBack(tag) {
  let out = shelljs.exec(`get reset --hard ${tag} `);
  return out.stdout;
}

module.exports = {
  rollBack: rollBack,
  getRollBackTag: getRollBackTag
};
