import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
  NavLink
} from 'react-router-dom'
import PropertySet   from './components/PropertySet';
import Property      from './components/Property';
import PropertyInput from './components/PropertyInput';
import Properties    from './components/Properties';
import JsonPointer   from 'json-pointer';

import bean from './testJson.json';
import testOuter from './testOuter.json';
import numbersTest from './numbersTest.json';

import 'react-datetime/css/react-datetime.css';
import 'react-select/dist/react-select.css';
import 'react-virtualized/styles.css'
import 'react-virtualized-select/styles.css'
import "./app.css";
import "./propertySet.css";


class AllPropertyTypes extends Component
{
  constructor(props) {
    super(props);

    this.state = {
      bean: bean
    };

    this.handleFieldChange = this.handleFieldChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleJsonChange = this.handleJsonChange.bind(this);
  }

  handleSubmit(event) {
    console.log('submit', this.state.bean.values);
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

  render() {
    return (
      <div className="row">
        <div className="col-lg-6">
          <form onSubmit={this.handleSubmit} className="bs-example">
            <PropertySet bean={this.state.bean} onChange={this.handleFieldChange} />
            <input className="btn btn-primary" type="submit" value="Submit" />
          </form>
        </div>
        <div className="col-lg-6">
          <textarea rows="200" name="inputJson" className="inputJson form-control" defaultValue={JSON.stringify(this.state.bean, null, 4)}
                    onChange={this.handleJsonChange} />
          <br/>
          <div className="alert alert-info" role="alert">onChange calls displayed in the console [Chrome <b>F12</b>]</div>
        </div>
      </div>
    );
  }
}

class AllReadOnly extends AllPropertyTypes
{
  constructor(props) {
    super(props);

    let beanJson = JSON.stringify(bean);
    const readOnlyBean = JSON.parse(beanJson);

    for(let item in readOnlyBean.meta) {
      readOnlyBean.meta[item]['readOnly'] = true;
    }

    this.state = {
      bean: readOnlyBean
    };
  }
}

class PropertyOuter extends AllPropertyTypes
{
  constructor(props) {
    super(props);

    this.state = {
      bean: testOuter
    };
  }
}

class Numbers extends AllPropertyTypes
{
  constructor(props) {
    super(props);

    this.state = {
      bean: numbersTest
    };
  }
}

const ExampleApp = () => (
  <Router basename="/beanexplorer-react">
    <div className="app">
      <nav className="app-header navbar navbar-expand-md navbar-dark">
        <div className="container">
          <a className="navbar-brand" href="#">beanexplorer-react</a>
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"/>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="ml-sm-auto navbar-nav">
              <li className="nav-item">
                <a href="https://github.com/DevelopmentOnTheEdge/beanexplorer-react" className="nav-link">Github</a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      <div className="app-intro">
        <div className="container">
          <h3>React component for BeanExplorer</h3>
          <br/>
          <ul className="nav nav-pills">
            <li className="nav-item"><NavLink to="/" className="nav-link" exact>All PropertyInput</NavLink></li>
            <li className="nav-item"><NavLink to="/allReadOnly" className="nav-link" >All Read Only</NavLink></li>
            <li className="nav-item"><NavLink to="/numbers" className="nav-link" >Numbers</NavLink></li>
            <li className="nav-item"><NavLink to="/propertyOuter" className="nav-link" >Property outer</NavLink></li>
          </ul>
          <br/>
          <Route exact path="/" component={AllPropertyTypes}/>
          <Route path="/allReadOnly" component={AllReadOnly}/>
          <Route path="/numbers" component={Numbers}/>
          <Route path="/propertyOuter" component={PropertyOuter}/>
          <br/><br/><br/><br/>
        </div>
      </div>
    </div>
  </Router>
);

export default ExampleApp;
