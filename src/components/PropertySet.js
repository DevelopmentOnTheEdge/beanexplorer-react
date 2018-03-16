import React       from 'react';
import PropTypes   from 'prop-types';
import Property    from './Property';
import classNames  from 'classnames';


class PropertySet extends React.Component
{
  static getName(name){
    if(name){
      return <h4 className='property-group__title'>{name}</h4>
    }else{
      return null
    }
  }

  createGroup(curGroup, curGroupId, curGroupName, curGroupClasses) {
    return (
      <div
        className={classNames(
          'property-group',
          curGroupClasses || 'property-group__top-line col-12'
        )}
        key={curGroupId}
        ref={curGroupId}
      >
        <div className="property-group__top-line-row row"/>
        {PropertySet.getName(curGroupName)}
        <div className={classNames('property-group__row', this.props.rowClass)}>
          {curGroup}
        </div>
      </div>
    );
  }

  render() {
    let curGroup = [];
    let curGroupName = null, curGroupId = null, curGroupClasses = null;
    let fields = [];

    const finishGroup = () => {
      if(curGroup.length > 0) {
        if(curGroupId) {
          fields.push(this.createGroup(curGroup, curGroupId, curGroupName, curGroupClasses));
        } else {
          Array.prototype.push.apply(fields, curGroup);
        }
      }
      curGroup = [];
    };

    for(const path of this.props.bean.order) {
      const meta = this.props.bean.meta[path];

      const newGroupId = meta.groupId;
      const newGroupName = meta.groupName;
      const newGroupClasses = meta.groupClasses;

      if(newGroupId !== curGroupId) {
        finishGroup();
        curGroupName = newGroupName;
        curGroupClasses = newGroupClasses;
        curGroupId = newGroupId;
      }

      const field = (
        <Property
          {...this.props}
          key={path}
          path={path}
          onChange={this.props.onChange}
        />
      );

      curGroup.push(field);
    }
    finishGroup();

    return (
      <div className={classNames('property-set', this.props.rowClass)}>
        {fields}
      </div>
    );
  }

}

PropertySet.defaultProps = {
  rowClass: 'form-row'
};

PropertySet.propTypes = {
  bean: PropTypes.object.isRequired,
  onChange: PropTypes.func,
  inline: PropTypes.bool,
  bsSize: PropTypes.string,
  localization: PropTypes.object,
  rowClass: PropTypes.string
};

export default PropertySet;
