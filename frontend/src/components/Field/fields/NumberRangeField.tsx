import React, { FC } from 'react';
import DefaultField from './DefaultField';
import { IFieldProps } from '../types';

const NumberRangeField: FC<IFieldProps> = ({
  onChange,
  max,
  min,
  value,
  ...props
}) => {
  const validatedOnChange = event => {
    const value = Number(event.target.value);

    if (value >= Number(min) && value <= Number(max)) {
      return onChange(event);
    }
  };

  return (
    <DefaultField
      {...props}
      type="number"
      onChange={validatedOnChange}
      value={value}
    />
  );
};

export default NumberRangeField;
