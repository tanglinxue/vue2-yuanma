import {initMixin} from './init'
import {lifecycleMixin} from './lifecycle'
import {renderMixin} from './vnode/index'
import {initGlobApi} from './global-api/index'
import {stateMixin} from './initState'

function Vue(options){
  this._init(options)
}

initMixin(Vue)
lifecycleMixin(Vue)
renderMixin(Vue)
stateMixin(Vue)
initGlobApi(Vue)
export default Vue
