import React from 'react';
import PropertyInput from '../src/components/PropertyInput';
import {shallow, mount, render} from 'enzyme';
import bean from '../src/testJson.json';
import validationTest from '../src/validationTest.json';
import WYSIWYGPropertyInput from "../src/components/inputs/WYSIWYGPropertyInput";
import SelectPropertyInput from "../src/components/inputs/SelectPropertyInput";
import DateTimePropertyInput from "../src/components/inputs/DateTimePropertyInput";


test('checkBox', () => {
  const handle = jest.fn();

  const wrapper = mount(
    <PropertyInput path={"/checkBox"} bean={bean} reloadOnChange={handle} />
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

  wrapper.find('input').simulate('change', {target: {value: ''}});
  expect(handle.mock.calls[1]).toEqual(["/textInput", ""]);

});

test('textInputWithPatternAndMessage', () => {
  const handle = jest.fn();

  const spy = jest.spyOn(PropertyInput.prototype, "patternValidationMessage");
  let wrapper = mount(
    <PropertyInput path={"/textInputWithPatternAndMessage"} bean={validationTest} />
  );

  wrapper.find('input').simulate('input', {target: {setCustomValidity: handle, validity: {patternMismatch: true}}});
  expect(spy.mock.calls.length).toEqual(1);
  expect(handle.mock.calls[0]).toEqual(["Enter 3 digits."]);

  wrapper.find('input').simulate('input', {target: {setCustomValidity: handle, validity: {}}});
  expect(spy.mock.calls.length).toEqual(2);
  expect(handle.mock.calls[1]).toEqual([""]);

  wrapper = mount(
    <PropertyInput path={"/textInputWithPattern"} bean={validationTest} />
  );

  wrapper.find('input').simulate('input', {target: {setCustomValidity: handle, validity: {patternMismatch: true}}});
  expect(spy.mock.calls.length).toEqual(3);
  expect(handle.mock.calls.length).toEqual(2);
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

test('date dateValidationMessage', () => {
  const handle = jest.fn();

  const wrapper = shallow(
    <DateTimePropertyInput path={"/date"} bean={bean} onChange={handle} />
  );

  wrapper.instance().dateValidationMessage(
    {target:{value: '20.07.2012', setCustomValidity: handle, validity: {patternMismatch: true}}});

  expect(handle.mock.calls[0]).toEqual(["Please enter a valid date in the format dd.mm.yyyy"]);

  wrapper.instance().dateValidationMessage(
    {target:{setCustomValidity: handle, validity: {patternMismatch: false}}});

  expect(handle.mock.calls[1]).toEqual([""]);

  expect(handle.mock.calls.length).toEqual(2);
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

test('timestamp', () => {
  const handle = jest.fn();

  const wrapper = mount(
    <PropertyInput path={"/timestamp"} bean={bean} onChange={handle} />
  );

  wrapper.find('input').simulate('change', {target: {value: '20.07.2017 17:05'}});
  expect(handle.mock.calls[0]).toEqual(["/timestamp", "2017-07-20 17:05:00.000"]);


  wrapper.find('input').simulate('change', {target: {value: ''}});
  expect(handle.mock.calls[1]).toEqual(["/timestamp", ""]);


  wrapper.find('input').simulate('change', {target: {value: '20.07.20 17:05'}});
  expect(handle.mock.calls[2]).toEqual(["/timestamp", "20.07.20 17:05"]);

  expect(handle.mock.calls.length).toEqual(3);
});

test('timestamp timestampValidationMessage', () => {
  const handle = jest.fn();

  const wrapper = shallow(
    <DateTimePropertyInput path={"/timestamp"} bean={bean} onChange={handle} />
  );

  wrapper.instance().timestampValidationMessage(
    {target:{value: '20.07.2012 17:05', setCustomValidity: handle, validity: {patternMismatch: true}}});

  expect(handle.mock.calls[0]).toEqual(["Please enter a valid date with time in the format dd.mm.yyyy hh:mm"]);

  wrapper.instance().timestampValidationMessage(
    {target:{setCustomValidity: handle, validity: {patternMismatch: false}}});

  expect(handle.mock.calls[1]).toEqual([""]);

  expect(handle.mock.calls.length).toEqual(2);
});

test('3 Fractional seconds digits', () => {
  const simpleBean = {
    "values": { "timestamp": "2017-07-20 17:05:00.333" },
    "meta":   { "/timestamp": {"type": "Timestamp"} },
    "order":  [ "/timestamp" ]
  };
  const wrapper = mount(<PropertyInput path={"/timestamp"} bean={simpleBean} />);
  const input = wrapper.find('input');

  expect(input.get(0).value).toEqual('20.07.2017 17:05');
});

test('2 Fractional seconds digits', () => {
  const simpleBean = {
    "values": { "timestamp": "2017-07-20 17:05:00.22" },
    "meta":   { "/timestamp": {"type": "Timestamp"} },
    "order":  [ "/timestamp" ]
  };
  const wrapper = mount(<PropertyInput path={"/timestamp"} bean={simpleBean} />);
  const input = wrapper.find('input');

  expect(input.get(0).value).toEqual('20.07.2017 17:05');
});

test('1 Fractional seconds digits', () => {
  const simpleBean = {
    "values": { "timestamp": "2017-07-20 17:05:00.1" },
    "meta":   { "/timestamp": {"type": "Timestamp"} },
    "order":  [ "/timestamp" ]
  };
  const wrapper = mount(<PropertyInput path={"/timestamp"} bean={simpleBean} />);
  const input = wrapper.find('input');

  expect(input.get(0).value).toEqual('20.07.2017 17:05');
});

test('timestamp init with no valid timestamp', () => {
  const simpleBean = {
    "values": { "timestamp": "no timestamp" },
    "meta":   { "/timestamp": {"type": "Timestamp"} },
    "order":  [ "/timestamp" ]
  };
  const wrapper = mount(<PropertyInput path={"/timestamp"} bean={simpleBean} />);
  const input = wrapper.find('input');

  expect(input.get(0).value).toEqual('no timestamp');
});

test('file', () => {
  const handle = jest.fn();//jest.fn((path, value) => { console.log(path, value); });

  const wrapper = mount(
    <PropertyInput path={"/file"} bean={bean} onChange={handle} />
  );

  const fileContents       = 'file contents';
  // const file               = new Blob([fileContents], {type : 'text/plain'});
  const readAsText         = jest.fn();
  const addEventListener   = jest.fn((_, evtHandler) => { evtHandler(); });
  const dummyFileReader    = {addEventListener, readAsText, result: fileContents};
  window.FileReader        = jest.fn(() => dummyFileReader);

  wrapper.find('input').simulate('change', {target: {files: ['dummyValue.something']}});

  expect(addEventListener.mock.calls[0]).toEqual(["load", expect.any(Function), false]);

  wrapper.find('input').simulate('change', {target: {files: []}});

  expect(handle.mock.calls[0]).toEqual(["/file", ""]);
});

test('multiSelect test', () => {
  const handle = jest.fn();
  const reloadHandle = jest.fn();

  const wrapper = mount(
    <SelectPropertyInput path={"/multiSelect"} bean={bean} onChange={handle} reloadOnChange={reloadHandle}/>
  );

  wrapper.instance().handleChangeSelect(null);
  expect(reloadHandle.mock.calls[0]).toEqual(["/multiSelect", ""]);

  wrapper.instance().handleChangeSelect({"value": "test"});
  expect(reloadHandle.mock.calls[1]).toEqual(["/multiSelect", "test"]);

  wrapper.instance().handleChangeSelect([{"value": "test"},{"value": "test2"}]);
  expect(reloadHandle.mock.calls[2]).toEqual(["/multiSelect", ["test", "test2"]]);

  expect(handle.mock.calls.length).toEqual(0);
});

test('updateCkeditor', () => {
  const setData = jest.fn();
  const setReadOnly = jest.fn();

  WYSIWYGPropertyInput.updateCkeditor({editorInstance: {
    setReadOnly: setReadOnly,
    setData: setData,
    getData: () => {return 'test'}}}, "test2", true);

  expect(setData.mock.calls[0]).toEqual(["test2"]);
  expect(setReadOnly.mock.calls[0]).toEqual([true]);

  WYSIWYGPropertyInput.updateCkeditor({editorInstance: {
    setReadOnly: setReadOnly,
    setData: setData,
    getData: () => {return 'test'}}}, "test", true);

  expect(setData.mock.calls.length).toEqual(1);
  expect(setReadOnly.mock.calls[1]).toEqual([true]);
});

test('test change path', () => {
  const handle = jest.fn();

  const wrapper = mount(
    <PropertyInput path={"/textInput"} bean={bean} onChange={handle} />
  );

  expect(wrapper.instance().getMeta()).toEqual({"displayName": "Text input"});

  wrapper.setProps({ path: "/number" });

  expect(wrapper.instance().getMeta()).toEqual({"displayName": "Number", "type": "Integer"});
});

test('getCorrectMulValue', () => {
  const simpleBean = {
    "values": { "select": "" },
    "meta":   { "/select": {
      "multipleSelectionList": true,
      "tagList": [["vanilla","Vanilla"],["chocolate","Chocolate"]]
    }},
    "order":  [ "/select" ]
  };
  const wrapper = mount(<PropertyInput path={"/select"} bean={simpleBean} />);
  expect(wrapper.instance().getCorrectMulValue()).toEqual([]);
});

test('getCorrectMulValue single value', () => {
  const simpleBean = {
    "values": { "select": "value" },
    "meta":   { "/select": {
      "multipleSelectionList": true,
      "tagList": [["vanilla","Vanilla"],["chocolate","Chocolate"]]
    }},
    "order":  [ "/select" ]
  };
  const wrapper = mount(<PropertyInput path={"/select"} bean={simpleBean} />);
  expect(wrapper.instance().getCorrectMulValue()).toEqual(["value"]);
});
