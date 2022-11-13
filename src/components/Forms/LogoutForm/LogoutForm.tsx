import {Form, withFormik, FormikProps, FormikValues} from "formik";
import FormHeader from "../FormHeader";

interface FormProps {
  navigate: Function;
  resetUser: Function;
}

const InnerForm = (props: FormikProps<any>) => {
  const { isSubmitting } = props;
  return (
    <Form>
      <FormHeader text='Are You Sure You Want to Log Out?'/>
      <button type='submit' disabled={isSubmitting}>
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
