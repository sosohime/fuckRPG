// TODO: use dva/fetch after dva@1.2
import fetch from 'isomorphic-fetch';
import { getAccessToken } from './system';

const host = process.env.NODE_ENV === 'dev'? 'http://localhost:2234/' : 'http://www.yulaiz.com'

const fetchDefaultOptions = {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json;charset=utf-8'
    // 'Content-Type': 'application/x-www-form-urlencoded'
  },
}

function parseJSON(response) {
  return response.json();
}

function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response;
  }

  const error = new Error(response.statusText);
  error.response = response;
  throw error;
}

export default function request(url, options) {
  let token = getAccessToken();
  if(token){
    fetchDefaultOptions.headers.ACCESS_TOKEN = token;
  }

  options = Object.assign(fetchDefaultOptions, options)
  options.body = JSON.stringify(options.body)
  console.log(options)
  return fetch(`${host}${url}`, options)
    .then(checkStatus)
    .then(parseJSON)
    .then((data) => ({ data }))
    .catch((err) => ({ err }));
}
