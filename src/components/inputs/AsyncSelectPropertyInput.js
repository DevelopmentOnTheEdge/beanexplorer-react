import React from 'react';
import PropTypes from 'prop-types';
import {Async} from 'react-select';
import BasePropertyInput from "./BasePropertyInput";
import {arraysEqual} from "../utils";
import SelectPropertyInput from "./SelectPropertyInput";

export default class AsyncSelectPropertyInput extends SelectPropertyInput {
  constructor(props) {
    super(props);
    this.state = {value: this.getCorrectMulValue()};
    this.loadOptions = this.loadOptions.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    const rawValue = SelectPropertyInput.getRawValue(this.state.value);
    if (Array.isArray(nextProps.value)) {
      if (!arraysEqual(rawValue, nextProps.value))
        this.setState({value: nextProps.value});
    } else {
      if (rawValue !== nextProps.value)
        this.setState({value: nextProps.value});
    }
  }

  getSelect(selectAttr, meta, extraAttrsMap) {
    return <Async
      {...selectAttr}
      value={this.state.value}
      loadOptions={this.loadOptions}
      autoload={false}
      filterOptions={(options, filter, currentValues) => {
        // Do no filtering, just return all options
        return options;
      }}
    />;
  }

  loadOptions(input, callback) {
    const meta = this.getMeta();
    const extraAttrsMap = BasePropertyInput.getExtraAttrsMap(meta);
    this.props.selectLoadOptions(
      Object.assign({input: input}, extraAttrsMap), callback)
  }
}

AsyncSelectPropertyInput.propTypes = {
  selectLoadOptions: PropTypes.func,
};
