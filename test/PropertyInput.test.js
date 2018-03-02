import React from 'react';
import PropertyInput from '../src/components/PropertyInput';
import {shallow} from 'enzyme';
import bean from '../src/testJson.json';

test('input', () => {

});
// test('input', () => {
//   const handle = jest.fn();
//
//   let component = renderer.create(
//     <PropertyInput path={"/textInput"} bean={bean} onChange={handle} />
//   );
//
//   expect(component.toJSON()).toMatchSnapshot();
//
//   bean.values.textInput = "";
//
//   component = renderer.create(
//     <PropertyInput path={"/textInput"} bean={bean} onChange={handle} />
//   );
//
//   expect(component.toJSON()).toMatchSnapshot();
// });
//
// /*
//   tests for select
// */
//
// test('select', () => {
//   const handle = jest.fn();
//
//   let component = renderer.create(
//     <PropertyInput path={"/select"} bean={bean} onChange={handle} />
//   );
//
//   expect(component.toJSON()).toMatchSnapshot();
//
//   //check for null values
//   bean.values.select = "";
//   component = renderer.create(
//     <PropertyInput path={"/select"} bean={bean} onChange={handle} />
//   );
//
//   expect(component.toJSON()).toMatchSnapshot();
//
//   //check for valid values
//   bean.values.select = "watermelon";
//   component = renderer.create(
//     <PropertyInput path={"/select"} bean={bean} onChange={handle} />
//   );
//
//   expect(component.toJSON()).toMatchSnapshot();
// });
//
// /*
//   tests for multiSelect
// */
//
// test('multiSelect', () => {
//   const handle = jest.fn();
//
//   let component = renderer.create(
//     <PropertyInput path={"/multiSelect"} bean={bean} onChange={handle} />
//   );
//
//   expect(component.toJSON()).toMatchSnapshot();
// });
//
// /*
//   tests for description
// */
//
// test('Description', () => {
//   const handle = jest.fn();
//
//   let component = renderer.create(
//     <PropertyInput path={"/description"} bean={bean} onChange={handle} />
//   );
//
//   expect(component.toJSON()).toMatchSnapshot();
// });
//
// /*
//   tests for passwordField
// */
//
// test('passwordField', () => {
//   const handle = jest.fn();
//
//   let component = renderer.create(
//     <PropertyInput path={"/pass"} bean={bean} onChange={handle} />
//   );
//
//   expect(component.toJSON()).toMatchSnapshot();
// });
//
// /*
//   tests for login
// */
//
// test('property login', () => {
//   const handle = jest.fn();
//
//   let component = renderer.create(
//     <PropertyInput path={"/login"} bean={bean} onChange={handle} />
//   );
//
//   expect(component.toJSON()).toMatchSnapshot();
// });
//
// test('property Boolean', () => {
//   const handle = jest.fn();
//
//   let component = renderer.create(
//     <PropertyInput path={"/agree"} bean={bean} onChange={handle} />
//   );
//
//   expect(component.toJSON()).toMatchSnapshot();
// });
//
// /*
//   tests for lableField
// */
//
// test('property labelField', () => {
//   const handle = jest.fn();
//
//   let component = renderer.create(
//     <PropertyInput path={"/label"} bean={bean} onChange={handle} />
//   );
//
//   expect(component.toJSON()).toMatchSnapshot();
// });
//
// test('property maskTest', () => {
//   const handle = jest.fn();
//
//   let component = renderer.create(
//     <PropertyInput path={"/maskInput"} bean={bean} onChange={handle} />
//   );
//
//   expect(component.toJSON()).toMatchSnapshot();
// });

//to do: не работает, выдает непонятную ошибку
// test('property data', () => {
//     
//
//     const handle = jest.fn();
//
//     let component = renderer.create(
//         <PropertyInput path={"/date"} bean={bean} onChange={handle} />
//     );
//
//     expect(component.toJSON()).toMatchSnapshot();
// });
