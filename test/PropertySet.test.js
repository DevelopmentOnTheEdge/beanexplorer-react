import React from 'react';
import ReactDOM from 'react-dom';
import PropertySet from '../src/components/PropertySet';
import renderer from 'react-test-renderer';

it('simple property set', () => {
	var fields = {
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
	var fields = {
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
