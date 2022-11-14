import {Form, withFormik, FormikProps, Field} from "formik";
import FormHeader from "../FormHeader";
import {Dispatch, SetStateAction} from "react";
import {User} from "../../../types";

interface FormErrors {
  username?: string;
  password?: string;
}

interface FormProps {
  setUser: Dispatch<SetStateAction<User>>
  navigate: Function;
  initialUsername?: string;
  initialPassword?: string;
}

interface FormValues {
  username: string;
  password: string;
}

const InnerForm = (props: FormikProps<FormValues>) => {
  const { touched, errors, isSubmitting } = props;
  return (
    <Form className='bg-gray-800 rounded-b-md pb-2 px-5 grid justify-items-center border border-1 border-gray-500 rounded-md'>
      <FormHeader text='Log In'/>
      <Field type='text' name='firstName' placeholder='Enter your username (your email)' className='bg-gray-100 rounded border border-gray-400 leading-normal resize-none w-full h-10 py-1 px-3 font-medium placeholder-gray-700 focus:outline-none focus:bg-white'/>
      {touched.username && errors.username && <div>{errors.username}</div>}

      <Field type='text' name='password' placeholder='Enter your password' className='bg-gray-100 rounded border border-gray-400 leading-normal resize-none w-full h-10 py-1 px-3 font-medium placeholder-gray-700 focus:outline-none focus:bg-white'/>
      {touched.password && errors.password && <div>{errors.password}</div>}

      <button type='submit' disabled={isSubmitting} className='bg-[#fc5f0a] py-2 px-4 my-2 rounded inline-flex items-center text-white'>
        Submit
      </button>
    </Form>
  )
}

export const LoginForm = withFormik<FormProps, FormValues>({
  mapPropsToValues: props => {
    return {
      username: props.initialUsername || '',
      password: props.initialPassword || '',
    }
  },

  validate: (values) => {
    const errors: FormErrors = {};
    if (!values.username) {
      errors.username = 'Username required';
    }
    if (!values.password) {
      errors.password = 'Password required';
    }
  },

  handleSubmit: async (values, { props: { setUser, navigate } }) => {
    fetch(`/api/login`, {
      method: 'POST',
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values)
    })
      .then(res => {
        if (res.status === 400) {
          console.log('Username and Password must both be provided')
          return;
        }
        if (res.status === 401) {
          console.log('Incorrect Username or Password')
          return;
        }
        return res.json()
      })
      .then(res => {
        if (res.user) {
          setUser(res.user);
          navigate('/');
        }
      })
      .catch(err => console.log(err));
  },
})(InnerForm);
