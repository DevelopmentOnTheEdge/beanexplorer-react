import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Datetime from 'react-datetime';
import moment from 'moment';
import Select from 'react-select';
import VirtualizedSelect from 'react-virtualized-select';
import NumericInput from 'react-numeric-input';
import CKEditor from 'react-ckeditor-component';
import MaskedInput from 'react-maskedinput';
import JsonPointer from 'json-pointer';

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

var PropertyInput = function (_React$Component) {
  inherits(PropertyInput, _React$Component);

  function PropertyInput(props) {
    classCallCheck(this, PropertyInput);

    var _this = possibleConstructorReturn(this, (PropertyInput.__proto__ || Object.getPrototypeOf(PropertyInput)).call(this, props));

    _this.handleChange = _this.handleChange.bind(_this);
    return _this;
  }

  //todo refactoring - many unused


  createClass(PropertyInput, [{
    key: 'getPath',
    value: function getPath() {
      if (this.props.path) {
        return this.props.path;
      } else {
        return this.props.bean.order[this.props.id];
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
      var value = event.target.type === 'checkbox' ? event.target.checked : event.target.value;
      this.callOnChange(value);
    }
  }, {
    key: 'dateToISOFormat',
    value: function dateToISOFormat(date) {
      if (typeof date === "string") {
        this.callOnChange(date);
      } else {
        this.callOnChange(date.format('YYYY-MM-DD'));
      }
    }
  }, {
    key: 'dateFromISOFormat',
    value: function dateFromISOFormat(stringDate) {
      var date = moment(stringDate === undefined ? "" : stringDate, 'YYYY-MM-DD', true);
      if (date.isValid()) {
        return date.format('DD.MM.YYYY');
      } else {
        return stringDate;
      }
    }
  }, {
    key: 'handleChangeSelect',
    value: function handleChangeSelect(object) {
      if (Array.isArray(object)) {
        var selectArray = [];
        Object.keys(object).forEach(function (key) {
          selectArray.push(object[key].value);
        });
        this.callOnChange(selectArray);
      } else {
        this.callOnChange(object !== null ? object.value : "");
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var attr = PropertyInput.get(this.getPath(), this.props.bean, this.props.localization);

      var meta = attr.meta;
      var value = attr.value;
      var id = attr.name + "Field";
      var extraAttrsMap = PropertyInput.getExtraAttrsMap(meta.extraAttrs);

      var controls = {
        Boolean: function Boolean() {
          return React.createElement('input', { type: 'checkbox', id: id, key: id, checked: value === true || value === "true", onChange: _this2.handleChange,
            className: attr.controlClassName || 'form-check-input', disabled: meta.readOnly });
        },
        select: function select() {
          var options = [];
          for (var i = 0; i < meta.tagList.length; i++) {
            options.push({ value: meta.tagList[i][0], label: meta.tagList[i][1] });
          }

          var strValue = void 0;
          if (Array.isArray(value)) {
            strValue = [];
            for (var _i = 0; _i < value.length; _i++) {
              strValue.push("" + value[_i]);
            }
          } else {
            strValue = "" + value;
          }
          var selectAttr = {
            ref: id, name: id, value: strValue, options: options, onChange: function onChange(v) {
              return _this2.handleChangeSelect(v);
            },
            clearAllText: attr.localization.clearAllText,
            clearValueText: attr.localization.clearValueText,
            noResultsText: attr.localization.noResultsText,
            searchPromptText: attr.localization.searchPromptText,
            loadingPlaceholder: attr.localization.loadingPlaceholder,
            placeholder: meta.placeholder || attr.localization.placeholder,
            backspaceRemoves: false,
            disabled: meta.readOnly,
            multi: meta.multipleSelectionList,
            matchPos: extraAttrsMap.matchPos || "any"
          };

          if (extraAttrsMap.inputType === "Creatable") {
            return React.createElement(Creatable, selectAttr);
          } else if (extraAttrsMap.inputType === "VirtualizedSelect") {
            return React.createElement(VirtualizedSelect, _extends({}, selectAttr, { clearable: true, searchable: true, labelKey: 'label', valueKey: 'value' }));
          } else {
            return React.createElement(Select, selectAttr);
          }
        },
        Date: function Date() {
          return React.createElement(Datetime, { dateFormat: 'DD.MM.YYYY', value: _this2.dateFromISOFormat(value),
            onChange: function onChange(v) {
              return _this2.dateToISOFormat(v);
            }, id: id, key: id,
            timeFormat: false, closeOnSelect: true, closeOnTab: true, locale: attr.localization.locale || "en",
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
            onChange: _this2.handleChange, className: attr.controlClassName || "form-control", disabled: meta.readOnly });
        },
        maskTest: function maskTest() {
          return React.createElement(MaskedInput, { mask: PropertyInput.getMaskInput(meta.validationRules), value: value === undefined ? "" : value,
            onChange: _this2.handleChange, className: attr.controlClassName || "form-control", disabled: meta.readOnly });
        },
        textInput: function textInput() {
          return React.createElement('input', { type: 'text', placeholder: meta.placeholder, id: id, key: id, value: value === undefined ? "" : value,
            onChange: _this2.handleChange, className: attr.controlClassName || "form-control", disabled: meta.readOnly });
        },
        numberInput: function numberInput() {
          var numericProps = PropertyInput.getNumericProps(meta);
          return React.createElement(NumericInput, _extends({}, numericProps, { placeholder: meta.placeholder, id: id, key: id, value: value,
            onChange: function onChange(valueAsNumber, valueAsString, input) {
              _this2.props.onChange(_this2.props.path, valueAsNumber !== null ? valueAsNumber : "");
            },
            style: false, className: attr.controlClassName || "form-control", disabled: meta.readOnly }));
        },
        passwordField: function passwordField() {
          return React.createElement('input', { type: 'password', placeholder: meta.placeholder, id: id, key: id, value: value === undefined ? "" : value,
            onChange: _this2.handleChange, className: attr.controlClassName || "form-control", disabled: meta.readOnly });
        },
        file: function file() {
          return React.createElement('input', { type: 'file', placeholder: meta.placeholder, id: id, key: id,
            className: attr.controlClassName || "form-control", disabled: meta.readOnly,
            multiple: meta.multipleSelectionList,
            onChange: function onChange(e) {
              if (e.target.files && e.target.files.length === 1) {
                var fileName = e.target.files[0].name;
                PropertyInput.getBase64(e.target.files[0]).then(function (data) {
                  _this2.callOnChange({ type: "Base64File", name: fileName, data: data });
                });
              } else if (e.target.files && e.target.files.length === 0) {
                console.log(e.target.files);
                _this2.callOnChange("");
              }
            } });
        },
        WYSIWYG: function WYSIWYG() {
          return React.createElement(CKEditor, { activeClass: 'p10', content: value,
            events: {
              "change": function change(evt) {
                _this2.callOnChange(evt.editor.getData());
              }
            },
            config: { language: 'ru', readOnly: meta.readOnly }
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

      if (meta.validationRules !== undefined && PropertyInput.isNumberInput(meta.validationRules)) {
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

      if (meta.validationRules !== undefined && PropertyInput.getMaskInput(meta.validationRules)) {
        return controls['maskTest']();
      }

      return controls['textInput']();
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
          props['maxLength'] = 9;
          props['precision'] = 0;
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
    value: function getExtraAttrsMap(extraAttrs) {
      var map = {};
      if (extraAttrs === undefined) return map;
      for (var i = 0; i < extraAttrs.length; i++) {
        map[extraAttrs[i][0]] = extraAttrs[i][1];
      }
      return map;
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
      var id = path.substring(path.lastIndexOf("/") + 1) + "Field";

      var valueControl = this.getControl();

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

      var hasStatusClasses = classNames({ 'has-error': meta.status === 'error' }, { 'has-warning': meta.status === 'warning' }, { 'has-success': meta.status === 'success' });

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
  }, {
    key: 'getControl',
    value: function getControl() {
      return React.createElement(PropertyInput, this.props);
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
  bean: PropTypes.object.isRequired,
  path: PropTypes.string,
  id: PropTypes.number,
  onChange: PropTypes.func,
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
          return React.createElement(Property, _extends({}, _this2.props, { path: path }));
        } else {
          return null;
        }
      });

      //todo remove outer element after migrate to react 16.2
      return React.createElement(
        'div',
        { className: this.props.className },
        fields
      );
    }
  }]);
  return Properties;
}(React.Component);

Properties.defaultProps = {
  className: "row"
};

Properties.propTypes = {
  className: PropTypes.string.isRequired,
  bean: PropTypes.object.isRequired,
  ids: PropTypes.array,
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
    key: 'render',
    value: function render() {
      var curGroup = [];
      var curGroupName = null,
          curGroupId = null;
      var fields = [];

      var finishGroup = function finishGroup() {
        if (curGroup.length > 0) {
          if (curGroupId) {
            fields.push(PropertySet._createGroup(curGroup, curGroupId, curGroupName));
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

          var newGroupId = meta.groupId || null;
          var newGroupName = meta.groupName || null;
          if (newGroupId !== curGroupId) {
            finishGroup();
            curGroupName = newGroupName;
            curGroupId = newGroupId;
          }
          var field = React.createElement(Property, _extends({}, this.props, { key: path, path: path, onChange: this.props.onChange }));
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
  }], [{
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
  }]);
  return PropertySet;
}(React.Component);

PropertySet$1.propTypes = {
  bean: PropTypes.object.isRequired,
  onChange: PropTypes.func,
  localization: PropTypes.object
};

PropertySet$1.Property = Property;
PropertySet$1.Properties = Properties;
PropertySet$1.PropertyInput = PropertyInput;

export { Property, Properties, PropertyInput };
export default PropertySet$1;
