import { patch } from "./vnode/patch";
export function mountComponent(vm, el) {
  vm._update(vm._render())
}

export function lifecycleMixin(Vue) {
  Vue.prototype._update = function (vnode) {
    let vm = this;
    vm.$el = patch(vm.$el, vnode)
  }
}
