
const defaultTagRE = /\{\{((?:.|\r?\n)+?)\}\}/g // {{}}
function genProps(attrs){
  let str = ''
  for(let i=0;i<attrs.length;i++){
    let attr = attrs[i];
    if(attr.name === 'style'){
      let obj = {}
      attr.value.split(';').forEach(item=>{
        let [key,value] = item.split(':')
        obj[key] = value
      })
      attr.value = obj
    }
    str += `${attr.name}:${JSON.stringify(attr.value)},`
  }
  return `{${str.slice(0,-1)}}`
}
//判断是否有儿子
function getChildren(el){
  const children = el.children;
  if(children){
    return children.map(child=>gen(child)).join(',')
  }
}
function gen(node){//获取到的元素
   //注意 是什么类型  文本   div
  if(node.type===1){
    //return generate(node)//生成元素节点的字符串
    return generate(node)
  }else{
    let text = node.text;// 获取文本  注意  普通的文本  hello{{name}}?{{num}}
    if(!defaultTagRE.test(text)){
      return `_v(${JSON.stringify(text)})`
    }
    let tokens = [] //存放每一段的代码
    let lastIndex = defaultTagRE.lastIndex = 0;//如果正则是全局模式 需要每次使用前变为0
    let match;// 每次匹配到的结果  exec 获取 {{name}}
    while(match = defaultTagRE.exec(text)){
      let index = match.index;
      if(index>lastIndex){
        tokens.push(JSON.stringify(text.slice(lastIndex,index)))
      }
      tokens.push(`_s(${match[1].trim()})`)
      lastIndex = index + match[0].length
    }
    if(lastIndex<text.length){
      tokens.push(JSON.stringify(text.slice(lastIndex)))
    }
    return `_v(${tokens.join("+")})`
  }
}
//语法层面的转移
export function generate(el){
  let children = getChildren(el)
  //方法 拼接字符串  源码也是这样操作 [{}]    ${el.attrs.length?`{style:{color:red}}`:'undefined'}
  let code = `_c('${el.tag}',${el.attrs.length?`${genProps(el.attrs)}`:'undefined'}${children?`,${children}`:''})`
  return code
}
