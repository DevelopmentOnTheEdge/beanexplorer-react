import React from 'react';
import PropertySet from '../src/components/PropertySet';
import renderer from 'react-test-renderer';
import {mount, render} from 'enzyme';
import bean from '../src/testJson.json';
import testOuter from '../src/testOuter.json';
import validationTest from '../src/validationTest.json';
import layout1 from '../src/layout1.json';
import layout2 from '../src/layout2.json';
import JsonPointer   from 'json-pointer';
//https://github.com/YouCanBookMe/react-datetime/issues/384
jest.mock('react-dom', () => ({
  findDOMNode: () => {},
}));

test('renders without crashing bean ', () => {

  mount(<PropertySet bean={bean}/>);

  mount(<PropertySet bean={bean} bsSize="sm"/>);
  mount(<PropertySet bean={bean} bsSize="lg"/>);

});

// class TestForm extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {bean: props.bean};
//     this.handle = this.handle.bind(this);
//   }
//
//   handle(path, value) {
//     console.log("onChange: ", path, value);
//
//     JsonPointer.set(this.state.bean, "/values" + path, value);
//     this.setState({
//       bean: Object.assign({}, this.state.bean)
//     });
//   }
//
//   render(){
//     return <PropertySet bean={this.state.bean} onChange={this.handle} />
//   }
// }
//
// test('TestForm', () => {
//   //const handle = jest.fn();
//
//   const newBean = Object.assign({}, bean);
//
//   const handle = function (path, value) {
//     JsonPointer.set(newBean, "/values" + path, value);
//   };
//
//   const wrapper = mount(
//     <TestForm bean={bean}/>
//   );
//
//   wrapper.find('#textInputPropertyInput').simulate('change', {target: {value: 'newValue'}});
//   // expect(handle.mock.calls[0]).toEqual(["/textInput", "newValue"]);
//   //
//   // wrapper.find('input').simulate('change', {target: {value: ''}});
//   // expect(handle.mock.calls[1]).toEqual(["/textInput", ""]);
//
// });

test('snapshot bean', () => {
  const component = renderer.create(
    <PropertySet bean={bean} />
  );
  expect(component.toJSON()).toMatchSnapshot();
});

test('snapshot bean horizontal', () => {
  const component = renderer.create(
    <PropertySet bean={bean} horizontal/>
  );
  expect(component.toJSON()).toMatchSnapshot();
});

test('snapshot bean with readOnly', () => {
  for(let item in bean.meta) {
    bean.meta[item]['readOnly'] = true;
  }

  const component = renderer.create(
    <PropertySet bean={bean} />
  );
  expect(component.toJSON()).toMatchSnapshot();
});

test('renders without crashing empty value', () => {
  for(let item in bean.value) {
    bean.value[item] = "";
  }

  mount(<PropertySet bean={bean}/>);
});

test('test outer', () => {
  const component = renderer.create(
    <PropertySet bean={testOuter} />
  );
  expect(component.toJSON()).toMatchSnapshot();
});

test('validationTest', () => {
  const component = renderer.create(
    <PropertySet bean={validationTest} />
  );
  expect(component.toJSON()).toMatchSnapshot();
});

test('inline layout1', () => {
  const component = renderer.create(
    <PropertySet bean={layout1} inline rowClass="" />
  );
  expect(component.toJSON()).toMatchSnapshot();

  //renders without crashing
  mount(<PropertySet bean={layout1} inline rowClass="" bsSize="sm"/>);
  mount(<PropertySet bean={layout1} inline rowClass="" bsSize="lg"/>);
});

test('inline layout2', () => {
  const component = renderer.create(
    <PropertySet bean={layout2} inline rowClass="" />
  );
  expect(component.toJSON()).toMatchSnapshot();
});

test('simple property set', () => {
    const simpleBean = {
    "values": { "number": "" },
    "meta":   { "/number": {} },
    "order":  [ "/number" ]
    };

    const component = renderer.create(
    <PropertySet bean={simpleBean} />
  );
  expect(component.toJSON()).toMatchSnapshot();
});

test('empty property set', () => {
    const emptyBean = {
         "values": {},
         "meta": {},
         "order": []
    };

    const component = renderer.create(
    <PropertySet bean={emptyBean} />
  );
  expect(component.toJSON()).toMatchSnapshot();
});

test('horizontal cssClass', () => {
    const simpleBean = {
      "values": { "select": "value" },
      "meta":   { "/select": {
        "cssClasses": "col-lg-6",
      }},
      "order":  [ "/select" ]
    };

    const component = renderer.create(
    <PropertySet bean={simpleBean} horizontal col-lg-6/>
  );
  expect(component.toJSON()).toMatchSnapshot();
});
