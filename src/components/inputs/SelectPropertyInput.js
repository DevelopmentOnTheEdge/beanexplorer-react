import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Select, {components, createFilter} from 'react-select';
import Creatable from 'react-select/creatable';
import WindowedSelect from "react-windowed-select";
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

  /**
   *  todo
   *  https://ru.reactjs.org/docs/react-component.html#unsafe_componentwillreceiveprops
   *  Чтобы «сбросить» некоторое состояние при изменении пропсов вместо componentWillReceiveProps
   *  используйте управляемые компоненты или неуправляемые компоненты с ключом.
   */
  UNSAFE_componentWillReceiveProps(nextProps) {
    let value = nextProps.value;
    if (Array.isArray(value) && value.length === 0 || Array.isArray(value) && value === '') {
      this.setState({selectedOptions: []});
    } else if (Array.isArray(value)) {
      this.setState({selectedOptions: this.getOptions().filter(option => value.includes(option.value))});
    } else {
      this.setState({selectedOptions: this.getOptions().filter(option => option.value == value)});
    }
  }

  componentDidMount() {
    let value = this.getValue();
    if (Array.isArray(value) && value.length > 0) {
      //tags is array from strings
      value = value.map(el => el !== null && el !== undefined ? String(el) : null);
      this.setState({selectedOptions: this.getOptions().filter(option => value.includes(option.value))});
    } else if (value !== "") {
      this.setState({selectedOptions: this.getOptions().filter(option => option.value == value)});
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
      let customStyles = {
        option: (base) => ({
          ...base,
        })
      };
      if (this.props.inline) {
        //todo not corrected calculate position multiline option with heigh < 35
        let minHeight = this.props.bsSize === "sm" ? 29 : (this.props.bsSize === "lg" ? 46 : 35);
        customStyles = {
          option: (base) => ({
            ...base,
            minHeight: minHeight
          })
        };
      }
      return <WindowedSelect {...selectAttr} styles={customStyles}/>
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
      noOptionsMessage: () => localization.noResultsText,
      loadingPlaceholder: localization.loadingPlaceholder,
      placeholder: extraAttrsMap.placeholder || localization.placeholder,
      backspaceRemovesValue: false,
      isClearable: true,
      isDisabled: meta.readOnly,
      isMulti: meta.multipleSelectionList,
      filterOption: createFilter({matchFrom: extraAttrsMap.matchFrom || "any"}),
      classNamePrefix: 'be5-select',
      // menuIsOpen: true
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
    this.setState({selectedOptions: Array.isArray(object) || object === null ? object : [object]}, function () {
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
