interface IProps {
  title: string;
}

export default function Title({ title }: IProps) {
  return (
    <h1 className='text-2xl text-white'>{title}</h1>
  )
}
