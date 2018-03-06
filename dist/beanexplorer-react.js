(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('react'), require('prop-types'), require('classnames'), require('react-datetime'), require('moment'), require('react-select'), require('react-virtualized-select'), require('react-ckeditor-component'), require('react-maskedinput'), require('json-pointer')) :
	typeof define === 'function' && define.amd ? define(['react', 'prop-types', 'classnames', 'react-datetime', 'moment', 'react-select', 'react-virtualized-select', 'react-ckeditor-component', 'react-maskedinput', 'json-pointer'], factory) :
	(global.PropertySet = factory(global.React,global.PropTypes,global.classNames,global.Datetime,global.moment,global.Select,global.VirtualizedSelect,global.CKEditor,global.MaskedInput,global.JsonPointer));
}(this, (function (React,PropTypes,classNames,Datetime,moment,Select,VirtualizedSelect,CKEditor,MaskedInput,JsonPointer) { 'use strict';

React = React && React.hasOwnProperty('default') ? React['default'] : React;
PropTypes = PropTypes && PropTypes.hasOwnProperty('default') ? PropTypes['default'] : PropTypes;
classNames = classNames && classNames.hasOwnProperty('default') ? classNames['default'] : classNames;
Datetime = Datetime && Datetime.hasOwnProperty('default') ? Datetime['default'] : Datetime;
moment = moment && moment.hasOwnProperty('default') ? moment['default'] : moment;
Select = Select && Select.hasOwnProperty('default') ? Select['default'] : Select;
VirtualizedSelect = VirtualizedSelect && VirtualizedSelect.hasOwnProperty('default') ? VirtualizedSelect['default'] : VirtualizedSelect;
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

var PropertyInput = function (_React$Component) {
  inherits(PropertyInput, _React$Component);

  function PropertyInput(props) {
    classCallCheck(this, PropertyInput);

    var _this = possibleConstructorReturn(this, (PropertyInput.__proto__ || Object.getPrototypeOf(PropertyInput)).call(this, props));

    _this.handleChange = _this.handleChange.bind(_this);
    return _this;
  }

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

      var path = this.getPath();
      var meta = this.props.bean.meta[path];
      var value = JsonPointer.get(this.props.bean, "/values" + path);
      var id = path.substring(path.lastIndexOf("/") + 1) + "PropertyInput";
      var extraAttrsMap = PropertyInput.getExtraAttrsMap(meta.extraAttrs);
      var required = meta.canBeNull !== true;

      var baseProps = {
        id: id,
        key: id,
        disabled: meta.readOnly,
        required: required
      };

      var rawTextInputProps = Object.assign({}, baseProps, {
        value: value === undefined ? "" : value,
        onChange: this.handleChange,
        placeholder: meta.placeholder,
        className: classNames("form-control", this.props.controlClassName)
      });

      var controls = {
        textInput: function textInput() {
          return React.createElement('input', _extends({ type: 'text' }, rawTextInputProps));
        },
        passwordField: function passwordField() {
          return React.createElement('input', _extends({ type: 'password' }, rawTextInputProps));
        },
        textArea: function textArea() {
          return React.createElement('textarea', _extends({ rows: meta.rows || 3, cols: meta.columns }, rawTextInputProps));
        },
        Short: function Short() {
          return React.createElement('input', _extends({ type: 'number', min: -32768, max: 32767, step: 1 }, rawTextInputProps));
        },
        Integer: function Integer() {
          return React.createElement('input', _extends({ type: 'number', min: -2147483648, max: 2147483647, step: 1 }, rawTextInputProps));
        },
        //the numbers are rounded off - 3 last digits
        Long: function Long() {
          return React.createElement('input', _extends({ type: 'number', min: -9223372036854775000, max: 9223372036854775000, step: 1 }, rawTextInputProps));
        },
        Double: function Double() {
          return React.createElement('input', _extends({ type: 'number' }, rawTextInputProps));
        },
        Boolean: function Boolean() {
          return React.createElement('input', _extends({ type: 'checkbox', checked: value === true || value === "true", onChange: _this2.handleChange,
            className: classNames("form-check-input", _this2.props.controlClassName) }, baseProps));
        },
        Date: function Date() {
          return React.createElement(Datetime, { dateFormat: 'DD.MM.YYYY', id: id, key: id, inputProps: { disabled: meta.readOnly, required: required },
            onChange: function onChange(v) {
              return _this2.dateToISOFormat(v);
            }, value: _this2.dateFromISOFormat(value),
            timeFormat: false, closeOnSelect: true, closeOnTab: true, locale: _this2.props.localization.locale || "en",
            className: classNames(_this2.props.controlClassName) });
        },
        Base64File: function Base64File() {
          return React.createElement('input', _extends({ type: 'file', className: classNames("form-control-file", _this2.props.controlClassName) }, baseProps, {
            multiple: meta.multipleSelectionList,
            onChange: function onChange(e) {
              if (e.target.files && e.target.files.length === 1) {
                var fileName = e.target.files[0].name;
                PropertyInput.getBase64(e.target.files[0]).then(function (data) {
                  _this2.callOnChange({ type: "Base64File", name: fileName, data: data });
                });
              } else if (e.target.files && e.target.files.length === 0) {
                _this2.callOnChange("");
              }
            } }));
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
            clearAllText: _this2.props.localization.clearAllText,
            clearValueText: _this2.props.localization.clearValueText,
            noResultsText: _this2.props.localization.noResultsText,
            searchPromptText: _this2.props.localization.searchPromptText,
            loadingPlaceholder: _this2.props.localization.loadingPlaceholder,
            placeholder: meta.placeholder || _this2.props.localization.placeholder,
            backspaceRemoves: false,
            disabled: meta.readOnly,
            multi: meta.multipleSelectionList,
            matchPos: extraAttrsMap.matchPos || "any",
            required: required
          };

          if (extraAttrsMap.inputType === "Creatable") {
            return React.createElement(Creatable, selectAttr);
          } else if (extraAttrsMap.inputType === "VirtualizedSelect") {
            return React.createElement(VirtualizedSelect, _extends({}, selectAttr, { clearable: true, searchable: true, labelKey: 'label', valueKey: 'value' }));
          } else {
            return React.createElement(Select, selectAttr);
          }
        },
        //      dateTime: {
        //        normal: () => {
        //          return ( React.createElement(Datetime, {id: id, key: id, value: value, parent: _this, onChange: handleChange, time: true, className: this.props.controlClassName}) );
        //        },
        //        readOnly: () => this.createStatic(value)
        //      },
        maskTest: function maskTest() {
          return React.createElement(MaskedInput, _extends({ mask: PropertyInput.getMaskInput(meta.validationRules), value: value === undefined ? "" : value,
            onChange: _this2.handleChange, className: classNames("form-control", _this2.props.controlClassName) }, baseProps));
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
            return React.createElement('label', { className: classNames("form-control-label", _this2.props.controlClassName), id: id, key: id,
              dangerouslySetInnerHTML: { __html: value } });
          } else {
            return React.createElement(
              'label',
              { className: classNames("form-control-label", _this2.props.controlClassName), id: id, key: id },
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

      if (extraAttrsMap.inputType === 'WYSIWYG') {
        return controls['WYSIWYG']();
      }

      if (extraAttrsMap.inputType === 'textArea') {
        return controls['textArea']();
      }

      if (meta.validationRules !== undefined && PropertyInput.getMaskInput(meta.validationRules)) {
        return controls['maskTest']();
      }

      if (controls[meta.type] !== undefined) {
        return controls[meta.type]();
      }

      return controls['textInput']();
    }
  }], [{
    key: 'getMaskInput',
    value: function getMaskInput(rules) {
      for (var i = 0; i < rules.length; i++) {
        if ("mask" in rules[i]) {
          return rules[i].mask;
        }
      }
      return null;
    }

    // static isNumberInput(rules)
    // {
    //   for (let i =0 ; i< rules.length; i++)
    //   {
    //     if(rules[i].type === "baseRule" &&
    //       ( rules[i].attr === "digits" || rules[i].attr === "integer" || rules[i].attr === "number" ))return true;
    //   }
    //   return false;
    // }
    //
    // static getNumericProps(meta)
    // {
    //   let props = {};
    //   props['maxLength'] = 14;//errors if more
    //   const rules = meta.validationRules;
    //   for (let i =0 ; i< rules.length; i++)
    //   {
    //     if(rules[i].type === "baseRule" && (rules[i].attr === "number"))
    //     {
    //       props['precision'] = 10;
    //     }
    //     if(rules[i].type === "baseRule" && (rules[i].attr === "integer"))
    //     {
    //       props['min'] = -2147483648;
    //       props['max'] = 2147483647;
    //       props['maxLength'] = 9;
    //       props['precision'] = 0;
    //     }
    //     // if(rules[i].type === "digits")
    //     // {
    //     //   props['min'] = 0;
    //     // }
    //   }
    //   if(meta.columnSize){
    //     props['maxLength'] = parseInt(meta.columnSize);
    //   }
    //   return props;
    // }

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

      var classes = classNames(classNameForm, hasStatusClasses, { 'required': meta.canBeNull !== true });

      if (this.props.inline) {
        if (meta.type === "Boolean") {
          return React.createElement(
            'div',
            { className: 'form-check mb-2 mr-sm-2' },
            React.createElement(PropertyInput, this.props),
            label
          );
        } else {
          return React.createElement(PropertyInput, _extends({}, this.props, { controlClassName: 'mb-2 mr-sm-2' }));
        }
      } else {
        if (meta.type === "Boolean") {
          return React.createElement(
            'div',
            { className: outerClasses },
            React.createElement(
              'div',
              { className: classes },
              React.createElement(PropertyInput, this.props),
              label,
              messageElement
            )
          );
        } else if (meta.labelField) {
          return React.createElement(
            'div',
            { className: classNames('form-group property property-label', meta.cssClasses || 'col-lg-12', hasStatusClasses) },
            React.createElement(PropertyInput, this.props)
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
  inline: PropTypes.bool,
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
    value: function createGroup(curGroup, curGroupId, curGroupName) {
      return React.createElement(
        'div',
        { className: 'property-group col-12', key: curGroupId, ref: curGroupId },
        React.createElement('div', { className: 'row property-group__line' }),
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
            React.createElement(
              'div',
              { className: 'col-12' },
              React.createElement(
                'div',
                { className: this.props.rowClass },
                curGroup
              )
            )
          )
        )
      );
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
            fields.push(_this2.createGroup(curGroup, curGroupId, curGroupName));
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
        { className: classNames('property-set', this.props.rowClass) },
        fields
      );
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
  localization: PropTypes.object,
  rowClass: PropTypes.string
};

PropertySet$1.Property = Property;
PropertySet$1.Properties = Properties;
PropertySet$1.PropertyInput = PropertyInput;

return PropertySet$1;

})));
