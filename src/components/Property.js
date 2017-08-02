import React, { Component } from 'react';
import Datetime from 'react-datetime';
import Select from 'react-select';
import VirtualizedSelect from 'react-virtualized-select'
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
      Boolean: () => (
        <input type="checkbox" id={id} key={id} value={value} checked={value} onChange={handle}
                 className={this.props.controlClassName || 'form-check-input'} disabled={meta.readOnly} />
      ),
      select: () => {
        const options = this.optionsToArray(meta.tagList);
        if(options.length > 100){
          return <VirtualizedSelect ref={id} name={id} value={value} options={options}
                          disabled={meta.readOnly} onChange={handle} placeholder={meta.placeholder}
                          multi={meta.multipleSelectionList} matchPos="start"
                          clearable
                          searchable
                          labelKey="label"
                          valueKey="value"
          />
        }else{
          return <Select ref={id} name={id} value={value} options={options}
                          disabled={meta.readOnly} onChange={handle} placeholder={meta.placeholder}
                          multi={meta.multipleSelectionList} matchPos="start"
          />
        }
      },
      Date: () => {
          return <Datetime dateFormat="DD.MM.YYYY" value={moment(value)} onChange={handle} id={id} key={id}
                           timeFormat={false} closeOnSelect={true} closeOnTab={true} locale="ru"
                           inputProps={ {disabled: meta.readOnly} } />
      },
//      dateTime: {
//        normal: () => {
//          return ( React.createElement(Datetime, {id: id, key: id, value: value, parent: _this, onChange: handleChange, time: true, className: this.props.controlClassName}) );
//        },
//        readOnly: () => this.createStatic(value)
//      },
      textArea: () => {
          return <textarea placeholder={meta.placeholder} id={id}  rows={meta.rows || 3} cols={meta.columns} value={value}
                    onChange={handle} className={this.props.controlClassName || "form-control"} disabled={meta.readOnly} />
      },
      textInput: () => {
          return <input type="text" placeholder={meta.placeholder} id={id} key={id} value={value}
                    onChange={handle} className={this.props.controlClassName || "form-control"} disabled={meta.readOnly} />

      },
      passwordField: () => {
          return <input type="password" placeholder={meta.placeholder} id={id} key={id} value={value}
                       onChange={handle} className={this.props.controlClassName || "form-control"} disabled={meta.readOnly} />
      },
      labelField: () => {
          if(meta.rawValue){
            return (<div dangerouslySetInnerHTML={{__html: value}} ></div>)
          }else{
            return (<div>{value}</div>)
          }
      },
    };

    let valueControl;
    if(meta.tagList)
    {
      valueControl = controls['select']();
    }
    else if(meta.passwordField)
    {
      valueControl = controls['passwordField']();
    }
    else if(meta.labelField)
    {
      valueControl = controls['labelField']();
    }
    else
    {
      valueControl = (controls[meta.type] || controls['textInput'])();
    }

    const label = <label htmlFor={id} className={this.props.labelClassName}>{meta.displayName || id}</label>;
    const messageElement = meta.message ? <span className={this.props.messageClassName || "form-control-feedback"}>{meta.message}</span> : undefined;

    let hasStatus;
    if(meta.status === 'error') hasStatus = 'has-danger';
    else hasStatus = meta.status ? 'has-'+meta.status : '';

    if(meta.type === "Boolean")
    {
      return (
        <div className={(this.props.classNameFormCheck || 'form-check property') + ' ' + (meta.cssClasses || 'col-xs-12') + ' ' + hasStatus}>
          <label className="form-check-label">
            {valueControl}
            {' ' + meta.displayName || id}
          </label>
        </div>
      );
    }else if(meta.labelField){
       return (
         <div className={(meta.cssClasses || 'col-xs-12') + ' ' + hasStatus}>{valueControl}</div>
       );
    }else{
      return (
        <div className={(this.props.classNameFormFroup || 'form-group property') + ' ' + (meta.cssClasses || 'col-xs-12') + ' ' + hasStatus}>
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

//  createStatic(value) {
//    return <p className="form-control-static" dangerouslySetInnerHTML={{__html: value}} />;
//  }

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
