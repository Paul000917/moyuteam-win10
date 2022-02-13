import Cookies from 'vue-cookie'

const TokenKey = window.global.tokenKey||'GCTOKEN';

export function getTokenKey() {
  return TokenKey
}

export function getToken() {
  const token = Cookies.get(TokenKey)
  return token == null ? sessionStorage.getItem(TokenKey) : token
}

export function setToken(token) {
  sessionStorage.setItem(TokenKey, token)
  return Cookies.set(TokenKey, token)
}

export function removeToken() {
  sessionStorage.removeItem(TokenKey)
  return Cookies.delete(TokenKey)
}
