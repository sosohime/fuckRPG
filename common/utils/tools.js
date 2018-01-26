import { isPlainObject } from 'lodash';
import * as MD5 from 'js-md5';

function encodeSearchParams(obj = {}) {
    const params = []
  
    Object.keys(obj).forEach((key) => {
      let value = obj[key]
      // 如果值为undefined我们将其置空
      if (typeof value === 'undefined') {
        value = ''
      }
      // 对于需要编码的文本（比如说中文）我们要进行编码
      params.push([key, encodeURIComponent(value)].join('='))
    })
  
    return params.join('&')
}

export function path(url, obj){
    let params = encodeSearchParams(obj);
    return `${url}?${params}`
}

export function strToMD5UpperCase(str) {
  let md5UpperCase = MD5.default(str).toUpperCase();
  return md5UpperCase;
}