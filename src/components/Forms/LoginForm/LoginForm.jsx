import { useState, useEffect } from "react";
import { Formik, Form } from "formik";
import TextInput from "../TextInput";
import SubmitButton from "../../Buttons/SubmitButton";
import FormHeader from "../FormHeader";

export default function LoginForm({ onSubmit, errors }) {

  const [loginError, setLoginError] = useState('');

  useEffect(() => {
    resetErrors();
    if (errors) {
      setLoginError(errors);
    }
    function resetErrors() {
      setLoginError('');
    }
  }, [errors]);

  return (
    <div>
      <Formik
        initialValues={{
          username: '',
          password: '',
        }}
        onSubmit={onSubmit}
      >
        <Form onSubmit={e => onSubmit(e)} className='bg-gray-800 rounded-b-md pb-2 px-5 grid justify-items-center border border-1 border-gray-500 rounded-md'>
          <FormHeader text='Log In'/>
          <TextInput
            label='Username'
            name='username'
            type='username'
            placeholder='Enter your username here'
          />
          <TextInput
            label='Password'
            name='password'
            type='password'
            placeholder='Enter your password here'
          />
          <div className='text-white'>
            {loginError}
          </div>
          <SubmitButton />
        </Form>
      </Formik>
    </div>
  )
}