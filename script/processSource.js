function splitStr(str) {
  let endIndex = 0
  let templateStr = ''
  let scriptStr = ''
  let length = str.length
  str.replace(/\<\/template\>/, function (word, index, str) {
    let temp = str
    endIndex = index + 11
    templateStr = str.slice(0, endIndex)
    return word
  })
  scriptStr = str.slice(endIndex + 1, length)
  let obj = {
    templateStr,
    scriptStr
  }
  // console.log(obj)
  return obj
}


function _help(str) {
  const rules = [
    [/\slabel/g, ' :label'],
    [/\splaceholder/g, ' :placeholder'],
  ]
  let index = 0;
  while (index < rules.length) {
    if (rules[index][0].test(str)) {
      str = str.replace(...rules[index]);
    }
    index++;
  }
  return str
}

function processTemplate(templateStr, words) {
  // "需要匹配“ -> "$t('key')"
  // 需要匹配 -> {{$t('key')}}
  let tindexs = [] // 需要补充冒号的地方
  let str = templateStr.replace(/[\u4e00-\u9fa5]+/g, function (word, index, str) {
    // console.log(arguments)
    words.push(word)
    let beforeStr = str[index - 1]
    if (beforeStr && beforeStr == '\'' || beforeStr == '\"') {
      return `$t(\'${word}\')`
    } else {
      return `{{$t(\'${word}\')}}`
    }
  })
  str = _help(str)
  return str
}

function processScript(scriptStr, list) {
  // 跳过注释
  // if(scriptStr.test())
  // 需要匹配 -> this.$t('key')
  let str = scriptStr.replace(/\'?\"?[\u4e00-\u9fa5]+\'?\"?/g, function (word, index, str) {
    word = word.slice(1, word.length - 1)
    // word = word.slice(0,word.length-2)
    list.push(word)
    return `this.$t(\'${word}\')`
  })
  return str
}

module.exports = async function processSource(code = '') {
  let list = [] //处理过的词

  // 划分 template 和 script
  let { templateStr, scriptStr } = splitStr(code)

  // 处理template
  let str = processTemplate(templateStr, list)

  // 处理 script
  str += processScript(scriptStr, list)

  // console.log(str)
  return {
    str,
    list
  }
}
