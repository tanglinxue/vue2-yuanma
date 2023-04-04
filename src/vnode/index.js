export function renderMixin(Vue){
  Vue.prototype._c = function(){
     return createElement(...arguments)
  }
  Vue.prototype._v = function(text){
    return createText(text)
  }
  Vue.prototype._s = function(val){//变量
    return val === null ? '':(typeof val==='object')?JSON.stringify(val):val
  }
  Vue.prototype._render = function(){
    let vm = this;
    let render = vm.$options.render;
    let vnode = render.call(this)
    return vnode
  }
}

function createElement(tag,data={},...children){
  return vnode(tag,data,data.key,children)
}

function createText(text){
  return vnode(undefined,undefined,undefined,undefined,text)
}

function vnode(tag,data,key,children,text){
  return {
    tag,data,key,children,text
  }
}
