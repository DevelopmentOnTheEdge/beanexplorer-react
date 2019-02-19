import React from 'react';
import Property from '../src/components/Property';
import renderer from 'react-test-renderer';
import NumberPropertyInput from "../src/components/inputs/NumberPropertyInput";
import {registerPropertyInput, getAllPropertyInputs} from "../src/components/propertyInputRegister";


class NumberInputGroup extends NumberPropertyInput {
  render () {
    return (
      <div>
        <div className="input-group mb-3">
          <div className="input-group-prepend">
            <span className="input-group-text">$</span>
          </div>
          {super.render()}
          <div className="input-group-append">
            <span className="input-group-text">.00</span>
          </div>
        </div>
      </div>
    )
  }
}

test('get by id', () => {
  registerPropertyInput('NumberInputGroup', NumberInputGroup);
  const bean = {
    "values": { "input": "no date" },
    "meta":   { "/input": {"type": "Date", "extraAttrs": [["inputType", "NumberInputGroup"]]} },
    "order":  [ "/input" ]
  };

  const component = renderer.create(
    <Property id={0} bean={bean} onChange={undefined} value={"test"}/>
  );
  expect(component.toJSON()).toMatchSnapshot();
  expect(getAllPropertyInputs()).toEqual(['NumberInputGroup']);
});
