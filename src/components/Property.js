import React         from 'react';
import PropTypes     from 'prop-types';
import classNames    from 'classnames';
import PropertyInput from './PropertyInput'
import {inputLabelSizeClasses} from "./utils";


class Property extends React.Component
{
  getPath(){
    if(this.props.path){
      return this.props.path;
    }else{
      return this.props.bean.order[this.props.id];
    }
  }

  render() {
    const path = this.getPath();
    const meta = this.props.bean.meta[path];
    const id = path.substring(path.lastIndexOf("/") + 1) + "PropertyInput";

    let label;
    if (meta.displayName){
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
    if(meta.message)
    {
      let validationClasses = classNames(
        {'invalid-feedback' : meta.status === 'error'},
        {'valid-feedback' : meta.status === 'success'},
      );

      if(validationClasses)
      {
        messageElement = <div className={validationClasses}>{meta.message}</div>
      }
      else
      {
        messageElement = <small className="form-text text-muted">{meta.message}</small>
      }
    }

    const formGroupClasses = classNames(
      'property',
      {'form-group': meta.type !== 'Boolean'},
      {'form-check': meta.type === 'Boolean'},
      {'required' : meta.canBeNull !== true}
    );

    if(this.props.inline)
    {
      const outerClasses = classNames(
        formGroupClasses,
        meta.cssClasses || this.props.className || 'mb-2 mr-sm-2',
        {'display-none' : meta.hidden}
      );

      if(meta.type === "Boolean")
      {
        return (
          <div className={outerClasses} >
            <PropertyInput {...this.props} />
            {label}
          </div>
        );
      }
      else
      {
        return (
          <div className={outerClasses} >
            {label}
            <PropertyInput {...this.props}/>
          </div>
        );
      }
    }
    else if(this.props.horizontal)
    {
      const outerClasses = classNames(
        'horizontal-input',
        {'horizontal-input--sm': this.props.bsSize === "sm"},
        {'horizontal-input--lg': this.props.bsSize === "lg"},
        meta.cssClasses || this.props.className,
        {'display-none' : meta.hidden}
      );

      if(meta.type === "Boolean")
      {
        return (
          <div className={classNames(outerClasses, 'col-lg-12')}>
            <div className={'row'}>
              <div className={'col-lg-' + this.props.horizontalColSize}>&nbsp;</div>
              <div className={'col-lg-' + (12-this.props.horizontalColSize)}>
                <div className={classNames(formGroupClasses)}>
                  <PropertyInput {...this.props} />
                  {label}
                  {messageElement}
                </div>
              </div>
            </div>
          </div>
        );
      }
      else
      {
        return (
          <div className={classNames(outerClasses, 'col-lg-12')}>
            <div className={classNames(formGroupClasses, 'row')}>
              <div className={'col-lg-' + this.props.horizontalColSize}>{label}</div>
              <div className={'col-lg-' + (12-this.props.horizontalColSize)}>
                <PropertyInput {...this.props} />
                {messageElement}
              </div>
            </div>
          </div>
        );
      }
    }
    else
    {
      const outerClasses = classNames(
        'vertical-input',
        {'vertical-input--sm': this.props.bsSize === "sm"},
        {'vertical-input--lg': this.props.bsSize === "lg"},
        meta.cssClasses || this.props.className || 'col-lg-12',
        {'display-none' : meta.hidden}
      );

      if(meta.type === "Boolean")
      {
        return (
          <div className={outerClasses}>
            <div className={formGroupClasses}>
              <PropertyInput {...this.props} />
              {label}
              {messageElement}
            </div>
          </div>
        );
      }
      else if(meta.labelField)
      {
        return (
          <div className={outerClasses}>
            <div className={classNames('property-label', formGroupClasses)}>
              <PropertyInput {...this.props} />
              {messageElement}
            </div>
          </div>
        );
      }
      else
      {
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
  path: PropTypes.string,
  id: PropTypes.number,
  inline: PropTypes.bool,
  horizontal: PropTypes.bool,
  horizontalColSize: PropTypes.number,
  bsSize: PropTypes.string,
  onChange: PropTypes.func,
  localization: PropTypes.object,
  className: PropTypes.string
};

Property.defaultProps = {
  horizontalColSize: 3
};

export default Property;
