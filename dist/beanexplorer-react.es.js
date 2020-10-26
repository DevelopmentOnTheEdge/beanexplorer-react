import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import MaskedInput from 'react-maskedinput';
import Select, { Async, Creatable } from 'react-select';
import VirtualizedSelect from 'react-virtualized-select';
import bigInt from 'big-integer';
import bigRat from 'big-rational';
import Datetime from 'react-datetime';
import moment from 'moment';
import CKEditor from 'ckeditor4-react';
import JsonPointer from 'json-pointer';

var inputLabelSizeClasses = function inputLabelSizeClasses(props) {
  return classNames({ 'col-form-label-sm': props.bsSize === "sm" }, { 'col-form-label-lg': props.bsSize === "lg" });
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
};

//experemental, try check nested DPS
var isDPS = function isDPS(meta) {
  return meta && meta.type && meta.type.indexOf('DynamicPropertySet') !== -1;
};

var classCallCheck = function (instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};

var createClass = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
}();







var _extends = Object.assign || function (target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i];

    for (var key in source) {
      if (Object.prototype.hasOwnProperty.call(source, key)) {
        target[key] = source[key];
      }
    }
  }

  return target;
};



var inherits = function (subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
  }

  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      enumerable: false,
      writable: true,
      configurable: true
    }
  });
  if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
};











var possibleConstructorReturn = function (self, call) {
  if (!self) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return call && (typeof call === "object" || typeof call === "function") ? call : self;
};

var BasePropertyInput = function (_React$Component) {
  inherits(BasePropertyInput, _React$Component);

  function BasePropertyInput(props) {
    classCallCheck(this, BasePropertyInput);

    var _this = possibleConstructorReturn(this, (BasePropertyInput.__proto__ || Object.getPrototypeOf(BasePropertyInput)).call(this, props));

    _this.callOnChange = _this.callOnChange.bind(_this);
    _this.handleChange = _this.handleChange.bind(_this);
    _this.reload = _this.reload.bind(_this);
    _this.patternValidationMessage = _this.patternValidationMessage.bind(_this);
    return _this;
  }

  createClass(BasePropertyInput, [{
    key: 'getPath',
    value: function getPath() {
      var props = this.props;
      if (props.path) {
        return props.path;
      } else {
        return props.bean.order[props.id];
      }
    }
  }, {
    key: 'getMeta',
    value: function getMeta() {
      return this.props.bean.meta[this.getPath()];
    }
  }, {
    key: 'getID',
    value: function getID() {
      var path = this.getPath();
      return path.substring(path.lastIndexOf("/") + 1) + "PropertyInput";
    }
  }, {
    key: 'getValidationRule',
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
    key: 'getValue',
    value: function getValue() {
      return this.props.value;
    }
  }, {
    key: 'getCorrectMulValue',
    value: function getCorrectMulValue() {
      var value = this.getValue();
      var meta = this.getMeta();
      var correctValue = void 0;
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
    key: 'callOnChange',
    value: function callOnChange(value) {
      this.props.onChange(this.getPath(), value);
    }
  }, {
    key: 'handleChange',
    value: function handleChange(event) {
      this.callOnChange(event.target.value);
    }
  }, {
    key: 'reload',
    value: function reload(e) {
      if (e === undefined || e.target === undefined || e.target.validity.valid === true) {
        this.props.reloadOnChange(this.getPath());
      }
    }
  }, {
    key: 'changeAndReload',
    value: function changeAndReload(value) {
      this.props.reloadOnChange(this.getPath(), value);
    }
  }, {
    key: 'getValidationClasses',
    value: function getValidationClasses() {
      var meta = this.getMeta();
      return classNames({ 'is-invalid': meta.status === 'error' }, { 'is-valid': meta.status === 'success' });
    }
  }, {
    key: 'getBaseProps',
    value: function getBaseProps() {
      var meta = this.getMeta();
      var id = this.getID();
      var extraAttrsMap = BasePropertyInput.getExtraAttrsMap(meta);

      var inputTypeClass = void 0;
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

      var basePropsClasses = classNames('property-input', inputTypeClass, this.getValidationClasses(), this.props.controlClassName, { 'form-control-sm': this.props.bsSize === "sm" && meta.type !== "Boolean" }, { 'form-control-lg': this.props.bsSize === "lg" && meta.type !== "Boolean" });

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
    key: 'getRawInputProps',
    value: function getRawInputProps(value, extraAttrsMap) {
      return Object.assign({}, this.getBaseProps(), {
        value: value,
        onChange: this.handleChange,
        onBlur: this.reload,
        placeholder: extraAttrsMap.placeholder
      });
    }
  }, {
    key: 'getRawTextValidation',
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
    key: 'patternValidationMessage',
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
    key: 'getExtraAttrsMap',
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
}(React.Component);

BasePropertyInput.defaultProps = {
  localization: {
    locale: 'en',
    clearAllText: 'Clear all',
    clearValueText: 'Clear value',
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
};
//  localization: {checkBoxRequired: "Select at least one item"}

BasePropertyInput.propTypes = {
  bean: PropTypes.object.isRequired,
  path: PropTypes.string,
  inline: PropTypes.bool,
  bsSize: PropTypes.string,
  onChange: PropTypes.func,
  reloadOnChange: PropTypes.func,
  localization: PropTypes.object,
  controlClassName: PropTypes.string
};

var RadioSelectPropertyInput = function (_BasePropertyInput) {
  inherits(RadioSelectPropertyInput, _BasePropertyInput);

  function RadioSelectPropertyInput(props) {
    classCallCheck(this, RadioSelectPropertyInput);

    var _this = possibleConstructorReturn(this, (RadioSelectPropertyInput.__proto__ || Object.getPrototypeOf(RadioSelectPropertyInput)).call(this, props));

    _this._onInputChange = _this._onInputChange.bind(_this);
    return _this;
  }

  createClass(RadioSelectPropertyInput, [{
    key: 'render',
    value: function render() {
      var id = this.getID();
      var meta = this.getMeta();
      var value = this.getCorrectMulValue();
      var radioButtons = [];

      for (var i = 0; i < meta.tagList.length; i++) {
        var tagName = meta.tagList[i][0];
        var tagLabel = meta.tagList[i][1];
        var onChange = this._onInputChange.bind(this, tagName);

        radioButtons.push(React.createElement(
          'div',
          { className: 'form-check', key: id + "FormCheckWrapper" + i },
          React.createElement('input', {
            id: id + "_option" + i,
            className: 'form-check-input',
            type: meta.multipleSelectionList ? "checkbox" : "radio",
            name: id,
            value: tagName,
            checked: meta.multipleSelectionList ? value.includes(tagName) : tagName === "" + value,
            onChange: onChange,
            required: !meta.multipleSelectionList && !meta.canBeNull,
            disabled: meta.readOnly
          }),
          React.createElement(
            'label',
            {
              className: classNames(inputLabelSizeClasses(this.props, meta.type), "form-check-label radio-label"),
              htmlFor: id + "_option" + i
            },
            !meta.rawValue ? tagLabel : React.createElement('div', { dangerouslySetInnerHTML: { __html: tagLabel } })
          )
        ));
      }

      return React.createElement(
        'div',
        {
          id: id,
          className: classNames("radio-buttons-outer", 'property-input', { 'Select--sm': this.props.bsSize === "sm" }, { 'Select--lg': this.props.bsSize === "lg" }, this.getValidationClasses())
        },
        radioButtons
      );
    }
  }, {
    key: '_onInputChange',
    value: function _onInputChange(tagName, event) {
      var value = this.getCorrectMulValue();
      if (this.getMeta().multipleSelectionList) {
        var newValue = void 0;
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

var SelectPropertyInput = function (_BasePropertyInput) {
  inherits(SelectPropertyInput, _BasePropertyInput);

  function SelectPropertyInput(props) {
    classCallCheck(this, SelectPropertyInput);

    var _this = possibleConstructorReturn(this, (SelectPropertyInput.__proto__ || Object.getPrototypeOf(SelectPropertyInput)).call(this, props));

    _this.handleChangeSelect = _this.handleChangeSelect.bind(_this);
    return _this;
  }

  createClass(SelectPropertyInput, [{
    key: 'render',
    value: function render() {
      var _getAttr = this.getAttr(),
          meta = _getAttr.meta,
          extraAttrsMap = _getAttr.extraAttrsMap,
          selectAttr = _getAttr.selectAttr;

      return React.createElement(
        'div',
        {
          className: classNames("Select-outer", 'property-input', { 'Select--sm': this.props.bsSize === "sm" }, { 'Select--lg': this.props.bsSize === "lg" }, this.getValidationClasses()),
          style: this.getStyle(meta)
        },
        this.getSelect(selectAttr, meta, extraAttrsMap)
      );
    }
  }, {
    key: 'getSelect',
    value: function getSelect(selectAttr, meta, extraAttrsMap) {
      if (extraAttrsMap.inputType === "Creatable") {
        return React.createElement(Creatable, selectAttr);
      } else if (extraAttrsMap.inputType === "VirtualizedSelect" || extraAttrsMap.inputType === undefined && meta.tagList.length >= 100) {
        return React.createElement(VirtualizedSelect, _extends({
          clearable: true,
          searchable: true,
          labelKey: 'label',
          valueKey: 'value'
        }, selectAttr));
      } else {
        return React.createElement(Select, selectAttr);
      }
    }
  }, {
    key: 'getAttr',
    value: function getAttr() {
      var id = this.getID();
      var meta = this.getMeta();
      var localization = this.props.localization;
      var extraAttrsMap = BasePropertyInput.getExtraAttrsMap(meta);

      var selectAttr = {
        id: id,
        ref: id,
        name: id,
        value: this.getCorrectMulValue(),
        options: this.getOptions(),
        onChange: this.handleChangeSelect,
        clearAllText: localization.clearAllText,
        clearValueText: localization.clearValueText,
        noResultsText: localization.noResultsText,
        searchPromptText: localization.searchPromptText,
        loadingPlaceholder: localization.loadingPlaceholder,
        placeholder: extraAttrsMap.placeholder || localization.placeholder,
        backspaceRemoves: false,
        disabled: meta.readOnly,
        multi: meta.multipleSelectionList,
        matchPos: extraAttrsMap.matchPos || "any",
        required: !meta.canBeNull,
        inputProps: { autoComplete: 'off' }
      };
      return { meta: meta, extraAttrsMap: extraAttrsMap, selectAttr: selectAttr };
    }
  }, {
    key: 'getOptions',
    value: function getOptions() {
      var meta = this.getMeta();
      if (meta.tagList === undefined) return undefined;

      var options = [];
      for (var i = 0; i < meta.tagList.length; i++) {
        options.push({ value: meta.tagList[i][0], label: meta.tagList[i][1] });
      }
      return options;
    }
  }, {
    key: 'handleChangeSelect',
    value: function handleChangeSelect(object) {
      this.setState({ value: object }, function () {
        this.changeAndReload(SelectPropertyInput.getRawValue(object));
      });
    }
  }, {
    key: 'getStyle',
    value: function getStyle(meta) {
      var style = void 0;
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
    key: 'getRawValue',
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
  selectLoadOptions: PropTypes.func
};

var NumberPropertyInput = function (_BasePropertyInput) {
  inherits(NumberPropertyInput, _BasePropertyInput);

  function NumberPropertyInput(props) {
    classCallCheck(this, NumberPropertyInput);

    var _this = possibleConstructorReturn(this, (NumberPropertyInput.__proto__ || Object.getPrototypeOf(NumberPropertyInput)).call(this, props));

    _this.numberValidation = _this.numberValidation.bind(_this);
    return _this;
  }

  createClass(NumberPropertyInput, [{
    key: "render",
    value: function render() {
      var meta = this.getMeta();
      var extraAttrsMap = BasePropertyInput.getExtraAttrsMap(meta);
      var range = this.getNumberValidationRule('range');
      var step = this.getNumberValidationRule('step');
      var type = meta.type;

      return React.createElement("input", _extends({
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

      var value = void 0;
      try {
        value = bigRat(e.target.value);
      } catch (err) {
        setErrorState(e, local.numberTypeMismatch);
        return;
      }

      if (range) {
        if (value.compare(bigRat(range.attr.min)) === -1) {
          setErrorState(e, setMessagePlaceHolders(local.rangeUnderflow, [range.attr.min]));
          return;
        } else if (value.compare(bigRat(range.attr.max)) === 1) {
          setErrorState(e, setMessagePlaceHolders(local.rangeOverflow, [range.attr.max]));
          return;
        }
      }

      if (step) {
        var stepRat = bigRat(step.attr);

        if (!value.divide(stepRat).denominator.equals(bigInt.one)) {
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
              return { type: 'range', attr: { min: "-32768", max: "32767" } };
            case 'Integer':
              return { type: 'range', attr: { min: "-2147483648", max: "2147483647" } };
            case 'Long':
              return { type: 'range', attr: { min: "-9223372036854775808", max: "9223372036854775807" } };
          }
        }
        if (name === 'step' && (meta.type === 'Short' || meta.type === 'Integer' || meta.type === 'Long')) {
          return { type: 'step', attr: '1' };
        }
      }
      return rule;
    }
  }]);
  return NumberPropertyInput;
}(BasePropertyInput);

var convertENotationNumbers = function convertENotationNumbers(value) {
  try {
    if (value.includes('e') || value.includes('E')) return bigRat(value).toDecimal();else return value;
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

var DateTimePropertyInput = function (_BasePropertyInput) {
  inherits(DateTimePropertyInput, _BasePropertyInput);

  function DateTimePropertyInput(props) {
    classCallCheck(this, DateTimePropertyInput);

    var _this = possibleConstructorReturn(this, (DateTimePropertyInput.__proto__ || Object.getPrototypeOf(DateTimePropertyInput)).call(this, props));

    _this.dateValidationMessage = _this.dateValidationMessage.bind(_this);
    _this.dateToISOFormat = _this.dateToISOFormat.bind(_this);
    _this.timeValidationMessage = _this.timeValidationMessage.bind(_this);
    _this.timeToISOFormat = _this.timeToISOFormat.bind(_this);
    _this.timestampValidationMessage = _this.timestampValidationMessage.bind(_this);
    _this.timestampToISOFormat = _this.timestampToISOFormat.bind(_this);
    return _this;
  }

  createClass(DateTimePropertyInput, [{
    key: 'render',
    value: function render() {
      var _this2 = this;

      var meta = this.getMeta();
      var value = this.getValue();
      var extraAttrsMap = BasePropertyInput.getExtraAttrsMap(meta);

      if (meta.type === 'Date') {
        if (meta.readOnly !== true) {
          return React.createElement(Datetime, {
            dateFormat: 'DD.MM.YYYY',
            timeFormat: false,
            key: this.getID() + "Datetime",
            value: dateFromISOFormat(value),
            onChange: this.dateToISOFormat,
            onBlur: this.reload //TODO reload only for valid date
            , closeOnSelect: true,
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
            className: 'Datetime-outer'
          });
        } else {
          var rawInputProps = this.getRawInputProps(value, extraAttrsMap);
          var rawTextValidation = this.getRawTextValidation(meta);
          return React.createElement('input', _extends({
            type: 'text'
          }, rawInputProps, rawTextValidation, {
            value: dateFromISOFormat(value)
          }));
        }
      }

      if (meta.type === 'Time') {
        if (meta.readOnly !== true) {
          return React.createElement(Datetime, {
            dateFormat: 'DD.MM.YYYY',
            timeFormat: 'HH:mm',
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
            className: 'Datetime-outer'
          });
        } else {
          var _rawInputProps = this.getRawInputProps(value, extraAttrsMap);
          var _rawTextValidation = this.getRawTextValidation(meta);
          return React.createElement('input', _extends({
            type: 'text'
          }, _rawInputProps, _rawTextValidation, {
            value: timeFromISOFormat(value)
          }));
        }
      }

      if (meta.type === 'Timestamp') {
        if (meta.readOnly !== true) {
          return React.createElement(Datetime, {
            dateFormat: 'DD.MM.YYYY',
            timeFormat: 'HH:mm',
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
            className: 'Datetime-outer'
          });
        } else {
          var _rawInputProps2 = this.getRawInputProps(value, extraAttrsMap);
          var _rawTextValidation2 = this.getRawTextValidation(meta);
          return React.createElement('input', _extends({
            type: 'text'
          }, _rawInputProps2, _rawTextValidation2, {
            value: timestampFromISOFormat(value)
          }));
        }
      }
    }
  }, {
    key: 'dateToISOFormat',
    value: function dateToISOFormat(date) {
      this.dateInput.focus();

      if (typeof date === "string") {
        this.callOnChange(date);
      } else {
        this.callOnChange(date.format('YYYY-MM-DD'));
      }
    }
  }, {
    key: 'timeToISOFormat',
    value: function timeToISOFormat(date) {
      this.timeInput.focus();

      if (typeof date === "string") {
        this.callOnChange(date);
      } else {
        this.callOnChange(date.format('YYYY-MM-DD HH:mm:ss'));
      }
    }
  }, {
    key: 'timestampToISOFormat',
    value: function timestampToISOFormat(date) {
      this.timestampInput.focus();

      if (typeof date === "string") {
        this.callOnChange(date);
      } else {
        this.callOnChange(date.format('YYYY-MM-DD HH:mm:ss.SSS'));
      }
    }
  }, {
    key: 'dateValidationMessage',
    value: function dateValidationMessage(e) {
      if (e.target.validity.patternMismatch) {
        e.target.setCustomValidity(this.props.localization.datePatternError);
      } else {
        e.target.setCustomValidity('');
      }
    }
  }, {
    key: 'timeValidationMessage',
    value: function timeValidationMessage(e) {
      if (e.target.validity.patternMismatch) {
        e.target.setCustomValidity(this.props.localization.timePatternError);
      } else {
        e.target.setCustomValidity('');
      }
    }
  }, {
    key: 'timestampValidationMessage',
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
  var date = moment(stringDate, 'YYYY-MM-DD', true);
  if (date.isValid()) {
    return date.format('DD.MM.YYYY');
  } else {
    return stringDate;
  }
};

var timeFromISOFormat = function timeFromISOFormat(stringDate) {
  var date = moment(stringDate, 'YYYY-MM-DD HH:mm:ss', true);
  if (date.isValid()) {
    return date.format('DD.MM.YYYY HH:mm');
  } else {
    return stringDate;
  }
};

var timestampFromISOFormat = function timestampFromISOFormat(stringDate) {
  var date = void 0;
  if (stringDate.length === 23) {
    date = moment(stringDate, 'YYYY-MM-DD HH:mm:ss.SSS', true);
  } else if (stringDate.length === 22) {
    date = moment(stringDate, 'YYYY-MM-DD HH:mm:ss.SS', true);
  } else {
    date = moment(stringDate, 'YYYY-MM-DD HH:mm:ss.S', true);
  }
  if (date.isValid()) {
    return date.format('DD.MM.YYYY HH:mm');
  } else {
    return stringDate;
  }
};

var WYSIWYGPropertyInput = function (_BasePropertyInput) {
  inherits(WYSIWYGPropertyInput, _BasePropertyInput);

  function WYSIWYGPropertyInput(props) {
    classCallCheck(this, WYSIWYGPropertyInput);

    var _this = possibleConstructorReturn(this, (WYSIWYGPropertyInput.__proto__ || Object.getPrototypeOf(WYSIWYGPropertyInput)).call(this, props));

    _this.editorOnChange = _this.editorOnChange.bind(_this);
    _this.editorReload = _this.editorReload.bind(_this);
    _this.onInit = _this.onInit.bind(_this);
    return _this;
  }

  createClass(WYSIWYGPropertyInput, [{
    key: 'componentDidUpdate',
    value: function componentDidUpdate() {
      this.onInit();
    }
  }, {
    key: 'editorOnChange',
    value: function editorOnChange(evt) {
      this.callOnChange(evt.editor.getData());
    }
  }, {
    key: 'editorReload',
    value: function editorReload() {
      this.reload();
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      return React.createElement(CKEditor, {
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
    key: 'getConfig',
    value: function getConfig() {
      var meta = this.getMeta();
      return {
        toolbar: [{ name: 'row1',
          items: ['Cut', 'Copy', 'Paste', 'PasteText', 'PasteFromWord', 'CopyFormatting', 'RemoveFormat', '-', 'Undo', 'Redo', '-', '-', 'Image', 'Table', 'HorizontalRule', 'Smiley', 'SpecialChar', 'Image Resizer', '-', 'Link', 'Unlink', 'Anchor'] }, '/', { name: 'row2',
          items: ['NumberedList', 'BulletedList', 'Blockquote', '-', 'Styles', 'Format', 'Font', 'FontSize'] }, '/', { name: 'row3',
          items: ['Bold', 'Italic', 'Underline', 'Strike', 'Subscript', 'Superscript', '-', 'JustifyLeft', 'JustifyCenter', 'JustifyRight', 'JustifyBlock', '-', 'TextColor', 'BGColor', '-', 'Source', 'Maximize'] }],
        extraPlugins: 'colorbutton,copyformatting,font,justify,image2,maximize,smiley',
        removePlugins: 'image',
        removeButtons: '',
        language: this.props.localization.locale,
        readOnly: meta.readOnly
      };
    }
  }, {
    key: 'getScriptUrl',
    value: function getScriptUrl() {
      return undefined;
    }
  }, {
    key: 'getEvents',
    value: function getEvents() {
      return {
        "change": this.editorOnChange,
        "blur": this.editorReload,
        "instanceReady": this.onInit
      };
    }
  }, {
    key: 'onInit',
    value: function onInit() {
      if (this.ckeditor && this.ckeditor.editorInstance) {
        WYSIWYGPropertyInput.updateCKEditor(this.ckeditor, this.getValue(), this.getMeta().readOnly === true);
      }
    }
  }], [{
    key: 'updateCKEditor',
    value: function updateCKEditor(ckeditor, value, readOnly) {
      if (ckeditor.editorInstance.getData() !== value) {
        ckeditor.editorInstance.setData(value);
      }
      ckeditor.editorInstance.setReadOnly(readOnly);
    }
  }]);
  return WYSIWYGPropertyInput;
}(BasePropertyInput);

var LabelPropertyInput = function (_BasePropertyInput) {
  inherits(LabelPropertyInput, _BasePropertyInput);

  function LabelPropertyInput(props) {
    classCallCheck(this, LabelPropertyInput);
    return possibleConstructorReturn(this, (LabelPropertyInput.__proto__ || Object.getPrototypeOf(LabelPropertyInput)).call(this, props));
  }

  createClass(LabelPropertyInput, [{
    key: 'render',
    value: function render() {
      var id = this.getID();
      var meta = this.getMeta();
      var value = this.getValue();

      var labelPropertyClasses = classNames('property-input', this.props.controlClassName, { 'text-danger': meta.status === 'error' }, { 'text-success': meta.status === 'success' }, { 'text-warning': meta.status === 'warning' }, { 'col-form-label-sm': this.props.bsSize === "sm" }, { 'col-form-label-lg': this.props.bsSize === "lg" });
      if (meta.rawValue) {
        return React.createElement('label', {
          id: id,
          key: id,
          className: labelPropertyClasses,
          dangerouslySetInnerHTML: { __html: value }
        });
      } else {
        return React.createElement(
          'label',
          {
            className: labelPropertyClasses,
            id: id,
            key: id
          },
          value
        );
      }
    }
  }]);
  return LabelPropertyInput;
}(BasePropertyInput);

var ButtonPropertyInput = function (_BasePropertyInput) {
    inherits(ButtonPropertyInput, _BasePropertyInput);

    function ButtonPropertyInput(props) {
        classCallCheck(this, ButtonPropertyInput);
        return possibleConstructorReturn(this, (ButtonPropertyInput.__proto__ || Object.getPrototypeOf(ButtonPropertyInput)).call(this, props));
    }

    createClass(ButtonPropertyInput, [{
        key: 'render',
        value: function render() {
            var id = this.getID();
            var meta = this.getMeta();
            var value = this.getValue();
            var labelPropertyClasses = classNames('property-input', 'btn btn-primary', this.props.controlClassName);
            return React.createElement(
                'button',
                {
                    type: 'button',
                    className: labelPropertyClasses,
                    id: id,
                    key: id,
                    onClick: this.reload
                },
                value || meta.displayName || id
            );
        }
    }]);
    return ButtonPropertyInput;
}(BasePropertyInput);

//var Promise = require('pinkie-promise');
//import Promise from 'pinkie-promise';

var Base64FilePropertyInput = function (_BasePropertyInput) {
  inherits(Base64FilePropertyInput, _BasePropertyInput);

  function Base64FilePropertyInput(props) {
    classCallCheck(this, Base64FilePropertyInput);

    var _this = possibleConstructorReturn(this, (Base64FilePropertyInput.__proto__ || Object.getPrototypeOf(Base64FilePropertyInput)).call(this, props));

    _this.base64FileHandle = _this.base64FileHandle.bind(_this);
    return _this;
  }

  createClass(Base64FilePropertyInput, [{
    key: "render",
    value: function render() {
      var meta = this.getMeta();
      return React.createElement("input", _extends({
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
          _this2.callOnChange(JSON.stringify({ type: "Base64File", name: fileName, data: data }));
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

var FilePropertyInput = function (_BasePropertyInput) {
  inherits(FilePropertyInput, _BasePropertyInput);

  function FilePropertyInput(props) {
    classCallCheck(this, FilePropertyInput);

    var _this = possibleConstructorReturn(this, (FilePropertyInput.__proto__ || Object.getPrototypeOf(FilePropertyInput)).call(this, props));

    _this.fileHandle = _this.fileHandle.bind(_this);
    return _this;
  }

  createClass(FilePropertyInput, [{
    key: "render",
    value: function render() {
      var meta = this.getMeta();
      return React.createElement("input", _extends({
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

var registerPropertyInput = function registerPropertyInput(name, fn) {
  propertyInputs[name] = fn;
};

var getAllPropertyInputs = function getAllPropertyInputs() {
  return Object.keys(propertyInputs);
};

var AsyncSelectPropertyInput = function (_SelectPropertyInput) {
  inherits(AsyncSelectPropertyInput, _SelectPropertyInput);

  function AsyncSelectPropertyInput(props) {
    classCallCheck(this, AsyncSelectPropertyInput);

    var _this = possibleConstructorReturn(this, (AsyncSelectPropertyInput.__proto__ || Object.getPrototypeOf(AsyncSelectPropertyInput)).call(this, props));

    _this.state = { value: _this.getCorrectMulValue() };
    _this.loadOptions = _this.loadOptions.bind(_this);
    return _this;
  }

  createClass(AsyncSelectPropertyInput, [{
    key: 'UNSAFE_componentWillReceiveProps',
    value: function UNSAFE_componentWillReceiveProps(nextProps) {
      var rawValue = SelectPropertyInput.getRawValue(this.state.value);
      if (Array.isArray(nextProps.value)) {
        if (!arraysEqual(rawValue, nextProps.value)) this.setState({ value: nextProps.value });
      } else {
        if (rawValue !== nextProps.value) this.setState({ value: nextProps.value });
      }
    }
  }, {
    key: 'getSelect',
    value: function getSelect(selectAttr, meta, extraAttrsMap) {
      return React.createElement(Async, _extends({}, selectAttr, {
        value: this.state.value,
        loadOptions: this.loadOptions,
        autoload: extraAttrsMap.autoload === "true",
        filterOptions: function filterOptions(options, filter, currentValues) {
          // Do no filtering, just return all options
          return options;
        }
      }));
    }
  }, {
    key: 'loadOptions',
    value: function loadOptions(input, callback) {
      var meta = this.getMeta();
      var extraAttrsMap = BasePropertyInput.getExtraAttrsMap(meta);
      this.props.selectLoadOptions(Object.assign({ input: input }, extraAttrsMap), callback);
    }
  }]);
  return AsyncSelectPropertyInput;
}(SelectPropertyInput);

AsyncSelectPropertyInput.propTypes = {
  selectLoadOptions: PropTypes.func
};

var PropertyInput = function (_BasePropertyInput) {
  inherits(PropertyInput, _BasePropertyInput);

  function PropertyInput(props) {
    classCallCheck(this, PropertyInput);

    var _this = possibleConstructorReturn(this, (PropertyInput.__proto__ || Object.getPrototypeOf(PropertyInput)).call(this, props));

    _this.handleChangeBoolean = _this.handleChangeBoolean.bind(_this);
    return _this;
  }

  createClass(PropertyInput, [{
    key: 'shouldComponentUpdate',
    value: function shouldComponentUpdate(nextProps) {
      return shouldPropertyUpdate(this.props, nextProps) || this.props.value !== nextProps.value;
    }
  }, {
    key: 'handleChangeBoolean',
    value: function handleChangeBoolean(event) {
      this.changeAndReload(event.target.checked);
    }
  }, {
    key: 'render',
    value: function render() {
      var meta = this.getMeta();
      var value = this.getValue();
      var extraAttrsMap = BasePropertyInput.getExtraAttrsMap(meta);

      if (extraAttrsMap.inputType !== undefined && getPropertyInput(extraAttrsMap.inputType) !== undefined) {
        var CustomPropertyInput = getPropertyInput(extraAttrsMap.inputType);
        return React.createElement(CustomPropertyInput, this.props);
      }

      if (extraAttrsMap.inputType === "AsyncSelect" && this.props.selectLoadOptions !== undefined) {
        return React.createElement(AsyncSelectPropertyInput, this.props);
      }

      if (['Button', 'button'].includes(extraAttrsMap.inputType)) {
        return React.createElement(ButtonPropertyInput, this.props);
      }

      if (meta.tagList) {
        if (extraAttrsMap.inputType === "radio") {
          return React.createElement(RadioSelectPropertyInput, this.props);
        } else {
          return React.createElement(SelectPropertyInput, this.props);
        }
      }

      if (meta.labelField) {
        return React.createElement(LabelPropertyInput, this.props);
      }

      if (extraAttrsMap.inputType === 'WYSIWYG') {
        return React.createElement(WYSIWYGPropertyInput, this.props);
      }

      if (['Short', 'Integer', 'Long', 'Double'].includes(meta.type) || this.getValidationRule('range') !== undefined || this.getValidationRule('step') !== undefined) {
        return React.createElement(NumberPropertyInput, this.props);
      }

      if (meta.type === 'Base64File') {
        return React.createElement(Base64FilePropertyInput, this.props);
      }

      if (meta.type === 'File') {
        return React.createElement(FilePropertyInput, this.props);
      }

      if (meta.type === 'Date' || meta.type === 'Time' || meta.type === 'Timestamp') {
        return React.createElement(DateTimePropertyInput, this.props);
      }

      if (meta.type === 'Boolean') {
        return React.createElement('input', _extends({
          type: 'checkbox',
          checked: value === true || value === "true",
          onChange: this.handleChangeBoolean
        }, this.getBaseProps()));
      }

      if (isDPS(meta)) {
        meta.hidden = true;
        return React.createElement('input', _extends({
          value: JSON.stringify(value)
        }, this.getBaseProps()));
      }

      var rawInputProps = this.getRawInputProps(value, extraAttrsMap);
      var rawTextValidation = this.getRawTextValidation(meta);
      if (extraAttrsMap.inputType === 'textArea') {
        return React.createElement('textarea', _extends({
          rows: extraAttrsMap.rows || 3
        }, rawInputProps, rawTextValidation));
      }

      var validationRuleMask = this.getValidationRule('mask');
      if (validationRuleMask !== undefined) {
        return React.createElement(MaskedInput, _extends({
          mask: validationRuleMask.attr,
          value: value,
          onChange: this.handleChange,
          onBlur: this.reload
        }, this.getBaseProps()));
      }

      return React.createElement('input', _extends({
        type: extraAttrsMap.inputType || 'text'
      }, rawInputProps, rawTextValidation));
    }
  }]);
  return PropertyInput;
}(BasePropertyInput);

PropertyInput.propTypes = {
  bean: PropTypes.object.isRequired,
  value: PropTypes.any.isRequired,
  path: PropTypes.string,
  id: PropTypes.number,
  inline: PropTypes.bool,
  horizontal: PropTypes.bool,
  horizontalColSize: PropTypes.number,
  rowClass: PropTypes.string,
  bsSize: PropTypes.string,
  onChange: PropTypes.func,
  reloadOnChange: PropTypes.func,
  localization: PropTypes.object,
  className: PropTypes.string
};

var Property = function (_React$Component) {
  inherits(Property, _React$Component);

  function Property() {
    classCallCheck(this, Property);
    return possibleConstructorReturn(this, (Property.__proto__ || Object.getPrototypeOf(Property)).apply(this, arguments));
  }

  createClass(Property, [{
    key: 'shouldComponentUpdate',
    value: function shouldComponentUpdate(nextProps) {
      return shouldPropertyUpdate(this.props, nextProps) || this.props.value !== nextProps.value;
    }
  }, {
    key: 'getPath',
    value: function getPath() {

      if (this.props.path) {
        return this.props.path;
      } else {
        return this.props.bean.order[this.props.id];
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var path = this.getPath();
      var meta = this.props.bean.meta[path];
      var id = path.substring(path.lastIndexOf("/") + 1) + "PropertyInput";
      var extraAttrsMap = BasePropertyInput.getExtraAttrsMap(meta);

      var label = void 0;
      if (meta.displayName) {
        label = React.createElement(
          'label',
          {
            htmlFor: id,
            className: classNames(meta.type === 'Boolean' ? 'form-check-label' : 'form-control-label', { 'mr-sm-2': this.props.inline && meta.type !== 'Boolean' }, { 'col-form-label': this.props.horizontal && meta.type !== 'Boolean' }, inputLabelSizeClasses(this.props, meta.type))
          },
          meta.displayName
        );
      }

      var messageElement = void 0;
      if (meta.message) {
        var validationClasses = classNames({ 'invalid-feedback': meta.status === 'error' }, { 'valid-feedback': meta.status === 'success' });

        if (validationClasses) {
          messageElement = React.createElement('div', { className: validationClasses, dangerouslySetInnerHTML: { __html: meta.message } });
        } else {
          messageElement = React.createElement('small', { className: 'form-text text-muted', dangerouslySetInnerHTML: { __html: meta.message } });
        }
      }

      var inputTypeButton = ['Button', 'button'].includes(extraAttrsMap.inputType);
      var formGroupClasses = classNames('property', { 'form-group': meta.type !== 'Boolean' }, { 'form-check': meta.type === 'Boolean' }, { 'required': !inputTypeButton && meta.canBeNull !== true });

      if (isDPS(meta)) {
        meta.hidden = true;
      }

      if (this.props.inline) {
        var outerClasses = classNames(formGroupClasses, meta.cssClasses || this.props.className || 'mb-2 mr-sm-2', { 'display-none': meta.hidden });

        if (meta.type === "Boolean") {
          return React.createElement(
            'div',
            { className: outerClasses },
            React.createElement(PropertyInput, this.props),
            label
          );
        } else {
          return React.createElement(
            'div',
            { className: outerClasses },
            label,
            React.createElement(PropertyInput, this.props)
          );
        }
      } else if (this.props.horizontal) {
        var _outerClasses = classNames('horizontal-input', { 'horizontal-input--sm': this.props.bsSize === "sm" }, { 'horizontal-input--lg': this.props.bsSize === "lg" }, meta.cssClasses || this.props.className,
        //todo check col-any-?
        meta.cssClasses && meta.cssClasses.includes('col-lg-') ? '' : 'col-lg-12', { 'display-none': meta.hidden });
        if (meta.type === "Boolean" || inputTypeButton && !(meta.cssClasses && meta.cssClasses.includes('col-lg-'))) {
          var colTag = 'col-lg-' + (12 - this.props.horizontalColSize);
          var offsetTag = 'offset-lg-' + this.props.horizontalColSize;
          return React.createElement(
            'div',
            { className: classNames(_outerClasses) },
            React.createElement(
              'div',
              { className: this.props.rowClass },
              React.createElement(
                'div',
                { className: classNames(colTag, offsetTag) },
                React.createElement(
                  'div',
                  { className: classNames(formGroupClasses) },
                  React.createElement(PropertyInput, this.props),
                  !inputTypeButton ? label : "",
                  messageElement
                )
              )
            )
          );
        } else if (inputTypeButton && meta.cssClasses && meta.cssClasses.includes('col-lg-')) {
          return React.createElement(
            'div',
            { className: classNames(_outerClasses, 'offset-lg-' + this.props.horizontalColSize, "text-nowrap") },
            React.createElement(
              'div',
              { className: classNames(formGroupClasses) },
              React.createElement(PropertyInput, this.props),
              !inputTypeButton ? label : "",
              messageElement
            )
          );
        } else {
          return React.createElement(
            'div',
            { className: classNames(_outerClasses) },
            React.createElement(
              'div',
              { className: classNames(formGroupClasses, this.props.rowClass) },
              React.createElement(
                'div',
                {
                  className: classNames('col-lg-' + this.props.horizontalColSize, 'col-form-control-label') },
                label
              ),
              React.createElement(
                'div',
                { className: 'col-lg-' + (12 - this.props.horizontalColSize) },
                React.createElement(PropertyInput, this.props),
                messageElement
              )
            )
          );
        }
      } else {
        var _outerClasses2 = classNames('vertical-input', { 'vertical-input--sm': this.props.bsSize === "sm" }, { 'vertical-input--lg': this.props.bsSize === "lg" }, meta.cssClasses || this.props.className, meta.cssClasses && meta.cssClasses.includes('col-lg-') ? '' : 'col-lg-12', { 'display-none': meta.hidden });

        if (meta.type === "Boolean" || inputTypeButton) {
          return React.createElement(
            'div',
            { className: _outerClasses2 },
            React.createElement(
              'div',
              { className: formGroupClasses },
              React.createElement(PropertyInput, this.props),
              !inputTypeButton ? label : "",
              messageElement
            )
          );
        } else if (meta.labelField) {
          return React.createElement(
            'div',
            { className: _outerClasses2 },
            React.createElement(
              'div',
              { className: classNames('property-label', formGroupClasses) },
              React.createElement(PropertyInput, this.props),
              messageElement
            )
          );
        } else {
          return React.createElement(
            'div',
            { className: _outerClasses2 },
            React.createElement(
              'div',
              { className: formGroupClasses },
              label,
              React.createElement(
                'div',
                { className: 'controls' },
                React.createElement(PropertyInput, this.props),
                messageElement
              )
            )
          );
        }
      }
    }
  }]);
  return Property;
}(React.Component);

Property.propTypes = {
  bean: PropTypes.object.isRequired,
  value: PropTypes.any.isRequired,
  path: PropTypes.string,
  id: PropTypes.number,
  inline: PropTypes.bool,
  horizontal: PropTypes.bool,
  horizontalColSize: PropTypes.number,
  rowClass: PropTypes.string,
  bsSize: PropTypes.string,
  onChange: PropTypes.func,
  reloadOnChange: PropTypes.func,
  localization: PropTypes.object,
  className: PropTypes.string
};

Property.defaultProps = {
  horizontalColSize: 3,
  rowClass: "form-row"
};

var Properties = function (_React$Component) {
  inherits(Properties, _React$Component);

  function Properties() {
    classCallCheck(this, Properties);
    return possibleConstructorReturn(this, (Properties.__proto__ || Object.getPrototypeOf(Properties)).apply(this, arguments));
  }

  createClass(Properties, [{
    key: 'shouldComponentUpdate',
    value: function shouldComponentUpdate(nextProps) {
      return shouldPropertyUpdate(this.props, nextProps) || this.props.values !== nextProps.values;
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var fields = this.props.bean.order.map(function (path, i) {
        if (_this2.props.ids === undefined || _this2.props.ids.includes(i)) {
          return React.createElement(Property, _extends({ path: path, key: path }, _this2.props, { value: _this2.getValue(path) }));
        } else {
          return null;
        }
      });

      //todo remove outer element after migrate to react 16.2
      return React.createElement(
        'div',
        { className: this.props.rowClass },
        fields
      );
    }
  }, {
    key: 'getValue',
    value: function getValue(path) {
      var values = this.props.values || this.props.bean.values;
      return JsonPointer.get(values, path);
    }
  }]);
  return Properties;
}(React.Component);

Properties.defaultProps = {
  rowClass: "form-row"
};

Properties.propTypes = {
  rowClass: PropTypes.string,
  bean: PropTypes.object.isRequired,
  values: PropTypes.object,
  ids: PropTypes.array,
  inline: PropTypes.bool,
  bsSize: PropTypes.string,
  onChange: PropTypes.func,
  reloadOnChange: PropTypes.func,
  localization: PropTypes.object
};

var PropertySet$1 = function (_React$Component) {
  inherits(PropertySet, _React$Component);

  function PropertySet() {
    classCallCheck(this, PropertySet);
    return possibleConstructorReturn(this, (PropertySet.__proto__ || Object.getPrototypeOf(PropertySet)).apply(this, arguments));
  }

  createClass(PropertySet, [{
    key: 'shouldComponentUpdate',
    value: function shouldComponentUpdate(nextProps) {
      return shouldPropertyUpdate(this.props, nextProps) || this.props.values !== nextProps.values;
    }
  }, {
    key: 'hasGroup',
    value: function hasGroup() {
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = this.props.bean.order[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var path = _step.value;

          var meta = this.props.bean.meta[path];
          if (meta.groupId) {
            return true;
          }
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

      return false;
    }
  }, {
    key: 'hasNestedDPS',
    value: function hasNestedDPS() {
      var _iteratorNormalCompletion2 = true;
      var _didIteratorError2 = false;
      var _iteratorError2 = undefined;

      try {
        for (var _iterator2 = this.props.bean.order[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
          var path = _step2.value;

          var meta = this.props.bean.meta[path];
          if (isDPS(meta)) {
            return true;
          }
        }
      } catch (err) {
        _didIteratorError2 = true;
        _iteratorError2 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion2 && _iterator2.return) {
            _iterator2.return();
          }
        } finally {
          if (_didIteratorError2) {
            throw _iteratorError2;
          }
        }
      }

      return false;
    }
  }, {
    key: 'getTabs',
    value: function getTabs() {
      var tabs = [];
      var tabIds = [];
      var _iteratorNormalCompletion3 = true;
      var _didIteratorError3 = false;
      var _iteratorError3 = undefined;

      try {
        for (var _iterator3 = this.props.bean.order[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
          var path = _step3.value;

          var meta = this.props.bean.meta[path];
          if (!meta.tabId && tabIds.indexOf(-1) === -1) {
            tabIds.push(-1);
            tabs.push({ tabId: "-1", tabName: "main" });
          } else if (meta.tabId && tabIds.indexOf(+meta.tabId) === -1) {
            tabIds.push(+meta.tabId);
            tabs.push({ tabId: meta.tabId, tabName: meta.tabName ? meta.tabName : 'tab ' + meta.tabId });
          }
        }
      } catch (err) {
        _didIteratorError3 = true;
        _iteratorError3 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion3 && _iterator3.return) {
            _iterator3.return();
          }
        } finally {
          if (_didIteratorError3) {
            throw _iteratorError3;
          }
        }
      }

      return tabs.sort(function (a, b) {
        return +a.tabId - +b.tabId;
      });
    }
  }, {
    key: 'getTabsHeader',
    value: function getTabsHeader(tabs) {
      return React.createElement(
        'ul',
        { key: 'property_tabs_header', className: 'nav nav-tabs col-12' },
        tabs.map(function (tabInfo, idx) {
          return React.createElement(
            'li',
            { key: 'tab_li_header_' + tabInfo.tabId, className: 'nav-item' },
            React.createElement(
              'a',
              { key: 'tab_a_header_' + tabInfo.tabId,
                className: classNames("nav-link", idx === 0 ? " active" : ""),
                'data-toggle': 'tab',
                href: "#tab_" + tabInfo.tabId },
              tabInfo.tabName
            )
          );
        })
      );
    }
  }, {
    key: 'getTabsContent',
    value: function getTabsContent(tabs, tabContent) {
      return React.createElement(
        'div',
        { key: 'property_tabs_content', className: classNames("tab-content property-tabs", this.props.horizontal ? "col-9" : "col-12") },
        tabs.map(function (tabInfo, idx) {
          return React.createElement(
            'div',
            { key: 'tab_content_' + tabInfo.tabId, className: "tab-pane fade" + (idx === 0 ? "show active" : ""),
              id: "tab_" + tabInfo.tabId },
            tabContent[tabInfo.tabId]
          );
        })
      );
    }
  }, {
    key: 'processingTabs',
    value: function processingTabs(tabs) {
      var orderList = this.props.bean.order;
      var tabsContent = {};
      var _iteratorNormalCompletion4 = true;
      var _didIteratorError4 = false;
      var _iteratorError4 = undefined;

      try {
        for (var _iterator4 = this.props.bean.order[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
          var path = _step4.value;

          var meta = this.props.bean.meta[path];
          var prop = React.createElement(Property, _extends({ key: path, path: path }, this.props, { value: this.getValue(path) }));
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
        _didIteratorError4 = true;
        _iteratorError4 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion4 && _iterator4.return) {
            _iterator4.return();
          }
        } finally {
          if (_didIteratorError4) {
            throw _iteratorError4;
          }
        }
      }

      var content = [];
      content.push(this.getTabsHeader(tabs));
      content.push(this.getTabsContent(tabs, tabsContent));
      return content;
    }
  }, {
    key: 'createGroupContainer',
    value: function createGroupContainer(curContainer, curContainerId, curContainerName, curContainerClasses, groupInitiallyClosed) {
      return React.createElement(
        'div',
        {
          className: classNames('property-group', curContainerClasses || 'property-group__top-line col-12'),
          key: 'group_' + curContainerId,
          ref: curContainerId },
        React.createElement('div', { className: 'property-group__top-line-row row' }),
        PropertySet.getName(React.createElement(
          'a',
          { 'data-toggle': 'collapse', href: '#property-group__collapse-' + curContainerId, role: 'button',
            className: 'property-group__title-link',
            'aria-expanded': !groupInitiallyClosed,
            'aria-controls': 'property-group__collapse-' + curContainerId },
          curContainerName
        ), 'property-group__title'),
        React.createElement(
          'div',
          { className: classNames('collapse', { 'show': !groupInitiallyClosed }),
            id: 'property-group__collapse-' + curContainerId },
          React.createElement(
            'div',
            { className: classNames('property-group__row', this.props.rowClass) },
            curContainer
          )
        )
      );
    }
  }, {
    key: 'processingGroups',
    value: function processingGroups() {
      var _this2 = this;

      var curGroup = [];
      var curGroupName = null,
          curGroupId = null,
          curGroupClasses = null,
          groupInitiallyClosed = null;
      var fields = [];

      var finishGroup = function finishGroup() {
        if (curGroup.length > 0) {
          if (curGroupId) {
            fields.push(_this2.createGroupContainer(curGroup, curGroupId, curGroupName, curGroupClasses, groupInitiallyClosed));
          } else {
            Array.prototype.push.apply(fields, curGroup);
          }
        }
        curGroup = [];
      };

      var _iteratorNormalCompletion5 = true;
      var _didIteratorError5 = false;
      var _iteratorError5 = undefined;

      try {
        for (var _iterator5 = this.props.bean.order[Symbol.iterator](), _step5; !(_iteratorNormalCompletion5 = (_step5 = _iterator5.next()).done); _iteratorNormalCompletion5 = true) {
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

          var field = React.createElement(Property, _extends({ key: path, path: path }, this.props, { value: this.getValue(path) }));

          curGroup.push(field);
        }
      } catch (err) {
        _didIteratorError5 = true;
        _iteratorError5 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion5 && _iterator5.return) {
            _iterator5.return();
          }
        } finally {
          if (_didIteratorError5) {
            throw _iteratorError5;
          }
        }
      }

      finishGroup();
      return fields;
    }
  }, {
    key: 'createNestedPropsContainer',
    value: function createNestedPropsContainer(curContainer, curContainerId, curContainerName, curContainerClasses) {
      if (this.props.horizontal) {
        return React.createElement(
          'div',
          {
            className: classNames('property-nested-dps', curContainerClasses || 'property-nested-dps__border col-12'),
            key: curContainerId,
            ref: curContainerId },
          React.createElement(
            'div',
            { className: 'property-nested-dps__border-row row' },
            React.createElement(
              'a',
              { className: 'property-nested-dps__link', 'data-toggle': 'collapse', href: "#" + curContainerId,
                role: 'button',
                'aria-expanded': 'false', 'aria-controls': curContainerId },
              PropertySet.getName(curContainerName, 'property-group__title')
            ),
            React.createElement(
              'div',
              { id: curContainerId,
                className: classNames('collapse', 'show', 'property-nested-dps__row', this.props.rowClass) },
              curContainer
            )
          )
        );
      } else {
        return React.createElement(
          'div',
          {
            className: classNames('property-nested-dps', curContainerClasses || 'property-nested-dps__top-line col-12'),
            key: curContainerId,
            ref: curContainerId },
          React.createElement('div', { className: 'property-nested-dps__top-line-row row' }),
          React.createElement(
            'a',
            { className: 'property-nested-dps__link', 'data-toggle': 'collapse', href: "#" + curContainerId, role: 'button',
              'aria-expanded': 'false', 'aria-controls': curContainerId },
            PropertySet.getName(curContainerName, 'property-group__title')
          ),
          React.createElement(
            'div',
            { id: curContainerId,
              className: classNames('collapse', 'show', 'property-nested-dps__row', this.props.rowClass) },
            curContainer
          ),
          React.createElement('div', { className: 'property-nested-dps__top-line-row row' })
        );
      }
    }
  }, {
    key: 'createNestedProps',
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
              nestedPropsContainer.push([React.createElement(Property, _extends({ key: parentPath, path: parentPath }, this.props, {
                value: this.getValue(parentPath) }))]);
            }
            if (isDPS(meta)) {
              var idxAndNestedPropContainer = this.createNestedProps(i, list, path);
              i = idxAndNestedPropContainer[0];
              nestedPropsContainer.push(idxAndNestedPropContainer[1]);
              //get last element and checked for rerun if elements position after nested DPS
              if (this.props.bean.meta[list[i]].parent == parentPropId) {
                i--;
              }
              startIdx = i;
            } else {
              startIdx = i;
              nestedPropsContainer.push(React.createElement(Property, _extends({ key: path, path: path }, this.props, { value: this.getValue(path) })));
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
    key: 'processingNestedProperties',
    value: function processingNestedProperties() {
      var fields = [];
      var orderList = this.props.bean.order;
      for (var i = 0; i < orderList.length; i++) {
        var path = orderList[i];
        var meta = this.props.bean.meta[path];
        if (isDPS(meta)) {
          var idxAndNestedPropContainer = this.createNestedProps(i, orderList, path);
          i = idxAndNestedPropContainer[0];
          fields.push(idxAndNestedPropContainer[1]);
          //get last element and checked for rerun if element doesn't have parent
          if (!this.props.bean.meta[orderList[i]].parent) {
            i--;
          }
        } else {
          fields.push(React.createElement(Property, _extends({ key: path, path: path }, this.props, { value: this.getValue(path) })));
        }
      }
      return fields;
    }
  }, {
    key: 'render',
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
        var _iteratorNormalCompletion6 = true;
        var _didIteratorError6 = false;
        var _iteratorError6 = undefined;

        try {
          for (var _iterator6 = this.props.bean.order[Symbol.iterator](), _step6; !(_iteratorNormalCompletion6 = (_step6 = _iterator6.next()).done); _iteratorNormalCompletion6 = true) {
            var path = _step6.value;

            fields.push(React.createElement(Property, _extends({ key: path, path: path }, this.props, { value: this.getValue(path) })));
          }
        } catch (err) {
          _didIteratorError6 = true;
          _iteratorError6 = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion6 && _iterator6.return) {
              _iterator6.return();
            }
          } finally {
            if (_didIteratorError6) {
              throw _iteratorError6;
            }
          }
        }
      }

      return React.createElement(
        'div',
        { className: classNames('property-set', this.props.rowClass) },
        fields
      );
    }
  }, {
    key: 'getValue',
    value: function getValue(path) {
      var values = this.props.values || this.props.bean.values;
      return JsonPointer.get(values, path);
    }
  }], [{
    key: 'getName',
    value: function getName(name, css) {
      if (name) {
        return React.createElement(
          'h5',
          { className: css },
          name
        );
      } else {
        return null;
      }
    }
  }]);
  return PropertySet;
}(React.Component);

PropertySet$1.defaultProps = {
  rowClass: 'form-row'
};

PropertySet$1.propTypes = {
  bean: PropTypes.object.isRequired,
  values: PropTypes.object,
  onChange: PropTypes.func,
  inline: PropTypes.bool,
  horizontal: PropTypes.bool,
  bsSize: PropTypes.string,
  localization: PropTypes.object,
  rowClass: PropTypes.string
};

export { Property, Properties, PropertyInput, WYSIWYGPropertyInput, BasePropertyInput, DateTimePropertyInput, NumberPropertyInput, Base64FilePropertyInput, FilePropertyInput, LabelPropertyInput, RadioSelectPropertyInput, SelectPropertyInput, AsyncSelectPropertyInput, getAllPropertyInputs, getPropertyInput, registerPropertyInput };
export default PropertySet$1;
