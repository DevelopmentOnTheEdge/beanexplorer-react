import React from 'react';
import Property from '../src/components/Property';
import renderer from 'react-test-renderer';
import {shallow} from 'enzyme';

const item = "/testName";
const itemName = item.substring(item.lastIndexOf("/")+1);
const itemValue = "testValue";


test('simple property', () => {

});
