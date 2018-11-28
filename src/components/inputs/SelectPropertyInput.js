import PropTypes from 'prop-types';
import React from 'react';
import classNames           from 'classnames';
import Select, {Creatable}  from 'react-select';
import VirtualizedSelect    from 'react-virtualized-select'
import BasePropertyInput from "./BasePropertyInput";

export default class SelectPropertyInput extends BasePropertyInput
{
  constructor(props) {
    super(props);
    this.handleChangeSelect = this.handleChangeSelect.bind(this);
  }

  render() {
    const meta = this.getMeta();
    const localization = this.props.localization;
    const {attr, value}  = this.props;

    let options = [];
    for(let i =0 ;i < meta.tagList.length; i++){
      options.push({ value: meta.tagList[i][0], label: meta.tagList[i][1] });
    }

    let style;
    if(this.props.inline)
    {
      //константы подобраны для совпадения с длиной стандартного input
      let k = 11;
      if(this.props.bsSize === "sm")k = 8.95;
      if(this.props.bsSize === "lg")k = 14.65;
      style = {
        width: k*(meta.inputSize || 16) + 68 + 'px',
        maxWidth: '100%'
      }
    }

    const selectAttr = {
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

    let select;
    if(attr.extraAttrsMap.inputType === "Creatable")
    {
      select = <Creatable {...selectAttr} />
    }
    else if(attr.extraAttrsMap.inputType === "VirtualizedSelect"
      || (attr.extraAttrsMap.inputType === undefined && meta.tagList.length >= 100))
    {
      select = <VirtualizedSelect
        clearable
        searchable
        labelKey="label"
        valueKey="value"
        {...selectAttr}
      />
    }
    else
    {
      select = <Select {...selectAttr} />;
    }

    return <div
      className={classNames(
        "Select-outer",
        'property-input',
        {'Select--sm': this.props.bsSize === "sm"},
        {'Select--lg': this.props.bsSize === "lg"},
        attr.validationClasses
      )}
      style={style}
    >
      {select}
    </div>
  }

  handleChangeSelect(object) {
    if(Array.isArray(object)) {
      let selectArray = [];
      Object.keys(object).forEach(function (key) {
        selectArray.push(object[key].value);
      });
      this.props.callOnChange(selectArray);
    } else {
      this.props.callOnChange(object !== null ? object.value : "");
    }
  }
}
