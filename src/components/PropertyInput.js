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

    const baseProps = {
      id: id,
      key: id,
      disabled: meta.readOnly,
      required: required
    };

    const rawInputProps = Object.assign({},
      baseProps,
      {
        value: value === undefined ? "" : value,
        onChange: this.handleChange,
        placeholder: meta.placeholder,
        className: classNames("form-control", this.props.controlClassName)
      }
    );

    const controls = {
      textInput: () => (
        <input
          type="text"
          maxLength={meta.columnSize}
          pattern={validationRulesMap.pattern}
          {...rawInputProps}
        />
      ),
      passwordField: () => (
        <input
          type="password"
          maxLength={meta.columnSize}
          pattern={validationRulesMap.pattern}
          {...rawInputProps}
        />
      ),
      textArea: () => (
        <textarea
          rows={meta.rows || 3}
          cols={meta.columns}
          maxLength={meta.columnSize}
          pattern={validationRulesMap.pattern}
          {...rawInputProps}
        />
      ),
      Short: () => (
        <input
          type="number"
          min={-32768}
          max={32767}
          step={validationRulesMap.step || 1}
          {...rawInputProps}
        />
      ),
      Integer: () => (
        <input
          type="number"
          min={-2147483648}
          max={2147483647}
          step={validationRulesMap.step || 1}
          {...rawInputProps}
        />
      ),
      Long: () => (
        <input
          type="number"
          min={Number.MIN_SAFE_INTEGER}
          max={Number.MAX_SAFE_INTEGER}
          step={validationRulesMap.step || 1}
          {...rawInputProps}
        />
      ),
      //default step for prevent validation problems in firefox
      Double: () => (
        <input
          type="number"
          step={validationRulesMap.step || 0.000000000001}
          {...rawInputProps}
        />
      ),
      numberWithRange: () => (
        <input
          type="number"
          min={validationRulesMap.range.min}
          max={validationRulesMap.range.max}
          step={validationRulesMap.step || 1}
          {...rawInputProps}
        />
      ),
      Boolean: () => (
        <input
          type="checkbox"
          checked={value === true || value === "true"}
          onChange={this.handleChange}
          className={classNames("form-check-input", this.props.controlClassName)}
          {...baseProps}
        />
      ),
      Date: () => (
        <Datetime
          dateFormat="DD.MM.YYYY"
          key={id + "Datetime"}
          onChange={(v) => this.dateToISOFormat(v)} value={PropertyInput.dateFromISOFormat(value)}
          timeFormat={false}
          closeOnSelect={true}
          closeOnTab={true}
          locale={this.props.localization.locale || "en"}
          inputProps={ Object.assign({},
            baseProps,
            {
              pattern: "(^$|\\d{1,2}\\.\\d{1,2}\\.\\d{4})",
              placeholder: meta.placeholder,
              className: classNames("form-control", this.props.controlClassName)
            }
          )}
        />
      ),
      Base64File: () => (
        <input
          type="file"
          className={classNames("form-control-file", this.props.controlClassName)}
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
          className={classNames("form-control", this.props.controlClassName)}
          {...baseProps}
        />
      ),
      WYSIWYG: () => (
        <CKEditor
          activeClass="p10"
          content={value}
          events={{
            "change": (evt) => { this.callOnChange(evt.editor.getData()) }
          }}
          config={{
            language: 'ru',
            readOnly: meta.readOnly
          }}
        />
      ),
      labelField: () => {
        if(meta.rawValue)
        {
          return <label
            id={id}
            key={id}
            className={classNames("form-control-label", this.props.controlClassName)}
            dangerouslySetInnerHTML={{__html: value}}
          />
        }
        else
        {
          return <label
            className={classNames("form-control-label", this.props.controlClassName)}
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

    if(meta.passwordField)
    {
      return controls['passwordField']();
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

    if(validationRulesMap.range !== undefined)
    {
      return controls['numberWithRange']();
    }

    if(validationRulesMap.mask !== undefined)
    {
      return controls['mask']();
    }

    if(controls[meta.type] !== undefined)
    {
      return controls[meta.type]();
    }

    return controls['textInput']();
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
