import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Select, {components, Creatable, createFilter} from 'react-select';
import VirtualizedSelect from 'react-virtualized-select'
import BasePropertyInput from "./BasePropertyInput";

const Input = props => {
  return <components.Input {...props} required={true}/>
}

export default class SelectPropertyInput extends BasePropertyInput {
  constructor(props) {
    super(props);
    this.handleChangeSelect = this.handleChangeSelect.bind(this);
    this.state = {selectedOptions: []}
  }

  componentDidMount() {
    const value = this.getValue();
    if (value !== "") {
      this.setState({selectedOptions: this.getOptions().filter(option => option.value === value)});
    }
  }

  render() {
    const {meta, extraAttrsMap, selectAttr} = this.getAttr();

    return <div
      className={classNames(
        "Select-outer",
        'property-input',
        {'Select--sm': this.props.bsSize === "sm"},
        {'Select--lg': this.props.bsSize === "lg"},
        this.getValidationClasses()
      )}
      style={this.getStyle(meta)}
    >
      {this.getSelect(selectAttr, meta, extraAttrsMap)}
    </div>
  }

  getSelect(selectAttr, meta, extraAttrsMap) {
    if (extraAttrsMap.inputType === "Creatable") {
      return <Creatable {...selectAttr} />
    }
    else if (extraAttrsMap.inputType === "VirtualizedSelect"
      || (extraAttrsMap.inputType === undefined && meta.tagList.length >= 100)) {
      return <VirtualizedSelect
        clearable
        searchable
        labelKey="label"
        valueKey="value"
        {...selectAttr}
      />
    }
    else {
      return <Select {...selectAttr} />;
    }
  }

  getAttr() {
    const id = this.getID();
    const meta = this.getMeta();
    const localization = this.props.localization;
    const extraAttrsMap = BasePropertyInput.getExtraAttrsMap(meta);

    const selectAttr = {
      id: id,
      ref: id,
      name: id,
      value: this.state.selectedOptions,
      options: this.getOptions(),
      onChange: this.handleChangeSelect,
      // clearAllText: localization.clearAllText removed
      // clearValueText: localization.clearValueText removed
      noOptionsMessage: () => localization.noResultsText,
      // searchPromptText: localization.searchPromptText removed
      loadingPlaceholder: localization.loadingPlaceholder,
      placeholder: extraAttrsMap.placeholder || localization.placeholder,
      backspaceRemovesValue: false,
      isDisabled: meta.readOnly,
      isMulti: meta.multipleSelectionList,
      filterOption: createFilter({matchFrom: extraAttrsMap.matchFrom || "any"}),
      //required: !meta.canBeNull, removed	may be implemented in a later version
    };

    //required not working yet because add hacked Input with required attribute
    if(!meta.canBeNull){
      const value = this.getValue();
      if(Array.isArray(value) && value.length === 0 || ['', undefined].includes(value)){
        selectAttr.components = {Input};
      }
    }
    return {meta, extraAttrsMap, selectAttr};
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
    this.setState({selectedOptions: Array.isArray(object) ? object : [object]}, function () {
      this.changeAndReload(SelectPropertyInput.getRawValue(object));
    });
  }

  static getRawValue(object) {
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

  getStyle(meta) {
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
    return style;
  }
}

SelectPropertyInput.propTypes = {
  selectLoadOptions: PropTypes.func,
};
