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
 * 筛选分类 获取所有参数
 */
export function getScreenCategory() {
  return request({
    url: '/mallcar/Index/get_all_param',
    method: 'get',
  })
}

/**
 * 二维码生成接口
 * @param {string} type 1:团队车源，2:个人车源，3:商品详情，4:帮卖商品详情
 * @param {string} sq_jinzhu_id 商品的金主id type = 4 帮卖用户id
 * @param {string} goods_id require 商品id
 * @param {string} share_user_id 分享用户id，分享的时候加
 */
export function getQRcode(data) {
  return request({
    url: '/mallcar/User/qr_code',
    method: 'get',
    data
  })
}

/**
 * 商品详情阅读时长
 * @param {int} goods_id require 商品ID
 * @param {int} page_id require 阅读记录id，商品详情接口获取
 * @param {int} time require 停留时长 秒
 */
export function recordReadTime(data) {
  return request({
    url: '/mallcar/User/record_view_time',
    method: 'get',
    data
  })
}