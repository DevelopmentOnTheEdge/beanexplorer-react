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
    const meta  = this.props.bean.meta[path];
    const id    = path.substring(path.lastIndexOf("/")+1) + "PropertyInput";

    const label = <label htmlFor={id} className={meta.type === "Boolean" ? 'form-check-label' : 'form-control-label'}>
                         {meta.displayName || id}</label>;

    const messageElement = meta.message ? <small className={this.props.messageClassName || "form-control-feedback"}>{meta.message}</small> : undefined;

    let hasStatusClasses = classNames(
      {'has-error' : meta.status === 'error'},
      {'has-warning' : meta.status === 'warning'},
      {'has-success' : meta.status === 'success'},
    );

    const classNameForm = (meta.type === "Boolean")
      ? this.props.classNameFormCheck || 'form-check property'
      : this.props.classNameFormGroup || 'form-group property';

    const cssClasses = meta.cssClasses || 'col-lg-12';

    const outerClasses = classNames(
      cssClasses,
      {'display-none' : meta.hidden}
    );

    const classes = classNames(
      classNameForm,
      hasStatusClasses,
      {'required' : meta.canBeNull !== true}
    );

    if(this.props.inline)
    {
      if(meta.type === "Boolean")
      {
        return (
          <div className="form-check mb-2 mr-sm-2">
            <PropertyInput {...this.props} />
            {label}
          </div>
        );
      }
      else
      {
        return (
          <PropertyInput {...this.props} controlClassName="mb-2 mr-sm-2"/>
        );
      }
    }
    else
    {
      if(meta.type === "Boolean")
      {
        return (
          <div className={outerClasses}>
            <div className={classes}>
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
          <div className={classNames('form-group property property-label', meta.cssClasses || 'col-lg-12', hasStatusClasses)}>
            <PropertyInput {...this.props} />
          </div>
        );
      }
      else
      {
        return (
          <div className={outerClasses}>
            <div className={classes}>
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

Property.defaultProps = {
  localization: {
    locale: 'en',
    clearAllText: 'Clear all',
    clearValueText: 'Clear value',
    noResultsText: 'No results found',
    searchPromptText: 'Type to search',
    placeholder: 'Select ...',
    loadingPlaceholder: 'Loading...'
  },
};

Property.propTypes = {
  bean: PropTypes.object.isRequired,
  path: PropTypes.string,
  id: PropTypes.number,
  inline: PropTypes.bool,
  onChange: PropTypes.func,
  localization: PropTypes.object
};

export default Property;
