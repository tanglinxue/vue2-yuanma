
import { ArrayMethods } from './arr'
import Dep  from './dep'
export function observer(data) {
  if (typeof data != 'object' || data == null) {
    return
  }
  return new Observer(data)
}

class Observer {
  constructor(value) {
    Object.defineProperty(value, '__ob__', {
      enumerable: false,
      value: this
    })
    this.dep = new Dep()
    //判断数据
    if (Array.isArray(value)) {
      value.__proto__ = ArrayMethods
      this.observeArray(value)
    } else {
      this.walk(value)
    }
  }
  observeArray(value) {
    for (let i = 0; i < value.length; i++) {
      observer(value[i])
    }
  }
  walk(data) {
    let keys = Object.keys(data)
    for (let i = 0; i < keys.length; i++) {
      let key = keys[i];
      let value = data[key];
      defineReactive(data, key, value)
    }
  }
}

function defineReactive(data, key, value) {
  let childDep = observer(value);
  //1给我们的每个属性添加一个dep
  let dep = new Dep()
  //2将dep 存放起来，当页面取值时，说明这个值用来渲染，在将这个watcher和这个属性对应起来
  Object.defineProperty(data, key, {
    get() {
      if(Dep.targer){
        dep.depend()
        if(childDep){
          childDep.dep.depend()
        }
      }
      // 收集依赖
      return value
    },
    set(newValue) {
      if (newValue === value) return;
      value = newValue
      observer(value);
      dep.notify()
    }
  })
}
