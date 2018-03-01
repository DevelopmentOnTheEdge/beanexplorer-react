(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('react'), require('prop-types'), require('classnames'), require('react-datetime'), require('moment'), require('react-select'), require('react-virtualized-select'), require('react-numeric-input'), require('react-ckeditor-component'), require('react-maskedinput'), require('json-pointer')) :
	typeof define === 'function' && define.amd ? define(['react', 'prop-types', 'classnames', 'react-datetime', 'moment', 'react-select', 'react-virtualized-select', 'react-numeric-input', 'react-ckeditor-component', 'react-maskedinput', 'json-pointer'], factory) :
	(global.PropertySet = factory(global.React,global.PropTypes,global.classNames,global.Datetime,global.moment,global.Select,global.VirtualizedSelect,global.NumericInput,global.CKEditor,global.MaskedInput,global.JsonPointer));
}(this, (function (React,PropTypes,classNames,Datetime,moment,Select,VirtualizedSelect,NumericInput,CKEditor,MaskedInput,JsonPointer) { 'use strict';

React = React && React.hasOwnProperty('default') ? React['default'] : React;
PropTypes = PropTypes && PropTypes.hasOwnProperty('default') ? PropTypes['default'] : PropTypes;
classNames = classNames && classNames.hasOwnProperty('default') ? classNames['default'] : classNames;
Datetime = Datetime && Datetime.hasOwnProperty('default') ? Datetime['default'] : Datetime;
moment = moment && moment.hasOwnProperty('default') ? moment['default'] : moment;
var Select__default = 'default' in Select ? Select['default'] : Select;
VirtualizedSelect = VirtualizedSelect && VirtualizedSelect.hasOwnProperty('default') ? VirtualizedSelect['default'] : VirtualizedSelect;
NumericInput = NumericInput && NumericInput.hasOwnProperty('default') ? NumericInput['default'] : NumericInput;
CKEditor = CKEditor && CKEditor.hasOwnProperty('default') ? CKEditor['default'] : CKEditor;
MaskedInput = MaskedInput && MaskedInput.hasOwnProperty('default') ? MaskedInput['default'] : MaskedInput;
JsonPointer = JsonPointer && JsonPointer.hasOwnProperty('default') ? JsonPointer['default'] : JsonPointer;

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

var Property = function (_React$Component) {
  inherits(Property, _React$Component);

  function Property(props) {
    classCallCheck(this, Property);

    var _this = possibleConstructorReturn(this, (Property.__proto__ || Object.getPrototypeOf(Property)).call(this, props));

    _this.onDateChange = _this.onDateChange.bind(_this);
    _this.handleChange = _this.handleChange.bind(_this);
    _this.handleChangeMulti = _this.handleChangeMulti.bind(_this);
    _this.numericHandleChange = _this.numericHandleChange.bind(_this);
    return _this;
  }

  createClass(Property, [{
    key: 'handleChange',
    value: function handleChange(event) {
      //console.log(this.props.path, Property._getValueFromEvent(event));
      this.props.onChange(this.props.path, Property._getValueFromEvent(event));
    }
  }, {
    key: 'handleChangeMulti',
    value: function handleChangeMulti(event) {
      var selectArray = [];
      Object.keys(event).forEach(function (key) {
        selectArray.push(event[key].value);
      });
      this.props.onChange(this.props.path, selectArray);
    }

    //todo move as anonymous function to NumericInput

  }, {
    key: 'numericHandleChange',
    value: function numericHandleChange(valueAsNumber, valueAsString, input) {
      this.props.onChange(this.props.path, valueAsNumber !== null ? valueAsNumber : "");
    }
  }, {
    key: 'onDateChange',
    value: function onDateChange(date) {
      //console.log(date);
      if (typeof date === "string") {
        if (date.match('(0[1-9]|[12][0-9]|3[01])\.(0[1-9]|1[012])\.(19|20)\d\d')) {
          //console.log("str 10: " + date);
          this.handleChange(date);
        }
      } else {
        this.handleChange(date);
      }
    }

    //todo error date status
    // onDateChange(date){
    //   //console.log(date);
    //   if(typeof date === "string"){
    //     if(date.match('(0[1-9]|[12][0-9]|3[01])\.(0[1-9]|1[012])\.(19|20)\d\d')){
    //       //console.log("str 10: " + date);
    //       this.handleChange(date);
    //       this.setState({status: 'none'});
    //     }else{
    //       this.handleChange(date);
    //       this.setState({status: 'error'});
    //     }
    //   }else{
    //     this.handleChange(date);
    //     this.setState({status: 'none'});
    //   }
    // }

  }, {
    key: 'render',
    value: function render() {
      var meta = this.props.meta;
      var id = this.props.name + "Field";

      var valueControl = Property.getControl(this.props, this.handleChange, this.handleChangeMulti, this.numericHandleChange, this.onDateChange);

      var label = React.createElement(
        'label',
        { htmlFor: id, className: meta.type === "Boolean" ? 'form-check-label' : 'form-control-label' },
        meta.displayName || id
      );

      var messageElement = meta.message ? React.createElement(
        'span',
        { className: this.props.messageClassName || "form-control-feedback" },
        meta.message
      ) : undefined;

      var hasStatusClasses = classNames({ 'has-danger': meta.status === 'error' }, { 'has-warning': meta.status === 'warning' }, { 'has-success': meta.status === 'success' });
      if (this.state && this.state.status === 'error') {
        hasStatusClasses = 'has-danger';
      }
      var classNameForm = meta.type === "Boolean" ? this.props.classNameFormCheck || 'form-check property' : this.props.classNameFormGroup || 'form-group property';

      var cssClasses = meta.cssClasses || 'col-lg-12';

      var outerClasses = classNames(cssClasses, { 'display-none': meta.hidden });

      var classes = classNames(classNameForm, hasStatusClasses, { 'required': !meta.canBeNull });

      if (meta.type === "Boolean") {
        return React.createElement(
          'div',
          { className: outerClasses },
          React.createElement(
            'div',
            { className: classes },
            valueControl,
            label,
            messageElement
          )
        );
      } else if (meta.labelField) {
        return React.createElement(
          'div',
          { className: classNames('form-group property property-label', meta.cssClasses || 'col-lg-12', hasStatusClasses) },
          valueControl
        );
      } else {
        return React.createElement(
          'div',
          { className: outerClasses },
          React.createElement(
            'div',
            { className: classes },
            label,
            React.createElement(
              'div',
              { className: 'controls' },
              valueControl,
              messageElement
            )
          )
        );
      }
    }
  }], [{
    key: '_getValueFromEvent',
    value: function _getValueFromEvent(event) {
      if (!event) return '';
      if (event._d) {
        console.log(Property.formatDate(event._d));
        return Property.formatDate(event._d);
      }
      if (!event.target) return event.value;
      var element = event.target;
      return element.type === 'checkbox' ? element.checked : element.value;
    }
  }, {
    key: 'getBase64',
    value: function getBase64(file) {
      return new Promise(function (resolve, reject) {
        var reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = function () {
          return resolve(reader.result);
        };
        reader.onerror = function (error) {
          return reject(error);
        };
      });
    }
  }, {
    key: 'getExtraAttrsMap',
    value: function getExtraAttrsMap(extraAttrs) {
      var map = {};
      if (extraAttrs === undefined) return map;
      for (var i = 0; i < extraAttrs.length; i++) {
        map[extraAttrs[i][0]] = extraAttrs[i][1];
      }
      return map;
    }
  }, {
    key: 'getControl',
    value: function getControl(props, handleChange, handleChangeMulti, numericHandleChange, onDateChange) {
      var meta = props.meta;
      var value = props.value;
      var id = props.name + "Field";
      var handle = meta.multipleSelectionList ? handleChangeMulti : handleChange;
      var extraAttrsMap = Property.getExtraAttrsMap(meta.extraAttrs);

      var controls = {
        Boolean: function Boolean() {
          return React.createElement('input', { type: 'checkbox', id: id, key: id, checked: value === true || value === "true", onChange: handle,
            className: props.controlClassName || 'form-check-input', disabled: meta.readOnly });
        },
        select: function select() {
          var options = Property.optionsToArray(meta.tagList);
          // VirtualizedSelect css подправить (на длинных строках с переносами)
          var strValue = void 0;
          if (Array.isArray(value)) {
            strValue = [];
            for (var i = 0; i < value.length; i++) {
              strValue.push("" + value[i]);
            }
          } else {
            strValue = "" + value;
          }
          var selectProps = {
            ref: id, name: id, value: strValue, options: options, onChange: handle,
            clearAllText: props.localization.clearAllText,
            clearValueText: props.localization.clearValueText,
            noResultsText: props.localization.noResultsText,
            searchPromptText: props.localization.searchPromptText,
            loadingPlaceholder: props.localization.loadingPlaceholder,
            placeholder: meta.placeholder || props.localization.placeholder,
            backspaceRemoves: false,
            disabled: meta.readOnly,
            multi: meta.multipleSelectionList,
            matchPos: extraAttrsMap.matchPos || "any"
          };

          if (extraAttrsMap.inputType === "Creatable") {
            return React.createElement(Select.Creatable, selectProps);
          }

          if (extraAttrsMap.inputType === "VirtualizedSelect") {
            return React.createElement(VirtualizedSelect, _extends({}, selectProps, { clearable: true, searchable: true, labelKey: 'label', valueKey: 'value' }));
          }
          return React.createElement(Select__default, selectProps);
        },
        Date: function Date() {
          return React.createElement(Datetime, { dateFormat: 'DD.MM.YYYY', value: moment(value === undefined ? "" : value),
            onChange: function onChange(v) {
              return onDateChange(v);
            }, id: id, key: id,
            timeFormat: false, closeOnSelect: true, closeOnTab: true, locale: props.localization.locale || "en",
            inputProps: { disabled: meta.readOnly } });
        },
        //      dateTime: {
        //        normal: () => {
        //          return ( React.createElement(Datetime, {id: id, key: id, value: value, parent: _this, onChange: handleChange, time: true, className: props.controlClassName}) );
        //        },
        //        readOnly: () => this.createStatic(value)
        //      },


        textArea: function textArea() {
          return React.createElement('textarea', { placeholder: meta.placeholder, id: id, rows: meta.rows || 3, cols: meta.columns, value: value === undefined ? "" : value,
            onChange: handle, className: props.controlClassName || "form-control", disabled: meta.readOnly });
        },
        maskTest: function maskTest() {
          return React.createElement(MaskedInput, { mask: Property.getMaskInput(meta.validationRules), value: value === undefined ? "" : value,
            onChange: handle, className: props.controlClassName || "form-control", disabled: meta.readOnly });
        },
        textInput: function textInput() {
          return React.createElement('input', { type: 'text', placeholder: meta.placeholder, id: id, key: id, value: value === undefined ? "" : value,
            onChange: handle, className: props.controlClassName || "form-control", disabled: meta.readOnly });
        },
        numberInput: function numberInput() {
          var numericProps = Property.getNumericProps(meta);
          return React.createElement(NumericInput, _extends({}, numericProps, { placeholder: meta.placeholder, id: id, key: id, value: value,
            onChange: numericHandleChange, style: false,
            className: props.controlClassName || "form-control", disabled: meta.readOnly }));
        },
        passwordField: function passwordField() {
          return React.createElement('input', { type: 'password', placeholder: meta.placeholder, id: id, key: id, value: value === undefined ? "" : value,
            onChange: handle, className: props.controlClassName || "form-control", disabled: meta.readOnly });
        },
        file: function file() {
          return React.createElement('input', { type: 'file', placeholder: meta.placeholder, id: id, key: id,
            className: props.controlClassName || "form-control", disabled: meta.readOnly,
            multiple: meta.multipleSelectionList,
            onChange: function onChange(e) {
              if (e.target.files && e.target.files.length === 1) {
                var fileName = e.target.files[0].name;
                Property.getBase64(e.target.files[0]).then(function (data) {
                  handle({ value: { type: "Base64File", name: fileName, data: data } });
                });
              }
            } });
        },

        WYSIWYG: function WYSIWYG() {
          return React.createElement(CKEditor, { activeClass: 'p10', content: value,
            events: {
              "change": function change(evt) {
                handle({ value: evt.editor.getData() });
              }
            },
            config: { language: 'ru' }
          });
        },
        labelField: function labelField() {
          if (meta.rawValue) {
            return React.createElement('div', { dangerouslySetInnerHTML: { __html: value } });
          } else {
            return React.createElement(
              'label',
              { className: 'form-control-label' },
              value
            );
          }
        }
      };

      if (meta.tagList) {
        return controls['select']();
      }

      if (meta.passwordField) {
        return controls['passwordField']();
      }

      if (meta.labelField) {
        return controls['labelField']();
      }

      if (meta.validationRules !== undefined && Property.isNumberInput(meta.validationRules)) {
        return controls['numberInput']();
      }

      if (controls[meta.type] !== undefined) {
        return controls[meta.type]();
      }

      if (extraAttrsMap.inputType === 'WYSIWYG') {
        return controls['WYSIWYG']();
      }

      if (extraAttrsMap.inputType === 'textArea') {
        return controls['textArea']();
      }

      if (extraAttrsMap.inputType === 'file') {
        return controls['file']();
      }

      if (meta.validationRules !== undefined && Property.getMaskInput(meta.validationRules)) {
        return controls['maskTest']();
      }

      return controls['textInput']();
    }
  }, {
    key: 'getNumericProps',
    value: function getNumericProps(meta) {
      var props = {};
      props['maxLength'] = 14; //errors if more
      var rules = meta.validationRules;
      for (var i = 0; i < rules.length; i++) {
        if (rules[i].type === "baseRule" && rules[i].attr === "number") {
          props['precision'] = 10;
        }
        if (rules[i].type === "baseRule" && rules[i].attr === "integer") {
          props['min'] = -2147483648;
          props['max'] = 2147483647;
          props['maxLength'] = 10;
        }
        // if(rules[i].type === "digits")
        // {
        //   props['min'] = 0;//todo not work
        // }
      }
      if (meta.columnSize) {
        props['maxLength'] = parseInt(meta.columnSize);
      }
      return props;
    }
  }, {
    key: 'getMaskInput',
    value: function getMaskInput(rules) {
      for (var i = 0; i < rules.length; i++) {
        if ("mask" in rules[i]) {
          return rules[i].mask;
        }
      }
      return null;
    }
  }, {
    key: 'isNumberInput',
    value: function isNumberInput(rules) {
      for (var i = 0; i < rules.length; i++) {
        if (rules[i].type === "baseRule" && (rules[i].attr === "digits" || rules[i].attr === "integer" || rules[i].attr === "number")) return true;
      }
      return false;
    }
  }, {
    key: 'optionsToArray',
    value: function optionsToArray(options) {
      var optionObject = [];
      for (var i = 0; i < options.length; i++) {
        optionObject.push({ value: options[i][0], label: options[i][1] });
      }
      return optionObject;
    }

    //  createStatic(value) {
    //    return <p className="form-control-static" dangerouslySetInnerHTML={{__html: value}} />;
    //  }

    //ISO 8601 format

  }, {
    key: 'formatDate',
    value: function formatDate(date) {
      var day = date.getDate();
      var month = date.getMonth() + 1;
      var year = date.getFullYear();
      return year + '-' + Property.format2digit(month) + '-' + Property.format2digit(day);
    }
  }, {
    key: 'format2digit',
    value: function format2digit(number) {
      return ("0" + number).slice(-2);
    }
  }]);
  return Property;
}(React.Component);

Property.defaultProps = {
  localization: {
    locale: 'en',
    clearAllText: 'Clear all',
    clearValueText: 'Clear value',
    noResultsText: 'No results found',
    searchPromptText: 'Type to search',
    placeholder: 'Select ...',
    loadingPlaceholder: 'Loading...'
  }
};

Property.propTypes = {
  localization: PropTypes.object
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
          return React.createElement(Property, _extends({}, Properties.get(path, _this2.props.bean, _this2.props.localization), { onChange: _this2.props.onChange }));
        } else {
          return null;
        }
      });

      return React.createElement(
        'div',
        { className: this.props.className },
        fields
      );
    }
  }], [{
    key: 'get',
    value: function get$$1(path, bean, localization) {
      var itemName = path.substring(path.lastIndexOf("/") + 1);
      var itemMeta = bean.meta[path];
      var itemValue = JsonPointer.get(bean, "/values" + path);
      return {
        meta: itemMeta,
        name: itemName,
        value: itemValue,
        path: path,
        key: itemName + "Property",
        ref: itemName + "Property",
        localization: localization
      };
    }
  }]);
  return Properties;
}(React.Component);

Properties.defaultProps = {
  className: "row",
  localization: {}
};

Properties.propTypes = {
  className: PropTypes.string.isRequired,
  bean: PropTypes.object.isRequired,
  ids: PropTypes.array,
  onChange: PropTypes.func,
  localization: PropTypes.object
};

var PropertyInput = function (_React$Component) {
  inherits(PropertyInput, _React$Component);

  function PropertyInput(props) {
    classCallCheck(this, PropertyInput);

    var _this = possibleConstructorReturn(this, (PropertyInput.__proto__ || Object.getPrototypeOf(PropertyInput)).call(this, props));

    _this.handleChange = _this.handleChange.bind(_this);
    _this.handleChangeMulti = _this.handleChangeMulti.bind(_this);
    _this.onDateChange = _this.onDateChange.bind(_this);
    return _this;
  }

  createClass(PropertyInput, [{
    key: 'handleChange',
    value: function handleChange(event) {
      var path = void 0;
      if (this.props.path) {
        path = this.props.path;
      } else {
        path = this.props.bean.order[this.props.id];
      }
      this.props.onChange(path, this._getValueFromEvent(event));
    }
  }, {
    key: 'onDateChange',
    value: function onDateChange(date) {
      //console.log(date);
      if (typeof date === "string") {
        if (date.match('(0[1-9]|[12][0-9]|3[01])\.(0[1-9]|1[012])\.(19|20)\d\d')) {
          //console.log("str 10: " + date);
          this.handleChange(date);
        }
      } else {
        this.handleChange(date);
      }
    }
  }, {
    key: 'handleChangeMulti',
    value: function handleChangeMulti(event) {
      var selectArray = [];
      Object.keys(event).forEach(function (key) {
        selectArray.push(event[key].value);
      });
      this.props.onChange(this.props.path, selectArray);
    }
  }, {
    key: '_getValueFromEvent',
    value: function _getValueFromEvent(event) {
      if (!event) return '';
      if (event._d) {
        return this.formatDate(event._d);
      }
      if (!event.target) return event.value;
      var element = event.target;
      return element.type === 'checkbox' ? element.checked : element.value;
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var attr = void 0;
      if (this.props.path) {
        attr = PropertyInput.get(this.props.path, this.props.bean, this.props.localization);
      } else {
        attr = PropertyInput.get(this.props.bean.order[this.props.id], this.props.bean, this.props.localization);
      }
      var meta = attr.meta;
      var value = attr.value || attr.meta.defaultValue;
      var id = attr.name + "Field";
      var handle = meta.multipleSelectionList ? this.handleChangeMulti : this.handleChange;

      var controls = {
        Boolean: function Boolean() {
          return React.createElement('input', { type: 'checkbox', id: id, key: id, value: value, checked: value === undefined ? "" : value, onChange: handle,
            className: attr.controlClassName || 'form-check-input', disabled: meta.readOnly });
        },
        select: function select() {
          var options = _this2.optionsToArray(meta.tagList);
          //if(options.length > 100){
          var strValue = void 0;
          if (Array.isArray(value)) {
            strValue = [];
            for (var i = 0; i < value.length; i++) {
              strValue.push("" + value[i]);
            }
          } else {
            strValue = "" + value;
          }
          return React.createElement(VirtualizedSelect, { ref: id, name: id, value: strValue, options: options,
            disabled: meta.readOnly, onChange: handle,
            multi: meta.multipleSelectionList, matchPos: 'any',
            clearable: true,
            searchable: true,
            labelKey: 'label',
            valueKey: 'value',
            clearAllText: attr.localization.clearAllText,
            clearValueText: attr.localization.clearValueText,
            noResultsText: attr.localization.noResultsText,
            searchPromptText: attr.localization.searchPromptText,
            placeholder: attr.localization.placeholder,
            loadingPlaceholder: attr.localization.loadingPlaceholder
          });
          //        }else{
          //          return <Select ref={id} name={id} value={value} options={options}
          //                          disabled={meta.readOnly} onChange={handle} placeholder={meta.placeholder}
          //                          multi={meta.multipleSelectionList} matchPos="start"
          //                          clearAllText={attr.localization.clearAllText}
          //                          clearValueText={attr.localization.clearValueText}
          //                          noResultsText={attr.localization.noResultsText}
          //                          searchPromptText={attr.localization.searchPromptText}
          //                          placeholder={attr.localization.placeholder}
          //                          loadingPlaceholder={attr.localization.loadingPlaceholder}
          //          />
          //        }
        },
        Date: function Date() {
          return React.createElement(Datetime, { dateFormat: 'DD.MM.YYYY', value: moment(value === undefined ? "" : value),
            onChange: function onChange(v) {
              return onDateChange(v);
            }, id: id, key: id,
            timeFormat: false, closeOnSelect: true, closeOnTab: true, locale: props.localization.locale || "en",
            inputProps: { disabled: meta.readOnly } });
        },
        //      dateTime: {
        //        normal: () => {
        //          return ( React.createElement(Datetime, {id: id, key: id, value: value, parent: _this, onChange: handleChange, time: true, className: attr.controlClassName}) );
        //        },
        //        readOnly: () => this.createStatic(value)
        //      },
        textArea: function textArea() {
          return React.createElement('textarea', { placeholder: meta.placeholder, id: id, rows: meta.rows || 3, cols: meta.columns, value: value === undefined ? "" : value,
            onChange: handle, className: attr.controlClassName || "form-control", disabled: meta.readOnly });
        },
        textInput: function textInput() {
          return React.createElement('input', { type: 'text', placeholder: meta.placeholder, id: id, key: id, value: value === undefined ? "" : value,
            onChange: handle, className: attr.controlClassName || "form-control", disabled: meta.readOnly });
        },
        passwordField: function passwordField() {
          return React.createElement('input', { type: 'password', placeholder: meta.placeholder, id: id, key: id, value: value === undefined ? "" : value,
            onChange: handle, className: attr.controlClassName || "form-control", disabled: meta.readOnly });
        },
        labelField: function labelField() {
          if (meta.rawValue) {
            return React.createElement('div', { dangerouslySetInnerHTML: { __html: value } });
          } else {
            return React.createElement(
              'div',
              null,
              value
            );
          }
        }
      };

      //let valueControl;
      if (meta.tagList) {
        return controls['select']();
      } else if (meta.passwordField) {
        return controls['passwordField']();
      } else if (meta.labelField) {
        return controls['labelField']();
      } else {
        return (controls[meta.type] || controls['textInput'])();
      }
      //return ({valueControl})
      //    return (
      //      <ValueControl {...Properties.get(attr.bean, path, attr.localization)}
      //                    onChange={attr.onChange} />
      //    );
    }
  }, {
    key: 'optionsToArray',
    value: function optionsToArray(options) {
      var optionObject = [];
      for (var i = 0; i < options.length; i++) {
        optionObject.push({ value: options[i][0], label: options[i][1] });
      }
      return optionObject;
    }

    //  createStatic(value) {
    //    return <p className="form-control-static" dangerouslySetInnerHTML={{__html: value}} />;
    //  }

    //ISO 8601 format

  }, {
    key: 'formatDate',
    value: function formatDate(date) {
      var day = date.getDate();
      var month = date.getMonth() + 1;
      var year = date.getFullYear();
      return year + '-' + this.format2digit(month) + '-' + this.format2digit(day);
    }
  }, {
    key: 'format2digit',
    value: function format2digit(number) {
      return ("0" + number).slice(-2);
    }
  }], [{
    key: 'get',
    value: function get$$1(path, bean, localization) {
      var itemName = path.substring(path.lastIndexOf("/") + 1);
      var itemMeta = bean.meta[path];
      var itemValue = JsonPointer.get(bean, "/values" + path);
      return {
        meta: itemMeta,
        name: itemName,
        value: itemValue,
        path: path,
        key: itemName + "Property",
        ref: itemName + "Property",
        localization: localization
      };
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
    loadingPlaceholder: 'Loading...'
  }
};

PropertyInput.propTypes = {
  bean: PropTypes.object.isRequired,
  path: PropTypes.string,
  id: PropTypes.number,
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
    key: '_createGroup',
    value: function _createGroup(curGroup, curGroupId, curGroupName) {
      return React.createElement(
        'div',
        { className: 'property-group col-12', key: curGroupId, ref: curGroupId },
        React.createElement(
          'div',
          { className: 'property-groop-box' },
          React.createElement(
            'h4',
            { className: 'property-group__title' },
            curGroupName
          ),
          React.createElement(
            'div',
            { className: 'row' },
            curGroup
          )
        )
      );
    }
  }, {
    key: 'get',
    value: function get$$1(path) {
      var itemName = path.substring(path.lastIndexOf("/") + 1);
      var itemMeta = this.props.bean.meta[path];
      var itemValue = JsonPointer.get(this.props.bean, "/values" + path);
      return {
        meta: itemMeta,
        name: itemName,
        value: itemValue,
        path: path,
        key: itemName + "Property",
        ref: itemName + "Property",
        localization: this.props.localization
      };
    }
  }, {
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
        for (var _iterator = this.props.bean.order[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var path = _step.value;

          var itemProps = this.get(path);

          var newGroupId = itemProps.meta.groupId || null;
          var newGroupName = itemProps.meta.groupName || null;
          if (newGroupId !== curGroupId) {
            finishGroup();
            curGroupName = newGroupName;
            curGroupId = newGroupId;
          }
          var field = React.createElement(Property, _extends({}, itemProps, { onChange: this.props.onChange }));
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
        { className: 'property-set row' },
        fields
      );
    }
  }]);
  return PropertySet;
}(React.Component);

PropertySet$1.defaultProps = {
  localization: {}
};

PropertySet$1.propTypes = {
  bean: PropTypes.object.isRequired,
  onChange: PropTypes.func,
  localization: PropTypes.object
};

PropertySet$1.Property = Property;
PropertySet$1.Properties = Properties;
PropertySet$1.PropertyInput = PropertyInput;

return PropertySet$1;

})));
