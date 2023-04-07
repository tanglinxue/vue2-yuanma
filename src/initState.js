import { observer } from './observe/index'
import {nextTick} from './utils/nextTick'
export function initState(vm) {
    let opts = vm.$options;
    if (opts.props) {
        initProps()
    }
    if (opts.data) {
        initData(vm)
    }
    if (opts.watch) {
        initWatch()
    }
    if (opts.computed) {
        initComputed()
    }
    if (opts.methods) {
        initMethods()
    }
}
function initData(vm) {
    let data = vm.$options.data;
    data = vm._data = typeof data === 'function' ? data.call(vm) : data;
 
    observer(data)
    for(let key in data){
      proxy(vm,'_data',key)
    }
}
function proxy(vm,source,key){
  Object.defineProperty(vm,key,{
    get(){
      return vm[source][key]
    },
    set(newValue){
      vm[source][key] = newValue
    }
  })
}
function initProps() {

}
function initWatch(vm) {
  consoel.log(vm.$options.watch)
}
function initComputed() {

}
function initMethods() {

}
export function stateMixin(Vue){
  Vue.prototype.$nextTick = function(cb){
    nextTick(cb)
  }
}
