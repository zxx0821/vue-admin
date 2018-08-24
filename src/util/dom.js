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
/**
 *
 * @param target 目标数组
 * @param arr 需要查询的数组
 * @description 判断要查询的数组是否至少有一个元素包含在目标数组中
 * @returns {*|boolean}
 */
export const hasOneOf = (target, arr) => {
  return target.some(item => arr.indexOf(item) > -1)
}
/**
 * @param {String|Number} value 要验证的字符串或数值
 * @param {*} validList 用来验证的列表
 * @returns {boolean}
 */
export const oneOf = (value, validList)=>{
  for(let i=0;i<validList.length;i++){
    if(value===validList[i]){
      return true
    }
  }
  return false
}

