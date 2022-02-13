/**
 * 
 * 获取：this.$store.getters.userinfo
 * this.$store.state.window.winBox;
 * 更新：this.$store.dispatch('userInfo/updateUserInfo',userinfo)
 * 
 */

import Vue from 'vue'
import Vuex from 'vuex'
import VueCookies from 'vue-cookies'
import getters from './getters'
Vue.use(Vuex)

const modulesFiles = require.context('./modules', true, /\.js$/)
const modules = modulesFiles.keys().reduce((modules, modulePath) => {
  const moduleName = modulePath.replace(/^\.\/(.*)\.\w+$/, '$1')
  const value = modulesFiles(modulePath)
  modules[moduleName] = value.default
  return modules
}, {})

const store = new Vuex.Store({
  modules,
  getters
})

VueCookies.config('30d')// 默认一个月有效期
const cookie = {
  get (key) {
    return VueCookies.get(key)
  },
  set (key, value) {
    return VueCookies.set(key, value)
  },
  /**
   * 
   * @param {*} key 
   * @param {*} value 
   * @param {*} expires : -1 永不删除，60 一分钟，10s 10秒钟，new Date(2019,9,13).toUTCString() 2019年10月13日删除
   * @returns 
   */
  setExpires (key, value, expires) {
    return VueCookies.set(key, value, expires)
  },
  remove (key) {
    return VueCookies.remove(key)
  },
  hasKey (key) {
    return VueCookies.isKey(key)
  }
}

export { store, cookie }
