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