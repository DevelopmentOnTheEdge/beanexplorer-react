import PropTypes from 'prop-types';
import React from 'react';
import Datetime from 'react-datetime';
import moment from 'moment';


export default class DateTimePropertyInput extends React.Component
{
  constructor(props) {
    super(props);

    this.dateValidationMessage = this.dateValidationMessage.bind(this);
    this.dateToISOFormat = this.dateToISOFormat.bind(this);
    this.timestampValidationMessage = this.timestampValidationMessage.bind(this);
    this.timestampToISOFormat = this.timestampToISOFormat.bind(this);
  }

  componentDidUpdate(){
    if(this.dateInput)this.dateValidationMessage({target: this.dateInput});
    if(this.timestampInput)this.timestampValidationMessage({target: this.timestampInput});
  }

  render() {
    const {meta, attr, value}  = this.props;

    if(meta.type === 'Date'){
      if(meta.readOnly !== true) {
        return <Datetime
          dateFormat="DD.MM.YYYY"
          timeFormat={false}
          key={attr.id + "Datetime"}
          value={dateFromISOFormat(value)}
          onChange={this.dateToISOFormat}
          closeOnSelect={true}
          closeOnTab={true}
          locale={this.props.localization.locale}
          inputProps={Object.assign({},
            attr.baseProps,
            {
              ref: (instance) => {
                this.dateInput = instance;
              },
              pattern: "(^$|\\d{1,2}\\.\\d{1,2}\\.\\d{4})",
              placeholder: attr.extraAttrsMap.placeholder
            }
          )}
          className="Datetime-outer"
        />
      }else{
        return <input
          type={'text'}
          {...attr.rawInputProps}
          {...attr.rawTextValidation}
          value={dateFromISOFormat(value)}
        />;
      }
    }

    if(meta.type === 'Timestamp'){
      if(meta.readOnly !== true) {
        return <Datetime
          dateFormat="DD.MM.YYYY"
          timeFormat="HH:mm"
          key={attr.id + "Datetime"}
          value={timestampFromISOFormat(value)}
          onChange={this.timestampToISOFormat}
          closeOnSelect={true}
          closeOnTab={true}
          locale={this.props.localization.locale}
          inputProps={Object.assign({},
            attr.baseProps,
            {
              ref: (instance) => {
                this.timestampInput = instance;
              },
              pattern: "(^$|\\d{1,2}\\.\\d{1,2}\\.\\d{4}\\s\\d{2}:\\d{2})",
              placeholder: attr.extraAttrsMap.placeholder
            }
          )}
          className="Datetime-outer"
        />
      }else{
        return <input
          type={'text'}
          {...attr.rawInputProps}
          {...attr.rawTextValidation}
          value={timestampFromISOFormat(value)}
        />;
      }
    }
  }

  dateToISOFormat(date) {
    this.dateInput.focus();

    if(typeof date === "string") {
      this.props.callOnChange(date);
    } else {
      this.props.callOnChange(date.format('YYYY-MM-DD'));
    }
  }

  timestampToISOFormat(date) {
    this.timestampInput.focus();

    if(typeof date === "string") {
      this.props.callOnChange(date);
    } else {
      this.props.callOnChange(date.format('YYYY-MM-DD HH:mm:ss.SSS'));
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
}

const dateFromISOFormat = function(stringDate) {
  const date = moment(stringDate, 'YYYY-MM-DD', true);
  if (date.isValid()) {
    return date.format('DD.MM.YYYY');
  } else {
    return stringDate;
  }
};

const timestampFromISOFormat = function(stringDate) {
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
};

DateTimePropertyInput.propTypes = {
  meta: PropTypes.object.isRequired,
  attr: PropTypes.object.isRequired,
  callOnChange: PropTypes.func.isRequired,
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.array
  ]).isRequired
};
