import {mergeOptions} from '../utils/index.js'
export function initGlobApi(Vue){
   // 源码当中 你所有定义的全局方法都是 放在
   Vue.options = {}
   Vue.mixin = function(mixin){
     //实现合并 就是合并对象 （我先考虑生命周期）不考虑其他的合并 data,computed watch
     this.options = mergeOptions(this.options,mixin)
   } 
}

