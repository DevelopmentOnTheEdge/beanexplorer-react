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
    const value = this.getValue();

    return <CKEditor
      ref={instance => {
        this.ckeditor = instance;
      }}
      activeClass="p10"
      content={value}
      events={this.getEvents()}
      config={this.getConfig()}
      scriptUrl={this.getScriptUrl()}
    />
  }

  getConfig() {
    const meta = this.getMeta();
    return {
      removeButtons: 'image',
      language: this.props.localization.locale,
      readOnly: meta.readOnly
    }
  }

  getScriptUrl() {
    return undefined;
  }

  getEvents() {
    return {
      "change": this.editorOnChange,
      "blur": this.editorReload,
      "instanceReady": this.onInit,
    }
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
