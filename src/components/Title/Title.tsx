interface Props {
  title: string;
}

export default function Title({ title }: Props) {
  return (
    <h1 className='text-2xl text-white'>{title}</h1>
  )
}
