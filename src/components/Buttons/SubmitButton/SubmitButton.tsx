import BaseButton from "../BaseButton";

export default function SubmitButton({ text = 'Submit' }) {
  return <BaseButton type='submit' text={text} />
}
