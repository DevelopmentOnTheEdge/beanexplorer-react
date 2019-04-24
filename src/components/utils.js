import classNames from 'classnames';

export const inputLabelSizeClasses = (props) => {
  return classNames(
    {'col-form-label-sm': props.bsSize === "sm"},
    {'col-form-label-lg': props.bsSize === "lg"}
  )
};

export const arraysEqual = function (a, b) {
  if (a === b) return true;
  if (a === null || b === null) return false;
  if (a.length !== b.length) return false;

  a.sort();
  b.sort();

  for (let i = 0; i < a.length; ++i) {
    if (a[i] !== b[i]) return false;
  }
  return true;
};
