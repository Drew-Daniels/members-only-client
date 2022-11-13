import {Form, withFormik, FormikProps, FormikValues, Field} from "formik";
import FormHeader from "../FormHeader";

interface FormErrors {
  title?: string;
  body?: string;
}

interface FormProps {
  userId: string;
  refetchMessages: Function;
  initialTitle?: string;
  initialBody?: string;
}

interface FormValues {
  title: string;
  body: string;
}

const InnerForm = (props: FormikProps<FormikValues>) =>  {
  const { touched, errors, isSubmitting } = props;
  return (
    <Form className='w-full bg-gray-800 px-4 py-2 mb-5 grid justify-items-center border border-1 border-gray-500 rounded-md'>
      <FormHeader text='New Message'/>
      <Field type='text' name='title' placeholder='Enter your message title' />
      {touched.title && errors.title && <div>{errors.title}</div>}

      <Field type='text' name='body' placeholder='Enter your message body' />
      {touched.body && errors.body && <div>{errors.body}</div>}

      <button type='submit' disabled={isSubmitting}>
        Submit
      </button>
    </Form>
  )
}

export const MessageForm = withFormik<FormProps, FormValues>({
  mapPropsToValues: props => {
    return {
      title: props.initialTitle || '',
      body: props.initialBody || '',
    }
  },

  validate: values => {
    const errors: FormErrors = {};
    if (!values.title) {
      errors.title = 'Required';
    }
    if (!values.body) {
      errors.body = 'Required';
    }
  },

  handleSubmit: async (values, {props: {userId, refetchMessages}}) => {
    fetch(`${process.env.REACT_APP_API_BASE_URL}/api/messages`, {
      method: 'POST',
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({...values, author: userId}),
    })
      .then(res => {
        return res.json()
      })
      .then(res => {
        if (res.errors) {
          console.log('errors: ', res.errors);
          return;
        }
        return refetchMessages();
      })
      .catch(err => console.error(err));
  }

})(InnerForm)
