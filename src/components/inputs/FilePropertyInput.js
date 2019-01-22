import React from 'react';
import BasePropertyInput from "./BasePropertyInput";

export default class FilePropertyInput extends BasePropertyInput {
  constructor(props) {
    super(props);
    this.fileHandle = this.fileHandle.bind(this);
  }

  render() {
    const meta = this.getMeta();
    return <input
      type="file"
      multiple={meta.multipleSelectionList}
      onChange={this.fileHandle}
      {...this.getBaseProps()}
    />
  }

  fileHandle(e) {
    this.callOnChange(e.target.files);
  }
}
