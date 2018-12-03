import React from 'react';
import PropertyInput from '../src/components/PropertyInput';
import {mount, render, shallow} from 'enzyme';
import bean from '../src/testJson.json';

test('radioButtons change', () => {
  const handle = jest.fn();
  const reloadHandle = jest.fn();

  const wrapper = mount(
    <PropertyInput path={"/radioButtons"} bean={bean} onChange={handle} reloadOnChange={reloadHandle}/>
  );

  wrapper.find('#radioButtonsPropertyInputRadio0').simulate('change',{ target: { checked: true } });
  expect(reloadHandle.mock.calls[0]).toEqual(["/radioButtons", "vanilla"]);

  wrapper.find('#radioButtonsPropertyInputRadio1').simulate('change',{ target: { checked: false } });
  expect(reloadHandle.mock.calls[1]).toEqual(["/radioButtons", "chocolate"]);

  expect(handle.mock.calls.length).toEqual(0);
});

test('radioButtonsMultiSelect change', () => {
  const handle = jest.fn();
  const reloadHandle = jest.fn();

  const wrapper = mount(
    <PropertyInput path={"/radioButtonsMultiSelect"} bean={bean} onChange={handle} reloadOnChange={reloadHandle}/>
  );

  wrapper.find('#radioButtonsMultiSelectPropertyInputRadio0').simulate('change',{ target: { checked: true } });
  expect(reloadHandle.mock.calls[0]).toEqual(["/radioButtonsMultiSelect", ["chocolate", "strawberry", "vanilla"]]);

  wrapper.find('#radioButtonsMultiSelectPropertyInputRadio1').simulate('change',{ target: { checked: false } });
  expect(reloadHandle.mock.calls[1]).toEqual(["/radioButtonsMultiSelect", ["strawberry"]]);

  expect(handle.mock.calls.length).toEqual(0);
});
