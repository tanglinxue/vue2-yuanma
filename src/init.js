import { initState } from './initState'
import {compilrToFunction} from './compile/index'
export function initMixin(Vue) {
  Vue.prototype._init = function (options) {
    let vm = this;
    vm.$options = options;
    initState(vm)
    if (vm.$options.el) {
      vm.$mount(vm.$options.el)
    }
  }

  Vue.prototype.$mount = function (el) {
    let vm = this
    el = document.querySelector(el) //获取元素
    let options = vm.$options
    if (!options.render) { //没有
        let template = options.template
        if (!template && el) {
            //获取html
            el = el.outerHTML
            //变成ast语法树
            let ast = compilrToFunction(el)
        }
    }
}
}


