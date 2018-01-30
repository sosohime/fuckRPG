import request from '../utils/request';

export function readAll() {
    return request('/rpgers/readAll');
}