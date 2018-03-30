import React, { Component } from 'react';
import {
  HashRouter,
  Route,
  NavLink
} from 'react-router-dom';
import classNames    from 'classnames';
import Cookies       from 'universal-cookie';

import JsonPointer   from 'json-pointer';
import PropertySet   from './components/PropertySet';
import Property      from './components/Property';
import PropertyInput from './components/PropertyInput';
import Properties    from './components/Properties';

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

  componentWillMount(){
    const cookies = new Cookies();

    this.setState({
      cookies: cookies,
      wasValidated: cookies.get('wasValidated', { path: '/' }) === 'true',
      readOnly: cookies.get('readOnly', { path: '/' }) === 'true',
      bsSize: cookies.get('bsSize', { path: '/' }),
    });
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
        <PropertySet bean={this.getBean()} onChange={this.handleFieldChange} bsSize={this.state.bsSize}/>
        {this.getSubmitBtn()}
      </form>
    )
  }

  getSubmitBtn(className){
    return (
      <button type="submit" className={classNames(
        className || "btn btn-primary mb-2",
        {'btn-sm' : this.state.bsSize === 'sm'},
        {'btn-lg' : this.state.bsSize === 'lg'}
      )}>Submit</button>
    )
  }
  //btn-sm

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
                    onChange={()=>{
                      this.state.cookies.set('readOnly', !this.state.readOnly, { path: '/' });
                      this.setState({readOnly: !this.state.readOnly});
                    }}
                    checked={this.state.readOnly === true}
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
                    onChange={()=>{
                      this.state.cookies.set('wasValidated', !this.state.wasValidated, { path: '/' });
                      this.setState({wasValidated: !this.state.wasValidated});
                    }}
                    checked={this.state.wasValidated === true}
                  />
                  .was-validated
                </label>
              </div>
              <div className="form-check mr-sm-2">
                <label htmlFor="bsSize-sm" className="form-check-label">
                  <input
                    id="bsSize-sm"
                    type="checkbox"
                    className="form-check-input"
                    onChange={()=>{
                      this.state.cookies.set('bsSize', this.state.bsSize !== "sm" ? "sm" : "", { path: '/' });
                      this.setState({bsSize: this.state.bsSize !== "sm" ? "sm" : ""});
                    }}
                    checked={this.state.bsSize === "sm"}
                  />
                  sm size
                </label>
              </div>
              <div className="form-check mr-sm-2">
                <label htmlFor="bsSize-lg" className="form-check-label">
                  <input
                    id="bsSize-lg"
                    type="checkbox"
                    className="form-check-input"
                    onChange={()=>{
                      this.state.cookies.set('bsSize', this.state.bsSize !== "lg" ? "lg" : "", { path: '/' });
                      this.setState({bsSize: this.state.bsSize !== "lg" ? "lg" : ""});
                    }}
                    checked={this.state.bsSize === "lg"}
                  />
                  lg size
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
    const commonProps = {
      bean: this.getBean(),
      onChange: this.handleFieldChange,
      inline: true,
      rowClass:"d-flex",
    };

    const properties = commonProps.bean.order.map(p => (
      <Property key={p} path={p} {...commonProps} bsSize={this.state.bsSize}/>
    ));

    const commonProps2 = {
      bean: layout2,
      onChange: this.handleFieldChange,
      inline: true,
      rowClass:"d-flex",
    };

    const properties2 = commonProps2.bean.order.map(p => (
      <Property key={p} path={p} {...commonProps2} bsSize={this.state.bsSize} className="mr-sm-2"/>
    ));

    return (
      <div>
        <form onSubmit={this.handleSubmit} className={classNames("bs-example form-inline", {"was-validated" : this.state.wasValidated})}>
          {properties}
          {this.getSubmitBtn()}
        </form>
        <form className="bs-example form-inline">
          {properties2}
          {this.getSubmitBtn("btn btn-primary")}
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
