import { useField} from "formik";

interface Props {
  label: string;
  name: string;
  type: string;
  placeholder: string;
  id?: string;
  classes?: string;
  error?: string;
}

export default function TextInput({ label, ...props}: Props) {

  const [field, _] = useField(props);
  const { id, name, error } = props;
  return (
    <div className='bg-gray-800 py-2 justify-self-stretch'>
      <label htmlFor={ id || name } className='px-2 text-white text-lg'>{label}</label>
      <div className='px-2'>
        <input {...field}{...props} className='bg-gray-100 rounded border border-gray-400 leading-normal resize-none w-full h-10 py-1 px-3 font-medium placeholder-gray-700 focus:outline-none focus:bg-white'/>
      </div>
      {error ? <div>{error}</div> : null}
    </div>
  )
}
