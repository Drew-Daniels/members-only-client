import {PropsWithChildren} from "react";

interface Props extends PropsWithChildren {
  body: string;
}

export default function MessageBody({ body }: Props) {
  return (
    <div className='w-full max-w-xl bg-gray-900 px-4 py-2 rounded-b-md' >
      {body}
    </div>
  )
}
