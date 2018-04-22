import React from 'react';
import './setupTests.js'
import Property from '../src/components/Property';
import {configure, mount} from 'enzyme';
import bean from '../src/testJson.json';

test('get by id', () => {
  const handle = jest.fn();

  const wrapper = mount(
    <Property id={0} bean={bean} onChange={handle} />
  );

  expect(wrapper.instance().getPath()).toEqual('/textInput');
});