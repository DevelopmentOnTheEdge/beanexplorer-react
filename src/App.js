import React, { Component } from 'react';
import PropertySet from './PropertySet';
import logo from './logo.svg';
import './App.css';
import JsonPointer from 'json-pointer';

class App extends Component {

  constructor(props) {
    super(props);
    var testJson = require('./testJson.json');

    this.state = {
      fields: testJson
    };

    this.handleFieldChange = this.handleFieldChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleJsonChange = this.handleJsonChange.bind(this);
  }

  handleSubmit(event) {
    alert('A name was submitted: ' + this.state.value);
    event.preventDefault();
  }

  handleJsonChange(event){
    this.setState({fields: JSON.parse(event.target.value)});
  }

  handleFieldChange(path, value) {
    console.log("call handleFieldChange: ", path, value);
    JsonPointer.set(this.state.fields, "/values" + path, value);
    this.forceUpdate();
  }

  render() {
    const readOnlyForm = this.readOnlyForm();

    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>React component for BeanExplorer</h2>
        </div>
        <div className="App-intro">
          <div className="container">
            <div className="row">
              <div className="col-md-7">
                <form onSubmit={this.handleSubmit} className="bs-example">
                  <PropertySet fields={this.state.fields} onChange={this.handleFieldChange}/>
                  <div className="text-center">
                    <button type="submit" className="btn btn-primary btn-primary-spacing">Submit</button>
                    <button type="button" className="btn btn-default btn-primary-spacing">Cancel</button>
                  </div>
                </form>
                {readOnlyForm}
              </div>
              <div className="col-md-5">
                <textarea rows="20" name="inputJson" className="form-control" defaultValue={JSON.stringify(this.state.fields, null, 4)}
                          onChange={this.handleJsonChange} />
                <br/>
                <div className="alert alert-info" role="alert">onChange calls displayed in the console [Chrome <b>F12</b>]</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  readOnlyForm(){
    let fieldsJson = JSON.stringify(this.state.fields);
    let fields = JSON.parse(fieldsJson);

    for(var item in fields.meta) {
      fields.meta[item]['readOnly'] = true;
    }
    return (
      <div>
        <h2>All with readOnly</h2>
        <form onSubmit={this.handleSubmit} className="bs-example">
          <PropertySet fields={fields} onChange={this.handleFieldChange}/>
          <div className="text-center">
            <button type="submit" className="btn btn-primary btn-primary-spacing">Submit</button>
            <button type="button" className="btn btn-default btn-primary-spacing">Cancel</button>
          </div>
        </form>
      </div>
      );
  }

}

export default App;
