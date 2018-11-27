import PropTypes from 'prop-types';
import React from 'react';
import classNames           from 'classnames';
import {inputLabelSizeClasses} from "../utils";


export default class RadioSelectGroup extends React.Component
{
  render() {
    const {meta, attr, value, onChange}  = this.props;
    let radioButtons = [];

    for(let i = 0; i < meta.tagList.length; i++)
    {
      const tagName = meta.tagList[i][0];
      const tagLabel = meta.tagList[i][1];

      radioButtons.push(
        <div className="form-check" key={attr.id + "FormCheckWrapper" + i}>
          <input
            id={attr.id + "Radio" + i}
            className="form-check-input"
            type={meta.multipleSelectionList ? "checkbox" : "radio"}
            name={attr.id}
            value={tagName}
            checked={tagName === "" + value}
            onChange={onChange}
            required={!meta.canBeNull}
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
}

RadioSelectGroup.propTypes = {
  meta: PropTypes.object.isRequired,
  attr: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired
};
