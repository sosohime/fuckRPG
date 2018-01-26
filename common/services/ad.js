/**
 *  描述：广告模块
 */
import request from '../utils/request';

/** 
 * 新增一条广告
 * @header
 *  ACCESS_TOKEN*: string
 * 
 * @params
 *  广告详情 description*: string
 *  广告标题 title*: string
 *  
 */
export function add(params){
    return request('/dong-manager/ad/add', {body: params});
}

/** 
 * 删除一条广告
 * @header
 *  ACCESS_TOKEN*: string
 * 
 * @params
 *  广告ID id*: string
 *  
 */
export function del(params){
    return request('/dong-manager/ad/del', {body: params});
}

/** 
 * 获取指定广告
 * @params
 *  广告ID id*: string
 *  
 */
export function getById(params){
    return request('/dong-manager/ad/get-by-id', {body: params});
}

/** 
 * 获取所有广告
 * @params
 *  
 */
export function getList(){
    return request('/dong-manager/ad/get-list');
}

/** 
 * 分页获取广告
 * @params
 *  页码 page*: int >= 1
 *  分页大小 size*: int 1~20
 * 
 */
export function getListByPage(params){
    return request('/dong-manager/ad/get-list-by-page', {body: params});
}

/** 
 * 修改指定广告
 * @header
 *  ACCESS_TOKEN*: string
 * 
 * @params
 *  广告详情 description*: String
 *  广告ID id*: string
 *  广告标题 title*: string
 * 
 */
export function modify(params){
    return request('/dong-manager/ad/modify', {body: params});
}

