import request from '../utils/request'

/**
 * 帮卖开通记录
 */
export function getActivationRecoord(data) {
  return request({
    url: '/mallcar/order/open_log',
    method: 'get',
    data
  })
}