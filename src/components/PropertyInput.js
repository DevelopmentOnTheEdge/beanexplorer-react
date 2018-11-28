import React                from 'react';
import CKEditor             from 'react-ckeditor-component';
import MaskedInput          from 'react-maskedinput';
import JsonPointer          from 'json-pointer';
import classNames           from 'classnames';
import RadioSelectGroup     from "./inputs/RadioSelectGroup";
import SelectPropertyInput from "./inputs/SelectPropertyInput";
import NumberPropertyInput from "./inputs/NumberPropertyInput";
import DateTimePropertyInput from "./inputs/DateTimePropertyInput";
import BasePropertyInput from "./inputs/BasePropertyInput";


class PropertyInput extends BasePropertyInput
{
  constructor(props) {
    super(props);
    this.handleChangeBoolean = this.handleChangeBoolean.bind(this);
    this.base64FileHandle = this.base64FileHandle.bind(this);
    this.patternValidationMessage = this.patternValidationMessage.bind(this);
  }

  handleChangeBoolean(event) {
    this.callOnChange(event.target.checked);
  }

  patternValidationMessage(e) {
    const pattern = this.getValidationRule('pattern');
    if(pattern && pattern.customMessage)
    {
      if (e.target.validity.patternMismatch) {
        e.target.setCustomValidity(pattern.customMessage)
      } else {
        e.target.setCustomValidity('')
      }
    }
  }

  base64FileHandle(e) {
    if(e.target.files && e.target.files.length === 1)
    {
      const fileName = e.target.files[0].name;
      PropertyInput.getBase64(e.target.files[0]).then(data => {
        this.callOnChange({type: "Base64File", name: fileName, data: data})
      });
    }
    else if(e.target.files && e.target.files.length === 0)
    {
      this.callOnChange("")
    }
  }

  static getBase64(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.addEventListener("load", function () {
        resolve(reader.result);
      }, false);
      reader.onerror = error => reject(error);

      reader.readAsDataURL(file);
    });
  }

  static getExtraAttrsMap(meta) {
    const extraAttrs = meta.extraAttrs;
    let map = {};

    if(extraAttrs !== undefined)
    {
      for (let i = 0; i < extraAttrs.length; i++) {
        map[extraAttrs[i][0]] = extraAttrs[i][1];
      }
    }

    if(meta.passwordField)
    {
      map.inputType = 'password';
    }

    if(meta.placeholder)
    {
      map.placeholder = meta.placeholder;
    }

    return map;
  }

  static updateCkeditor(ckeditor, value, readOnly) {
    if(ckeditor.editorInstance.getData() !== value)
    {
      ckeditor.editorInstance.setData(value);
    }
    ckeditor.editorInstance.setReadOnly(readOnly);
  }

  render() {
    const path  = this.getPath();
    const meta  = this.getMeta();
    const id    = this.getID();

    const value    = JsonPointer.get(this.props.bean, "/values" + path);
    const required = meta.canBeNull !== true;
    const extraAttrsMap = PropertyInput.getExtraAttrsMap(meta);
    const attr = {id, extraAttrsMap};

    let inputTypeClass;
    switch (meta.type){
      case "Boolean":    inputTypeClass = 'form-check-input'; break;
      case "Base64File": inputTypeClass = 'form-control-file'; break;
      default: inputTypeClass = 'form-control';
    }

    if(extraAttrsMap.inputType === "form-control-plaintext" &&
      meta.readOnly === true && inputTypeClass === 'form-control')
    {
      inputTypeClass = 'form-control-plaintext'
    }

    let validationClasses = classNames(
      {'is-invalid' : meta.status === 'error'},
      {'is-valid' : meta.status === 'success'},
    );
    attr.validationClasses = validationClasses;

    const basePropsClasses = classNames(
      'property-input',
      inputTypeClass,
      validationClasses,
      this.props.controlClassName,
      {'form-control-sm': this.props.bsSize === "sm" && meta.type !== "Boolean"},
      {'form-control-lg': this.props.bsSize === "lg" && meta.type !== "Boolean"}
    );

    const baseProps = {
      id: id,
      key: id,
      required: required,
      size: meta.inputSize,
      className: basePropsClasses
    };
    attr.baseProps = baseProps;

    if(meta.readOnly === true)
    {
      if(meta.type === 'Boolean' || meta.type === 'Base64File'){
        baseProps['disabled'] = 'disabled';
      }else{
        baseProps['readOnly'] = 'readonly';
      }
    }

    const rawInputProps = Object.assign({},
      baseProps,
      {
        value: value,
        onChange: this.handleChange,
        placeholder: extraAttrsMap.placeholder
      }
    );
    attr.rawInputProps = rawInputProps;

    const validationRulePattern = this.getValidationRule('pattern');
    const rawTextValidation = {
      maxLength: meta.columnSize,
      pattern: validationRulePattern ? validationRulePattern.attr : undefined,
      onInvalid: this.patternValidationMessage,
      onInput: this.patternValidationMessage
    };
    attr.rawTextValidation = rawTextValidation;

    if(meta.tagList)
    {
      if (extraAttrsMap.inputType === "radio") {
        return <RadioSelectGroup
          attr={attr}
          value={PropertyInput.getCorrectMulValue(value, meta.multipleSelectionList)}
          {...this.props}
        />
      } else {
        return <SelectPropertyInput
          attr={attr}
          value={PropertyInput.getCorrectMulValue(value, meta.multipleSelectionList)}
          {...this.props}
        />
      }
    }

    if(meta.labelField)
    {
      let labelPropertyClasses = classNames(
        'property-input',
        this.props.controlClassName,
        {'text-danger' : meta.status === 'error'},
        {'text-success' : meta.status === 'success'},
        {'text-warning' : meta.status === 'warning'},
        {'col-form-label-sm' : this.props.bsSize === "sm"},
        {'col-form-label-lg' : this.props.bsSize === "lg"}
      );
      if(meta.rawValue)
      {
        return <label
          id={id}
          key={id}
          className={labelPropertyClasses}
          dangerouslySetInnerHTML={{__html: value}}
        />
      }
      else
      {
        return <label
          className={labelPropertyClasses}
          id={id}
          key={id}
        >
          {value}
        </label>
      }
    }

    if(extraAttrsMap.inputType === 'WYSIWYG')
    {
      if(this.ckeditor) {
        PropertyInput.updateCkeditor(this.ckeditor, value, meta.readOnly === true);
      }
      return <CKEditor
        ref={instance => {
          this.ckeditor = instance;
        }}
        activeClass="p10"
        content={value}
        events={{
          "change": (evt) => {
            this.callOnChange(evt.editor.getData())
          }
        }}
        config={{
          language: this.props.localization.locale,
          readOnly: meta.readOnly
        }}
      />
    }

    const validationRuleMask = this.getValidationRule('mask');
    if(validationRuleMask !== undefined)
    {
      return <MaskedInput
        mask={validationRuleMask.attr}
        value={value}
        onChange={this.handleChange}
        {...baseProps}
      />;
    }

    if(meta.type === 'Short' || meta.type === 'Integer' || meta.type === 'Long' || meta.type === 'Double'
        || this.getValidationRule('range') !== undefined || this.getValidationRule('step') !== undefined)
    {
      return <NumberPropertyInput
        attr={attr}
        value={value}
        {...this.props}
      />
    }

    if(meta.type === 'Base64File'){
      return <input
        type="file"
        multiple={meta.multipleSelectionList}
        onChange={this.base64FileHandle}
        {...baseProps}
      />
    }

    if(meta.type === 'Date' || meta.type === 'Timestamp'){
      return <DateTimePropertyInput
        attr={attr}
        value={value}
        {...this.props}
      />
    }

    if(meta.type === 'Boolean'){
      return <input
        type="checkbox"
        checked={value === true || value === "true"}
        onChange={this.handleChangeBoolean}
        {...baseProps}
      />
    }

    if(extraAttrsMap.inputType === 'textArea')
    {
      return <textarea
        rows={extraAttrsMap.rows || 3}
        {...rawInputProps}
        {...rawTextValidation}
      />
    }

    return <input
      type={extraAttrsMap.inputType || 'text'}
      {...rawInputProps}
      {...rawTextValidation}
    />;
  }

  static getCorrectMulValue(value, multipleSelectionList) {
    let correctValue;
    if (multipleSelectionList === true) {
      correctValue = [];
      if (Array.isArray(value)) {
        for (let i = 0; i < value.length; i++) correctValue.push("" + value[i]);
      }
    } else {
      correctValue = "" + value;
    }
    return correctValue;
  }
}

export default PropertyInput;
