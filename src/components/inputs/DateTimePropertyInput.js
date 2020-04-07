import React from 'react';
import Datetime from 'react-datetime';
import moment from 'moment';
import BasePropertyInput from "./BasePropertyInput";


export default class DateTimePropertyInput extends BasePropertyInput {
  constructor(props) {
    super(props);

    this.dateValidationMessage = this.dateValidationMessage.bind(this);
    this.dateToISOFormat = this.dateToISOFormat.bind(this);
    this.timeValidationMessage = this.timeValidationMessage.bind(this);
    this.timeToISOFormat = this.timeToISOFormat.bind(this);
    this.timestampValidationMessage = this.timestampValidationMessage.bind(this);
    this.timestampToISOFormat = this.timestampToISOFormat.bind(this);
  }

  render() {
    const meta = this.getMeta();
    const value = this.getValue();
    const extraAttrsMap = BasePropertyInput.getExtraAttrsMap(meta);

    if (meta.type === 'Date') {
      if (meta.readOnly !== true) {
        return <Datetime
          dateFormat="DD.MM.YYYY"
          timeFormat={false}
          key={this.getID() + "Datetime"}
          value={dateFromISOFormat(value)}
          onChange={this.dateToISOFormat}
          onBlur={this.reload}//TODO reload only for valid date
          closeOnSelect={true}
          closeOnTab={true}
          locale={this.props.localization.locale}
          inputProps={Object.assign({},
            this.getBaseProps(),
            {
              ref: (instance) => {
                this.dateInput = instance;
              },
              pattern: "(^$|\\d{1,2}\\.\\d{1,2}\\.\\d{4})",
              placeholder: extraAttrsMap.placeholder,
              onInput: this.dateValidationMessage,
              onInvalid: this.dateValidationMessage,
              autoComplete: "off"
            }
          )}
          className="Datetime-outer"
        />
      } else {
        const rawInputProps = this.getRawInputProps(value, extraAttrsMap);
        const rawTextValidation = this.getRawTextValidation(meta);
        return <input
          type={'text'}
          {...rawInputProps}
          {...rawTextValidation}
          value={dateFromISOFormat(value)}
        />;
      }
    }

    if (meta.type === 'Time') {
      if (meta.readOnly !== true) {
        return <Datetime
          dateFormat="DD.MM.YYYY"
          timeFormat="HH:mm"
          key={this.getID() + "Datetime"}
          value={timeFromISOFormat(value)}
          onChange={this.timeToISOFormat}
          onBlur={this.reload}
          closeOnSelect={true}
          closeOnTab={true}
          locale={this.props.localization.locale}
          inputProps={Object.assign({},
            this.getBaseProps(),
            {
              ref: (instance) => {
                this.timeInput = instance;
              },
              pattern: "(^$|\\d{1,2}\\.\\d{1,2}\\.\\d{4}\\s\\d{2}:\\d{2})",
              placeholder: extraAttrsMap.placeholder,
              onInput: this.timeValidationMessage,
              onInvalid: this.timeValidationMessage,
              autoComplete: "off"
            }
          )}
          className="Datetime-outer"
        />
      } else {
        const rawInputProps = this.getRawInputProps(value, extraAttrsMap);
        const rawTextValidation = this.getRawTextValidation(meta);
        return <input
          type={'text'}
          {...rawInputProps}
          {...rawTextValidation}
          value={timeFromISOFormat(value)}
        />;
      }
    }

    if (meta.type === 'Timestamp') {
      if (meta.readOnly !== true) {
        return <Datetime
          dateFormat="DD.MM.YYYY"
          timeFormat="HH:mm"
          key={this.getID() + "Datetime"}
          value={timestampFromISOFormat(value)}
          onChange={this.timestampToISOFormat}
          onBlur={this.reload}
          closeOnSelect={true}
          closeOnTab={true}
          locale={this.props.localization.locale}
          inputProps={Object.assign({},
            this.getBaseProps(),
            {
              ref: (instance) => {
                this.timestampInput = instance;
              },
              pattern: "(^$|\\d{1,2}\\.\\d{1,2}\\.\\d{4}\\s\\d{2}:\\d{2})",
              placeholder: extraAttrsMap.placeholder,
              onInput: this.timestampValidationMessage,
              onInvalid: this.timestampValidationMessage,
              autoComplete: "off"
            }
          )}
          className="Datetime-outer"
        />
      } else {
        const rawInputProps = this.getRawInputProps(value, extraAttrsMap);
        const rawTextValidation = this.getRawTextValidation(meta);
        return <input
          type={'text'}
          {...rawInputProps}
          {...rawTextValidation}
          value={timestampFromISOFormat(value)}
        />;
      }
    }
  }

  dateToISOFormat(date) {
    this.dateInput.focus();

    if (typeof date === "string") {
      this.callOnChange(date);
    } else {
      this.callOnChange(date.format('YYYY-MM-DD'));
    }
  }

  timeToISOFormat(date) {
    this.timeInput.focus();

    if (typeof date === "string") {
      this.callOnChange(date);
    } else {
      this.callOnChange(date.format('YYYY-MM-DD HH:mm:ss'));
    }
  }

  timestampToISOFormat(date) {
    this.timestampInput.focus();

    if (typeof date === "string") {
      this.callOnChange(date);
    } else {
      this.callOnChange(date.format('YYYY-MM-DD HH:mm:ss.SSS'));
    }
  }

  dateValidationMessage(e) {
    if (e.target.validity.patternMismatch) {
      e.target.setCustomValidity(this.props.localization.datePatternError)
    } else {
      e.target.setCustomValidity('')
    }
  }

  timeValidationMessage(e) {
    if (e.target.validity.patternMismatch) {
      e.target.setCustomValidity(this.props.localization.timePatternError)
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

const dateFromISOFormat = function (stringDate) {
  const date = moment(stringDate, 'YYYY-MM-DD', true);
  if (date.isValid()) {
    return date.format('DD.MM.YYYY');
  } else {
    return stringDate;
  }
};

const timeFromISOFormat = function (stringDate) {
  const date = moment(stringDate, 'YYYY-MM-DD HH:mm:ss', true);
  if (date.isValid()) {
    return date.format('DD.MM.YYYY HH:mm');
  } else {
    return stringDate;
  }
};

const timestampFromISOFormat = function (stringDate) {
  let date;
  if (stringDate.length === 23) {
    date = moment(stringDate, 'YYYY-MM-DD HH:mm:ss.SSS', true);
  } else if (stringDate.length === 22) {
    date = moment(stringDate, 'YYYY-MM-DD HH:mm:ss.SS', true);
  } else {
    date = moment(stringDate, 'YYYY-MM-DD HH:mm:ss.S', true);
  }
  if (date.isValid()) {
    return date.format('DD.MM.YYYY HH:mm');
  } else {
    return stringDate;
  }
};
