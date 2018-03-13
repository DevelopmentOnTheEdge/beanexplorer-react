import React from 'react';
import PropertySet from '../src/components/PropertySet';
import renderer from 'react-test-renderer';
import {shallow, mount, render} from 'enzyme';
import bean from '../src/testJson.json';
import testOuter from '../src/testOuter.json';
import validationTest from '../src/validationTest.json';
import layout1 from '../src/layout1.json';
import layout2 from '../src/layout2.json';

//https://github.com/YouCanBookMe/react-datetime/issues/384
jest.mock('react-dom', () => ({
  findDOMNode: () => {},
}));

test('renders without crashing', () => {

	mount(<PropertySet bean={bean}/>);

  const beanForSnapshot = Object.assign({}, bean);

  let index = beanForSnapshot.order.indexOf("/number");
  beanForSnapshot.order.splice(index, 1);

  // index = beanForSnapshot.order.indexOf("/date");
  // beanForSnapshot.order.splice(index, 1);

  const component = renderer.create(
    <PropertySet bean={bean} />
  );
  expect(component.toJSON()).toMatchSnapshot();
});

test('renders without crashing readOnly', () => {
  for(let item in bean.meta) {
    bean.meta[item]['readOnly'] = true;
  }

  mount(<PropertySet bean={bean}/>);
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
