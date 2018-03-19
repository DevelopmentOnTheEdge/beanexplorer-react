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

  wrapper.find('input').simulate('change', {target: {value: ''}});
  expect(handle.mock.calls[1]).toEqual(["/textInput", ""]);

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

  wrapper.instance().dateValidation({target:{setCustomValidity: handle, validity: {patternMismatch: true}}});
  expect(handle.mock.calls[3]).toEqual(["Please enter a valid date in the format dd.mm.yyyy"]);

  wrapper.instance().dateValidation({target:{setCustomValidity: handle, validity: {patternMismatch: false}}});
  expect(handle.mock.calls[4]).toEqual([""]);
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

test('handleChangeSelect', () => {
  const handle = jest.fn();

  const wrapper = mount(
    <PropertyInput path={"/multiSelect"} bean={bean} onChange={handle} />
  );

  wrapper.instance().handleChangeSelect(null);
  expect(handle.mock.calls[0]).toEqual(["/multiSelect", ""]);

  wrapper.instance().handleChangeSelect({"value": "test"});
  expect(handle.mock.calls[1]).toEqual(["/multiSelect", "test"]);

  wrapper.instance().handleChangeSelect([{"value": "test"},{"value": "test2"}]);
  expect(handle.mock.calls[2]).toEqual(["/multiSelect", ["test", "test2"]]);
});

test('getValidationRulesMap test', () => {

  expect(PropertyInput.getValidationRulesMap([{"type":"step","attr":0.5},{"type":"range","attr":{"min":0,"max":1000}}]))
    .toEqual({"range": {"attr": {"max": 1000, "min": 0}}, "step": {"attr": 0.5}});

  expect(PropertyInput.getValidationRulesMap({"type":"step","attr":0.5}))
    .toEqual({"step": {"attr": 0.5}});

  expect(PropertyInput.getValidationRulesMap({"type":"pattern","attr":"\\d{3}", "customMessage":"Enter 3 digits."}))
    .toEqual({"pattern": {"attr": "\\d{3}", "customMessage": "Enter 3 digits."}});
});

test('updateCkeditor', () => {
  const setData = jest.fn();
  const setReadOnly = jest.fn();

  PropertyInput.updateCkeditor({editorInstance: {
    setReadOnly: setReadOnly,
    setData: setData,
    getData: () => {return 'test'}}}, "test2", true);

  expect(setData.mock.calls[0]).toEqual(["test2"]);
  expect(setReadOnly.mock.calls[0]).toEqual([true]);

  PropertyInput.updateCkeditor({editorInstance: {
    setReadOnly: setReadOnly,
    setData: setData,
    getData: () => {return 'test'}}}, "test", true);

  expect(setData.mock.calls.length).toEqual(1);
  expect(setReadOnly.mock.calls[1]).toEqual([true]);
});