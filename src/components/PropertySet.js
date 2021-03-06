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

  static getName(name, css) {
    if (name) {
      return <h5 className={css}>{name}</h5>
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

  getTabs() {
    const tabs = [];
    const tabIds = [];
    for (const path of this.props.bean.order) {
      const meta = this.props.bean.meta[path];
      if (!meta.tabId && tabIds.indexOf(-1) === -1) {
        tabIds.push(-1);
        tabs.push({tabId: "-1", tabName: "main"});
      } else if (meta.tabId && tabIds.indexOf(+meta.tabId) === -1) {
        tabIds.push(+meta.tabId);
        tabs.push({tabId: meta.tabId, tabName: (meta.tabName ? meta.tabName : `tab ${meta.tabId}`)});
      }
    }
    return tabs.sort(function (a, b) {
      return +a.tabId - +b.tabId;
    })
  }

  getTabsHeader(tabs) {
    return (
        <ul key="property_tabs_header" className="nav nav-tabs col-12">
          {tabs.map((tabInfo, idx) => {
            return (
                <li key={`tab_li_header_${tabInfo.tabId}`} className="nav-item">
                  <a key={`tab_a_header_${tabInfo.tabId}`}
                     className={classNames("nav-link", idx === 0 ? " active" : "")}
                     data-toggle="tab"
                     href={"#tab_" + tabInfo.tabId}>{tabInfo.tabName}</a>
                </li>)
          })}
        </ul>
    )
  }

  getTabsContent(tabs, tabContent) {
    return (
        <div key="property_tabs_content" className={classNames("tab-content property-tabs",
            this.props.horizontal ? "col-9" : "col-12")}>
          {tabs.map((tabInfo, idx) => {
            return (
                <div key={`tab_content_${tabInfo.tabId}`} className={"tab-pane fade" + (idx === 0 ? "show active" : "")}
                     id={"tab_" + tabInfo.tabId}>
                  {tabContent[tabInfo.tabId]}
                </div>)
          })}
        </div>
    )
  }

  processingTabs(tabs) {
    const orderList = this.props.bean.order;
    const tabsContent = {};
    for (const path of this.props.bean.order) {
      const meta = this.props.bean.meta[path];
      const prop = <Property key={path} path={path} {...this.props} value={this.getValue(path)}/>;
      const tabId = meta.tabId ? meta.tabId : "-1";
      if (!tabsContent[tabId]) {
        tabsContent[tabId] = [prop]
      } else {
        const content = tabsContent[tabId]
        content.push(prop);
        tabsContent[tabId] = content
      }
    }
    const content = [];
    content.push(this.getTabsHeader(tabs))
    content.push(this.getTabsContent(tabs, tabsContent))
    return content;
  }

  createGroupContainer(curContainer, curContainerId, curContainerName, curContainerClasses, groupInitiallyClosed) {
    return (
        <div
            className={classNames(
                'property-group',
                curContainerClasses || 'property-group__top-line col-12'
            )}
            key={`group_${curContainerId}`}
            ref={curContainerId}>
          <div className={'property-group__top-line-row row'}/>
          {PropertySet.getName(
              <a data-toggle="collapse" href={`#property-group__collapse-${curContainerId}`} role="button"
                 className="property-group__title-link"
                 aria-expanded={!groupInitiallyClosed}
                 aria-controls={`property-group__collapse-${curContainerId}`}>
                {curContainerName}</a>
              , 'property-group__title')}
          <div className={classNames('collapse', {'show': !groupInitiallyClosed})}
               id={`property-group__collapse-${curContainerId}`}>
            <div className={classNames('property-group__row', this.props.rowClass)}>
              {curContainer}
            </div>
          </div>
        </div>
    );
  }

  processingGroups() {
    let curGroup = [];
    let curGroupName = null, curGroupId = null, curGroupClasses = null, groupInitiallyClosed = null;
    let fields = [];

    const finishGroup = () => {
      if (curGroup.length > 0) {
        if (curGroupId) {
          fields.push(this.createGroupContainer(curGroup, curGroupId, curGroupName, curGroupClasses, groupInitiallyClosed));
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
      const newGroupInitiallyClosed = meta.groupInitiallyClosed;

      if (newGroupId !== curGroupId) {
        finishGroup();
        curGroupName = newGroupName;
        curGroupClasses = newGroupClasses;
        curGroupId = newGroupId;
        groupInitiallyClosed = newGroupInitiallyClosed;
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
    if (this.props.horizontal) {
      return (
          <div
              className={classNames(
                  'property-nested-dps',
                  curContainerClasses || 'property-nested-dps__border col-12'
              )}
              key={curContainerId}
              ref={curContainerId}>
            <div className={'property-nested-dps__border-row row'}>

              <a className={'property-nested-dps__link'} data-toggle="collapse" href={"#" + curContainerId}
                 role="button"
                 aria-expanded="false" aria-controls={curContainerId}>
                {PropertySet.getName(curContainerName, 'property-group__title')}
              </a>
              <div id={curContainerId}
                   className={classNames('collapse', 'show', 'property-nested-dps__row', this.props.rowClass)}>
                {curContainer}
              </div>
            </div>
          </div>
      )
    } else {
      return (
          <div
              className={classNames(
                  'property-nested-dps',
                  curContainerClasses || 'property-nested-dps__top-line col-12'
              )}
              key={curContainerId}
              ref={curContainerId}>
            <div className={'property-nested-dps__top-line-row row'}/>

            <a className={'property-nested-dps__link'} data-toggle="collapse" href={"#" + curContainerId} role="button"
               aria-expanded="false" aria-controls={curContainerId}>
              {PropertySet.getName(curContainerName, 'property-group__title')}
            </a>
            <div id={curContainerId}
                 className={classNames('collapse', 'show', 'property-nested-dps__row', this.props.rowClass)}>
              {curContainer}
            </div>
            <div className={'property-nested-dps__top-line-row row'}/>
          </div>
      )
    }
  }

  createNestedProps(startIdx, list, parentPath) {
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
    return [startIdx, this.createNestedPropsContainer(nestedPropsContainer, parentPropId, parentMeta.displayName, parentMeta.dpsClasses)];
  }

  processingNestedProperties() {
    const fields = [];
    let curContainer = []
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
    return fields;
  }

  render() {
    let fields = [];
    const tabs = this.getTabs();
    if (tabs.length > 1) {
      fields = this.processingTabs(tabs);
    }
    else if (this.hasGroup()) {
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
