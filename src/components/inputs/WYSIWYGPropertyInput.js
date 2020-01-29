import React from 'react';
import CKEditor from 'ckeditor4-react';
import BasePropertyInput from "./BasePropertyInput";

export default class WYSIWYGPropertyInput extends BasePropertyInput {
  constructor(props) {
    super(props);
    this.editorOnChange = this.editorOnChange.bind(this);
    this.editorReload = this.editorReload.bind(this);
    this.onInit = this.onInit.bind(this);
  }

  componentDidUpdate() {
    this.onInit();
  }

  editorOnChange(evt){
    this.callOnChange(evt.editor.getData());
  }

  editorReload(){
    this.reload();
  }

  render() {
    return <CKEditor
      onBeforeLoad={ ( CKEDITOR ) => ( CKEDITOR.disableAutoInline = true ) }
      ref={instance => {
        this.ckeditor = instance;
      }}
      data={this.getValue()}
      events={this.getEvents()}
      config={this.getConfig()}
      scriptUrl={this.getScriptUrl()}
      onChange={evt=>this.editorOnChange(evt)}
    />
  }

  getConfig() {
    const meta = this.getMeta();
    return {
      toolbar: [
          { name: 'row1', 
            items: [ 'Cut', 'Copy', 'Paste', 'PasteText', 'PasteFromWord', 'CopyFormatting', 'RemoveFormat', 
                '-', 'Undo', 'Redo', '-',
                '-', 'Image', 'Table', 'HorizontalRule', 'Smiley', 'SpecialChar', 'Image Resizer',
                '-', 'Link', 'Unlink', 'Anchor' ] },
          '/',
          { name: 'row2', 
            items: [ 'NumberedList', 'BulletedList', 'Blockquote',
                '-', 'Styles', 'Format', 'Font', 'FontSize' ] },
          '/',
          { name: 'row3', 
            items: [ 'Bold', 'Italic', 'Underline', 'Strike', 'Subscript', 'Superscript',
                '-', 'JustifyLeft', 'JustifyCenter', 'JustifyRight', 'JustifyBlock',
                '-', 'TextColor', 'BGColor',
                '-', 'Source', 'Maximize' ] },
      ],
      extraPlugins: 'colorbutton,copyformatting,font,justify,image2,maximize,smiley',
      removePlugins: 'image',
      removeButtons: '',
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
