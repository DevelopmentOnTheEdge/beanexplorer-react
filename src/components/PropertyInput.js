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
import bigInt               from "big-integer";
import bigRat               from "big-rational";


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

  dateValidation(e) {
    if (e.target.validity.patternMismatch) {
      e.target.setCustomValidity(this.props.localization.datePatternError)
    } else {
      e.target.setCustomValidity('')
    }
  }

  numberValidation(e, range, step, type)
  {
    const local = this.props.localization;

    let value;
    try {
      value = bigRat(e.target.value);
    } catch (err) {
      PropertyInput.setErrorState(e, local.numberTypeMismatch);
      return
    }

    if((type === 'Short' || type === 'Integer' || type === 'Long') &&
      (e.target.value.indexOf('e') !== -1 || e.target.value.indexOf('E') !== -1))
    {
      PropertyInput.setErrorState(e, local.simpleIntegerTypeMismatch);
      return
    }

    if(range) {
      if (value.compare(bigRat(range.min)) === -1) {
        PropertyInput.setErrorState(e, this.setMessagePlaceHolders(local.rangeUnderflow, [range.min]));
        return
      }
      else if (value.compare(bigRat(range.max)) === 1) {
        PropertyInput.setErrorState(e, this.setMessagePlaceHolders(local.rangeOverflow, [range.max]));
        return
      }
    }

    if(step) {
      const stepRat = bigRat(step);

      if (!value.divide(stepRat).denominator.equals(bigInt.one))
      {
        const min = value.divide(stepRat).floor().multiply(stepRat);
        const max = min.add(stepRat);

        PropertyInput.setErrorState(e, this.setMessagePlaceHolders(
              local.stepMismatch, [min.toDecimal(), max.toDecimal()]
        ));
        return
      }
    }

    PropertyInput.setErrorState(e, '');
  }

  setMessagePlaceHolders(source, params)
  {
    if(params){
      params.forEach(function(item, i) {
        source = source.replace(new RegExp("\\{" + i + "\\}", "g"), item);
      });
    }
    return source
  }

  static setErrorState(e, text)
  {
    e.target.setCustomValidity(text);
    e.target.title = text;
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
      map[rules.type] = {attr: rules.attr};
      if(rules.customMessage) map[rules.type].customMessage = rules.customMessage
    }
    else
    {
      for (let i=0 ;i< rules.length; i++)
      {
        map[rules[i].type] = {attr: rules[i].attr};
        if(rules[i].customMessage) map[rules[i].type].customMessage = rules[i].customMessage
      }
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
      disabled: meta.readOnly,
      required: required,
      size: meta.inputSize,
      className: basePropsClasses
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
          pattern={validationRulesMap.pattern ? validationRulesMap.pattern.attr : undefined}
          {...rawInputProps}
        />
      ),
      textArea: () => (
        <textarea
          rows={extraAttrsMap.rows || 3}
          maxLength={meta.columnSize}
          pattern={validationRulesMap.pattern ? validationRulesMap.pattern.attr : undefined}
          {...rawInputProps}
        />
      ),
      strNumber: (range, step, type) => (
        <input
          type="text"
          onInput={(e) => this.numberValidation(e, range, step, type)}
          data-info-type={type}
          data-info-range={range ? range.min + ', ' + range.max : undefined}
          data-info-step={step}
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
          locale={this.props.localization.locale}
          inputProps={ Object.assign({},
            baseProps,
            {
              pattern: "(^$|\\d{1,2}\\.\\d{1,2}\\.\\d{4})",
              onInvalid: (v) => this.dateValidation(v),
              onInput: (v) => this.dateValidation(v),
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
          className: classNames(
            'property-input',
            validationClasses,
            {'Select--sm': this.props.bsSize === "sm"},
            {'Select--lg': this.props.bsSize === "lg"}
          ),
          required: required
        };

        let select;
        if(extraAttrsMap.inputType === "Creatable")
        {
          select = <Creatable {...selectAttr} />
        }
        else if(extraAttrsMap.inputType === "VirtualizedSelect")
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

        return <div style={style} >{select}</div>
      },
//      dateTime: {
//        normal: () => {
//          return ( React.createElement(Datetime, {id: id, key: id, value: value, parent: _this, onChange: handleChange, time: true, className: this.props.controlClassName}) );
//        },
//        readOnly: () => this.createStatic(value)
//      },
      mask: () => (
        <MaskedInput
          mask={validationRulesMap.mask.attr}
          value={value === undefined ? "" : value}
          onChange={this.handleChange}
          {...baseProps}
        />
      ),
      WYSIWYG: () => {
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
      },
      labelField: () => {
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

    if(validationRulesMap.range !== undefined || validationRulesMap.step !== undefined ||
      meta.type === 'Short' || meta.type === 'Integer' || meta.type === 'Long' || meta.type === 'Double')
    {
      let step = validationRulesMap.step ? validationRulesMap.step.attr : (meta.type !== 'Double' ? '1' : undefined);
      let range;

      switch (meta.type)
      {
        case 'Short':
          range = {min: "-32768", max: "32767"};
          break;
        case 'Integer':
          range = {min: "-2147483648", max: "2147483647"};
          break;
        case 'Long':
          range = {min: "-9223372036854775808", max: "9223372036854775807"};
          break;
      }

      return controls['strNumber'](validationRulesMap.range ? validationRulesMap.range.attr : range, step, meta.type);
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
    stepMismatch: 'Please enter a valid value. The closest allowed values are {0} and {1}.',
    numberTypeMismatch: 'Enter the number.',
    simpleIntegerTypeMismatch: '"E" is not supported for simple integer types.',
    rangeOverflow: 'The value must be less than or equal to {0}.',
    rangeUnderflow: 'The value must be greater than or equal to {0}.',
    loadingPlaceholder: 'Loading...',
    datePatternError: 'Please enter a valid date in the format dd.mm.yyyy'
  },
};

PropertyInput.propTypes = {
  bean: PropTypes.object.isRequired,
  path: PropTypes.string,
  id: PropTypes.number,
  inline: PropTypes.bool,
  bsSize: PropTypes.string,
  onChange: PropTypes.func,
  localization: PropTypes.object,
  controlClassName: PropTypes.string, 
};

export default PropertyInput;
