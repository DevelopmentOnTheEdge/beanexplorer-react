import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

export default class BasePropertyInput extends React.Component {
  constructor(props) {
    super(props);
    this.callOnChange = this.callOnChange.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.reload = this.reload.bind(this);
    this.patternValidationMessage = this.patternValidationMessage.bind(this);
  }

  getPath() {
    const props = this.props;
    if (props.path) {
      return props.path;
    } else {
      return props.bean.order[props.id];
    }
  }

  getMeta() {
    return this.props.bean.meta[this.getPath()]
  }

  getID() {
    const path = this.getPath();
    return path.substring(path.lastIndexOf("/") + 1) + "PropertyInput"
  }

  getValidationRule(type) {
    const rules = this.getMeta().validationRules;
    if (rules !== undefined) {
      if (Array.isArray(rules)) {
        for (let i = 0; i < rules.length; i++) {
          if (rules[i].type === type)
            return rules[i];
        }
      }
      else {
        if (rules.type === type)
          return rules;
      }
    }
    return undefined;
  }

  getValue() {
    return this.props.value
  }

  getCorrectMulValue() {
    const value = this.getValue();
    const meta = this.getMeta();
    let correctValue;
    if (meta.multipleSelectionList === true) {
      correctValue = [];
      if (Array.isArray(value)) {
        for (let i = 0; i < value.length; i++) correctValue.push("" + value[i]);
      } else if (value.length > 0) {
        correctValue.push("" + value)
      }
    } else {
      correctValue = "" + value;
    }
    return correctValue;
  }

  callOnChange(value) {
    this.props.onChange(this.getPath(), value);
  }

  handleChange(event) {
    this.callOnChange(event.target.value);
  }

  reload(e) {
    if (e === undefined || e.target === undefined || e.target.validity.valid === true) {
      this.props.reloadOnChange(this.getPath());
    }
  }

  changeAndReload(value) {
    this.props.reloadOnChange(this.getPath(), value);
  }

  static getExtraAttrsMap(meta) {
    const extraAttrs = meta.extraAttrs;
    let map = {};

    if (extraAttrs !== undefined) {
      for (let i = 0; i < extraAttrs.length; i++) {
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

  getValidationClasses() {
    const meta = this.getMeta();
    return classNames(
      {'is-invalid': meta.status === 'error'},
      {'is-valid': meta.status === 'success'},
    );
  }

  getBaseProps() {
    const meta = this.getMeta();
    const id = this.getID();
    const extraAttrsMap = BasePropertyInput.getExtraAttrsMap(meta);

    let inputTypeClass;
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

    if (extraAttrsMap.inputType === "form-control-plaintext" &&
      meta.readOnly === true && inputTypeClass === 'form-control') {
      inputTypeClass = 'form-control-plaintext'
    }

    const basePropsClasses = classNames(
      'property-input',
      inputTypeClass,
      this.getValidationClasses(),
      this.props.controlClassName,
      {'form-control-sm': this.props.bsSize === "sm" && meta.type !== "Boolean"},
      {'form-control-lg': this.props.bsSize === "lg" && meta.type !== "Boolean"}
    );

    const baseProps = {
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

  getRawInputProps(value, extraAttrsMap) {
    return Object.assign({},
      this.getBaseProps(),
      {
        value: value,
        onChange: this.handleChange,
        onBlur: this.reload,
        placeholder: extraAttrsMap.placeholder
      }
    );
  }

  getRawTextValidation() {
    const validationRulePattern = this.getValidationRule('pattern');
    return {
      maxLength: this.getMeta().columnSize,
      pattern: validationRulePattern ? validationRulePattern.attr : undefined,
      onInvalid: this.patternValidationMessage,
      onInput: this.patternValidationMessage
    };
  }

  patternValidationMessage(e) {
    const pattern = this.getValidationRule('pattern');
    if (pattern && pattern.customMessage) {
      if (e.target.validity.patternMismatch) {
        e.target.setCustomValidity(pattern.customMessage)
      } else {
        e.target.setCustomValidity('')
      }
    }
  }
}

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
  },
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
  controlClassName: PropTypes.string,
};
