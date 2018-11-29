import React from 'react';
import PropertyInput from '../src/components/PropertyInput';
import {mount, render, shallow} from 'enzyme';
import bean from '../src/testJson.json';

test('radioButtons change', () => {
  const handle = jest.fn();

  const wrapper = mount(
    <PropertyInput path={"/radioButtons"} bean={bean} onChange={handle}/>
  );

  wrapper.find('#radioButtonsPropertyInputRadio0').simulate('change',{ target: { checked: true } });
  expect(handle.mock.calls[0]).toEqual(["/radioButtons", "vanilla"]);

  wrapper.find('#radioButtonsPropertyInputRadio1').simulate('change',{ target: { checked: false } });
  expect(handle.mock.calls[1]).toEqual(["/radioButtons", "chocolate"]);
});

test('radioButtonsMultiSelect change', () => {
  const handle = jest.fn();

  const wrapper = mount(
    <PropertyInput path={"/radioButtonsMultiSelect"} bean={bean} onChange={handle}/>
  );

  wrapper.find('#radioButtonsMultiSelectPropertyInputRadio0').simulate('change',{ target: { checked: true } });
  expect(handle.mock.calls[0]).toEqual(["/radioButtonsMultiSelect", ["chocolate", "strawberry", "vanilla"]]);

  wrapper.find('#radioButtonsMultiSelectPropertyInputRadio1').simulate('change',{ target: { checked: false } });
  expect(handle.mock.calls[1]).toEqual(["/radioButtonsMultiSelect", ["strawberry"]]);
});
