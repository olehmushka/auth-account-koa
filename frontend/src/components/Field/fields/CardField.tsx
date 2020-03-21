import React, { FC, memo } from 'react';
import InputMask from 'react-input-mask';
import { Input, Label, FormGroup } from 'reactstrap';
import { IFieldProps } from '../types';

const CardField: FC<IFieldProps> = ({
  label,
  id,
  onChange,
  onBlur,
  value,
  error,
  ...props
}) => (
  <InputMask onChange={onChange} onBlur={onBlur} value={value} mask="9999">
    {inputProps => (
      <FormGroup>
        {label && (
          <Label for={id}>
            <div>{label}</div>
          </Label>
        )}
        <Input type="number" {...props} {...inputProps} />
        {error && <div className="text-danger">{error}</div>}
      </FormGroup>
    )}
  </InputMask>
);

export default memo(CardField);
