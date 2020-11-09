(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('react'), require('prop-types'), require('classnames'), require('react-maskedinput'), require('react-select'), require('react-virtualized-select'), require('big-integer'), require('big-rational'), require('react-datetime'), require('moment'), require('ckeditor4-react'), require('json-pointer')) :
  typeof define === 'function' && define.amd ? define(['react', 'prop-types', 'classnames', 'react-maskedinput', 'react-select', 'react-virtualized-select', 'big-integer', 'big-rational', 'react-datetime', 'moment', 'ckeditor4-react', 'json-pointer'], factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.PropertySet = factory(global.React, global.PropTypes, global.classNames, global.MaskedInput, global.Select, global.VirtualizedSelect, global.bigInt, global.bigRat, global.Datetime, global.moment, global.CKEditor, global.JsonPointer));
}(this, (function (React, PropTypes, classNames, MaskedInput, Select, VirtualizedSelect, bigInt, bigRat, Datetime, moment, CKEditor, JsonPointer) { 'use strict';

  function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

  var React__default = /*#__PURE__*/_interopDefaultLegacy(React);
  var PropTypes__default = /*#__PURE__*/_interopDefaultLegacy(PropTypes);
  var classNames__default = /*#__PURE__*/_interopDefaultLegacy(classNames);
  var MaskedInput__default = /*#__PURE__*/_interopDefaultLegacy(MaskedInput);
  var Select__default = /*#__PURE__*/_interopDefaultLegacy(Select);
  var VirtualizedSelect__default = /*#__PURE__*/_interopDefaultLegacy(VirtualizedSelect);
  var bigInt__default = /*#__PURE__*/_interopDefaultLegacy(bigInt);
  var bigRat__default = /*#__PURE__*/_interopDefaultLegacy(bigRat);
  var Datetime__default = /*#__PURE__*/_interopDefaultLegacy(Datetime);
  var moment__default = /*#__PURE__*/_interopDefaultLegacy(moment);
  var CKEditor__default = /*#__PURE__*/_interopDefaultLegacy(CKEditor);
  var JsonPointer__default = /*#__PURE__*/_interopDefaultLegacy(JsonPointer);

  var inputLabelSizeClasses = function inputLabelSizeClasses(props) {
    return classNames__default['default']({
      'col-form-label-sm': props.bsSize === "sm"
    }, {
      'col-form-label-lg': props.bsSize === "lg"
    });
  };
  var arraysEqual = function arraysEqual(a, b) {
    if (a === b) return true;
    if (a === null || b === null) return false;
    if (a.length !== b.length) return false;
    a.sort();
    b.sort();

    for (var i = 0; i < a.length; ++i) {
      if (a[i] !== b[i]) return false;
    }

    return true;
  };
  var shouldPropertyUpdate = function shouldPropertyUpdate(props, nextProps) {
    return props.bean !== nextProps.bean || props.horizontal !== nextProps.horizontal || props.inline !== nextProps.inline || props.bsSize !== nextProps.bsSize;
  }; //experemental, try check nested DPS

  var isDPS = function isDPS(meta) {
    return meta && meta.type && meta.type.indexOf('DynamicPropertySet') !== -1;
  };

  function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

  function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

  function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

  function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

  function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

  function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

  function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

  function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

  function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

  function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

  var BasePropertyInput = /*#__PURE__*/function (_React$Component) {
    _inherits(BasePropertyInput, _React$Component);

    var _super = _createSuper(BasePropertyInput);

    function BasePropertyInput(props) {
      var _this;

      _classCallCheck(this, BasePropertyInput);

      _this = _super.call(this, props);
      _this.callOnChange = _this.callOnChange.bind(_assertThisInitialized(_this));
      _this.handleChange = _this.handleChange.bind(_assertThisInitialized(_this));
      _this.reload = _this.reload.bind(_assertThisInitialized(_this));
      _this.patternValidationMessage = _this.patternValidationMessage.bind(_assertThisInitialized(_this));
      return _this;
    }

    _createClass(BasePropertyInput, [{
      key: "getPath",
      value: function getPath() {
        var props = this.props;

        if (props.path) {
          return props.path;
        } else {
          return props.bean.order[props.id];
        }
      }
    }, {
      key: "getMeta",
      value: function getMeta() {
        return this.props.bean.meta[this.getPath()];
      }
    }, {
      key: "getID",
      value: function getID() {
        var path = this.getPath();
        return path.substring(path.lastIndexOf("/") + 1) + "PropertyInput";
      }
    }, {
      key: "getValidationRule",
      value: function getValidationRule(type) {
        var rules = this.getMeta().validationRules;

        if (rules !== undefined) {
          if (Array.isArray(rules)) {
            for (var i = 0; i < rules.length; i++) {
              if (rules[i].type === type) return rules[i];
            }
          } else {
            if (rules.type === type) return rules;
          }
        }

        return undefined;
      }
    }, {
      key: "getValue",
      value: function getValue() {
        return this.props.value;
      }
    }, {
      key: "getCorrectMulValue",
      value: function getCorrectMulValue() {
        var value = this.getValue();
        var meta = this.getMeta();
        var correctValue;

        if (meta.multipleSelectionList === true) {
          correctValue = [];

          if (Array.isArray(value)) {
            for (var i = 0; i < value.length; i++) {
              correctValue.push("" + value[i]);
            }
          } else if (value.length > 0) {
            correctValue.push("" + value);
          }
        } else {
          correctValue = "" + value;
        }

        return correctValue;
      }
    }, {
      key: "callOnChange",
      value: function callOnChange(value) {
        this.props.onChange(this.getPath(), value);
      }
    }, {
      key: "handleChange",
      value: function handleChange(event) {
        this.callOnChange(event.target.value);
      }
    }, {
      key: "reload",
      value: function reload(e) {
        if (e === undefined || e.target === undefined || e.target.validity.valid === true) {
          this.props.reloadOnChange(this.getPath());
        }
      }
    }, {
      key: "changeAndReload",
      value: function changeAndReload(value) {
        this.props.reloadOnChange(this.getPath(), value);
      }
    }, {
      key: "getValidationClasses",
      value: function getValidationClasses() {
        var meta = this.getMeta();
        return classNames__default['default']({
          'is-invalid': meta.status === 'error'
        }, {
          'is-valid': meta.status === 'success'
        });
      }
    }, {
      key: "getBaseProps",
      value: function getBaseProps() {
        var meta = this.getMeta();
        var id = this.getID();
        var extraAttrsMap = BasePropertyInput.getExtraAttrsMap(meta);
        var inputTypeClass;

        switch (meta.type) {
          case "Boolean":
            inputTypeClass = 'form-check-input';
            break;

          case "Base64File":
            inputTypeClass = 'form-control-file';
            break;

          case "File":
            inputTypeClass = 'form-control-file';
            break;

          default:
            inputTypeClass = 'form-control';
        }

        if (extraAttrsMap.inputType === "form-control-plaintext" && meta.readOnly === true && inputTypeClass === 'form-control') {
          inputTypeClass = 'form-control-plaintext';
        }

        var basePropsClasses = classNames__default['default']('property-input', inputTypeClass, this.getValidationClasses(), this.props.controlClassName, {
          'form-control-sm': this.props.bsSize === "sm" && meta.type !== "Boolean"
        }, {
          'form-control-lg': this.props.bsSize === "lg" && meta.type !== "Boolean"
        });
        var baseProps = {
          id: id,
          key: id,
          required: meta.canBeNull !== true,
          size: meta.inputSize,
          className: basePropsClasses
        };

        if (meta.readOnly === true) {
          if (meta.type === 'Boolean' || meta.type === 'Base64File') {
            baseProps['disabled'] = 'disabled';
          } else {
            baseProps['readOnly'] = 'readonly';
          }
        }

        return baseProps;
      }
    }, {
      key: "getRawInputProps",
      value: function getRawInputProps(value, extraAttrsMap) {
        return Object.assign({}, this.getBaseProps(), {
          value: value,
          onChange: this.handleChange,
          onBlur: this.reload,
          placeholder: extraAttrsMap.placeholder
        });
      }
    }, {
      key: "getRawTextValidation",
      value: function getRawTextValidation() {
        var validationRulePattern = this.getValidationRule('pattern');
        return {
          maxLength: this.getMeta().columnSize,
          pattern: validationRulePattern ? validationRulePattern.attr : undefined,
          onInvalid: this.patternValidationMessage,
          onInput: this.patternValidationMessage
        };
      }
    }, {
      key: "patternValidationMessage",
      value: function patternValidationMessage(e) {
        var pattern = this.getValidationRule('pattern');

        if (pattern && pattern.customMessage) {
          if (e.target.validity.patternMismatch) {
            e.target.setCustomValidity(pattern.customMessage);
          } else {
            e.target.setCustomValidity('');
          }
        }
      }
    }], [{
      key: "getExtraAttrsMap",
      value: function getExtraAttrsMap(meta) {
        var extraAttrs = meta.extraAttrs;
        var map = {};

        if (extraAttrs !== undefined) {
          for (var i = 0; i < extraAttrs.length; i++) {
            map[extraAttrs[i][0]] = extraAttrs[i][1];
          }
        }

        if (meta.passwordField) {
          map.inputType = 'password';
        }

        if (meta.placeholder) {
          map.placeholder = meta.placeholder;
        }

        return map;
      }
    }]);

    return BasePropertyInput;
  }(React__default['default'].Component);
  BasePropertyInput.defaultProps = {
    localization: {
      locale: 'en',
      clearAllText: 'Clear all',
      clearValueText: 'Clear value',
      showAllColumnsText: 'Show all columns',
      noResultsText: 'No results found',
      searchPromptText: 'Type to search',
      placeholder: 'Select ...',
      stepMismatch: 'Please enter a valid value. The closest allowed values are {0} and {1}.',
      numberTypeMismatch: 'Enter the number.',
      simpleIntegerTypeMismatch: '"E" is not supported for simple integer types.',
      rangeOverflow: 'The value must be less than or equal to {0}.',
      rangeUnderflow: 'The value must be greater than or equal to {0}.',
      loadingPlaceholder: 'Loading...',
      datePatternError: 'Please enter a valid date in the format dd.mm.yyyy',
      timePatternError: 'Please enter a valid date with time in the format dd.mm.yyyy hh:mm',
      timestampPatternError: 'Please enter a valid date with time in the format dd.mm.yyyy hh:mm'
    }
  }; //  localization: {checkBoxRequired: "Select at least one item"}

  BasePropertyInput.propTypes = {
    bean: PropTypes__default['default'].object.isRequired,
    path: PropTypes__default['default'].string,
    inline: PropTypes__default['default'].bool,
    bsSize: PropTypes__default['default'].string,
    onChange: PropTypes__default['default'].func,
    reloadOnChange: PropTypes__default['default'].func,
    localization: PropTypes__default['default'].object,
    controlClassName: PropTypes__default['default'].string
  };

  function _typeof$1(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof$1 = function _typeof(obj) { return typeof obj; }; } else { _typeof$1 = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof$1(obj); }

  function _classCallCheck$1(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

  function _defineProperties$1(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

  function _createClass$1(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties$1(Constructor.prototype, protoProps); if (staticProps) _defineProperties$1(Constructor, staticProps); return Constructor; }

  function _inherits$1(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf$1(subClass, superClass); }

  function _setPrototypeOf$1(o, p) { _setPrototypeOf$1 = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf$1(o, p); }

  function _createSuper$1(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct$1(); return function _createSuperInternal() { var Super = _getPrototypeOf$1(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf$1(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn$1(this, result); }; }

  function _possibleConstructorReturn$1(self, call) { if (call && (_typeof$1(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized$1(self); }

  function _assertThisInitialized$1(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

  function _isNativeReflectConstruct$1() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

  function _getPrototypeOf$1(o) { _getPrototypeOf$1 = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf$1(o); }

  var RadioSelectPropertyInput = /*#__PURE__*/function (_BasePropertyInput) {
    _inherits$1(RadioSelectPropertyInput, _BasePropertyInput);

    var _super = _createSuper$1(RadioSelectPropertyInput);

    function RadioSelectPropertyInput(props) {
      var _this;

      _classCallCheck$1(this, RadioSelectPropertyInput);

      _this = _super.call(this, props);
      _this._onInputChange = _this._onInputChange.bind(_assertThisInitialized$1(_this));
      return _this;
    }

    _createClass$1(RadioSelectPropertyInput, [{
      key: "render",
      value: function render() {
        var id = this.getID();
        var meta = this.getMeta();
        var value = this.getCorrectMulValue();
        var radioButtons = [];

        for (var i = 0; i < meta.tagList.length; i++) {
          var tagName = meta.tagList[i][0];
          var tagLabel = meta.tagList[i][1];

          var onChange = this._onInputChange.bind(this, tagName);

          radioButtons.push( /*#__PURE__*/React__default['default'].createElement("div", {
            className: "form-check",
            key: id + "FormCheckWrapper" + i
          }, /*#__PURE__*/React__default['default'].createElement("input", {
            id: id + "_option" + i,
            className: "form-check-input",
            type: meta.multipleSelectionList ? "checkbox" : "radio",
            name: id,
            value: tagName,
            checked: meta.multipleSelectionList ? value.includes(tagName) : tagName === "" + value,
            onChange: onChange,
            required: !meta.multipleSelectionList && !meta.canBeNull,
            disabled: meta.readOnly
          }), /*#__PURE__*/React__default['default'].createElement("label", {
            className: classNames__default['default'](inputLabelSizeClasses(this.props, meta.type), "form-check-label radio-label"),
            htmlFor: id + "_option" + i
          }, !meta.rawValue ? tagLabel : /*#__PURE__*/React__default['default'].createElement("div", {
            dangerouslySetInnerHTML: {
              __html: tagLabel
            }
          }))));
        }

        return /*#__PURE__*/React__default['default'].createElement("div", {
          id: id,
          className: classNames__default['default']("radio-buttons-outer", 'property-input', {
            'Select--sm': this.props.bsSize === "sm"
          }, {
            'Select--lg': this.props.bsSize === "lg"
          }, this.getValidationClasses())
        }, radioButtons);
      }
    }, {
      key: "_onInputChange",
      value: function _onInputChange(tagName, event) {
        var value = this.getCorrectMulValue();

        if (this.getMeta().multipleSelectionList) {
          var newValue;

          if (event.target.checked) {
            newValue = value.concat(tagName);
          } else {
            newValue = value.filter(function (v) {
              return v !== tagName;
            });
          }

          this.changeAndReload(newValue);
        } else {
          this.changeAndReload(tagName);
        }
      }
    }]);

    return RadioSelectPropertyInput;
  }(BasePropertyInput);

  function _typeof$2(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof$2 = function _typeof(obj) { return typeof obj; }; } else { _typeof$2 = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof$2(obj); }

  function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

  function _classCallCheck$2(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

  function _defineProperties$2(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

  function _createClass$2(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties$2(Constructor.prototype, protoProps); if (staticProps) _defineProperties$2(Constructor, staticProps); return Constructor; }

  function _inherits$2(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf$2(subClass, superClass); }

  function _setPrototypeOf$2(o, p) { _setPrototypeOf$2 = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf$2(o, p); }

  function _createSuper$2(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct$2(); return function _createSuperInternal() { var Super = _getPrototypeOf$2(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf$2(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn$2(this, result); }; }

  function _possibleConstructorReturn$2(self, call) { if (call && (_typeof$2(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized$2(self); }

  function _assertThisInitialized$2(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

  function _isNativeReflectConstruct$2() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

  function _getPrototypeOf$2(o) { _getPrototypeOf$2 = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf$2(o); }

  var SelectPropertyInput = /*#__PURE__*/function (_BasePropertyInput) {
    _inherits$2(SelectPropertyInput, _BasePropertyInput);

    var _super = _createSuper$2(SelectPropertyInput);

    function SelectPropertyInput(props) {
      var _this;

      _classCallCheck$2(this, SelectPropertyInput);

      _this = _super.call(this, props);
      _this.handleChangeSelect = _this.handleChangeSelect.bind(_assertThisInitialized$2(_this));
      _this.state = {
        selectedOptions: []
      };
      return _this;
    }

    _createClass$2(SelectPropertyInput, [{
      key: "componentDidMount",
      value: function componentDidMount() {
        var value = this.getValue();

        if (value !== "") {
          this.setState({
            selectedOptions: this.getOptions().filter(function (option) {
              return option.value === value;
            })
          });
        }
      }
    }, {
      key: "render",
      value: function render() {
        var _this$getAttr = this.getAttr(),
            meta = _this$getAttr.meta,
            extraAttrsMap = _this$getAttr.extraAttrsMap,
            selectAttr = _this$getAttr.selectAttr;

        return /*#__PURE__*/React__default['default'].createElement("div", {
          className: classNames__default['default']("Select-outer", 'property-input', {
            'Select--sm': this.props.bsSize === "sm"
          }, {
            'Select--lg': this.props.bsSize === "lg"
          }, this.getValidationClasses()),
          style: this.getStyle(meta)
        }, this.getSelect(selectAttr, meta, extraAttrsMap));
      }
    }, {
      key: "getSelect",
      value: function getSelect(selectAttr, meta, extraAttrsMap) {
        if (extraAttrsMap.inputType === "Creatable") {
          return /*#__PURE__*/React__default['default'].createElement(Select.Creatable, selectAttr);
        } else if (extraAttrsMap.inputType === "VirtualizedSelect" || extraAttrsMap.inputType === undefined && meta.tagList.length >= 100) {
          return /*#__PURE__*/React__default['default'].createElement(VirtualizedSelect__default['default'], _extends({
            clearable: true,
            searchable: true,
            labelKey: "label",
            valueKey: "value"
          }, selectAttr));
        } else {
          return /*#__PURE__*/React__default['default'].createElement(Select__default['default'], selectAttr);
        }
      }
    }, {
      key: "getAttr",
      value: function getAttr() {
        var id = this.getID();
        var meta = this.getMeta();
        var localization = this.props.localization;
        var extraAttrsMap = BasePropertyInput.getExtraAttrsMap(meta);
        var selectAttr = {
          id: id,
          ref: id,
          name: id,
          value: this.state.selectedOptions,
          options: this.getOptions(),
          onChange: this.handleChangeSelect,
          // clearAllText: localization.clearAllText removed
          // clearValueText: localization.clearValueText removed
          noOptionsMessage: function noOptionsMessage() {
            return localization.noResultsText;
          },
          // searchPromptText: localization.searchPromptText removed
          loadingPlaceholder: localization.loadingPlaceholder,
          placeholder: extraAttrsMap.placeholder || localization.placeholder,
          backspaceRemovesValue: false,
          isDisabled: meta.readOnly,
          isMulti: meta.multipleSelectionList,
          filterOption: Select.createFilter({
            matchFrom: extraAttrsMap.matchFrom || "any"
          }) //required: !meta.canBeNull, removed	may be implemented in a later version todo

        };
        return {
          meta: meta,
          extraAttrsMap: extraAttrsMap,
          selectAttr: selectAttr
        };
      }
    }, {
      key: "getOptions",
      value: function getOptions() {
        var meta = this.getMeta();
        if (meta.tagList === undefined) return undefined;
        var options = [];

        for (var i = 0; i < meta.tagList.length; i++) {
          options.push({
            value: meta.tagList[i][0],
            label: meta.tagList[i][1]
          });
        }

        return options;
      }
    }, {
      key: "handleChangeSelect",
      value: function handleChangeSelect(object) {
        this.setState({
          selectedOptions: Array.isArray(object) ? object : [object]
        }, function () {
          this.changeAndReload(SelectPropertyInput.getRawValue(object));
        });
      }
    }, {
      key: "getStyle",
      value: function getStyle(meta) {
        var style;

        if (this.props.inline) {
          //константы подобраны для совпадения с длиной стандартного input
          var k = 11;
          if (this.props.bsSize === "sm") k = 8.95;
          if (this.props.bsSize === "lg") k = 14.65;
          style = {
            width: k * (meta.inputSize || 16) + 68 + 'px',
            maxWidth: '100%'
          };
        }

        return style;
      }
    }], [{
      key: "getRawValue",
      value: function getRawValue(object) {
        if (Array.isArray(object)) {
          var selectArray = [];
          Object.keys(object).forEach(function (key) {
            selectArray.push(object[key].value);
          });
          return selectArray;
        } else {
          return object !== null ? object.value : "";
        }
      }
    }]);

    return SelectPropertyInput;
  }(BasePropertyInput);
  SelectPropertyInput.propTypes = {
    selectLoadOptions: PropTypes__default['default'].func
  };

  function _typeof$3(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof$3 = function _typeof(obj) { return typeof obj; }; } else { _typeof$3 = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof$3(obj); }

  function _extends$1() { _extends$1 = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends$1.apply(this, arguments); }

  function _classCallCheck$3(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

  function _defineProperties$3(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

  function _createClass$3(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties$3(Constructor.prototype, protoProps); if (staticProps) _defineProperties$3(Constructor, staticProps); return Constructor; }

  function _inherits$3(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf$3(subClass, superClass); }

  function _setPrototypeOf$3(o, p) { _setPrototypeOf$3 = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf$3(o, p); }

  function _createSuper$3(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct$3(); return function _createSuperInternal() { var Super = _getPrototypeOf$3(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf$3(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn$3(this, result); }; }

  function _possibleConstructorReturn$3(self, call) { if (call && (_typeof$3(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized$3(self); }

  function _assertThisInitialized$3(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

  function _isNativeReflectConstruct$3() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

  function _getPrototypeOf$3(o) { _getPrototypeOf$3 = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf$3(o); }

  var NumberPropertyInput = /*#__PURE__*/function (_BasePropertyInput) {
    _inherits$3(NumberPropertyInput, _BasePropertyInput);

    var _super = _createSuper$3(NumberPropertyInput);

    function NumberPropertyInput(props) {
      var _this;

      _classCallCheck$3(this, NumberPropertyInput);

      _this = _super.call(this, props);
      _this.numberValidation = _this.numberValidation.bind(_assertThisInitialized$3(_this));
      return _this;
    }

    _createClass$3(NumberPropertyInput, [{
      key: "render",
      value: function render() {
        var meta = this.getMeta();
        var extraAttrsMap = BasePropertyInput.getExtraAttrsMap(meta);
        var range = this.getNumberValidationRule('range');
        var step = this.getNumberValidationRule('step');
        var type = meta.type;
        return /*#__PURE__*/React__default['default'].createElement("input", _extends$1({
          type: "text",
          onInput: this.numberValidation,
          "data-info-type": type,
          "data-info-range": range && range.attr ? range.attr.min + ', ' + range.attr.max : undefined,
          "data-info-step": step ? step.attr : undefined,
          value: convertENotationNumbers(this.getValue()),
          onChange: this.handleChange,
          onBlur: this.reload,
          placeholder: extraAttrsMap.placeholder
        }, this.getBaseProps()));
      }
    }, {
      key: "numberValidation",
      value: function numberValidation(e) {
        var range = this.getNumberValidationRule('range');
        var step = this.getNumberValidationRule('step');
        var local = this.props.localization;
        var value;

        try {
          value = bigRat__default['default'](e.target.value);
        } catch (err) {
          setErrorState(e, local.numberTypeMismatch);
          return;
        }

        if (range) {
          if (value.compare(bigRat__default['default'](range.attr.min)) === -1) {
            setErrorState(e, setMessagePlaceHolders(local.rangeUnderflow, [range.attr.min]));
            return;
          } else if (value.compare(bigRat__default['default'](range.attr.max)) === 1) {
            setErrorState(e, setMessagePlaceHolders(local.rangeOverflow, [range.attr.max]));
            return;
          }
        }

        if (step) {
          var stepRat = bigRat__default['default'](step.attr);

          if (!value.divide(stepRat).denominator.equals(bigInt__default['default'].one)) {
            var min = value.divide(stepRat).floor().multiply(stepRat);
            var max = min.add(stepRat);
            setErrorState(e, setMessagePlaceHolders(local.stepMismatch, [min.toDecimal(), max.toDecimal()]));
            return;
          }
        }

        setErrorState(e, '');
      }
    }, {
      key: "getNumberValidationRule",
      value: function getNumberValidationRule(name) {
        var meta = this.getMeta();
        var rule = this.getValidationRule(name);

        if (rule === undefined) {
          if (name === 'range') {
            switch (meta.type) {
              case 'Short':
                return {
                  type: 'range',
                  attr: {
                    min: "-32768",
                    max: "32767"
                  }
                };

              case 'Integer':
                return {
                  type: 'range',
                  attr: {
                    min: "-2147483648",
                    max: "2147483647"
                  }
                };

              case 'Long':
                return {
                  type: 'range',
                  attr: {
                    min: "-9223372036854775808",
                    max: "9223372036854775807"
                  }
                };
            }
          }

          if (name === 'step' && (meta.type === 'Short' || meta.type === 'Integer' || meta.type === 'Long')) {
            return {
              type: 'step',
              attr: '1'
            };
          }
        }

        return rule;
      }
    }]);

    return NumberPropertyInput;
  }(BasePropertyInput);

  var convertENotationNumbers = function convertENotationNumbers(value) {
    try {
      if (value.includes('e') || value.includes('E')) return bigRat__default['default'](value).toDecimal();else return value;
    } catch (err) {
      return value;
    }
  };

  var setErrorState = function setErrorState(e, text) {
    e.target.setCustomValidity(text);
    e.target.title = text;
  };

  var setMessagePlaceHolders = function setMessagePlaceHolders(source, params) {
    params.forEach(function (item, i) {
      source = source.replace(new RegExp("\\{" + i + "\\}", "g"), item);
    });
    return source;
  };

  function _typeof$4(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof$4 = function _typeof(obj) { return typeof obj; }; } else { _typeof$4 = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof$4(obj); }

  function _extends$2() { _extends$2 = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends$2.apply(this, arguments); }

  function _classCallCheck$4(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

  function _defineProperties$4(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

  function _createClass$4(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties$4(Constructor.prototype, protoProps); if (staticProps) _defineProperties$4(Constructor, staticProps); return Constructor; }

  function _inherits$4(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf$4(subClass, superClass); }

  function _setPrototypeOf$4(o, p) { _setPrototypeOf$4 = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf$4(o, p); }

  function _createSuper$4(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct$4(); return function _createSuperInternal() { var Super = _getPrototypeOf$4(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf$4(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn$4(this, result); }; }

  function _possibleConstructorReturn$4(self, call) { if (call && (_typeof$4(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized$4(self); }

  function _assertThisInitialized$4(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

  function _isNativeReflectConstruct$4() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

  function _getPrototypeOf$4(o) { _getPrototypeOf$4 = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf$4(o); }

  var DateTimePropertyInput = /*#__PURE__*/function (_BasePropertyInput) {
    _inherits$4(DateTimePropertyInput, _BasePropertyInput);

    var _super = _createSuper$4(DateTimePropertyInput);

    function DateTimePropertyInput(props) {
      var _this;

      _classCallCheck$4(this, DateTimePropertyInput);

      _this = _super.call(this, props);
      _this.dateValidationMessage = _this.dateValidationMessage.bind(_assertThisInitialized$4(_this));
      _this.dateToISOFormat = _this.dateToISOFormat.bind(_assertThisInitialized$4(_this));
      _this.timeValidationMessage = _this.timeValidationMessage.bind(_assertThisInitialized$4(_this));
      _this.timeToISOFormat = _this.timeToISOFormat.bind(_assertThisInitialized$4(_this));
      _this.timestampValidationMessage = _this.timestampValidationMessage.bind(_assertThisInitialized$4(_this));
      _this.timestampToISOFormat = _this.timestampToISOFormat.bind(_assertThisInitialized$4(_this));
      return _this;
    }

    _createClass$4(DateTimePropertyInput, [{
      key: "render",
      value: function render() {
        var _this2 = this;

        var meta = this.getMeta();
        var value = this.getValue();
        var extraAttrsMap = BasePropertyInput.getExtraAttrsMap(meta);

        if (meta.type === 'Date') {
          if (meta.readOnly !== true) {
            return /*#__PURE__*/React__default['default'].createElement(Datetime__default['default'], {
              dateFormat: "DD.MM.YYYY",
              timeFormat: false,
              key: this.getID() + "Datetime",
              value: dateFromISOFormat(value),
              onChange: this.dateToISOFormat,
              onBlur: this.reload //TODO reload only for valid date
              ,
              closeOnSelect: true,
              closeOnTab: true,
              locale: this.props.localization.locale,
              inputProps: Object.assign({}, this.getBaseProps(), {
                ref: function ref(instance) {
                  _this2.dateInput = instance;
                },
                pattern: "(^$|\\d{1,2}\\.\\d{1,2}\\.\\d{4})",
                placeholder: extraAttrsMap.placeholder,
                onInput: this.dateValidationMessage,
                onInvalid: this.dateValidationMessage,
                autoComplete: "off"
              }),
              className: "Datetime-outer"
            });
          } else {
            var rawInputProps = this.getRawInputProps(value, extraAttrsMap);
            var rawTextValidation = this.getRawTextValidation(meta);
            return /*#__PURE__*/React__default['default'].createElement("input", _extends$2({
              type: 'text'
            }, rawInputProps, rawTextValidation, {
              value: dateFromISOFormat(value)
            }));
          }
        }

        if (meta.type === 'Time') {
          if (meta.readOnly !== true) {
            return /*#__PURE__*/React__default['default'].createElement(Datetime__default['default'], {
              dateFormat: "DD.MM.YYYY",
              timeFormat: "HH:mm",
              key: this.getID() + "Datetime",
              value: timeFromISOFormat(value),
              onChange: this.timeToISOFormat,
              onBlur: this.reload,
              closeOnSelect: true,
              closeOnTab: true,
              locale: this.props.localization.locale,
              inputProps: Object.assign({}, this.getBaseProps(), {
                ref: function ref(instance) {
                  _this2.timeInput = instance;
                },
                pattern: "(^$|\\d{1,2}\\.\\d{1,2}\\.\\d{4}\\s\\d{2}:\\d{2})",
                placeholder: extraAttrsMap.placeholder,
                onInput: this.timeValidationMessage,
                onInvalid: this.timeValidationMessage,
                autoComplete: "off"
              }),
              className: "Datetime-outer"
            });
          } else {
            var _rawInputProps = this.getRawInputProps(value, extraAttrsMap);

            var _rawTextValidation = this.getRawTextValidation(meta);

            return /*#__PURE__*/React__default['default'].createElement("input", _extends$2({
              type: 'text'
            }, _rawInputProps, _rawTextValidation, {
              value: timeFromISOFormat(value)
            }));
          }
        }

        if (meta.type === 'Timestamp') {
          if (meta.readOnly !== true) {
            return /*#__PURE__*/React__default['default'].createElement(Datetime__default['default'], {
              dateFormat: "DD.MM.YYYY",
              timeFormat: "HH:mm",
              key: this.getID() + "Datetime",
              value: timestampFromISOFormat(value),
              onChange: this.timestampToISOFormat,
              onBlur: this.reload,
              closeOnSelect: true,
              closeOnTab: true,
              locale: this.props.localization.locale,
              inputProps: Object.assign({}, this.getBaseProps(), {
                ref: function ref(instance) {
                  _this2.timestampInput = instance;
                },
                pattern: "(^$|\\d{1,2}\\.\\d{1,2}\\.\\d{4}\\s\\d{2}:\\d{2})",
                placeholder: extraAttrsMap.placeholder,
                onInput: this.timestampValidationMessage,
                onInvalid: this.timestampValidationMessage,
                autoComplete: "off"
              }),
              className: "Datetime-outer"
            });
          } else {
            var _rawInputProps2 = this.getRawInputProps(value, extraAttrsMap);

            var _rawTextValidation2 = this.getRawTextValidation(meta);

            return /*#__PURE__*/React__default['default'].createElement("input", _extends$2({
              type: 'text'
            }, _rawInputProps2, _rawTextValidation2, {
              value: timestampFromISOFormat(value)
            }));
          }
        }
      }
    }, {
      key: "dateToISOFormat",
      value: function dateToISOFormat(date) {
        this.dateInput.focus();

        if (typeof date === "string") {
          this.callOnChange(date);
        } else {
          this.callOnChange(date.format('YYYY-MM-DD'));
        }
      }
    }, {
      key: "timeToISOFormat",
      value: function timeToISOFormat(date) {
        this.timeInput.focus();

        if (typeof date === "string") {
          this.callOnChange(date);
        } else {
          this.callOnChange(date.format('YYYY-MM-DD HH:mm:ss'));
        }
      }
    }, {
      key: "timestampToISOFormat",
      value: function timestampToISOFormat(date) {
        this.timestampInput.focus();

        if (typeof date === "string") {
          this.callOnChange(date);
        } else {
          this.callOnChange(date.format('YYYY-MM-DD HH:mm:ss.SSS'));
        }
      }
    }, {
      key: "dateValidationMessage",
      value: function dateValidationMessage(e) {
        if (e.target.validity.patternMismatch) {
          e.target.setCustomValidity(this.props.localization.datePatternError);
        } else {
          e.target.setCustomValidity('');
        }
      }
    }, {
      key: "timeValidationMessage",
      value: function timeValidationMessage(e) {
        if (e.target.validity.patternMismatch) {
          e.target.setCustomValidity(this.props.localization.timePatternError);
        } else {
          e.target.setCustomValidity('');
        }
      }
    }, {
      key: "timestampValidationMessage",
      value: function timestampValidationMessage(e) {
        if (e.target.validity.patternMismatch) {
          e.target.setCustomValidity(this.props.localization.timestampPatternError);
        } else {
          e.target.setCustomValidity('');
        }
      }
    }]);

    return DateTimePropertyInput;
  }(BasePropertyInput);

  var dateFromISOFormat = function dateFromISOFormat(stringDate) {
    var date = moment__default['default'](stringDate, 'YYYY-MM-DD', true);

    if (date.isValid()) {
      return date.format('DD.MM.YYYY');
    } else {
      return stringDate;
    }
  };

  var timeFromISOFormat = function timeFromISOFormat(stringDate) {
    var date = moment__default['default'](stringDate, 'YYYY-MM-DD HH:mm:ss', true);

    if (date.isValid()) {
      return date.format('DD.MM.YYYY HH:mm');
    } else {
      return stringDate;
    }
  };

  var timestampFromISOFormat = function timestampFromISOFormat(stringDate) {
    var date;

    if (stringDate.length === 23) {
      date = moment__default['default'](stringDate, 'YYYY-MM-DD HH:mm:ss.SSS', true);
    } else if (stringDate.length === 22) {
      date = moment__default['default'](stringDate, 'YYYY-MM-DD HH:mm:ss.SS', true);
    } else {
      date = moment__default['default'](stringDate, 'YYYY-MM-DD HH:mm:ss.S', true);
    }

    if (date.isValid()) {
      return date.format('DD.MM.YYYY HH:mm');
    } else {
      return stringDate;
    }
  };

  function _typeof$5(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof$5 = function _typeof(obj) { return typeof obj; }; } else { _typeof$5 = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof$5(obj); }

  function _classCallCheck$5(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

  function _defineProperties$5(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

  function _createClass$5(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties$5(Constructor.prototype, protoProps); if (staticProps) _defineProperties$5(Constructor, staticProps); return Constructor; }

  function _inherits$5(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf$5(subClass, superClass); }

  function _setPrototypeOf$5(o, p) { _setPrototypeOf$5 = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf$5(o, p); }

  function _createSuper$5(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct$5(); return function _createSuperInternal() { var Super = _getPrototypeOf$5(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf$5(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn$5(this, result); }; }

  function _possibleConstructorReturn$5(self, call) { if (call && (_typeof$5(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized$5(self); }

  function _assertThisInitialized$5(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

  function _isNativeReflectConstruct$5() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

  function _getPrototypeOf$5(o) { _getPrototypeOf$5 = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf$5(o); }

  var WYSIWYGPropertyInput = /*#__PURE__*/function (_BasePropertyInput) {
    _inherits$5(WYSIWYGPropertyInput, _BasePropertyInput);

    var _super = _createSuper$5(WYSIWYGPropertyInput);

    function WYSIWYGPropertyInput(props) {
      var _this;

      _classCallCheck$5(this, WYSIWYGPropertyInput);

      _this = _super.call(this, props);
      _this.editorOnChange = _this.editorOnChange.bind(_assertThisInitialized$5(_this));
      _this.editorReload = _this.editorReload.bind(_assertThisInitialized$5(_this));
      _this.onInit = _this.onInit.bind(_assertThisInitialized$5(_this));
      return _this;
    }

    _createClass$5(WYSIWYGPropertyInput, [{
      key: "componentDidUpdate",
      value: function componentDidUpdate() {
        this.onInit();
      }
    }, {
      key: "editorOnChange",
      value: function editorOnChange(evt) {
        this.callOnChange(evt.editor.getData());
      }
    }, {
      key: "editorReload",
      value: function editorReload() {
        this.reload();
      }
    }, {
      key: "render",
      value: function render() {
        var _this2 = this;

        return /*#__PURE__*/React__default['default'].createElement(CKEditor__default['default'], {
          onBeforeLoad: function onBeforeLoad(CKEDITOR) {
            return CKEDITOR.disableAutoInline = true;
          },
          ref: function ref(instance) {
            _this2.ckeditor = instance;
          },
          data: this.getValue(),
          events: this.getEvents(),
          config: this.getConfig(),
          scriptUrl: this.getScriptUrl(),
          onChange: function onChange(evt) {
            return _this2.editorOnChange(evt);
          }
        });
      }
    }, {
      key: "getConfig",
      value: function getConfig() {
        var meta = this.getMeta();
        return {
          toolbar: [{
            name: 'row1',
            items: ['Cut', 'Copy', 'Paste', 'PasteText', 'PasteFromWord', 'CopyFormatting', 'RemoveFormat', '-', 'Undo', 'Redo', '-', '-', 'Image', 'Table', 'HorizontalRule', 'Smiley', 'SpecialChar', 'Image Resizer', '-', 'Link', 'Unlink', 'Anchor']
          }, '/', {
            name: 'row2',
            items: ['NumberedList', 'BulletedList', 'Blockquote', '-', 'Styles', 'Format', 'Font', 'FontSize']
          }, '/', {
            name: 'row3',
            items: ['Bold', 'Italic', 'Underline', 'Strike', 'Subscript', 'Superscript', '-', 'JustifyLeft', 'JustifyCenter', 'JustifyRight', 'JustifyBlock', '-', 'TextColor', 'BGColor', '-', 'Source', 'Maximize']
          }],
          extraPlugins: 'colorbutton,copyformatting,font,justify,image2,maximize,smiley',
          removePlugins: 'image',
          removeButtons: '',
          language: this.props.localization.locale,
          readOnly: meta.readOnly
        };
      }
    }, {
      key: "getScriptUrl",
      value: function getScriptUrl() {
        return undefined;
      }
    }, {
      key: "getEvents",
      value: function getEvents() {
        return {
          "change": this.editorOnChange,
          "blur": this.editorReload,
          "instanceReady": this.onInit
        };
      }
    }, {
      key: "onInit",
      value: function onInit() {
        if (this.ckeditor && this.ckeditor.editorInstance) {
          WYSIWYGPropertyInput.updateCKEditor(this.ckeditor, this.getValue(), this.getMeta().readOnly === true);
        }
      }
    }], [{
      key: "updateCKEditor",
      value: function updateCKEditor(ckeditor, value, readOnly) {
        if (ckeditor.editorInstance.getData() !== value) {
          ckeditor.editorInstance.setData(value);
        }

        ckeditor.editorInstance.setReadOnly(readOnly);
      }
    }]);

    return WYSIWYGPropertyInput;
  }(BasePropertyInput);

  function _typeof$6(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof$6 = function _typeof(obj) { return typeof obj; }; } else { _typeof$6 = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof$6(obj); }

  function _classCallCheck$6(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

  function _defineProperties$6(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

  function _createClass$6(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties$6(Constructor.prototype, protoProps); if (staticProps) _defineProperties$6(Constructor, staticProps); return Constructor; }

  function _inherits$6(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf$6(subClass, superClass); }

  function _setPrototypeOf$6(o, p) { _setPrototypeOf$6 = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf$6(o, p); }

  function _createSuper$6(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct$6(); return function _createSuperInternal() { var Super = _getPrototypeOf$6(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf$6(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn$6(this, result); }; }

  function _possibleConstructorReturn$6(self, call) { if (call && (_typeof$6(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized$6(self); }

  function _assertThisInitialized$6(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

  function _isNativeReflectConstruct$6() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

  function _getPrototypeOf$6(o) { _getPrototypeOf$6 = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf$6(o); }

  var LabelPropertyInput = /*#__PURE__*/function (_BasePropertyInput) {
    _inherits$6(LabelPropertyInput, _BasePropertyInput);

    var _super = _createSuper$6(LabelPropertyInput);

    function LabelPropertyInput(props) {
      _classCallCheck$6(this, LabelPropertyInput);

      return _super.call(this, props);
    }

    _createClass$6(LabelPropertyInput, [{
      key: "render",
      value: function render() {
        var id = this.getID();
        var meta = this.getMeta();
        var value = this.getValue();
        var labelPropertyClasses = classNames__default['default']('property-input', this.props.controlClassName, {
          'text-danger': meta.status === 'error'
        }, {
          'text-success': meta.status === 'success'
        }, {
          'text-warning': meta.status === 'warning'
        }, {
          'col-form-label-sm': this.props.bsSize === "sm"
        }, {
          'col-form-label-lg': this.props.bsSize === "lg"
        });

        if (meta.rawValue) {
          return /*#__PURE__*/React__default['default'].createElement("label", {
            id: id,
            key: id,
            className: labelPropertyClasses,
            dangerouslySetInnerHTML: {
              __html: value
            }
          });
        } else {
          return /*#__PURE__*/React__default['default'].createElement("label", {
            className: labelPropertyClasses,
            id: id,
            key: id
          }, value);
        }
      }
    }]);

    return LabelPropertyInput;
  }(BasePropertyInput);

  function _typeof$7(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof$7 = function _typeof(obj) { return typeof obj; }; } else { _typeof$7 = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof$7(obj); }

  function _classCallCheck$7(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

  function _defineProperties$7(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

  function _createClass$7(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties$7(Constructor.prototype, protoProps); if (staticProps) _defineProperties$7(Constructor, staticProps); return Constructor; }

  function _inherits$7(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf$7(subClass, superClass); }

  function _setPrototypeOf$7(o, p) { _setPrototypeOf$7 = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf$7(o, p); }

  function _createSuper$7(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct$7(); return function _createSuperInternal() { var Super = _getPrototypeOf$7(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf$7(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn$7(this, result); }; }

  function _possibleConstructorReturn$7(self, call) { if (call && (_typeof$7(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized$7(self); }

  function _assertThisInitialized$7(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

  function _isNativeReflectConstruct$7() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

  function _getPrototypeOf$7(o) { _getPrototypeOf$7 = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf$7(o); }

  var ButtonPropertyInput = /*#__PURE__*/function (_BasePropertyInput) {
    _inherits$7(ButtonPropertyInput, _BasePropertyInput);

    var _super = _createSuper$7(ButtonPropertyInput);

    function ButtonPropertyInput(props) {
      _classCallCheck$7(this, ButtonPropertyInput);

      return _super.call(this, props);
    }

    _createClass$7(ButtonPropertyInput, [{
      key: "render",
      value: function render() {
        var id = this.getID();
        var meta = this.getMeta();
        var value = this.getValue();
        var labelPropertyClasses = classNames__default['default']('property-input', 'btn btn-primary', this.props.controlClassName);
        return /*#__PURE__*/React__default['default'].createElement("button", {
          type: "button",
          className: labelPropertyClasses,
          id: id,
          key: id,
          onClick: this.reload
        }, value || meta.displayName || id);
      }
    }]);

    return ButtonPropertyInput;
  }(BasePropertyInput);

  function _typeof$8(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof$8 = function _typeof(obj) { return typeof obj; }; } else { _typeof$8 = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof$8(obj); }

  function _extends$3() { _extends$3 = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends$3.apply(this, arguments); }

  function _classCallCheck$8(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

  function _defineProperties$8(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

  function _createClass$8(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties$8(Constructor.prototype, protoProps); if (staticProps) _defineProperties$8(Constructor, staticProps); return Constructor; }

  function _inherits$8(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf$8(subClass, superClass); }

  function _setPrototypeOf$8(o, p) { _setPrototypeOf$8 = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf$8(o, p); }

  function _createSuper$8(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct$8(); return function _createSuperInternal() { var Super = _getPrototypeOf$8(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf$8(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn$8(this, result); }; }

  function _possibleConstructorReturn$8(self, call) { if (call && (_typeof$8(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized$8(self); }

  function _assertThisInitialized$8(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

  function _isNativeReflectConstruct$8() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

  function _getPrototypeOf$8(o) { _getPrototypeOf$8 = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf$8(o); }
  //import Promise from 'pinkie-promise';

  var Base64FilePropertyInput = /*#__PURE__*/function (_BasePropertyInput) {
    _inherits$8(Base64FilePropertyInput, _BasePropertyInput);

    var _super = _createSuper$8(Base64FilePropertyInput);

    function Base64FilePropertyInput(props) {
      var _this;

      _classCallCheck$8(this, Base64FilePropertyInput);

      _this = _super.call(this, props);
      _this.base64FileHandle = _this.base64FileHandle.bind(_assertThisInitialized$8(_this));
      return _this;
    }

    _createClass$8(Base64FilePropertyInput, [{
      key: "render",
      value: function render() {
        var meta = this.getMeta();
        return /*#__PURE__*/React__default['default'].createElement("input", _extends$3({
          type: "file",
          multiple: meta.multipleSelectionList,
          onChange: this.base64FileHandle
        }, this.getBaseProps()));
      }
    }, {
      key: "base64FileHandle",
      value: function base64FileHandle(e) {
        var _this2 = this;

        if (e.target.files && e.target.files.length === 1) {
          var fileName = e.target.files[0].name;
          Base64FilePropertyInput.getBase64(e.target.files[0]).then(function (data) {
            _this2.callOnChange(JSON.stringify({
              type: "Base64File",
              name: fileName,
              data: data
            }));
          });
        } else if (e.target.files && e.target.files.length === 0) {
          this.callOnChange("");
        }
      }
    }], [{
      key: "getBase64",
      value: function getBase64(file) {
        return new Promise(function (resolve, reject) {
          var reader = new FileReader();
          reader.addEventListener("load", function () {
            resolve(reader.result);
          }, false);

          reader.onerror = function (error) {
            return reject(error);
          };

          reader.readAsDataURL(file);
        });
      }
    }]);

    return Base64FilePropertyInput;
  }(BasePropertyInput);

  function _typeof$9(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof$9 = function _typeof(obj) { return typeof obj; }; } else { _typeof$9 = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof$9(obj); }

  function _extends$4() { _extends$4 = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends$4.apply(this, arguments); }

  function _classCallCheck$9(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

  function _defineProperties$9(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

  function _createClass$9(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties$9(Constructor.prototype, protoProps); if (staticProps) _defineProperties$9(Constructor, staticProps); return Constructor; }

  function _inherits$9(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf$9(subClass, superClass); }

  function _setPrototypeOf$9(o, p) { _setPrototypeOf$9 = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf$9(o, p); }

  function _createSuper$9(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct$9(); return function _createSuperInternal() { var Super = _getPrototypeOf$9(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf$9(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn$9(this, result); }; }

  function _possibleConstructorReturn$9(self, call) { if (call && (_typeof$9(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized$9(self); }

  function _assertThisInitialized$9(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

  function _isNativeReflectConstruct$9() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

  function _getPrototypeOf$9(o) { _getPrototypeOf$9 = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf$9(o); }

  var FilePropertyInput = /*#__PURE__*/function (_BasePropertyInput) {
    _inherits$9(FilePropertyInput, _BasePropertyInput);

    var _super = _createSuper$9(FilePropertyInput);

    function FilePropertyInput(props) {
      var _this;

      _classCallCheck$9(this, FilePropertyInput);

      _this = _super.call(this, props);
      _this.fileHandle = _this.fileHandle.bind(_assertThisInitialized$9(_this));
      return _this;
    }

    _createClass$9(FilePropertyInput, [{
      key: "render",
      value: function render() {
        var meta = this.getMeta();
        return /*#__PURE__*/React__default['default'].createElement("input", _extends$4({
          type: "file",
          multiple: meta.multipleSelectionList,
          onChange: this.fileHandle
        }, this.getBaseProps()));
      }
    }, {
      key: "fileHandle",
      value: function fileHandle(e) {
        this.callOnChange(e.target.files);
      }
    }]);

    return FilePropertyInput;
  }(BasePropertyInput);

  var propertyInputs = {};
  var getPropertyInput = function getPropertyInput(name) {
    return propertyInputs[name];
  };

  function _typeof$a(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof$a = function _typeof(obj) { return typeof obj; }; } else { _typeof$a = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof$a(obj); }

  function _extends$5() { _extends$5 = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends$5.apply(this, arguments); }

  function _classCallCheck$a(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

  function _defineProperties$a(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

  function _createClass$a(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties$a(Constructor.prototype, protoProps); if (staticProps) _defineProperties$a(Constructor, staticProps); return Constructor; }

  function _inherits$a(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf$a(subClass, superClass); }

  function _setPrototypeOf$a(o, p) { _setPrototypeOf$a = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf$a(o, p); }

  function _createSuper$a(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct$a(); return function _createSuperInternal() { var Super = _getPrototypeOf$a(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf$a(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn$a(this, result); }; }

  function _possibleConstructorReturn$a(self, call) { if (call && (_typeof$a(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized$a(self); }

  function _assertThisInitialized$a(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

  function _isNativeReflectConstruct$a() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

  function _getPrototypeOf$a(o) { _getPrototypeOf$a = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf$a(o); }

  var AsyncSelectPropertyInput = /*#__PURE__*/function (_SelectPropertyInput) {
    _inherits$a(AsyncSelectPropertyInput, _SelectPropertyInput);

    var _super = _createSuper$a(AsyncSelectPropertyInput);

    function AsyncSelectPropertyInput(props) {
      var _this;

      _classCallCheck$a(this, AsyncSelectPropertyInput);

      _this = _super.call(this, props);
      _this.state = {
        selectedOptions: []
      };
      _this.loadOptions = _this.loadOptions.bind(_assertThisInitialized$a(_this));
      return _this;
    }

    _createClass$a(AsyncSelectPropertyInput, [{
      key: "componentDidMount",
      value: function componentDidMount() {
        var value = this.getValue();

        if (value !== "") {
          this.setState({
            selectedOptions: this.getOptions().filter(function (option) {
              return option.value === value;
            })
          });
        }
      }
    }, {
      key: "UNSAFE_componentWillReceiveProps",
      value: function UNSAFE_componentWillReceiveProps(nextProps) {
        var rawValue = SelectPropertyInput.getRawValue(this.state.selectedOptions);

        if (Array.isArray(nextProps.value)) {
          if (!arraysEqual(rawValue, nextProps.value)) this.setState({
            value: nextProps.value
          });
        } else {
          if (rawValue !== nextProps.value) this.setState({
            value: nextProps.value
          });
        }
      }
    }, {
      key: "getSelect",
      value: function getSelect(selectAttr, meta, extraAttrsMap) {
        return /*#__PURE__*/React__default['default'].createElement(Select.Async, _extends$5({}, selectAttr, {
          value: this.state.selectedOptions,
          loadOptions: this.loadOptions,
          defaultOptions: this.getOptions(),
          filterOption: function filterOption(options, filter, currentValues) {
            // Do no filtering, just return all options
            return options;
          }
        }));
      }
    }, {
      key: "loadOptions",
      value: function loadOptions(input, callback) {
        //todo check in big data
        var meta = this.getMeta();
        var extraAttrsMap = BasePropertyInput.getExtraAttrsMap(meta);
        this.props.selectLoadOptions(Object.assign({
          input: input
        }, extraAttrsMap), callback);
      }
    }]);

    return AsyncSelectPropertyInput;
  }(SelectPropertyInput);
  AsyncSelectPropertyInput.propTypes = {
    selectLoadOptions: PropTypes__default['default'].func
  };

  function _typeof$b(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof$b = function _typeof(obj) { return typeof obj; }; } else { _typeof$b = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof$b(obj); }

  function _extends$6() { _extends$6 = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends$6.apply(this, arguments); }

  function _classCallCheck$b(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

  function _defineProperties$b(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

  function _createClass$b(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties$b(Constructor.prototype, protoProps); if (staticProps) _defineProperties$b(Constructor, staticProps); return Constructor; }

  function _inherits$b(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf$b(subClass, superClass); }

  function _setPrototypeOf$b(o, p) { _setPrototypeOf$b = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf$b(o, p); }

  function _createSuper$b(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct$b(); return function _createSuperInternal() { var Super = _getPrototypeOf$b(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf$b(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn$b(this, result); }; }

  function _possibleConstructorReturn$b(self, call) { if (call && (_typeof$b(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized$b(self); }

  function _assertThisInitialized$b(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

  function _isNativeReflectConstruct$b() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

  function _getPrototypeOf$b(o) { _getPrototypeOf$b = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf$b(o); }

  var PropertyInput = /*#__PURE__*/function (_BasePropertyInput) {
    _inherits$b(PropertyInput, _BasePropertyInput);

    var _super = _createSuper$b(PropertyInput);

    function PropertyInput(props) {
      var _this;

      _classCallCheck$b(this, PropertyInput);

      _this = _super.call(this, props);
      _this.handleChangeBoolean = _this.handleChangeBoolean.bind(_assertThisInitialized$b(_this));
      return _this;
    }

    _createClass$b(PropertyInput, [{
      key: "shouldComponentUpdate",
      value: function shouldComponentUpdate(nextProps) {
        return shouldPropertyUpdate(this.props, nextProps) || this.props.value !== nextProps.value;
      }
    }, {
      key: "handleChangeBoolean",
      value: function handleChangeBoolean(event) {
        this.changeAndReload(event.target.checked);
      }
    }, {
      key: "render",
      value: function render() {
        var meta = this.getMeta();
        var value = this.getValue();
        var extraAttrsMap = BasePropertyInput.getExtraAttrsMap(meta);

        if (extraAttrsMap.inputType !== undefined && getPropertyInput(extraAttrsMap.inputType) !== undefined) {
          var CustomPropertyInput = getPropertyInput(extraAttrsMap.inputType);
          return /*#__PURE__*/React__default['default'].createElement(CustomPropertyInput, this.props);
        }

        if (extraAttrsMap.inputType === "AsyncSelect" && this.props.selectLoadOptions !== undefined) {
          return /*#__PURE__*/React__default['default'].createElement(AsyncSelectPropertyInput, this.props);
        }

        if (['Button', 'button'].includes(extraAttrsMap.inputType)) {
          return /*#__PURE__*/React__default['default'].createElement(ButtonPropertyInput, this.props);
        }

        if (meta.tagList) {
          if (extraAttrsMap.inputType === "radio") {
            return /*#__PURE__*/React__default['default'].createElement(RadioSelectPropertyInput, this.props);
          } else {
            return /*#__PURE__*/React__default['default'].createElement(SelectPropertyInput, this.props);
          }
        }

        if (meta.labelField) {
          return /*#__PURE__*/React__default['default'].createElement(LabelPropertyInput, this.props);
        }

        if (extraAttrsMap.inputType === 'WYSIWYG') {
          return /*#__PURE__*/React__default['default'].createElement(WYSIWYGPropertyInput, this.props);
        }

        if (['Short', 'Integer', 'Long', 'Double'].includes(meta.type) || this.getValidationRule('range') !== undefined || this.getValidationRule('step') !== undefined) {
          return /*#__PURE__*/React__default['default'].createElement(NumberPropertyInput, this.props);
        }

        if (meta.type === 'Base64File') {
          return /*#__PURE__*/React__default['default'].createElement(Base64FilePropertyInput, this.props);
        }

        if (meta.type === 'File') {
          return /*#__PURE__*/React__default['default'].createElement(FilePropertyInput, this.props);
        }

        if (meta.type === 'Date' || meta.type === 'Time' || meta.type === 'Timestamp') {
          return /*#__PURE__*/React__default['default'].createElement(DateTimePropertyInput, this.props);
        }

        if (meta.type === 'Boolean') {
          return /*#__PURE__*/React__default['default'].createElement("input", _extends$6({
            type: "checkbox",
            checked: value === true || value === "true",
            onChange: this.handleChangeBoolean
          }, this.getBaseProps()));
        }

        if (isDPS(meta)) {
          meta.hidden = true;
          return /*#__PURE__*/React__default['default'].createElement("input", _extends$6({
            value: JSON.stringify(value)
          }, this.getBaseProps()));
        }

        var rawInputProps = this.getRawInputProps(value, extraAttrsMap);
        var rawTextValidation = this.getRawTextValidation(meta);

        if (extraAttrsMap.inputType === 'textArea') {
          return /*#__PURE__*/React__default['default'].createElement("textarea", _extends$6({
            rows: extraAttrsMap.rows || 3
          }, rawInputProps, rawTextValidation));
        }

        var validationRuleMask = this.getValidationRule('mask');

        if (validationRuleMask !== undefined) {
          return /*#__PURE__*/React__default['default'].createElement(MaskedInput__default['default'], _extends$6({
            mask: validationRuleMask.attr,
            value: value,
            onChange: this.handleChange,
            onBlur: this.reload
          }, this.getBaseProps()));
        }

        return /*#__PURE__*/React__default['default'].createElement("input", _extends$6({
          type: extraAttrsMap.inputType || 'text'
        }, rawInputProps, rawTextValidation));
      }
    }]);

    return PropertyInput;
  }(BasePropertyInput);

  PropertyInput.propTypes = {
    bean: PropTypes__default['default'].object.isRequired,
    value: PropTypes__default['default'].any.isRequired,
    path: PropTypes__default['default'].string,
    id: PropTypes__default['default'].number,
    inline: PropTypes__default['default'].bool,
    horizontal: PropTypes__default['default'].bool,
    horizontalColSize: PropTypes__default['default'].number,
    rowClass: PropTypes__default['default'].string,
    bsSize: PropTypes__default['default'].string,
    onChange: PropTypes__default['default'].func,
    reloadOnChange: PropTypes__default['default'].func,
    localization: PropTypes__default['default'].object,
    className: PropTypes__default['default'].string
  };

  function _typeof$c(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof$c = function _typeof(obj) { return typeof obj; }; } else { _typeof$c = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof$c(obj); }

  function _classCallCheck$c(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

  function _defineProperties$c(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

  function _createClass$c(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties$c(Constructor.prototype, protoProps); if (staticProps) _defineProperties$c(Constructor, staticProps); return Constructor; }

  function _inherits$c(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf$c(subClass, superClass); }

  function _setPrototypeOf$c(o, p) { _setPrototypeOf$c = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf$c(o, p); }

  function _createSuper$c(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct$c(); return function _createSuperInternal() { var Super = _getPrototypeOf$c(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf$c(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn$c(this, result); }; }

  function _possibleConstructorReturn$c(self, call) { if (call && (_typeof$c(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized$c(self); }

  function _assertThisInitialized$c(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

  function _isNativeReflectConstruct$c() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

  function _getPrototypeOf$c(o) { _getPrototypeOf$c = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf$c(o); }

  var Property = /*#__PURE__*/function (_React$Component) {
    _inherits$c(Property, _React$Component);

    var _super = _createSuper$c(Property);

    function Property() {
      _classCallCheck$c(this, Property);

      return _super.apply(this, arguments);
    }

    _createClass$c(Property, [{
      key: "shouldComponentUpdate",
      value: function shouldComponentUpdate(nextProps) {
        return shouldPropertyUpdate(this.props, nextProps) || this.props.value !== nextProps.value;
      }
    }, {
      key: "getPath",
      value: function getPath() {
        if (this.props.path) {
          return this.props.path;
        } else {
          return this.props.bean.order[this.props.id];
        }
      }
    }, {
      key: "render",
      value: function render() {
        var path = this.getPath();
        var meta = this.props.bean.meta[path];
        var id = path.substring(path.lastIndexOf("/") + 1) + "PropertyInput";
        var extraAttrsMap = BasePropertyInput.getExtraAttrsMap(meta);
        var label;

        if (meta.displayName) {
          label = /*#__PURE__*/React__default['default'].createElement("label", {
            htmlFor: id,
            className: classNames__default['default'](meta.type === 'Boolean' ? 'form-check-label' : 'form-control-label', {
              'mr-sm-2': this.props.inline && meta.type !== 'Boolean'
            }, {
              'col-form-label': this.props.horizontal && meta.type !== 'Boolean'
            }, inputLabelSizeClasses(this.props, meta.type))
          }, meta.displayName);
        }

        var messageElement;

        if (meta.message) {
          var validationClasses = classNames__default['default']({
            'invalid-feedback': meta.status === 'error'
          }, {
            'valid-feedback': meta.status === 'success'
          });

          if (validationClasses) {
            messageElement = /*#__PURE__*/React__default['default'].createElement("div", {
              className: validationClasses,
              dangerouslySetInnerHTML: {
                __html: meta.message
              }
            });
          } else {
            messageElement = /*#__PURE__*/React__default['default'].createElement("small", {
              className: "form-text text-muted",
              dangerouslySetInnerHTML: {
                __html: meta.message
              }
            });
          }
        }

        var inputTypeButton = ['Button', 'button'].includes(extraAttrsMap.inputType);
        var formGroupClasses = classNames__default['default']('property', {
          'form-group': meta.type !== 'Boolean'
        }, {
          'form-check': meta.type === 'Boolean'
        }, {
          'required': !inputTypeButton && meta.canBeNull !== true
        });

        if (isDPS(meta)) {
          meta.hidden = true;
        }

        if (this.props.inline) {
          var outerClasses = classNames__default['default'](formGroupClasses, meta.cssClasses || this.props.className || 'mb-2 mr-sm-2', {
            'display-none': meta.hidden
          });

          if (meta.type === "Boolean") {
            return /*#__PURE__*/React__default['default'].createElement("div", {
              className: outerClasses
            }, /*#__PURE__*/React__default['default'].createElement(PropertyInput, this.props), label);
          } else {
            return /*#__PURE__*/React__default['default'].createElement("div", {
              className: outerClasses
            }, label, /*#__PURE__*/React__default['default'].createElement(PropertyInput, this.props));
          }
        } else if (this.props.horizontal) {
          var _outerClasses = classNames__default['default']('horizontal-input', {
            'horizontal-input--sm': this.props.bsSize === "sm"
          }, {
            'horizontal-input--lg': this.props.bsSize === "lg"
          }, meta.cssClasses || this.props.className, //todo check col-any-?
          meta.cssClasses && meta.cssClasses.includes('col-lg-') ? '' : 'col-lg-12', {
            'display-none': meta.hidden
          });

          if (meta.type === "Boolean" || inputTypeButton && !(meta.cssClasses && meta.cssClasses.includes('col-lg-'))) {
            var colTag = 'col-lg-' + (12 - this.props.horizontalColSize);
            var offsetTag = 'offset-lg-' + this.props.horizontalColSize;
            return /*#__PURE__*/React__default['default'].createElement("div", {
              className: classNames__default['default'](_outerClasses)
            }, /*#__PURE__*/React__default['default'].createElement("div", {
              className: this.props.rowClass
            }, /*#__PURE__*/React__default['default'].createElement("div", {
              className: classNames__default['default'](colTag, offsetTag)
            }, /*#__PURE__*/React__default['default'].createElement("div", {
              className: classNames__default['default'](formGroupClasses)
            }, /*#__PURE__*/React__default['default'].createElement(PropertyInput, this.props), !inputTypeButton ? label : "", messageElement))));
          } else if (inputTypeButton && meta.cssClasses && meta.cssClasses.includes('col-lg-')) {
            return /*#__PURE__*/React__default['default'].createElement("div", {
              className: classNames__default['default'](_outerClasses, 'offset-lg-' + this.props.horizontalColSize, "text-nowrap")
            }, /*#__PURE__*/React__default['default'].createElement("div", {
              className: classNames__default['default'](formGroupClasses)
            }, /*#__PURE__*/React__default['default'].createElement(PropertyInput, this.props), !inputTypeButton ? label : "", messageElement));
          } else {
            return /*#__PURE__*/React__default['default'].createElement("div", {
              className: classNames__default['default'](_outerClasses)
            }, /*#__PURE__*/React__default['default'].createElement("div", {
              className: classNames__default['default'](formGroupClasses, this.props.rowClass)
            }, /*#__PURE__*/React__default['default'].createElement("div", {
              className: classNames__default['default']('col-lg-' + this.props.horizontalColSize, 'col-form-control-label')
            }, label), /*#__PURE__*/React__default['default'].createElement("div", {
              className: 'col-lg-' + (12 - this.props.horizontalColSize)
            }, /*#__PURE__*/React__default['default'].createElement(PropertyInput, this.props), messageElement)));
          }
        } else {
          var _outerClasses2 = classNames__default['default']('vertical-input', {
            'vertical-input--sm': this.props.bsSize === "sm"
          }, {
            'vertical-input--lg': this.props.bsSize === "lg"
          }, meta.cssClasses || this.props.className, meta.cssClasses && meta.cssClasses.includes('col-lg-') ? '' : 'col-lg-12', {
            'display-none': meta.hidden
          });

          if (meta.type === "Boolean" || inputTypeButton) {
            return /*#__PURE__*/React__default['default'].createElement("div", {
              className: _outerClasses2
            }, /*#__PURE__*/React__default['default'].createElement("div", {
              className: formGroupClasses
            }, /*#__PURE__*/React__default['default'].createElement(PropertyInput, this.props), !inputTypeButton ? label : "", messageElement));
          } else if (meta.labelField) {
            return /*#__PURE__*/React__default['default'].createElement("div", {
              className: _outerClasses2
            }, /*#__PURE__*/React__default['default'].createElement("div", {
              className: classNames__default['default']('property-label', formGroupClasses)
            }, /*#__PURE__*/React__default['default'].createElement(PropertyInput, this.props), messageElement));
          } else {
            return /*#__PURE__*/React__default['default'].createElement("div", {
              className: _outerClasses2
            }, /*#__PURE__*/React__default['default'].createElement("div", {
              className: formGroupClasses
            }, label, /*#__PURE__*/React__default['default'].createElement("div", {
              className: "controls"
            }, /*#__PURE__*/React__default['default'].createElement(PropertyInput, this.props), messageElement)));
          }
        }
      }
    }]);

    return Property;
  }(React__default['default'].Component);

  Property.propTypes = {
    bean: PropTypes__default['default'].object.isRequired,
    value: PropTypes__default['default'].any.isRequired,
    path: PropTypes__default['default'].string,
    id: PropTypes__default['default'].number,
    inline: PropTypes__default['default'].bool,
    horizontal: PropTypes__default['default'].bool,
    horizontalColSize: PropTypes__default['default'].number,
    rowClass: PropTypes__default['default'].string,
    bsSize: PropTypes__default['default'].string,
    onChange: PropTypes__default['default'].func,
    reloadOnChange: PropTypes__default['default'].func,
    localization: PropTypes__default['default'].object,
    className: PropTypes__default['default'].string
  };
  Property.defaultProps = {
    horizontalColSize: 3,
    rowClass: "form-row"
  };

  function _typeof$d(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof$d = function _typeof(obj) { return typeof obj; }; } else { _typeof$d = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof$d(obj); }

  function _extends$7() { _extends$7 = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends$7.apply(this, arguments); }

  function _classCallCheck$d(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

  function _defineProperties$d(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

  function _createClass$d(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties$d(Constructor.prototype, protoProps); if (staticProps) _defineProperties$d(Constructor, staticProps); return Constructor; }

  function _inherits$d(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf$d(subClass, superClass); }

  function _setPrototypeOf$d(o, p) { _setPrototypeOf$d = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf$d(o, p); }

  function _createSuper$d(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct$d(); return function _createSuperInternal() { var Super = _getPrototypeOf$d(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf$d(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn$d(this, result); }; }

  function _possibleConstructorReturn$d(self, call) { if (call && (_typeof$d(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized$d(self); }

  function _assertThisInitialized$d(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

  function _isNativeReflectConstruct$d() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

  function _getPrototypeOf$d(o) { _getPrototypeOf$d = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf$d(o); }

  var Properties = /*#__PURE__*/function (_React$Component) {
    _inherits$d(Properties, _React$Component);

    var _super = _createSuper$d(Properties);

    function Properties() {
      _classCallCheck$d(this, Properties);

      return _super.apply(this, arguments);
    }

    _createClass$d(Properties, [{
      key: "shouldComponentUpdate",
      value: function shouldComponentUpdate(nextProps) {
        return shouldPropertyUpdate(this.props, nextProps) || this.props.values !== nextProps.values;
      }
    }, {
      key: "render",
      value: function render() {
        var _this = this;

        var fields = this.props.bean.order.map(function (path, i) {
          if (_this.props.ids === undefined || _this.props.ids.includes(i)) {
            return /*#__PURE__*/React__default['default'].createElement(Property, _extends$7({
              path: path,
              key: path
            }, _this.props, {
              value: _this.getValue(path)
            }));
          } else {
            return null;
          }
        }); //todo remove outer element after migrate to react 16.2

        return /*#__PURE__*/React__default['default'].createElement("div", {
          className: this.props.rowClass
        }, fields);
      }
    }, {
      key: "getValue",
      value: function getValue(path) {
        var values = this.props.values || this.props.bean.values;
        return JsonPointer__default['default'].get(values, path);
      }
    }]);

    return Properties;
  }(React__default['default'].Component);

  Properties.defaultProps = {
    rowClass: "form-row"
  };
  Properties.propTypes = {
    rowClass: PropTypes__default['default'].string,
    bean: PropTypes__default['default'].object.isRequired,
    values: PropTypes__default['default'].object,
    ids: PropTypes__default['default'].array,
    inline: PropTypes__default['default'].bool,
    bsSize: PropTypes__default['default'].string,
    onChange: PropTypes__default['default'].func,
    reloadOnChange: PropTypes__default['default'].func,
    localization: PropTypes__default['default'].object
  };

  function _typeof$e(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof$e = function _typeof(obj) { return typeof obj; }; } else { _typeof$e = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof$e(obj); }

  function _extends$8() { _extends$8 = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends$8.apply(this, arguments); }

  function _createForOfIteratorHelper(o, allowArrayLike) { var it; if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

  function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

  function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

  function _classCallCheck$e(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

  function _defineProperties$e(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

  function _createClass$e(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties$e(Constructor.prototype, protoProps); if (staticProps) _defineProperties$e(Constructor, staticProps); return Constructor; }

  function _inherits$e(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf$e(subClass, superClass); }

  function _setPrototypeOf$e(o, p) { _setPrototypeOf$e = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf$e(o, p); }

  function _createSuper$e(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct$e(); return function _createSuperInternal() { var Super = _getPrototypeOf$e(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf$e(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn$e(this, result); }; }

  function _possibleConstructorReturn$e(self, call) { if (call && (_typeof$e(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized$e(self); }

  function _assertThisInitialized$e(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

  function _isNativeReflectConstruct$e() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

  function _getPrototypeOf$e(o) { _getPrototypeOf$e = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf$e(o); }

  var PropertySet = /*#__PURE__*/function (_React$Component) {
    _inherits$e(PropertySet, _React$Component);

    var _super = _createSuper$e(PropertySet);

    function PropertySet() {
      _classCallCheck$e(this, PropertySet);

      return _super.apply(this, arguments);
    }

    _createClass$e(PropertySet, [{
      key: "shouldComponentUpdate",
      value: function shouldComponentUpdate(nextProps) {
        return shouldPropertyUpdate(this.props, nextProps) || this.props.values !== nextProps.values;
      }
    }, {
      key: "hasGroup",
      value: function hasGroup() {
        var _iterator = _createForOfIteratorHelper(this.props.bean.order),
            _step;

        try {
          for (_iterator.s(); !(_step = _iterator.n()).done;) {
            var path = _step.value;
            var meta = this.props.bean.meta[path];

            if (meta.groupId) {
              return true;
            }
          }
        } catch (err) {
          _iterator.e(err);
        } finally {
          _iterator.f();
        }

        return false;
      }
    }, {
      key: "hasNestedDPS",
      value: function hasNestedDPS() {
        var _iterator2 = _createForOfIteratorHelper(this.props.bean.order),
            _step2;

        try {
          for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
            var path = _step2.value;
            var meta = this.props.bean.meta[path];

            if (isDPS(meta)) {
              return true;
            }
          }
        } catch (err) {
          _iterator2.e(err);
        } finally {
          _iterator2.f();
        }

        return false;
      }
    }, {
      key: "getTabs",
      value: function getTabs() {
        var tabs = [];
        var tabIds = [];

        var _iterator3 = _createForOfIteratorHelper(this.props.bean.order),
            _step3;

        try {
          for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {
            var path = _step3.value;
            var meta = this.props.bean.meta[path];

            if (!meta.tabId && tabIds.indexOf(-1) === -1) {
              tabIds.push(-1);
              tabs.push({
                tabId: "-1",
                tabName: "main"
              });
            } else if (meta.tabId && tabIds.indexOf(+meta.tabId) === -1) {
              tabIds.push(+meta.tabId);
              tabs.push({
                tabId: meta.tabId,
                tabName: meta.tabName ? meta.tabName : "tab ".concat(meta.tabId)
              });
            }
          }
        } catch (err) {
          _iterator3.e(err);
        } finally {
          _iterator3.f();
        }

        return tabs.sort(function (a, b) {
          return +a.tabId - +b.tabId;
        });
      }
    }, {
      key: "getTabsHeader",
      value: function getTabsHeader(tabs) {
        return /*#__PURE__*/React__default['default'].createElement("ul", {
          key: "property_tabs_header",
          className: "nav nav-tabs col-12"
        }, tabs.map(function (tabInfo, idx) {
          return /*#__PURE__*/React__default['default'].createElement("li", {
            key: "tab_li_header_".concat(tabInfo.tabId),
            className: "nav-item"
          }, /*#__PURE__*/React__default['default'].createElement("a", {
            key: "tab_a_header_".concat(tabInfo.tabId),
            className: classNames__default['default']("nav-link", idx === 0 ? " active" : ""),
            "data-toggle": "tab",
            href: "#tab_" + tabInfo.tabId
          }, tabInfo.tabName));
        }));
      }
    }, {
      key: "getTabsContent",
      value: function getTabsContent(tabs, tabContent) {
        return /*#__PURE__*/React__default['default'].createElement("div", {
          key: "property_tabs_content",
          className: classNames__default['default']("tab-content property-tabs", this.props.horizontal ? "col-9" : "col-12")
        }, tabs.map(function (tabInfo, idx) {
          return /*#__PURE__*/React__default['default'].createElement("div", {
            key: "tab_content_".concat(tabInfo.tabId),
            className: "tab-pane fade" + (idx === 0 ? "show active" : ""),
            id: "tab_" + tabInfo.tabId
          }, tabContent[tabInfo.tabId]);
        }));
      }
    }, {
      key: "processingTabs",
      value: function processingTabs(tabs) {
        var orderList = this.props.bean.order;
        var tabsContent = {};

        var _iterator4 = _createForOfIteratorHelper(this.props.bean.order),
            _step4;

        try {
          for (_iterator4.s(); !(_step4 = _iterator4.n()).done;) {
            var path = _step4.value;
            var meta = this.props.bean.meta[path];
            var prop = /*#__PURE__*/React__default['default'].createElement(Property, _extends$8({
              key: path,
              path: path
            }, this.props, {
              value: this.getValue(path)
            }));
            var tabId = meta.tabId ? meta.tabId : "-1";

            if (!tabsContent[tabId]) {
              tabsContent[tabId] = [prop];
            } else {
              var _content = tabsContent[tabId];

              _content.push(prop);

              tabsContent[tabId] = _content;
            }
          }
        } catch (err) {
          _iterator4.e(err);
        } finally {
          _iterator4.f();
        }

        var content = [];
        content.push(this.getTabsHeader(tabs));
        content.push(this.getTabsContent(tabs, tabsContent));
        return content;
      }
    }, {
      key: "createGroupContainer",
      value: function createGroupContainer(curContainer, curContainerId, curContainerName, curContainerClasses, groupInitiallyClosed) {
        return /*#__PURE__*/React__default['default'].createElement("div", {
          className: classNames__default['default']('property-group', curContainerClasses || 'property-group__top-line col-12'),
          key: "group_".concat(curContainerId),
          ref: curContainerId
        }, /*#__PURE__*/React__default['default'].createElement("div", {
          className: 'property-group__top-line-row row'
        }), PropertySet.getName( /*#__PURE__*/React__default['default'].createElement("a", {
          "data-toggle": "collapse",
          href: "#property-group__collapse-".concat(curContainerId),
          role: "button",
          className: "property-group__title-link",
          "aria-expanded": !groupInitiallyClosed,
          "aria-controls": "property-group__collapse-".concat(curContainerId)
        }, curContainerName), 'property-group__title'), /*#__PURE__*/React__default['default'].createElement("div", {
          className: classNames__default['default']('collapse', {
            'show': !groupInitiallyClosed
          }),
          id: "property-group__collapse-".concat(curContainerId)
        }, /*#__PURE__*/React__default['default'].createElement("div", {
          className: classNames__default['default']('property-group__row', this.props.rowClass)
        }, curContainer)));
      }
    }, {
      key: "processingGroups",
      value: function processingGroups() {
        var _this = this;

        var curGroup = [];
        var curGroupName = null,
            curGroupId = null,
            curGroupClasses = null,
            groupInitiallyClosed = null;
        var fields = [];

        var finishGroup = function finishGroup() {
          if (curGroup.length > 0) {
            if (curGroupId) {
              fields.push(_this.createGroupContainer(curGroup, curGroupId, curGroupName, curGroupClasses, groupInitiallyClosed));
            } else {
              Array.prototype.push.apply(fields, curGroup);
            }
          }

          curGroup = [];
        };

        var _iterator5 = _createForOfIteratorHelper(this.props.bean.order),
            _step5;

        try {
          for (_iterator5.s(); !(_step5 = _iterator5.n()).done;) {
            var path = _step5.value;
            var meta = this.props.bean.meta[path];
            var newGroupId = meta.groupId;
            var newGroupName = meta.groupName;
            var newGroupClasses = meta.groupClasses;
            var newGroupInitiallyClosed = meta.groupInitiallyClosed;

            if (newGroupId !== curGroupId) {
              finishGroup();
              curGroupName = newGroupName;
              curGroupClasses = newGroupClasses;
              curGroupId = newGroupId;
              groupInitiallyClosed = newGroupInitiallyClosed;
            }

            var field = /*#__PURE__*/React__default['default'].createElement(Property, _extends$8({
              key: path,
              path: path
            }, this.props, {
              value: this.getValue(path)
            }));
            curGroup.push(field);
          }
        } catch (err) {
          _iterator5.e(err);
        } finally {
          _iterator5.f();
        }

        finishGroup();
        return fields;
      }
    }, {
      key: "createNestedPropsContainer",
      value: function createNestedPropsContainer(curContainer, curContainerId, curContainerName, curContainerClasses) {
        if (this.props.horizontal) {
          return /*#__PURE__*/React__default['default'].createElement("div", {
            className: classNames__default['default']('property-nested-dps', curContainerClasses || 'property-nested-dps__border col-12'),
            key: curContainerId,
            ref: curContainerId
          }, /*#__PURE__*/React__default['default'].createElement("div", {
            className: 'property-nested-dps__border-row row'
          }, /*#__PURE__*/React__default['default'].createElement("a", {
            className: 'property-nested-dps__link',
            "data-toggle": "collapse",
            href: "#" + curContainerId,
            role: "button",
            "aria-expanded": "false",
            "aria-controls": curContainerId
          }, PropertySet.getName(curContainerName, 'property-group__title')), /*#__PURE__*/React__default['default'].createElement("div", {
            id: curContainerId,
            className: classNames__default['default']('collapse', 'show', 'property-nested-dps__row', this.props.rowClass)
          }, curContainer)));
        } else {
          return /*#__PURE__*/React__default['default'].createElement("div", {
            className: classNames__default['default']('property-nested-dps', curContainerClasses || 'property-nested-dps__top-line col-12'),
            key: curContainerId,
            ref: curContainerId
          }, /*#__PURE__*/React__default['default'].createElement("div", {
            className: 'property-nested-dps__top-line-row row'
          }), /*#__PURE__*/React__default['default'].createElement("a", {
            className: 'property-nested-dps__link',
            "data-toggle": "collapse",
            href: "#" + curContainerId,
            role: "button",
            "aria-expanded": "false",
            "aria-controls": curContainerId
          }, PropertySet.getName(curContainerName, 'property-group__title')), /*#__PURE__*/React__default['default'].createElement("div", {
            id: curContainerId,
            className: classNames__default['default']('collapse', 'show', 'property-nested-dps__row', this.props.rowClass)
          }, curContainer), /*#__PURE__*/React__default['default'].createElement("div", {
            className: 'property-nested-dps__top-line-row row'
          }));
        }
      }
    }, {
      key: "createNestedProps",
      value: function createNestedProps(startIdx, list, parentPath) {
        var parentPropId = parentPath.substring(parentPath.lastIndexOf("/") + 1);
        var nestedPropsContainer = [];
        startIdx++;

        if (list.length > startIdx) {
          for (var i = startIdx; i < list.length; i++) {
            var path = list[i];
            var meta = this.props.bean.meta[path];
            startIdx = i;

            if (meta.parent == parentPropId) {
              if (nestedPropsContainer.length === 0) {
                nestedPropsContainer.push([/*#__PURE__*/React__default['default'].createElement(Property, _extends$8({
                  key: parentPath,
                  path: parentPath
                }, this.props, {
                  value: this.getValue(parentPath)
                }))]);
              }

              if (isDPS(meta)) {
                var idxAndNestedPropContainer = this.createNestedProps(i, list, path);
                i = idxAndNestedPropContainer[0];
                nestedPropsContainer.push(idxAndNestedPropContainer[1]); //get last element and checked for rerun if elements position after nested DPS

                if (this.props.bean.meta[list[i]].parent == parentPropId) {
                  i--;
                }

                startIdx = i;
              } else {
                startIdx = i;
                nestedPropsContainer.push( /*#__PURE__*/React__default['default'].createElement(Property, _extends$8({
                  key: path,
                  path: path
                }, this.props, {
                  value: this.getValue(path)
                })));
              }
            } else {
              break;
            }
          }
        }

        var parentMeta = this.props.bean.meta[parentPath];
        return [startIdx, this.createNestedPropsContainer(nestedPropsContainer, parentPropId, parentMeta.displayName, parentMeta.dpsClasses)];
      }
    }, {
      key: "processingNestedProperties",
      value: function processingNestedProperties() {
        var fields = [];
        var orderList = this.props.bean.order;

        for (var i = 0; i < orderList.length; i++) {
          var path = orderList[i];
          var meta = this.props.bean.meta[path];

          if (isDPS(meta)) {
            var idxAndNestedPropContainer = this.createNestedProps(i, orderList, path);
            i = idxAndNestedPropContainer[0];
            fields.push(idxAndNestedPropContainer[1]); //get last element and checked for rerun if element doesn't have parent

            if (!this.props.bean.meta[orderList[i]].parent) {
              i--;
            }
          } else {
            fields.push( /*#__PURE__*/React__default['default'].createElement(Property, _extends$8({
              key: path,
              path: path
            }, this.props, {
              value: this.getValue(path)
            })));
          }
        }

        return fields;
      }
    }, {
      key: "render",
      value: function render() {
        var fields = [];
        var tabs = this.getTabs();

        if (tabs.length > 1) {
          fields = this.processingTabs(tabs);
        } else if (this.hasGroup()) {
          fields = this.processingGroups();
        } else if (this.hasNestedDPS()) {
          fields = this.processingNestedProperties();
        } else {
          var _iterator6 = _createForOfIteratorHelper(this.props.bean.order),
              _step6;

          try {
            for (_iterator6.s(); !(_step6 = _iterator6.n()).done;) {
              var path = _step6.value;
              fields.push( /*#__PURE__*/React__default['default'].createElement(Property, _extends$8({
                key: path,
                path: path
              }, this.props, {
                value: this.getValue(path)
              })));
            }
          } catch (err) {
            _iterator6.e(err);
          } finally {
            _iterator6.f();
          }
        }

        return /*#__PURE__*/React__default['default'].createElement("div", {
          className: classNames__default['default']('property-set', this.props.rowClass)
        }, fields);
      }
    }, {
      key: "getValue",
      value: function getValue(path) {
        var values = this.props.values || this.props.bean.values;
        return JsonPointer__default['default'].get(values, path);
      }
    }], [{
      key: "getName",
      value: function getName(name, css) {
        if (name) {
          return /*#__PURE__*/React__default['default'].createElement("h5", {
            className: css
          }, name);
        } else {
          return null;
        }
      }
    }]);

    return PropertySet;
  }(React__default['default'].Component);

  PropertySet.defaultProps = {
    rowClass: 'form-row'
  };
  PropertySet.propTypes = {
    bean: PropTypes__default['default'].object.isRequired,
    values: PropTypes__default['default'].object,
    onChange: PropTypes__default['default'].func,
    inline: PropTypes__default['default'].bool,
    horizontal: PropTypes__default['default'].bool,
    bsSize: PropTypes__default['default'].string,
    localization: PropTypes__default['default'].object,
    rowClass: PropTypes__default['default'].string
  };

  PropertySet.Property = Property;
  PropertySet.Properties = Properties;
  PropertySet.PropertyInput = PropertyInput;

  return PropertySet;

})));
