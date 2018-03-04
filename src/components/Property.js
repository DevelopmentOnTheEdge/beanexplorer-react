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
    const id    = path.substring(path.lastIndexOf("/")+1) + "Field";

    let valueControl = this.getControl();

    const label = <label htmlFor={id} className={meta.type === "Boolean" ? 'form-check-label' : 'form-control-label'}>
      {meta.displayName || id}</label>;

    const messageElement = meta.message ? <span className={this.props.messageClassName || "form-control-feedback"}>{meta.message}</span> : undefined;

    let hasStatusClasses = classNames(
      {'has-danger' : meta.status === 'error'},
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
      {'required' : !meta.canBeNull}
    );

    if(meta.type === "Boolean")
    {
      return (
        <div className={outerClasses}>
          <div className={classes}>
            {valueControl}
            {label}
            {messageElement}
          </div>
        </div>
      );
    }else if(meta.labelField){
      return (
        <div className={classNames('form-group property property-label', meta.cssClasses || 'col-lg-12', hasStatusClasses)}>{valueControl}</div>
      );
    }else{
      return (
        <div className={outerClasses}>
          <div className={classes}>
            {label}
            <div className="controls">
              {valueControl}
              {messageElement}
            </div>
          </div>
        </div>
      );
    }
  }

  getControl(){
    return <PropertyInput {...this.props}/>
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
  onChange: PropTypes.func,
  localization: PropTypes.object
};

export default Property;
