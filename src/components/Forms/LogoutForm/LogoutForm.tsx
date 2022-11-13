import { useNavigate } from "react-router-dom";
import { Formik, Form } from "formik";
import SubmitButton from "../../Buttons/SubmitButton";
import {useUser} from "../../../contexts/user";
import FormHeader from "../FormHeader";

export default function LogoutForm() {
  const navigate = useNavigate();
  const {resetUser} = useUser();

  function handleLogout(e: Event): void {
    e.preventDefault();
    fetch(`${process.env.REACT_APP_API_BASE_URL}/api/logout`, {
      method: 'DELETE',
    })
    .then(afterLogout);
  }
  function afterLogout() {
    resetUser();
    navigate('/');
  }

  return (
    <>
      <Formik
        initialValues={null}
        onSubmit={handleLogout}
      >
        <Form onSubmit={ e => handleLogout(e)}>
          <FormHeader text='Are You Sure You Want to Log Out?'/>
          <SubmitButton />
        </Form>
      </Formik>
    </>
  )
}
