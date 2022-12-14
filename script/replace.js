
const fs = require('fs')
const processSource = require(`./processSource`)
const generateI18nData = require(`./generateI18nData`)
// const { setDefaultData, isInclude, isExclude } = require(`${process.cwd()}/src/utils`)
const done = [] // 用于标记文件处理情况
let id = -1
let config, exclude, include
// 1、查找文件中的可替换中文，输出成翻译文件，输出收集的中文数组
// 2、生成翻译的json文件

// function readDir(fileName, isRead, resolve) {
//     fs.readdir(fileName, (err, files) => {
//         if (err) throw err
//         // 循环处理目录中的文件
//         files.forEach(file => {
//             const name = `${fileName}/${file}`
//             if (fs.lstatSync(name).isDirectory()) {
//                 if (isExclude(exclude, file)) return
//                 if (isInclude(include, file) || isRead) {
//                     readDir(name, true, resolve)
//                 } else {
//                     readDir(name, false, resolve)
//                 }
//             } else {
//                 if (isExclude(exclude, file)) return
//                 if (isInclude(include, file) || isRead) {
//                     if (/(\.vue)|(\.js)$/.test(name) || (config.extra && config.extra.test(name))) {
//                         readFile(`${fileName}/${file}`, ++id, resolve)
//                     }
//                 }
//             }
//         })
//     })
// }

function readFile(fileName, curID, resolve) {
    done[curID] = false
    fs.readFile(fileName, 'utf-8', (err, source) => {
        if (err) throw err
        // console.log(fileName)
        processSource(source).then(data => {
          // console.log(data)
          // resolve()
            fs.writeFile(fileName, data.str, 'utf-8', err => {
                if (err) throw err
                // done[curID] = true
                // // 处理完最后一个文件后，生成 i18n 数据
                // if (!done.includes(false)) {
                    generateI18nData(data.list).then((json) => {
                        console.log('运行完成！')
                        console.log(json)
                        // fs.writeFile(fileName+'.json', json, 'utf-8', err => {

                        // })
                        resolve()
                    })
                // }
            })
        })
    })
}
module.exports = function replace(i18nConfig) {
  return new Promise(resolve => {
      config = i18nConfig || {}
      exclude = i18nConfig.exclude || []
      include = i18nConfig.include
      entry = config.entry
      if (/(\.vue)|(\.js)|(\.ts)$/.test(entry) || (config.extra && config.extra.test(entry))) {
          readFile(entry, ++id, resolve)
      } else {
          resolve()
      }

      // setDefaultData(config).then(() => {
      //     const entry = path.resolve(process.cwd(), config.entry? config.entry: 'src')
      //     if (fs.lstatSync(entry).isDirectory()) {
      //         readDir(entry, false, resolve)
      //     } else if (/(\.vue)|(\.js)$/.test(entry) || (config.extra && config.extra.test(entry))) {
      //         readFile(entry, ++id, resolve)
      //     } else {
      //         resolve()
      //     }
      // })
  })
}