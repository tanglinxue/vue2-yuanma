
export  const HOOKS = [
  "beforeCreate",
  "created",
  "beforeMount",
  "mounted",
  "beforeUpdate",
  "updated",
  "beforeDestory",
  "destroyed"
]
// 策略模式
let starts = {}
starts.data = function(parentVal,childVal){
  return childVal
}
starts.computed = function(){
  
}
starts.watch = function(){
  
}
starts.methods = function(){
  
}

function mergeHook(parentVal,childVal){ //生命周期的合并
  if(childVal){
    if(parentVal){
      return parentVal.concat(childVal)
    }else{
      return [childVal]
    }
  }else{
    return parentVal
  }
}

HOOKS.forEach(hooks=>{
  starts[hooks] = mergeHook
})

export function mergeOptions(parent,child){
    const options = {}
    //遍历父亲：可能是父亲有，儿子没有
    for(let key in parent){//父亲和儿子都有在这里进行处理
      mergeField(key)
    }
     //儿子有父亲没有
    for(let key in child){//将儿子多的赋值到父亲上
      if(!parent.hasOwnProperty(key)){
        mergeField(key)
      }  
    }
    function mergeField(key){
        if(starts[key]){
          options[key] = starts[key](parent[key],child[key])
        }else{
          options[key] = child[key]
        }
    }
    return options
}
