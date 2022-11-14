import {Form, withFormik, FormikProps, Field} from "formik";
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

const InnerForm = (props: FormikProps<FormValues>) =>  {
  const { touched, errors, isSubmitting } = props;
  return (
    <Form className='w-full bg-gray-800 px-4 py-2 mb-5 grid justify-items-center border border-1 border-gray-500 rounded-md'>
      <FormHeader text='New Message'/>
      <Field type='text' name='title' placeholder='Enter your message title' className='bg-gray-100 rounded border border-gray-400 leading-normal resize-none w-full h-10 py-1 px-3 font-medium placeholder-gray-700 focus:outline-none focus:bg-white' />
      {touched.title && errors.title && <div>{errors.title}</div>}

      <Field type='text' name='body' placeholder='Enter your message body' className='bg-gray-100 rounded border border-gray-400 leading-normal resize-none w-full h-10 py-1 px-3 font-medium placeholder-gray-700 focus:outline-none focus:bg-white' />
      {touched.body && errors.body && <div>{errors.body}</div>}

      <button type='submit' disabled={isSubmitting} className='bg-[#fc5f0a] py-2 px-4 my-2 rounded inline-flex items-center text-white'>
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
    fetch(`/api/messages`, {
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
