# 作用
这是一个小工具且不完善，减轻手动修改的工作量。
用命令行将文件中的中文转换为$t('中文')的vue-i18n写法，并生输出被转换词的json到终端。

##转换目标

template
- [x] 中文 -> {{$t('中文')}}
- [x] lable = "中文" -> :lable = "$t('中文')"
- [x] lable = '中文' -> :lable = "$t('中文')"
- [ ] 跳过单行注释
- [ ] 跳过多行注释


script
- [x] '中文' -> this.$t('中文')
- [x] "中文" -> this.$t('中文')
- [ ] 跳过单行注释
- [ ] 跳过多行注释

# 安装
npm i @mandk/i18n-help -g
# 使用
 ## translate命令
 mandk translate src/app/views/xxx.vue
终端会打印替换过的词json，方便复制到语言文件中使用

# 本地开发优化此工具
* 下载项目包
* npm i
* npm run test
* 修改文件功能，编写新的测试用例

# 测试工具文档
[mochajs](https://mochajs.org/#getting-started)

# 发布
npm publish --access public