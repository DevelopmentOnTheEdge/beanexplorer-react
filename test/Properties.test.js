import React from 'react';
import Properties from '../src/components/Properties';
import renderer from 'react-test-renderer';
import {shallow, mount, render} from 'enzyme';
import bean from './testJson.json';


it('contain property', () => {
	const component = renderer.create(
    <Properties bean={bean} ids={[0,1]}/>
  );
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

it('not contain property', () => {
    const component = renderer.create(
        <Properties bean={bean} ids={[1000000]}/>
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
});


