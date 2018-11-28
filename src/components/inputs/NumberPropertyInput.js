import PropTypes from 'prop-types';
import React from 'react';
import bigInt from "big-integer";
import bigRat from "big-rational";
import BasePropertyInput from "./BasePropertyInput";


export default class NumberPropertyInput extends BasePropertyInput
{
  constructor(props) {
    super(props);
    this.numberValidation = this.numberValidation.bind(this);
  }

  render() {
    const {attr, value, handleChange}  = this.props;
    const meta = this.getMeta();
    const range = this.getNumberValidationRule('range');
    const step = this.getNumberValidationRule('step');
    const type = meta.type;

    return <input
      type="text"
      onInput={this.numberValidation}
      data-info-type={type}
      data-info-range={(range && range.attr) ? range.attr.min + ', ' + range.attr.max : undefined}
      data-info-step={step ? step.attr : undefined}
      value={getNumberValue(value, meta)}
      onChange={handleChange}
      placeholder={attr.extraAttrsMap.placeholder}
      {...attr.baseProps}
    />
  }

  numberValidation(e)
  {
    const meta = this.getMeta();
    const range = this.getNumberValidationRule('range');
    const step = this.getNumberValidationRule('step');
    const type = meta.type;

    const local = this.props.localization;

    let value;
    try {
      value = bigRat(e.target.value);
    } catch (err) {
      setErrorState(e, local.numberTypeMismatch);
      return
    }

    if ((type === 'Short' || type === 'Integer' || type === 'Long') &&
      (e.target.value.indexOf('e') !== -1 || e.target.value.indexOf('E') !== -1))
    {
      setErrorState(e, local.simpleIntegerTypeMismatch);
      return
    }

    if (range) {
      if (value.compare(bigRat(range.attr.min)) === -1) {
        setErrorState(e, setMessagePlaceHolders(local.rangeUnderflow, [range.attr.min]));
        return
      }
      else if (value.compare(bigRat(range.attr.max)) === 1) {
        setErrorState(e, setMessagePlaceHolders(local.rangeOverflow, [range.attr.max]));
        return
      }
    }

    if (step) {
      const stepRat = bigRat(step.attr);

      if (!value.divide(stepRat).denominator.equals(bigInt.one))
      {
        const min = value.divide(stepRat).floor().multiply(stepRat);
        const max = min.add(stepRat);

        setErrorState(e, setMessagePlaceHolders(
          local.stepMismatch, [min.toDecimal(), max.toDecimal()]
        ));
        return
      }
    }

    setErrorState(e, '');
  }

  getNumberValidationRule(name) {
    const meta = this.getMeta();
    let rule = this.getValidationRule(name);

    if (meta.type === 'Short' || meta.type === 'Integer' || meta.type === 'Long')
    {
      if (name === 'range' && rule === undefined)
      {
        switch (meta.type) {
          case 'Short':
            return {type: 'range', attr: {min: "-32768", max: "32767"}};
          case 'Integer':
            return {type: 'range', attr: {min: "-2147483648", max: "2147483647"}};
          case 'Long':
            return {type: 'range', attr: {min: "-9223372036854775808", max: "9223372036854775807"}};
        }
      }
      if (name === 'step' && rule === undefined)
      {
        return {type: 'step', attr: '1'};
      }
    }
    return rule;
  };
}

const getNumberValue = function (value, meta) {
  let numberValue = value;
  if (meta.type === 'Double') {
    try {
      if (value.endsWith('.'))
        numberValue = value;
      else
        numberValue = bigRat(value).toDecimal();
      console.log(bigRat(value));
    } catch (err) {
      numberValue = value
    }
  }
  return numberValue;
};

const setErrorState = function (e, text)
{
  e.target.setCustomValidity(text);
  e.target.title = text;
};

const setMessagePlaceHolders = function (source, params)
{
  if (params) {
    params.forEach(function(item, i) {
      source = source.replace(new RegExp("\\{" + i + "\\}", "g"), item);
    });
  }
  return source
};

NumberPropertyInput.propTypes = {
  meta: PropTypes.object.isRequired,
  attr: PropTypes.object.isRequired,
  handleChange: PropTypes.func.isRequired,
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.array
  ]).isRequired
};
