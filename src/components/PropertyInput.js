import React                from 'react';
import CKEditor             from 'react-ckeditor-component';
import MaskedInput          from 'react-maskedinput';
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
  }

  handleChangeBoolean(event) {
    this.callOnChange(event.target.checked);
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

  static updateCkeditor(ckeditor, value, readOnly) {
    if(ckeditor.editorInstance.getData() !== value)
    {
      ckeditor.editorInstance.setData(value);
    }
    ckeditor.editorInstance.setReadOnly(readOnly);
  }

  render() {
    const meta  = this.getMeta();
    const id    = this.getID();
    const value    = this.getValue();
    const extraAttrsMap = BasePropertyInput.getExtraAttrsMap(meta);

    if(meta.tagList)
    {
      if (extraAttrsMap.inputType === "radio") {
        return <RadioSelectGroup {...this.props}/>
      } else {
        return <SelectPropertyInput {...this.props}/>
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
        {...this.getBaseProps()}
      />;
    }

    if(meta.type === 'Short' || meta.type === 'Integer' || meta.type === 'Long' || meta.type === 'Double'
        || this.getValidationRule('range') !== undefined || this.getValidationRule('step') !== undefined)
    {
      return <NumberPropertyInput {...this.props}/>
    }

    if(meta.type === 'Base64File'){
      return <input
        type="file"
        multiple={meta.multipleSelectionList}
        onChange={this.base64FileHandle}
        {...this.getBaseProps()}
      />
    }

    if(meta.type === 'Date' || meta.type === 'Timestamp'){
      return <DateTimePropertyInput {...this.props}/>
    }

    if(meta.type === 'Boolean'){
      return <input
        type="checkbox"
        checked={value === true || value === "true"}
        onChange={this.handleChangeBoolean}
        {...this.getBaseProps()}
      />
    }

    const rawInputProps = this.getRawInputProps(value, extraAttrsMap);
    const rawTextValidation = this.getRawTextValidation(meta);
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
}

export default PropertyInput;
