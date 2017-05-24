import React from 'react';
import PropertySet from '../src/components/PropertySet';
import renderer from 'react-test-renderer';
import {shallow} from 'enzyme';

it('renders without crashing', () => {
	const testJson = require('../src/testJson.json');
	const handle = jest.fn();


	shallow(<PropertySet fields={testJson} onChange={handle}/>);
});

it('renders without crashing readOnly', () => {
	const fields = require('../src/testJson.json');
	for(let item in fields.meta) {
		fields.meta[item]['readOnly'] = true;
	}

	const handle = jest.fn();

	shallow(<PropertySet fields={fields} onChange={handle}/>);
});

it('simple property set', () => {
	const fields = {
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
    <PropertySet fields={fields} />
  );
  let tree = component.toJSON();
	expect(tree).toMatchSnapshot();
});

it('empty property set', () => {
	const fields = {
		 "values": {},
		 "meta": {},
		 "order": []
	};

	const component = renderer.create(
    <PropertySet fields={fields} />
  );
  let tree = component.toJSON();
	expect(tree).toMatchSnapshot();
});
