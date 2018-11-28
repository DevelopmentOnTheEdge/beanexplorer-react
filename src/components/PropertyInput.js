import React from 'react';
import MaskedInput from 'react-maskedinput';
import RadioSelectPropertyInput from "./inputs/RadioSelectPropertyInput";
import SelectPropertyInput from "./inputs/SelectPropertyInput";
import NumberPropertyInput from "./inputs/NumberPropertyInput";
import DateTimePropertyInput from "./inputs/DateTimePropertyInput";
import BasePropertyInput from "./inputs/BasePropertyInput";
import WYSIWYGPropertyInput from "./inputs/WYSIWYGPropertyInput";
import LabelPropertyInput from "./inputs/LabelPropertyInput";
import Base64FilePropertyInput from "./inputs/Base64FilePropertyInput";


class PropertyInput extends BasePropertyInput {
  constructor(props) {
    super(props);
    this.handleChangeBoolean = this.handleChangeBoolean.bind(this);
  }

  handleChangeBoolean(event) {
    this.callOnChange(event.target.checked);
  }

  render() {
    const meta = this.getMeta();
    const value = this.getValue();
    const extraAttrsMap = BasePropertyInput.getExtraAttrsMap(meta);

    if (meta.tagList) {
      if (extraAttrsMap.inputType === "radio") {
        return <RadioSelectPropertyInput {...this.props}/>
      } else {
        return <SelectPropertyInput {...this.props}/>
      }
    }

    if (meta.labelField) {
      return <LabelPropertyInput {...this.props}/>
    }

    if (extraAttrsMap.inputType === 'WYSIWYG') {
      return <WYSIWYGPropertyInput {...this.props}/>
    }

    if (meta.type === 'Short' || meta.type === 'Integer' || meta.type === 'Long' || meta.type === 'Double'
      || this.getValidationRule('range') !== undefined || this.getValidationRule('step') !== undefined) {
      return <NumberPropertyInput {...this.props}/>
    }

    if (meta.type === 'Base64File') {
      return <Base64FilePropertyInput {...this.props}/>
    }

    if (meta.type === 'Date' || meta.type === 'Timestamp') {
      return <DateTimePropertyInput {...this.props}/>
    }

    if (meta.type === 'Boolean') {
      return <input
        type="checkbox"
        checked={value === true || value === "true"}
        onChange={this.handleChangeBoolean}
        {...this.getBaseProps()}
      />
    }

    const rawInputProps = this.getRawInputProps(value, extraAttrsMap);
    const rawTextValidation = this.getRawTextValidation(meta);
    if (extraAttrsMap.inputType === 'textArea') {
      return <textarea
        rows={extraAttrsMap.rows || 3}
        {...rawInputProps}
        {...rawTextValidation}
      />
    }

    const validationRuleMask = this.getValidationRule('mask');
    if (validationRuleMask !== undefined) {
      return <MaskedInput
        mask={validationRuleMask.attr}
        value={value}
        onChange={this.handleChange}
        {...this.getBaseProps()}
      />;
    }

    return <input
      type={extraAttrsMap.inputType || 'text'}
      {...rawInputProps}
      {...rawTextValidation}
    />;
  }
}

export default PropertyInput;
