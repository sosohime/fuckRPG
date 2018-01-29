/**
 *  描述：用户模块
 */
import request from '../utils/request';

/**
 * 用户登录
 * @params
 *  用户名 userName*: string
 *  密码 password*: string, MD5
 */
export function login(params) {
  return request('/dong-manager/user/login', {
    body: params
  })
}

export function fetchList() {
  return request('/api/users');
}

export function invitation() {
  return request('/dong-manager/user/link');
}