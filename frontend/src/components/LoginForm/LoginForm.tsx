import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import React, { useState } from 'react';
import { Button } from '@mui/material';
import { login } from '../../api/auth/AuthAPI';

function LoginForm() {
    const [loginError, setLoginError] = useState('');
    const validationSchema = React.useMemo(
        () =>
          Yup.object().shape({
            email: Yup.string()
              .matches(
                /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                'Email is invalid',
              )
              .required('Email missing'),
            password: Yup.string()
              .min(6, 'Password is invalid')
              .required('Password missing'),
          }),
        [],
      );

    const handleSubmit = async (
        values: { email: string; password: string },
        { setSubmitting }: { setSubmitting: (isSubmitting: boolean) => void },
      ) => {
        try {
          const response = await login(values.email, values.password);
          localStorage.setItem('token', response);
          setSubmitting(false);
          window.location.href = '/';
        } catch (error: any) {
          setLoginError(error.message);
          setSubmitting(false);
        }
      };

    return (
        <div className="form-wrapper">
          <div className="form-bg"></div>
            <div className="form-container">
              <Formik
                initialValues={{
                    email: '',
                    password: '',
                }}
                enableReinitialize
                validationSchema={validationSchema}
                onSubmit={(values, { setSubmitting }) =>
                    handleSubmit(values, { setSubmitting })
                }
              >
              {() => (
              <Form className="form-form">
                <div className='form-text'>
                  <Field
                    type="email"
                    name="email"
                    placeholder="E-mail"
                    className="form-input"
                  />
                  <ErrorMessage name="email">
                    {(msg) => (
                      <div className="form-error">{msg}</div>
                    )}
                  </ErrorMessage>
                  <Field
                    className="form-input"
                    type="password"
                    name="password"
                    placeholder="Password"
                  />
                  <ErrorMessage name="password">
                    {(msg) => (
                      <div className="form-error">{msg}</div>
                    )}
                  </ErrorMessage>
                  {loginError && (
                  <div className="form-error form-general-error">
                    {loginError}
                  </div>
                  )}
                </div>
                <div className='form-buttons'>
                  <Button className="form-button" type="submit">
                    <p className="form-button-text">Log In</p>
                  </Button>
                  {/* <a href="/forgot-password" className="form-forgot-password">Forgot password</a> */}
                </div>
              </Form>
              )}
            </Formik>
          </div>
        </div>
    )
}

export default LoginForm;