let id = 0;
class Dep{
  constructor(){
    this.id = id++
    this.subs = []
  }
  depend(){
    Dep.targer.addDep(this)
  }
  addSub(watcher){
    this.subs.push(watcher)
  }
  //更新
  notify(){
    this.subs.forEach(watcher=>{
      watcher.updata()
    })
  }
}

Dep.targer = null
export function pushTarget(watcher){
  Dep.targer = watcher
}

export function popTarget(){
  Dep.targer = null
}

export default Dep
