import { patch } from "./vnode/patch";
import Watcher from './observe/watcher'
export function mountComponent(vm, el) {
  //源码方式
  callHook(vm,'beforeMount')
 
  let updataComponent = ()=>{
    vm._update(vm._render())
  }
  new Watcher(vm,updataComponent,()=>{

  },true)
  callHook(vm,'mounted')
}

export function lifecycleMixin(Vue) {
  Vue.prototype._update = function (vnode) {
    let vm = this;
    vm.$el = patch(vm.$el, vnode)
  }
}

export function callHook(vm,hook){
  const handlers = vm.$options[hook]
  if(handlers){
    for(let i=0;i<handlers.length;i++){
      handlers[i].call(vm)
    }
  }
}
