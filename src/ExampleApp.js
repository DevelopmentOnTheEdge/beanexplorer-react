import React, { Component } from 'react';
import {
  HashRouter,
  Route,
  NavLink
} from 'react-router-dom';
import classNames    from 'classnames';
import Cookies       from 'universal-cookie';
import fetch from 'isomorphic-fetch';

import JsonPointer   from 'json-pointer';
import PropertySet   from './components/PropertySet';
import Property      from './components/Property';

import bean from './testJson.json';
import testOuter from './testOuter.json';
import validationTest from './validationTest.json';
import layout1 from './layout1.json';
import layout2 from './layout2.json';
import devJson from './devJson.json';

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
      bean: bean,
      values: bean.values
    };

    this.handleFieldChange = this.handleFieldChange.bind(this);
    this.reloadOnChange = this.reloadOnChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleJsonChange = this.handleJsonChange.bind(this);
  }

  componentWillMount(){
    const cookies = new Cookies();

    this.setState({
      cookies: cookies,
      horizontal: cookies.get('horizontal', { path: '/' }) === 'true',
      wasValidated: cookies.get('wasValidated', { path: '/' }) === 'true',
      readOnly: cookies.get('readOnly', { path: '/' }) === 'true',
      bsSize: cookies.get('bsSize', { path: '/' }),
    });
  }

  handleSubmit(event) {
    console.log('submit:', this.state.values);
    event.preventDefault();
  }

  handleJsonChange(event) {
    const bean = JSON.parse(event.target.value);
    this.setState({bean: bean, values : bean.values});
  }

  handleFieldChange(path, value) {
    console.log("onChange: ", path, value);
    const nextValues = Object.assign({}, this.state.values);
    JsonPointer.set(nextValues, path, value);
    this.setState({values: nextValues});
  }

  reloadOnChange(path, value) {
    console.log("reloadOnChange: ", path, value);
    if (value !== undefined) {
      const nextValues = Object.assign({}, this.state.values);
      JsonPointer.set(nextValues, path, value);
      this.setState({values: nextValues});
    }
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
    const selectLoadOptions = (params, callback) => {
      const {input, entity, query} = params;
      setTimeout(() => {
        const options = [
          { value: 'one', label: 'One' },
          { value: 'two', label: 'Two' },
          { value: input, label: input },
        ];
        console.log('selectLoadOptions for ' + JSON.stringify(params) + ' - ' + JSON.stringify(options));
        callback(null, {
          options: options,
          // CAREFUL! Only set this to true when there are no more options,
          // or more specific queries will not be sent to the server.
          complete: false
        });
      }, 500);
    };

    const selectLoadGithubUsers = (params, callback) => {
      const {input, entity, query} = params;
      fetch('https://api.github.com/search/users?q=' + (input || 'a'))
        .then(response => {
          return response.json().then(json => {
            const options = [];
            json.items.forEach(x => {
              options.push({value: x.id, label: x.login})
            });
            callback(null, {
              options: options,
              // CAREFUL! Only set this to true when there are no more options,
              // or more specific queries will not be sent to the server.
              complete: false
            });
          });
        });
    };

    const selectLoadBe5Query = (params, callback) => {
      const {input, entity, query} = params;
      fetch('http://localhost:8888/api/table?_en_=customers&_qn_=***%20Selection%20view%20***&_params_=' +
        '%7B%22asyncValue%22%3A%22' + input + '%22%7D&_ts_=1556103737910')
        .then(response => {
          return response.json().then(json => {
            const options = [];
            json.data.attributes.rows.forEach(x => {
              options.push({value: x.cells[0].content, label: x.cells[1].content})
            });

            callback(null, {
              options: options,
              // CAREFUL! Only set this to true when there are no more options,
              // or more specific queries will not be sent to the server.
              complete: false
            });
          });
        });
    };

    return (
      <form onSubmit={this.handleSubmit} className={classNames("bs-example", {"was-validated" : this.state.wasValidated})}>
        <PropertySet
          bean={this.getBean()}
          values={this.state.values}
          onChange={this.handleFieldChange}
          reloadOnChange={this.reloadOnChange}
          bsSize={this.state.bsSize}
          horizontal={this.state.horizontal}
          selectLoadOptions={selectLoadBe5Query}
        />
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
                <label htmlFor="horizontal" className="form-check-label">
                  <input
                    id="horizontal"
                    type="checkbox"
                    className="form-check-input"
                    onChange={()=>{
                      this.state.cookies.set('horizontal', !this.state.horizontal, { path: '/' });
                      this.setState({horizontal: !this.state.horizontal});
                    }}
                    checked={this.state.horizontal === true}
                  />
                  horizontal
                </label>
              </div>
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
      bean: testOuter,
      values: testOuter.values
    };
  }
}

class Validation extends AllPropertyTypes
{
  constructor(props) {
    super(props);

    this.state = {
      bean: validationTest,
      values: validationTest.values
    };
  }
}

class DevForm extends AllPropertyTypes
{
  constructor(props) {
    super(props);

    this.state = {
      bean: devJson,
      values: devJson.values
    };
  }
}

class InlineForm extends AllPropertyTypes
{
  constructor(props) {
    super(props);

    this.state = {
      bean: layout1,
      values: layout1.values
    };
  }

  getForm() {
    const commonProps = {
      bean: this.getBean(),
      onChange: this.handleFieldChange,
      reloadOnChange: this.reloadOnChange,
      inline: true,
      rowClass:"d-flex",
    };

    const properties = commonProps.bean.order.map(p => (
      <Property key={p} path={p} {...commonProps} bsSize={this.state.bsSize}/>
    ));

    const commonProps2 = {
      bean: layout2,
      onChange: this.handleFieldChange,
      reloadOnChange: this.reloadOnChange,
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
            <li className="nav-item"><NavLink to="/dev" className="nav-link" >Dev</NavLink></li>
          </ul>
          <br/>
          <Route exact path="/" component={AllPropertyTypes}/>
          <Route path="/outer" component={PropertyOuter}/>
          <Route path="/validation" component={Validation}/>
          <Route path="/inlineForm" component={InlineForm}/>
          <Route path="/dev" component={DevForm}/>
          <br/><br/><br/><br/>
        </div>
      </div>
    </div>
  </HashRouter>
);

export default ExampleApp;
