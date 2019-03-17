import {request} from './fetch';

function API(getway) {

  this.getway = getway;

  this.get = function(api, options) {
    options.method = 'get';
    return request(this.getway + api, options);
  }

  this.post = function(api, options) {
    options.method = 'post';
    return request(this.getway + api, options);
  }

  this.put = function(api, options) {
    options.method = 'put';
    return request(this.getway + api, options);
  }

  this.patch = function(api, options) {
    options.method = 'patch';
    return request(this.getway + api, options);
  }

  this.delete = function(api, options) {
    options.method = 'delete';
    return request(this.getway + api, options);
  }

  this.head = function(api, options) {
    options.method = 'head';
    return request(this.getway + api, options);
  }

}

export default API;
