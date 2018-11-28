import React from 'react';
import classNames from 'classnames';
import {inputLabelSizeClasses} from "../utils";
import BasePropertyInput from "./BasePropertyInput";


export default class RadioSelectGroup extends BasePropertyInput {
  constructor(props) {
    super(props);
    this._onInputChange = this._onInputChange.bind(this);
  }

  render() {
    const meta = this.getMeta();
    const value = this.getCorrectMulValue();
    let radioButtons = [];

    for (let i = 0; i < meta.tagList.length; i++) {
      const tagName = meta.tagList[i][0];
      const tagLabel = meta.tagList[i][1];
      const onChange = this._onInputChange.bind(null, tagName);

      radioButtons.push(
        <div className="form-check" key={this.getID() + "FormCheckWrapper" + i}>
          <input
            id={this.getID() + "Radio" + i}
            className="form-check-input"
            type={meta.multipleSelectionList ? "checkbox" : "radio"}
            name={this.getID()}
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
            htmlFor={this.getID() + "Radio" + i}
          >
            {!meta.rawValue ? tagLabel : <div dangerouslySetInnerHTML={{__html: tagLabel}}/>}
          </label>
        </div>
      )
    }

    return <div
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
      this.callOnChange(newValue);
    } else {
      this.callOnChange(tagName);
    }
  }

}
