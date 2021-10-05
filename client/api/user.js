import request from '../utils/request'

// 用户授权
/**
 * 登录接口
 * @param {string} code require 小程序code
 * @returns {string} token 
 */
export function login(data) {
  return request({
    url: '/usershare/login/login',
    method: 'post',
    data
  })
}

// 用户信息相关
/**
 * 用户详情
 */
export function getUserDetail() {
  return request({
    url: '/usershare/user/user_info',
    method: 'get'
  })
}