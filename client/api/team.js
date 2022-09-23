// https://showdoc.xcmbkj.com/web/#/6/124 （二期接口云车发布车源）
import request from '../utils/request'

/**
 * 团队列表 MallCar/MallCar/team_list
 * @param {string} keyword 否 关键词
 */
export function getMyTeamList(data) {
  return request({
    url: '/MallCar/MallCar/team_list',
    method: 'get',
    data,
  })
}

/**
 * 删除团队列表 MallCar/MallCar/del_member
 * @param {string} type 是 1:删除个人需要成员id 2:删除所有成员
 * @param {string} id 否 成员id
 */
export function delTeamMember(data) {
  return request({
    url: '/MallCar/MallCar/del_member',
    method: 'post',
    data,
  })
}

/**
 * 二维码生成接口 mallcar/User/qr_code
 * @param {string} type 否 string	1:团队车源，2:个人车源，3:商品详情，4:帮卖商品详情 5:团队邀请页面
 * @param {string} sq_jinzhu_id 否 商品的金主id type = 4 帮卖用户id
 * @param {string} goods_id 否 商品id
 * @param {string} share_user_id 否 分享用户id，分享的时候加
 * @param {string} team_id 否 团队id
 * @return {string} url 二维码图片
 */
export function getTeamQR(data) {
  return request({
    url: '/mallcar/User/qr_code',
    method: 'get',
    data,
  })
}

/**
 * 加入团队 MallCar/MallCar/join_team
 * @param {int} team_id 是 团队id
 */
export function addTeamMember(data) {
  return request({
    url: '/MallCar/MallCar/join_team',
    method: 'get',
    data,
  })
}

/**
 * 退出团队 MallCar/MallCar/out_team
 */
export function delTeam(data) {
  return request({
    url: '/MallCar/MallCar/out_team',
    method: 'get',
    data,
  })
}