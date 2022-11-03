#!/usr/bin/env node
const program = require('commander')
const translate = require('../script/main.js')
// const init = require("../lib/init");

program
  .command('translate <path>')
  .description('translate a vue file or js file')
  .action((path) => {
    // console.log(path)
    translate(path)
  })
  
// 解析命令行参数
program.parse(process.argv)
