import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Datetime from 'react-datetime';
import moment from 'moment';
import CKEditor from 'react-ckeditor-component';
import MaskedInput from 'react-maskedinput';
import JsonPointer from 'json-pointer';
import bigInt from 'big-integer';
import bigRat from 'big-rational';
import Select, { Creatable } from 'react-select';
import VirtualizedSelect from 'react-virtualized-select';

var inputLabelSizeClasses = function inputLabelSizeClasses(props) {
  return classNames({ 'col-form-label-sm': props.bsSize === "sm" }, { 'col-form-label-lg': props.bsSize === "lg" });
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

var RadioSelectGroup = function (_React$Component) {
  inherits(RadioSelectGroup, _React$Component);

  function RadioSelectGroup(props) {
    classCallCheck(this, RadioSelectGroup);

    var _this = possibleConstructorReturn(this, (RadioSelectGroup.__proto__ || Object.getPrototypeOf(RadioSelectGroup)).call(this, props));

    _this._onInputChange = _this._onInputChange.bind(_this);
    return _this;
  }

  createClass(RadioSelectGroup, [{
    key: 'render',
    value: function render() {
      var _props = this.props,
          meta = _props.meta,
          attr = _props.attr,
          value = _props.value;

      var radioButtons = [];

      for (var i = 0; i < meta.tagList.length; i++) {
        var tagName = meta.tagList[i][0];
        var tagLabel = meta.tagList[i][1];
        var onChange = this._onInputChange.bind(null, tagName);

        radioButtons.push(React.createElement(
          'div',
          { className: 'form-check', key: attr.id + "FormCheckWrapper" + i },
          React.createElement('input', {
            id: attr.id + "Radio" + i,
            className: 'form-check-input',
            type: meta.multipleSelectionList ? "checkbox" : "radio",
            name: attr.id,
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
              htmlFor: attr.id + "Radio" + i
            },
            !meta.rawValue ? tagLabel : React.createElement('div', { dangerouslySetInnerHTML: { __html: tagLabel } })
          )
        ));
      }

      return React.createElement(
        'div',
        {
          className: classNames("radio-buttons-outer", 'property-input', { 'Select--sm': this.props.bsSize === "sm" }, { 'Select--lg': this.props.bsSize === "lg" }, attr.validationClasses)
        },
        radioButtons
      );
    }
  }, {
    key: '_onInputChange',
    value: function _onInputChange(value, event) {
      if (this.props.meta.multipleSelectionList) {
        var newValue = void 0;
        if (event.target.checked) {
          newValue = this.props.value.concat(value);
        } else {
          newValue = this.props.value.filter(function (v) {
            return v !== value;
          });
        }
        this.props.callOnChange(newValue);
      } else {
        this.props.callOnChange(value);
      }
    }
  }]);
  return RadioSelectGroup;
}(React.Component);

RadioSelectGroup.defaultProps = {
  localization: { checkBoxRequired: "Select at least one item" }
};

RadioSelectGroup.propTypes = {
  meta: PropTypes.object.isRequired,
  attr: PropTypes.object.isRequired,
  callOnChange: PropTypes.func.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.array]).isRequired
};

var SelectPropertyInput = function (_React$Component) {
  inherits(SelectPropertyInput, _React$Component);

  function SelectPropertyInput(props) {
    classCallCheck(this, SelectPropertyInput);

    var _this = possibleConstructorReturn(this, (SelectPropertyInput.__proto__ || Object.getPrototypeOf(SelectPropertyInput)).call(this, props));

    _this.handleChangeSelect = _this.handleChangeSelect.bind(_this);
    return _this;
  }

  createClass(SelectPropertyInput, [{
    key: 'render',
    value: function render() {
      var _props = this.props,
          localization = _props.localization,
          meta = _props.meta,
          attr = _props.attr,
          value = _props.value;


      var options = [];
      for (var i = 0; i < meta.tagList.length; i++) {
        options.push({ value: meta.tagList[i][0], label: meta.tagList[i][1] });
      }

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

      var selectAttr = {
        ref: attr.id,
        name: attr.id,
        value: value,
        options: options,
        onChange: this.handleChangeSelect,
        clearAllText: localization.clearAllText,
        clearValueText: localization.clearValueText,
        noResultsText: localization.noResultsText,
        searchPromptText: localization.searchPromptText,
        loadingPlaceholder: localization.loadingPlaceholder,
        placeholder: attr.extraAttrsMap.placeholder || localization.placeholder,
        backspaceRemoves: false,
        disabled: meta.readOnly,
        multi: meta.multipleSelectionList,
        matchPos: attr.extraAttrsMap.matchPos || "any",
        required: !meta.canBeNull
      };

      var select = void 0;
      if (attr.extraAttrsMap.inputType === "Creatable") {
        select = React.createElement(Creatable, selectAttr);
      } else if (attr.extraAttrsMap.inputType === "VirtualizedSelect" || attr.extraAttrsMap.inputType === undefined && meta.tagList.length >= 100) {
        select = React.createElement(VirtualizedSelect, _extends({
          clearable: true,
          searchable: true,
          labelKey: 'label',
          valueKey: 'value'
        }, selectAttr));
      } else {
        select = React.createElement(Select, selectAttr);
      }

      return React.createElement(
        'div',
        {
          className: classNames("Select-outer", 'property-input', { 'Select--sm': this.props.bsSize === "sm" }, { 'Select--lg': this.props.bsSize === "lg" }, attr.validationClasses),
          style: style
        },
        select
      );
    }
  }, {
    key: 'handleChangeSelect',
    value: function handleChangeSelect(object) {
      if (Array.isArray(object)) {
        var selectArray = [];
        Object.keys(object).forEach(function (key) {
          selectArray.push(object[key].value);
        });
        this.props.callOnChange(selectArray);
      } else {
        this.props.callOnChange(object !== null ? object.value : "");
      }
    }
  }]);
  return SelectPropertyInput;
}(React.Component);

SelectPropertyInput.propTypes = {
  meta: PropTypes.object.isRequired,
  attr: PropTypes.object.isRequired,
  callOnChange: PropTypes.func.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.array]).isRequired
};

var PropertyInput = function (_React$Component) {
  inherits(PropertyInput, _React$Component);

  function PropertyInput(props) {
    classCallCheck(this, PropertyInput);

    var _this = possibleConstructorReturn(this, (PropertyInput.__proto__ || Object.getPrototypeOf(PropertyInput)).call(this, props));

    _this.state = _this.getInitState(props);

    _this.callOnChange = _this.callOnChange.bind(_this);
    _this.handleChange = _this.handleChange.bind(_this);
    _this.handleChangeBoolean = _this.handleChangeBoolean.bind(_this);
    _this.base64FileHandle = _this.base64FileHandle.bind(_this);

    _this.numberValidation = _this.numberValidation.bind(_this);
    _this.patternValidationMessage = _this.patternValidationMessage.bind(_this);

    _this.dateValidationMessage = _this.dateValidationMessage.bind(_this);
    _this.dateToISOFormat = _this.dateToISOFormat.bind(_this);
    _this.timestampValidationMessage = _this.timestampValidationMessage.bind(_this);
    _this.timestampToISOFormat = _this.timestampToISOFormat.bind(_this);
    return _this;
  }

  createClass(PropertyInput, [{
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      this.setState(this.getInitState(nextProps));
    }
  }, {
    key: 'componentDidUpdate',
    value: function componentDidUpdate() {
      if (this.dateInput) this.dateValidationMessage({ target: this.dateInput });
      if (this.timestampInput) this.timestampValidationMessage({ target: this.timestampInput });
    }
  }, {
    key: 'getInitState',
    value: function getInitState(props) {
      var path = this.getPath(props);
      var meta = props.bean.meta[path];
      var id = path.substring(path.lastIndexOf("/") + 1) + "PropertyInput";
      var validationRulesMap = PropertyInput.getValidationRulesMap(meta);

      return {
        path: path,
        id: id,
        meta: meta,
        validationRulesMap: validationRulesMap
      };
    }
  }, {
    key: 'getPath',
    value: function getPath(props) {
      if (props === undefined) props = this.props;

      if (props.path) {
        return props.path;
      } else {
        return props.bean.order[props.id];
      }
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
    key: 'handleChangeBoolean',
    value: function handleChangeBoolean(event) {
      this.callOnChange(event.target.checked);
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
    key: 'timestampValidationMessage',
    value: function timestampValidationMessage(e) {
      if (e.target.validity.patternMismatch) {
        e.target.setCustomValidity(this.props.localization.timestampPatternError);
      } else {
        e.target.setCustomValidity('');
      }
    }
  }, {
    key: 'patternValidationMessage',
    value: function patternValidationMessage(e) {
      var pattern = this.state.validationRulesMap.pattern;
      if (pattern && pattern.customMessage) {
        if (e.target.validity.patternMismatch) {
          e.target.setCustomValidity(pattern.customMessage);
        } else {
          e.target.setCustomValidity('');
        }
      }
    }
  }, {
    key: 'numberValidation',
    value: function numberValidation(e) {
      var range = this.state.validationRulesMap.range;
      var step = this.state.validationRulesMap.step;
      var type = this.state.meta.type;

      var local = this.props.localization;

      var value = void 0;
      try {
        value = bigRat(e.target.value);
      } catch (err) {
        PropertyInput.setErrorState(e, local.numberTypeMismatch);
        return;
      }

      if ((type === 'Short' || type === 'Integer' || type === 'Long') && (e.target.value.indexOf('e') !== -1 || e.target.value.indexOf('E') !== -1)) {
        PropertyInput.setErrorState(e, local.simpleIntegerTypeMismatch);
        return;
      }

      if (range) {
        if (value.compare(bigRat(range.attr.min)) === -1) {
          PropertyInput.setErrorState(e, this.setMessagePlaceHolders(local.rangeUnderflow, [range.attr.min]));
          return;
        } else if (value.compare(bigRat(range.attr.max)) === 1) {
          PropertyInput.setErrorState(e, this.setMessagePlaceHolders(local.rangeOverflow, [range.attr.max]));
          return;
        }
      }

      if (step) {
        var stepRat = bigRat(step.attr);

        if (!value.divide(stepRat).denominator.equals(bigInt.one)) {
          var min = value.divide(stepRat).floor().multiply(stepRat);
          var max = min.add(stepRat);

          PropertyInput.setErrorState(e, this.setMessagePlaceHolders(local.stepMismatch, [min.toDecimal(), max.toDecimal()]));
          return;
        }
      }

      PropertyInput.setErrorState(e, '');
    }
  }, {
    key: 'setMessagePlaceHolders',
    value: function setMessagePlaceHolders(source, params) {
      if (params) {
        params.forEach(function (item, i) {
          source = source.replace(new RegExp("\\{" + i + "\\}", "g"), item);
        });
      }
      return source;
    }
  }, {
    key: 'base64FileHandle',
    value: function base64FileHandle(e) {
      var _this2 = this;

      if (e.target.files && e.target.files.length === 1) {
        var fileName = e.target.files[0].name;
        PropertyInput.getBase64(e.target.files[0]).then(function (data) {
          _this2.callOnChange({ type: "Base64File", name: fileName, data: data });
        });
      } else if (e.target.files && e.target.files.length === 0) {
        this.callOnChange("");
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var _this3 = this;

      var _state = this.state,
          id = _state.id,
          path = _state.path,
          meta = _state.meta,
          validationRulesMap = _state.validationRulesMap;


      var value = JsonPointer.get(this.props.bean, "/values" + path);
      var required = meta.canBeNull !== true;
      var extraAttrsMap = PropertyInput.getExtraAttrsMap(meta);
      var attr = { id: id, validationRulesMap: validationRulesMap, extraAttrsMap: extraAttrsMap };

      var inputTypeClass = void 0;
      switch (meta.type) {
        case "Boolean":
          inputTypeClass = 'form-check-input';break;
        case "Base64File":
          inputTypeClass = 'form-control-file';break;
        default:
          inputTypeClass = 'form-control';
      }

      if (extraAttrsMap.inputType === "form-control-plaintext" && meta.readOnly === true && inputTypeClass === 'form-control') {
        inputTypeClass = 'form-control-plaintext';
      }

      var validationClasses = classNames({ 'is-invalid': meta.status === 'error' }, { 'is-valid': meta.status === 'success' });
      attr.validationClasses = validationClasses;

      var basePropsClasses = classNames('property-input', inputTypeClass, validationClasses, this.props.controlClassName, { 'form-control-sm': this.props.bsSize === "sm" && meta.type !== "Boolean" }, { 'form-control-lg': this.props.bsSize === "lg" && meta.type !== "Boolean" });

      var baseProps = {
        id: id,
        key: id,
        required: required,
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

      var rawInputProps = Object.assign({}, baseProps, {
        value: value,
        onChange: this.handleChange,
        placeholder: extraAttrsMap.placeholder
      });

      var rawTextValidation = {
        maxLength: meta.columnSize,
        pattern: validationRulesMap.pattern ? validationRulesMap.pattern.attr : undefined,
        onInvalid: this.patternValidationMessage,
        onInput: this.patternValidationMessage
      };

      if (meta.tagList) {
        if (extraAttrsMap.inputType === "radio") {
          return React.createElement(RadioSelectGroup, _extends({
            meta: meta,
            attr: attr,
            callOnChange: this.callOnChange,
            value: this.getCorrectMulValue(value, meta.multipleSelectionList)
          }, this.props));
        } else {
          return React.createElement(SelectPropertyInput, _extends({
            meta: meta,
            attr: attr,
            callOnChange: this.callOnChange,
            value: this.getCorrectMulValue(value, meta.multipleSelectionList)
          }, this.props));
        }
      }

      if (meta.labelField) {
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

      if (extraAttrsMap.inputType === 'WYSIWYG') {
        if (this.ckeditor) {
          PropertyInput.updateCkeditor(this.ckeditor, value, meta.readOnly === true);
        }
        return React.createElement(CKEditor, {
          ref: function ref(instance) {
            _this3.ckeditor = instance;
          },
          activeClass: 'p10',
          content: value,
          events: {
            "change": function change(evt) {
              _this3.callOnChange(evt.editor.getData());
            }
          },
          config: {
            language: this.props.localization.locale,
            readOnly: meta.readOnly
          }
        });
      }

      if (validationRulesMap.mask !== undefined) {
        return React.createElement(MaskedInput, _extends({
          mask: validationRulesMap.mask.attr,
          value: value,
          onChange: this.handleChange
        }, baseProps));
      }

      if (validationRulesMap.range !== undefined || validationRulesMap.step !== undefined || meta.type === 'Short' || meta.type === 'Integer' || meta.type === 'Long' || meta.type === 'Double') {
        var range = validationRulesMap.range,
            step = validationRulesMap.step,
            type = meta.type;

        return React.createElement('input', _extends({
          type: 'text',
          onInput: this.numberValidation,
          'data-info-type': type,
          'data-info-range': range && range.attr ? range.attr.min + ', ' + range.attr.max : undefined,
          'data-info-step': step ? step.attr : undefined
        }, rawInputProps));
      }

      if (meta.type === 'Base64File') {
        return React.createElement('input', _extends({
          type: 'file',
          multiple: meta.multipleSelectionList,
          onChange: this.base64FileHandle
        }, baseProps));
      }

      if (meta.type === 'Date') {
        if (meta.readOnly !== true) {
          return React.createElement(Datetime, {
            dateFormat: 'DD.MM.YYYY',
            timeFormat: false,
            key: id + "Datetime",
            value: PropertyInput.dateFromISOFormat(value),
            onChange: this.dateToISOFormat,
            closeOnSelect: true,
            closeOnTab: true,
            locale: this.props.localization.locale,
            inputProps: Object.assign({}, baseProps, {
              ref: function ref(instance) {
                _this3.dateInput = instance;
              },
              pattern: "(^$|\\d{1,2}\\.\\d{1,2}\\.\\d{4})",
              placeholder: extraAttrsMap.placeholder
            }),
            className: 'Datetime-outer'
          });
        } else {
          return React.createElement('input', _extends({
            type: 'text'
          }, rawInputProps, rawTextValidation, {
            value: PropertyInput.dateFromISOFormat(value)
          }));
        }
      }

      if (meta.type === 'Timestamp') {
        if (meta.readOnly !== true) {
          return React.createElement(Datetime, {
            dateFormat: 'DD.MM.YYYY',
            timeFormat: 'HH:mm',
            key: id + "Datetime",
            value: PropertyInput.timestampFromISOFormat(value),
            onChange: this.timestampToISOFormat,
            closeOnSelect: true,
            closeOnTab: true,
            locale: this.props.localization.locale,
            inputProps: Object.assign({}, baseProps, {
              ref: function ref(instance) {
                _this3.timestampInput = instance;
              },
              pattern: "(^$|\\d{1,2}\\.\\d{1,2}\\.\\d{4}\\s\\d{2}:\\d{2})",
              placeholder: extraAttrsMap.placeholder
            }),
            className: 'Datetime-outer'
          });
        } else {
          return React.createElement('input', _extends({
            type: 'text'
          }, rawInputProps, rawTextValidation, {
            value: PropertyInput.timestampFromISOFormat(value)
          }));
        }
      }

      if (meta.type === 'Boolean') {
        return React.createElement('input', _extends({
          type: 'checkbox',
          checked: value === true || value === "true",
          onChange: this.handleChangeBoolean
        }, baseProps));
      }

      if (extraAttrsMap.inputType === 'textArea') {
        return React.createElement('textarea', _extends({
          rows: extraAttrsMap.rows || 3
        }, rawInputProps, rawTextValidation));
      }

      return React.createElement('input', _extends({
        type: extraAttrsMap.inputType || 'text'
      }, rawInputProps, rawTextValidation));
    }
  }, {
    key: 'getCorrectMulValue',
    value: function getCorrectMulValue(value, multipleSelectionList) {
      var correctValue = void 0;
      if (multipleSelectionList === true) {
        correctValue = [];
        if (Array.isArray(value)) {
          for (var i = 0; i < value.length; i++) {
            correctValue.push("" + value[i]);
          }
        }
      } else {
        correctValue = "" + value;
      }
      return correctValue;
    }
  }], [{
    key: 'dateFromISOFormat',
    value: function dateFromISOFormat(stringDate) {
      var date = moment(stringDate, 'YYYY-MM-DD', true);
      if (date.isValid()) {
        return date.format('DD.MM.YYYY');
      } else {
        return stringDate;
      }
    }
  }, {
    key: 'timestampFromISOFormat',
    value: function timestampFromISOFormat(stringDate) {
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
    }
  }, {
    key: 'setErrorState',
    value: function setErrorState(e, text) {
      e.target.setCustomValidity(text);
      e.target.title = text;
    }
  }, {
    key: 'getBase64',
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
  }, {
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
  }, {
    key: 'getValidationRulesMap',
    value: function getValidationRulesMap(meta) {
      var rules = meta.validationRules;

      var map = {};
      if (rules !== undefined) {
        if (!Array.isArray(rules)) {
          map[rules.type] = { attr: rules.attr };
          if (rules.customMessage) map[rules.type].customMessage = rules.customMessage;
        } else {
          for (var i = 0; i < rules.length; i++) {
            map[rules[i].type] = { attr: rules[i].attr };
            if (rules[i].customMessage) map[rules[i].type].customMessage = rules[i].customMessage;
          }
        }
      }

      if (meta.type === 'Short' || meta.type === 'Integer' || meta.type === 'Long') {
        if (!map.range) {
          var rangeAttr = void 0;

          switch (meta.type) {
            case 'Short':
              rangeAttr = { min: "-32768", max: "32767" };
              break;
            case 'Integer':
              rangeAttr = { min: "-2147483648", max: "2147483647" };
              break;
            case 'Long':
              rangeAttr = { min: "-9223372036854775808", max: "9223372036854775807" };
              break;
          }

          map['range'] = { attr: rangeAttr };
        }

        if (!map.step) {
          map['step'] = { attr: '1' };
        }
      }

      return map;
    }
  }, {
    key: 'updateCkeditor',
    value: function updateCkeditor(ckeditor, value, readOnly) {
      if (ckeditor.editorInstance.getData() !== value) {
        ckeditor.editorInstance.setData(value);
      }
      ckeditor.editorInstance.setReadOnly(readOnly);
    }
  }]);
  return PropertyInput;
}(React.Component);

PropertyInput.defaultProps = {
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
    timestampPatternError: 'Please enter a valid date with time in the format dd.mm.yyyy hh:mm'
  }
};

PropertyInput.propTypes = {
  bean: PropTypes.object.isRequired,
  path: PropTypes.string,
  inline: PropTypes.bool,
  bsSize: PropTypes.string,
  onChange: PropTypes.func,
  localization: PropTypes.object,
  controlClassName: PropTypes.string
};

var Property = function (_React$Component) {
  inherits(Property, _React$Component);

  function Property() {
    classCallCheck(this, Property);
    return possibleConstructorReturn(this, (Property.__proto__ || Object.getPrototypeOf(Property)).apply(this, arguments));
  }

  createClass(Property, [{
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
          messageElement = React.createElement(
            'div',
            { className: validationClasses },
            meta.message
          );
        } else {
          messageElement = React.createElement(
            'small',
            { className: 'form-text text-muted' },
            meta.message
          );
        }
      }

      var formGroupClasses = classNames('property', { 'form-group': meta.type !== 'Boolean' }, { 'form-check': meta.type === 'Boolean' }, { 'required': meta.canBeNull !== true });

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
        var _outerClasses = classNames('horizontal-input', { 'horizontal-input--sm': this.props.bsSize === "sm" }, { 'horizontal-input--lg': this.props.bsSize === "lg" }, meta.cssClasses || this.props.className, { 'display-none': meta.hidden });

        if (meta.type === "Boolean") {
          var colTag = 'col-lg-' + (12 - this.props.horizontalColSize);
          var offsetTag = 'offset-lg-' + this.props.horizontalColSize;
          return React.createElement(
            'div',
            { className: classNames(_outerClasses, 'col-lg-12') },
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
                  label,
                  messageElement
                )
              )
            )
          );
        } else {
          return React.createElement(
            'div',
            { className: classNames(_outerClasses, 'col-lg-12') },
            React.createElement(
              'div',
              { className: classNames(formGroupClasses, this.props.rowClass) },
              React.createElement(
                'div',
                { className: classNames('col-lg-' + this.props.horizontalColSize, 'col-form-control-label') },
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
        var _outerClasses2 = classNames('vertical-input', { 'vertical-input--sm': this.props.bsSize === "sm" }, { 'vertical-input--lg': this.props.bsSize === "lg" }, meta.cssClasses || this.props.className || 'col-lg-12', { 'display-none': meta.hidden });

        if (meta.type === "Boolean") {
          return React.createElement(
            'div',
            { className: _outerClasses2 },
            React.createElement(
              'div',
              { className: formGroupClasses },
              React.createElement(PropertyInput, this.props),
              label,
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
  path: PropTypes.string,
  id: PropTypes.number,
  inline: PropTypes.bool,
  horizontal: PropTypes.bool,
  horizontalColSize: PropTypes.number,
  rowClass: PropTypes.string,
  bsSize: PropTypes.string,
  onChange: PropTypes.func,
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
    key: 'render',
    value: function render() {
      var _this2 = this;

      var fields = this.props.bean.order.map(function (path, i) {
        if (_this2.props.ids === undefined || _this2.props.ids.includes(i)) {
          return React.createElement(Property, _extends({}, _this2.props, { path: path, key: path }));
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
  }]);
  return Properties;
}(React.Component);

Properties.defaultProps = {
  rowClass: "form-row"
};

Properties.propTypes = {
  rowClass: PropTypes.string,
  bean: PropTypes.object.isRequired,
  ids: PropTypes.array,
  inline: PropTypes.bool,
  bsSize: PropTypes.string,
  onChange: PropTypes.func,
  localization: PropTypes.object
};

var PropertySet$1 = function (_React$Component) {
  inherits(PropertySet, _React$Component);

  function PropertySet() {
    classCallCheck(this, PropertySet);
    return possibleConstructorReturn(this, (PropertySet.__proto__ || Object.getPrototypeOf(PropertySet)).apply(this, arguments));
  }

  createClass(PropertySet, [{
    key: 'createGroup',
    value: function createGroup(curGroup, curGroupId, curGroupName, curGroupClasses) {
      return React.createElement(
        'div',
        {
          className: classNames('property-group', curGroupClasses || 'property-group__top-line col-12'),
          key: curGroupId,
          ref: curGroupId
        },
        React.createElement('div', { className: 'property-group__top-line-row row' }),
        PropertySet.getName(curGroupName),
        React.createElement(
          'div',
          { className: classNames('property-group__row', this.props.rowClass) },
          curGroup
        )
      );
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var curGroup = [];
      var curGroupName = null,
          curGroupId = null,
          curGroupClasses = null;
      var fields = [];

      var finishGroup = function finishGroup() {
        if (curGroup.length > 0) {
          if (curGroupId) {
            fields.push(_this2.createGroup(curGroup, curGroupId, curGroupName, curGroupClasses));
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
        for (var _iterator = this.props.bean.order[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var path = _step.value;

          var meta = this.props.bean.meta[path];

          var newGroupId = meta.groupId;
          var newGroupName = meta.groupName;
          var newGroupClasses = meta.groupClasses;

          if (newGroupId !== curGroupId) {
            finishGroup();
            curGroupName = newGroupName;
            curGroupClasses = newGroupClasses;
            curGroupId = newGroupId;
          }

          var field = React.createElement(Property, _extends({}, this.props, {
            key: path,
            path: path,
            onChange: this.props.onChange
          }));

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

      return React.createElement(
        'div',
        { className: classNames('property-set', this.props.rowClass) },
        fields
      );
    }
  }], [{
    key: 'getName',
    value: function getName(name) {
      if (name) {
        return React.createElement(
          'h5',
          { className: 'property-group__title' },
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
  onChange: PropTypes.func,
  inline: PropTypes.bool,
  bsSize: PropTypes.string,
  localization: PropTypes.object,
  rowClass: PropTypes.string
};

PropertySet$1.Property = Property;
PropertySet$1.Properties = Properties;
PropertySet$1.PropertyInput = PropertyInput;

export { Property, Properties, PropertyInput };
export default PropertySet$1;
