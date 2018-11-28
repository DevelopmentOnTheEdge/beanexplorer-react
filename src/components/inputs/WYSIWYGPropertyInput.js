import React from 'react';
import CKEditor from 'react-ckeditor-component';
import BasePropertyInput from "./BasePropertyInput";

export default class WYSIWYGPropertyInput extends BasePropertyInput {
  constructor(props) {
    super(props);
  }

  render() {
    const meta = this.getMeta();
    const value = this.getValue();

    if (this.ckeditor) {
      WYSIWYGPropertyInput.updateCkeditor(this.ckeditor, value, meta.readOnly === true);
    }
    return <CKEditor
      ref={instance => {
        this.ckeditor = instance;
      }}
      activeClass="p10"
      content={value}
      events={{
        "change": (evt) => {
          this.callOnChange(evt.editor.getData())
        }
      }}
      config={{
        removeButtons: 'image',
        language: this.props.localization.locale,
        readOnly: meta.readOnly
      }}
    />
  }

  static updateCkeditor(ckeditor, value, readOnly) {
    if (ckeditor.editorInstance.getData() !== value) {
      ckeditor.editorInstance.setData(value);
    }
    ckeditor.editorInstance.setReadOnly(readOnly);
  }
}
