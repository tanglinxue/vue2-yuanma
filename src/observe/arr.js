//重新写数组
//(1) 获取原来的数组方法
let oldArrayProtoMethods = Array.prototype;

//（2）继承
export let ArrayMethods = Object.create(oldArrayProtoMethods)


let methods = [
  'push',
  'pop',
  'unshift',
  'shift',
  'splice',
  'reverse',
  'sort'
]

methods.forEach(item=>{
  ArrayMethods[item] = function(...args){
    let result = oldArrayProtoMethods[item].apply(this,args)
    let inserted
    switch(item){
      case 'push':
      case 'unshift':
        inserted = args
        break
      case 'splice':
        inserted = args.splice(2)
    }
    let ob = this.__ob__;
    if(inserted){
      ob.observeArray(inserted)
    }
    return result
  }
})


