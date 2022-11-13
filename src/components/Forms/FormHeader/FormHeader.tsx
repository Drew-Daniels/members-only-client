interface IProps {
  text: string;
}

export default function FormHeader({ text }: IProps) {
  return (
    <h1 className='text-2xl text-center py-2 bg-gray-800 text-white rounded-t-md'>{text}</h1>
  )
}
