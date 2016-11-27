const shelljs = require('shelljs');

function getRollBackTag() {
  let out = shelljs.exec('git tag -n --sort=-taggerdate | grep n1 ');
  out = shelljs.exec(`git log --format="%h" ${out.stdout} |grep n1`);
  if (out.code == 0) {
    return out.stdout;
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
