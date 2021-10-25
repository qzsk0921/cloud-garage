import request from '../utils/request'
// 七牛云
/**
 * 获取七牛云token
 */
export function getQnToken(data) {
  return request({
    url: '/usershare/QiNiu/get_up_token',
    method: 'post',
    data
  })
}