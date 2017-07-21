import React, { Component } from 'react';
import Datetime from 'react-datetime';

import 'react-datetime/css/react-datetime.css';
import moment from 'moment';

class Property extends Component {

  constructor(props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.props.onChange(this.props.path, this._getValueFromEvent(event));
  }

  //ISO 8601 format
  formatDate(date) {
    var day = date.getDate();
    var month = date.getMonth();
    var year = date.getFullYear();
    return year + '-' + this.formatNumber2digit(month) + '-' + this.formatNumber2digit(day);
  }

  formatNumber2digit(number){
    return ("0" + number).slice(-2);
  }

  _getValueFromEvent(event) {
    if(!event)
      return '';
    if(event._d)
      return this.formatDate(event._d);
    if(!event.target)
      return event.value;
    const element = event.target;
    return (element.type === 'checkbox') ? element.checked : element.value;
  }

  render() {
    const meta  = this.props.meta;
    const value = this.props.value;
    const id    = this.props.name + "Field";
    const handleChange = this.handleChange;
    const _this = this;

    const controls = {
      checkBox: {
        normal: () => (
          <input type="checkbox" id={id} key={id} value={value} checked={value} onChange={handleChange}
                 className={this.props.controlClassName || 'form-check-input'}/>
        ),
        readOnly: () => (
          <input type="checkbox" id={id} key={id} value={value} checked={value} disabled="true"
                 className={this.props.controlClassName || 'form-check-input'}/>
        )
      },
      comboBox: {
        normal: () => {
          const options = meta.options.map(function(option) {
            return ( React.DOM.option({key: option.value, value: option.value}, option.text) );
          });
          return (
            React.DOM.select({id: id, ref: 'editableComboBox', key: id, defaultValue: value,
                              onChange: handleChange, className: this.props.controlClassName || "form-control"},
              options
            )
          );
        },
        readOnly: () => {
          const selectedOption = meta.options.filter(option => option.value === value);
          const text = selectedOption.length ? selectedOption[0].text : value;
          return this.createStatic(text);
        }
      },
      date: {
        normal: () => {
          return <Datetime dateFormat="DD.MM.YYYY" value={moment(value)} onChange={handleChange} id={id} key={id}
                           timeFormat={false} closeOnSelect={true} closeOnTab={true} locale="ru"/>;
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
                    onChange={handleChange} className={this.props.controlClassName || "form-control"}/>
        ),
        readOnly: () => this.createStatic(value)
      },
      textInput: {
        normal: () => (
          <input type="text" placeholder={meta.placeholder} id={id} key={id} value={value}
                       onChange={handleChange} className={this.props.controlClassName || "form-control"}/>
        ),
        readOnly: () => this.createStatic(value)
      },
      passwordInput: {
        normal: () => (
          <input type="password" placeholder={meta.placeholder} id={id} key={id} value={value}
                       onChange={handleChange} className={this.props.controlClassName || "form-control"}/>
        ),
        readOnly: () => this.createStatic('******')
      }
    };

    const renderer = controls[meta.type] || controls['textInput'];
    const valueControl = renderer[meta.readOnly ? 'readOnly' : 'normal']();
    const label = <label htmlFor={id} className={this.props.labelClassName}>{meta.displayName || id}</label>;
    const messageElement = meta.message ? <span className={this.props.messageClassName || "form-control-feedback"}>{meta.message}</span> : undefined;

    let hasStatus;
    if(meta.status === 'error') hasStatus = 'has-danger';
    else hasStatus = meta.status ? 'has-'+meta.status : '';

    if(meta.type === "checkBox")
    {
      return (
        <div className={(this.props.classNameFormCheck || 'form-check property') + ' ' + hasStatus}>
          <label className="form-check-label">
            {valueControl}
            {' ' + meta.displayName || id}
          </label>
        </div>
      );
    }else{
      return (
        <div className={(this.props.classNameFormFroup || 'form-group property') + ' ' + hasStatus}>
          {label}
          <div className="controls">
            {valueControl}
            {messageElement}
          </div>
        </div>
      );
    }
  }

  createStatic(value) {
    return <p className="form-control-static" dangerouslySetInnerHTML={{__html: value}} />;
  }

}

export default Property;
