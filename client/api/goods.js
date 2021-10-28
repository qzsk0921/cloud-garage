// https://www.showdoc.com.cn/1503621351863792/7856518217865010
import request from '../utils/request'

/**
 * 商品列表
 * @param {string} keyword 搜索关键词
 * @param {string} city city code 地图接口的citycode
 * @param {string} province province code 地图接口的provincecode
 * @param {string} sort_type 排序方式 1:价格低到高2:价格高到低3:最新发布4:车龄最短5：里程最短 
 * @param {string} start_price 价格开始
 * @param {string} end_price 价格结束
 * @param {string} start_kilometers 里程开始
 * @param {string} end_kilometers 里程结束
 * @param {string} start_licensing_time 上牌时间开始 2011 比如2年就是2021-2=2019 传2019
 */
export function getGoodsList(data) {
  return request({
    url: '/mallcar/Index/goods_list',
    method: 'get',
    data
  })
}

/**
 * 商品详情
 * @param {string} goods_id 商品详情
 * @param {string} sale_id 帮卖金主id
 */
export function getGoodDetail(data) {
  return request({
    url: '/mallcar/Index/get_goods_info',
    method: 'get',
    data
  })
}

/**
 * 商品纠错
 * @param {string} content require 错误内容
 * @param {string} goods_id require 商品id
 * @param {string} images require 图片逗号分隔
 */
export function submitGoodError(data) {
  return request({
    url: '/mallcar/User/report_car_error',
    method: 'get',
    data
  })
}

/**
 * 商品浏览记录列表
 * @param {*} data page page_sise
 */
export function getViewRecord(data) {
  return request({
    url: '/mallcar/User/record_view_log',
    method: 'get',
    data
  })
}

/**
 * 我的商品列表
 */
export function getMyResource(data) {
  return request({
    url: '/mallcar/User/my_goods_list',
    method: 'get',
    data
  })
}

/**
 * 我的团队商品列表
 */
export function getTeamResource(data) {
  return request({
    url: '/mallcar/User/team_goods_list',
    method: 'get',
    data
  })
}

/**
 * 我的帮买商品列表
 */
export function getHelpResource(data) {
  return request({
    url: '/mallcar/User/sale_goods_list',
    method: 'get',
    data
  })
}

/**
 * 团队(别人团队)车源
 * @param {string} keyword 关键词
 * @param {string} sq_jinzhu_id 金主id
 */
export function getOtherTeamResource(data) {
  return request({
    url: '/mallcar/Index/team_good_list',
    method: 'get',
    data
  })
}

/**
 * 他人（市场）的车源
 * @param {string} keyword 关键词
 * @param {string} sq_jinzhu_id 金主id
 */
export function getMarketResource(data) {
  return request({
    url: '/mallcar/Index/other_goods_list',
    method: 'get',
    data
  })
}

/**
 * 商品详情页更多推荐 5条
 */
export function getRecommendList() {
  return request({
    url: '/mallcar/Index/rand_goods',
    method: 'get',
  })
}

/**
 * 添加帮买商品
 * @param {int} goods_id require 商品ID
 * @param {string} phone require 手机号
 */
export function addSaleGoods(data) {
  return request({
    url: '/mallcar/User/add_sale_goods',
    method: 'get',
    data
  })
}

/**
 * 取消帮买商品
 * @param {int} goods_id require 商品ID
 */
export function cancelSaleGoods(data) {
  return request({
    url: '/mallcar/User/cancel_sale_goods',
    method: 'get',
    data
  })
}