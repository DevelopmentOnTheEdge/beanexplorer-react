import React                from 'react';
import PropTypes            from 'prop-types';
import Datetime             from 'react-datetime';
import moment               from 'moment';
import Select               from 'react-select';
import VirtualizedSelect    from 'react-virtualized-select'
import CKEditor             from 'react-ckeditor-component';
import MaskedInput          from 'react-maskedinput';
import JsonPointer          from 'json-pointer';
import classNames           from 'classnames';


class PropertyInput extends React.Component
{
  constructor(props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);
  }

  getPath() {
    if(this.props.path) {
      return this.props.path;
    }else{
      return this.props.bean.order[this.props.id];
    }
  }

  callOnChange(value) {
    this.props.onChange(this.getPath(), value);
  }

  handleChange(event) {
    const value = (event.target.type === 'checkbox') ? event.target.checked : event.target.value;
    this.callOnChange(value);
  }

  dateToISOFormat(date) {
    if(typeof date === "string") {
      this.callOnChange(date);
    } else {
      this.callOnChange(date.format('YYYY-MM-DD'));
    }
  }

  static dateFromISOFormat(stringDate) {
    const date = moment(stringDate === undefined ? "" : stringDate, 'YYYY-MM-DD', true);
    if (date.isValid()) {
      return date.format('DD.MM.YYYY');
    } else {
      return stringDate;
    }
  }

  handleChangeSelect(object) {
    if(Array.isArray(object)) {
      let selectArray = [];
      Object.keys(object).forEach(function (key) {
        selectArray.push(object[key].value);
      });
      this.callOnChange(selectArray);
    } else {
      this.callOnChange(object !== null ? object.value : "");
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

  static getExtraAttrsMap(extraAttrs) {
    let map = {};
    if(extraAttrs === undefined)return map;
    for (let i=0 ;i< extraAttrs.length; i++)
    {
      map[extraAttrs[i][0]] = extraAttrs[i][1];
    }
    return map;
  }

  static getValidationRulesMap(rules) {
    let map = {};
    if(rules === undefined)return map;

    if(!Array.isArray(rules))
    {
      map[rules.type] = rules.attr;
    }
    else
    {
      for (let i=0 ;i< rules.length; i++)
      {
        map[rules[i].type] = rules[i].attr;
      }
    }

    return map;
  }

  render() {
    const path  = this.getPath();
    const meta  = this.props.bean.meta[path];
    const value = JsonPointer.get(this.props.bean, "/values" + path);
    const id    = path.substring(path.lastIndexOf("/")+1) + "PropertyInput";
    const extraAttrsMap = PropertyInput.getExtraAttrsMap(meta.extraAttrs);
    const validationRulesMap = PropertyInput.getValidationRulesMap(meta.validationRules);
    const required = meta.canBeNull !== true;

    let inputTypeClass;
    switch (meta.type){
      case "Boolean":    inputTypeClass = 'form-check-input'; break;
      case "Base64File": inputTypeClass = 'form-control-file'; break;
      default: inputTypeClass = 'form-control';
    }

    let validationClasses = classNames(
      {'is-invalid' : meta.status === 'error'},
      {'is-valid' : meta.status === 'success'},
    );

    const baseProps = {
      id: id,
      key: id,
      disabled: meta.readOnly,
      required: required,
      className: classNames('property-input', inputTypeClass, validationClasses, this.props.controlClassName)
    };

    const rawInputProps = Object.assign({},
      baseProps,
      {
        value: value === undefined ? "" : value,
        onChange: this.handleChange,
        placeholder: meta.placeholder
      }
    );

    const controls = {
      textInput: (type) => (
        <input
          type={type}
          maxLength={meta.columnSize}
          pattern={validationRulesMap.pattern}
          {...rawInputProps}
        />
      ),
      textArea: () => (
        <textarea
          rows={extraAttrsMap.rows || 3}
          maxLength={meta.columnSize}
          pattern={validationRulesMap.pattern}
          {...rawInputProps}
        />
      ),
      number: (range, defaultStep) => (
        <input
          type="number"
          min={range.min}
          max={range.max}
          step={validationRulesMap.step || defaultStep}
          {...rawInputProps}
        />
      ),
      Boolean: () => (
        <input
          type="checkbox"
          checked={value === true || value === "true"}
          onChange={this.handleChange}
          {...baseProps}
        />
      ),
      Date: () => (
        <Datetime
          dateFormat="DD.MM.YYYY"
          key={id + "Datetime"}
          value={PropertyInput.dateFromISOFormat(value)}
          onChange={(v) => this.dateToISOFormat(v)}
          timeFormat={false}
          closeOnSelect={true}
          closeOnTab={true}
          locale={this.props.localization.locale || "en"}
          inputProps={ Object.assign({},
            baseProps,
            {
              pattern: "(^$|\\d{1,2}\\.\\d{1,2}\\.\\d{4})",
              placeholder: meta.placeholder
            }
          )}
        />
      ),
      Base64File: () => (
        <input
          type="file"
          multiple={meta.multipleSelectionList}
          onChange={(e) => {
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
          }}
          {...baseProps}
        />
      ),
      select: () => {
        let options = [];
        for(let i =0 ;i < meta.tagList.length; i++){
          options.push({ value: meta.tagList[i][0], label: meta.tagList[i][1] });
        }

        let strValue;
        if(Array.isArray(value)){
          strValue = [];
          for (let i = 0; i < value.length; i++)strValue.push("" + value[i]);
        }
        else
        {
          strValue = "" + value;
        }
        const selectAttr = {
          ref: id,
          name: id,
          value: strValue,
          options: options,
          onChange: (v) => this.handleChangeSelect(v),
          clearAllText: this.props.localization.clearAllText,
          clearValueText: this.props.localization.clearValueText,
          noResultsText: this.props.localization.noResultsText,
          searchPromptText: this.props.localization.searchPromptText,
          loadingPlaceholder: this.props.localization.loadingPlaceholder,
          placeholder: meta.placeholder || this.props.localization.placeholder,
          backspaceRemoves: false,
          disabled: meta.readOnly,
          multi: meta.multipleSelectionList,
          matchPos: extraAttrsMap.matchPos || "any",
          required: required
        };

        if(extraAttrsMap.inputType === "Creatable")
        {
          return <Creatable {...selectAttr} />
        }
        else if(extraAttrsMap.inputType === "VirtualizedSelect")
        {
          return <VirtualizedSelect
            clearable
            searchable
            labelKey="label"
            valueKey="value"
            {...selectAttr}
          />
        }
        else
        {
          return <Select {...selectAttr} />
        }
      },
//      dateTime: {
//        normal: () => {
//          return ( React.createElement(Datetime, {id: id, key: id, value: value, parent: _this, onChange: handleChange, time: true, className: this.props.controlClassName}) );
//        },
//        readOnly: () => this.createStatic(value)
//      },
      mask: () => (
        <MaskedInput
          mask={validationRulesMap.mask}
          value={value === undefined ? "" : value}
          onChange={this.handleChange}
          {...baseProps}
        />
      ),
      WYSIWYG: () => {
        if(this.ckeditor){
          if(this.ckeditor.editorInstance.getData() !== value)
          {
            this.ckeditor.editorInstance.setData(value);
          }
          this.ckeditor.editorInstance.setReadOnly(meta.readOnly === true);
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
            language: this.props.localization.locale || "en",
            readOnly: meta.readOnly
          }}
        />
      },
      labelField: () => {
        let labelPropertyClasses = classNames(
          'property-input',
          this.props.controlClassName,
          {'text-danger' : meta.status === 'error'},
          {'text-success' : meta.status === 'success'},
          {'text-warning' : meta.status === 'warning'},
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
      },
    };

    if(meta.tagList)
    {
      return controls['select']();
    }

    if(meta.labelField)
    {
      return controls['labelField']();
    }

    if(extraAttrsMap.inputType === 'WYSIWYG')
    {
      return controls['WYSIWYG']();
    }

    if(extraAttrsMap.inputType === 'textArea')
    {
      return controls['textArea']();
    }

    if(validationRulesMap.mask !== undefined)
    {
      return controls['mask']();
    }

    if(validationRulesMap.range !== undefined ||
      meta.type === 'Short' || meta.type === 'Integer' || meta.type === 'Long' || meta.type === 'Double')
    {
      //use defaultStep for double for prevent validation errors in firefox
      let defaultStep = meta.type === 'Double' ? 0.000000000001 : 1;
      let range;

      switch (meta.type)
      {
        case 'Short':
          range = {min: -32768, max: 32767};
          break;
        case 'Integer':
          range = {min: -2147483648, max: 2147483647};
          break;
        case 'Long':
          range = {min: Number.MIN_SAFE_INTEGER, max: Number.MAX_SAFE_INTEGER};
          break;
        default:
          range = {min: undefined, max: undefined}
      }

      return controls['number'](validationRulesMap.range || range, defaultStep);
    }

    if(controls[meta.type] !== undefined)
    {
      return controls[meta.type]();
    }

    if(meta.passwordField)
    {
      return controls['textInput']('password');
    }

    return controls['textInput'](extraAttrsMap.inputType || 'text');
  }

}

PropertyInput.defaultProps = {
  localization: {
    locale: 'en',
    clearAllText: 'Clear all',
    clearValueText: 'Clear value',
    noResultsText: 'No results found',
    searchPromptText: 'Type to search',
    placeholder: 'Select ...',
    loadingPlaceholder: 'Loading...'
  },
};

PropertyInput.propTypes = {
  bean: PropTypes.object.isRequired,
  path: PropTypes.string,
  id: PropTypes.number,
  onChange: PropTypes.func,
  localization: PropTypes.object,
  controlClassName: PropTypes.string, 
};

export default PropertyInput;
