import React from 'react';
import PropertyInput from '../../src/components/PropertyInput';
import {shallow, mount, render} from 'enzyme';
import bean from '../../src/testJson.json';
import validationTest from '../../src/validationTest.json';
import NumberPropertyInput from "../../src/components/inputs/NumberPropertyInput";


test('textInputWithPatternAndMessage numbers', () => {
  const handle = jest.fn();

  const spy = jest.spyOn(NumberPropertyInput.prototype, "numberValidation");
  const wrapper = mount(
    <PropertyInput path={"/number"} bean={bean} />
  );

  wrapper.find('input').simulate('input', {target: {value: "1", setCustomValidity: handle}});
  expect(spy.mock.calls.length).toEqual(1);
  expect(handle.mock.calls[0]).toEqual([""]);

  wrapper.find('input').simulate('input', {target: {value: "", setCustomValidity: handle}});
  expect(handle.mock.calls[1]).toEqual([""]);

  wrapper.find('input').simulate('input', {target: {value: "a", setCustomValidity: handle}});
  expect(handle.mock.calls[2]).toEqual(["Enter the number."]);

  wrapper.find('input').simulate('input', {target: {value: "2147483648", setCustomValidity: handle}});
  expect(handle.mock.calls[3]).toEqual(["The value must be less than or equal to 2147483647."]);

  wrapper.find('input').simulate('input', {target: {value: "-2147483649", setCustomValidity: handle}});
  expect(handle.mock.calls[4]).toEqual(["The value must be greater than or equal to -2147483648."]);

  wrapper.find('input').simulate('input', {target: {value: "1.1", setCustomValidity: handle}});
  expect(handle.mock.calls[5]).toEqual(["Please enter a valid value. The closest allowed values are 1 and 2."]);

  wrapper.find('input').simulate('input', {target: {value: "1.1e2", setCustomValidity: handle}});
  expect(handle.mock.calls[6]).toEqual(["\"E\" is not supported for simple integer types."]);

  wrapper.setProps({bean: validationTest, path: "/short"});

  ["/short","/integer","/long","/double","/doubleWithRangeAndStep","/integerWithRangeAndStep",].forEach(function(path) {
    wrapper.setProps({path: path});
    wrapper.find('input').simulate('input', {target: {value: "1", setCustomValidity: handle}});
  });
  expect(spy.mock.calls.length).toEqual(13);
  expect(handle.mock.calls.length).toEqual(13);
});
