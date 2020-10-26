// 记忆缓存
function MemoryCache() {
  this.cache = {}
  this.size = 0
}

// 添加新的缓存
MemoryCache.prototype.add = function (key, value, time, timeoutCallback) {
  // 当前缓存 和 this实例
  var old = this.cache[key]
  var instance = this

  // 入口
  var entry = {
    value: value,
    expire: time + Date.now(),
    timeout: setTimeout(function () {
      instance.delete(key)
      return (
        timeoutCallback &&
        typeof timeoutCallback === 'function' &&
        timeoutCallback(value, key)
      )
    }, time),
  }

  this.cache[key] = entry
  this.size = Object.keys(this.cache).length

  return entry
}

// 删除缓存
MemoryCache.prototype.delete = function (key) {
  var entry = this.cache[key]
  // 入口存在 则取消定时方法执行
  if (entry) {
    clearTimeout(entry.timeout)
  }

  delete this.cache[key]

  this.size = Object.keys(this.cache).length

  return null
}

// 获取缓存
MemoryCache.prototype.get = function (key) {
  var entry = this.cache[key]

  return entry
}

// 获取缓存值
MemoryCache.prototype.getValue = function (key) {
  var entry = this.get(key)

  return entry && entry.value
}

// 清空所有缓存
MemoryCache.prototype.clear = function () {
  Object.keys(this.cache).forEach(function (key) {
    this.delete(key)
  }, this)

  return true
}

module.exports = MemoryCache
