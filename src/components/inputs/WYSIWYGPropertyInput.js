import React from 'react';
import CKEditor from 'react-ckeditor-component';
import BasePropertyInput from "./BasePropertyInput";

export default class WYSIWYGPropertyInput extends BasePropertyInput {
  constructor(props) {
    super(props);
    this.editorOnChange = this.editorOnChange.bind(this);
    this.editorReload = this.editorReload.bind(this);
    this.onInit = this.onInit.bind(this);
  }

  componentDidUpdate() {
    this.onInit()
  }

  editorOnChange(evt){
    this.callOnChange(evt.editor.getData());
  }

  editorReload(){
    this.reload();
  }

  render() {
    const meta = this.getMeta();
    const value = this.getValue();

    return <CKEditor
      ref={instance => {
        this.ckeditor = instance;
      }}
      activeClass="p10"
      content={value}
      events={{
        "change": this.editorOnChange,
        "blur": this.editorReload,
        "instanceReady": this.onInit,
      }}
      config={{
        removeButtons: 'image',
        language: this.props.localization.locale,
        readOnly: meta.readOnly
      }}
    />
  }

  onInit() {
    if (this.ckeditor && this.ckeditor.editorInstance) {
      WYSIWYGPropertyInput.updateCKEditor(this.ckeditor, this.getValue(), this.getMeta().readOnly === true);
    }
  }

  static updateCKEditor(ckeditor, value, readOnly) {
    if (ckeditor.editorInstance.getData() !== value) {
      ckeditor.editorInstance.setData(value);
    }
    ckeditor.editorInstance.setReadOnly(readOnly);
  }
}
