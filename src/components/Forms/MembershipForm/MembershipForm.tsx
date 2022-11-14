import {Form, withFormik, FormikProps, Field, FormikErrors} from "formik";
import type { User } from "../../../types";
import {Dispatch, SetStateAction} from "react";
import FormHeader from "../FormHeader";

interface FormProps {
  setUser: Dispatch<SetStateAction<User>>
  navigate: Function;
  initialSecretCode?: string;
}

interface FormValues {
  secretCode: string;
}

const InnerForm = (props: FormikProps<FormValues>) => {
  const { touched, errors, isSubmitting } = props;
  return (
    <Form className='bg-gray-800 rounded-b-md pb-2 px-5 grid justify-items-center border border-1 border-gray-500 rounded-md'>
      <FormHeader text='Become an Admin'/>
      <Field type='password' name='secret' placeholder='Enter Secret Code' className='bg-gray-100 rounded border border-gray-400 leading-normal resize-none w-full h-10 py-1 px-3 font-medium placeholder-gray-700 focus:outline-none focus:bg-white' />
      {touched.secretCode && errors.secretCode && <div>{errors.secretCode}</div>}

      <button type='submit' disabled={isSubmitting} className='bg-[#fc5f0a] py-2 px-4 my-2 rounded inline-flex items-center text-white'>
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
    const errors: FormikErrors<FormValues> = {};
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
