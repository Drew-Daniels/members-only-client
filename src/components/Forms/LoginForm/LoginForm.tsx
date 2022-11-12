import {useState, useEffect, PropsWithChildren} from "react";
import { Formik, Form } from "formik";
import TextInput from "../TextInput";
import SubmitButton from "../../Buttons/SubmitButton";
import FormHeader from "../FormHeader";

interface IProps extends PropsWithChildren {
  onSubmit: Function;
  errors: string;
}
// TODO: is 'errors' ever an array? Not sure we want to either get a string or array here or if that is possible
export default function LoginForm({ onSubmit, errors }: IProps) {

  const [loginError, setLoginError] = useState<string>('');

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
