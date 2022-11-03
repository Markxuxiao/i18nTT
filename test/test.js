var assert = require('assert');
const processSource = require('../script/processSource.js')
const fs = require('fs')

describe('测试文件输出', function () {
  describe('#processSource', function () {
    it('转换结果与预期.back文件一致', function () {
      fs.readFile('src/test.vue', 'utf-8', (err, source) => {
        processSource(source).then(data => {
          fs.readFile('src/test.vue.back', 'utf-8', (err, source) => {
            assert.equal(data.str , source);
          })
        })
      })
    });
  });
});