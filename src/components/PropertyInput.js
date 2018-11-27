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
import RadioSelectGroup     from "./inputs/RadioSelectGroup";


class PropertyInput extends React.Component
{
  constructor(props) {
    super(props);

    this.state = this.getInitState(props);

    this.handleChange = this.handleChange.bind(this);
    this.handleChangeBoolean = this.handleChangeBoolean.bind(this);
    this.handleChangeSelect = this.handleChangeSelect.bind(this);
    this.base64FileHandle = this.base64FileHandle.bind(this);

    this.numberValidation = this.numberValidation.bind(this);
    this.patternValidationMessage = this.patternValidationMessage.bind(this);

    this.dateValidationMessage = this.dateValidationMessage.bind(this);
    this.dateToISOFormat = this.dateToISOFormat.bind(this);
    this.timestampValidationMessage = this.timestampValidationMessage.bind(this);
    this.timestampToISOFormat = this.timestampToISOFormat.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    this.setState(this.getInitState(nextProps));
  }

  componentDidUpdate(){
    if(this.dateInput)this.dateValidationMessage({target: this.dateInput});
    if(this.timestampInput)this.timestampValidationMessage({target: this.timestampInput});
  }

  getInitState(props) {
    const path  = this.getPath(props);
    const meta  = props.bean.meta[path];
    const id    = path.substring(path.lastIndexOf("/")+1) + "PropertyInput";
    const validationRulesMap = PropertyInput.getValidationRulesMap(meta);

    return {
      path: path,
      id: id,
      meta: meta,
      validationRulesMap: validationRulesMap
    };
  }

  getPath(props) {
    if(props === undefined)props = this.props;

    if(props.path) {
      return props.path;
    }else{
      return props.bean.order[props.id];
    }
  }

  callOnChange(value) {
    this.props.onChange(this.getPath(), value);
  }

  handleChange(event) {
    this.callOnChange(event.target.value);
  }

  handleChangeBoolean(event) {
    this.callOnChange(event.target.checked);
  }

  dateToISOFormat(date) {
    this.dateInput.focus();

    if(typeof date === "string") {
      this.callOnChange(date);
    } else {
      this.callOnChange(date.format('YYYY-MM-DD'));
    }
  }

  static dateFromISOFormat(stringDate) {
    const date = moment(stringDate, 'YYYY-MM-DD', true);
    if (date.isValid()) {
      return date.format('DD.MM.YYYY');
    } else {
      return stringDate;
    }
  }

  timestampToISOFormat(date) {
    this.timestampInput.focus();

    if(typeof date === "string") {
      this.callOnChange(date);
    } else {
      this.callOnChange(date.format('YYYY-MM-DD HH:mm:ss.SSS'));
    }
  }

  static timestampFromISOFormat(stringDate) {
    let date;
    if(stringDate.length === 23){
      date = moment(stringDate, 'YYYY-MM-DD HH:mm:ss.SSS', true);
    }else if(stringDate.length === 22){
      date = moment(stringDate, 'YYYY-MM-DD HH:mm:ss.SS', true);
    }else{
      date = moment(stringDate, 'YYYY-MM-DD HH:mm:ss.S', true);
    }
    if (date.isValid()) {
      return date.format('DD.MM.YYYY HH:mm');
    } else {
      return stringDate;
    }
  }

  dateValidationMessage(e) {
    if (e.target.validity.patternMismatch) {
      e.target.setCustomValidity(this.props.localization.datePatternError)
    } else {
      e.target.setCustomValidity('')
    }
  }

  timestampValidationMessage(e) {
    if (e.target.validity.patternMismatch) {
      e.target.setCustomValidity(this.props.localization.timestampPatternError)
    } else {
      e.target.setCustomValidity('')
    }
  }

  patternValidationMessage(e) {
    const pattern = this.state.validationRulesMap.pattern;
    if(pattern && pattern.customMessage)
    {
      if (e.target.validity.patternMismatch) {
        e.target.setCustomValidity(pattern.customMessage)
      } else {
        e.target.setCustomValidity('')
      }
    }
  }

  numberValidation(e)
  {
    const range = this.state.validationRulesMap.range;
    const step = this.state.validationRulesMap.step;
    const type = this.state.meta.type;

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
      if (value.compare(bigRat(range.attr.min)) === -1) {
        PropertyInput.setErrorState(e, this.setMessagePlaceHolders(local.rangeUnderflow, [range.attr.min]));
        return
      }
      else if (value.compare(bigRat(range.attr.max)) === 1) {
        PropertyInput.setErrorState(e, this.setMessagePlaceHolders(local.rangeOverflow, [range.attr.max]));
        return
      }
    }

    if(step) {
      const stepRat = bigRat(step.attr);

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

  static getValidationRulesMap(meta)
  {
    const rules = meta.validationRules;

    let map = {};
    if(rules !== undefined)
    {
      if (!Array.isArray(rules)) {
        map[rules.type] = {attr: rules.attr};
        if (rules.customMessage) map[rules.type].customMessage = rules.customMessage
      }
      else {
        for (let i = 0; i < rules.length; i++) {
          map[rules[i].type] = {attr: rules[i].attr};
          if (rules[i].customMessage) map[rules[i].type].customMessage = rules[i].customMessage
        }
      }
    }

    if(meta.type === 'Short' || meta.type === 'Integer' || meta.type === 'Long')
    {
      if(!map.range)
      {
        let rangeAttr;

        switch (meta.type) {
          case 'Short':
            rangeAttr = {min: "-32768", max: "32767"};
            break;
          case 'Integer':
            rangeAttr = {min: "-2147483648", max: "2147483647"};
            break;
          case 'Long':
            rangeAttr = {min: "-9223372036854775808", max: "9223372036854775807"};
            break;
        }

        map['range'] = {attr: rangeAttr};
      }

      if(!map.step)
      {
        map['step'] = {attr: '1'};
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
    const {
      id,
      path,
      meta,
      validationRulesMap
    } = this.state;

    const value    = JsonPointer.get(this.props.bean, "/values" + path);
    const required = meta.canBeNull !== true;
    const extraAttrsMap = PropertyInput.getExtraAttrsMap(meta);
    const attr = {id, path, validationRulesMap};

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

    const rawTextValidation = {
      maxLength: meta.columnSize,
      pattern: validationRulesMap.pattern ? validationRulesMap.pattern.attr : undefined,
      onInvalid: this.patternValidationMessage,
      onInput: this.patternValidationMessage
    };

//      dateTime: {
//        normal: () => {
//          return ( React.createElement(Datetime, {id: id, key: id, value: value, parent: _this, onChange: handleChange, time: true, className: this.props.controlClassName}) );
//        },
//        readOnly: () => this.createStatic(value)
//      },

    if(meta.tagList && extraAttrsMap.inputType === "radio")
    {
      return <RadioSelectGroup
        meta={meta}
        attr={attr}
        onChange={this.handleChange}
        value={value}
      />
    }

    if(meta.tagList)
    {
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
        onChange: this.handleChangeSelect,
        clearAllText: this.props.localization.clearAllText,
        clearValueText: this.props.localization.clearValueText,
        noResultsText: this.props.localization.noResultsText,
        searchPromptText: this.props.localization.searchPromptText,
        loadingPlaceholder: this.props.localization.loadingPlaceholder,
        placeholder: extraAttrsMap.placeholder || this.props.localization.placeholder,
        backspaceRemoves: false,
        disabled: meta.readOnly,
        multi: meta.multipleSelectionList,
        matchPos: extraAttrsMap.matchPos || "any",
        required: required
      };

      let select;
      if(extraAttrsMap.inputType === "Creatable")
      {
        select = <Creatable {...selectAttr} />
      }
      else if(extraAttrsMap.inputType === "VirtualizedSelect"
            || (extraAttrsMap.inputType === undefined && meta.tagList.length >= 100))
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

      return <div
        className={classNames(
          "Select-outer",
          'property-input',
          {'Select--sm': this.props.bsSize === "sm"},
          {'Select--lg': this.props.bsSize === "lg"},
          validationClasses
        )}
        style={style}
      >
        {select}
      </div>
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

    if(validationRulesMap.mask !== undefined)
    {
      return <MaskedInput
        mask={validationRulesMap.mask.attr}
        value={value}
        onChange={this.handleChange}
        {...baseProps}
      />;
    }

    if(validationRulesMap.range !== undefined || validationRulesMap.step !== undefined ||
      meta.type === 'Short' || meta.type === 'Integer' || meta.type === 'Long' || meta.type === 'Double')
    {
      const range = validationRulesMap.range, step = validationRulesMap.step, type = meta.type;

      return <input
        type="text"
        onInput={this.numberValidation}
        data-info-type={type}
        data-info-range={(range && range.attr) ? range.attr.min + ', ' + range.attr.max : undefined}
        data-info-step={step ? step.attr : undefined}
        {...rawInputProps}
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

    if(meta.type === 'Date'){
      if(meta.readOnly !== true) {
        return <Datetime
          dateFormat="DD.MM.YYYY"
          timeFormat={false}
          key={id + "Datetime"}
          value={PropertyInput.dateFromISOFormat(value)}
          onChange={this.dateToISOFormat}
          closeOnSelect={true}
          closeOnTab={true}
          locale={this.props.localization.locale}
          inputProps={Object.assign({},
            baseProps,
            {
              ref: (instance) => {
                this.dateInput = instance;
              },
              pattern: "(^$|\\d{1,2}\\.\\d{1,2}\\.\\d{4})",
              placeholder: extraAttrsMap.placeholder
            }
          )}
          className="Datetime-outer"
        />
      }else{
        return <input
          type={'text'}
          {...rawInputProps}
          {...rawTextValidation}
          value={PropertyInput.dateFromISOFormat(value)}
        />;
      }
    }

    if(meta.type === 'Timestamp'){
      if(meta.readOnly !== true) {
        return <Datetime
          dateFormat="DD.MM.YYYY"
          timeFormat="HH:mm"
          key={id + "Datetime"}
          value={PropertyInput.timestampFromISOFormat(value)}
          onChange={this.timestampToISOFormat}
          closeOnSelect={true}
          closeOnTab={true}
          locale={this.props.localization.locale}
          inputProps={Object.assign({},
            baseProps,
            {
              ref: (instance) => {
                this.timestampInput = instance;
              },
              pattern: "(^$|\\d{1,2}\\.\\d{1,2}\\.\\d{4}\\s\\d{2}:\\d{2})",
              placeholder: extraAttrsMap.placeholder
            }
          )}
          className="Datetime-outer"
        />
      }else{
        return <input
          type={'text'}
          {...rawInputProps}
          {...rawTextValidation}
          value={PropertyInput.timestampFromISOFormat(value)}
        />;
      }
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
    datePatternError: 'Please enter a valid date in the format dd.mm.yyyy',
    timestampPatternError: 'Please enter a valid date with time in the format dd.mm.yyyy hh:mm'
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
