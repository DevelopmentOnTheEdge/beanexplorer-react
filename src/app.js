import React, { Component } from 'react';
import PropertySet from './components/PropertySet';
import JsonPointer from 'json-pointer';

require("./app.css")

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
      <div className="app">
        <div className="app-header">
          <h3>React component for BeanExplorer</h3>
        </div>
					<div className="app-intro">
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
									<textarea rows="20" name="inputJson" className="inputJson form-control" defaultValue={JSON.stringify(this.state.fields, null, 4)}
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

    for(let item in fields.meta) {
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
