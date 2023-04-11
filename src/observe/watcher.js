import {pushTarget,popTarget} from './dep.js'
import {nextTick} from '../utils/nextTick.js'

//为什么封装成一个类 ，方便我们的扩展
let id = 0; //全局的
class Watcher{
  constructor(vm,exprOrfn,cb,options){
    this.vm = vm;
    this.exprOrfn = exprOrfn;
    this.cb = cb;
    this.options = options;
     // 2. 每一组件只有一个watcher 他是为标识
    this.id = id++
    this.user=!!options.user;
    this.deps = []  //watcher 记录有多少dep 依赖
    this.depsId = new Set()
    if(typeof exprOrfn === 'function'){
      this.getter = exprOrfn
    }else{
      this.getter = function(){
        let path = exprOrfn.split('.')
        let obj = vm;
        for(let i=0;i<path.length;i++){
          obj = obj[path[i]]
        }
        return obj
      }
    }
   this.value = this.get()
  }
  addDep(dep){
    //去重  判断一下 如果dep 相同我们是不用去处理的
    let id = dep.id;
    if(!this.depsId.has(id)){
      this.deps.push(dep)
      this.depsId.add(id)
      dep.addSub(this)
    }
  }
  run(){
    let value = this.get()
    let oldValue = this.value
    this.value = value;
    if(this.user){
      this.cb.call(this.vm,value,oldValue)
    }
  }
  get(){
    pushTarget(this)//当前的实例添加
    const value = this.getter()  //渲染页面 vm._updata()
    
    console.log(value)
    popTarget() //删除当前的实例 这两个方法放在 dep 中
    return value
  }
  updata(){
    
    //this.getter()
    queueWatcher(this)
  }
}

let queue = []
let has = {}
let pending = false
function flushWatcher(){
  queue.forEach(item=>{item.run();item.cb()})
  queue = []
  has = {}
  pending = false
}
function queueWatcher(watcher){
  let id = watcher.id;
  if(has[id] == null){
    has[id] = true
    queue.push(watcher)
    if(!pending){
      nextTick(flushWatcher) 
    }
    pending = true
  }
}

export default Watcher

//nextTick 原理

//优化
