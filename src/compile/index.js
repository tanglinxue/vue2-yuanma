
const ncname = `[a-zA-Z_][\\-\\.0-9_a-zA-Z]*`;   // 标签名称
const qnameCapture = `((?:${ncname}\\:)?${ncname})`; //<span:xx>
const startTagOpen = new RegExp(`^<${qnameCapture}`); // 标签开头的正则 捕获的内容是标签名
const endTag = new RegExp(`^<\\/${qnameCapture}[^>]*>`); // 匹配标签结尾的 </div>
const attribute = /^\s*([^\s"'<>\/=]+)(?:\s*(=)\s*(?:"([^"]*)"+|'([^']*)'+|([^\s"'=<>`]+)))?/; // 匹配属性的
//<div id="app"></div>
const startTagClose = /^\s*(\/?)>/; // 匹配标签结束的 >
const defaultTagRE = /\{\{((?:.|\r?\n)+?)\}\}/g // {{}}

function start(tag,attrs){
  console.log(tag,attrs,'开始的标签')
}

function charts(text){
  console.log(text,'文本')
}
function end(tag){
  console.log(tag,'结束标签')
}
function parseHTML(html){
  while(html){
    let textEnd = html.indexOf('<')
    if(textEnd === 0){
      let endTagMatch = html.match(endTag)
      console.log(endTagMatch)
      if(endTagMatch){
        
      } else{
        const startTagMatch = parseStartTag()
        start(startTagMatch.tagName,startTagMatch.attrs)
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
    break
  }
  function parseStartTag(){
    const start = html.match(startTagOpen)
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
}
export function compilrToFunction(el){
  let ast = parseHTML(el)
}
