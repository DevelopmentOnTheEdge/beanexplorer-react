import React, { Component } from 'react';
import {
  HashRouter,
  Route,
  NavLink
} from 'react-router-dom'
import PropertySet   from './components/PropertySet';
import Property      from './components/Property';
import PropertyInput from './components/PropertyInput';
import Properties    from './components/Properties';
import JsonPointer   from 'json-pointer';
import classNames    from 'classnames';

import bean from './testJson.json';
import testOuter from './testOuter.json';
import validationTest from './validationTest.json';
import layout1 from './layout1.json';
import layout2 from './layout2.json';

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
    console.log('submit:', this.state.bean.values);
    event.preventDefault();
  }

  handleJsonChange(event){
    this.setState({bean: JSON.parse(event.target.value)});
  }

  handleFieldChange(path, value) {
    console.log("onChange: ", path, value);
    JsonPointer.set(this.state.bean, "/values" + path, value);
    this.forceUpdate();
  }

  getBean(){
    if(this.state.readOnly){
      let beanJson = JSON.stringify(this.state.bean);
      const readOnlyBean = JSON.parse(beanJson);

      for(let item in readOnlyBean.meta) {
        readOnlyBean.meta[item]['readOnly'] = true;
      }
      return readOnlyBean;
    }
    return this.state.bean;
  }

  getForm(){
    return (
      <form onSubmit={this.handleSubmit} className={classNames("bs-example", {"was-validated" : this.state.wasValidated})}>
        <PropertySet bean={this.getBean()} onChange={this.handleFieldChange} />
        <button type="submit" className="btn btn-primary mb-2">Submit</button>
      </form>
    )
  }

  render() {
    return (
      <div className="row">
        <div className="col-lg-8">
          <div className="alert alert-secondary">
            <form className="form-inline">
              <div className="form-check mr-sm-2">
                <label htmlFor="readOnly" className="form-check-label">
                  <input
                    id="readOnly"
                    type="checkbox"
                    className="form-check-input"
                    onChange={()=>{this.setState({readOnly: !this.state.readOnly})}}
                  />
                  read only
                </label>
              </div>
              <div className="form-check mr-sm-2">
                <label htmlFor="wasValidated" className="form-check-label">
                  <input
                    id="wasValidated"
                    type="checkbox"
                    className="form-check-input"
                    onChange={()=>{this.setState({wasValidated: !this.state.wasValidated})}}
                  />
                  .was-validated
                </label>
              </div>
            </form>
          </div>
        </div>
        <div className="col-lg-4">
          <div className="alert alert-info" role="alert">onChange in the console [Chrome <b>F12</b>]</div>
        </div>
        <div className="col-lg-8">
          {this.getForm()}
        </div>
        <div className="col-lg-4">
          <textarea rows="200" name="inputJson" className="inputJson form-control" defaultValue={JSON.stringify(this.state.bean, null, 4)}
                    onChange={this.handleJsonChange} />
          <br/>
        </div>
      </div>
    );
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

class Validation extends AllPropertyTypes
{
  constructor(props) {
    super(props);

    this.state = {
      bean: validationTest
    };
  }
}

class InlineForm extends AllPropertyTypes
{
  constructor(props) {
    super(props);

    this.state = {
      bean: layout1
    };
  }

  getForm() {
    const namePatternMismatch = 'Minimum length is 6 characters';
    const validationUser = function (e) {
      if(namePatternMismatch) {
        if (e.target.validity.patternMismatch) {
          e.target.setCustomValidity(namePatternMismatch)
        } else {
          e.target.setCustomValidity('')
        }
      }
    };

    const number1ErrorRange = 'Введите 3 цифры';
    const validationNumber1 = function (e) {
      if(number1ErrorRange) {
        if (e.target.validity.rangeOverflow || e.target.validity.rangeUnderflow) {
          e.target.setCustomValidity(number1ErrorRange)
        } else {
          e.target.setCustomValidity('')
        }
      }
    };
    return (
      <div>
        <form onSubmit={this.handleSubmit} className={classNames("bs-example form-inline", {"was-validated" : this.state.wasValidated})}>
          <PropertySet bean={this.getBean()} onChange={this.handleFieldChange}
                       inline rowClass="d-flex" />
          <button type="submit" className="btn btn-primary mb-2">Submit</button>
        </form>
        <form className="bs-example form-inline">
          <PropertySet bean={layout2} onChange={this.handleFieldChange}
                       inline rowClass="d-flex" />
          <button type="submit" className="btn btn-primary mb-2">Submit</button>
        </form>

        <h5>Test setCustomValidity()</h5>
        <form className="bs-example needs-validation form-inline" onSubmit={this.handleSubmit}>
          <input
            type="text"
            name="user"
            className="form-control mb-2 mr-sm-2"
            pattern=".{6,}"
            onInvalid={validationUser}
            onInput={validationUser}
            required
          />
          <input
            type="number"
            name="number1"
            className="form-control mb-2 mr-sm-2"
            min={100}
            max={999}
            onInvalid={validationNumber1}
            onInput={validationNumber1}
            required
          />
          <button type="submit" className="btn btn-primary mb-2">Submit</button>
        </form>
      </div>
    )
  }

}

const ExampleApp = () => (
  <HashRouter basename="/">
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
            <li className="nav-item"><NavLink to="/outer" className="nav-link" >Outer</NavLink></li>
            <li className="nav-item"><NavLink to="/validation" className="nav-link" >Validation</NavLink></li>
            <li className="nav-item"><NavLink to="/inlineForm" className="nav-link" >Inline form</NavLink></li>
          </ul>
          <br/>
          <Route exact path="/" component={AllPropertyTypes}/>
          <Route path="/outer" component={PropertyOuter}/>
          <Route path="/validation" component={Validation}/>
          <Route path="/inlineForm" component={InlineForm}/>
          <br/><br/><br/><br/>
        </div>
      </div>
    </div>
  </HashRouter>
);

export default ExampleApp;
