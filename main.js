// 读取文件夹module中的js文件
const fs = require('fs')
const path = require('path')
const request = require('./util/request')
const { cookieToJson } = require('./util/index')

let obj = {}
// 异步地读取文件的全部内容。
// path.join将所有给定的 path 片段连接到一起（使用平台特定的分隔符作为定界符），然后规范化生成的路径。
//  module文件
fs.readdirSync(path.join(__dirname, 'module'))
  // 颠倒数组顺序 不增加数组名字
  .reverse()
  // 遍历
  .forEach((file) => {
    // 必须是以js结尾的文件才能遍历
    if (!file.endsWith('.js')) return
    // __dirname 总是指向被执行 js 文件的绝对路径
    let fileModule = require(path.join(__dirname, 'module', file))
    //shift() 把数组的第一个元素从其中删除，并返回第一个元素的值。
    obj[file.split('.').shift()] = function (data) {
      // cookie 是否为string类型 是 则转换为 JSON
      if (typeof data.cookie === 'string') {
        data.cookie = cookieToJson(data.cookie)
      }
      // 文件模块
      return fileModule(
        // 数据 cookie
        {
          ...data,
          cookie: data.cookie ? data.cookie : {},
        },
        // 代理请求
        request,
      )
    }
  })

module.exports = obj
