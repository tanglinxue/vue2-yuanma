
const ncname = `[a-zA-Z_][\\-\\.0-9_a-zA-Z]*`;   // 标签名称
const qnameCapture = `((?:${ncname}\\:)?${ncname})`; //<span:xx>
const startTagOpen = new RegExp(`^<${qnameCapture}`); // 标签开头的正则 捕获的内容是标签名
const endTag = new RegExp(`^<\\/${qnameCapture}[^>]*>`); // 匹配标签结尾的 </div>
const attribute = /^\s*([^\s"'<>\/=]+)(?:\s*(=)\s*(?:"([^"]*)"+|'([^']*)'+|([^\s"'=<>`]+)))?/; // 匹配属性的
//<div id="app"></div>
const startTagClose = /^\s*(\/?)>/; // 匹配标签结束的 >
const defaultTagRE = /\{\{((?:.|\r?\n)+?)\}\}/g // {{}}


function createASTElement(tag,attrs){
  return {
    tag,
    attrs,
    children:[],
    type:1,
    parent:null
  }
}

let root;//根元素
let createParent
let stack = []

function start(tag,attrs){
  console.log(tag,attrs,'开始的标签')
  let element = createASTElement(tag,attrs)
  if(!root){
    root = element
  }
  createParent = element
  stack.push(element)
}

function charts(text){
  console.log(text,'文本')
  text = text.replace(/s/g,'')
  if(text){
    createParent.children.push({
      type:3,
      text
    })
  }
}
function end(tag){
  console.log(tag,'结束标签')
  let element = stack.pop()
  createParent = stack[stack.length-1];
  if(createParent){//元素的关闭
    element.paren = createParent.tag;
    createParent.children.push(element)
  }
}
function parseHTML(html){
  while(html){
    let textEnd = html.indexOf('<')
    if(textEnd === 0){
      const startTagMatch = parseStartTag()
      if(startTagMatch){
        start(startTagMatch.tagName,startTagMatch.attrs)
        continue
      } 
      let endTagMatch = html.match(endTag)
      if(endTagMatch){
        advance(endTagMatch[0].length)
        end(endTagMatch[0])
        continue
      }
    }
    let text
    if(textEnd >0){
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
    let match = {
      tagName:start[1],
      attrs:[]
    }
    advance(start[0].length)
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
  console.log(root)
  return root
}
export function compilrToFunction(el){
  let ast = parseHTML(el)
}
