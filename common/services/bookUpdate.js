/**
 *  描述：书更新时间模块
 */
import request from '../utils/request';

/**
 * 获取书更新时间
 * @params
 *  
 */
export function get() {
	return request('/dong-manager/book-update/get');
}

/** 
 * 更新书更新时间
 * @header
 *  ACCESS_TOKEN*: string
 * 
 * @params
 *  更新时间 updateTime*: string yyyy-MM-dd
 */
export function update(params) {
	return request('/dong-manager/book-update/update', {
		body: params
	})
}