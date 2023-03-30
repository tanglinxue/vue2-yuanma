(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
    typeof define === 'function' && define.amd ? define(factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.Vue = factory());
})(this, (function () { 'use strict';

    function observer(data) {
      console.log(data);
    }

    function initState(vm) {
      var opts = vm.$options;
      if (opts.props) ;
      if (opts.data) {
        initData(vm);
      }
      if (opts.watch) ;
      if (opts.computed) ;
      if (opts.methods) ;
    }
    function initData(vm) {
      var data = vm.$options.data;
      data = typeof data === 'function' ? data.call(vm) : data;
      observer(data);
    }

    function initMixin(Vue) {
      Vue.prototype._init = function (options) {
        var vm = this;
        vm.$options = options;
        initState(vm);
      };
    }

    function Vue(options) {
      this._init(options);
    }
    initMixin(Vue);

    return Vue;

}));
//# sourceMappingURL=vue.js.map
