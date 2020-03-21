import React, { FC } from 'react';
import { Input, Label, FormGroup } from 'reactstrap';
import { _ } from '../../../utils';
import { IFieldProps } from '../types';
import '../style.scss';

const SelectField: FC<IFieldProps> = ({
  id,
  error,
  label,
  options,
  ...props
}) => (
  <FormGroup className="mb-3">
    {label && (
      <Label for={id}>
        <div>{label}</div>
      </Label>
    )}
    <Input {...props} type="select">
      {options &&
        _.map(options, (el: any) => {
          const isString = typeof el === 'string';

          const value = isString ? el : el.value;
          const text = isString ? el : el.text;

          return (
            <option key={value} value={value}>
              {text}
            </option>
          );
        })}
    </Input>
    {error && <div className="text-danger">{error}</div>}
  </FormGroup>
);

export default SelectField;
