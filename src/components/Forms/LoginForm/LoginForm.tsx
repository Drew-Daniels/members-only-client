import {Form, withFormik, FormikProps, FormikValues, Field} from "formik";
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
      <Field type='text' name='firstName' placeholder='Enter your username (your email)' />
      {touched.username && errors.username && <div>{errors.username}</div>}

      <Field type='text' name='password' placeholder='Enter your password' />
      {touched.password && errors.password && <div>{errors.password}</div>}

      <button type='submit' disabled={isSubmitting}>
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
    fetch(`${process.env.REACT_APP_API_BASE_URL}/api/login`, {
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
