import { observer } from './observe/index'
import {nextTick} from './utils/nextTick'
import Watcher from './observe/watcher'
export function initState(vm) {
    let opts = vm.$options;
    if (opts.props) {
        initProps()
    }
    if (opts.data) {
        initData(vm)
    }
    if (opts.watch) {
        initWatch(vm)
    }
    if (opts.computed) {
        initComputed()
    }
    if (opts.methods) {
        initMethods(vm)
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
  //1 获取watch
  let watch = vm.$options.watch;
  for(let key in watch){
    let handler = watch[key];
    if(Array.isArray(handler)){
      handler.forEach(item=>{
        createWatcher(vm,key,item)
      })
    }else{
      createWatcher(vm,key,handler) 
    }
  }
}
function createWatcher(vm,exprOrfn,handler,options){
  if(typeof handler==='object'){
    options = handler;//用户的配置项目
    handler = handler.handler;//这个是一个函数
  }
  if(typeof handler==='string'){
    handler = vm[handler]//将实例行的方法作为 handler 方法代理和data 一样
  }  
  return vm.$watch(vm,exprOrfn,handler,options)
}
function initComputed() {

}
function initMethods(vm) {

}
export function stateMixin(Vue){
  //列队 :1就是vue自己的nextTick  2用户自己的
  Vue.prototype.$nextTick = function(cb){//nextTick: 数据更新之后获取到最新的DOM
    nextTick(cb)
  }
  Vue.prototype.$watch=function(vm,exprOrfn,handler,options={}){
    let watcher = new Watcher(vm,exprOrfn,handler,{...options,user:true})
    if(options.immediate){
      handler.call(vm)
    }
  }
}
