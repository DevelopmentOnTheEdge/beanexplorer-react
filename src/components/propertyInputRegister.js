const propertyInputs = {};

export const getPropertyInput = (name) => {
  return propertyInputs[name];
};

export const registerPropertyInput = (name, fn) => {
  propertyInputs[name] = fn;
};

export const getAllPropertyInputs = () => {
  return Object.keys(propertyInputs);
};
