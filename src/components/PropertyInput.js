import React                from 'react';
import PropTypes            from 'prop-types';
import Datetime             from 'react-datetime';
import moment               from 'moment';
import Select               from 'react-select';
import VirtualizedSelect    from 'react-virtualized-select'
import NumericInput          from 'react-numeric-input';
import CKEditor              from 'react-ckeditor-component';
import MaskedInput           from 'react-maskedinput';
import JsonPointer          from 'json-pointer';


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

  dateFromISOFormat(stringDate) {
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

  static getMaskInput(rules)
  {
    for (let i = 0; i < rules.length; i++)
    {
      if ("mask" in rules[i]) {
        return rules[i].mask
      }
    }
    return null;
  }

  static isNumberInput(rules)
  {
    for (let i =0 ; i< rules.length; i++)
    {
      if(rules[i].type === "baseRule" &&
        ( rules[i].attr === "digits" || rules[i].attr === "integer" || rules[i].attr === "number" ))return true;
    }
    return false;
  }

  static getNumericProps(meta)
  {
    let props = {};
    props['maxLength'] = 14;//errors if more
    const rules = meta.validationRules;
    for (let i =0 ; i< rules.length; i++)
    {
      if(rules[i].type === "baseRule" && (rules[i].attr === "number"))
      {
        props['precision'] = 10;
      }
      if(rules[i].type === "baseRule" && (rules[i].attr === "integer"))
      {
        props['min'] = -2147483648;
        props['max'] = 2147483647;
        props['maxLength'] = 9;
        props['precision'] = 0;
      }
      // if(rules[i].type === "digits")
      // {
      //   props['min'] = 0;//todo not work
      // }
    }
    if(meta.columnSize){
      props['maxLength'] = parseInt(meta.columnSize);
    }
    return props;
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

  static getExtraAttrsMap(extraAttrs){
    let map = {};
    if(extraAttrs === undefined)return map;
    for (let i=0 ;i< extraAttrs.length; i++){
      map[extraAttrs[i][0]] = extraAttrs[i][1];
    }
    return map;
  }

  render() {
    const path  = this.getPath();
    const meta  = this.props.bean.meta[path];
    const value = JsonPointer.get(this.props.bean, "/values" + path);
    const id    = path.substring(path.lastIndexOf("/")+1) + "PropertyInput";
    const extraAttrsMap = PropertyInput.getExtraAttrsMap(meta.extraAttrs);

    const controls = {
      Boolean: () => (
        <input type="checkbox" id={id} key={id} checked={value === true || value === "true"} onChange={this.handleChange}
               className={this.props.controlClassName || 'form-check-input'} disabled={meta.readOnly} />
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
          ref: id, name: id, value: strValue, options: options, onChange: (v) => this.handleChangeSelect(v),
          clearAllText: this.props.localization.clearAllText,
          clearValueText: this.props.localization.clearValueText,
          noResultsText: this.props.localization.noResultsText,
          searchPromptText: this.props.localization.searchPromptText,
          loadingPlaceholder: this.props.localization.loadingPlaceholder,
          placeholder: meta.placeholder || this.props.localization.placeholder,
          backspaceRemoves: false,
          disabled: meta.readOnly,
          multi: meta.multipleSelectionList,
          matchPos: extraAttrsMap.matchPos || "any"
        };

        if(extraAttrsMap.inputType === "Creatable")
        {
          return <Creatable {...selectAttr} />
        }
        else if(extraAttrsMap.inputType === "VirtualizedSelect")
        {
          return <VirtualizedSelect {...selectAttr} clearable searchable labelKey="label" valueKey="value" />
        }
        else
        {
          return <Select {...selectAttr} />
        }
      },
      Date: () => {
        return <Datetime dateFormat="DD.MM.YYYY" value={this.dateFromISOFormat(value)}
                         onChange={(v) => this.dateToISOFormat(v)} id={id} key={id}
                         timeFormat={false} closeOnSelect={true} closeOnTab={true} locale={this.props.localization.locale || "en"}
                         inputProps={ {disabled: meta.readOnly} } />
      },
//      dateTime: {
//        normal: () => {
//          return ( React.createElement(Datetime, {id: id, key: id, value: value, parent: _this, onChange: handleChange, time: true, className: this.props.controlClassName}) );
//        },
//        readOnly: () => this.createStatic(value)
//      },
      textArea: () => {
        return <textarea placeholder={meta.placeholder} id={id} rows={meta.rows || 3} cols={meta.columns} value={value === undefined ? "" : value}
                         onChange={this.handleChange} className={this.props.controlClassName || "form-control"} disabled={meta.readOnly} />
      },
      maskTest: () => {
        return <MaskedInput mask={PropertyInput.getMaskInput(meta.validationRules)} value={value === undefined ? "" : value}
                            onChange={this.handleChange} className={this.props.controlClassName || "form-control"} disabled={meta.readOnly} />
      },
      textInput: () => {
        return <input type="text" placeholder={meta.placeholder} id={id} key={id} value={value === undefined ? "" : value}
                      onChange={this.handleChange} className={this.props.controlClassName || "form-control"} disabled={meta.readOnly} />
      },
      numberInput: () => {
        const numericProps = PropertyInput.getNumericProps(meta);
        return <NumericInput {...numericProps} placeholder={meta.placeholder} id={id} key={id} value={value}
                             onChange={(valueAsNumber, valueAsString, input) => {
                               this.callOnChange(valueAsNumber !== null ? valueAsNumber : "");
                             }}
                             style={ false } className={this.props.controlClassName || "form-control"} disabled={meta.readOnly} />
      },
      passwordField: () => {
        return <input type="password" placeholder={meta.placeholder} id={id} key={id} value={value === undefined ? "" : value}
                      onChange={this.handleChange} className={this.props.controlClassName || "form-control"} disabled={meta.readOnly} />
      },
      file: () => {
        return <input type="file" placeholder={meta.placeholder} id={id} key={id}
                      className={this.props.controlClassName || "form-control"} disabled={meta.readOnly}
                      multiple={meta.multipleSelectionList}
                      onChange={(e) => {
                        if(e.target.files && e.target.files.length === 1) {
                          const fileName = e.target.files[0].name;
                          PropertyInput.getBase64(e.target.files[0]).then(data => {
                            this.callOnChange({type: "Base64File", name: fileName, data: data})
                          });
                        }else if(e.target.files && e.target.files.length === 0) {
                          console.log(e.target.files);
                          this.callOnChange("")
                        }
                      }
                      } />
      },
      WYSIWYG: () => {
        return <CKEditor activeClass="p10" content={value}
                         events={{
                           "change": (evt) => { this.callOnChange(evt.editor.getData()) }
                         }}
                         config={{language: 'ru', readOnly: meta.readOnly}}
        />
      },
      labelField: () => {
        if(meta.rawValue)
        {
          return <div dangerouslySetInnerHTML={{__html: value}} />
        }
        else
        {
          return <label className="form-control-label">{value}</label>
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

    if(meta.validationRules !== undefined && PropertyInput.isNumberInput(meta.validationRules))
    {
      return controls['numberInput']()
    }

    if(controls[meta.type] !== undefined)
    {
      return controls[meta.type]();
    }

    if(extraAttrsMap.inputType === 'WYSIWYG')
    {
      return controls['WYSIWYG']();
    }

    if(extraAttrsMap.inputType === 'textArea')
    {
      return controls['textArea']();
    }

    if(extraAttrsMap.inputType === 'file')
    {
      return controls['file']();
    }

    if(meta.validationRules !== undefined && PropertyInput.getMaskInput(meta.validationRules))
    {
      return controls['maskTest']();
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
