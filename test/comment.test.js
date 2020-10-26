// mocha单元测试
const assert = require('assert')
const axios = require('axios')
const host = global.host || 'http://localhost:3000'

// NodeJs测试框架Mocha
// Mocha是运行在nodejs和浏览器下的Javascript的单元测试框架，
// 用于写测试用例的宏，属性或者函数
// describe应该是声明了一个TestSuit(测试集合) ，而且测试集合可以嵌套管理，而it声明定义了一个具体的测试用例。
describe('测试获取评论是否正常', () => {
  it('数据的 code 应该为200', (done) => {
    const qs = {
      id: 32311,
    }

    axios
      .get(`${host}/comment/album`, {
        params: qs,
      })
      .then(({ status, data }) => {
        if (status == 200) {
          assert(data.code === 200)
        }
        done()
      })
      .catch((err) => {
        done(err)
      })
  })
})
