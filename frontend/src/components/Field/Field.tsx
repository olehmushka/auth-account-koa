import React, { FC } from 'react';
import {
  SelectField,
  CheckboxField,
  CardField,
  PhoneField,
  DefaultField,
  DateRangeField,
  DateField,
  NumberRangeField
} from './fields';
import { IFieldProps } from './types';

const Field: FC<IFieldProps> = props => {
  switch (props.type) {
    case 'select':
      return <SelectField {...props} />;
    case 'checkbox':
      return <CheckboxField {...props} />;
    case 'tel':
      return <PhoneField {...props} />;
    case 'card':
      return <CardField {...props} />;
    case 'date-range':
      return <DateRangeField {...props} />;
    case 'date':
      return <DateField {...props} />;
    case 'number-range':
      return <NumberRangeField {...props} />;
    default:
      return <DefaultField {...props} />;
  }
};

export default Field;
