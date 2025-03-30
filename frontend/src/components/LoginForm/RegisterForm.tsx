import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import React, { useState,} from 'react';
import { Button } from '@mui/material';
import { register } from '../../api/auth/AuthAPI';
import { useMutation, useQueryClient } from '@tanstack/react-query';

function RegisterForm() {
    const queryClient = useQueryClient();

    const [registerError, setregisterError] = useState('');


    const { mutateAsync: registerUserMutation } = useMutation({
      mutationFn: register,
      onSuccess: () => {
        window.location.href = '/';
      },
      onError: (error) => {
        setregisterError(error.message);
      }
  })



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
            name: Yup.string()
            .required('Name is missing'),
            prename: Yup.string()
            .required('Name is missing'),
          }),
        [],
      );

    const handleSubmit = async (
        values: { email: string; password: string; name: string, prename: string},
        { setSubmitting }: { setSubmitting: (isSubmitting: boolean) => void },
      ) => {
        registerUserMutation(values);
        setSubmitting(false);
      };
    
    return (
        <div className="form-wrapper">
          <div className="form-bg register"></div>
          <div className="form-container register">
            <Formik
              initialValues={{
                  email: '',
                  password: '',
                  name: '',
                  prename: '',
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
                  <div className='flex_name'>
                    <Field
                      type="name"
                      name="name"
                      placeholder="Nume"
                      className="form-input register"
                    />
                    <ErrorMessage name="name">
                      {(msg) => (
                        <p className="form-error">{msg}</p>
                      )}
                    </ErrorMessage>
                    <Field
                      type="prename"
                      name="prename"
                      placeholder="Prenume"
                      className="form-input register"
                    />
                    <ErrorMessage name="prename">
                      {(msg) => (
                        <p className="form-error">{msg}</p>
                      )}
                    </ErrorMessage>
                  </div>
                  <Field
                    type="email"
                    name="email"
                    placeholder="E-mail"
                    className="form-input register"
                  />
                  <ErrorMessage name="email">
                    {(msg) => (
                      <p className="form-error">{msg}</p>
                    )}
                  </ErrorMessage>
                  <Field
                    className="form-input register"
                    type="password"
                    name="password"
                    placeholder="Password"
                  />
                  <ErrorMessage name="password">
                    {(msg) => (
                      <p className="form-error">{msg}</p>
                    )}
                  </ErrorMessage>

                  {registerError && (
                    <p className="form-error form-general-error">
                      {registerError}
                  </p>
                  )}
                </div>
                <div className='form-buttons'>
                  <Button className="form-button" type="submit">
                    <p className="form-button-text">Register</p>
                  </Button>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    )
}

export default RegisterForm;