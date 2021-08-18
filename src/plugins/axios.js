"use strict";

import Vue from 'vue';
import axios from "axios";

// Full config:  https://github.com/axios/axios#request-config
// axios.defaults.baseURL = process.env.baseURL || process.env.apiUrl || '';
// axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;
// axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

let config = {
  // baseURL: process.env.baseURL || process.env.apiUrl || ""
  // timeout: 60 * 1000, // Timeout
  // withCredentials: true, // Check cross-site Access-Control
};


const _axios = axios.create(config);

_axios.interceptors.request.use(
  function(config) {
    // Do something before request is sent
    return config;
  },
  function(error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

// Add a response interceptor
_axios.interceptors.response.use(
  function(response) {
    // Do something with response data
    return response;
  },
  function(error) {
    // Do something with response error
    return Promise.reject(error);
  }
);

Plugin.install = function(Vue, options) {
  Vue.axios = _axios;
  window.axios = _axios;
  Object.defineProperties(Vue.prototype, {
    axios: {
      get() {
        return _axios;
      }
    },
    $axios: {
      get() {
        return _axios;
      }
    },
  });
};

Vue.use(Plugin)

export default Plugin;

// class HttpRequest {
//   	...
//     // 请求次数，请求的间隙
//     instance.defaults.retry = 1
//     instance.defaults.retryDelay = 3000
//     // 响应拦截
//     instance.interceptors.response.use(res => {
//       ...
//     }, err => {
//       ...
//       var config = err.config
//       // 如果配置不存在或未设置重试选项，则返回错误信息
//       if (!config || !config.retry) return Promise.reject(err.response.data)

//       // 设置变量即跟踪重试次数
//       config.__retryCount = config.__retryCount || 0

//       // 检查我们是否已经超过了总重试次数
//       if (config.__retryCount >= config.retry) {
//         // 返回错误信息
//         return Promise.reject(err.response.data)
//       }

//       // 重试次数加1
//       config.__retryCount++
      
//       // 创建延时器等待发送重试请求
//       var backoff = new Promise((resolve) => {
//         setTimeout(() => {
//           resolve()
//         }, config.retryDelay || 1)
//       })

//       // 返回调用AXIOS来重试请求
//       return backoff.then(() => {
//         return this.request(config)
//       })
//     })
//   }
//   request (options) {
//   	// 因为有需要所以这里我设置了 20s 超时
//     const instance = axios.create({ timeout: 1000 * 20 })
//     ...
//     return instance(options)
//   }
