const assert = require('assert');
const fs = require('fs');
const vm = require('vm');
const path = require('path');
let calls = [];
let gitAvailable = true;
const moduleObject = { exports: {} };
vm.runInNewContext(fs.readFileSync(path.join(__dirname, '../module/deploy.js'), 'utf8'), {
  module: moduleObject,
  require: name => {
    if (name === '../config/config.js') return { root: '/tmp/projects', user: 'example' };
    if (name === 'path') return path;
    if (name === 'fs') return { existsSync: () => false };
    if (name === './sendMessage.js') return () => {};
    if (name === 'shelljs') return {
      which: () => gitAvailable,
      cd: value => calls.push(['cd', value]),
      exec: command => { calls.push(['exec', command]); return { code: 0, stdout: '' }; }
    };
    throw new Error(name);
  }
});
const deploy = moduleObject.exports;
for (const name of ['../escape', '.', '..', 'repo;touch bad', 'repo$(id)', 'repo\nwhoami', 'a/b', '', null]) {
  assert.strictEqual(deploy({ body: { repository: { name } } }), 'Invalid repository name');
  assert.deepStrictEqual(calls, []);
}
assert.strictEqual(deploy({ body: { payload: '{bad' } }), 'Invalid webhook payload');
assert.strictEqual(deploy({}), 'Invalid repository name');
assert.deepStrictEqual(calls, []);
for (const body of [{ repository: { name: 'test_repo-1.0' } }, { payload: JSON.stringify({ repository: { name: 'test_repo-1.0' } }) }]) {
  calls = [];
  assert.strictEqual(deploy({ body }), 'ok');
  assert.deepStrictEqual(calls, [['cd', '/tmp/projects'], ['exec', 'git clone git@github.com:example/test_repo-1.0']]);
}
calls = [];
gitAvailable = false;
assert.strictEqual(deploy({ body: { repository: { name: 'test' } } }), 'Sorry, this script requires git');
assert.deepStrictEqual(calls, []);
console.log('webhook validation regression tests passed');
