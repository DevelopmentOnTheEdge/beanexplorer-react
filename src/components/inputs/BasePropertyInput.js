import React from 'react';
import PropTypes from 'prop-types';


export default class BasePropertyInput extends React.Component
{
  constructor(props) {
    super(props);
    this.callOnChange = this.callOnChange.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  getPath() {
    const props = this.props;
    if(props.path) {
      return props.path;
    }else{
      return props.bean.order[props.id];
    }
  }

  getMeta() {
    return this.props.bean.meta[this.getPath()]
  }

  getID() {
    const path  = this.getPath();
    return path.substring(path.lastIndexOf("/")+1) + "PropertyInput"
  }

  getValidationRule(type)
  {
    const rules = this.getMeta().validationRules;
    if(rules !== undefined)
    {
      if (Array.isArray(rules))
      {
        for (let i = 0; i < rules.length; i++) {
          if (rules[i].type === type)
            return rules[i];
        }
      }
      else
      {
        if (rules.type === type)
          return rules;
      }
    }
    return undefined;
  }

  callOnChange(value) {
    this.props.onChange(this.getPath(), value);
  }

  handleChange(event) {
    this.callOnChange(event.target.value);
  }

}

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
  localization: PropTypes.object,
  controlClassName: PropTypes.string,
};
