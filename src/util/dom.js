import Vue from 'vue'
const isServer = Vue.prototype.$isServer;
/**
 * 事件监听,兼容IE
 * @type {Function}
 */
export const ON = (function () {
  if(!isServer && document.addEventListener){
    return function (element, event, handler) {
      if(element&&event&&handler){
        element.addEventListener(event,handler,false)
      }
    }
  }else{
    return function (element, event, handler) {
      if(element && event && handler){
        element.attachEvent('on' + event, handler);
      }
    }
  }
})()
/**
 * 取消事件监听
 * @type {Function}
 */
export const OFF = (function () {
  if(!isServer && document.removeEventListener){
    return function (element, event, handler) {
      if(element&&event&&handler){
        element.removeEventListener(event,handler, false)
      }
    }
  }else{
    return function (element, event, handler) {
      if(element && event && handler){
        element.detachEvent('on' + event, handler);
      }
    }
  }
})()
