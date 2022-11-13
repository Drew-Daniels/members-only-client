import {Form, withFormik, FormikProps, FormikValues, Field} from "formik";
import type { User } from "../../../types";
import {Dispatch, SetStateAction} from "react";

interface FormErrors {
  secretCode?: string;
}

interface FormProps {
  setUser: Dispatch<SetStateAction<User>>
  navigate: Function;
  initialSecretCode?: string;
}

interface FormValues {
  secretCode: string;
}

const InnerForm = (props: FormikProps<FormikValues>) => {
  const { touched, errors, isSubmitting } = props;
  return (
    <Form>
      <Field type='password' name='secret' placeholder='Enter Secret Code' />
      {touched.lastName && errors.lastName && <div>{errors.lastName}</div>}

      <button type='submit' disabled={isSubmitting}>
        Submit
      </button>
  </Form>
  )
}

export const MembershipForm = withFormik<FormProps, FormValues>({
  mapPropsToValues: props => {
    return {
      secretCode: props.initialSecretCode || '',
    }
  },

  validate: values => {
    const errors: FormErrors = {};
    if (!values.secretCode) {
      errors.secretCode = 'Secret Code is required';
    }
  },

  handleSubmit: async (values, { props: { setUser, navigate } }) => {
    fetch(`${process.env.REACT_APP_API_BASE_URL}/api/membership`, {
      method: 'POST',
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values),
    })
      .then(res => {
        if (res.status === 200) {
          setUser((prevUser: User) => ({ ...prevUser, isAdmin: true }));
          navigate('/');
        } else {
          console.log('Incorrect Secret Password')
        }
      })
      .catch(err => {
        console.log(err);
      });
  }

})(InnerForm);
