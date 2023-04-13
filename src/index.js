import {initMixin} from './init'
import {lifecycleMixin} from './lifecycle'
import {renderMixin} from './vnode/index'
import {initGlobApi} from './global-api/index'
import {stateMixin} from './initState'
import {compilrToFunction} from './compile/index'
import {createEl} from './vnode/patch'

function Vue(options){
  this._init(options)
}

initMixin(Vue)
lifecycleMixin(Vue)
renderMixin(Vue)
stateMixin(Vue)
initGlobApi(Vue)

let vm1 = new Vue({
  data:{name:'张三'}
})

let render1 = compilrToFunction(`<div id='a'>{{name}}</div>`)
let vnode1 = render1.call(vm1)
document.body.appendChild(createEl(vnode1))



let vm2 = new Vue({
  data:{name:'李四'}
})
let render2 = compilrToFunction(`<div id='a'>{{name}}</div>`)
let vnode2 = render1.call(vm2)
document.body.appendChild(createEl(vnode2))
export default Vue
