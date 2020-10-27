import React from 'react';
import PropertyInput from '../../src/components/PropertyInput';
import {mount, render, shallow} from 'enzyme';
import bean from '../../src/testJson.json';

test('radioButtons change', () => {
  const handle = jest.fn();
  const reloadHandle = jest.fn();

  const wrapper = mount(
    <PropertyInput path={"/radioButtons"} bean={bean} onChange={handle} reloadOnChange={reloadHandle}
                   value={"chocolate"}/>
  );

  wrapper.find('#radioButtonsPropertyInput_option0').simulate('change',{ target: { checked: true } });
  expect(reloadHandle.mock.calls[0]).toEqual(["/radioButtons", "vanilla"]);

  wrapper.find('#radioButtonsPropertyInput_option1').simulate('change',{ target: { checked: false } });
  expect(reloadHandle.mock.calls[1]).toEqual(["/radioButtons", "chocolate"]);

  expect(handle.mock.calls.length).toEqual(0);
});

test('multiSelectViaCheckboxes change', () => {
  const handle = jest.fn();
  const reloadHandle = jest.fn();

  const wrapper = mount(
    <PropertyInput path={"/multiSelectViaCheckboxes"} bean={bean} onChange={handle} reloadOnChange={reloadHandle}
                   value={["chocolate", "strawberry"]}/>
  );

  wrapper.find('#multiSelectViaCheckboxesPropertyInput_option0').simulate('change',{ target: { checked: true } });
  expect(reloadHandle.mock.calls[0]).toEqual(["/multiSelectViaCheckboxes", ["chocolate", "strawberry", "vanilla"]]);

  wrapper.find('#multiSelectViaCheckboxesPropertyInput_option1').simulate('change',{ target: { checked: false } });
  expect(reloadHandle.mock.calls[1]).toEqual(["/multiSelectViaCheckboxes", ["strawberry"]]);

  expect(handle.mock.calls.length).toEqual(0);
});
