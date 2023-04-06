import {pushTarget,popTarget} from './dep.js'


//为什么封装成一个类 ，方便我们的扩展
let id = 0; //全局的
class Watcher{
  constructor(vm,updataComponent,cb,options){
    this.vm = vm;
    this.exprOrfn = updataComponent;
    this.cb = cb;
    this.options = options;
     // 2. 每一组件只有一个watcher 他是为标识
    this.id = id++
    this.deps = []
    this.depsId = new Set()
    if(typeof updataComponent === 'function'){
      this.getter = updataComponent
    }
    this.get()
  }
  addDep(dep){
    let id = dep.id;
    if(!this.depsId.has(id)){
      this.deps.push(dep)
      this.depsId.add(id)
      dep.addSub(this)
    }
  }
  get(){
    pushTarget(this)//当前的实例添加
    this.getter()  //渲染页面 vm._updata()
    popTarget() //删除当前的实例 这两个方法放在 dep 中
  }
  updata(){
    this.getter()
  }
}

export default Watcher
