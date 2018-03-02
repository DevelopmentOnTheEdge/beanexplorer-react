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
    this.handleChangeMulti = this.handleChangeMulti.bind(this);
  }

  static get(path, bean, localization){
    const itemName = path.substring(path.lastIndexOf("/")+1);
    const itemMeta = bean.meta[path];
    const itemValue = JsonPointer.get(bean, "/values" + path);
    return {
      meta: itemMeta,
      name: itemName,
      value: itemValue,
      path: path,
      key: itemName + "Property",
      ref: itemName + "Property",
      localization: localization
    }
  }

  getPath(){
    if(this.props.path){
      return this.props.path;
    }else{
      return this.props.bean.order[this.props.id];
    }
  }

  handleChange(event) {
    this.props.onChange(this.getPath(), PropertyInput._getValueFromEvent(event));
  }

  dateToISOFormat(date){
    if(typeof date === "string"){
      this.props.onChange(this.getPath(), date);
    }else{
      this.props.onChange(this.getPath(), date.format('YYYY-MM-DD'));
    }
  }

  dateFromISOFormat(stringDate) {
    const date = moment(stringDate === undefined ? "" : stringDate, 'YYYY-MM-DD', true);
    if (date.isValid()){
      return date.format('DD.MM.YYYY');
    }else{
      return stringDate;
    }
  }

  handleChangeMulti(event) {
    let selectArray = [];
    Object.keys(event).forEach(function (key) {
      selectArray.push(event[key].value);
    });
    this.props.onChange(this.props.path, selectArray);
  }

  static _getValueFromEvent(event) {
    if(!event)
      return '';
    if(!event.target)
      return event.value;
    const element = event.target;
    return (element.type === 'checkbox') ? element.checked : element.value;
  }

  render() {
    const attr = PropertyInput.get(this.getPath(), this.props.bean, this.props.localization);

    const meta  = attr.meta;
    const value = attr.value;
    const id    = attr.name + "Field";
    const handle = meta.multipleSelectionList ? this.handleChangeMulti : this.handleChange;
    const extraAttrsMap = PropertyInput.getExtraAttrsMap(meta.extraAttrs);

    const controls = {
      Boolean: () => (
        <input type="checkbox" id={id} key={id} checked={value === true || value === "true"} onChange={handle}
               className={attr.controlClassName || 'form-check-input'} disabled={meta.readOnly} />
      ),
      select: () => {
        const options = PropertyInput.optionsToArray(meta.tagList);
        // VirtualizedSelect css подправить (на длинных строках с переносами)
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
          ref: id, name: id, value: strValue, options: options, onChange: handle,
          clearAllText: attr.localization.clearAllText,
          clearValueText: attr.localization.clearValueText,
          noResultsText: attr.localization.noResultsText,
          searchPromptText: attr.localization.searchPromptText,
          loadingPlaceholder: attr.localization.loadingPlaceholder,
          placeholder: meta.placeholder || attr.localization.placeholder,
          backspaceRemoves: false,
          disabled: meta.readOnly,
          multi: meta.multipleSelectionList,
          matchPos: extraAttrsMap.matchPos || "any"
        };

        if(extraAttrsMap.inputType === "Creatable"){
          return <Creatable {...selectAttr} />
        }

        if(extraAttrsMap.inputType === "VirtualizedSelect"){
          return <VirtualizedSelect {...selectAttr} clearable searchable labelKey="label" valueKey="value" />
        }
        return <Select {...selectAttr} />
      },
      Date: () => {
        return <Datetime dateFormat="DD.MM.YYYY" value={this.dateFromISOFormat(value)}
                         onChange={(v) => this.dateToISOFormat(v)} id={id} key={id}
                         timeFormat={false} closeOnSelect={true} closeOnTab={true} locale={attr.localization.locale || "en"}
                         inputProps={ {disabled: meta.readOnly} } />
      },
//      dateTime: {
//        normal: () => {
//          return ( React.createElement(Datetime, {id: id, key: id, value: value, parent: _this, onChange: handleChange, time: true, className: attr.controlClassName}) );
//        },
//        readOnly: () => this.createStatic(value)
//      },
      textArea: () => {
        return <textarea placeholder={meta.placeholder} id={id}  rows={meta.rows || 3} cols={meta.columns} value={value === undefined ? "" : value}
                         onChange={handle} className={attr.controlClassName || "form-control"} disabled={meta.readOnly} />
      },
      maskTest: () => {
        return <MaskedInput mask={PropertyInput.getMaskInput(meta.validationRules)} value={value === undefined ? "" : value}
                            onChange={handle} className={attr.controlClassName || "form-control"} disabled={meta.readOnly} />
      },
      textInput: () => {
        return <input type="text" placeholder={meta.placeholder} id={id} key={id} value={value === undefined ? "" : value}
                      onChange={handle} className={attr.controlClassName || "form-control"} disabled={meta.readOnly} />
      },
      numberInput: () => {
        const numericProps = PropertyInput.getNumericProps(meta);
        return <NumericInput {...numericProps} placeholder={meta.placeholder} id={id} key={id} value={value}
                             onChange={(valueAsNumber, valueAsString, input) => {
                               this.props.onChange(this.props.path, valueAsNumber !== null ? valueAsNumber : "");
                             }}
                             style={ false } className={attr.controlClassName || "form-control"} disabled={meta.readOnly} />
      },
      passwordField: () => {
        return <input type="password" placeholder={meta.placeholder} id={id} key={id} value={value === undefined ? "" : value}
                      onChange={handle} className={attr.controlClassName || "form-control"} disabled={meta.readOnly} />
      },
      file: () => {
        return <input type="file" placeholder={meta.placeholder} id={id} key={id}
                      className={attr.controlClassName || "form-control"} disabled={meta.readOnly}
                      multiple={meta.multipleSelectionList}
                      onChange={(e) => {
                        if(e.target.files && e.target.files.length === 1) {
                          const fileName = e.target.files[0].name;
                          PropertyInput.getBase64(e.target.files[0]).then(data => {
                            handle({value: {type: "Base64File", name: fileName, data: data}})
                          });
                        }else if(e.target.files && e.target.files.length === 0) {
                          handle({value: ""})
                        }
                      }
                      } />
      },
      WYSIWYG: () => {
        return <CKEditor activeClass="p10" content={value}
                         events={{
                           "change": (evt) => { handle({value: evt.editor.getData()}) }
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
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = error => reject(error);
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

  static optionsToArray(options){
    let optionObject = [];
    for(let i =0 ;i < options.length; i++){
      optionObject.push({ value: options[i][0], label: options[i][1] });
    }
    return optionObject;
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
};

export default PropertyInput;
