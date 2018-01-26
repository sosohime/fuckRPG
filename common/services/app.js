import request from '../utils/request';

export function readAll() {
  console.log('getting')
  return request('/rpgers/readAll');
}
