import {PropsWithChildren} from "react";

interface IProps extends PropsWithChildren {
  body: string;
}

export default function MessageBody({ body }: IProps) {
  return (
    <div className='w-full max-w-xl bg-gray-900 px-4 py-2 rounded-b-md' >
      {body}
    </div>
  )
}
