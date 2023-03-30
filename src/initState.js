import { observer } from './observe/index'
export function initState(vm) {
    let opts = vm.$options;
    if (opts.props) {
        initProps()
    }
    if (opts.data) {
        initData(vm)
    }
    if (opts.watch) {
        initWatch()
    }
    if (opts.computed) {
        initComputed()
    }
    if (opts.methods) {
        initMethods()
    }
}
function initData(vm) {
    let data = vm.$options.data;
    data = typeof data === 'function' ? data.call(vm) : data;
    observer(data)
}
function initProps() {

}
function initWatch() {

}
function initComputed() {

}
function initMethods() {

}