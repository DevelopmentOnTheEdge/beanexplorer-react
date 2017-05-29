(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("react"));
	else if(typeof define === 'function' && define.amd)
		define("beanexplorer-react", ["react"], factory);
	else if(typeof exports === 'object')
		exports["beanexplorer-react"] = factory(require("react"));
	else
		root["beanexplorer-react"] = factory(root["react"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_0__) {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 3);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_0__;

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Property = function (_Component) {
  _inherits(Property, _Component);

  function Property(props) {
    _classCallCheck(this, Property);

    var _this2 = _possibleConstructorReturn(this, (Property.__proto__ || Object.getPrototypeOf(Property)).call(this, props));

    _this2.handleChange = _this2.handleChange.bind(_this2);
    return _this2;
  }

  _createClass(Property, [{
    key: 'handleChange',
    value: function handleChange(event) {
      this.props.onChange(this.props.path, this._getValueFromEvent(event));
    }
  }, {
    key: '_getValueFromEvent',
    value: function _getValueFromEvent(event) {
      if (!event) return '';
      if (!event.target) return event.value;
      var element = event.target;
      return element.type === 'checkbox' ? element.checked : element.value;
    }
  }, {
    key: 'render',
    value: function render() {
      var _this3 = this;

      var meta = this.props.meta;
      var value = this.props.value;
      var id = this.props.name + "Field";
      var handleChange = this.handleChange;
      var _this = this;

      var controls = {
        checkBox: {
          normal: function normal() {
            return _react2.default.createElement('input', { type: 'checkbox', id: id, key: id, value: value, checked: value, onChange: handleChange, className: _this3.props.controlClassName });
          },
          readOnly: function readOnly() {
            return _react2.default.createElement('input', { type: 'checkbox', id: id, key: id, value: value, checked: value, disabled: 'true', className: _this3.props.controlClassName });
          }
        },
        comboBox: {
          normal: function normal() {
            var options = meta.options.map(function (option) {
              return _react2.default.DOM.option({ key: option.value, value: option.value }, option.text);
            });
            if (meta.canBeNull) {
              options.unshift(_react2.default.DOM.option({ key: "", value: "" }, ""));
            }
            return _react2.default.DOM.select({ id: id, ref: 'editableComboBox', key: id, defaultValue: value,
              onChange: handleChange, className: _this3.props.controlClassName || "form-control" }, options);
          },
          readOnly: function readOnly() {
            var selectedOption = meta.options.filter(function (option) {
              return option.value === value;
            });
            var text = selectedOption.length ? selectedOption[0].text : value;
            return _this3.createStatic(text);
          }
        },
        textArea: {
          normal: function normal() {
            return _react2.default.createElement('textarea', { placeholder: meta.placeholder, id: id, rows: meta.rows || 3, cols: meta.columns, value: value,
              onChange: handleChange, className: _this3.props.controlClassName || "form-control" });
          },
          readOnly: function readOnly() {
            return _this3.createStatic(value);
          }
        },
        textInput: {
          normal: function normal() {
            return _react2.default.createElement('input', { type: 'text', placeholder: meta.placeholder, id: id, key: id, value: value,
              onChange: handleChange, className: _this3.props.controlClassName || "form-control" });
          },
          readOnly: function readOnly() {
            return _this3.createStatic(value);
          }
        },
        passwordInput: {
          normal: function normal() {
            return _react2.default.createElement('input', { type: 'password', placeholder: meta.placeholder, id: id, key: id, value: value,
              onChange: handleChange, className: _this3.props.controlClassName || "form-control" });
          },
          readOnly: function readOnly() {
            return _this3.createStatic('******');
          }
        }
      };

      var renderer = controls[meta.type] || controls['textInput'];
      var valueControl = renderer[meta.readOnly ? 'readOnly' : 'normal']();
      var label = _react2.default.createElement(
        'label',
        { htmlFor: id, className: this.props.labelClassName },
        meta.displayName || id
      );
      var helpTextElement = meta.helpText ? _react2.default.createElement(
        'span',
        { className: this.props.helpTextClassName || "help-block" },
        meta.helpText
      ) : undefined;
      var hasDanger = meta.error ? 'property-error' : '';

      return _react2.default.createElement(
        'div',
        { className: (this.props.className || 'form-group property') + ' ' + hasDanger },
        label,
        _react2.default.createElement(
          'div',
          { className: 'controls' },
          valueControl,
          helpTextElement
        )
      );
    }
  }, {
    key: 'createStatic',
    value: function createStatic(value) {
      return _react2.default.createElement('p', { className: 'form-control-static', dangerouslySetInnerHTML: { __html: value } });
    }
  }]);

  return Property;
}(_react.Component);

var _default = Property;
exports.default = _default;
;

var _temp = function () {
  if (typeof __REACT_HOT_LOADER__ === 'undefined') {
    return;
  }

  __REACT_HOT_LOADER__.register(Property, 'Property', '/home/uuinnk/workspace/github/beanexplorer-react/src/components/Property.js');

  __REACT_HOT_LOADER__.register(_default, 'default', '/home/uuinnk/workspace/github/beanexplorer-react/src/components/Property.js');
}();

;

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var each = __webpack_require__(4);
module.exports = api;


/**
 * Convenience wrapper around the api.
 * Calls `.get` when called with an `object` and a `pointer`.
 * Calls `.set` when also called with `value`.
 * If only supplied `object`, returns a partially applied function, mapped to the object.
 *
 * @param {Object} obj
 * @param {String|Array} pointer
 * @param value
 * @returns {*}
 */

function api (obj, pointer, value) {
    // .set()
    if (arguments.length === 3) {
        return api.set(obj, pointer, value);
    }
    // .get()
    if (arguments.length === 2) {
        return api.get(obj, pointer);
    }
    // Return a partially applied function on `obj`.
    var wrapped = api.bind(api, obj);

    // Support for oo style
    for (var name in api) {
        if (api.hasOwnProperty(name)) {
            wrapped[name] = api[name].bind(wrapped, obj);
        }
    }
    return wrapped;
}


/**
 * Lookup a json pointer in an object
 *
 * @param {Object} obj
 * @param {String|Array} pointer
 * @returns {*}
 */
api.get = function get (obj, pointer) {
    var refTokens = Array.isArray(pointer) ? pointer : api.parse(pointer);

    for (var i = 0; i < refTokens.length; ++i) {
        var tok = refTokens[i];
        if (!(typeof obj == 'object' && tok in obj)) {
            throw new Error('Invalid reference token: ' + tok);
        }
        obj = obj[tok];
    }
    return obj;
};

/**
 * Sets a value on an object
 *
 * @param {Object} obj
 * @param {String|Array} pointer
 * @param value
 */
api.set = function set (obj, pointer, value) {
    var refTokens = Array.isArray(pointer) ? pointer : api.parse(pointer),
      nextTok = refTokens[0];

    for (var i = 0; i < refTokens.length - 1; ++i) {
        var tok = refTokens[i];
        if (tok === '-' && Array.isArray(obj)) {
          tok = obj.length;
        }
        nextTok = refTokens[i + 1];

        if (!(tok in obj)) {
            if (nextTok.match(/^(\d+|-)$/)) {
                obj[tok] = [];
            } else {
                obj[tok] = {};
            }
        }
        obj = obj[tok];
    }
    if (nextTok === '-' && Array.isArray(obj)) {
      nextTok = obj.length;
    }
    obj[nextTok] = value;
    return this;
};

/**
 * Removes an attribute
 *
 * @param {Object} obj
 * @param {String|Array} pointer
 */
api.remove = function (obj, pointer) {
    var refTokens = Array.isArray(pointer) ? pointer : api.parse(pointer);
    var finalToken = refTokens[refTokens.length -1];
    if (finalToken === undefined) {
        throw new Error('Invalid JSON pointer for remove: "' + pointer + '"');
    }

    var parent = api.get(obj, refTokens.slice(0, -1));
    if (Array.isArray(parent)) {
      var index = +finalToken;
      if (finalToken === '' && isNaN(index)) {
        throw new Error('Invalid array index: "' + finalToken + '"');
      }

      Array.prototype.splice.call(parent, index, 1);
    } else {
      delete parent[finalToken];
    }
};

/**
 * Returns a (pointer -> value) dictionary for an object
 *
 * @param obj
 * @param {function} descend
 * @returns {}
 */
api.dict = function dict (obj, descend) {
    var results = {};
    api.walk(obj, function (value, pointer) {
        results[pointer] = value;
    }, descend);
    return results;
};

/**
 * Iterates over an object
 * Iterator: function (value, pointer) {}
 *
 * @param obj
 * @param {function} iterator
 * @param {function} descend
 */
api.walk = function walk (obj, iterator, descend) {
    var refTokens = [];

    descend = descend || function (value) {
        var type = Object.prototype.toString.call(value);
        return type === '[object Object]' || type === '[object Array]';
    };

    (function next (cur) {
        each(cur, function (value, key) {
            refTokens.push(String(key));
            if (descend(value)) {
                next(value);
            } else {
                iterator(value, api.compile(refTokens));
            }
            refTokens.pop();
        });
    }(obj));
};

/**
 * Tests if an object has a value for a json pointer
 *
 * @param obj
 * @param pointer
 * @returns {boolean}
 */
api.has = function has (obj, pointer) {
    try {
        api.get(obj, pointer);
    } catch (e) {
        return false;
    }
    return true;
};

/**
 * Escapes a reference token
 *
 * @param str
 * @returns {string}
 */
api.escape = function escape (str) {
    return str.toString().replace(/~/g, '~0').replace(/\//g, '~1');
};

/**
 * Unescapes a reference token
 *
 * @param str
 * @returns {string}
 */
api.unescape = function unescape (str) {
    return str.replace(/~1/g, '/').replace(/~0/g, '~');
};

/**
 * Converts a json pointer into a array of reference tokens
 *
 * @param pointer
 * @returns {Array}
 */
api.parse = function parse (pointer) {
    if (pointer === '') { return []; }
    if (pointer.charAt(0) !== '/') { throw new Error('Invalid JSON pointer: ' + pointer); }
    return pointer.substring(1).split(/\//).map(api.unescape);
};

/**
 * Builds a json pointer from a array of reference tokens
 *
 * @param refTokens
 * @returns {string}
 */
api.compile = function compile (refTokens) {
    if (refTokens.length === 0) { return ''; }
    return '/' + refTokens.map(api.escape).join('/');
};


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _Property = __webpack_require__(1);

var _Property2 = _interopRequireDefault(_Property);

var _jsonPointer = __webpack_require__(2);

var _jsonPointer2 = _interopRequireDefault(_jsonPointer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var PropertySet = function (_Component) {
  _inherits(PropertySet, _Component);

  function PropertySet() {
    _classCallCheck(this, PropertySet);

    return _possibleConstructorReturn(this, (PropertySet.__proto__ || Object.getPrototypeOf(PropertySet)).apply(this, arguments));
  }

  _createClass(PropertySet, [{
    key: 'render',
    value: function render() {
      var _this2 = this;

      var curGroup = [];
      var curGroupName = null,
          curGroupId = null;
      var fields = [];

      var finishGroup = function finishGroup() {
        if (curGroup.length > 0) {
          if (curGroupId) {
            fields.push(_this2._createGroup(curGroup, curGroupId, curGroupName));
          } else {
            Array.prototype.push.apply(fields, curGroup);
          }
        }
        curGroup = [];
      };

      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = this.props.fields.order[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var item = _step.value;

          var itemName = item.substring(item.lastIndexOf("/") + 1);
          var itemMeta = this.props.fields.meta[item];
          var itemValue = _jsonPointer2.default.get(this.props.fields, "/values" + item);

          var newGroupId = itemMeta.groupId || null;
          var newGroupName = itemMeta.groupName || null;
          if (newGroupId !== curGroupId) {
            finishGroup();
            curGroupName = newGroupName;
            curGroupId = newGroupId;
          }
          var field = _react2.default.createElement(_Property2.default, { meta: itemMeta, name: itemName, value: itemValue, path: item,
            key: itemName, ref: itemName, onChange: this.props.onChange });
          curGroup.push(field);
        }
      } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion && _iterator.return) {
            _iterator.return();
          }
        } finally {
          if (_didIteratorError) {
            throw _iteratorError;
          }
        }
      }

      finishGroup();

      return _react2.default.createElement(
        'div',
        { className: 'property-set' },
        fields
      );
    }
  }, {
    key: '_createGroup',
    value: function _createGroup(curGroup, curGroupId, curGroupName) {
      return _react2.default.createElement(
        'div',
        { className: 'property-group', key: curGroupId, ref: curGroupId },
        _react2.default.createElement(
          'h3',
          null,
          curGroupName
        ),
        curGroup
      );
    }
  }]);

  return PropertySet;
}(_react.Component);

var _default = PropertySet;
exports.default = _default;
;

var _temp = function () {
  if (typeof __REACT_HOT_LOADER__ === 'undefined') {
    return;
  }

  __REACT_HOT_LOADER__.register(PropertySet, 'PropertySet', '/home/uuinnk/workspace/github/beanexplorer-react/src/components/PropertySet.js');

  __REACT_HOT_LOADER__.register(_default, 'default', '/home/uuinnk/workspace/github/beanexplorer-react/src/components/PropertySet.js');
}();

;

/***/ }),
/* 4 */
/***/ (function(module, exports) {


var hasOwn = Object.prototype.hasOwnProperty;
var toString = Object.prototype.toString;

module.exports = function forEach (obj, fn, ctx) {
    if (toString.call(fn) !== '[object Function]') {
        throw new TypeError('iterator must be a function');
    }
    var l = obj.length;
    if (l === +l) {
        for (var i = 0; i < l; i++) {
            fn.call(ctx, obj[i], i, obj);
        }
    } else {
        for (var k in obj) {
            if (hasOwn.call(obj, k)) {
                fn.call(ctx, obj[k], k, obj);
            }
        }
    }
};



/***/ })
/******/ ]);
});
//# sourceMappingURL=beanexplorer-react.js.map