import React from 'react';
import Properties from '../src/components/Properties';
import renderer from 'react-test-renderer';
import bean from '../src/testJson.json';


test('contain property', () => {
	const component = renderer.create(
    <Properties bean={bean} ids={[0,15]}/>
  );
  expect(component.toJSON()).toMatchSnapshot();
});

test('not contain property', () => {
  const component = renderer.create(
    <Properties bean={bean} ids={[1000000]}/>
  );
  expect(component.toJSON()).toMatchSnapshot();
});


