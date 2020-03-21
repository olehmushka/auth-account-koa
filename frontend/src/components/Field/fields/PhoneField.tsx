import React, { FC, memo } from 'react';
import InputMask from 'react-input-mask';
import { Input, Label, FormGroup } from 'reactstrap';
import { IFieldProps } from '../types';

const PhoneField: FC<IFieldProps> = ({
  label,
  id,
  onChange,
  onBlur,
  value,
  error,
  ...props
}) => (
  <InputMask
    onChange={onChange}
    onBlur={onBlur}
    value={value}
    mask="+38 (099) 999 99 99"
  >
    {inputProps => (
      <FormGroup>
        {label && (
          <Label for={id}>
            <div>{label}</div>
          </Label>
        )}
        <Input {...props} {...inputProps} type="text" />
        {error && <div className="text-danger">{error}</div>}
      </FormGroup>
    )}
  </InputMask>
);

export default memo(PhoneField);
