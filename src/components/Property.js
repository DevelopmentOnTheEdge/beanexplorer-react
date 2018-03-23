import React         from 'react';
import PropTypes     from 'prop-types';
import classNames    from 'classnames';
import PropertyInput from './PropertyInput'


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
            {'mr-sm-2' : this.props.inline && meta.type !== 'Boolean'},
            {'col-form-label-sm' : this.props.bsSize === "sm"},
            {'col-form-label-lg' : this.props.bsSize === "lg"}
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

    const cssClasses = meta.cssClasses || 'col-lg-12';

    const outerClasses = classNames(
      'vertical-input',
      {'vertical-input--sm': this.props.bsSize === "sm"},
      {'vertical-input--lg': this.props.bsSize === "lg"},
      cssClasses,
      {'display-none' : meta.hidden}
    );

    const formGroupClasses = classNames(
      'property',
      {'form-group': meta.type !== 'Boolean'},
      {'form-check': meta.type === 'Boolean'},
      {'required' : meta.canBeNull !== true}
    );

    if(this.props.inline)
    {
      if(meta.type === "Boolean")
      {
        return (
          <div className={classNames(meta.cssClasses, formGroupClasses, "mb-2 mr-sm-2", {'display-none' : meta.hidden})} >
            <PropertyInput {...this.props} />
            {label}
          </div>
        );
      }
      else
      {
        return (
          <div className={classNames(meta.cssClasses, formGroupClasses, "mb-2 mr-sm-2", {'display-none' : meta.hidden})} >
            {label}
            <PropertyInput {...this.props}/>
          </div>
        );
      }
    }
    else
    {
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
          <div className={classNames('form-group property property-label', meta.cssClasses || 'col-lg-12')}>
            <PropertyInput {...this.props} />
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
  bsSize: PropTypes.string,
  onChange: PropTypes.func,
  localization: PropTypes.object
};

export default Property;
