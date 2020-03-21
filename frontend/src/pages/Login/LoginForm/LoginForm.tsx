import React, { FC } from 'react';
import { withFormik, InjectedFormikProps } from 'formik';
import { Form, Col } from 'reactstrap';
import Field from '../../../components/Field';
import LoaderButton from '../../../components/LoaderButton';
import { ISignInData } from '../../../services/api/AuthService/types';
import { IFormProps } from './types';

const FormLayout: FC<InjectedFormikProps<IFormProps, ISignInData>> = ({
  handleSubmit,
  values,
  handleChange,
  errors,
  touched,
  submitCount,
  handleBlur,
  isSubmitting,
}) => {
  const isSubmitedBefore = submitCount > 0;

  return (
    <Col xl={6}>
      <Form className="d-flex flex-column">
        <Field
          onBlur={handleBlur}
          required
          label="Username"
          value={values.username}
          type="username"
          name="username"
          id="username"
          onChange={handleChange}
          error={(isSubmitedBefore || touched.username) && errors.username}
        />
        <Field
          required
          label="Password"
          value={values.password}
          type="password"
          name="password"
          id="password"
          onChange={handleChange}
          error={(isSubmitedBefore || touched.password) && errors.password}
        />
        <LoaderButton
          text="Sign In"
          isLoading={isSubmitting}
          onClick={handleSubmit}
          type="submit"
        />
      </Form>
    </Col>
  );
};

export default withFormik<IFormProps, ISignInData>({
  mapPropsToValues: ({ initialValues }) => initialValues,
  handleSubmit: (values, { props: { onSubmit }, setErrors }) =>
    onSubmit(values, { setErrors }),
  validationSchema: ({ validationSchema }) => validationSchema,
})(FormLayout);
