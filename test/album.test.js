// mocha单元测试
// assert 简单的断言测试功能
// 如果是true则测试通过，如果是false则测试不通过
const assert = require('assert')
const axios = require('axios')
// 主机名
const host = global.host || 'http://localhost:3000'

describe('测试获取歌手专辑列表是否正常', () => {
  it('数据的 code 应该为200', (done) => {
    const qs = {
      id: 32311,
    }
    // 请求 /album 请求内容
    axios
      .get(`${host}/album`, {
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
