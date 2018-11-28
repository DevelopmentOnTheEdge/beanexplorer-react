import React from 'react';
import BasePropertyInput from "./BasePropertyInput";
import classNames from 'classnames';

export default class LabelPropertyInput extends BasePropertyInput {
  constructor(props) {
    super(props);
  }

  render() {
    const id = this.getID();
    const meta = this.getMeta();
    const value = this.getValue();

    let labelPropertyClasses = classNames(
      'property-input',
      this.props.controlClassName,
      {'text-danger': meta.status === 'error'},
      {'text-success': meta.status === 'success'},
      {'text-warning': meta.status === 'warning'},
      {'col-form-label-sm': this.props.bsSize === "sm"},
      {'col-form-label-lg': this.props.bsSize === "lg"}
    );
    if (meta.rawValue) {
      return <label
        id={id}
        key={id}
        className={labelPropertyClasses}
        dangerouslySetInnerHTML={{__html: value}}
      />
    }
    else {
      return <label
        className={labelPropertyClasses}
        id={id}
        key={id}
      >
        {value}
      </label>
    }
  }
}
