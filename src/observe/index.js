
import {ArrayMethods} from './arr'
export function observer(data) {
    if(typeof data != 'object' || data == null){
      return data
    }
    return new Observer(data)
}

class Observer{
  constructor(value){
    Object.defineProperty(value,'__ob__',{
      enumerable:false,
      value:this
    })
    //判断数据
    if(Array.isArray(value)){
      value.__proto__ = ArrayMethods
      this.observeArray(value)
    }else{
      this.walk(value)
    }
  }
  observeArray(value){
    for(let i=0;i<value.length;i++){
      observer(value[i])
    }
  }
  walk(data){
    let keys = Object.keys(data)
    for(let i=0;i<keys.length;i++){
      let key = keys[i];
      let value = data[key];
      defineReactive(data,key,value)
    }
  }
}

function defineReactive(data,key,value){
    observer(value);
    Object.defineProperty(data,key,{
      get(){
        console.log('获取的时候触发')
        return value
      },
      set(newValue){
        console.log('设置的时候触发')
        if(newValue === value) return;
        value = newValue
        observer(value);
      }
    })
}
