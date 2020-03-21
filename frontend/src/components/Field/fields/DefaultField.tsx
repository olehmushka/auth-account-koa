import React, { FC } from 'react';
import {
  FormGroup,
  Label,
  InputGroup,
  Input,
  InputGroupAddon,
  InputGroupText,
} from 'reactstrap';
import { IFieldProps } from '../types';

const DefaultField: FC<IFieldProps> = ({
  label,
  id,
  addonText,
  error,
  type,
  ...props
}) => (
  <FormGroup className="mb-3">
    {label && (
      <Label for={id}>
        <div>{label}</div>
      </Label>
    )}
    <InputGroup>
      <Input {...props} type={type as any} />
      {addonText && (
        <InputGroupAddon addonType="append">
          <InputGroupText>{addonText}</InputGroupText>
        </InputGroupAddon>
      )}
    </InputGroup>
    {error && <div className="text-danger">{error}</div>}
  </FormGroup>
);

export default DefaultField;
