// https://showdoc.xcmbkj.com/web/#/6/124 （二期接口云车发布车源）
import request from '../utils/request'

/**
 * 获取品牌车辆类型 MallCar/MallCar/getCarType
 * @param {int} shop_car_brand_id 否 品牌id
 * @param {int} shop_car_model_id 否 车辆型号id
 */
export function getCarType(data) {
  return request({
    url: '/MallCar/MallCar/getCarType',
    method: 'get',
    data,
  })
}

/**
 * 汽车通用参数筛选 v2/MallCar/getCategory
 * @param {int} type 1:变速箱 2:排量 3:排放标准 4:座位数量 5:燃油类型 6:国别（暂时无用） 7:车身颜色 8:厂家类型 9:车辆品牌 10:车辆型号
 * @param {string} keyword 搜索关键词
 */
export function getOption(data) {
  return request({
    url: '/MallCar/MallCar/getCategory',
    method: 'get',
    data,
  })
}

/**
 * 地址接口 small/Address/get_address_list
 * @param {int} type require 1:省 2:市
 * @param {int} provinceid 省id 类型2 选择
 */
export function getAddressList(data) {
  return request({
    url: '/mallCar/Address/get_address_list',
    method: 'get',
    data,
  })
}

/**
 * 添加新商品 MallCar/MallCar/public_goods
 * @param {int} type	是	2:云车库
 * @param {int} province	是	省code
 * @param {int}  city	是	市code
 * @param {float} price	是	价格
 * @param {float} market_price	是	指导价
 * @param {int} category_id	是	分类id
 * @param {int} cover	是	int	展示图
 * @param {int} cover_url	是	int	封面图
 * @param {string} description	是	描述——————下面为云车库参数
 * @param {string} frame_number	是	车架号
 * @param {date} licensing_time	是	上牌时间 Y-m-d
 * @param {int} is_transfer_fee	是	1:有 0:无
 * @param {int} kilometers	是	公里数
 * @param {date} yearly_inspection	是	年检到期时间 Y-m-d
 * @param {date} force_insurance	是	强制险到期时间
 * @param {int} band_id	是	品牌id
 * @param {int} color_id	是	车身颜色id
 * @param {int} transmission_case_id	是	变速箱id
 * @param {int} displacement_id	是	排量id
 * @param {int} emission_standard_id	是	排放标准
 * @param {int} vendor_type_id	是	厂商类型
 * @param {int} fuel_type_id	是	燃油类型
 * @param {int} vehicle_type_id	是	车辆类型
 * @param {int} shop_car_model_id	是	车辆类型
 * @param {string} prove_images	是	多张逗号分隔
 */
export function addGood(data) {
  return request({
    url: '/MallCar/MallCar/public_goods',
    method: 'post',
    data,
  })
}

/**
 * 编辑新商品 MallCar/Mall/editNewGoods
 * @param {int} type	是	2:云车库
 * @param {int} province	是	省code
 * @param {int}  city	是	市code
 * @param {float} price	是	价格
 * @param {float} market_price	是	指导价
 * @param {int} category_id	是	分类id
 * @param {int} cover	是	int	展示图
 * @param {int} cover_url	是	int	封面图
 * @param {string} description	是	描述——————下面为云车库参数
 * @param {string} frame_number	是	车架号
 * @param {date} licensing_time	是	上牌时间 Y-m-d
 * @param {int} is_transfer_fee	是	1:有 0:无
 * @param {int} kilometers	是	公里数
 * @param {date} yearly_inspection	是	年检到期时间 Y-m-d
 * @param {date} force_insurance	是	强制险到期时间
 * @param {int} band_id	是	品牌id
 * @param {int} color_id	是	车身颜色id
 * @param {int} transmission_case_id	是	变速箱id
 * @param {int} displacement_id	是	排量id
 * @param {int} emission_standard_id	是	排放标准
 * @param {int} vendor_type_id	是	厂商类型
 * @param {int} fuel_type_id	是	燃油类型
 * @param {int} vehicle_type_id	是	车辆类型
 * @param {int} shop_car_model_id	是	车辆类型
 * @param {string} prove_images	是	多张逗号分隔
 */
export function editGood(data) {
  return request({
    url: '/MallCar/Mall/editNewGoods',
    method: 'post',
    data,
  })
}

/**
 * 编辑商品详情接口 MallCar/Mall/getEditInfo
 * @param {int} goods_id	是	商品id
 */
export function getGoodEditDetail(data) {
  return request({
    url: '/MallCar/MallCar/getEditInfo',
    method: 'get',
    data,
  })
}

/**
 * 下架商品 MallCar/MallCar/down_goods
 * @param {int} goods_id	是	商品id
 */
export function downGood(data) {
  return request({
    url: '/MallCar/MallCar/down_goods',
    method: 'post',
    data,
  })
}

/**
 * 记账接口 MallCar/MallCar/add_bill
 * @param {string} buy_name	是	成交方
 * @param {string} price	是	成交价
 * @param {int} goods_id	是	商品id
 */
export function addBill(data) {
  return request({
    url: '/MallCar/MallCar/add_bill',
    method: 'post',
    data,
  })
}

/**
 * 记账列表 MallCar/MallCar/bill_list
 * @param {string} keyword	否	搜索关键词
 * @param {date} time	否	Y-m
 */
export function getBillList(data) {
  return request({
    url: '/MallCar/MallCar/bill_list',
    method: 'get',
    data,
  })
}

/**
 * 客户线索 MallCar/MallCar/customer_clue_list
 */
export function getCustomerLeadsList(data) {
  return request({
    url: '/MallCar/MallCar/customer_clue_list',
    method: 'get',
    data,
  })
}

/**
 * 获取品牌列表 MallCar/MallCar/getBrand
 * @param {string} keyword	否	搜索关键词
 */
export function getBrandList(data) {
  return request({
    url: '/MallCar/MallCar/getBrand',
    method: 'get',
    data,
  })
}