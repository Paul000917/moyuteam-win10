import axios from 'axios'
import { Message } from 'element-ui'
import { getToken } from '@/utils/auth'

/**
 * 统一进行异常输出
 * 如果异常只是弹框显示即可，可使用该实例
 */
const httpCustom = axios.create({
  timeout: 1000 * 120,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json; charset=utf-8'
  }
})

/**
 * 自定义请求拦截
 */
httpCustom.interceptors.request.use(config => {
  config.headers[window.global.tokenKey||'GCTOKEN'] = getToken() // 请求头带上token
  config.params = {
    _t: Date.parse(new Date()) / 1000,
    ...config.params
  }
  return config
}, error => {
  return Promise.reject(error)
})

/**
 * get请求
 * @param url
 * @param params
 * @returns {Promise<any>}
 */
export function get(url, params = {}) {
  if (!url.startsWith('http')) {
    url = window.global.baseUrl + url
  }
  return new Promise((resolve, reject) => {
    httpCustom.get(url, {
      params: params
    }).then(response => {
      resolve(response)
    }).catch(err => {
      reject(err)
    })
  })
}


/**
 * post 请求
 * @param url
 * @param params
 * @returns {Promise<any>}
 */
export function post(url, data = {}) {
  if (!url.startsWith('http')) {
    url = window.global.baseUrl + url
  }
  data = JSON.stringify(data)
  return new Promise((resolve, reject) => {
    httpCustom.post(url, data).then(response => {
      resolve(response)
    }).catch(err => {
      reject(err)
    })
  })
}

/**
 * delete 请求
 * @param url
 * @param data
 * @returns {Promise<any>}
 */
export function del(url, data = {}) {
  if (!url.startsWith('http')) {
    url = window.global.baseUrl + url
  }
  data = JSON.stringify(data)
  return new Promise((resolve, reject) => {
    httpCustom.delete(url, data).then(response => {
      resolve(response)
    }).catch(err => {
      reject(err)
    })
  })
}

/**
 * put 请求
 * @param url
 * @param data
 * @returns {Promise<any>}
 */
export function put(url, data = {}) {
  if (!url.startsWith('http')) {
    url = window.global.baseUrl + url
  }
  data = JSON.stringify(data)
  return new Promise((resolve, reject) => {
    httpCustom.put(url, data).then(response => {
      resolve(response)
    }).catch(err => {
      reject(err)
    })
  })
}

/**
 * 包装uri地址
 * @param url
 * @returns {*}
 */
export function wrapUrl(url) {
  if (!url.startsWith('http')) {
    url = window.global.baseUrl + url
  }
  return url
}

/**
 * 响应拦截
 */
httpCustom.interceptors.response.use(response => {
  const res = response.data
  return res
}, error => {
  alert(error.message)
  if (error.message && error.message === 'Network Error') {
    Message({
      message: `服务无法访问，请确定当前终端是否能够访问: ${window.global.baseUrl}`,
      type: 'error',
      duration: 5 * 1000
    })
    return Promise.reject(error)
  } else {
    Message({
      message: '接口无法访问',
      type: 'error',
      duration: 5 * 1000
    })
  }
  return Promise.reject(error)
})
