import React from 'react';
import PropertySet from '../src/components/PropertySet';
import renderer from 'react-test-renderer';
import {shallow, mount, render} from 'enzyme';
import bean from '../src/testJson.json';

//https://github.com/YouCanBookMe/react-datetime/issues/384
jest.mock('react-dom', () => ({
  findDOMNode: () => {},
}));

it('renders without crashing', () => {

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

it('renders without crashing readOnly', () => {
  for(let item in bean.meta) {
    bean.meta[item]['readOnly'] = true;
  }

  mount(<PropertySet bean={bean}/>);
});

it('renders without crashing empty value', () => {
  for(let item in bean.value) {
    bean.value[item] = "";
  }

  mount(<PropertySet bean={bean}/>);
});

it('simple property set', () => {
	const simpleBean = {
    "values": {
      "number": "",
    },
    "meta": {
      "/number": {},
    },
    "order": [
      "/number",
    ]
	};

	const component = renderer.create(
    <PropertySet bean={simpleBean} />
  );
  expect(component.toJSON()).toMatchSnapshot();
});

it('empty property set', () => {
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
