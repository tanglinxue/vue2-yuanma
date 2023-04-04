
const ncname = `[a-zA-Z_][\\-\\.0-9_a-zA-Z]*`;   // 标签名称
const qnameCapture = `((?:${ncname}\\:)?${ncname})`; //<span:xx>
const startTagOpen = new RegExp(`^<${qnameCapture}`); // 标签开头的正则 捕获的内容是标签名
const endTag = new RegExp(`^<\\/${qnameCapture}[^>]*>`); // 匹配标签结尾的 </div>
const attribute = /^\s*([^\s"'<>\/=]+)(?:\s*(=)\s*(?:"([^"]*)"+|'([^']*)'+|([^\s"'=<>`]+)))?/; // 匹配属性的
//<div id="app"></div>
const startTagClose = /^\s*(\/?)>/; // 匹配标签结束的 >
const defaultTagRE = /\{\{((?:.|\r?\n)+?)\}\}/g // {{}}

//创建ast语法树
function createASTElement(tag,attrs){
  return {
    tag,//标签名称
    attrs,
    children:[],
    type:1,
    parent:null
  }
}

let root;//根元素
let createParent
let stack = []

function start(tag,attrs){//开始标签
  //console.log(tag,'开始标签')
  let element = createASTElement(tag,attrs)
  if(!root){
    root = element
  }
  createParent = element
  stack.push(element)
}

function charts(text){
  //console.log(text,'文本')
  text = text.replace(/\s/g,'')
  if(text){
    createParent.children.push({
      type:3,
      text
    })
  }
}
function end(tag){
  //console.log(tag,'结束标签')
  let element = stack.pop()
  createParent = stack[stack.length-1];
  if(createParent){//元素的关闭
    element.parent = createParent.tag;
    createParent.children.push(element)
  }
}
export function parseHTML(html){
  while(html){ // html  为空结束
    let textEnd = html.indexOf('<')
    if(textEnd === 0){
      //（1） 开始标签
      const startTagMatch = parseStartTag()
      if(startTagMatch){
        start(startTagMatch.tagName,startTagMatch.attrs)
        continue
      } 
       //结束标签 
      let endTagMatch = html.match(endTag)
      if(endTagMatch){
        advance(endTagMatch[0].length)
        end(endTagMatch[0])
        continue
      }
    }
    //文本
    let text
    if(textEnd > 0){
       //获取文本内容
      text = html.substring(0,textEnd) 
    }  
    if(text){
      advance(text.length)
      charts(text)
    }
  }
  function parseStartTag(){
    const start = html.match(startTagOpen)
    if(!start) return 
   
    //创建ast 语法树
    let match = {
      tagName:start[1],
      attrs:[]
    }
    //删除 开始标签
    advance(start[0].length)
    //属性
    //注意  多个 遍历
    //注意 >
    let attr
    let end 
    while(!(end = html.match(startTagClose)) && (attr = html.match(attribute))){
      match.attrs.push({
        name:attr[1],
        value:attr[3]||attr[4]||attr[5]
      })
      advance(attr[0].length)
    }
    if(end){
      advance(end[0].length)
      return match
    }
  }
  function advance(n){
    html = html.substring(n)
  }
  return root
}
