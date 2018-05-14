import axios from 'axios'
import {Message} from "element-ui"
import router from "../../router/index"
import common from '../common/index'

export function fetch(options) {
  return new Promise((resolve, reject) => {
    const instance = axios.create({ //instance创建一个axios实例，可以自定义配置
      //所有的请求都会带上这些配置，比如全局都要用的身份信息等
      headers: {
        'Content-Type': 'application/json'
      },
      timeout: 30 * 1000 //30s超时
    });
    instance(options).then(response => { //请求成功之后进行什么操作
      resolve(response); //把请求到的数据发到引用请求的地方
    }).catch(error => {
      console.log('请求异常信息：' + error);
      reject(error);
    });
  });
}

export function fetchWithToken(options, token) {
  return new Promise((resolve, reject) => {

    const instance = axios.create({ //instance创建一个axios实例，可以自定义配置
      //所有的请求都会带上这些配置，比如全局都要用的身份信息等
      headers: {
        'Content-Type': 'application/json',
        'token': token
      },
      timeout: 30 * 1000 //30s超时
    });
    instance(options).then(response => { //请求成功之后进行什么操作
      if (response.data && response.data.code === 403) {
        //没有权限，跳转到登录页面
        Message({
          //  饿了么的消息弹窗组件,类似toast
          showClose: true,
          message: response.data.msg,
          type: "error.data.error.message"
        });
        router.push({path: "/login"});
      } else {
        resolve(response); //把请求到的数据发到引用请求的地方
      }
    }).catch(error => {
      console.log('请求异常信息：' + error);
      reject(error);
    });
  });
}

export function downLoadWithToken(options, token) {
  return new Promise((resolve, reject) => {

    const instance = axios.create({ //instance创建一个axios实例，可以自定义配置
      //所有的请求都会带上这些配置，比如全局都要用的身份信息等
      headers: {
        'Content-Type': 'application/json',
        'token': token
      },
      timeout: 30 * 1000 //30s超时
    });
    instance(options).then(response => { //请求成功之后进行什么操作
      if (response.data && response.data.code === 403) {
        //没有权限，跳转到登录页面
        Message({
          //  饿了么的消息弹窗组件,类似toast
          showClose: true,
          message: response.data.msg,
          type: "error.data.error.message"
        });
        router.push({path: "/login"});
      } else {
        resolve(response); //把请求到的数据发到引用请求的地方
      }
    }).catch(error => {
      console.log('请求异常信息：' + error);
      reject(error);
    });
  });
}
