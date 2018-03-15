import React       from 'react';
import PropTypes   from 'prop-types';
import Property    from './Property';
import classNames  from 'classnames';


class PropertySet extends React.Component
{
  createGroup(curGroup, curGroupId, curGroupName) {
    return (
      <div className='property-group col-12' key={curGroupId} ref={curGroupId}>
        <div className="row property-group__line"/>
        <div className='property-groop-box'>
          <h4 className='property-group__title'>{curGroupName}</h4>
          <div className="row">
            <div className="col-12">
              <div className={this.props.rowClass}>
                {curGroup}
              </div>
            </div>
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
          fields.push(this.createGroup(curGroup, curGroupId, curGroupName));
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
