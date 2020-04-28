import React from 'react';
import PropTypes from 'prop-types';
import Property from './Property';
import classNames from 'classnames';
import JsonPointer from 'json-pointer';
import {shouldPropertyUpdate} from "./utils";

class PropertySet extends React.Component {

  shouldComponentUpdate(nextProps) {
    return shouldPropertyUpdate(this.props, nextProps) || this.props.values !== nextProps.values;
  }

  static getName(name, type = 'group') {
    if (name) {
      return <h5 className={`property-${type}__title`}>{name}</h5>
    } else {
      return null
    }
  }
  hasGroup(){
    for (const path of this.props.bean.order) {
      const meta = this.props.bean.meta[path];
      if(meta.groupId){
        return true;
      }
    }
    return false;
  }
  hasNestedDPS(){
    for (const path of this.props.bean.order) {
      const meta = this.props.bean.meta[path];
      if(meta.isDPS){
        return true;
      }
    }
    return false;
  }
  createContainer(curContainer, curContainerId, curContainerName, curContainerClasses, type = 'group') {
    return (
        <div
            className={classNames(
                `property-${type}`,
                curContainerClasses || `property-${type}__top-line col-12`
            )}
            key={curContainerId}
            ref={curContainerId}>
          <div className={`property-${type}__top-line-row row`}/>
          {PropertySet.getName(curContainerName)}
          <div className={classNames(`property-${type}__row`, this.props.rowClass)}>
            {curContainer}
          </div>
        </div>
    );
  }

  processingGroups(){
    let curGroup = [];
    let curGroupName = null, curGroupId = null, curGroupClasses = null;
    let fields = [];

    const finishGroup = () => {
      if (curGroup.length > 0) {
        if (curGroupId) {
          fields.push(this.createContainer(curGroup, curGroupId, curGroupName, curGroupClasses));
        } else {
          Array.prototype.push.apply(fields, curGroup);
        }
      }
      curGroup = [];
    };

    for (const path of this.props.bean.order) {
      const meta = this.props.bean.meta[path];

      const newGroupId = meta.groupId;
      const newGroupName = meta.groupName;
      const newGroupClasses = meta.groupClasses;

      if (newGroupId !== curGroupId) {
        finishGroup();
        curGroupName = newGroupName;
        curGroupClasses = newGroupClasses;
        curGroupId = newGroupId;
      }

      const field = (
          <Property key={path} path={path} {...this.props} value={this.getValue(path)}/>
      );

      curGroup.push(field);
    }
    finishGroup();
    return  fields;
  }

  processingNestedProperties() {
    const fields = [];
    let curContainer = []
    for (const path of this.props.bean.order) {
      const meta = this.props.bean.meta[path];
      if (meta.isDPS) {
        meta.hidden = true;
        curContainer.push(<Property key={path} path={path} {...this.props} value={this.getValue(path)}/>)
        const propID = path.substring(path.lastIndexOf("/") + 1);
        fields.push(this.createContainer(curContainer, propID, meta.displayName));
        curContainer = []
      } else {
        fields.push(<Property key={path} path={path} {...this.props} value={this.getValue(path)}/>)
      }
    }
    return fields;
  }

  render() {
    let fields = [];
    if (this.hasGroup()) {
      fields = this.processingGroups();
    } else if( this.hasNestedDPS()){
      fields = this.processingNestedProperties();
    }
    else {
      for (const path of this.props.bean.order) {
        fields.push(<Property key={path} path={path} {...this.props} value={this.getValue(path)}/>);
      }
    }

    return (
        <div className={classNames('property-set', this.props.rowClass)}>
          {fields}
        </div>
    );
  }

  getValue(path) {
    const values = this.props.values || this.props.bean.values;
    return JsonPointer.get(values, path)
  }

}

PropertySet.defaultProps = {
  rowClass: 'form-row'
};

PropertySet.propTypes = {
  bean: PropTypes.object.isRequired,
  values: PropTypes.object,
  onChange: PropTypes.func,
  inline: PropTypes.bool,
  horizontal: PropTypes.bool,
  bsSize: PropTypes.string,
  localization: PropTypes.object,
  rowClass: PropTypes.string
};

export default PropertySet;
