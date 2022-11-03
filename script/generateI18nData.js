// const ProgressBar = require('progress')
// 节流函数
const throttle = (function (delay = 1500) {
  const wait = []
  let canCall = true
  return function throttle(callback) {
    if (!canCall) {
      if (callback) wait.push(callback)
      return
    }

    callback()
    canCall = false
    setTimeout(() => {
      canCall = true
      if (wait.length) {
        throttle(wait.shift())
      }
    }, delay)
  }
}(500))

function generateI18nData(words = []) {
  const i18nData = {}
  // 进度条
  // const bar = new ProgressBar('translating [:bar] :percent :etas', { total: messages.length })

  return new Promise(resolve => {
    if (!words.length) resolve(i18nData)
    words.forEach((word, i) => {
      // todo 自动生成key
      // throttle(() => {
        // 翻译
        // todo 使用翻译转换下划线后的key，这里暂时用中文
        const key = word
        i18nData[key] = word
        // 增加进度条
        // bar.tick()
    
          
        
      // })
    })
    resolve(JSON.stringify(i18nData) )
  })
}

module.exports = generateI18nData