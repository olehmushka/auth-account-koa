import * as Yup from 'yup';
import {
  general,
  email,
  password,
} from '../constants/errors';

export const emptinessValidator = Yup.mixed().required(general.required);

export const nameValidator = Yup.string()
  .required(general.required)
  .max(20, general.length)
  .min(2, general.length)
  // eslint-disable-next-line
  .matches(new RegExp("^[A-Za-z-'s \u0400-\u04FF]*$"), general.symbol);

export const emailValidator = Yup.string()
  .required(general.required)
  .email(email.invalid);

export const passwordValidator = Yup.string()
  .required(general.required)
  .min(8, password.length);
