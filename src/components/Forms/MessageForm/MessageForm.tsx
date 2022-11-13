import { useState, useEffect } from "react";
import { Formik, Form } from "formik";

import TextInput from "../TextInput";
import TextArea from "../TextArea";
import SubmitButton from "../../Buttons/SubmitButton";
import FormHeader from "../FormHeader";

import type { IFormError } from "../../../types";

export default function MessageForm({ onSubmit, errors }) {
  const [titleError, setTitleError] = useState('');
  const [bodyError, setBodyError] = useState('');

  useEffect(() => {
    // TODO: Refactor this logic in forms to be less duplicative
    resetErrors();

    function resetErrors() {
      clearErrors();
      mapErrors();
    }
    function clearErrors() {
      setTitleError('');
      setBodyError('');
    }
    function mapErrors() {
      errors.forEach((err: IFormError) => {
        const { param, msg } = err;
        switch (param) {
          case 'title':
            setTitleError(msg);
            break;
          case 'body':
            setBodyError(msg);
            break;
          default:
            break;
        }
      })
    }
  }, [errors])

  return (
    <>
      <Formik
        initialValues={{
          title: '',
          body: '',
        }}
        onSubmit={onSubmit}
       >
        <div className='flex flex-cen'>
          <Form onSubmit={e => onSubmit(e)} className='w-full bg-gray-800 px-4 py-2 mb-5 grid justify-items-center border border-1 border-gray-500 rounded-md'>
            <FormHeader text='New Message'/>
            <TextInput
              label='Title'
              name='title'
              type='text'
              placeholder='Enter your message title'
              classes='px-4 pt-3 pb-2 text-gray-800 text-lg'
              error={titleError}
            />
            <TextArea
              label='Body'
              name='body'
              type='text'
              placeholder='Enter your message body'
              error={bodyError}
            />
            <SubmitButton />
          </Form>
        </div>
      </Formik>
    </>
  )
}
