import React, { Component } from 'react';
import Datetime from 'react-datetime';
import Select from 'react-select';
import moment from 'moment';


class Property extends Component {

  constructor(props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);
    this.handleChangeMulti = this.handleChangeMulti.bind(this);
  }

  handleChange(event) {
    this.props.onChange(this.props.path, this._getValueFromEvent(event));
  }

  handleChangeMulti(event) {
    let selectArray = [];
    Object.keys(event).forEach(function (key) {
      selectArray.push(event[key].value);
    });
    this.props.onChange(this.props.path, selectArray);
  }

  _getValueFromEvent(event) {
    if(!event)
      return '';
    if(event._d)
    {
      return this.formatDate(event._d);
    }
    if(!event.target)
      return event.value;
    const element = event.target;
    return (element.type === 'checkbox') ? element.checked : element.value;
  }

  render() {
    const meta  = this.props.meta;
    const value = this.props.value;
    const id    = this.props.name + "Field";
    const handle = meta.multipleSelectionList ? this.handleChangeMulti : this.handleChange;

    const controls = {
      checkBox: () => (
        <input type="checkbox" id={id} key={id} value={value} checked={value} onChange={handle}
                 className={this.props.controlClassName || 'form-check-input'} disabled={meta.readOnly}/>
      ),
      select: () => (
        <Select name="form-field-name" value={value} options={this.optionsToArray(meta.tagList)}
                placeholder={meta.placeholder} multi={meta.multipleSelectionList}
                disabled={meta.readOnly} onChange={handle} />
      ),
      Date: {
        normal: () => {
          return <Datetime dateFormat="DD.MM.YYYY" value={moment(value)} onChange={handle} id={id} key={id}
                           timeFormat={false} closeOnSelect={true} closeOnTab={true} locale="ru"/>
        },
        readOnly: () => this.createStatic(value)
      },
//      dateTime: {
//        normal: () => {
//          return ( React.createElement(Datetime, {id: id, key: id, value: value, parent: _this, onChange: handleChange, time: true, className: this.props.controlClassName}) );
//        },
//        readOnly: () => this.createStatic(value)
//      },
      textArea: {
        normal: () => (
          <textarea placeholder={meta.placeholder} id={id}  rows={meta.rows || 3} cols={meta.columns} value={value}
                    onChange={handle} className={this.props.controlClassName || "form-control"}/>
        ),
        readOnly: () => this.createStatic(value)
      },
      textInput: {
        normal: () => (
          <input type="text" placeholder={meta.placeholder} id={id} key={id} value={value}
                       onChange={handle} className={this.props.controlClassName || "form-control"}/>
        ),
        readOnly: () => this.createStatic(value)
      },
      passwordInput: {
        normal: () => (
          <input type="password" placeholder={meta.placeholder} id={id} key={id} value={value}
                       onChange={handle} className={this.props.controlClassName || "form-control"}/>
        ),
        readOnly: () => this.createStatic('******')
      }
    };

    const renderer = controls[meta.type] || controls['textInput'];
    let valueControl = renderer[meta.readOnly ? 'readOnly' : 'normal']();
    if(meta.hasOwnProperty('tagList')){
      valueControl = controls['select']();
    }
    if(meta.type === 'Boolean'){
      valueControl = controls['checkBox']();
    }

    const label = <label htmlFor={id} className={this.props.labelClassName}>{meta.displayName || id}</label>;
    const messageElement = meta.message ? <span className={this.props.messageClassName || "form-control-feedback"}>{meta.message}</span> : undefined;

    let hasStatus;
    if(meta.status === 'error') hasStatus = 'has-danger';
    else hasStatus = meta.status ? 'has-'+meta.status : '';

    if(meta.type === "Boolean")
    {
      return (
        <div className={(this.props.classNameFormCheck || 'form-check property') + ' ' + (meta.inputSize || 'col-xs-12') + ' ' + hasStatus}>
          <label className="form-check-label">
            {valueControl}
            {' ' + meta.displayName || id}
          </label>
        </div>
      );
    }else{
      return (
        <div className={(this.props.classNameFormFroup || 'form-group property') + ' ' + (meta.inputSize || 'col-xs-12') + ' ' + hasStatus}>
          {label}
          <div className="controls">
            {valueControl}
            {messageElement}
          </div>
        </div>
      );
    }
  }

  optionsToArray(options){
    let optionObject = [];
    for(let i =0 ;i < options.length; i++){
      optionObject.push({ value: options[i][0], label: options[i][1] });
    }
    return optionObject;
  }

  createStatic(value) {
    return <p className="form-control-static" dangerouslySetInnerHTML={{__html: value}} />;
  }

  //ISO 8601 format
  formatDate(date) {
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    return year + '-' + this.format2digit(month) + '-' + this.format2digit(day);
  }

  format2digit(number){
    return ("0" + number).slice(-2);
  }
}

export default Property;
