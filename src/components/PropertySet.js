import React       from 'react';
import PropTypes   from 'prop-types';
import Property    from './Property';


class PropertySet extends React.Component
{
  static _createGroup(curGroup, curGroupId, curGroupName) {
    return (
      <div className='property-group col-12' key={curGroupId} ref={curGroupId}>
        <div className='property-groop-box'>
          <h4 className='property-group__title'>{curGroupName}</h4>
          <div className="row">
            {curGroup}
          </div>
        </div>
      </div>
    );
  }

  render() {
    let curGroup = [];
    let curGroupName = null, curGroupId = null;
    let fields = [];

    const finishGroup = () => {
      if(curGroup.length > 0) {
        if(curGroupId) {
          fields.push(PropertySet._createGroup(curGroup, curGroupId, curGroupName));
        } else {
          Array.prototype.push.apply(fields, curGroup);
        }
      }
      curGroup = [];
    };

    for(const path of this.props.bean.order) {
      const meta = this.props.bean.meta[path];

      const newGroupId = meta.groupId || null;
      const newGroupName = meta.groupName || null;
      if(newGroupId !== curGroupId) {
        finishGroup();
        curGroupName = newGroupName;
        curGroupId = newGroupId;
      }
      const field = (<Property {...this.props} key={path} path={path} onChange={this.props.onChange} />);
      curGroup.push(field);
    }
    finishGroup();

    return (
      <div className="property-set row">
        {fields}
      </div>
    );
  }

}

PropertySet.propTypes = {
  bean: PropTypes.object.isRequired,
  onChange: PropTypes.func,
  localization: PropTypes.object
};

export default PropertySet;
