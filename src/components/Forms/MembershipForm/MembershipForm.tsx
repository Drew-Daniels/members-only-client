import { Formik, Form } from "formik";
import TextInput from "../TextInput";
import SubmitButton from "../../Buttons/SubmitButton";
import {PropsWithChildren} from "react";

interface Props extends PropsWithChildren {
  onSubmit: Function;
  error: string;
}

export default function MembershipForm({ onSubmit, error }: Props) {
  return (
    <>
      <h1>Become an Admin</h1>
      <Formik
        initialValues={{
          secret: '',
        }}
        onSubmit={onSubmit}
      >
        <Form onSubmit={e => onSubmit(e)}>
          <TextInput
            label='Secret Code'
            name='secret'
            type='password'
            placeholder='Enter the secret code'
            error={error}
          />
          <SubmitButton />
        </Form>
      </Formik>
    </>
  )
}
