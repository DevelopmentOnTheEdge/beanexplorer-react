import React from 'react';
import classNames from 'classnames';
import {inputLabelSizeClasses} from "../utils";
import BasePropertyInput from "./BasePropertyInput";


export default class RadioSelectPropertyInput extends BasePropertyInput {
  constructor(props) {
    super(props);
    this._onInputChange = this._onInputChange.bind(this);
  }

  render() {
    const id = this.getID();
    const meta = this.getMeta();
    const value = this.getCorrectMulValue();
    let radioButtons = [];

    for (let i = 0; i < meta.tagList.length; i++) {
      const tagName = meta.tagList[i][0];
      const tagLabel = meta.tagList[i][1];
      const onChange = this._onInputChange.bind(this, tagName);

      radioButtons.push(
        <div className="form-check" key={id + "FormCheckWrapper" + i}>
          <input
            id={id + "_option" + i}
            className="form-check-input"
            type={meta.multipleSelectionList ? "checkbox" : "radio"}
            name={id}
            value={tagName}
            checked={meta.multipleSelectionList ? value.includes(tagName) : tagName === "" + value}
            onChange={onChange}
            required={!meta.multipleSelectionList && !meta.canBeNull}
            disabled={meta.readOnly}
          />
          <label
            className={classNames(
              inputLabelSizeClasses(this.props, meta.type),
              "form-check-label radio-label"
            )}
            htmlFor={id + "_option" + i}
          >
            {!meta.rawValue ? tagLabel : <div dangerouslySetInnerHTML={{__html: tagLabel}}/>}
          </label>
        </div>
      )
    }

    return <div
      id={id}
      className={classNames(
        "radio-buttons-outer",
        'property-input',
        {'Select--sm': this.props.bsSize === "sm"},
        {'Select--lg': this.props.bsSize === "lg"},
        this.getValidationClasses()
      )}
    >
      {radioButtons}
    </div>
  }

  _onInputChange(tagName, event) {
    const value = this.getCorrectMulValue();
    if (this.getMeta().multipleSelectionList) {
      let newValue;
      if (event.target.checked) {
        newValue = value.concat(tagName);
      } else {
        newValue = value.filter(v => v !== tagName);
      }
      this.changeAndReload(newValue);
    } else {
      this.changeAndReload(tagName);
    }
  }

}
