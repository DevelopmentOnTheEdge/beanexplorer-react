import React from 'react';
import PropertyInput from '../src/components/PropertyInput';
import {shallow, mount, render} from 'enzyme';
import bean from '../src/testJson.json';


test('checkBox', () => {
  const handle = jest.fn();

  const wrapper = mount(
    <PropertyInput path={"/checkBox"} bean={bean} onChange={handle} />
  );

  wrapper.find('input').simulate('change');

  expect(handle.mock.calls[0]).toEqual(["/checkBox", true]);
});

test('textInput', () => {
  const handle = jest.fn();

  const wrapper = mount(
    <PropertyInput path={"/textInput"} bean={bean} onChange={handle} />
  );

  wrapper.find('input').simulate('change', {target: {value: 'newValue'}});
  expect(handle.mock.calls[0]).toEqual(["/textInput", "newValue"]);

});

test('get by id', () => {
  const handle = jest.fn();

  const wrapper = mount(
    <PropertyInput id={0} bean={bean} onChange={handle} />
  );

  expect(wrapper.instance().getPath()).toEqual('/textInput');
});

test('date', () => {
  const handle = jest.fn();

  const wrapper = mount(
    <PropertyInput path={"/date"} bean={bean} onChange={handle} />
  );

  wrapper.find('input').simulate('change', {target: {value: '20.07.2017'}});
  expect(handle.mock.calls[0]).toEqual(["/date", "2017-07-20"]);


  wrapper.find('input').simulate('change', {target: {value: ''}});
  expect(handle.mock.calls[1]).toEqual(["/date", ""]);


  wrapper.find('input').simulate('change', {target: {value: '20.07.20'}});
  expect(handle.mock.calls[2]).toEqual(["/date", "20.07.20"]);

  expect(handle.mock.calls.length).toEqual(3);
});

test('date init with no valid date', () => {
  const simpleBean = {
    "values": { "date": "no date" },
    "meta":   { "/date": {"type": "Date"} },
    "order":  [ "/date" ]
  };
  const wrapper = mount(<PropertyInput path={"/date"} bean={simpleBean} />);
  const input = wrapper.find('input');

  expect(input.get(0).value).toEqual('no date');
});
