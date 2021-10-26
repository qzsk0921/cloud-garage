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