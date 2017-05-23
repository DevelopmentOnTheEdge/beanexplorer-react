import React from 'react';
import ReactDOM from 'react-dom';
import Property from '../src/components/Property';
import renderer from 'react-test-renderer';

var item = "/testName"
var itemName = item.substring(item.lastIndexOf("/")+1);

it('simple property', () => {
	var itemMeta = {"displayName": "Combo Box",
									"type": "comboBox",
									"canBeNull": true,
									"options": [{"value":"bar","text":"foo"}, {"value":"bar2","text":"foo 2"}]};
	var itemValue = "testValue";

	const component = renderer.create(
    <Property meta={itemMeta} name={itemName} value={itemValue} path={item}
    													  key={itemName}  />
  );
  let tree = component.toJSON();
	expect(tree).toMatchSnapshot();
});
