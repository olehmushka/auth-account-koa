import * as Yup from 'yup';
import { ISignInData } from '../../../services/api/AuthService/types';

export interface IFormProps {
  onSubmit: (data: ISignInData, { setErrors }: any) => Promise<void>;
  validationSchema: Yup.ObjectSchema<Yup.Shape<object, Partial<ISignInData>>>;
  initialValues: ISignInData;
}
