import { initState } from './initState'
import {compilrToFunction} from './compile/index'
import {mountComponent} from './lifecycle'
import { mergeOptions } from './utils/index.js';
import {callHook} from './lifecycle'
export function initMixin(Vue) {
  Vue.prototype._init = function (options) {
    let vm = this;
    vm.$options = mergeOptions(Vue.options,options) // 需要将用户自定义的options 合并 谁和谁合并
    callHook(vm,'beforeCreated')
    initState(vm)
    callHook(vm,'created')
    if (vm.$options.el) {
      vm.$mount(vm.$options.el)
    }
  }

  Vue.prototype.$mount = function (el) {
    let vm = this
    el = document.querySelector(el) //获取元素
    vm.$el = el
    let options = vm.$options
    if (!options.render) { //没有
        let template = options.template
        if (!template && el) {
            //获取html
            el = el.outerHTML
            //变成ast语法树
            let render = compilrToFunction(el)
            options.render = render
        }
    }
    // 挂载组件
    mountComponent(vm,el)
  }
}


