import fetch from 'dva/fetch';

function parseJSON(response) {
  return response.json();
}

function checkStatus(response) {
  if(response.status >= 200 && response.status < 300) {
    return response;
  }
  const error = new Error(response.statusText);
  error.response = response;
  throw error;
}

function formatOpt(data) {
  let arr = [];
  if(data) {
    for(let name in data) {
      if(data[name] != undefined) {
        arr.push(encodeURIComponent(name) + '=' + encodeURIComponent(data[name]));
      }
    };
  }
  // 添加一个随机数，防止缓存
  // arr.push('_r=' + Math.floor(Math.random() * 10000 + 500));
  return arr.join('&');
}

function request(url, options) {
  options = options || {};
  options.method = options.method || 'post';
  options.mode = options.mode || 'cors';
  options.headers = options.headers || {};
  options.headers['Content-Type'] = options.headers['Content-Type'] || 'application/x-www-form-urlencoded';
  let data = options.data || {};
  let dataBody;
  dataBody = formatOpt(data);
  if(options.body && dataBody) {
    dataBody = options.body + '&' + dataBody;
  }
  options.body = dataBody;
  return fetch(url, options)
    .then(checkStatus)
    .then(parseJSON)
    .then(data => data)
    .catch(err => ({err}));
}

export {
  request
};
