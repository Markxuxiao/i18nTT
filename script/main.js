
const replace = require('./replace')
const fs = require('fs')




function translate (path){
  const config = {
    entry:path
  }
  console.log('开始执行转换....',path)
  replace(config).then(() => {
    // fs.readFile(config.entry, 'utf-8', (err, source) => {
    //     if (err) throw err
    //     // console.log(source)
    // })
  })
}

module.exports = translate