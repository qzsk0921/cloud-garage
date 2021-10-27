import request from '../utils/request'

/**
 * 帮卖开通
 * @return {string} timeStamp 1624953411
 * @return {string} nonceStr JK5qQVLl2mCG4BDEaRbnwcX3I9t1iTM8
 * @return {string} prepay_id wx291556498909613c500dedd5f3dad10000
 * @return {string} paySign A82AF1F73D9725FB06BDA6AD1108D05D
 * @return {string} signType MD5
 * @return {string} order_id 10
 */
export function openActivation() {
  return request({
    url: '/mallcar/order/open',
    method: 'post'
  })
}

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

/**
 * 品牌选择
 * @param {string} keyword 搜索关键词
 */
export function getBrandList(data) {
  return request({
    url: '/mallcar/Index/get_brand_list',
    method: 'get',
    data
  })
}

/**
 * 热门品牌
 */
export function getHotBrandList() {
  return request({
    url: '/mallcar/Index/get_hot_brand',
    method: 'get',
  })
}

/**
 * 筛选分类
 */
export function getScreenCategory() {
  return request({
    url: '/mallcar/Index/get_category',
    method: 'get',
  })
}