interface Props {
  username: string;
}

export default function ProfilePill({ username }: Props) {
  return (
    <div>
      <span className='text-orange-500'>{username}</span>
    </div>
  )
}
