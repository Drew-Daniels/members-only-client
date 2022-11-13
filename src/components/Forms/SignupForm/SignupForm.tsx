import {Dispatch, SetStateAction} from 'react';
import { Form, withFormik, FormikProps, Field } from "formik";
import FormHeader from "../FormHeader";
import {User} from "../../../types";

interface FormErrors {
  firstName?: string;
  lastName?: string;
  username?: string;
  password?: string;
  passwordConfirm?: string;
}

// shape of actual form values
interface FormValues {
  firstName: string;
  lastName: string;
  username: string;
  password: string;
  passwordConfirm: string;
}

// shape of optional overrides that can be passed as props to set default values to values other than blank strings
interface FormProps {
  setUser: Dispatch<SetStateAction<User>>
  navigate: Function;
  initialFirstName?: string;
  initialLastName?: string;
  initialUsername?: string;
  initialPassword?: string;
  initialPasswordConfirm?: string;
}

const InnerForm = (props: FormikProps<FormValues>) => {
  const { touched, errors, isSubmitting } = props;
  return (
    <Form className='bg-gray-800 rounded-b-md pb-2 px-5 grid justify-items-center border border-1 border-gray-500 rounded-md'>
      <FormHeader text='Sign up for Members Only!'/>

      <Field type='text' name='firstName' placeholder='Enter your first name' />
      {touched.firstName && errors.firstName && <div>{errors.firstName}</div>}

      <Field type='text' name='lastName' placeholder='Enter your last name' />
      {touched.lastName && errors.lastName && <div>{errors.lastName}</div>}

      <Field type='email' name='username' placeholder='Create a username (must be an email)' />
      {touched.username && errors.username && <div>{errors.username}</div>}

      <Field type='password' name='password' placeholder='Enter a strong password' />
      {touched.password && errors.password && <div>{errors.password}</div>}

      <Field type='password' name='passwordConfirm' placeholder='Confirm your strong password' />
      {touched.passwordConfirm && errors.passwordConfirm && <div>{errors.passwordConfirm}</div>}

      <button type='submit' disabled={isSubmitting}>
        Submit
      </button>
    </Form>
  )

}

export const SignupForm = withFormik<FormProps, FormValues>({
  mapPropsToValues: props => {
    return {
      firstName: props.initialFirstName || '',
      lastName: props.initialLastName || '',
      username: props.initialUsername || '',
      password: props.initialPassword || '',
      passwordConfirm: props.initialPasswordConfirm || '',
    }
  },

  validate: (values) => {
    const errors: FormErrors = {};
    if (!values.firstName) {
      errors.firstName = 'Required';
    }
    if (!values.lastName) {
      errors.lastName = 'Required';
    }
    if (!values.username) {
      errors.username = 'Required'
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.username)) {
      errors.username = 'Invalid username (must be an email address)'
    }
    if (!values.password) {
      errors.password = 'Required';
    } else if (!(new RegExp(/^(?=.*[A-Z].*[A-Z])(?=.*[!@#$&*])(?=.*[0-9].*[0-9])(?=.*[a-z].*[a-z].*[a-z]).{8,}$/).test(values.password))) {
      errors.password = 'Must be a strong password that contains 2 uppercase letters, one special case letter, two digits, three lower case letters, and a length of 8 or more characters';
    }
    if (!values.passwordConfirm) {
      errors.passwordConfirm = 'Required';
    } else if (!(new RegExp(values.password).test(values.passwordConfirm))) {
      errors.passwordConfirm = 'Password confirmation must match password'
    }
  },

  handleSubmit: async (values, {props: { setUser, navigate }}) => {
    fetch(`${process.env.REACT_APP_API_BASE_URL}/api/signup`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(values)
    })
      .then(res => {
        if (res.status === 409) {
          console.log('409 - username already taken')
          return;
        }
        return res.json()
      })
      .then(res => {
        if (res.errors) {
          console.log('errors: ', res.errors);
          return;
        }
        setUser(res.user);
        navigate('/');
      })
      .catch(err => console.error(err));
  }

})(InnerForm)
