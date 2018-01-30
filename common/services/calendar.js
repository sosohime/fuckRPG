/**
 *  描述：日历模块
 */
import request from '../utils/request';

/** 
 * 新增一条日历
 * @header
 *  ACCESS_TOKEN*: string
 * 
 * @params
 *  日期     days*: string
 *  日历详情 description*: string
 *  日历备注 remark*: string
 *  日历标题 title*: string
 *  
 */
export function add(params) {
    return request('/dong-manager/calendar/add', {
        body: params
    });
}

/** 
 * 删除一条日历
 * @header
 *  ACCESS_TOKEN*: string
 * 
 * @params
 *  日历ID id*: string
 *  
 */
export function del(params) {
    return request('/dong-manager/calendar/del', {
        body: params
    });
}

/** 
 * 获取指定日历
 * @params
 *  日历ID id*: string
 *  
 */
export function getById(params) {
    return request('/dong-manager/calendar/get-by-id', {
        body: params
    });
}

/** 
 * 获取所有日历
 * @params
 *  
 */
export function getList() {
    return request('/dong-manager/calendar/get-list');
}

/** 
 * 分页获取日历
 * @params
 *  页码 page*: int >= 1
 *  分页大小 size*: int 1~20
 * 
 */
export function getListByPage(params) {
    return request('/dong-manager/calendar/get-list-by-page', {
        body: params
    });
}

/** 
 * 修改指定日历
 * @header
 *  ACCESS_TOKEN*: string
 * 
 * @params
 *  日历详情 description*: String
 *  日历ID id*: string
 *  日历标题 title*: string
 * 
 */
export function modify(params) {
    return request('/dong-manager/calendar/modify', {
        body: params
    });
}