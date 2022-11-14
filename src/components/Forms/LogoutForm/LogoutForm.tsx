import {Form, withFormik, FormikProps} from "formik";
import FormHeader from "../FormHeader";

interface FormProps {
  navigate: Function;
  resetUser: Function;
}

const InnerForm = (props: FormikProps<any>) => {
  const { isSubmitting } = props;
  return (
    <Form className='bg-gray-800 rounded-b-md pb-2 px-5 grid justify-items-center border border-1 border-gray-500 rounded-md'>
      <FormHeader text='Are You Sure You Want to Log Out?'/>
      <button type='submit' disabled={isSubmitting} className='bg-[#fc5f0a] py-2 px-4 my-2 rounded inline-flex items-center text-white'>
        Submit
      </button>
    </Form>
  )
};

export const LogoutForm = withFormik<FormProps, {}>({
  handleSubmit: async (_, { props: { navigate, resetUser } }) => {
    fetch(`${process.env.REACT_APP_API_BASE_URL}/api/logout`, {
      method: 'DELETE',
    })
      .then(afterLogout);

    function afterLogout() {
      resetUser();
      navigate('/');
    }
  }

})(InnerForm)
