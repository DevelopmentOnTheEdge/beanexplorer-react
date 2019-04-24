import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Select, {Async, Creatable} from 'react-select';
import VirtualizedSelect from 'react-virtualized-select'
import BasePropertyInput from "./BasePropertyInput";

export default class SelectPropertyInput extends BasePropertyInput {
  constructor(props) {
    super(props);
    this.state = {value: this.getCorrectMulValue()};
    this.handleChangeSelect = this.handleChangeSelect.bind(this);
    this.loadOptions = this.loadOptions.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    //console.log(this.state, nextProps, this.getCorrectMulValue());
    //TODO try change only if this.state if different
    //console.log(nextProps.value);
    this.setState({value: nextProps.value})
  }

  render() {
    const id = this.getID();
    const meta = this.getMeta();
    const localization = this.props.localization;
    const extraAttrsMap = BasePropertyInput.getExtraAttrsMap(meta);

    let style;
    if (this.props.inline) {
      //константы подобраны для совпадения с длиной стандартного input
      let k = 11;
      if (this.props.bsSize === "sm") k = 8.95;
      if (this.props.bsSize === "lg") k = 14.65;
      style = {
        width: k * (meta.inputSize || 16) + 68 + 'px',
        maxWidth: '100%'
      }
    }

    const selectAttr = {
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
      inputProps: {autoComplete: 'off'}
    };

    let select;
    if (extraAttrsMap.inputType === "AsyncSelect" && this.props.selectLoadOptions !== undefined) {
      select = <Async
        {...selectAttr}
        value={this.state.value}
        onChange={this.handleChangeSelect}
        loadOptions={this.loadOptions}
        autoload={false}
        filterOptions={(options, filter, currentValues) => {
          // Do no filtering, just return all options
          return options;
        }}
      />
    }
    else if (extraAttrsMap.inputType === "Creatable") {
      select = <Creatable {...selectAttr} />
    }
    else if (extraAttrsMap.inputType === "VirtualizedSelect"
      || (extraAttrsMap.inputType === undefined && meta.tagList.length >= 100)) {
      select = <VirtualizedSelect
        clearable
        searchable
        labelKey="label"
        valueKey="value"
        {...selectAttr}
      />
    }
    else {
      select = <Select {...selectAttr} />;
    }

    return <div
      className={classNames(
        "Select-outer",
        'property-input',
        {'Select--sm': this.props.bsSize === "sm"},
        {'Select--lg': this.props.bsSize === "lg"},
        this.getValidationClasses()
      )}
      style={style}
    >
      {select}
    </div>
  }

  loadOptions(input, callback) {
    const meta = this.getMeta();
    const extraAttrsMap = BasePropertyInput.getExtraAttrsMap(meta);
    this.props.selectLoadOptions(
      Object.assign({input: input}, extraAttrsMap), callback)
  }

  getOptions() {
    const meta = this.getMeta();
    if (meta.tagList === undefined) return undefined;

    let options = [];
    for (let i = 0; i < meta.tagList.length; i++) {
      options.push({value: meta.tagList[i][0], label: meta.tagList[i][1]});
    }
    return options;
  }

  handleChangeSelect(object) {
    this.setState({value: object}, function () {
      this.changeAndReload(getRawValue(object));
    });
  }
}

const getRawValue = (object) => {
  if (Array.isArray(object)) {
    let selectArray = [];
    Object.keys(object).forEach(function (key) {
      selectArray.push(object[key].value);
    });
    return selectArray;
  } else {
    return object !== null ? object.value : "";
  }
};

SelectPropertyInput.propTypes = {
  selectLoadOptions: PropTypes.func,
};
