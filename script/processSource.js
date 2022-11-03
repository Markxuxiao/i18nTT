
function processTemplate(templateStr,list){
  // "需要匹配“ -> "$t('key')"
  // 需要匹配 -> {{$t('key')}}
  let str = templateStr.replace(/[\u4e00-\u9fa5]+/g,function(word,index,str){
    // console.log(arguments)
    list.push(word)
    if(str[index-1] && str[index-1] == '\''){
      return `$t('${word}')`
    }else{
      return `{{$t('${word}')}}`
    }
  })
  return str
}

function processScript(scriptStr,list){
    // 跳过注释
    // if(scriptStr.test())
    // 需要匹配 -> this.$t('key')
    let str = scriptStr.replace(/[\u4e00-\u9fa5]+/g,function(word){
      list.push(word)
      return `this.$t('${word}')`
    })
    return str
}

module.exports = async function processSource(code = '') {
  
  let templateStr = code
  let scriptStr = ''
  let list = [] //处理过的词
  // 划分 template 和 script
  // console.log('code',code.length)
  // templateStr = code.match(/\<template.*?template\>/g)[0]
  // console.log('temp',templateStr)
  // 处理template
  // "需要匹配“ -> "$t('key')"
  // 需要匹配 -> {{$t('key')}}
  let str = processTemplate(templateStr,list)
  // 处理 script


  // 合并 处理结果




  // let str = templateStr + scriptStr
  return {
    str,
    list
  }
}
