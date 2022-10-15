import { useState, useEffect } from 'react';
import { Formik, Form } from "formik";
import TextInput from "../TextInput";
import SubmitButton from '../../Buttons/SubmitButton';
import FormHeader from "../FormHeader";

export default function SignupForm({ onSubmit, errors }) {

  const [firstNameError, setFirstNameError] = useState('');
  const [lastNameError, setLastNameError] = useState('');
  const [userNameError, setUsernameError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [passwordConfirmError, setPasswordConfirmError] = useState('');

  useEffect(() => {
    resetErrors();

    function resetErrors() {
      clearErrors();
      mapErrors();
    }
    function clearErrors() {
     setFirstNameError('');
     setLastNameError('');
     setUsernameError('');
     setPasswordError('');
     setPasswordConfirmError('');
    }

    function mapErrors() {
      errors.forEach(err => {
        const { param, msg } = err;
        switch (param) {
          case 'firstName':
            setFirstNameError(msg);
            break;
          case 'lastName':
            setLastNameError(msg);
            break;
          case 'username':
            setUsernameError(msg);
            break;
          case 'password':
            setPasswordError(msg);
            break;
          case 'passwordConfirm':
            setPasswordConfirmError(msg);
            break;
          default:
            break;
        }
      });
    }
  }, [errors]);

  return (
    <>
      <Formik
        initialValues={{
          firstName: '',
          lastName: '',
          email: '',
          password: '',
          passwordConfirm: '',
        }}
        onSubmit={onSubmit}
      >
        <Form onSubmit={e => onSubmit(e)} className='bg-gray-800 rounded-b-md pb-2 px-5 grid justify-items-center border border-1 border-gray-500 rounded-md'>
          <FormHeader text='Sign up for Members Only!'/>
          <TextInput
            label='First Name'
            name='firstName'
            type='text'
            placeholder='Enter your first name'
            error={firstNameError}
          />
          <TextInput
            label='Last Name'
            name='lastName'
            type='text'
            placeholder='Enter your last name'
            error={lastNameError}
          />
          <TextInput
            label='Username (Email Required)'
            name='username'
            type='username'
            placeholder='your@email.com'
            error={userNameError}
          />
          <TextInput
            label='Password'
            name='password'
            type='password'
            placeholder='Enter your password here'
            error={passwordError}
          />
          <TextInput
            label='Confirm Password'
            name='passwordConfirm'
            type='password'
            placeholder='Confirm your password'
            error={passwordConfirmError}
          />
         <SubmitButton />
        </Form>
      </Formik>
    </>
  )
}