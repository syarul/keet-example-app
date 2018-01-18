// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles

// eslint-disable-next-line no-global-assign
require = (function (modules, cache, entry) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof require === "function" && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof require === "function" && require;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }
      
      localRequire.resolve = resolve;

      var module = cache[name] = new newRequire.Module;

      modules[name][0].call(module.exports, localRequire, module, module.exports);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module() {
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;

  for (var i = 0; i < entry.length; i++) {
    newRequire(entry[i]);
  }

  // Override the current require with this new one
  return newRequire;
})({12:[function(require,module,exports) {
"use strict";

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

module.exports = function (argv) {
  var cop = function cop(v) {
    var o = {};
    if ((typeof v === "undefined" ? "undefined" : _typeof(v)) !== 'object') {
      o.copy = v;
      return o.copy;
    } else {
      for (var attr in v) {
        o[attr] = v[attr];
      }
    }
    return o;
  };
  return Array.isArray(argv) ? argv.map(function (v) {
    return v;
  }) : cop(argv);
};
},{}],13:[function(require,module,exports) {
"use strict";

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

module.exports = function () {
  function ktag(tag, value, attributes, styles) {
    var attr,
        idx,
        te,
        a = [].slice.call(arguments),
        ret = ['<', a[0], '>', a[1], '</', a[0], '>'];
    if (a.length > 2 && _typeof(a[2]) === 'object') {
      for (attr in a[2]) {
        if (typeof a[2][attr] === 'boolean' && a[2][attr]) ret.splice(2, 0, ' ', attr);else if (attr === 'class' && Array.isArray(a[2][attr])) ret.splice(2, 0, ' ', attr, '="', a[2][attr].join(' ').trim(), '"');else ret.splice(2, 0, ' ', attr, '="', a[2][attr], '"');
      }
    }
    if (a.length > 3 && _typeof(a[3]) === 'object') {
      idx = ret.indexOf('>');
      te = [idx, 0, ' style="'];
      for (attr in a[3]) {
        te.push(attr);
        te.push(':');
        te.push(a[3][attr]);
        te.push(';');
      }
      te.push('"');
      ret.splice.apply(ret, te);
    }
    return ret;
  }
  var args = [].slice.call(arguments),
      arr = ktag.apply(null, args);
  return arr.join('');
};
},{}],11:[function(require,module,exports) {
/** 
 * Keet.js v2.2.5 Alpha release: https://github.com/syarul/keet
 * A solution to write clean interface for web application
 *
 * <<<<<<<<<<<<<<<<<<<<<<<<<<<<<< Keet.js >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
 *
 * Copyright 2018, Shahrul Nizam Selamat
 * Released under the MIT License.
 */
'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var copy = require('./copy');
var tag = require('./tag');

module.exports = Keet;

function Keet(tagName, context) {
  var ctx = this,
      argv = [].slice.call(arguments),
      context = argv.filter(function (c) {
    return (typeof c === "undefined" ? "undefined" : _typeof(c)) === 'object';
  })[0],
      getId = function getId(id) {
    return document.getElementById(id);
  },
      testEval = function testEval(ev) {
    try {
      return eval(ev);
    } catch (e) {
      return false;
    }
  },
      genElement = function genElement(child) {
    var tempDiv = document.createElement('div');
    var cloneChild = copy(child);
    delete cloneChild.template;
    delete cloneChild.tag;
    delete cloneChild.style;
    delete cloneChild.__ref__;
    for (var attr in cloneChild) {
      if (typeof cloneChild[attr] === 'function') {
        delete cloneChild[attr];
      }
    }
    var s = child.tag ? tag(child.tag, child.template ? child.template : '', cloneChild, child.style) : child.template;
    tempDiv.innerHTML = s;
    if (child.tag === 'input') {
      if (child.checked) tempDiv.childNodes[0].checked = true;else tempDiv.childNodes[0].removeAttribute('checked');
    }
    process_event(tempDiv);
    return tempDiv.childNodes[0];
  },
      parseStr = function parseStr(appObj, watch) {
    if ((typeof appObj === "undefined" ? "undefined" : _typeof(appObj)) != 'object') throw new Error('instance is not an object');
    var str = appObj.template,
        childs = str.match(/{{([^{}]+)}}/g, '$1'),
        regc,
        child,
        tempDiv,
        elemArr = [];

    if (childs) {

      if (Array.isArray(appObj.list)) {
        var arrProps = str.match(/{{([^{}]+)}}/g, '$1'),
            tmplStr = '',
            tmpl;
        appObj.list.forEach(function (r) {
          tmpl = str;
          arrProps.forEach(function (s) {
            var rep = s.replace(/{{([^{}]+)}}/g, '$1');
            tmpl = tmpl.replace(/{{([^{}]+)}}/, r[rep]);
          });
          tempDiv = document.createElement('div');
          tempDiv.innerHTML = tmpl;
          process_event(tempDiv);
          elemArr.push(tempDiv.childNodes[0]);
        });
        watcher3(appObj.list);
      } else {
        childs.forEach(function (c, index) {
          regc = c.replace(/{{([^{}]+)}}/g, '$1');
          // skip tags which not being declared yet
          if (context) {
            // check closure object
            child = context[regc] ? context[regc] : false;
          } else {
            // check if current  objectr has prop
            child = appObj[regc];
            // check global object
            if (!child) child = testEval(regc);
          }
          if (child && (typeof child === "undefined" ? "undefined" : _typeof(child)) === 'object') {
            var newElement = genElement(child);
            elemArr.push(newElement);
          } else if (!child) {
            tempDiv = document.createElement('div');
            tempDiv.innerHTML = c;
            process_event(tempDiv);
            elemArr.push(tempDiv.childNodes[0]);
          }

          // watch object state
          if (watch && child) {
            watcher(child, index);
          }
        });
      }
    } else {
      tempDiv = document.createElement('div');
      tempDiv.innerHTML = str;
      process_event(tempDiv);
      elemArr.push(tempDiv.childNodes[0]);
      watcher2(appObj);
    }
    return elemArr;
  };

  var process_event = function process_event(kNode) {
    var listKnodeChild = [],
        hask,
        evtName,
        evthandler,
        handler,
        isHandler,
        argv,
        i,
        atts,
        v,
        rem = [];
    loopChilds(listKnodeChild, kNode);
    listKnodeChild.forEach(function (c) {
      if (c.nodeType === 1 && c.hasAttributes()) {
        var next = function next() {
          atts = c.attributes;
          if (i < atts.length) {
            hask = /^k-/.test(atts[i].nodeName);
            if (hask) {
              evtName = atts[i].nodeName.split('-')[1];
              evthandler = atts[i].nodeValue;
              handler = evthandler.split('(');
              isHandler = testEval(ctx.base[handler[0]]);
              if (typeof isHandler === 'function') {
                rem.push(atts[i].nodeName);
                argv = [];
                v = handler[1].slice(0, -1).split(',').filter(function (f) {
                  return f != '';
                });
                if (v.length) v.forEach(function (v) {
                  argv.push(v);
                });

                c.addEventListener(evtName, isHandler.bind.apply(isHandler, [c].concat(argv)), false);
              }
            }
            i++;
            next();
          } else {
            rem.map(function (f) {
              c.removeAttribute(f);
            });
          }
        };

        i = 0;

        next();
      }
    });
    listKnodeChild = [];
  };

  this.vdom = function () {
    var ele = getId(ctx.el);
    if (ele) return ele;
  };

  this.flush = function (component) {
    var ele = getId(component) || getId(ctx.el);
    if (ele) ele.innerHTML = '';
    return this;
  };

  /**
  * render component to DOM
  */

  this.render = function () {
    var ele = getId(ctx.el);
    if (!ele) {
      // throw new Error('cannot find DOM with id: '+ctx.el+' skip rendering..')
      console.warn('cannot find DOM with id: ' + ctx.el + ' skip rendering..');
    }
    if (context) ctx.base = context;
    var elArr = parseStr(ctx.base, true);
    for (var i = 0; i < elArr.length; i++) {
      ele.appendChild(elArr[i]);

      if (i === elArr.length - 1) {
        document.addEventListener('_loaded', window._loaded && typeof window._loaded === 'function' ? window._loaded(ctx.el) : null, false);
      }
    }
  };

  this.update = function (appObj) {
    var ele = getId(ctx.el);
    var elArr = parseStr(appObj, true);
    ele.innerHTML = '';
    for (var i = 0; i < elArr.length; i++) {
      ele.appendChild(elArr[i]);
      if (i === elArr.length - 1) {
        document.addEventListener('_update', window._update && typeof window._update === 'function' ? window._update(ctx.el) : null, false);
      }
    }
  };

  var watcher = function watcher(instance, index) {
    var obj, attr, attr2, ele, copyInstance, newElem;
    for (attr in instance) {
      instance.watch(attr, function (idx, o, n) {
        for (attr2 in instance) {
          instance.unwatch(attr2);
        }
        obj = {};
        obj[idx] = n;
        ele = getId(ctx.el);
        Object.assign(instance, obj);
        newElem = genElement(instance);
        updateElem(ele.childNodes[index], newElem);
        watcher(instance, index);
      });
    }
  };

  var watcher2 = function watcher2(instance) {
    var obj, attr, attr2, ele, copyInstance, newElem;
    for (attr in instance) {
      instance.watch(attr, function (idx, o, n) {
        for (attr2 in instance) {
          instance.unwatch(attr2);
        }
        obj = {};
        obj[idx] = n;
        ele = getId(ctx.el);
        Object.assign(instance, obj);
        newElem = genElement(instance);
        updateElem(ele, newElem, true);
        watcher2(instance);
      });
    }
  };

  var watcher3 = function watcher3(instance) {
    var pristineLen = copy(instance),
        opsList,
        op,
        query;

    opsList = function opsList() {
      return ['push', 'pop', 'shift', 'unshift', 'splice', 'update'];
    };

    op = opsList();

    query = function query(ops, argvs) {
      op = [];
      if (ops === 'push') arrProtoPush(argvs[0]);else if (ops === 'pop') arrProtoPop();else if (ops === 'shift') arrProtoShift();else if (ops === 'unshift') arrProtoUnShift.apply(null, argvs);else if (ops === 'splice') arrProtoSplice.apply(null, argvs);else arrProtoUpdate.apply(null, argvs);
      op = opsList();
      pristineLen = copy(instance);
    };

    op.forEach(function (f, i, r) {
      instance[f] = function () {
        var fargv = [].slice.call(arguments);
        // if(!pristineLen[fargv[0]]) return false
        if (f === 'update') fargv[1] = Object.assign(pristineLen[fargv[0]], fargv[1]);
        Array.prototype[f].apply(this, fargv);
        //propagate splice with single arguments
        if (fargv.length === 1 && f === 'splice') fargv.push(pristineLen.length - fargv[0]);
        query(f, fargv);
      };
    });
  };

  var arrProtoPush = function arrProtoPush(newObj) {
    var ele = getId(ctx.el);
    ele.appendChild(genTemplate(newObj));
  };

  var arrProtoPop = function arrProtoPop() {
    var ele = getId(ctx.el);
    ele.removeChild(ele.lastChild);
  };

  var arrProtoShift = function arrProtoShift() {
    var ele = getId(ctx.el);
    ele.removeChild(ele.firstChild);
  };

  var arrProtoUnShift = function arrProtoUnShift() {
    var argv = [].slice.call(arguments);
    var ele = getId(ctx.el);
    var i = argv.length - 1;
    while (i > -1) {
      ele.insertBefore(genTemplate(argv[i]), ele.firstChild);
      i--;
    }
  };

  var arrProtoSplice = function arrProtoSplice() {
    var ele = getId(ctx.el),
        childLen,
        len,
        i,
        j,
        k,
        c,
        tempDivChildLen,
        tempDiv,
        argv = [].slice.call(arguments),
        start = [].shift.call(argv),
        count = [].shift.call(argv);
    tempDiv = document.createElement('div');
    if (argv.length) {
      i = 0;
      while (i < argv.length) {
        tempDiv.appendChild(genTemplate(argv[i]));
        i++;
      }
    }
    childLen = copy(ele.childNodes.length);
    tempDivChildLen = copy(tempDiv.childNodes.length);
    if (count && count > 0) {
      for (i = start; i < childLen + 1; i++) {
        len = start + count;
        if (i < len) {
          ele.removeChild(ele.childNodes[start]);
          if (i === len - 1 && tempDivChildLen > 0) {
            c = start - 1;
            for (j = start; j < tempDivChildLen + start; j++) {
              insertAfter(tempDiv.childNodes[0], ele.childNodes[c], ele);
              c++;
            }
          }
        }
      }
    } else if (argv.length) {
      c = start - 1;
      for (k = start; k < tempDivChildLen + start; k++) {
        insertAfter(tempDiv.childNodes[0], ele.childNodes[c], ele);
        c++;
      }
    }
  };

  var arrProtoUpdate = function arrProtoUpdate() {
    var argv = [].slice.call(arguments),
        ele = getId(ctx.el),
        index = [].shift.call(argv);

    if (argv.length == 2 && typeof argv[1] == 'number') {
      updateElem(ele.childNodes[index + argv[1]], genTemplate(argv[0]));
    } else {
      updateElem(ele.childNodes[index], genTemplate(argv[0]));
    }
  };

  var genTemplate = function genTemplate(obj) {
    var arrProps = ctx.base.template.match(/{{([^{}]+)}}/g, '$1'),
        tmpl,
        tempDiv,
        ele;
    tmpl = ctx.base.template;
    arrProps.forEach(function (s) {
      var rep = s.replace(/{{([^{}]+)}}/g, '$1');
      tmpl = tmpl.replace(/{{([^{}]+)}}/, obj[rep]);
    });
    tempDiv = document.createElement('div');
    tempDiv.innerHTML = tmpl;
    process_event(tempDiv);
    return tempDiv.childNodes[0];
  };

  var loopChilds = function loopChilds(arr, elem) {
    for (var child = elem.firstChild; child !== null; child = child.nextSibling) {
      arr.push(child);
      if (child.hasChildNodes()) {
        loopChilds(arr, child);
      }
    }
  };

  var insertAfter = function insertAfter(newNode, referenceNode, parentNode) {
    referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
  };

  var nodeUpdate = function nodeUpdate(newNode, oldNode, watcher2) {
    if (!newNode) return false;
    var oAttr = newNode.attributes;
    var output = {};
    if (oAttr) {
      for (var i = oAttr.length - 1; i >= 0; i--) {
        output[oAttr[i].name] = oAttr[i].value;
      }
    }
    for (var iAttr in output) {
      if (oldNode.attributes[iAttr] && oldNode.attributes[iAttr].name === iAttr && oldNode.attributes[iAttr].value != output[iAttr]) {
        oldNode.setAttribute(iAttr, output[iAttr]);
      }
    }
    if (oldNode.textContent === '' && newNode.textContent) {
      oldNode.textContent = newNode.textContent;
    }
    if (watcher2 && oldNode.textContent != newNode.textContent) {
      oldNode.textContent = newNode.textContent;
    }
    if (oldNode.type == 'checkbox' && !oldNode.checked && newNode.checked) {
      oldNode.checked = true;
    }
    if (oldNode.type == 'checkbox' && oldNode.checked && !newNode.checked) {
      oldNode.checked = false;
    }
    output = {};
  };

  var nodeUpdateHTML = function nodeUpdateHTML(newNode, oldNode) {
    if (!newNode) return false;
    if (newNode.nodeValue !== oldNode.nodeValue) oldNode.nodeValue = newNode.nodeValue;
  };

  var updateElem = function updateElem(oldElem, newElem, watcher2) {
    var oldArr = [],
        newArr = [];
    oldArr.push(oldElem);
    newArr.push(newElem);
    loopChilds(oldArr, oldElem);
    loopChilds(newArr, newElem);
    oldArr.forEach(function (ele, idx, arr) {
      if (ele.nodeType === 1 && ele.hasAttributes()) {
        nodeUpdate(newArr[idx], ele, watcher2);
      } else if (ele.nodeType === 3) {
        nodeUpdateHTML(newArr[idx], ele);
      }
      if (idx === arr.length - 1) {
        oldArr.splice(0);
        newArr.splice(0);
      }
    });
  };

  if (!Object.prototype.watch) {
    Object.defineProperty(Object.prototype, 'watch', {
      enumerable: false,
      configurable: true,
      writable: false,
      value: function value(prop, handler) {
        var oldval = this[prop],
            newval = oldval,
            getter = function getter() {
          return newval;
        },
            setter = function setter(val) {
          oldval = newval;
          return newval = handler.call(this, prop, oldval, val);
        };
        if (delete this[prop]) {
          Object.defineProperty(this, prop, {
            get: getter,
            set: setter,
            enumerable: true,
            configurable: true
          });
        }
      }
    });
  }

  if (!Object.prototype.unwatch) {
    Object.defineProperty(Object.prototype, 'unwatch', {
      enumerable: false,
      configurable: true,
      writable: false,
      value: function value(prop) {
        var val = this[prop];
        delete this[prop];
        this[prop] = val;
      }
    });
  }

  if (!Array.prototype.update) {
    Object.defineProperty(Array.prototype, 'update', {
      enumerable: false,
      writable: true,
      value: function value(index, _value) {
        this[index] = _value;
      }
    });
  }
}

Keet.prototype.link = function (id, value) {
  var argv = [].slice.call(arguments);

  this.el = argv[0];
  if (argv.length === 2) {
    this.base = argv[1];
  }
  this.render();
  return this;
};

Keet.prototype.compose = function (instance) {
  this.update(instance);
  return this;
};

Keet.prototype.mount = function (instance) {
  this.base = instance;
  return this;
};

Keet.prototype.cluster = function () {
  var args = [].slice.call(arguments);
  args.map(function (fn) {
    if (typeof fn === 'function') fn();
  });
  return this;
};

Keet.prototype.list = function () {
  return this.base && this.base.list || [];
};

Keet.prototype.getBase = function (child, attribute, newProp) {
  if (arguments.length > 2 && this.base) this.base[child][attribute] = newProp;else return this.base[child][attribute];
};

Keet.prototype.addClass = function (child, newClass) {
  var self = this;
  var b = this.getBase(child, 'class');

  var isArr = function isArr() {
    b.push(newClass);
    self.getBase(child, 'class', b);
  };

  return Array.isArray(b) && isArr();
};

Keet.prototype.removeClass = function (child, oldClass) {
  var self = this;
  var b = this.getBase(child, 'class');

  var hIdx = function hIdx(idx) {
    b.splice(idx, 1);
    self.getBase(child, 'class', b);
  };

  var isArr = function isArr() {
    var idx = b.indexOf(oldClass);
    if (~idx) hIdx(idx);
  };

  return Array.isArray(b) && isArr();
};

Keet.prototype.swapClass = function (child, condition, classesArray) {
  var self = this;
  var b = this.getBase(child, 'class');

  if (condition) classesArray.reverse();

  var hIdx = function hIdx(idx) {
    b.splice(idx, 1, classesArray[1]);
    self.getBase(child, 'class', b);
  };

  var isArr = function isArr() {
    var idx = b.indexOf(classesArray[0]);
    if (~idx) hIdx(idx);
  };

  return Array.isArray(b) && isArr();
};

Keet.prototype.swapAttr = function (child, condition, propertyArray, attribute) {
  if (condition) propertyArray.reverse();
  this.getBase(child, attribute, propertyArray[0]);
};

Keet.prototype.setAttr = function (child, attribute, newProperty) {
  this.getBase(child, attribute, newProperty);
};

Keet.prototype.toggle = function (child, display) {
  var styl = this.base[child].style;
  Object.assign(styl, { display: display });
  this.base[child].style = styl;
};

Keet.prototype.getDisplay = function (child) {
  return this.base[child].style.display;
};

Keet.prototype.contentUpdate = function (child, content) {
  this.base[child].template = content;
};
},{"./copy":12,"./tag":13}],9:[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _keet = require("keet");

var _keet2 = _interopRequireDefault(_keet);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const cat = (...args) => [...args].join('');

class Component extends _keet2.default {
  constructor() {
    super();
  }

  _validateMyForm() {
    let inputs = this.vdom().querySelectorAll('input');

    let formData = '';

    inputs.forEach((i, idx) => {
      if (idx < 2) formData += i.name + '=' + i.value.trim() + '&';
    });

    formData = formData.slice(0, -1);

    log(formData);

    // str({
    //   method: 'post',
    //   contentType: 'application/x-www-form-urlencoded; charset=utf-8',
    //   body: formData,
    // }).pipe(new fetchStream).pipe(this.processLoginData())
  }

}

const obj = {
  template: '{{loginForm}}',
  loginForm: {
    tag: 'form',
    id: 'loginForm',
    'onsubmit': 'event.preventDefault();validateMyForm()',
    template: cat('<label><b>Username</b></label>', '<input type="text" placeholder="Enter Username" name="uname" required>', '<label><b>Password</b></label>', '<input type="password" autocomplete="false" placeholder="Enter Password" name="psw" required>', '<button type="submit">Login</button>', '<label>', '<input type="checkbox" checked="checked"> Remember me', '</label>')
  }
};

const app = new Component();

window.validateMyForm = app._validateMyForm.bind(app);

// obj.validateMyForm = app._validateMyForm.bind(app)

exports.default = run => app.mount(obj).flush('content').link('content');
},{"keet":11}],10:[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _keet = require("keet");

var _keet2 = _interopRequireDefault(_keet);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class Component extends _keet2.default {
  constructor() {
    super();
  }
}

const obj = {
  template: '{{protectedPage}}',
  protectedPage: {
    tag: 'div',
    id: 'protectedPage',
    template: 'protectedPage'
  }
};

const app = new Component();

exports.default = run => app.mount(obj).flush('content').link('content');
},{"keet":11}],7:[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _keet = require("keet");

var _keet2 = _interopRequireDefault(_keet);

var _loginPage = require("./loginPage");

var _loginPage2 = _interopRequireDefault(_loginPage);

var _protectedPage = require("./protectedPage");

var _protectedPage2 = _interopRequireDefault(_protectedPage);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class Component extends _keet2.default {
  constructor() {
    super();
  }
  _viewLoginPage() {
    (0, _loginPage2.default)();
  }
  _viewProtectedPage() {
    (0, _protectedPage2.default)();
  }
}

const obj = {
  template: '{{login}}{{protected}}',
  login: {
    tag: 'div',
    id: 'login',
    'k-click': 'viewLoginPage()',
    template: 'login'
  },
  protected: {
    tag: 'div',
    id: 'protected',
    'k-click': 'viewProtectedPage()',
    template: 'protected'
  }
};

const app = new Component();

obj.viewLoginPage = app._viewLoginPage.bind(app);
obj.viewProtectedPage = app._viewProtectedPage.bind(app);

exports.default = run => app.mount(obj).flush('routes').link('routes');
},{"keet":11,"./loginPage":9,"./protectedPage":10}],3:[function(require,module,exports) {
"use strict";

var _keet = require("keet");

var _keet2 = _interopRequireDefault(_keet);

var _routes = require("./components/routes");

var _routes2 = _interopRequireDefault(_routes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

window.log = console.log.bind(console);

class App extends _keet2.default {
  constructor() {
    super();
  }
}

const app = new App();

app.mount({
  template: '{{banner}}{{routes}}{{content}}',
  banner: {
    tag: 'h3',
    id: 'banner',
    template: 'keet.js sample app'
  },
  routes: {
    tag: 'div',
    id: 'routes'
  },
  content: {
    tag: 'div',
    id: 'content',
    template: 'Welcome to our spectacular web page with nothing special here.'
  }
}).flush('app').link('app').cluster(_routes2.default);
},{"keet":11,"./components/routes":7}],0:[function(require,module,exports) {
var global = (1, eval)('this');
var OldModule = module.bundle.Module;
function Module() {
  OldModule.call(this);
  this.hot = {
    accept: function (fn) {
      this._acceptCallback = fn || function () {};
    },
    dispose: function (fn) {
      this._disposeCallback = fn;
    }
  };
}

module.bundle.Module = Module;

if (!module.bundle.parent && typeof WebSocket !== 'undefined') {
  var ws = new WebSocket('ws://' + window.location.hostname + ':59166/');
  ws.onmessage = function(event) {
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      data.assets.forEach(function (asset) {
        hmrApply(global.require, asset);
      });

      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          hmrAccept(global.require, asset.id);
        }
      });
    }

    if (data.type === 'reload') {
      ws.close();
      ws.onclose = function () {
        window.location.reload();
      }
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + 'data.error.stack');
    }
  };
}

function getParents(bundle, id) {
  var modules = bundle.modules;
  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];
      if (dep === id || (Array.isArray(dep) && dep[dep.length - 1] === id)) {
        parents.push(+k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;
  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAccept(bundle, id) {
  var modules = bundle.modules;
  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAccept(bundle.parent, id);
  }

  var cached = bundle.cache[id];
  if (cached && cached.hot._disposeCallback) {
    cached.hot._disposeCallback();
  }

  delete bundle.cache[id];
  bundle(id);

  cached = bundle.cache[id];
  if (cached && cached.hot && cached.hot._acceptCallback) {
    cached.hot._acceptCallback();
    return true;
  }

  return getParents(global.require, id).some(function (id) {
    return hmrAccept(global.require, id)
  });
}
},{}]},{},[0,3])