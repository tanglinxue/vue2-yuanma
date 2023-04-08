(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.Vue = factory());
})(this, (function () { 'use strict';

  function _iterableToArrayLimit(arr, i) {
    var _i = null == arr ? null : "undefined" != typeof Symbol && arr[Symbol.iterator] || arr["@@iterator"];
    if (null != _i) {
      var _s,
        _e,
        _x,
        _r,
        _arr = [],
        _n = !0,
        _d = !1;
      try {
        if (_x = (_i = _i.call(arr)).next, 0 === i) {
          if (Object(_i) !== _i) return;
          _n = !1;
        } else for (; !(_n = (_s = _x.call(_i)).done) && (_arr.push(_s.value), _arr.length !== i); _n = !0);
      } catch (err) {
        _d = !0, _e = err;
      } finally {
        try {
          if (!_n && null != _i.return && (_r = _i.return(), Object(_r) !== _r)) return;
        } finally {
          if (_d) throw _e;
        }
      }
      return _arr;
    }
  }
  function ownKeys(object, enumerableOnly) {
    var keys = Object.keys(object);
    if (Object.getOwnPropertySymbols) {
      var symbols = Object.getOwnPropertySymbols(object);
      enumerableOnly && (symbols = symbols.filter(function (sym) {
        return Object.getOwnPropertyDescriptor(object, sym).enumerable;
      })), keys.push.apply(keys, symbols);
    }
    return keys;
  }
  function _objectSpread2(target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = null != arguments[i] ? arguments[i] : {};
      i % 2 ? ownKeys(Object(source), !0).forEach(function (key) {
        _defineProperty(target, key, source[key]);
      }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) {
        Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
      });
    }
    return target;
  }
  function _typeof(obj) {
    "@babel/helpers - typeof";

    return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) {
      return typeof obj;
    } : function (obj) {
      return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
    }, _typeof(obj);
  }
  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }
  function _defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor);
    }
  }
  function _createClass(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties(Constructor.prototype, protoProps);
    if (staticProps) _defineProperties(Constructor, staticProps);
    Object.defineProperty(Constructor, "prototype", {
      writable: false
    });
    return Constructor;
  }
  function _defineProperty(obj, key, value) {
    key = _toPropertyKey(key);
    if (key in obj) {
      Object.defineProperty(obj, key, {
        value: value,
        enumerable: true,
        configurable: true,
        writable: true
      });
    } else {
      obj[key] = value;
    }
    return obj;
  }
  function _slicedToArray(arr, i) {
    return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();
  }
  function _arrayWithHoles(arr) {
    if (Array.isArray(arr)) return arr;
  }
  function _unsupportedIterableToArray(o, minLen) {
    if (!o) return;
    if (typeof o === "string") return _arrayLikeToArray(o, minLen);
    var n = Object.prototype.toString.call(o).slice(8, -1);
    if (n === "Object" && o.constructor) n = o.constructor.name;
    if (n === "Map" || n === "Set") return Array.from(o);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
  }
  function _arrayLikeToArray(arr, len) {
    if (len == null || len > arr.length) len = arr.length;
    for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];
    return arr2;
  }
  function _nonIterableRest() {
    throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }
  function _toPrimitive(input, hint) {
    if (typeof input !== "object" || input === null) return input;
    var prim = input[Symbol.toPrimitive];
    if (prim !== undefined) {
      var res = prim.call(input, hint || "default");
      if (typeof res !== "object") return res;
      throw new TypeError("@@toPrimitive must return a primitive value.");
    }
    return (hint === "string" ? String : Number)(input);
  }
  function _toPropertyKey(arg) {
    var key = _toPrimitive(arg, "string");
    return typeof key === "symbol" ? key : String(key);
  }

  //重新写数组
  //(1) 获取原来的数组方法
  var oldArrayProtoMethods = Array.prototype;

  //（2）继承
  var ArrayMethods = Object.create(oldArrayProtoMethods);
  var methods = ['push', 'pop', 'unshift', 'shift', 'splice', 'reverse', 'sort'];
  methods.forEach(function (item) {
    ArrayMethods[item] = function () {
      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }
      var result = oldArrayProtoMethods[item].apply(this, args);
      var inserted;
      switch (item) {
        case 'push':
        case 'unshift':
          inserted = args;
          break;
        case 'splice':
          inserted = args.splice(2);
      }
      var ob = this.__ob__;
      if (inserted) {
        ob.observeArray(inserted);
      }
      ob.dep.notify();
      return result;
    };
  });

  var id$1 = 0;
  var Dep = /*#__PURE__*/function () {
    function Dep() {
      _classCallCheck(this, Dep);
      this.id = id$1++;
      this.subs = [];
    }
    _createClass(Dep, [{
      key: "depend",
      value: function depend() {
        Dep.targer.addDep(this);
      }
    }, {
      key: "addSub",
      value: function addSub(watcher) {
        this.subs.push(watcher);
      }
      //更新
    }, {
      key: "notify",
      value: function notify() {
        this.subs.forEach(function (watcher) {
          watcher.updata();
        });
      }
    }]);
    return Dep;
  }();
  Dep.targer = null;
  function pushTarget(watcher) {
    Dep.targer = watcher;
  }
  function popTarget() {
    Dep.targer = null;
  }

  function observer(data) {
    if (_typeof(data) != 'object' || data == null) {
      return;
    }
    return new Observer(data);
  }
  var Observer = /*#__PURE__*/function () {
    function Observer(value) {
      _classCallCheck(this, Observer);
      Object.defineProperty(value, '__ob__', {
        enumerable: false,
        value: this
      });
      this.dep = new Dep();
      //判断数据
      if (Array.isArray(value)) {
        value.__proto__ = ArrayMethods;
        this.observeArray(value);
      } else {
        this.walk(value);
      }
    }
    _createClass(Observer, [{
      key: "observeArray",
      value: function observeArray(value) {
        for (var i = 0; i < value.length; i++) {
          observer(value[i]);
        }
      }
    }, {
      key: "walk",
      value: function walk(data) {
        var keys = Object.keys(data);
        for (var i = 0; i < keys.length; i++) {
          var key = keys[i];
          var value = data[key];
          defineReactive(data, key, value);
        }
      }
    }]);
    return Observer;
  }();
  function defineReactive(data, key, value) {
    var childDep = observer(value);
    //1给我们的每个属性添加一个dep
    var dep = new Dep();
    //2将dep 存放起来，当页面取值时，说明这个值用来渲染，在将这个watcher和这个属性对应起来
    Object.defineProperty(data, key, {
      get: function get() {
        if (Dep.targer) {
          dep.depend();
          if (childDep) {
            childDep.dep.depend();
          }
        }
        // 收集依赖
        return value;
      },
      set: function set(newValue) {
        if (newValue === value) return;
        value = newValue;
        observer(value);
        dep.notify();
      }
    });
  }

  var callback = [];
  var pending$1 = false;
  function flush() {
    callback.forEach(function (cb) {
      return cb();
    });
    pending$1 = false;
  }
  var timerFunc;
  //处理兼容问题
  if (Promise) {
    timerFunc = function timerFunc() {
      Promise.resolve().then(flush);
    };
  } else if (MutationObserver) {
    //h5 异步方法 他可以监听 DOM 变化 ，监控完毕之后在来异步更新
    var observe = new MutationObserver(flush);
    var textNode = document.createTextNode(1);
    observe.observe(textNode, {
      characterData: true
    });
    timerFunc = function timerFunc() {
      textNode.textContent = 2;
    };
  } else if (setImmediate) {
    timerFunc = function timerFunc() {
      setImmediate(flush);
    };
  }
  function nextTick(cb) {
    callback.push(cb);
    if (!pending$1) {
      timerFunc();
      pending$1 = true;
    }
  }

  function initState(vm) {
    var opts = vm.$options;
    if (opts.props) ;
    if (opts.data) {
      initData(vm);
    }
    if (opts.watch) {
      initWatch(vm);
    }
    if (opts.computed) ;
    if (opts.methods) ;
  }
  function initData(vm) {
    var data = vm.$options.data;
    data = vm._data = typeof data === 'function' ? data.call(vm) : data;
    observer(data);
    for (var key in data) {
      proxy(vm, '_data', key);
    }
  }
  function proxy(vm, source, key) {
    Object.defineProperty(vm, key, {
      get: function get() {
        return vm[source][key];
      },
      set: function set(newValue) {
        vm[source][key] = newValue;
      }
    });
  }
  function initWatch(vm) {
    var watch = vm.$options.watch;
    var _loop = function _loop(key) {
      var handler = watch[key];
      if (Array.isArray(handler)) {
        handler.forEach(function (item) {
          createWatcher(vm, key, item);
        });
      } else {
        createWatcher(vm, key, handler);
      }
    };
    for (var key in watch) {
      _loop(key);
    }
  }
  function createWatcher(vm, exprOrfn, handler, options) {
    if (_typeof(handler) === 'object') {
      options = handler; //用户的配置项目
      handler = handler.handler; //这个是一个函数
    }

    if (typeof handler === 'string') {
      handler = vm[handler]; //将实例行的方法作为 handler 方法代理和data 一样
    }

    return vm.$watch(vm, exprOrfn, handler, options);
  }
  function stateMixin(Vue) {
    //列队 :1就是vue自己的nextTick  2用户自己的
    Vue.prototype.$nextTick = function (cb) {
      //nextTick: 数据更新之后获取到最新的DOM
      nextTick(cb);
    };
    vm.prototype.$watch = function (Vue, exprOrfn, handler) {
      var options = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};
      new Watcher(Vue, exprOrfn, handler, _objectSpread2(_objectSpread2({}, options), {}, {
        user: true
      }));
      if (options.immediate) {
        handler.call(Vue);
      }
    };
  }

  var ncname = "[a-zA-Z_][\\-\\.0-9_a-zA-Z]*"; // 标签名称
  var qnameCapture = "((?:".concat(ncname, "\\:)?").concat(ncname, ")"); //<span:xx>
  var startTagOpen = new RegExp("^<".concat(qnameCapture)); // 标签开头的正则 捕获的内容是标签名
  var endTag = new RegExp("^<\\/".concat(qnameCapture, "[^>]*>")); // 匹配标签结尾的 </div>
  var attribute = /^\s*([^\s"'<>\/=]+)(?:\s*(=)\s*(?:"([^"]*)"+|'([^']*)'+|([^\s"'=<>`]+)))?/; // 匹配属性的
  //<div id="app"></div>
  var startTagClose = /^\s*(\/?)>/; // 匹配标签结束的 >

  //创建ast语法树
  function createASTElement(tag, attrs) {
    return {
      tag: tag,
      //标签名称
      attrs: attrs,
      children: [],
      type: 1,
      parent: null
    };
  }
  var root; //根元素
  var createParent;
  var stack = [];
  function start(tag, attrs) {
    //开始标签
    //console.log(tag,'开始标签')
    var element = createASTElement(tag, attrs);
    if (!root) {
      root = element;
    }
    createParent = element;
    stack.push(element);
  }
  function charts(text) {
    //console.log(text,'文本')
    text = text.replace(/\s/g, '');
    if (text) {
      createParent.children.push({
        type: 3,
        text: text
      });
    }
  }
  function end(tag) {
    //console.log(tag,'结束标签')
    var element = stack.pop();
    createParent = stack[stack.length - 1];
    if (createParent) {
      //元素的关闭
      element.parent = createParent.tag;
      createParent.children.push(element);
    }
  }
  function parseHTML(html) {
    while (html) {
      // html  为空结束
      var textEnd = html.indexOf('<');
      if (textEnd === 0) {
        //（1） 开始标签
        var startTagMatch = parseStartTag();
        if (startTagMatch) {
          start(startTagMatch.tagName, startTagMatch.attrs);
          continue;
        }
        //结束标签 
        var endTagMatch = html.match(endTag);
        if (endTagMatch) {
          advance(endTagMatch[0].length);
          end(endTagMatch[0]);
          continue;
        }
      }
      //文本
      var text = void 0;
      if (textEnd > 0) {
        //获取文本内容
        text = html.substring(0, textEnd);
      }
      if (text) {
        advance(text.length);
        charts(text);
      }
    }
    function parseStartTag() {
      var start = html.match(startTagOpen);
      if (!start) return;

      //创建ast 语法树
      var match = {
        tagName: start[1],
        attrs: []
      };
      //删除 开始标签
      advance(start[0].length);
      //属性
      //注意  多个 遍历
      //注意 >
      var attr;
      var end;
      while (!(end = html.match(startTagClose)) && (attr = html.match(attribute))) {
        match.attrs.push({
          name: attr[1],
          value: attr[3] || attr[4] || attr[5]
        });
        advance(attr[0].length);
      }
      if (end) {
        advance(end[0].length);
        return match;
      }
    }
    function advance(n) {
      html = html.substring(n);
    }
    return root;
  }

  var defaultTagRE = /\{\{((?:.|\r?\n)+?)\}\}/g; // {{}}
  function genProps(attrs) {
    var str = '';
    var _loop = function _loop() {
      var attr = attrs[i];
      if (attr.name === 'style') {
        var obj = {};
        attr.value.split(';').forEach(function (item) {
          var _item$split = item.split(':'),
            _item$split2 = _slicedToArray(_item$split, 2),
            key = _item$split2[0],
            value = _item$split2[1];
          obj[key] = value;
        });
        attr.value = obj;
      }
      str += "".concat(attr.name, ":").concat(JSON.stringify(attr.value), ",");
    };
    for (var i = 0; i < attrs.length; i++) {
      _loop();
    }
    return "{".concat(str.slice(0, -1), "}");
  }
  //判断是否有儿子
  function getChildren(el) {
    var children = el.children;
    if (children) {
      return children.map(function (child) {
        return gen(child);
      }).join(',');
    }
  }
  function gen(node) {
    //获取到的元素
    //注意 是什么类型  文本   div
    if (node.type === 1) {
      //return generate(node)//生成元素节点的字符串
      return generate(node);
    } else {
      var text = node.text; // 获取文本  注意  普通的文本  hello{{name}}?{{num}}
      if (!defaultTagRE.test(text)) {
        return "_v(".concat(JSON.stringify(text), ")");
      }
      var tokens = []; //存放每一段的代码
      var lastIndex = defaultTagRE.lastIndex = 0; //如果正则是全局模式 需要每次使用前变为0
      var match; // 每次匹配到的结果  exec 获取 {{name}}
      while (match = defaultTagRE.exec(text)) {
        var index = match.index;
        if (index > lastIndex) {
          tokens.push(JSON.stringify(text.slice(lastIndex, index)));
        }
        tokens.push("_s(".concat(match[1].trim(), ")"));
        lastIndex = index + match[0].length;
      }
      if (lastIndex < text.length) {
        tokens.push(JSON.stringify(text.slice(lastIndex)));
      }
      return "_v(".concat(tokens.join("+"), ")");
    }
  }
  //语法层面的转移
  function generate(el) {
    var children = getChildren(el);
    //方法 拼接字符串  源码也是这样操作 [{}]    ${el.attrs.length?`{style:{color:red}}`:'undefined'}
    var code = "_c('".concat(el.tag, "',").concat(el.attrs.length ? "".concat(genProps(el.attrs)) : 'undefined').concat(children ? ",".concat(children) : '', ")");
    return code;
  }

  function compilrToFunction(el) {
    //1 将html 变成ast 语法树
    var ast = parseHTML(el);
    //2 ast 语法树变成 render 函数  （1） ast 语法树变成 字符串  （2）字符串变成函数 
    var code = generate(ast);
    var render = new Function("with(this){return ".concat(code, "}"));
    return render;
  }

  function patch(oldVnode, vnode) {
    var el = createEl(vnode);
    var parentEl = oldVnode.parentNode;
    parentEl.insertBefore(el, oldVnode.nextsibling);
    parentEl.removeChild(oldVnode);
    return el;
  }
  function createEl(vnode) {
    var tag = vnode.tag,
      children = vnode.children;
      vnode.key;
      vnode.data;
      var text = vnode.text;
    if (typeof tag === 'string') {
      vnode.el = document.createElement(tag);
      if (children.length > 0) {
        children.forEach(function (child) {
          vnode.el.appendChild(createEl(child));
        });
      }
    } else {
      vnode.el = document.createTextNode(text);
    }
    return vnode.el;
  }

  //为什么封装成一个类 ，方便我们的扩展
  var id = 0; //全局的
  var Watcher$1 = /*#__PURE__*/function () {
    function Watcher(vm, exprOrfn, cb, options) {
      _classCallCheck(this, Watcher);
      this.vm = vm;
      this.exprOrfn = exprOrfn;
      this.cb = cb;
      this.options = options;
      // 2. 每一组件只有一个watcher 他是为标识
      this.id = id++;
      this.deps = [];
      this.depsId = new Set();
      if (typeof exprOrfn === 'function') {
        this.getter = exprOrfn;
      } else {
        this.getter = function () {
          var path = exprOrfn.split('.');
          var obj = vm;
          for (var i = 0; i < path.length; i++) {
            obj = obj[path[i]];
          }
          return obj;
        };
      }
      this.get();
    }
    _createClass(Watcher, [{
      key: "addDep",
      value: function addDep(dep) {
        var id = dep.id;
        if (!this.depsId.has(id)) {
          this.deps.push(dep);
          this.depsId.add(id);
          dep.addSub(this);
        }
      }
    }, {
      key: "run",
      value: function run() {
        this.get();
      }
    }, {
      key: "get",
      value: function get() {
        pushTarget(this); //当前的实例添加
        this.getter(); //渲染页面 vm._updata()
        popTarget(); //删除当前的实例 这两个方法放在 dep 中
      }
    }, {
      key: "updata",
      value: function updata() {
        //this.getter()
        queueWatcher(this);
      }
    }]);
    return Watcher;
  }();
  var queue = [];
  var has = {};
  var pending = false;
  function flushWatcher() {
    queue.forEach(function (item) {
      item.run();
      item.cb();
    });
    queue = [];
    has = {};
    pending = false;
  }
  function queueWatcher(watcher) {
    var id = watcher.id;
    if (has[id] == null) {
      has[id] = true;
      queue.push(watcher);
      if (!pending) {
        nextTick(flushWatcher);
      }
      pending = true;
    }
  }

  //nextTick 原理

  //优化

  function mountComponent(vm, el) {
    //源码方式
    callHook(vm, 'beforeMount');
    var updataComponent = function updataComponent() {
      vm._update(vm._render());
    };
    new Watcher$1(vm, updataComponent, function () {
      callHook(vm, 'updated');
    }, true);
    callHook(vm, 'mounted');
  }
  function lifecycleMixin(Vue) {
    Vue.prototype._update = function (vnode) {
      console.log(vnode);
      var vm = this;
      vm.$el = patch(vm.$el, vnode);
    };
  }
  function callHook(vm, hook) {
    var handlers = vm.$options[hook];
    if (handlers) {
      for (var i = 0; i < handlers.length; i++) {
        handlers[i].call(vm);
      }
    }
  }

  var HOOKS = ["beforeCreate", "created", "beforeMount", "mounted", "beforeUpdate", "updated", "beforeDestory", "destroyed"];
  // 策略模式
  var starts = {};
  starts.data = function (parentVal, childVal) {
    return childVal;
  };
  // starts.computed = function(){

  // }
  // starts.watch = function(){

  // }
  // starts.methods = function(){

  // }

  function mergeHook(parentVal, childVal) {
    //生命周期的合并
    if (childVal) {
      if (parentVal) {
        return parentVal.concat(childVal);
      } else {
        return [childVal];
      }
    } else {
      return parentVal;
    }
  }
  HOOKS.forEach(function (hooks) {
    starts[hooks] = mergeHook;
  });
  function mergeOptions(parent, child) {
    var options = {};
    //遍历父亲：可能是父亲有，儿子没有
    for (var key in parent) {
      //父亲和儿子都有在这里进行处理
      mergeField(key);
    }
    //儿子有父亲没有
    for (var _key in child) {
      //将儿子多的赋值到父亲上
      if (!parent.hasOwnProperty(_key)) {
        mergeField(_key);
      }
    }
    function mergeField(key) {
      if (starts[key]) {
        options[key] = starts[key](parent[key], child[key]);
      } else {
        options[key] = child[key];
      }
    }
    return options;
  }

  function initMixin(Vue) {
    Vue.prototype._init = function (options) {
      var vm = this;
      vm.$options = mergeOptions(Vue.options, options); // 需要将用户自定义的options 合并 谁和谁合并
      callHook(vm, 'beforeCreated');
      initState(vm);
      callHook(vm, 'created');
      if (vm.$options.el) {
        vm.$mount(vm.$options.el);
      }
    };
    Vue.prototype.$mount = function (el) {
      var vm = this;
      el = document.querySelector(el); //获取元素
      vm.$el = el;
      var options = vm.$options;
      if (!options.render) {
        //没有
        var template = options.template;
        if (!template && el) {
          //获取html
          el = el.outerHTML;
          //变成ast语法树
          var render = compilrToFunction(el);
          options.render = render;
        }
      }
      // 挂载组件
      mountComponent(vm);
    };
  }

  function renderMixin(Vue) {
    Vue.prototype._c = function () {
      return createElement.apply(void 0, arguments);
    };
    Vue.prototype._v = function (text) {
      return createText(text);
    };
    Vue.prototype._s = function (val) {
      //变量
      return val === null ? '' : _typeof(val) === 'object' ? JSON.stringify(val) : val;
    };
    Vue.prototype._render = function () {
      var vm = this;
      var render = vm.$options.render;
      var vnode = render.call(this);
      return vnode;
    };
  }
  function createElement(tag) {
    var data = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    for (var _len = arguments.length, children = new Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
      children[_key - 2] = arguments[_key];
    }
    return vnode(tag, data, data.key, children);
  }
  function createText(text) {
    return vnode(undefined, undefined, undefined, undefined, text);
  }
  function vnode(tag, data, key, children, text) {
    return {
      tag: tag,
      data: data,
      key: key,
      children: children,
      text: text
    };
  }

  function initGlobApi(Vue) {
    // 源码当中 你所有定义的全局方法都是 放在
    Vue.options = {};
    Vue.mixin = function (mixin) {
      //实现合并 就是合并对象 （我先考虑生命周期）不考虑其他的合并 data,computed watch
      this.options = mergeOptions(this.options, mixin);
    };
  }

  function Vue(options) {
    this._init(options);
  }
  initMixin(Vue);
  lifecycleMixin(Vue);
  renderMixin(Vue);
  stateMixin(Vue);
  initGlobApi(Vue);

  return Vue;

}));
//# sourceMappingURL=vue.js.map
