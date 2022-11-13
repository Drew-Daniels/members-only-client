import { useField } from "formik";

interface Props {
  id: string;
  label: string;
  name: string;
  error: string;
}

export default function TextArea({label, ...props}: Props) {

    const [field, _] = useField(props);
    const { id, name, error } = props;

    return (
        <div className='bg-gray-800 py-2 px-2 justify-self-stretch'>
          <label htmlFor={id || name} className='text-white text-lg'>{label}</label>
          <textarea {...field}{...props} className='bg-gray-100 rounded border border-gray-400 leading-normal resize-none w-full h-20 py-1 px-3 font-medium placeholder-gray-700 focus:outline-none focus:bg-white'/>
          {error ? <div className='error'>{error}</div>: null}
        </div>
    )
}
