import PropTypes from 'prop-types';
import React from 'react';
import classNames           from 'classnames';
import {inputLabelSizeClasses} from "../utils";


export default class RadioSelectGroup extends React.Component
{
  constructor(props) {
    super(props);
    this._onInputChange = this._onInputChange.bind(this);
  }

  render() {
    const {meta, attr, value}  = this.props;
    let radioButtons = [];

    for(let i = 0; i < meta.tagList.length; i++)
    {
      const tagName = meta.tagList[i][0];
      const tagLabel = meta.tagList[i][1];
      const onChange = this._onInputChange.bind(null, tagName);

      radioButtons.push(
        <div className="form-check" key={attr.id + "FormCheckWrapper" + i}>
          <input
            id={attr.id + "Radio" + i}
            className="form-check-input"
            type={meta.multipleSelectionList ? "checkbox" : "radio"}
            name={attr.id}
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
            htmlFor={attr.id + "Radio" + i}
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
        attr.validationClasses
      )}
    >
      {radioButtons}
    </div>
  }

  _onInputChange(value, event) {
    if (this.props.meta.multipleSelectionList) {
      let newValue;
      if (event.target.checked) {
        newValue = this.props.value.concat(value);
      } else {
        newValue = this.props.value.filter(v => v !== value);
      }
      this.props.callOnChange(newValue);
    } else {
      this.props.callOnChange(value);
    }
  }

}

RadioSelectGroup.defaultProps = {
  localization: {checkBoxRequired: "Select at least one item"}
};

RadioSelectGroup.propTypes = {
  meta: PropTypes.object.isRequired,
  attr: PropTypes.object.isRequired,
  callOnChange: PropTypes.func.isRequired,
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.array
  ]).isRequired
};
