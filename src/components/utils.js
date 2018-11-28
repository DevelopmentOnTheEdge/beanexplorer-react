import classNames from 'classnames';

export const inputLabelSizeClasses = (props) => {
  return classNames(
    {'col-form-label-sm': props.bsSize === "sm"},
    {'col-form-label-lg': props.bsSize === "lg"}
  )
};
