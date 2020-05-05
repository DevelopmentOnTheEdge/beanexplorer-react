import React from 'react';
import PropTypes from 'prop-types';
import Property from './Property';
import classNames from 'classnames';
import JsonPointer from 'json-pointer';
import {isDPS, shouldPropertyUpdate} from "./utils";

class PropertySet extends React.Component {

  shouldComponentUpdate(nextProps) {
    return shouldPropertyUpdate(this.props, nextProps) || this.props.values !== nextProps.values;
  }

  static getName(name) {
    if (name) {
      return <h5 className={'property-group__title'}>{name}</h5>
    } else {
      return null
    }
  }

  hasGroup() {
    for (const path of this.props.bean.order) {
      const meta = this.props.bean.meta[path];
      if (meta.groupId) {
        return true;
      }
    }
    return false;
  }

  hasNestedDPS() {
    for (const path of this.props.bean.order) {
      const meta = this.props.bean.meta[path];
      if (isDPS(meta)) {
        return true;
      }
    }
    return false;
  }

  createGroupContainer(curContainer, curContainerId, curContainerName, curContainerClasses) {
    return (
        <div
            className={classNames(
                'property-group__top',
                curContainerClasses || 'property-group__top-line col-12'
            )}
            key={curContainerId}
            ref={curContainerId}>
          <div className={'property-group__top-line-row row'}/>
          {PropertySet.getName(curContainerName)}
          <div className={classNames('property-group__row', this.props.rowClass)}>
            {curContainer}
          </div>
        </div>
    );
  }

   processingGroups() {
    let curGroup = [];
    let curGroupName = null, curGroupId = null, curGroupClasses = null;
    let fields = [];

    const finishGroup = () => {
      if (curGroup.length > 0) {
        if (curGroupId) {
          fields.push(this.createGroupContainer(curGroup, curGroupId, curGroupName, curGroupClasses));
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
    return fields;
  }

  createNestedPropsContainer(curContainer, curContainerId, curContainerName, curContainerClasses) {
    return (
        <div
            className={classNames(
                'property-nested-dps__top',
                curContainerClasses || 'property-nested-dps__top-line col-12'
            )}
            key={curContainerId}
            ref={curContainerId}>
          <div className={'property-nested-dps__top-line-row row'}/>
          {PropertySet.getName(curContainerName)}
          <div className={classNames('property-nested-dps__row', this.props.rowClass)}>
            {curContainer}
          </div>
          <div className={'property-nested-dps__top-line-row row'}/>
        </div>
    );
  }

  createNestedProps(startIdx, list, parentPath, containerId) {
    const parentPropId = parentPath.substring(parentPath.lastIndexOf("/") + 1);
    const nestedPropsContainer = [];
    startIdx++;
    if (list.length > startIdx) {
      for (let i = startIdx; i < list.length; i++) {
        const path = list[i];
        const meta = this.props.bean.meta[path];
        startIdx = i
        if (meta.parent == parentPropId) {
          if (nestedPropsContainer.length === 0) {
            nestedPropsContainer.push([<Property key={parentPath} path={parentPath} {...this.props}
                                                 value={this.getValue(parentPath)}/>]);
          }
          if (isDPS(meta)) {
            let idxAndNestedPropContainer = this.createNestedProps(i, list, path)
            i = idxAndNestedPropContainer[0];
            nestedPropsContainer.push(idxAndNestedPropContainer[1]);
            //get last element and checked for rerun if elements position after nested DPS
            if (this.props.bean.meta[list[i]].parent == parentPropId) {
              i--;
            }
            startIdx = i;
          } else {
            startIdx = i;
            nestedPropsContainer.push(<Property key={path} path={path} {...this.props} value={this.getValue(path)}/>);
          }
        } else {
          break;
        }
      }
    }
    const parentMeta = this.props.bean.meta[parentPath]
    return [startIdx, this.createNestedPropsContainer(nestedPropsContainer, parentPropId, parentMeta.displayName,parentMeta.dpsClasses)];
  }

  processingNestedProperties() {
    const fields = [];
    let curContainer = []
    const containerId = "dps-accordion-container";
    const orderList = this.props.bean.order;
    for (let i = 0; i < orderList.length; i++) {
      const path = orderList[i];
      const meta = this.props.bean.meta[path];
      if (isDPS(meta)) {
        const idxAndNestedPropContainer = this.createNestedProps(i, orderList, path);
        i = idxAndNestedPropContainer[0];
        fields.push(idxAndNestedPropContainer[1]);
        //get last element and checked for rerun if element doesn't have parent
        if (!this.props.bean.meta[orderList[i]].parent) {
          i--;
        }
      } else {
        fields.push(<Property key={path} path={path} {...this.props} value={this.getValue(path)}/>)
      }
    }
    // return <div className="accordion" id={containerId}>{fields}</div>;
    return fields;
  }

  render() {
    let fields = [];
    if (this.hasGroup()) {
      fields = this.processingGroups();
    } else if (this.hasNestedDPS()) {
      fields = this.processingNestedProperties();
    } else {
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
