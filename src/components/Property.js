import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import PropertyInput from './PropertyInput'
import {inputLabelSizeClasses, isDPS, shouldPropertyUpdate} from "./utils";
import BasePropertyInput from "./inputs/BasePropertyInput";


class Property extends React.Component {

  shouldComponentUpdate(nextProps) {
    return shouldPropertyUpdate(this.props, nextProps) || this.props.value !== nextProps.value;
  }

  getPath() {

    if (this.props.path) {
      return this.props.path;
    } else {
      return this.props.bean.order[this.props.id];
    }
  }

  render() {
    const path = this.getPath();
    const meta = this.props.bean.meta[path];
    const id = path.substring(path.lastIndexOf("/") + 1) + "PropertyInput";
    const extraAttrsMap = BasePropertyInput.getExtraAttrsMap(meta);

    let label;
    if (meta.displayName) {
      label = <label
        htmlFor={id}
        className={classNames(
          meta.type === 'Boolean' ? 'form-check-label' : 'form-control-label',
          {'mr-sm-2': this.props.inline && meta.type !== 'Boolean'},
          {'col-form-label': this.props.horizontal && meta.type !== 'Boolean'},
          inputLabelSizeClasses(this.props, meta.type)
        )}
      >
        {meta.displayName}
      </label>;
    }

    let messageElement;
    if (meta.message) {
      let validationClasses = classNames(
        {'invalid-feedback': meta.status === 'error'},
        {'valid-feedback': meta.status === 'success'},
      );

      if (validationClasses) {
        messageElement = <div className={validationClasses} dangerouslySetInnerHTML={{__html: meta.message}}/>
      }
      else {
        messageElement = <small className="form-text text-muted" dangerouslySetInnerHTML={{__html: meta.message}}/>
      }
    }

    const formGroupClasses = classNames(
      'property',
      {'form-group': meta.type !== 'Boolean'},
      {'form-check': meta.type === 'Boolean'},
      {'required': meta.canBeNull !== true}
    );

    if (isDPS(meta)) {
      meta.hidden = true;
    }

    const inputTypeButton = ['Button','button'].includes(extraAttrsMap.inputType);
    if (this.props.inline) {
      const outerClasses = classNames(
        formGroupClasses,
        meta.cssClasses || this.props.className || 'mb-2 mr-sm-2',
        {'display-none': meta.hidden}
      );

      if (meta.type === "Boolean") {
        return (
          <div className={outerClasses}>
            <PropertyInput {...this.props} />
            {label}
          </div>
        );
      }
      else {
        return (
          <div className={outerClasses}>
            {label}
            <PropertyInput {...this.props}/>
          </div>
        );
      }
    }
    else if (this.props.horizontal) {
      const outerClasses = classNames(
        'horizontal-input',
        {'horizontal-input--sm': this.props.bsSize === "sm"},
        {'horizontal-input--lg': this.props.bsSize === "lg"},
          meta.cssClasses || this.props.className,
          //todo check col-any-?
          meta.cssClasses && meta.cssClasses.includes('col-lg-')?'':'col-lg-12',
        {'display-none': meta.hidden}
      );
      if (meta.type === "Boolean" || inputTypeButton && !(meta.cssClasses && meta.cssClasses.includes('col-lg-'))) {
        const colTag = 'col-lg-' + (12 - this.props.horizontalColSize);
        const offsetTag = 'offset-lg-' + this.props.horizontalColSize;
        return (
          <div className={classNames(outerClasses)}>
            <div className={this.props.rowClass}>
              <div className={classNames(colTag, offsetTag)}>
                <div className={classNames(formGroupClasses)}>
                  <PropertyInput {...this.props} />
                  {!inputTypeButton ? label : ""}
                  {messageElement}
                </div>
              </div>
            </div>
          </div>
        );
      }
      else if (inputTypeButton && meta.cssClasses && meta.cssClasses.includes('col-lg-')) {
        return (
            <div className={classNames(outerClasses, 'offset-lg-' + this.props.horizontalColSize, "text-nowrap")}>
              <div className={classNames(formGroupClasses)}>
                <PropertyInput {...this.props} />
                {!inputTypeButton ? label : ""}
                {messageElement}
              </div>
            </div>
        );
      }
      else {
        return (
          <div className={classNames(outerClasses)}>
            <div className={classNames(formGroupClasses, this.props.rowClass)}>
              <div
                className={classNames('col-lg-' + this.props.horizontalColSize, 'col-form-control-label')}>{label}</div>
              <div className={'col-lg-' + (12 - this.props.horizontalColSize)}>
                <PropertyInput {...this.props} />
                {messageElement}
              </div>
            </div>
          </div>
        );
      }
    }
    else {
      const outerClasses = classNames(
        'vertical-input',
        {'vertical-input--sm': this.props.bsSize === "sm"},
        {'vertical-input--lg': this.props.bsSize === "lg"},
        meta.cssClasses || this.props.className,
        meta.cssClasses && meta.cssClasses.includes('col-lg-')?'':'col-lg-12',
        {'display-none': meta.hidden}
      );

      if (meta.type === "Boolean" || inputTypeButton) {
        return (
          <div className={outerClasses}>
            <div className={formGroupClasses}>
              <PropertyInput {...this.props} />
              {!inputTypeButton ? label : ""}
              {messageElement}
            </div>
          </div>
        );
      }
      else if (meta.labelField) {
        return (
          <div className={outerClasses}>
            <div className={classNames('property-label', formGroupClasses)}>
              <PropertyInput {...this.props} />
              {messageElement}
            </div>
          </div>
        );
      }
      else {
        return (
          <div className={outerClasses}>
            <div className={formGroupClasses}>
              {label}
              <div className="controls">
                <PropertyInput {...this.props} />
                {messageElement}
              </div>
            </div>
          </div>
        );
      }
    }

  }

}

Property.propTypes = {
  bean: PropTypes.object.isRequired,
  value: PropTypes.any.isRequired,
  path: PropTypes.string,
  id: PropTypes.number,
  inline: PropTypes.bool,
  horizontal: PropTypes.bool,
  horizontalColSize: PropTypes.number,
  rowClass: PropTypes.string,
  bsSize: PropTypes.string,
  onChange: PropTypes.func,
  reloadOnChange: PropTypes.func,
  localization: PropTypes.object,
  className: PropTypes.string
};

Property.defaultProps = {
  horizontalColSize: 3,
  rowClass: "form-row",
};

export default Property;
