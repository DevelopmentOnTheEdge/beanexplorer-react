import React from 'react';
import PropertySet from '../src/components/PropertySet';
import renderer from 'react-test-renderer';
import {shallow, mount, render} from 'enzyme';
import bean from './testJson.json';


it('renders without crashing', () => {
	const handle = jest.fn();

	mount(<PropertySet bean={bean} onChange={handle}/>);
});

it('renders without crashing readOnly', () => {
	for(let item in bean.meta) {
    bean.meta[item]['readOnly'] = true;
	}

	const handle = jest.fn();

	mount(<PropertySet bean={bean} onChange={handle}/>);
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
