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

/**
 * 获取邀请
 * @params
 *  被邀请人备注 remark: string
 */
export function invitation(params) {
  return request('/dong-manager/user/link', {
    body: params
  });
}

export function fetchList() {
  return request('/api/users');
}