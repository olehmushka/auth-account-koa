import React, { FC } from 'react';
import DatePicker from 'react-datepicker';
import { FormGroup, Label } from 'reactstrap';
import 'react-datepicker/dist/react-datepicker.css';
import { IFieldProps } from '../types';

const DateField: FC<IFieldProps> = ({ label, onChange, value }) => {
  return (
    <FormGroup className="mb-3">
      {label && (
        <Label className="mr-3">
          <div>{label}</div>
        </Label>
      )}
      <DatePicker
        selected={value}
        onChange={onChange}
        dateFormat="dd.MM.yyyy"
        className="form-control"
      />
    </FormGroup>
  );
};

export default DateField;
