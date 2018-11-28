import React from 'react';
import BasePropertyInput from "./BasePropertyInput";

export default class Base64FilePropertyInput extends BasePropertyInput {
  constructor(props) {
    super(props);
    this.base64FileHandle = this.base64FileHandle.bind(this);
  }

  render() {
    const meta = this.getMeta();
    return <input
      type="file"
      multiple={meta.multipleSelectionList}
      onChange={this.base64FileHandle}
      {...this.getBaseProps()}
    />
  }

  base64FileHandle(e) {
    if (e.target.files && e.target.files.length === 1) {
      const fileName = e.target.files[0].name;
      Base64FilePropertyInput.getBase64(e.target.files[0]).then(data => {
        this.callOnChange({type: "Base64File", name: fileName, data: data})
      });
    }
    else if (e.target.files && e.target.files.length === 0) {
      this.callOnChange("")
    }
  }

  static getBase64(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.addEventListener("load", function () {
        resolve(reader.result);
      }, false);
      reader.onerror = error => reject(error);

      reader.readAsDataURL(file);
    });
  }
}
