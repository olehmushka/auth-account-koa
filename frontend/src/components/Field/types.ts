import { InputProps } from 'reactstrap/lib/Input';

export interface IFieldProps extends Omit<InputProps, 'type'> {
  label?: string;
  error?: string;
  options?:
  | string[]
  | { [key: string]: string }
  | Array<{ text: string; value: string }>;
  addonText?: string;
  onClick?: (event: { stopPropagation: () => void }) => void;
  type: IInputType;
  onChange?: any;
  min?: string | number;
  max?: string | number;
  count?: number;
}

type IInputType =
  | 'text'
  | 'email'
  | 'username'
  | 'select'
  | 'file'
  | 'radio'
  | 'checkbox'
  | 'textarea'
  | 'button'
  | 'reset'
  | 'submit'
  | 'date'
  | 'datetime-local'
  | 'hidden'
  | 'image'
  | 'month'
  | 'number'
  | 'range'
  | 'search'
  | 'tel'
  | 'url'
  | 'week'
  | 'password'
  | 'datetime'
  | 'time'
  | 'color'
  | 'card'
  | 'date-range'
  | 'number-range';
