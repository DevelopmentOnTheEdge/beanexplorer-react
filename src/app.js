import React, { Component } from 'react';
import PropertySet from './components/PropertySet';
import JsonPointer from 'json-pointer';

import 'react-datetime/css/react-datetime.css';
import 'react-select/dist/react-select.css';
import 'react-virtualized/styles.css'
import 'react-virtualized-select/styles.css'
import "./app.css";
import "./propertySet.css";


class App extends Component
{
  constructor(props) {
    super(props);
    const testJson = require('./testJson.json');

    this.state = {
      bean: testJson
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
    this.setState({bean: JSON.parse(event.target.value)});
  }

  handleFieldChange(path, value) {
    console.log("call handleFieldChange: ", path, value);
    JsonPointer.set(this.state.bean, "/values" + path, value);
    this.forceUpdate();
  }

  getLocalization(){
    return {
      locale: 'ru',
      clearAllText: 'Очистить всё',
      clearValueText: 'Очистить',
      noResultsText: 'Нет результатов',
      searchPromptText: 'Начните вводить для поиска',
      placeholder: 'Выберите...',
      loadingPlaceholder: 'Загрузка...'
    }
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
								<div className="col-lg-12">
									<form onSubmit={this.handleSubmit} className="bs-example">
										<PropertySet bean={this.state.bean} onChange={this.handleFieldChange} localization={this.getLocalization()}/>
									</form>
									{readOnlyForm}
								</div>
								<div className="col-lg-12">
									<textarea rows="20" name="inputJson" className="inputJson form-control" defaultValue={JSON.stringify(this.state.bean, null, 4)}
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
    let beanJson = JSON.stringify(this.state.bean);
    let bean = JSON.parse(beanJson);

    for(let item in bean.meta) {
      bean.meta[item]['readOnly'] = true;
    }
    return (
      <div>
        <h2>All with readOnly</h2>
        <form onSubmit={this.handleSubmit} className="bs-example">
          <PropertySet bean={bean} onChange={this.handleFieldChange} propertyLocalization={this.getLocalization()}/>
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
