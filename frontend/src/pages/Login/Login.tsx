import React, { FC } from 'react';
import * as Yup from 'yup';
import { inject } from 'mobx-react';
import { ISignInData } from '../../services/api/AuthService/types';
import errors from '../../constants/errors';
import { nameValidator, passwordValidator } from '../../helpers/validators';
import Form from './LoginForm';
import { ILoginProps } from './types';

const initialValues: ISignInData = {
  username: '',
  password: '',
};

const schema = Yup.object().shape<Partial<ISignInData>>({
  username: nameValidator,
  password: passwordValidator,
});

const Login: FC<ILoginProps> = props => {
  const onSubmit = async (data: ISignInData, { setErrors }: any) => {
    const { userStore } = props;

    try {
      await userStore.signIn(data);
    } catch (err) {
      console.log(err);
      setErrors({
        password: err.response ? errors.server.data : errors.server.response
      });
    }
  };

  return (
    <div className="app-container">
      <Form
        onSubmit={onSubmit}
        initialValues={initialValues}
        validationSchema={schema}
      />
    </div>
  );
};

export default inject<ILoginProps>('userStore')(Login);
