import React, { FC } from 'react';
import { Input, Label } from 'reactstrap';
import { IFieldProps } from '../types';

const CheckboxField: FC<IFieldProps> = ({ label, id, check, ...props }) => {
  return (
    <Label check for={id} className="pb-2">
      {label}
      <Input id={id} {...props} type="checkbox" />
    </Label>
  );
};

export default CheckboxField;
