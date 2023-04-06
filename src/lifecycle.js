import { patch } from "./vnode/patch";
export function mountComponent(vm, el) {
  //源码方式
  callHook(vm,'beforeMount')
  vm._update(vm._render())
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
