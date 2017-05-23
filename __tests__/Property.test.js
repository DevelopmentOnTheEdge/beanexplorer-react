import React from 'react';
import ReactDOM from 'react-dom';
import Property from '../src/components/Property';
import renderer from 'react-test-renderer';
import {shallow} from 'enzyme';

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
    													  key={itemName} />
  );
  let tree = component.toJSON();
	expect(tree).toMatchSnapshot();
});

test('call callback after click', () => {
	var itemMeta = {
		"type": "checkBox",
	};
	var itemValue = "testValue";

	var myMock = jest.fn();

  const wrapper = shallow(
    <Property meta={itemMeta} name={itemName} value={itemValue} path={item}
        													  key={itemName} onChange={myMock} />
  );

  wrapper.find('input').simulate('change', { target: { checked: true } });

  expect(myMock.mock.calls.length).toBe(1);
  //TODO
  //expect(myMock.mock.calls[0]).toEqual(["/testName", true]);
});

test('call callback after set text', () => {
	var itemMeta = {};
	var itemValue = "testValue";

	var myMock = jest.fn();

  const wrapper = shallow(
    <Property meta={itemMeta} name={itemName} value={itemValue} path={item}
        													  key={itemName} onChange={myMock} />
  );

	wrapper.find('input').simulate('change', {target: {value: 'My new value'}});

  expect(myMock.mock.calls.length).toBe(1);
  //TODO why? value from prop can't be change
  expect(myMock.mock.calls[0]).toEqual(["/testName", "My new value"]);
});
