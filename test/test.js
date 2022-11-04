var assert = require('assert');
const processSource = require('../script/processSource.js')
const fs = require('fs')

describe('测试文件输出', function () {
  describe('#processSource', async function () {
                 
    it('转换结果与预期.back文件一致', async function () {
      // this.timeout(10000);
      let vueFile = fs.readFileSync('src/test.vue', 'utf-8');
      // console.log(vueFile)
      let testCode = fs.readFileSync('src/test.vue.back', 'utf-8');
      // console.log(testCode)
      let data = await processSource(vueFile)
      
      assert.equal(data.str , testCode);


    });
  });
});